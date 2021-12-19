
import { createEl, defineEl, getProps, setStyle } from '../_utils/dom'
import { tooltipProps, tooltipTypesProps } from './type'
import ToolTipCommon from './Common'
import { runIFELSE } from '../_utils/common'


class Tooltip {
    context: any
    constructor() {
        const context = this;
        defineEl({
            tag: 'sp-tooltip',
            observedAttributes: Object.keys(tooltipProps),
            connectedCallback() {
                (this.attrs as Partial<tooltipTypesProps>) = getProps(this);
                this.attrs = { ...tooltipProps, ...this.attrs };
                this.super = new ToolTipCommon(this);
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0)
                setStyle(this, {
                    outline: '0'
                })
                context.initView(this.super, this.attrs);

            },
            attributeChangedCallback(..._args) {
                let [key, _, newval] = _args;
                context.obsevseAttrs.call(this, { [key]: newval })
            }
        });
    }

    initView(contextTarget: HTMLElement & any, attrs: tooltipTypesProps) {
        const text = createEl('span');
        text.textContent = attrs.title || ''

    }

    obsevseAttrs(attrs: Partial<tooltipTypesProps>) {
        let root:ToolTipCommon = (this as any).super;
        root && runIFELSE(new Set([
            ['visible' in attrs, () => {
                root.visible(attrs.visible + '' as any);
            }],
            ['placement' in attrs, () => {
                root.fixedEl.className =
                    root.getRootClassName(root.contextTarget, ['__' + attrs['placement'] ?? '__top', (this as any).APAC? 'APAC': ''])
            }]
        ]))
    }
}

export default new Tooltip()