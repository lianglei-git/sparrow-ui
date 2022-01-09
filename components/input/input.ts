import { InputProps as Props, InputTypes as Types } from './type'
import { sto } from '../_utils/common'
import { createEl, defineEl, getProps } from '../_utils/dom' // setStyle
import './style'
import Base from '../_utils/Base'
import InputCommon from './Common'
class Input extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-input',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                const that = this;
                this.setAttribute('hidefocus', true)
                    this.setAttribute('tabindex', 0)
                this.core = new InputCommon({
                    root: this, callback(args:any) {
                        context.initView(that, args, this)
                    }
                })
            }
        })
    }


    
    initView(root: HTMLElement | any, args: any, Common:InputCommon) {
        let {ipt, type, prefix, suffix, allowClear,addonBefore, addonAfter} = args
        let attrs = root.attrs;
        this._setClassName(root);

        if(type =='search') {
            console.log('search')
        }
        // if(allowClear) {
        //     suffix = ''
        // }
        console.log(ipt, type, prefix, suffix, allowClear)
        prefix && root.insertBefore(prefix, root.firstChild)
        addonBefore && root.insertBefore(addonBefore, root.firstChild)
        root.append(ipt, allowClear, suffix,addonAfter);


    }
}


export default new Input()