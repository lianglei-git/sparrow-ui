
import { defineEl, getProps, setStyle } from '../_utils/dom'
import { tooltipProps, tooltipTypesProps } from '../tooltip/type'
import ToolTipCommon from '../tooltip/Common'
import { runIFELSE } from '../_utils/common'
// import './style'
type Props = {
    content: any
}
let popverProps = Object.freeze({...tooltipProps, content: '', effect: 'light'})
class Popover {
    context: any
    constructor() {
        const context = this;
        defineEl({
            tag: 'sp-popover',
            observedAttributes: Object.keys(popverProps),
            connectedCallback() {
                (this.attrs as Partial<tooltipTypesProps & Props>) = getProps(this);
                this.attrs = { ...popverProps, ...this.attrs };
                this.super = new ToolTipCommon(this);
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0)
                setStyle(this, {
                    outline: '0'
                })
            },
            attributeChangedCallback(..._args) {
                let [key, _, newval] = _args;
                context.obsevseAttrs.call(this, { [key]: newval })
            }
        });
    }

    obsevseAttrs(attrs: Partial<tooltipTypesProps & Props>) {
        let root:ToolTipCommon = (this as any).super;
        root && runIFELSE(new Set([
            ['visible' in attrs, () => {
                root.visible(attrs.visible + '' as any);
            }],
            ['placement' in attrs, () => {
                root.fixedEl.className =
                    root.getRootClassName(root.contextTarget, ['__' + attrs['placement'] ?? '__top', (this as any).APAC? 'APAC': ''])
            }],
            ['content' in attrs, () => {
                root.fixedEl.contentEl.innerHTML = attrs['content']
            }]
        ]))
    }
}

export default new Popover()