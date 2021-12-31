
import { runIFELSE } from './common'
type createElTyp = {
    tag: string,
    connectedCallback: () => any,
    disconnectedCallback?: () => void | any,
    shadow?: 'open' | 'closed',
    attributeChangedCallback?: (...args: Array<string | any>) => void | any,
    observedAttributes?: string[],
    getConstructor?: (target: HTMLElement) => any | void
}

const $el: HTMLElement | any = (el: string, target: HTMLElement | Document = document) => target.querySelectorAll(el)

const createEl = (tag: string, type: string = 'createElement') => (document as any)[type](tag)

type Styletype<T> = {
    [K in keyof T]?: T[K]
}
const setStyle = (target: HTMLElement, obj: Styletype<CSSStyleRule['style']>) => {
    for (const key in obj) {
        console.log()
        // Object.prototype.hasOwnProperty.call(target['style'], key) && 
        if ((obj as any)[key] != "") {
            (target as any)['style'][key] = (obj as any)[key];
        }
    }
}

const getProps = (target: HTMLElement): object => {
    let attributes: NamedNodeMap = target.attributes
    let _o: object = new Array(attributes.length).fill(null).reduce((obj, _, index) => {
        let prop: Attr | { nodeName: string, value: string | object | any } | any = attributes.item(index)
        obj[prop['nodeName']] = prop['value']
        return obj
    }, {})
    return _o
}

const defineEl = (props: createElTyp, Element?: CustomElementConstructor): void => {
    // let _corel: HTMLElement | { [key: string]: any } | any = null
    let is: boolean | void = runIFELSE(new Set([
        [props.tag.indexOf('-') == -1, () => {
            // 这里后续会替换成 用我们本组件内的提示
            alert('请检查 tag 参数！')
        }],
        [customElements.get(props.tag), (): boolean => {
            alert('已经存在了这个标签，bro')
            return false
        }]
    ]))
    if (!is) return
    //props?.observedAttributes
    let getAttribute = (target: HTMLElement, observedAttributes: createElTyp["observedAttributes"]) => {
        if (observedAttributes) {
            observedAttributes.forEach((attr: string) => {
                Object.defineProperty(target, 'attr-' + attr, {
                    enumerable: false,
                    configurable: false,
                    get() {
                        return target.getAttribute(attr)
                    },
                    set(val) {
                        target.setAttribute(attr, val)
                    }
                })
            })
        }
    }
    let wishClass = (name: string) => {
        let o = {
            [name]: class extends HTMLElement {
                static target = undefined
                constructor() {
                    super()
                    props.shadow ? this.attachShadow({ mode: props.shadow }) : '';
                    // new Proxy(this, {});
                    (o[name] as any).target = this;
                    // _corel = this
                    getAttribute(this, props?.observedAttributes);
                }
                connectedCallback() {
                    props.connectedCallback.bind(this)() || (() => { });
                    (this as any).onload?.()
                }
                disconnectedCallback() {
                    props.disconnectedCallback?.bind(this)() || (() => { })
                }
                attributeChangedCallback(name: string, oldValue: string, newValue: string) {
                    props.attributeChangedCallback?.bind(this)(name, oldValue, newValue)
                }
            }
        }
        return o[name];
    }
    let HTMl: HTMLElement | any = wishClass(props.tag);
    Reflect.has(props, 'getConstructor') && props.getConstructor?.bind(this)(HTMl)
    HTMl.observedAttributes = props?.observedAttributes || []
    // getAttribute(HTMl?.target, props?.observedAttributes)
    window.customElements.define(props.tag, Element || HTMl)
    // console.log(HTMl.target)
    return HTMl
}

const last: <T extends any>(l: T[]) => T = (l) => {
    return l[l.length - 1]
}

// 绑定事件
const listener: (target: HTMLElement |Document, event: string, func: (e: Event | ProgressEvent<EventTarget>) => any, opt?: any) => void =
    (target, event, func, opt) => {
        if (target.addEventListener) {
            target.addEventListener(event, func, opt)
        }
        return {
            remove: function remove() {
                if (target.removeEventListener) {
                    target.removeEventListener(event, func)
                }
            }
        }

    }



export {
    $el,
    last,
    listener,
    defineEl,
    getProps,
    setStyle,
    createEl
}