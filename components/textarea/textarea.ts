import { TextareaProps as Props, TextareaTypes as Types } from './type'
import { defineEl, getProps, listener, setStyle } from '_utils/dom' // setStyle
import Base from '_utils/Base'
import InputCommon from 'input/Common'
import MixinSet from 'input/Mixins';
import { sto } from '_utils/common';
class Textarea extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-textarea',
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
        let { ipt, prefix, suffix, allowClear, addonBefore, addonAfter } = args
        prefix && root.insertBefore(prefix, root.firstChild);
        addonBefore && root.insertBefore(addonBefore, root.firstChild);
        listener(ipt, 'resize', _ => {
            root?.onResize?.(_)
        });
        sto(() => {

        if (root['attrs']['auto-size'] + '' == 'true' || root['attrs']['min-rows'] || root['attrs']['max-rows']) {
            listener(ipt, 'input', (_: any) => {
                setStyle(ipt, {
                    height: _.target.scrollHeight + 'px'
                })
            });
            let fontSize: any = window.getComputedStyle(ipt).getPropertyValue('line-height') || 14

            let size = parseFloat(fontSize);
            if (root['attrs']['min-rows']) {
                let min = root['attrs']['min-rows'] * size;
                setStyle(ipt, { minHeight: min + 'px' })
            }

            if (root['attrs']['max-rows']) {
                let max = root['attrs']['max-rows'] * size;
                setStyle(ipt, { maxHeight: max + 'px' })
            }
            setStyle(ipt, { resize: 'none' })
        }
    })






        root.append(ipt, allowClear, suffix, addonAfter);
    }
}


export default new Textarea()