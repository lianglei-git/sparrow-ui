import {collapseProps , collapseTypes } from './type'
import { sto } from '_utils/common'
import { defineEl, getProps } from '_utils/dom' // setStyle
import './style'
import Base from '_utils/Base'
import './collapseItem'
class Collapse extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-collapse',
            observedAttributes: Object.keys(collapseProps),
            connectedCallback() {
                (this.attrs as Partial<collapseTypes>) = getProps(this);
                this.attrs = { ...collapseProps, ...this.attrs };
                sto(() => context.initView(this))
            },
            // attributeChangedCallback(...args: any) {
            //     let [key, _, newval] = args;
            //     key 
            //     newval
            // }
        })
    }

    initView(root: HTMLElement | any) {
        let attrs = root.attrs;
        this._setClassName(root, [attrs['ghost']+'' == 'true' ? '--ghost' : '', attrs['simple']+'' =='true'? '--simple': '']);
    }
}


export default new Collapse()