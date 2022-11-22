import { listener } from '../../_utils/dom';
import { StandardWheelEvent } from '../common/mouseEvent'
import {MouseWheelClassifier} from './mousewheelclassifier'


export const enum ScrollbarVisibility {
    Auto = 1,
    Hidden = 2,
    Visible = 3
}



export interface ScrollableElementCreationOptions {
    /**
     * The scrollable element should not do any DOM mutations until renderNow() is called.
     * Defaults to false.
     */
    lazyRender?: boolean;
    /**
     * CSS Class name for the scrollable element.
     */
    className?: string;
    /**
     * Drop subtle horizontal and vertical shadows.
     * Defaults to false.
     */
    useShadows?: boolean;
    /**
     * Handle mouse wheel (listen to mouse wheel scrolling).
     * Defaults to true
     */
    handleMouseWheel?: boolean;
    /**
     * If mouse wheel is handled, make mouse wheel scrolling smooth.
     * Defaults to true.
     */
    mouseWheelSmoothScroll?: boolean;
    /**
     * Flip axes. Treat vertical scrolling like horizontal and vice-versa.
     * Defaults to false.
     */
    flipAxes?: boolean;
    /**
     * If enabled, will scroll horizontally when scrolling vertical.
     * Defaults to false.
     */
    scrollYToX?: boolean;
    /**
     * Consume all mouse wheel events if a scrollbar is needed (i.e. scrollSize > size).
     * Defaults to false.
     */
    consumeMouseWheelIfScrollbarIsNeeded?: boolean;
    /**
     * Always consume mouse wheel events, even when scrolling is no longer possible.
     * Defaults to false.
     */
    alwaysConsumeMouseWheel?: boolean;
    /**
     * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
     * Defaults to 1.
     */
    mouseWheelScrollSensitivity?: number;
    /**
     * FastScrolling mulitplier speed when pressing `Alt`
     * Defaults to 5.
     */
    fastScrollSensitivity?: number;
    /**
     * Whether the scrollable will only scroll along the predominant axis when scrolling both
     * vertically and horizontally at the same time.
     * Prevents horizontal drift when scrolling vertically on a trackpad.
     * Defaults to true.
     */
    scrollPredominantAxis?: boolean;
    /**
     * Height for vertical arrows (top/bottom) and width for horizontal arrows (left/right).
     * Defaults to 11.
     */
    arrowSize?: number;
    /**
     * The dom node events should be bound to.
     * If no listenOnDomNode is provided, the dom node passed to the constructor will be used for event listening.
     */
    listenOnDomNode?: HTMLElement;
    /**
     * Control the visibility of the horizontal scrollbar.
     * Accepted values: 'auto' (on mouse over), 'visible' (always visible), 'hidden' (never visible)
     * Defaults to 'auto'.
     */
    horizontal?: ScrollbarVisibility;
    /**
     * Height (in px) of the horizontal scrollbar.
     * Defaults to 10.
     */
    horizontalScrollbarSize?: number;
    /**
     * Height (in px) of the horizontal scrollbar slider.
     * Defaults to `horizontalScrollbarSize`
     */
    horizontalSliderSize?: number;
    /**
     * Render arrows (left/right) for the horizontal scrollbar.
     * Defaults to false.
     */
    horizontalHasArrows?: boolean;
    /**
     * Control the visibility of the vertical scrollbar.
     * Accepted values: 'auto' (on mouse over), 'visible' (always visible), 'hidden' (never visible)
     * Defaults to 'auto'.
     */
    vertical?: ScrollbarVisibility;
    /**
     * Width (in px) of the vertical scrollbar.
     * Defaults to 10.
     */
    verticalScrollbarSize?: number;
    /**
     * Width (in px) of the vertical scrollbar slider.
     * Defaults to `verticalScrollbarSize`
     */
    verticalSliderSize?: number;
    /**
     * Render arrows (top/bottom) for the vertical scrollbar.
     * Defaults to false.
     */
    verticalHasArrows?: boolean;
    /**
     * Scroll gutter clicks move by page vs. jump to position.
     * Defaults to false.
     */
    scrollByPage?: boolean;
}

export interface ScrollableElementResolvedOptions {
	lazyRender: boolean;
	className: string;
	useShadows: boolean;
	handleMouseWheel: boolean;
	flipAxes: boolean;
	scrollYToX: boolean;
	consumeMouseWheelIfScrollbarIsNeeded: boolean;
	alwaysConsumeMouseWheel: boolean;
	mouseWheelScrollSensitivity: number;
	fastScrollSensitivity: number;
	scrollPredominantAxis: boolean;
	mouseWheelSmoothScroll: boolean;
	arrowSize: number;
	listenOnDomNode: HTMLElement | null;
	horizontal: ScrollbarVisibility;
	horizontalScrollbarSize: number;
	horizontalSliderSize: number;
	horizontalHasArrows: boolean;
	vertical: ScrollbarVisibility;
	verticalScrollbarSize: number;
	verticalSliderSize: number;
	verticalHasArrows: boolean;
	scrollByPage: boolean;
}

interface IMouseWheelEvent extends MouseEvent {
    readonly wheelDelta: number;
    readonly wheelDeltaX: number;
    readonly wheelDeltaY: number;

    readonly deltaX: number;
    readonly deltaY: number;
    readonly deltaZ: number;
    readonly deltaMode: number;
}

export abstract class AbstractScrollableElement {
    _listenOnDomNode: HTMLElement
    _options: ScrollableElementCreationOptions
    constructor(element: HTMLElement, options: ScrollableElementCreationOptions) {
        this._options = resolveOptions(options)
        this._listenOnDomNode = element || options.listenOnDomNode
        this._setListeningToMouseWheel(this._options.handleMouseWheel)
    }


    private _setListeningToMouseWheel(shouldListen: boolean): void {

        const onMouseWheel = (browserEvent: IMouseWheelEvent) => {
            this._onMouseWheel(new StandardWheelEvent(browserEvent))
        }
        listener(this._listenOnDomNode, 'wheel', onMouseWheel, { passive: false })
    }
    protected _onMouseWheel(e: StandardWheelEvent): void {
        // 这里要知道一个问题： 是鼠标滚轮还是触摸板滚动， 因为两者完全不同。一个就有弹性一个固定滚动
        // 而且还要根据浏览器的不同去做不一样的兼容， 比如火狐、谷狗等其他些顽皮的鬼东西。
        e.preventDefault();
        e.stopPropagation();
        const classifier =  MouseWheelClassifier.INSTANCE
        classifier.accept(Date.now(), e.deltaY, e.deltaX);
        // console.log(classifier.isPhysicalMouseWheel());
        
        if (e.deltaY || e.deltaX) {
            let deltaY = e.deltaY * this._options.mouseWheelScrollSensitivity;
			let deltaX = e.deltaX * this._options.mouseWheelScrollSensitivity;
            
        }

    }
}


export class ScrollableElement extends AbstractScrollableElement {
    constructor(element: HTMLElement, options: ScrollableElementCreationOptions = {}) {
        super(element, options)
    }
}

function resolveOptions(opts: ScrollableElementCreationOptions): ScrollableElementResolvedOptions {
    const result: ScrollableElementResolvedOptions = {
		lazyRender: (typeof opts.lazyRender !== 'undefined' ? opts.lazyRender : false),
		className: (typeof opts.className !== 'undefined' ? opts.className : ''),
		useShadows: (typeof opts.useShadows !== 'undefined' ? opts.useShadows : true),
		handleMouseWheel: (typeof opts.handleMouseWheel !== 'undefined' ? opts.handleMouseWheel : true),
		flipAxes: (typeof opts.flipAxes !== 'undefined' ? opts.flipAxes : false),
		consumeMouseWheelIfScrollbarIsNeeded: (typeof opts.consumeMouseWheelIfScrollbarIsNeeded !== 'undefined' ? opts.consumeMouseWheelIfScrollbarIsNeeded : false),
		alwaysConsumeMouseWheel: (typeof opts.alwaysConsumeMouseWheel !== 'undefined' ? opts.alwaysConsumeMouseWheel : false),
		scrollYToX: (typeof opts.scrollYToX !== 'undefined' ? opts.scrollYToX : false),
		mouseWheelScrollSensitivity: (typeof opts.mouseWheelScrollSensitivity !== 'undefined' ? opts.mouseWheelScrollSensitivity : 1),
		fastScrollSensitivity: (typeof opts.fastScrollSensitivity !== 'undefined' ? opts.fastScrollSensitivity : 5),
		scrollPredominantAxis: (typeof opts.scrollPredominantAxis !== 'undefined' ? opts.scrollPredominantAxis : true),
		mouseWheelSmoothScroll: (typeof opts.mouseWheelSmoothScroll !== 'undefined' ? opts.mouseWheelSmoothScroll : true),
		arrowSize: (typeof opts.arrowSize !== 'undefined' ? opts.arrowSize : 11),

		listenOnDomNode: (typeof opts.listenOnDomNode !== 'undefined' ? opts.listenOnDomNode : null),

		horizontal: (typeof opts.horizontal !== 'undefined' ? opts.horizontal : ScrollbarVisibility.Auto),
		horizontalScrollbarSize: (typeof opts.horizontalScrollbarSize !== 'undefined' ? opts.horizontalScrollbarSize : 10),
		horizontalSliderSize: (typeof opts.horizontalSliderSize !== 'undefined' ? opts.horizontalSliderSize : 0),
		horizontalHasArrows: (typeof opts.horizontalHasArrows !== 'undefined' ? opts.horizontalHasArrows : false),

		vertical: (typeof opts.vertical !== 'undefined' ? opts.vertical : ScrollbarVisibility.Auto),
		verticalScrollbarSize: (typeof opts.verticalScrollbarSize !== 'undefined' ? opts.verticalScrollbarSize : 10),
		verticalHasArrows: (typeof opts.verticalHasArrows !== 'undefined' ? opts.verticalHasArrows : false),
		verticalSliderSize: (typeof opts.verticalSliderSize !== 'undefined' ? opts.verticalSliderSize : 0),

		scrollByPage: (typeof opts.scrollByPage !== 'undefined' ? opts.scrollByPage : false)
	};
    return result
}