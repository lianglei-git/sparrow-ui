import { SelectProps as Props, SelectTypes as Types } from './type'
import { defineEl, getProps } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'


class Search extends Base {
    context: this
    constructor() {
        super()
        defineEl({
            tag: 'sp-select',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0);
                this.initView();
            },
            attributeChangedCallback(...args: any) {
                console.log(args);
            }
        })
    }



    initView(root: HTMLElement) {
       console.log(root)
    }
}


export default new Search()