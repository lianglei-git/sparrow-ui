import { sliderTypes, sliderProps } from './type';
import { runIFELSE, sto, has } from '../_utils/common';
import { defineEl, setStyle, getProps, listener } from '../_utils/dom';
import Base from '../_utils/Base';
import { createEl } from 'sparrow-ui/_utils/dom';
import CreateSlider from './time/createSlider'

class Silder extends Base {
    context: this
    constructor() {
        super();
        const context = this;
        defineEl({
            tag: 'sp-slider',
            observedAttributes: Object.keys(sliderProps),
            connectedCallback() {
                (this.attrs as Partial<sliderTypes>) = getProps(this);
                this.attrs = { ...sliderProps, ...this.attrs };

                context.initView(this, this.attrs).then(({ railEl, trackEl, handleEl, tooltip }) => {
                    this.append(railEl, trackEl, handleEl);


                    this.core = new CreateSlider({
                        ctxTarget: this,
                        handlesRefs: [handleEl],
                        ...this.attrs
                    })

                    this.core.PROPSCHANGE = ({ o_percent }: any) => {
                        context.changeStyle({ trackEl, handleEl, o_percent, reverse: this.attrs.reverse, range: this.attrs.range, vertical: this.attrs.vertical })
                        if (this.attrs.tooltipVisible !== false) {
                            tooltip['attr-title'] = o_percent;
                            tooltip.super._changePosition(tooltip.super.fixedEl, 'top', false)
                        }
                    }
                    this.core.PROPSHANDLEMOUSEUP = () => {
                        context.tooltipShow(this.attrs.tooltipVisible, tooltip, 'false', false);

                    }
                    this.core.PROPSHANDLEMOUSEDOWN = () => {
                        context.tooltipShow(this.attrs.tooltipVisible, tooltip, 'true', false);

                    }
                    this.core.onMounted();

                    if (!this.attrs.range) {
                        listener(railEl, 'mousedown', e => this.core.onMouseStart(e))
                        listener(trackEl, 'mousedown', e => this.core.onMouseStart(e))
                    }
                })

            }
        })
    }

    changeStyle({ o_percent, trackEl, handleEl, range, reverse, vertical }: any) {
        if (range) {
            return
        }
        // if(vertical) {
        //     if(reverse) {

        //         return
        //     }
        //     return
        // }
        setStyle(trackEl, {
            width: o_percent + '%',
            left: reverse ? 'auto' : '0%',
            right: !reverse ? 'auto' : '0%',
        })
        setStyle(handleEl, {
            left: reverse ? 'auto' : `calc(${o_percent}% - 4px)`,
            right: !reverse ? 'auto' : `calc(${o_percent}% - 4px)`,
        })
    }

    tooltipShow(tooltipVisible: any, tooltip: any, show: 'true' | 'false' = 'true', isinit = true) {
        if (tooltipVisible == undefined) {
            if (isinit) {
                listener(tooltip, 'mouseenter', () => {
                    tooltip?.super?.visible('true') ||
                        (tooltip['attr-visible'] = 'true')
                })
                listener(tooltip, 'mouseleave', () => {
                    if (tooltip.show == 'true') return;
                    tooltip?.super?.visible('false') || (tooltip['attr-visible'] = 'false')
                })
                return;
            }
            tooltip.show = show
            tooltip?.super?.visible(show) || (tooltip['attr-visible'] = show)
            return
        }
        if (tooltipVisible == true && isinit) {
            tooltip?.super?.visible('true') ||
                (tooltip['attr-visible'] = 'true')
            return
        }
    }

    initView(target: any, attrs: sliderTypes) {
        let tagName = 'sp-slider';
        let railEl = createEl('div'),
            trackEl = createEl('div'),
            tempHandleEl = createEl('div'),
            appenHandleRef: any = null,
            tooltip = createEl('sp-tooltip');
        tooltip['attr-title'] = attrs.default;
        tooltip['attr-trigger'] = 'no';

        tooltip.getPopupContainer = () => target
        tooltip.setAttribute('name', 'slider-handle');
        railEl.className = tagName + '-rail';
        trackEl.className = tagName + '-track';
        if (attrs.tooltipVisible == false) {
            appenHandleRef = tempHandleEl
            appenHandleRef.className = tagName + '-handle';
        } else {
            this.tooltipShow(attrs.tooltipVisible, tooltip);
            appenHandleRef = tooltip;
            appenHandleRef.append(tempHandleEl);
        }
        appenHandleRef.setAttribute('hidefocus', true);
        appenHandleRef.setAttribute('tabindex', 0);

        this.changeStyle({ trackEl, handleEl: appenHandleRef, o_percent: attrs.default, reverse: attrs.reverse, range: attrs.range, vertical: attrs.vertical })
        this._setClassName(target)

        return Promise.resolve({
            railEl, trackEl, handleEl: appenHandleRef, tooltip
        })
    }
}


export default new Silder()