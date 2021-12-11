// 暂时废止
// @ts-nocheck
import { ViewEventHandler } from './viewEventHandler'
export class MouseHandler extends ViewEventHandler {

    static readonly MOUSE_MOVE_MINIMUM_TIME = 100; // ms

    protected _context: ViewContext;
    protected viewController: ViewController;
    protected viewHelper: IPointerHandlerHelper;
    protected mouseTargetFactory: MouseTargetFactory;
    protected readonly _mouseDownOperation: MouseDownOperation;
    private lastMouseLeaveTime: number;
    private _height: number;

    constructor(context: ViewContext, viewController: ViewController, viewHelper: IPointerHandlerHelper) {
        super();

        this._context = context;
        this.viewController = viewController;
        this.viewHelper = viewHelper;
        this.mouseTargetFactory = new MouseTargetFactory(this._context, viewHelper);

        this._mouseDownOperation = this._register(new MouseDownOperation(
            this._context,
            this.viewController,
            this.viewHelper,
            (e, testEventTarget) => this._createMouseTarget(e, testEventTarget),
            (e) => this._getMouseColumn(e)
        ));

        this.lastMouseLeaveTime = -1;
        this._height = this._context.configuration.options.get(EditorOption.layoutInfo).height;

        const mouseEvents = new EditorMouseEventFactory(this.viewHelper.viewDomNode);

        this._register(mouseEvents.onContextMenu(this.viewHelper.viewDomNode, (e) => this._onContextMenu(e, true)));

        // this._register(mouseEvents.onMouseMoveThrottled(this.viewHelper.viewDomNode,
        // 	(e) => this._onMouseMove(e),
        // 	createMouseMoveEventMerger(this.mouseTargetFactory), MouseHandler.MOUSE_MOVE_MINIMUM_TIME));

        this._register(mouseEvents.onMouseUp(this.viewHelper.viewDomNode, (e) => this._onMouseUp(e)));

        this._register(mouseEvents.onMouseLeave(this.viewHelper.viewDomNode, (e) => this._onMouseLeave(e)));

        this._register(mouseEvents.onMouseDown(this.viewHelper.viewDomNode, (e) => this._onMouseDown(e)));

        const onMouseWheel = (browserEvent: IMouseWheelEvent) => {
            this.viewController.emitMouseWheel(browserEvent);

            if (!this._context.configuration.options.get(EditorOption.mouseWheelZoom)) {
                return;
            }
            const e = new StandardWheelEvent(browserEvent);
            const doMouseWheelZoom = (
                platform.isMacintosh
                    // on macOS we support cmd + two fingers scroll (`metaKey` set)
                    // and also the two fingers pinch gesture (`ctrKey` set)
                    ? ((browserEvent.metaKey || browserEvent.ctrlKey) && !browserEvent.shiftKey && !browserEvent.altKey)
                    : (browserEvent.ctrlKey && !browserEvent.metaKey && !browserEvent.shiftKey && !browserEvent.altKey)
            );
            if (doMouseWheelZoom) {
                const zoomLevel: number = EditorZoom.getZoomLevel();
                const delta = e.deltaY > 0 ? 1 : -1;
                EditorZoom.setZoomLevel(zoomLevel + delta);
                e.preventDefault();
                e.stopPropagation();
            }
        };
        this._register(dom.addDisposableListener(this.viewHelper.viewDomNode, dom.EventType.MOUSE_WHEEL, onMouseWheel, { capture: true, passive: false }));

        this._context.addEventHandler(this);
    }

    public override dispose(): void {
        this._context.removeEventHandler(this);
        super.dispose();
    }

    // --- begin event handlers
    public override onConfigurationChanged(e: viewEvents.ViewConfigurationChangedEvent): boolean {
        if (e.hasChanged(EditorOption.layoutInfo)) {
            // layout change
            const height = this._context.configuration.options.get(EditorOption.layoutInfo).height;
            if (this._height !== height) {
                this._height = height;
                this._mouseDownOperation.onHeightChanged();
            }
        }
        return false;
    }
    public override onCursorStateChanged(e: viewEvents.ViewCursorStateChangedEvent): boolean {
        this._mouseDownOperation.onCursorStateChanged(e);
        return false;
    }
    public override onFocusChanged(e: viewEvents.ViewFocusChangedEvent): boolean {
        return false;
    }
    public override onScrollChanged(e: viewEvents.ViewScrollChangedEvent): boolean {
        this._mouseDownOperation.onScrollChanged();
        return false;
    }
    // --- end event handlers

    public getTargetAtClientPoint(clientX: number, clientY: number): IMouseTarget | null {
        const clientPos = new ClientCoordinates(clientX, clientY);
        const pos = clientPos.toPageCoordinates();
        const editorPos = createEditorPagePosition(this.viewHelper.viewDomNode);

        if (pos.y < editorPos.y || pos.y > editorPos.y + editorPos.height || pos.x < editorPos.x || pos.x > editorPos.x + editorPos.width) {
            return null;
        }

        return this.mouseTargetFactory.createMouseTarget(this.viewHelper.getLastRenderData(), editorPos, pos, null);
    }

    protected _createMouseTarget(e: EditorMouseEvent, testEventTarget: boolean): IMouseTarget {
        let target = e.target;
        if (!this.viewHelper.viewDomNode.contains(target)) {
            const shadowRoot = dom.getShadowRoot(this.viewHelper.viewDomNode);
            if (shadowRoot) {
                target = (<any>shadowRoot).elementsFromPoint(e.posx, e.posy).find(
                    (el: Element) => this.viewHelper.viewDomNode.contains(el)
                );
            }
        }
        return this.mouseTargetFactory.createMouseTarget(this.viewHelper.getLastRenderData(), e.editorPos, e.pos, testEventTarget ? target : null);
    }

    private _getMouseColumn(e: EditorMouseEvent): number {
        return this.mouseTargetFactory.getMouseColumn(e.editorPos, e.pos);
    }

    protected _onContextMenu(e: EditorMouseEvent, testEventTarget: boolean): void {
        this.viewController.emitContextMenu({
            event: e,
            target: this._createMouseTarget(e, testEventTarget)
        });
    }

    public _onMouseMove(e: EditorMouseEvent): void {
        if (this._mouseDownOperation.isActive()) {
            // In selection/drag operation
            return;
        }
        const actualMouseMoveTime = e.timestamp;
        if (actualMouseMoveTime < this.lastMouseLeaveTime) {
            // Due to throttling, this event occurred before the mouse left the editor, therefore ignore it.
            return;
        }

        this.viewController.emitMouseMove({
            event: e,
            target: this._createMouseTarget(e, true)
        });
    }

    public _onMouseLeave(e: EditorMouseEvent): void {
        this.lastMouseLeaveTime = (new Date()).getTime();
        this.viewController.emitMouseLeave({
            event: e,
            target: null
        });
    }

    public _onMouseUp(e: EditorMouseEvent): void {
        this.viewController.emitMouseUp({
            event: e,
            target: this._createMouseTarget(e, true)
        });
    }

    public _onMouseDown(e: EditorMouseEvent): void {
        const t = this._createMouseTarget(e, true);

        const targetIsContent = (t.type === MouseTargetType.CONTENT_TEXT || t.type === MouseTargetType.CONTENT_EMPTY);
        const targetIsGutter = (t.type === MouseTargetType.GUTTER_GLYPH_MARGIN || t.type === MouseTargetType.GUTTER_LINE_NUMBERS || t.type === MouseTargetType.GUTTER_LINE_DECORATIONS);
        const targetIsLineNumbers = (t.type === MouseTargetType.GUTTER_LINE_NUMBERS);
        const selectOnLineNumbers = this._context.configuration.options.get(EditorOption.selectOnLineNumbers);
        const targetIsViewZone = (t.type === MouseTargetType.CONTENT_VIEW_ZONE || t.type === MouseTargetType.GUTTER_VIEW_ZONE);
        const targetIsWidget = (t.type === MouseTargetType.CONTENT_WIDGET);

        let shouldHandle = e.leftButton || e.middleButton;
        if (platform.isMacintosh && e.leftButton && e.ctrlKey) {
            shouldHandle = false;
        }

        const focus = () => {
            e.preventDefault();
            this.viewHelper.focusTextArea();
        };

        if (shouldHandle && (targetIsContent || (targetIsLineNumbers && selectOnLineNumbers))) {
            focus();
            this._mouseDownOperation.start(t.type, e);

        } else if (targetIsGutter) {
            // Do not steal focus
            e.preventDefault();
        } else if (targetIsViewZone) {
            const viewZoneData = <IViewZoneData>t.detail;
            if (this.viewHelper.shouldSuppressMouseDownOnViewZone(viewZoneData.viewZoneId)) {
                focus();
                this._mouseDownOperation.start(t.type, e);
                e.preventDefault();
            }
        } else if (targetIsWidget && this.viewHelper.shouldSuppressMouseDownOnWidget(<string>t.detail)) {
            focus();
            e.preventDefault();
        }

        this.viewController.emitMouseDown({
            event: e,
            target: t
        });
    }

    public _onMouseWheel(e: IMouseWheelEvent): void {
        this.viewController.emitMouseWheel(e);
    }
}