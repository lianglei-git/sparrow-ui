import { listener } from "sparrow-ui/_utils/dom";
import { bindAll, pauseEvent, getHandleCenterPosition, getMousePosition } from './_utils'
import { CalcValueByPos } from './calc'
interface ComponentEnhancerProps {
    ctxTarget: HTMLElement
    disabled?: boolean | string
    vertical: boolean
    reverse?: boolean
    min: number
    max: number
    handlesRefs: HTMLElement[]
    draggabletrack: boolean;
    defaults: Array<any>
    trackEl: any
}


const enum SortEnum {
    handleEl,
    handleEl2,
    trackEl
}
type SortType = SortEnum;
type Calcs = {
    reverse?: boolean; vertical?: boolean; position: number; ctxTarget: any
}
type CalcValueByPosProps = Calcs & Partial<ComponentEnhancerProps>

class ComponentEnhancer {

    onMouseMoveListener: any;

    onMouseUpListener: any;

    document: HTMLElement | Document;

    props: ComponentEnhancerProps;

    dragOffset: number;

    ctxTarget: HTMLElement | any;

    constrCalc: any = null

    balance: number = 0;

    _curValues: {
        o?: number | undefined // 由左向右第一个
        t?: number | undefined // 由左向右第二个
        curHandle: SortType
    } = { curHandle: 0 };

    handlesRefs: any

    trackEvent: any;

    defaultProps: {

    }
    // 下面是重载函数 全部为大写 
    // props change
    PROPSCHANGE(args: {
        o_percent?: number
        t_percent?: number
        oValue?: number
        tValue?: number
        trackValue?: number
        trackEvent?: any
        curHandle?: SortType// 当前handle
    }) { }
    // props handle mouse down
    PROPSHANDLEMOUSEDOWN(e: any, curHandle: SortType) { };

    // props handle mouse up
    PROPSHANDLEMOUSEUP(e: any, curHandle: SortType) { };


    constructor(props: ComponentEnhancerProps) {
        let { ctxTarget: target, handlesRefs } = props;
        this.props = props;
        this.ctxTarget = target
        this.document = target && target.ownerDocument;
        this.handlesRefs = handlesRefs;
        this.balance = this.props.max - this.props.min
        bindAll(['onMouseDown', 'onMounted', 'onEnd', 'removeDocumentEvents', 'addDocumentMouseEvents'], this)
    }


    onMounted() {
        listener(this.handlesRefs[0], 'mousedown', e => this.onMouseDown(e, 0));
        this.handlesRefs[1] && listener(this.handlesRefs[1], 'mousedown', e => this.onMouseDown(e, 1));
        if (this.props.defaults.length >= 2 && this.props.draggabletrack) {
            listener(this.props.trackEl, 'mousedown', e => this.onMouseDown(e, 2));
        }
    }

    onMouseMove = (e: any) => {
        this.constrCalc = null;
        const position = getMousePosition(this.props.vertical, e);
        // console.log(this.dragOffset - position, '滑动')
        // @ts-ignore
        this.constrCalc = new CalcValueByPos<CalcValueByPosProps>({
            position,
            ...this.props,
            _change: ({ value }: { value: number }) => {
                let { o, t = undefined, curHandle } = this._curValues;
                let percent = 100 / this.balance * (value - this.props.min);
                if (curHandle === 0 && o != value) {
                    this._curValues.o = value;
                    this.PROPSCHANGE({ o_percent: ~~percent, oValue: value, curHandle });
                    return
                }
                if (curHandle === 1 && t != value) {
                    this._curValues.t = value;
                    this.PROPSCHANGE({ t_percent: ~~percent, tValue: value, curHandle })
                    return
                }
                // track 拖拽
                if (curHandle === 2) {
                    this.PROPSCHANGE({ t_percent: ~~percent, trackValue: value, trackEvent: this.trackEvent, curHandle })
                }

            }
        })

    }

    onMouseStart(e: any, sort: SortType = 0) {
        this.removeDocumentEvents();
        this.onMouseDown(e, sort);
        this.onMouseMove(e);
        this.addDocumentMouseEvents();
        this.focus()
    }

    clickFocus() {
        this.focus();
    }

    focus() {
        if (this.ctxTarget.disabled) {
            return;
        }
        this.handlesRefs[0]?.focus();
    }

    onMouseDown(e: any, sort: SortType) {
        if (this.ctxTarget.disabled)return;
        this._curValues.curHandle = sort;
        e.target.focus()
        this.removeDocumentEvents();
        this.onDown(e)
        this.addDocumentMouseEvents();
        pauseEvent(e);
        if (sort !== SortEnum.trackEl) {
            this.PROPSHANDLEMOUSEDOWN(e, sort)
        } else {
            this.trackEvent = e;
        }
    }

    onDown(e: MouseEvent) {
        const isVertical = this.props.vertical;
        const position = getMousePosition(isVertical, e);
        if (!isVertical) {
            const handlePosition = getHandleCenterPosition(isVertical, e.target as any);
            this.dragOffset = position - handlePosition;
        } else {
            this.dragOffset = 0;
        }
    }

    onEnd(e: any) {
        this.removeDocumentEvents();
        this.PROPSHANDLEMOUSEUP(e, this._curValues.curHandle)
    }

    blur() {
        if (this.ctxTarget.disabled) {
            return;
        }
        Object.keys(this.handlesRefs).forEach((key) => {
            this.handlesRefs[key]?.blur?.();
        });
    }

    addDocumentMouseEvents() {
        this.onMouseMoveListener = listener(this.document, 'mousemove', this.onMouseMove);
        this.onMouseUpListener = listener(this.document, 'mouseup', this.onEnd);
    }

    removeDocumentEvents() {
        this.onMouseMoveListener && this.onMouseMoveListener.remove();
        this.onMouseUpListener && this.onMouseUpListener.remove();
        /* eslint-enable no-unused-expressions */
    }

}


export default ComponentEnhancer;