
import {runIFELSE} from './common'
type createElTyp = {
    tag: string,
    connectedCallback:() => any,
    disconnectedCallback?: () => void | any
}
export const $el:HTMLElement | any = (el:string) => document.querySelector(el)

export const createEl = (props: createElTyp, Element? :CustomElementConstructor): void => {
    let is:boolean | void = runIFELSE(new Set([
        [ props.tag.indexOf('-') == -1, () => {
            // 这里后续会替换成 用我们本组件内的提示
            alert('请检查 tag 参数！')
        }],
        [customElements.get(props.tag), (): boolean => {
            alert('已经存在了这个标签，bro')
            return false
        }]
    ]))
    if(!is) return

    let wishClass = (name:any) => ({[name]: class extends HTMLElement {
        constructor() {
            super()
        }
        connectedCallback() {
            props.connectedCallback.bind(this)() || (() => {})
        }
        disconnectedCallback() {
            props.disconnectedCallback?.bind(this)() || (() => {})
        }
        
    }})[name]
    window.customElements.define(props.tag, Element || wishClass(props.tag))
}