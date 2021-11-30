import { progressTypes, progressProps } from './type'
import { runIFELSE, sto, has } from '../_utils/common'
import { defineEl, setStyle, getProps } from '../_utils/dom'
import './style'
import Base from '../_utils/Base'
import { createEl } from 'sparrow-ui/_utils/dom';


const keys: string[] = Object.keys(progressProps);
// 此代码绝壁是最吐血的 待整理... 未完待续...
class Progress extends Base {
    context: this
    t: number
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-progress',
            observedAttributes: keys,
            connectedCallback() {
                (this.attrs as Partial<progressTypes>) = getProps(this);
                this.attrs = { ...progressProps, ...this.attrs };
                context.initView(this)
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                context.setObserve({
                    attrs: { [key]: newval },
                    target: this,
                    svg: this._svg,
                    line: this._line,
                    text: this._text
                })
            }
        })
    }
    initView(root: HTMLElement | any) {
        let { svg, line, text } = this.setOnce({ target: root, attrs: root.attrs })
        this.setObserve({ target: root, attrs: root.attrs, svg, line, text })
    }

    setObserve({ target, attrs, svg, line, text }: any) {
        let type = attrs.type || target['attr-type'] || target._type;
        runIFELSE(new Set([
            [attrs?.['status'] && text?.baseName, () => {
                this._setClassName(target, ['sp-progress-' + type, attrs['status'] ?? ''])
                if(attrs['status'] == 'normal') {
                    text.className = text.baseName;
                    return
                }
                if ('' + (target?.['attr-show-info'] || attrs?.['show-info']) == 'false') return
                if (type == 'line') {
                    text.className = text.baseName + ' sp-icon sp-icon-' + attrs['status'];
                } else {
                    text.innerText = ''
                    let _ = attrs['status'] == 'error' ? 'close' : attrs['status'] == 'success' ? 'seleted' : ''
                    text.className = text.baseName + ' sp-icon sp-icon-' + _;
                }
            }],
            [has(attrs, 'percentage'), () => {
                let $percentage: number = parseInt(attrs['percentage'])
                let content = target?.format?.($percentage)
                let percentage = content || ($percentage + '%')
                text && text.className.indexOf('sp-icon') == -1 && (text.innerText = percentage)
                if (type == 'line') {
                    setStyle(line, { width: $percentage + '%' });
                    return
                }
                let rate = type === 'dashboard' ? 0.75 : 1;
                let color = attrs['color'] || target['attr-color'] || '#409EFF';
                let style = `stroke-dasharray:${target.perimeter * rate * ($percentage / 100)}px,${target.perimeter}px ;
                stroke-dashoffset:${-1 * target.perimeter * (1 - rate) / 2}px;transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease;stroke:`
                if ($percentage <= 0) {
                    this.t = sto(() => {
                        svg?.path2?.setAttribute('style', style + 'rgb(229, 233, 242) !important; ')
                    }, 90)
                } else {
                    if(this.t) {
                        clearTimeout(this.t)
                        this.t = 0
                    }
                    svg?.path2?.setAttribute('style', style + color + ';')
                }
            }],
            [has(attrs, 'color'), () => {
                // 设置颜色
                if (type == 'line') {
                    setStyle(line, {
                        backgroundColor: attrs['color']
                    })
                    return
                }
                let style = svg?.path2?.getAttribute('style')
                svg?.path2?.setAttribute('style', style + `stroke:${attrs['color']};`)
            }],
            [has(attrs, 'stroke-linecap'), () => {
                if (type == 'line') return;
                svg?.path2?.setAttribute('stroke-linecap', attrs['stroke-linecap'])
            }],
            [attrs?.['classname'], () => this._setClassName(target, ['sp-progress-' + type, attrs['status'] ?? ''])],
        ]))
    }
    trackPath(type: string, strokeWidth: number, width: number) {
        const relativeStrokeWidth: any = (strokeWidth / width * 100).toFixed(1);
        // @ts-ignore
        const radius = parseInt(50 - parseFloat(relativeStrokeWidth) / 2, 10);
        const isDashboard = type === 'dashboard';
        return {
            path: `
            M 50 50
            m 0 ${isDashboard ? '' : '-'}${radius}
            a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
            a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
            `,
            radius
        };
    }

    setOnce({ target, attrs }: any) {
        let type = attrs.type; // 'line' | 'circle' | 'dashboard';
        let text = createEl('span');
        var svg: any;
        var inner: any;
        text.className = 'sp-progress-bar__text';
        text.baseName = 'sp-progress-bar__text';
        this._setClassName(target, ['sp-progress-' + type, attrs['status'] ?? ''])
        runIFELSE(new Set([
            ['' + attrs['show-info'] == 'false', () => {
                text = ''
            }],
            [type == 'line', () => {
                let line = createEl('div'),
                    outer = createEl('div'),
                    isInside = has(attrs, 'text-inside') && attrs['text-inside'] == 'true';
                inner = createEl('div');
                line.className = 'sp-progress-bar';
                outer.className = 'sp-progress-bar__outer';
                inner.className = 'sp-progress-bar__inner';

                setStyle(outer, {
                    height: (parseInt(attrs['stroke-width']) || 6) + 'px'
                })

                if (isInside) {
                    inner.append(text);
                }

                outer.append(inner);
                line.append(outer, (!isInside && text || ''));
                target.append(line);
                // 线条
            }],
            [type != 'line', () => {
                // 圆形
                svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
                    path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
                    strokeWidth = (parseInt(attrs['stroke-width']) || 6) + 'px',
                    { path: d, radius } = this.trackPath(type, parseInt(attrs['stroke-width']), attrs.width);
                let rate = type === 'dashboard' ? 0.75 : 1;
                let perimeter = 2 * Math.PI * radius
                let style = `stroke-dasharray:${perimeter * rate}px,${perimeter}px;stroke-dashoffset:${-1 * perimeter * (1 - rate) / 2}px;transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease;`
                svg.path1 = path1
                svg.path2 = path2
                svg.setAttribute('viewBox', `0 0 ${attrs.width} ${attrs.width}`)
                path1.setAttribute('class', 'el-progress-' + type + '__path')
                path1.setAttribute('class', 'el-progress-' + type + '__track')
                path2.setAttribute('class', 'el-progress-' + type + '__path')
                path2.setAttribute('class', 'el-progress-' + type + '__track')
                path1.setAttribute('stroke-width', strokeWidth)
                path2.setAttribute('stroke-width', strokeWidth)
                path1.setAttribute('fill', 'none')
                path2.setAttribute('fill', 'none')
                path1.setAttribute('d', d)
                path2.setAttribute('d', d)
                path1?.setAttribute('style', style + `stroke: rgb(229, 233, 242) !important;`)
                svg.append(path1, path2)
                target.append(svg, text);
                setStyle(target, {
                    width: attrs.width + 'px',
                    height: attrs.width + 'px',
                })
                target.perimeter = perimeter
            }]
        ]))


        target._type = type
        target._svg = svg
        target._line = inner
        target._text = text
        return {
            svg,
            line: inner,
            text
        }
    }
}


export { Progress }
export default new Progress()