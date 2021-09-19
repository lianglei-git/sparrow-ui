import typeProps from './type'
import './style'
import {createEl} from './../_utils/creteEl'
// createEl({ // 测试重复注册
//     tag:'sp-button'
// })
export default 
createEl({
    tag:'sp-button',
    connectedCallback(){
        console.log(this)
        this.style.display = "inline-block"
        this.style.border = "solid black 1px"
        this.style.width = "10px"
        this.style.height = "10px"
        this.className = 'sp-button'
        this.onclick = (e:any) => {
            document.documentElement.style.setProperty('--global-background', '#0f9f9d')
        }
    },
})


// customElements.define("sp-button", class SparrowButton extends HTMLElement {
//     connectedCallback() {
//         console.log(1231231)

        
//     }
//     constructor() {
//         super()
//         console.log('我', this.connectedCallback)

//         // this.attachShadow({ mode:'open' }); 
//         // this.setAttribute('key', '777')
//         // this.style.display = "inline-block"
//         // this.style.border = "solid black 1px"
//         // this.style.width = "10px"
//         // this.style.height = "10px"
//     }
// })