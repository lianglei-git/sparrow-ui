import { SearchProps as Props, SearchTypes as Types } from './type'
import { defineEl, getProps } from '_utils/dom' // setStyle
import Base from '_utils/Base'
import InputCommon from 'input/Common';
import MixinSet from 'input/Mixins';


class Search extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-search',
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
                })
                this.observeAttr = new MixinSet(this.core, this)

            },
            attributeChangedCallback(...args: any) {
                let [k, _, v] = args;
                if (k == 'loading' && this?._searchIconEl) {
                    if (this['attrs']['enter-button']) {
                        this._searchIconEl['attr-loading'] = v
                    } else {
                        this._searchIconEl.iconEl.className = 'sp-icon ' + (v + '' == 'true' ? 'sp-icon-loading' : 'sp-icon-search')
                    }
                };
                this.observeAttr?.[k]?.(v)
            }
        })
    }



    initView(root: HTMLElement | any, args: any, _Common: InputCommon) {
        let { ipt, prefix, suffix, allowClear, addonBefore, showCountEl, addonAfter } = args
        prefix && root.insertBefore(prefix, root.firstChild);
        let el = _Common._searchButton();
        let buttonText = root['attrs']['enter-button']
        if (buttonText) {
            // el.classList.add('sp-icon sp-icon-search')
            el.textContent = root['attrs']['enter-button'];
            el['attr-type'] = 'primary'
        }

        if(buttonText+'' == 'false') {
            el = ''
        }

        addonBefore && root.insertBefore(addonBefore, root.firstChild)
        root.append(ipt, allowClear, showCountEl, suffix, addonAfter, el);
    }
}


export default new Search()