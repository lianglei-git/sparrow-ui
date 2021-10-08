import typeProps from './type'
import { style } from '../_utils/style'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps, listener } from '../_utils/dom'
import './style'


// 考虑到loc 这边后续会增加依赖注入和后期依赖参数； (defineReactive)
// 现在还没办法做到改变外部依赖的数据
// 打算通过原型注入api e.target
// 已经实现了多个弹窗叠加功能 

// 2021-10-7 已完成基本的功能
// 下一步开始优化代码、单元测试、md文档、动态attr兼容 
let spButtonCss = `
  .sp-modal-footer{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  `
let keys: string[] = Object.keys(typeProps())
let zIndex = 2000;
let cancelClick = function () {
    this['attr-visible'] = 'false'
    this.onClose && this.onClose()
}
let initView = function (): object {
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
    content.className = 'sp-modal-content';
    this.className = 'sp-modal' + ' sp-modal' + (zIndex - 2000) + ' ' + (this.attrs?.class || '');
    headerR.className = this.attrs.closable == 'false' ? '' : 'sp-icon sp-icon-close'
    mock.className = 'sp-modal-mock sp-modal-mock-' + zIndex
    header.className = 'sp-modal-header';
    footer.className = 'sp-modal-footer-active';
    headerL.innerHTML = this.attrs.title || '';
    footerCancel.innerHTML = this.attrs.canceltext || '取消';
    footerOk.innerHTML = this.attrs.oktext || '确认';
    header.setAttribute('slot', 'header')
    footer.setAttribute('slot', 'footer')
    header.appendChild(headerL);
    header.appendChild(headerR);
    footer.appendChild(footerCancel);
    footer.appendChild(footerOk);
    footerCancel.onclick = cancelClick.bind(this)
    footerOk.onclick = _ => {
        this?.onOk?.(this?.onOk?.length > 0 ? _ : null)
    }
    template.innerHTML = `
    <style>${spButtonCss}</style>
    <slot name="header"></slot> 
    <slot name="content">按照格式书写</slot>
    <slot name="footer" class="sp-modal-footer"></slot>
    `
    setStyle(this, {
        zIndex: String(zIndex),
        marginTop: this.attrs.center == 'false' ? '15vh' : 'auto'
    })
    setStyle(mock, {
        zIndex: String(zIndex - 1)
    })

    listener(headerR, 'click', cancelClick.bind(this))
    !slotObj?.header && this.insertBefore(header, this.firstChild)
    this.attrs.footer !== 'null' && !slotObj?.footer && this.appendChild(footer)
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    if (this.attrs.modal !== 'false') {
        document.body.appendChild(mock)
        mock.onclick = cancelClick.bind(this)
    }
    if (this.attrs.visible !== 'true') {
        setStyle(this, {
            display: 'none',
        })
        setStyle(mock, {
            display: 'none'
        })
    }
    return {
        header,
        headerL,
        headerR,
        mock,

    }
}

 class Modal {
    constructor() {
        defineEl({
            tag: 'sp-modal',
            observedAttributes: keys,
            shadow: 'open',
            connectedCallback() {
                (this.attrs as Partial<ReturnType<typeof typeProps>>) = getProps(this)
                if (this.attrs.appendbody == 'true') {
                    this.remove()
                    this['attr-appendbody'] = 'false'
                    document.body.appendChild(this)
                } else {
                    this.useAllEls = initView.call(this);// 初始化视图
                }
            },
            disconnectedCallback() {
            },
            getConstructor() {
            },
            attributeChangedCallback(...args) {
                let [key, oldkey, newkey] = args
                runIFELSE.call(this, new Set([
                    [key == 'visible', () => {
                        newkey && zIndex++
                        if (this.useAllEls) { // 添加动画和展示
                            if (newkey == 'true') {
                                setStyle(this, {
                                    display: 'block',
                                    zIndex: String(zIndex + 1),
                                })
                                setStyle(this.useAllEls?.mock, {
                                    display: 'block',
                                    zIndex: String(zIndex),
                                })
                                this.classList.add('sp-modal-enter-active')
                                this.useAllEls?.mock.classList.add('sp-modal-mock-enter-active')
                                setTimeout(() => {
                                    this.classList.remove('sp-modal-enter-active')
                                    this.useAllEls?.mock.classList.remove('sp-modal-mock-enter-active')
                                }, 310)
                            } else {
                                this.classList.add('sp-modal-leave-active')
                                this.useAllEls?.mock.classList.add('sp-modal-mock-leave-active')
                                setTimeout(() => {
                                    this.classList.remove('sp-modal-leave-active')
                                    this.useAllEls?.mock.classList.remove('sp-modal-mock-leave-active')
                                    setStyle(this, {
                                        display: 'none',
                                        zIndex: String(zIndex + 1),
                                    })
                                    setStyle(this.useAllEls?.mock, {
                                        display: 'none',
                                        zIndex: String(zIndex),
                                    })
                                }, 310)
                            }
                        }
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
}

export default new Modal() 