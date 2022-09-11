import { sto } from '_utils/common'
import { defineEl } from '_utils/dom'
class Item {
    constructor() {
        defineEl({
            tag: 'sp-breadcrumb-item',
            connectedCallback() {
                this.className += ' ' + this.tagName.toLocaleLowerCase()
                // !this.innerHTML ?
                
                sto(() => this.appendChild(this.parentElement.icon.cloneNode(true))) 
                // :this.appendChild(this.parentElement.icon.cloneNode(true))
            }
        })
    }

}

export default new Item()