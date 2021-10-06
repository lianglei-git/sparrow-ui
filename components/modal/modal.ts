import typeProps from './type'
import { style } from '../_utils/style'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps, listener } from '../_utils/dom'
import './style'


// 考虑到loc 这边后续会增加依赖注入和后期依赖参数； (defineReactive)
// 现在还没办法做到改变外部依赖的数据
// 打算通过原型注入api e.target
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
    let curHTML: string = this.innerHTML
    this.innerHTML = ''

    content.className = 'sp-modal-content';
    footer.className = 'sp-modal-footer';
    this.className = 'sp-modal' + ' sp-modal' + (zIndex - 2000);
    headerR.className = this.attrs.closable == 'false' ? '' : 'sp-icon sp-icon-close'
    mock.className = 'sp-modal-mock sp-modal-mock-' + zIndex
    header.className = 'sp-modal-header';
    headerL.innerHTML = this.attrs.title || ''
    content.innerHTML = curHTML

    header.appendChild(headerL)
    header.appendChild(headerR)
    footer.innerHTML = 'Footer'

    setStyle(this, {
        zIndex: String(zIndex)
    })
    setStyle(mock, {
        zIndex: String(zIndex - 1)
    })

    listener(headerR, 'click', _ => {
        setStyle(this, {
            display: 'none'
        })
        setStyle(mock, {
            display: 'none'
        })
        this['attr-visible'] = 'false'
    })
    this.insertBefore(header, this.firstChild)
    this.appendChild(content)
    this.appendChild(footer)
    document.body.appendChild(mock)
    if (this.attrs.visible !== 'true') {
        setStyle(this, {
            display: 'none'
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

let changeProps
export default (() => {
    defineEl({
        tag: 'sp-modal',
        observedAttributes: keys,
        connectedCallback() {
            (this.attrs as Partial<ReturnType<typeof typeProps>>) = getProps(this)
            // console.log(this.attrs)
            if (this.attrs.appendbody == 'true') {
                this.remove()
                this['attr-appendbody'] = 'false'
                document.body.appendChild(this)
            } else {
                this.useAllEls = initView.call(this);// 初始化视图
            }
            this.onload = () => {
                console.log('是啊 我最终还是打败了魔法！')
            }
            this.onchange = () => {
                console.log('是啊 我最终还是打败了魔法！')
            }
        },
        disconnectedCallback() {
        },
        getConstructor() {
        },
        attributeChangedCallback(...args) {
            let [key, oldkey, newkey] = args
            console.log(newkey)
            runIFELSE.call(this, new Set([
                [key == 'visible', () => {
                    if (this.useAllEls) {
                        setStyle(this, {
                            display: newkey == 'true' ? 'flex' : 'none'
                        })
                        setStyle(this.useAllEls?.mock, {
                            display: newkey == 'true' ? 'block' : 'none'
                        })
                    }
                }]
            ]))
        }
    })
})()