import { numberProps as Props, numberTypes as Types } from './type'
import { createEl, defineEl, getProps, listener, setStyle } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
import InputCommon from '../input/Common'
import MixinSet from '../input/Mixins';
class InputNumber extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-input-number',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                const that = this;
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0)
                this.core = new InputCommon({
                    root: this, callback(args: any) {
                        context.initView(that, args, this)
                    }
                });
                this.observeAttr = new MixinSet(this.core, this)
            },
            attributeChangedCallback(...args: any) {
                let [k, _o, v] = args;
                this.observeAttr?.[k]?.(v)
            }
        })
    }



    initView(root: HTMLElement | any, args: any, _Common: InputCommon) {
        let { ipt, prefix, suffix, allowClear, addonBefore, addonAfter, number } = args
        prefix && root.insertBefore(prefix, root.firstChild);
        addonBefore && root.insertBefore(addonBefore, root.firstChild);
        let min = root['attrs']['min'];
        let max = root['attrs']['max'];
        let step = root['attrs']['step'];
        let parserStr = root['attrs']['parser']
        let parser = root?.parser || ((value: any) => value + (parserStr || ''))
        ipt.value = _Common.supValues.inputValues = parser(ipt.value);
        listener(number.up, 'click', e => {
            let value = parseFloat(ipt.value);
            console.log(value, max)
            if (value >= max) {
                setStyle(number.up, { cursor: 'not-allowed' })
                return
            } else {
                setStyle(number.up, { cursor: 'pointer' })
            }
            setStyle(number.down, { cursor: 'pointer' })
            let nv = value + (step ? +step : 1);
            ipt.value = _Common.supValues.inputValues = parser(nv);
        })
        listener(number.down, 'click', e => {
            let value = parseFloat(ipt.value);
            console.log(value, min)
            if (value <= min) {
                setStyle(number.down, { cursor: 'not-allowed' })
                return
            }
            setStyle(number.down, { cursor: 'pointer' })
            setStyle(number.up, { cursor: 'pointer' })
            let nv = value - (step ? +step : 1)
            ipt.value = _Common.supValues.inputValues = parser(nv);
        })
        root.append(ipt, allowClear, suffix, number, addonAfter);
    }
}


export default new InputNumber()