import { InputProps as Props, InputTypes as Types } from './type'
import { defineEl, getProps } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
import InputCommon from './Common'
import MixinSet from './Mixins';

class Input extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-input',
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
        let { ipt, prefix, suffix, allowClear, addonBefore, showCountEl, addonAfter } = args
        prefix && root.insertBefore(prefix, root.firstChild)
        addonBefore && root.insertBefore(addonBefore, root.firstChild)
        root.append(ipt, allowClear, showCountEl, suffix, addonAfter);
    }
}


export default new Input()