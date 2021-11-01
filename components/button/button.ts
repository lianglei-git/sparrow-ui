import typeProps, { ButtonProps, baseprops } from './type'
import './style'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps } from '../_utils/dom'

const typePropsObj: ButtonProps | any = typeProps()
const changeProps = (elconstr: HTMLElement & any, props: object | any) => {
    let includes: Array<string> = ['shape', 'size', 'type', 'disabled']
    for (let key in props) {
        runIFELSE(new Set([
            [includes.includes(key), () => {
                if (typePropsObj[key] instanceof Array) {
                    for (let i = 0; i < elconstr.classList.length; i++) {
                        let classname = elconstr.classList.item(i)
                        typePropsObj[key].map((i: any) => (classname == 'sp-button-' + i && elconstr.classList.toggle(classname)))
                    }
                } 
                if(props[key] == 'true') elconstr.classList['add']('sp-button-'+key);
                else if(props[key] == 'false') elconstr.classList['remove']('sp-button-'+key);
                else elconstr.classList['toggle']('sp-button-' + props[key])
            }],
            [key == 'loading', () => {
                if ((!props[key] || (props[key] == 'false'))) {
                    if (elconstr.loadinEl) {
                        elconstr.loadinEl.classList.remove('sp-icon','sp-icon-loading')
                        elconstr.classList.remove('is-loading')
                        elconstr.loadinEl = null
                    }
                } else {
                    if (elconstr.loadinEl === null) {
                        elconstr.loadinEl = createEl('span')
                        elconstr.classList.add('is-loading')
                        elconstr.loadinEl.classList.add('sp-icon', 'sp-icon-loading')
                        elconstr.insertBefore(elconstr.loadinEl!, elconstr.firstChild)
                    }
                }
            }]
        ]))
    }
}
export default
    // 为了避免冲突引发问题， 动态获取 标签属性要通过（attr-name）来获取 
    defineEl({
        tag: 'sp-button',
        observedAttributes: Object.keys(typePropsObj),
        connectedCallback() {
            let self = this
            this.loadinEl = null
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
            let attributesObj: ButtonProps | any = {...getProps(this) }
            for (let k1 in typePropsObj) {
                let k1v = attributesObj[k1]
                let k2v = typePropsObj[k1]
                runIFELSE(new Set([
                    [(k2v instanceof Array), () => {
                        if(!k2v.includes(k1v)) {
                            attributesObj[k1] = baseprops[k1]
                            self['attr-' + k1] = baseprops[k1]
                        }
                    }],
                    [k1 == 'disabled', () => {
                        attributesObj[k1] =  k1v || 'false'
                        self['attr-disabled'] = k1v || 'false'
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
            };
        },
        attributeChangedCallback(name: any, _: string, newval: string | any) {
            changeProps(this, {
                [name]: newval
            })
        },
        getConstructor(target) {
            console.log(target)
        }
    })
