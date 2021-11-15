import { runIFELSE, sto } from '../_utils/common'
import { breadcrumbTypesProps, breadcrumbProps } from './type'
import { defineEl, getProps, $el, createEl } from '../_utils/dom'


class Item {
    constructor() {
        const context = this
        defineEl({
            tag: 'sp-breadcrumb-item',
            connectedCallback() {
                this.className = this.tagName.toLocaleLowerCase()
                this.appendChild(this.parentElement.icon.cloneNode(true))
            }
        })
    }

}

export default new Item()