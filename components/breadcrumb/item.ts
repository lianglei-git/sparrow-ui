import { defineEl } from '../_utils/dom'


class Item {
    constructor() {
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