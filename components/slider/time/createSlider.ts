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
}

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

    ctxTarget: HTMLElement;

    constrCalc: any = null

    balance: number = 0;

    _curValues: {
        o?: number | undefined // 由左向右第一个
        t?: number | undefined // 由左向右第二个
    } = {};

    handlesRefs: any

    defaultProps: {

    }
    // 下面是重载函数 全部为大写 
    // props change
    PROPSCHANGE(args: {
        o_percent?: number
        t_percent?: number
    }) { }
    // props handle mouse down
    PROPSHANDLEMOUSEDOWN(e:any) {};

    // props handle mouse up
    PROPSHANDLEMOUSEUP(e:any) {};


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
        listener(this.handlesRefs[0], 'mousedown', this.onMouseDown);

    }

    onMouseMove = (e: any) => {
        this.constrCalc = null;
        const position = getMousePosition(this.props.vertical, e);
        // console.log(this.dragOffset - position, '滑动')
        // @ts-ignore
        this.constrCalc = new CalcValueByPos<CalcValueByPosProps>({
            position,
            ...this.props,
            _change: ({ value, range }: { value: number, range?: number }) => {
                let { o, t = undefined } = this._curValues
                if (!range && o != value) {
                    this._curValues.o = value;
                    let percent = 100 / this.balance * (this._curValues.o - this.props.min)
                    this.PROPSCHANGE({ o_percent: ~~percent })
                }
            }
        })

    }

    onMouseStart(e:any) {
        this.removeDocumentEvents();
        this.onMouseDown(e);
        this.onMouseMove(e);
        this.addDocumentMouseEvents();
        this.focus()
    }

    clickFocus() {
        this.focus();
    }

    focus() {
        if (this.props.disabled) {
          return;
        }
        this.handlesRefs[0]?.focus();
      }

    onMouseDown(e: any) {
        e.target.focus()
        console.log(e.button, this, '按下')
        this.removeDocumentEvents();
        this.onDown(e)
        this.addDocumentMouseEvents();
        pauseEvent(e);
        this.PROPSHANDLEMOUSEDOWN(e)
    }

    onDown(e: MouseEvent) {
        const isVertical = this.props.vertical;
        const position = getMousePosition(isVertical, e);
        if (!isVertical) {
            const handlePosition = getHandleCenterPosition(isVertical, e.target as any);
            this.dragOffset = position - handlePosition;
            console.log(position, handlePosition)
        } else {
            this.dragOffset = 0;
        }
    }

    onEnd(e:any) {
        console.log('离开')
        this.removeDocumentEvents();
        this.PROPSHANDLEMOUSEUP(e)
    }

    blur() {
        if (this.props.disabled) {
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