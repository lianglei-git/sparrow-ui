
import { createEl, defineEl, getProps } from '../_utils/dom'
import {tooltipProps, tooltipTypesProps} from './type'
import ToolTipCommon from './Common'


class Tooltip extends ToolTipCommon {
    context:any
     constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-tooltip',
            observedAttributes: ['pending', 'mode'],
            connectedCallback() {
                (this.attrs as Partial<tooltipTypesProps>) = getProps(this);
                this.attrs = { ...tooltipProps, ...this.attrs };
                context.init(this)
                context.initView(this);
    
            },
            attributeChangedCallback(..._args) {
                // let [key, _, newval] = args;
                // context.set({ attrs: { [key]: newval }, root: this })
            }
        });
    }

    initView(target: HTMLElement & any) {
        const text = createEl('span');
        text.textContent = target.attrs.title || ''
        
    }

    set() {

    }
}

export default new Tooltip()