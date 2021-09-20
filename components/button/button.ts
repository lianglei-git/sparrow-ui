import typeProps, { ButtonProps } from './type'
import {style} from '../_utils/style'
import './style'
import {runIFELSE} from '../_utils/common'
import { defineEl, createEl, setStyle, getProps } from '../_utils/dom'
// createEl({ // 测试重复注册
//     tag:'sp-button'
// })

const changeProps = (elconstr:HTMLElement, props: object | any) =>  {
    console.log(props)
    for(let key in props) {
        runIFELSE(new Set([
            [key == 'shape', () => {
                elconstr.className = 'sp-button sp-button-' + props[key];
                console.log(elconstr.className)
                // elconstr.classList.add('sp-button-' + props[key])
            }],
            [key == 'size', () => {

            }]
        ]))
    }
}   
const typePropsObj:ButtonProps | any = typeProps()

export default
    // 为了避免冲突引发问题， 动态获取 标签属性要通过（attr-name）来获取 
    // 获取标签属性需要定义  observedAttributes  
    defineEl({
        tag: 'sp-button',
        // shadow: 'closed',
        observedAttributes: Object.keys(typePropsObj),
        connectedCallback() {
            let self = this
            // 内部修改变化的css
            this.className = 'sp-button'
            let _style:CSSStyleDeclaration = Object.assign(style,{
                // display: "inline-block",
                // border: "solid black 1px",
                // width: "50px",
                // height: "30px",
                // padding: '12px 20px'
            })
            let handler:ProxyHandler<any> = {
                set(target:any, key:string, value:string) {
                   let d =  Reflect.set(target, key, value)
                    setStyle(self, {[key]:value} as any)
                    return d
                }
            }
            let target = new Proxy(_style, handler)
            setStyle(this, target)

            // let attributes:NamedNodeMap = this.attributes
            let attributesObj:ButtonProps | any = {...getProps(this)}
            for(let k1 in attributesObj) {
                // for(let k2 in typePropsObj) {
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
                                [k1 == 'shape'&& !k2v.includes(k1v), () => {
                                    attributesObj[k1] = 'default'
                                }],
                                [k1 == 'htmlType'&& !k2v.includes(k1v), () => {
                                    attributesObj[k1] = 'button'
                                }],
                            ]))
                        }],
                        // [k1 == 'disabled']
                    ]))
                // }
            }
            changeProps(this, attributesObj)

            let el = createEl('template')
            el.innerHTML = `
                <div> <i class="loading">...</i> 加载按钮 </div>
                <style>
                    :host{
                        color:red
                    }
                </style>
            `
            // this.shadowRoot.append(el.content.cloneNode(true)) // 影子DOM
            
            // // this.setAttribute('type', '567890')
            // window.changeKey = (key, val) => target[key] = val
            this.onclick = (e: any) => {
                document.documentElement.style.setProperty('--global-background', '#0f9f9d')
                // 可以通过实例来获取， 当然也可以通过this来获取
                console.log('获取标签书型', this.constructor.observedAttributes)

                // setTimeout(() => {
                //     this['attr-type'] = '我修改了'
                // }, 1000);
            }
            
        },
        // 这里可以直接拿到被修改的 attr
        attributeChangedCallback(name: any, oldval:string, newval:string| any) {
            console.log(name, oldval, newval)
            changeProps(this, {
                [name]: newval
            })
        },
        getConstructor(target) {
            console.log(target)
        }
    })