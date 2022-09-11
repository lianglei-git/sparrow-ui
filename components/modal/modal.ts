import typeProps, { modalProps } from './type'
import { runIFELSE, sto} from '_utils/common'
import {getIndex, setIndex} from 'common/index'
import { defineEl, createEl, setStyle, getProps, listener } from '_utils/dom'
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
const keys: string[] = Object.keys(typeProps());
const cancelClick = function () { this.onClose && this.onClose() }



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
                    sto(() => {
                        this.useAllEls = self.initView.call(this, self)
                        self.defineReactive(keys, this)
                    });// 初始化视图
                }
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args
                runIFELSE.call(this, new Set([
                    [key == 'visible', () => {
                        newval && setIndex()
                        if (this.useAllEls) self._fadeami(newval, this)
                    }],
                    [key == 'center', () => {
                        setStyle(this, {
                            marginTop: newval == 'false' ? '15vh' : 'auto'
                        })
                    }]
                ]))
            }
        })
    }
    private defineReactive(keys: string[], el: HTMLElement | any): void {
        keys.map(i => {
            Object.defineProperty(el, i, {
                enumerable: false,
                get() {
                    return this['_' + i]

                },
                set(v) {
                    this.setAttribute(i, v);
                    return this['_' + i] = v;
                }
            })
        })
    }
    private initView = function (context:any): object {
        {
            setIndex()
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

        this.zIndex = getIndex()
        this.className = 'sp-modal' + ' sp-modal' + (getIndex() - 2000) + ' ' + (this.attrs.class);
        content.className = 'sp-modal-content';
        headerR.className = this.attrs.closable == 'false' ? '' : 'sp-icon sp-icon-close'
        mock.className = 'sp-modal-mock sp-modal-mock-' + getIndex()
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
            zIndex: String(getIndex()),
            marginTop: this.attrs.center == 'false' ? '15vh' : 'auto',
            display: 'none',
        })
        setStyle(mock, {
            zIndex: String(getIndex() - 1),
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
            context.commonClass(this, 'add', 'enter')
            sto(() => {
                context.commonClass(this, 'remove', 'enter')
            }, 290)
        }
        return {
            header,
            headerL,
            headerR,
            mock,

        }
    }

    commonClass(target:any, type: 'add' | 'remove', base:string) {
        target.classList[type]('sp-modal-'+base+'-active')
        target.useAllEls?.mock.classList[type]('sp-modal-mock-' + base + '-active')
    }

    private _fadeami(newkey: string, target: any) {
        if (newkey == 'true') {
            setStyle(target, {
                display: 'block',
                zIndex: String(getIndex() + 1),
            })
            setStyle(target.useAllEls?.mock, {
                display: 'block',
                zIndex: String(getIndex()),
            })
            this.commonClass(target, 'add', 'enter')
            sto(() => {
                this.commonClass(target, 'remove', 'enter')
            }, 290)
        } else {
            this.commonClass(target, 'add', 'leave')
            
            sto(() => {
                setStyle(target, { display: 'none' })
                setStyle(target.useAllEls?.mock, { display: 'none', })
                this.commonClass(target, 'remove', 'leave')
            }, 290)
        }
    }
    static config<T = typeof modalProps | { onOk?: () => any, onClose?: () => any, bodyhtml: string, footerhtml: string }>(params: T) {
        let _p: T | any = { ...modalProps, ...params }
        let dialog: HTMLElement | any = createEl('sp-modal');
        let content: any;
        let footerhtml: any;
        if ('bodyhtml' in _p) {
            content = createEl('div');
            content.setAttribute('slot', 'content');
            if (typeof _p.bodyhtml == 'string') {
                content.innerHTML = _p.bodyhtml
            } else {
                throw Error('请传入相应类型')
            }
            dialog.appendChild(content)
        }
        if ('footerhtml' in _p) {
            footerhtml = createEl('div');
            footerhtml.setAttribute('slot', 'footer');
            if (typeof _p.footerhtml == 'string') {
                footerhtml.innerHTML = _p.footerhtml
            } else {
                throw Error('请传入相应类型')
            }
            dialog.appendChild(footerhtml)
        }
        keys.map((k: any) => {
            if (Reflect.has(_p, k)) {
                // @ts-ignore
                dialog.setAttribute(k, _p[k])
            }
        });
        dialog.onOk = _p?.onOk || (() => { dialog['attr-visible'] = false });
        dialog.onClose = _p?.onClose || (() => { dialog['attr-visible'] = false });
        document.body.appendChild(dialog)
        return {
            show(v: string | boolean) {
                dialog['attr-visible'] = v;
            },
            setBodyHtml(html:string) {
                if (typeof html == 'string') {
                    content.innerHTML = html
                }
            },
            setFooterHtml(html:string) {
                if (typeof html == 'string') {
                    footerhtml.innerHTML = html
                }
            },
            __$: dialog
        }
    }
}
// (window as any).modal = Modal.config({
//     visible: false,
//     bodyhtml: '<div slot="content"> 全局创建 </div>'
// })
export { Modal }
export default new Modal() 