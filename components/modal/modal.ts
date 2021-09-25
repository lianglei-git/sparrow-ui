import typeProps from './type'
import { style } from '../_utils/style'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps } from '../_utils/dom'
import './style'

export default (() => {
    defineEl({
        tag: 'sp-modal',
        // observedAttributes: Object.keys()
        connectedCallback() {
            this.className = 'sp-modal';
            let attrs:Partial<ReturnType<typeof typeProps>> = getProps(this)

            let header:HTMLElement = createEl('header');
            let headerL = createEl('span');
            let headerR = createEl('em')
            header.className = 'sp-modal-header';
            headerL.innerHTML = attrs.title || ''
            headerR.innerHTMl = 'X'
            header.appendChild(headerL)
            header.appendChild(headerR)
            this.appendChild(header)


        }
    })
})()