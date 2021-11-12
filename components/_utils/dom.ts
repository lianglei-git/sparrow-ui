
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

export const $el: HTMLElement | any = (el: string, target:HTMLElement|Document = document) => target.querySelectorAll(el)

export const createEl = (tag: string, type: string = 'createElement') => (document as any)[type](tag)

type Styletype<T> = {
    [K in keyof T]?: T[K]
}
export const setStyle = (target: HTMLElement, obj: Styletype<CSSStyleRule['style']>) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(target['style'], key) && (obj as any)[key] != "") {
            // console.log('设置了::::', key, obj[key]);
            (target as any)['style'][key] = (obj as any)[key];
        }
    }
}

export const getProps = (target: HTMLElement): object => {
    let attributes: NamedNodeMap = target.attributes
    let _o: object = new Array(attributes.length).fill(null).reduce((obj, _, index) => {
        let prop: Attr | { nodeName: string, value: string | object | any } | any = attributes.item(index)
        obj[prop['nodeName']] = prop['value']
        return obj
    }, {})
    return _o
}

export const defineEl = (props: createElTyp, Element?: CustomElementConstructor): void => {
    let _corel: HTMLElement | { [key: string]: any } | any = null
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
                        // if (_corel) {
                            return target.getAttribute(attr)
                        // }
                        // return 'empty!'
                    },
                    set(val) {
                        // console.log(val, attr)
                        target.setAttribute(attr, val)
                        // target[attr] = val
                    }
                })
            })
        }
    }
    let wishClass = (name: string) => ({
        [name]: class extends HTMLElement {
            static target = this
            constructor() {
                super()
                props.shadow ? this.attachShadow({ mode: props.shadow }) : ''
                new Proxy(this, {})
                _corel = this
                getAttribute(this, props?.observedAttributes)
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
    })[name]
    let HTMl: HTMLElement | any = wishClass(props.tag)
    Reflect.has(props, 'getConstructor') && props.getConstructor?.bind(this)(HTMl)
    HTMl.observedAttributes = props?.observedAttributes || []
    getAttribute(HTMl.target, props?.observedAttributes)
     window.customElements.define(props.tag, Element || HTMl)
    return HTMl
}

export const last:<T extends any>(l: T[]) => T = (l) => {
    return l[l.length - 1]
}

// 绑定事件
export const listener:(target:HTMLElement, event:string, func:(e:Event | ProgressEvent<EventTarget> ) => any) => void = (target, event, func) => { target.addEventListener(event, func) }