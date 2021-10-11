import typeProps, { ButtonProps } from './type'
import './style'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps } from '../_utils/dom'
// defineEl({ // 测试重复注册
//     tag: 'sp-button',
//     connectedCallback() {}
// })


const loadingSvg: string = '<svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>'
const typePropsObj: ButtonProps | any = typeProps()
const changeProps = (elconstr: HTMLElement & any, props: object | any) => {
    let includes: Array<string> = ['shape', 'size', 'type', 'disabled']
    console.time()
    for (let key in props) {
        runIFELSE(new Set([
            [includes.includes(key), () => {
                if (typePropsObj[key] instanceof Array) {
                    for (let i = 0; i < elconstr.classList.length; i++) {
                        let classname = elconstr.classList.item(i)
                        typePropsObj[key].map((i: any) => (classname == 'sp-button-' + i && elconstr.classList.remove(classname)))
                    }
                }
                elconstr.classList.toggle('sp-button-' + props[key])
            }],
            [key == 'loading', () => {
                if ((!props[key] || (props[key] == 'false'))) {
                    if (elconstr.loadinEl) {
                        elconstr.removeChild(elconstr.loadinEl!)
                        elconstr.classList.remove('is-loading')
                        elconstr.loadinEl = null
                    }
                } else {
                    if (elconstr.loadinEl === null) {
                        elconstr.loadinEl = createEl('div')
                        elconstr.loadinEl!.innerHTML = `${loadingSvg}`
                        elconstr.insertBefore(elconstr.loadinEl!, elconstr.firstChild)
                        elconstr.classList.add('is-loading')
                    }
                }
            }]
        ]))
    }
    console.timeEnd()
}

export default
//  (() => {
    // 为了避免冲突引发问题， 动态获取 标签属性要通过（attr-name）来获取 
    // 获取标签属性需要定义  observedAttributes  
    defineEl({
        tag: 'sp-button',
        // shadow: 'closed',
        observedAttributes: Object.keys(typePropsObj),
        connectedCallback() {
            let self = this
            this.loadinEl = null
            // 内部修改变化的css
            this.className = 'sp-button'
            
            type styletype =  { // Partial
                [P in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[P]
            }
            let _style: styletype = {}
            let handler: ProxyHandler<any> = {
                set(target: any, key: string, value: string) {
                    let d = Reflect.set(target, key, value)
                    setStyle(self, { [key]: value } as any)
                    return d
                }
            }
            let target = new Proxy(_style, handler)
            setStyle(this, target)
            let attributesObj: ButtonProps | any = { ...getProps(this) }
            for (let k1 in attributesObj) {
                let k1v = attributesObj[k1]
                let k2v = typePropsObj[k1]
                runIFELSE(new Set([
                    [(k2v instanceof Array), () => {
                        runIFELSE(new Set([
                            [k1 == 'type' && !k2v.includes(k1v), () => {
                                attributesObj[k1] = 'default'
                            }],
                            [k1 == 'size' && !k2v.includes(k1v), () => {
                                attributesObj[k1] = 'middle'
                            }],
                            [k1 == 'shape' && !k2v.includes(k1v), () => {
                                attributesObj[k1] = 'default'
                            }],
                            [k1 == 'htmlType' && !k2v.includes(k1v), () => {
                                attributesObj[k1] = 'button'
                            }],
                        ]))
                    }],
                    [k1 == 'disabled', () => {
                        attributesObj[k1] = 'disabled'
                    }]
                ]))
            }
            changeProps(this, attributesObj)

            function adapderEmpty(childNodes: any[]) {
                let copty = [...childNodes]
                copty.shift()
                if (copty.length == 0) return true
                else {
                    let is = true
                    for (let i = 0; i < copty.length; i++) {
                        if (copty[i].tag) {
                            is = false;
                            break
                        } else {
                            copty[i].nodeValue.trim().length > 0 && (is = false)
                            break
                        }
                    }
                    return is
                }
            }

            if (this.loadinEl && adapderEmpty(this.childNodes)) {
                this.classList.add('empty-loading')
            }
            // this.shadowRoot.append(el.content.cloneNode(true)) // 影子DOM
        },
        // 这里可以直接拿到被修改的 attr
        attributeChangedCallback(name: any, _: string, newval: string | any) {
            changeProps(this, {
                [name]: name == 'disabled' ? 'disabled' : newval
            })
        },
        getConstructor(target) {
            console.log(target)
        }
    })
// })()
