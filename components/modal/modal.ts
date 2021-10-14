import typeProps, { modalProps } from './type'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps, listener } from '../_utils/dom'
import './style'


// 考虑到loc 这边后续会增加依赖注入和后期依赖参数； (defineReactive)
// 现在还没办法做到改变外部依赖的数据
// 打算通过原型注入api e.target
// 已经实现了多个弹窗叠加功能 

// 2021-10-7 已完成基本的功能
// 下一步开始优化代码、单元测试、md文档、动态attr兼容 
const spButtonCss = `
  .sp-modal-footer{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  `
const keys: string[] = Object.keys(typeProps())
let zIndex = 2000;
const cancelClick = function () { this.onClose && this.onClose() }

const sto: (fn: Function, time?: number) => void = (fn, time = 16) => {
    let t = setTimeout(async () => {
        await fn()
        clearTimeout(t)
    }, time);
}
class Modal {
    constructor() {
        let self = this
        defineEl({
            tag: 'sp-modal',
            observedAttributes: keys,
            shadow: 'open',
            connectedCallback() {
                (this.attrs as Partial<ReturnType<typeof typeProps>>) = getProps(this)
                this.attrs = { ...modalProps, ...this.attrs }
                if (this.attrs.appendbody == 'true') {
                    this.remove()
                    this['attr-appendbody'] = 'false'
                    document.body.appendChild(this)
                } else {
                    sto(()=> this.useAllEls = self.initView.call(this));// 初始化视图
                }
            },
            attributeChangedCallback(...args) {
                let [key, _, newkey] = args
                runIFELSE.call(this, new Set([
                    [key == 'visible', () => {
                        console.log(newkey)
                        newkey && zIndex++
                        if (this.useAllEls) self._fadeami(newkey, this)
                    }],
                    [key == 'center', () => {
                        setStyle(this, {
                            marginTop: newkey == 'false' ? '15vh' : 'auto'
                        })
                    }]
                ]))
            }
        })
    }
    private initView = function (): object {
        {
            zIndex++
        }
        let content: HTMLElement = createEl('main'),
            headerL: HTMLElement = createEl('span'),
            headerR: HTMLElement = createEl('span'),
            header: HTMLElement = createEl('header'),
            template: HTMLTemplateElement = createEl('template'),
            mock: HTMLElement = createEl('div'),
            footer: HTMLElement = createEl('footer'),
            footerCancel: HTMLElement = createEl('sp-button'),
            footerOk: HTMLElement = createEl('sp-button')

        let nodes: any[] = Array.from(this.children)
        let slots: string[] = ['footer', 'header', 'content']
        let slotObj = nodes.reduce((obj, i) => {
            let slot = i.getAttribute('slot')
            if (slots.includes(slot)) obj[slot] = slot
            return obj
        }, Object.create(null))

        this.zIndex = zIndex
        this.className = 'sp-modal' + ' sp-modal' + (zIndex - 2000) + ' ' + (this.attrs.class);
        content.className = 'sp-modal-content';
        headerR.className = this.attrs.closable == 'false' ? '' : 'sp-icon sp-icon-close'
        mock.className = 'sp-modal-mock sp-modal-mock-' + zIndex
        header.className = 'sp-modal-header';
        footer.className = 'sp-modal-footer-active';
        headerL.innerHTML = this.attrs.title;
        footerCancel.innerHTML = this.attrs.canceltext;
        footerOk.innerHTML = this.attrs.oktext;
        header.setAttribute('slot', 'header')
        footer.setAttribute('slot', 'footer')
        header.appendChild(headerL);
        header.appendChild(headerR);
        footer.appendChild(footerCancel);
        footer.appendChild(footerOk);
        footerCancel.onclick = cancelClick.bind(this)
        footerOk.onclick = _ => { this?.onOk?.(this?.onOk?.length > 0 ? _ : null) }
        template.innerHTML = `
        <style>${spButtonCss}${this.attrs.setslotstyle}</style>
        <slot name="header"></slot> 
        <slot name="content">按照格式书写</slot>
        <slot name="footer" class="sp-modal-footer"></slot>
        `
        setStyle(this, {
            zIndex: String(zIndex),
            marginTop: this.attrs.center == 'false' ? '15vh' : 'auto',
            display: 'none',
        })
        setStyle(mock, {
            zIndex: String(zIndex - 1),
            display: 'none'
        })

        listener(headerR, 'click', cancelClick.bind(this))
        !slotObj?.header && this.insertBefore(header, this.firstChild)
        this.attrs.footer !== 'null' && !Reflect.has(slotObj, 'footer') && this.appendChild(footer)
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        if (this.attrs.modal !== 'false') {
            document.body.appendChild(mock)
            mock.onclick = cancelClick.bind(this)
        }
        if (this.attrs.visible == 'true') {
            setStyle(this, {
                display: 'block',
            })
            setStyle(mock, {
                display: 'block'
            })
        }
        return {
            header,
            headerL,
            headerR,
            mock,

        }
    }
    private _fadeami(newkey: string, self: any) {
        if (newkey == 'true') {
            setStyle(self, {
                display: 'block',
                zIndex: String(zIndex + 1),
            })
            setStyle(self.useAllEls?.mock, {
                display: 'block',
                zIndex: String(zIndex),
            })
            self.classList.add('sp-modal-enter-active')
            self.useAllEls?.mock.classList.add('sp-modal-mock-enter-active')
            sto(() => {
                self.classList.remove('sp-modal-enter-active')
                self.useAllEls?.mock.classList.remove('sp-modal-mock-enter-active')
            }, 290)
        } else {
            self.classList.add('sp-modal-leave-active')
            self.useAllEls?.mock.classList.add('sp-modal-mock-leave-active')
            sto(() => {
                setStyle(self, { display: 'none' })
                setStyle(self.useAllEls?.mock, { display: 'none', })
                self.classList.remove('sp-modal-leave-active')
                self.useAllEls?.mock.classList.remove('sp-modal-mock-leave-active')
            }, 290)
        }
    }
}
export {Modal}
export default new Modal() 