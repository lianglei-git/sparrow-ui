import typeProps, { ButtonProps } from './type'
import { CorrectBoolean, runIFELSE, sto } from '../_utils/common'
import { defineEl, createEl, getProps } from '../_utils/dom'
import { useRipple } from '../common/Ripple/ripple'


const typePropsObj: ButtonProps | any = typeProps()
const changeProps = (elconstr: HTMLElement & any, props: object | any) => {
    let includes: Array<string> = ['shape', 'size', 'type'] // , 'disabled'
    for (let key in props) {
        runIFELSE(new Set([
            [includes.includes(key), () => {
                let base = elconstr.baseClassName
                let classes: any = {
                    type: (elconstr['attr-type'] || 'default') !== 'default' ? ' sp-button2--' + elconstr['attr-type'] : '',
                    size: (elconstr['attr-size'] || 'middle') !== 'middle' ? ' sp-button2-size--' + elconstr['attr-size'] : '',
                    shape: (elconstr['attr-shape'] || 'default') !== 'default' ? ' sp-button2-shape--' + elconstr['attr-shape'] : '',
                }
                for (let k in classes) {
                    base += classes[k]
                }
                elconstr.className = base;
            }],
            [key == 'loading', () => {
                if (!props[key] || (props[key] == 'false')) {
                    if (elconstr.loadinEl) {
                        elconstr.loadinEl.classList.remove('sp-icon', 'sp-icon-loading')
                        elconstr.classList.remove('is-loading');
                        elconstr.loadinEl.remove()
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
            }],
            [key == 'disabled', () => {
                let type: string = props[key] == 'true' ? 'add' : 'remove'
                elconstr.classList?.[type]('is-disabled')
            }],
            [key == 'icon', () => {
                if (elconstr.loadinEl) return;
                let classname = 'sp-icon ' + props['icon']
                if (elconstr.iconEl) {
                    elconstr.iconEl.className = classname
                    return;
                }
                const el = createEl('i')
                el.className = classname;
                elconstr.iconEl = el;
                !elconstr.firstChild ? sto(set) : set()
                function set() {
                    if (!elconstr.firstChild) {
                        elconstr.append(el);
                        return;
                    }
                    elconstr.insertBefore(el, elconstr.firstChild);
                }
            }]
        ]))
    }
}
export default
    defineEl({
        tag: 'sp-button2',
        observedAttributes: Object.keys(typePropsObj),
        connectedCallback() {
            let base = this.getAttribute('classname') || ''
            this.loadinEl = null
            this.baseClassName = 'sp-button2 ' + base;
            this.className = 'sp-button2 ' + base;
            this.setAttribute('hidefocus', true)
            this.setAttribute('tabindex', 0)
            
            let attributesObj: ButtonProps | any = { ...getProps(this) }
            changeProps(this, attributesObj)
            setTimeout(() => useRipple(this, {center: CorrectBoolean(attributesObj.ripplecenter)}), 150)
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
        }
    })
