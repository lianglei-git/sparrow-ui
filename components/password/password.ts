import { PasswordProps as Props, PasswordTypes as Types } from './type'
import { createEl, defineEl, getProps, listener } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
import InputCommon from 'input/Common'
import MixinSet from 'input/Mixins';
class Password extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-password',
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
        prefix && root.insertBefore(prefix, root.firstChild);
        let iconShow = root['attrs']['icon-show'];
        let iconUnShow = root['attrs']['icon-unshow'];
        let visible = root['attrs']['visible'] + '' == 'true' ? 1 : 0
        let el = createEl('em');
        el.className = 'password-el sp-icon ' + iconUnShow;
        listener(el, 'click', _ => {
            if (ipt.getAttribute('type') == 'password') {
                ipt.setAttribute('type', 'default');
                el.className = 'password-el sp-icon ' + iconShow;
                return
            }
            el.className = 'password-el sp-icon ' + iconUnShow;
            ipt.setAttribute('type', 'password');

        })
        ipt.setAttribute('type', 'password');

        addonBefore && root.insertBefore(addonBefore, root.firstChild)
        root.append(ipt, allowClear, showCountEl, suffix, (visible ? el : ''), addonAfter);
    }
}


export default new Password()