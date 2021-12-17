
import { createEl, defineEl, getProps, setStyle } from '../_utils/dom'
import {tooltipProps, tooltipTypesProps} from './type'
import ToolTipCommon from './Common'
import { runIFELSE} from '../_utils/common'


class Tooltip {
    context:any
     constructor() {
        const context = this;
        defineEl({
            tag: 'sp-tooltip',
            observedAttributes: Object.keys(tooltipProps),
            connectedCallback() {
                (this.attrs as Partial<tooltipTypesProps>) = getProps(this);
                this.attrs = { ...tooltipProps, ...this.attrs };
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0)
                setStyle(this, {
                    outline: '0'
                })
                this.contextTarget = new ToolTipCommon(this);
                context.initView(this.contextTarget, this.attrs);
    
            },
            attributeChangedCallback(..._args) {
                let [key, _, newval] = _args;
                context.obsevseAttrs({ attrs: { [key]: newval }, root: this.contextTarget ?? this })
            }
        });
    }

    initView(contextTarget: HTMLElement & any, attrs: tooltipTypesProps) {
        const text = createEl('span');
        text.textContent = attrs.title || ''
        
    }

    obsevseAttrs({attrs, root}: {attrs: tooltipTypesProps} | any) {
        console.log(attrs)
        runIFELSE(new Set([
            ['visible' in attrs, () => {
                root.visible(attrs.visible+'');
            }]
        ]))
    }
}

export default new Tooltip()