import typeProps from './type'
import { style } from '../_utils/style'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps, $el, last} from '../_utils/dom'
import './style'
let zIndex = 2000
let initView = function (): void {
    // let allel:NodeList = $el('sp-modal');
    // let lastel:HTMLElement | any = last(Array.from(allel))
    // let Zindex:number =  2000 + allel.length
    zIndex++
    this.zIndex = zIndex
    let curHTML: string = this.innerHTML
    this.innerHTML = ''
    let content: HTMLElement = createEl('main')
    content.className = 'sp-modal-content';
    content.innerHTML = curHTML
    this.className = 'sp-modal' + ' sp-modal'+(zIndex - 2000);
    let header: HTMLElement = createEl('header');
    let headerL = createEl('span');
    let headerR = createEl('span')
    header.className = 'sp-modal-header';
    headerL.innerHTML = this.attrs.title || ''
    headerR.innerHTMl = this.attrs.closable == 'false' ? '' : 'X'
    console.log(headerR.innerHTMl)
    header.appendChild(headerL)
    header.appendChild(headerR)
    let footer: HTMLElement = createEl('footer')
    footer.className = 'sp-modal-footer';
    footer.innerHTML = 'Footer'
    setStyle(this, {
        zIndex: String(zIndex)
    })
    this.insertBefore(header, this.firstChild)
    this.appendChild(content)
    this.appendChild(footer)
}
export default (() => {
    defineEl({
        tag: 'sp-modal',
        observedAttributes: ['title', 'appendbody'],
        connectedCallback() {
            (this.attrs as Partial<ReturnType<typeof typeProps>>) = getProps(this)
            if (this.attrs.appendbody=='true') {
                this.remove()
                this['attr-appendbody'] = 'false'
                document.body.appendChild(this)
            }else {
                initView.call(this);// 初始化视图
            }
        },
        disconnectedCallback() {
        },
        getConstructor() {
        }
    })
})()