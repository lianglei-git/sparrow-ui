import typeProps from './type'
import { style } from '../_utils/style'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps, listener } from '../_utils/dom'
import './style'


// 考虑到loc 这边后续会增加依赖注入和后期依赖参数； (defineReactive)
// 现在还没办法做到改变外部依赖的数据
// 打算通过原型注入api e.target
// 已经实现了多个弹窗叠加功能 

let keys: string[] = Object.keys(typeProps())
let zIndex = 2000
let initView = function (): object {
    {
        zIndex++
    }
    // let allel:NodeList = $el('sp-modal');
    // let lastel:HTMLElement | any = last(Array.from(allel))
    // let Zindex:number =  2000 + allel.length
    let content: HTMLElement = createEl('main'),
        headerL: HTMLElement = createEl('span'),
        headerR: HTMLElement = createEl('span'),
        header: HTMLElement = createEl('header'),
        footer: HTMLElement = createEl('footer'),
        mock: HTMLElement = createEl('div')

    this.zIndex = zIndex
    content.className = 'sp-modal-content';
    footer.className = 'sp-modal-footer';
    this.className = 'sp-modal' + ' sp-modal' + (zIndex - 2000) + ' ' + (this.attrs?.class || '');
    headerR.className = this.attrs.closable == 'false' ? '' : 'sp-icon sp-icon-close'
    mock.className = 'sp-modal-mock sp-modal-mock-' + zIndex
    header.className = 'sp-modal-header';
    headerL.innerHTML = this.attrs.title || ''
    header.appendChild(headerL)
    header.appendChild(headerR)
    footer.innerHTML = 'Footer'

    setStyle(this, {
        zIndex: String(zIndex),
        marginTop: this.attrs.center == 'false' ? '15vh' : 'auto'
    })
    setStyle(mock, {
        zIndex: String(zIndex - 1)
    })

    listener(headerR, 'click', _ => {
        this['attr-visible'] = 'false'
        this.onClose && this.onClose()
    })
    this.insertBefore(header, this.firstChild)
    this.appendChild(footer)
    this.attrs.modal !== 'false' && document.body.appendChild(mock)
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
        footer,
        mock,

    }
}

export default (() => {
    defineEl({
        tag: 'sp-modal',
        observedAttributes: keys,
        connectedCallback() {
            (this.attrs as Partial<ReturnType<typeof typeProps>>) = getProps(this)
            if (this.attrs.appendbody == 'true') {
                this.remove()
                this['attr-appendbody'] = 'false'
                document.body.appendChild(this)
            } else {
                this.useAllEls = initView.call(this);// 初始化视图
            }
            this.onload = () => {
                console.log('是啊 最终还是打败了魔法！')
            }
            this.onchange = () => {
                console.log('是啊 最终还是打败了魔法！')
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
})()