import { checkboxProps as Props, checkboxTypes as Types } from './type'
import { createEl, defineEl, getProps, listener, setStyle } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
class CheckBox extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-checkbox',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                const that = this;
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0)
            },
            attributeChangedCallback(...args: any) {
                let [k, _o, v] = args;
            }
        })
    }



    initView(root: HTMLElement | any, args: any) {
       
    }
}


export default new CheckBox()