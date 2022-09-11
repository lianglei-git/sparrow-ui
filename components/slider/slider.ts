import { sliderTypes, sliderProps } from './type';
import { runIFELSE, sto } from '_utils/common';
import { defineEl, setStyle, getProps, listener } from '_utils/dom';
import Base from '_utils/Base';
import { createEl } from '_utils/dom';
import CreateSlider from './time/createSlider'
import { clacMethds } from './time/calc'
import { getPrecision } from './time/_utils'
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
                this.attrs.vertical = this.attrs.vertical + '' == 'true' ? true : false
                this.attrs.disabled = this.attrs.disabled + '' == 'true' ? true : false;
                this.attrs.max = +this.attrs.max;
                this.attrs.min = +this.attrs.min;
                this.attrs.step = +this.attrs.step;
                this.disabled = this.attrs.disabled
                //  还要做一层数据转换 ‘true’ 修改为 boolean
                this.attrs.marks = this.attrs.marks !== undefined &&
                    this.attrs.marks.indexOf('{') > -1 ?
                    JSON.parse(this.attrs.marks) :
                    this?.marks
                        ? this?.marks :
                        {}
                context.initView(this, this.attrs).then(({ railEl, trackEl, handleEl, defaults, handleEl2 }) => {
                    this.core = new CreateSlider({
                        ctxTarget: this,
                        handlesRefs: [handleEl, handleEl2 || false],
                        trackEl,
                        defaults,
                        ...this.attrs
                    })
                    let marks = createEl('div');
                    let style_lp: any = [this.attrs.vertical ? 'bottom' : 'left'];
                    let style_rt: any = [this.attrs.vertical ? 'top' : 'right'];
                    marks.className = 'sp-slider-marks'
                    Object.keys(this.attrs.marks).map((k: any) => {
                        let item = createEl('div');
                        listener(item, 'mousedown', e => this.core.onMouseStart(e))
                        let point = createEl('em');
                        let text: HTMLSpanElement = createEl('span');
                        text.textContent = this.attrs.marks[k];
                        item.className = 'sp-slider-marks-item';
                        let percent = 100 / (this.attrs.max - this.attrs.min) * (k - this.attrs.min);
                        setStyle(item, {
                            [style_lp]: percent + '%'
                        });
                        item.append(point, text);
                        marks.append(item);

                    })
                    this.railEl = railEl;
                    this.trackEl = trackEl;
                    this.handleEl = handleEl;
                    this.handleEl2 = handleEl2;
                    this.marks = marks;
                    this.defaults = defaults;
                    this.append(railEl, trackEl, handleEl, handleEl2, marks);
                    this.core.PROPSCHANGE = ({ o_percent, t_percent, oValue, tValue, trackEvent, curHandle }: any) => {
                        if (curHandle == 2) {
                            let offset_xy: any = [this.attrs.vertical ? 'offsetY' : 'offsetX'];
                            let offset_wh: any = [this.attrs.vertical ? 'offsetHeight' : 'offsetWidth'];
                            let offset_lt: any = [this.attrs.vertical ? 'offsetTop' : 'offsetLeft'];

                            let reverse = this.attrs.reverse + '' == 'true' ? true : false;
                            let target_wh = this[offset_wh];

                            let min = target_wh * (t_percent / 100) - trackEvent[offset_xy];
                            let max = target_wh * (t_percent / 100) + trackEvent.target[offset_wh] - trackEvent[offset_xy];
                            setStyle(trackEl, {
                                [style_lp]: reverse ? 'auto' : min < 0 ? '0' : max >= target_wh ? target_wh - trackEvent.target[offset_wh] + 'px' : `calc(${t_percent + '%'} - ${trackEvent[offset_xy]}px)`,
                                [style_rt]: !reverse ? 'auto' : min < 0 ? '0' : max >= target_wh ? target_wh - trackEvent.target[offset_wh] + 'px' : `calc(${t_percent + '%'} - ${trackEvent[offset_xy]}px)`,
                            })
                            setStyle(handleEl, {
                                [style_lp]: reverse ? 'auto' : min < 0 ? '0' : max >= target_wh ? target_wh - trackEvent.target[offset_wh] + 'px' : `calc(${t_percent}% - ${trackEvent[offset_xy] + 4}px)`,
                                [style_rt]: !reverse ? 'auto' : min < 0 ? '0' : max >= target_wh ? target_wh - trackEvent.target[offset_wh] + 'px' : `calc(${t_percent}% - ${trackEvent[offset_xy] + 4}px)`,
                            })
                            setStyle(handleEl2, {
                                [style_lp]: reverse ? 'auto' : min < 0 ? trackEvent.target[offset_wh] + 'px' : max >= target_wh ? target_wh - 5 + 'px' : `calc(${t_percent}% + ${trackEvent.target[offset_wh] - trackEvent[offset_xy] - 5}px)`,
                                [style_rt]: !reverse ? 'auto' : min < 0 ? trackEvent.target[offset_wh] + 'px' : max >= target_wh ? target_wh - 5 + 'px' : `calc(${t_percent}% + ${trackEvent.target[offset_wh] - trackEvent[offset_xy] - 5}px)`,
                            })
                            let h1v = clacMethds.calcValue(handleEl[offset_lt] + 3, {
                                ctxTarget: this,
                                ...this.attrs
                            });
                            let h2v = clacMethds.calcValue(handleEl2[offset_lt] + 3, {
                                ctxTarget: this,
                                ...this.attrs
                            });
                            handleEl['attr-title'] = context.adapterTips(this, parseFloat(h1v.toFixed(getPrecision(this.attrs.step))));
                            handleEl2['attr-title'] = context.adapterTips(this, parseFloat(h2v.toFixed(getPrecision(this.attrs.step))));
                            if (this.attrs.tooltipvisible && this.attrs.tooltipvisible + '' == 'true') {
                                handleEl?.super?._changePosition(handleEl.super.fixedEl, this.attrs.vertical ? 'right' : 'top', false)
                                handleEl2?.super?._changePosition(handleEl2.super.fixedEl, this.attrs.vertical ? 'right' : 'top', false)
                            }
                            return;
                        }
                        context.changeStyle({
                            trackEl,
                            target: this,
                            handleRefs: {
                                o: handleEl,
                                o_percent: o_percent ?? undefined,
                                t: handleEl2,
                                t_percent: t_percent ?? undefined,
                                defaults
                            },
                            reverse: this.attrs.reverse,
                            vertical: this.attrs.vertical + '' == 'true' ? true : false
                        });
                        if (this.attrs.tooltipvisible + '' !== 'false') {
                            if (oValue) {
                                handleEl['attr-title'] = context.adapterTips(this, oValue);
                                handleEl?.super?._changePosition(handleEl.super.fixedEl, this.attrs.vertical ? 'right' : 'top', false)
                            }
                            if (tValue) {
                                handleEl2['attr-title'] = context.adapterTips(this, tValue);
                                handleEl2?.super?._changePosition(handleEl2.super.fixedEl, this.attrs.vertical ? 'right' : 'top', false)
                            }
                        }
                        this?.onChange?.([oValue || parseFloat(handleEl['attr-title'] || 0), tValue || parseFloat(handleEl2['attr-title'] || 0), curHandle])

                    }
                    this.core.PROPSHANDLEMOUSEUP = (_: any, handleFlag: number = 0) => {
                        context.tooltipShow(this.attrs.tooltipvisible, handleFlag ? handleEl2 : handleEl, 'false', false);
                        this?.onAfterChange?.([parseFloat(handleEl['attr-title'] || 0), parseFloat(handleEl2['attr-title'] || 0)])
                    }
                    this.core.PROPSHANDLEMOUSEDOWN = (_: any, handleFlag: number = 0) => {
                        context.tooltipShow(this.attrs.tooltipvisible, handleFlag ? handleEl2 : handleEl, 'true', false);

                    }
                    this.core.onMounted();
                    // 需要处理
                    if (this.attrs.draggabletrack + '' !== 'true' && defaults.length < 2) {
                        listener(railEl, 'mousedown', e => {
                            if (this.disabled) return
                            this.core.onMouseStart(e)
                        })
                        listener(trackEl, 'mousedown', e => {
                            if (this.disabled) return
                            this.core.onMouseStart(e)
                        })
                    }
                })

            },
            attributeChangedCallback(..._args: any) {
                let [key, _, newval] = _args;
                context.obsevseAttrs({ [key]: newval }, this)
            }
        })
    }
    // this call target
    obsevseAttrs(attrs: Partial<sliderTypes>, root: any) {
        runIFELSE(new Set([
            ['disabled' in attrs, () => {
                root.disabled = attrs.disabled + '' == 'true' ? true : false;
                this._setClassName(root, [root['attr-vertical'] ? '--vertical' : '', root.disabled ? '--disabled' : ''])
            }],
            ['value' in attrs, () => {
                if (!root.attrs) return;
                let [oValue, tValue] = this.adapterDefaults(attrs.value);
                if (oValue >= root.attrs.max) {
                    oValue = root.attrs.max
                }
                if (oValue <= root.attrs.min) {
                    oValue = root.attrs.min
                }
                if (tValue >= root.attrs.max) {
                    tValue = root.attrs.max
                }
                if (tValue <= root.attrs.min) {
                    tValue = root.attrs.min
                }
                let o_percent = 100 / (root.attrs.max - root.attrs.min) * (oValue - root.attrs.min);
                let t_percent = tValue !== undefined ? 100 / (root.attrs.max - root.attrs.min) * (tValue - root.attrs.min) : undefined;
                this.changeStyle({
                    trackEl: root.trackEl,
                    target: root,
                    handleRefs: {
                        o_percent,
                        o: root.handleEl,
                        t_percent: root.defaults[1] && t_percent,
                        t: root.handleEl2,
                        defaults: root.defaults
                    },
                    reverse: root.attrs.reverse + '' == 'true' ? true : false,
                    vertical: root.attrs.vertical + '' == 'true' ? true : false,
                });
                if (root.attrs['tooltipvisible'] + '' !== 'false') {
                    if (oValue) {
                        root.handleEl['attr-title'] = this.adapterTips(root, oValue);
                        root.handleEl?.super?._changePosition(root.handleEl.super.fixedEl, root['attrs']['vertical'] ? 'right' : 'top', false)
                    }
                    if (tValue) {
                        root.handleEl2['attr-title'] = this.adapterTips(root, tValue);
                        root.handleEl2?.super?._changePosition(root.handleEl2.super.fixedEl, root.attrs['vertical'] ? 'right' : 'top', false)
                    }
                }
            }]
        ]))
    }
    setTrackStyle({
        o_percent,
        t_percent,
        handleEl2,
        handleEl,
        trackEl,
        offset
    }: any) {
        let unit = o_percent !== undefined && t_percent !== undefined ? '%' : 'px';
        let _offset: any = handleEl2[offset] > handleEl[offset] ? handleEl[offset] + 'px' : handleEl[offset] > handleEl2[offset] ? handleEl2[offset] + 'px' : 0;
        let distance = unit == 'px' ? Math.abs(handleEl2[offset] - handleEl[offset]) + 'px' : Math.abs(t_percent - o_percent) + '%'
        setStyle(trackEl, {
            height: offset.indexOf('Top') > -1 ? distance : undefined,
            width: offset.indexOf('Left') > -1 ? distance : undefined,
            top: offset.indexOf('Top') > -1 ? _offset : 'auto',
            left: offset.indexOf('Left') > -1 ? _offset : 'auto',
        })
    }

    changeStyle({ trackEl, handleRefs, reverse, vertical, init = false }: any) {
        reverse = reverse + '' == 'true';
        let fixpx = vertical ? '4px' : '7px'
        let { o_percent, t_percent, t: handleEl2, o: handleEl, defaults } = handleRefs
        if (vertical) {
            if (defaults.length >= 2) {
                o_percent !== undefined && setStyle(handleEl, {
                    bottom: reverse ? 'auto' : `calc(${o_percent}% - ${fixpx})`,
                    top: !reverse ? 'auto' : `calc(${o_percent}% - ${fixpx})`,
                })
                t_percent !== undefined && setStyle(handleEl2, {
                    bottom: reverse ? 'auto' : `calc(${t_percent}% - ${fixpx})`,
                    top: !reverse ? 'auto' : `calc(${t_percent}% - ${fixpx})`,
                })
                let params = {
                    o_percent,
                    t_percent,
                    handleEl2,
                    handleEl,
                    trackEl,
                    offset: 'offsetTop'
                }
                init ? sto(() => this.setTrackStyle(params)) : this.setTrackStyle(params);
                return
            }
            setStyle(trackEl, {
                height: o_percent + '%',
                top: !reverse ? 'auto' : '0%',
                bottom: reverse ? 'auto' : '0%',
            })
            setStyle(handleEl, {
                top: !reverse ? 'auto' : `calc(${o_percent}% - ${fixpx})`,
                bottom: reverse ? 'auto' : `calc(${o_percent}% - ${fixpx})`,
            })
            return
        }
        if (defaults.length >= 2) {

            o_percent !== undefined && setStyle(handleEl, {
                left: reverse ? 'auto' : `calc(${o_percent}% - ${fixpx})`,
                right: !reverse ? 'auto' : `calc(${o_percent}% - ${fixpx})`,
            })

            t_percent !== undefined && setStyle(handleEl2, {
                left: reverse ? 'auto' : `calc(${t_percent}% - ${fixpx})`,
                right: !reverse ? 'auto' : `calc(${t_percent}% - ${fixpx})`,
            })

            // sto(() => {
            //     let unit = o_percent !== undefined && t_percent !== undefined ? '%' : 'px';
            //     let width = unit == 'px' ? Math.abs(handleEl2.offsetLeft - handleEl.offsetLeft) + 'px' : Math.abs(t_percent - o_percent) + '%'
            //     let left: any = handleEl2.offsetLeft > handleEl.offsetLeft ? handleEl.offsetLeft + 'px' : handleEl.offsetLeft > handleEl2.offsetLeft ? handleEl2.offsetLeft + 'px' : 0;
            //     // let percent = (!reverse ? o_percent - 1 : 100 - o_percent * 2) + '%'
            //     setStyle(trackEl, {
            //         width,
            //         left
            //     })
            // })
            let params = {
                o_percent,
                t_percent,
                handleEl2,
                handleEl,
                trackEl,
                offset: 'offsetLeft'
            }
            init ? sto(() => this.setTrackStyle(params)) : this.setTrackStyle(params);
            return
        }
        setStyle(trackEl, {
            width: o_percent + '%',
            left: reverse ? 'auto' : '0%',
            right: !reverse ? 'auto' : '0%',
        })
        setStyle(handleEl, {
            left: reverse ? 'auto' : `calc(${o_percent}% - ${fixpx})`,
            right: !reverse ? 'auto' : `calc(${o_percent}% - ${fixpx})`,
        })
    }

    tooltipShow(tooltipvisible: any, tooltip: any, show: 'true' | 'false' = 'true', isinit = true) {
        if (tooltipvisible == undefined) {
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
        if (tooltipvisible && tooltipvisible + '' == 'true' && isinit) {
            tooltip?.super?.visible('true') ||
                (tooltip['attr-visible'] = 'true')
            return
        }
    }

    adapterTips(target: any, _v: any) {
        let tipFormatterFunc = target?.tipFormatter || ((value: string) => value + (target.attrs?.['tip-formatter'] || ''))
        return tipFormatterFunc(_v)
    }

    adapterDefaults(_default: string | any[] | number | any): any[] {
        return _default.pop ?
            _default :
            _default.indexOf('[') > -1 ?
                JSON.parse(_default)
                :
                _default.indexOf(',') == -1 ?
                    [_default]
                    : _default.split(',');
    }


    initView(target: any, attrs: sliderTypes) {
        let tagName = 'sp-slider';
        let railEl = createEl('div'),
            trackEl = createEl('div'),
            tempHandleEl = createEl('div'),
            tempHandleEl2: any = '',
            tooltip = createEl('sp-tooltip'),
            defaults: any = this.adapterDefaults(attrs.default as any);
        tooltip['attr-title'] = this.adapterTips(target, defaults[0]);
        tooltip['attr-trigger'] = 'no';
        tooltip.getPopupContainer = () => target
        tooltip.setAttribute('name', 'slider-handle');
        railEl.className = tagName + '-rail';
        trackEl.className = tagName + '-track';
        if (attrs.vertical) {
            tooltip['attr-placement'] = 'right';
        }
        if (defaults.length >= 2) {
            tempHandleEl2 = createEl('div');
        }
        if (attrs.tooltipvisible && attrs.tooltipvisible + '' == 'false') {
            tempHandleEl.className = tagName + '-handle';
            if (tempHandleEl2) {
                tempHandleEl2.className = tagName + '-handle-t';
                target.append(tempHandleEl2);
            }
        } else {
            let tmptool = tooltip;
            tmptool.append(tempHandleEl.cloneNode(true));
            tempHandleEl = tmptool;
            this.tooltipShow(attrs.tooltipvisible, tempHandleEl);

            // 第二个克隆
            if (defaults.length >= 2) {
                let tmpTool2 = tooltip.cloneNode(true);
                tmpTool2.getPopupContainer = () => target;
                tmpTool2['attr-title'] = this.adapterTips(target, defaults[1]);
                tmpTool2.append(tempHandleEl2.cloneNode(true));
                tempHandleEl2 = tmpTool2;
                this.tooltipShow(attrs.tooltipvisible, tempHandleEl2);
            }
        }
        let o_percent = 100 / (attrs.max - attrs.min) * (defaults[0] - attrs.min);
        let t_percent = 100 / (attrs.max - attrs.min) * (defaults[1] - attrs.min);

        tempHandleEl.setAttribute('hidefocus', true);
        tempHandleEl.setAttribute('tabindex', 0);
        tempHandleEl2 && tempHandleEl2.setAttribute('hidefocus', true);
        tempHandleEl2 && tempHandleEl2.setAttribute('tabindex', 0);
        this.changeStyle({
            trackEl,
            target,
            handleRefs: {
                o_percent,
                o: tempHandleEl,
                t_percent: defaults[1] && t_percent,
                t: tempHandleEl2,
                defaults
            },
            reverse: attrs.reverse,
            vertical: attrs.vertical + '' == 'true' ? true : false,
            init: true
        })
        this._setClassName(target, [attrs.vertical ? '--vertical' : '', attrs.disabled ? '--disabled' : ''])

        return Promise.resolve({
            railEl, trackEl, handleEl: tempHandleEl, tooltip, defaults, handleEl2: tempHandleEl2
        })
    }
}


export default new Silder()