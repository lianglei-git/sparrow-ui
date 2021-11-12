import { runIFELSE, sto, isObject, has } from '../_utils/common'
import { getIndex, setIndex } from '../common/index'
import { timeItemlineProps, timelineItemTypesProps } from './type'
import { defineEl, createEl, setStyle, getProps, listener } from '../_utils/dom'

class TimeLineItem {
    context: this
    constructor() {
        const context = this
        defineEl({
            tag: 'sp-timeline-item',
            observedAttributes: Object.keys(timeItemlineProps),
            connectedCallback() {
                (this.attrs as Partial<timelineItemTypesProps>) = getProps(this);
                this.attrs = { ...timeItemlineProps, ...this.attrs };
                context.initView(this)
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                context.set({ attrs: { [key]: newval }, root: this })
            }
        })
    }

    initView(root: HTMLElement | any) {
        let icon = createEl('i'),
            line = createEl('span');
        icon.className = 'sp-timeline-item-icon'
        line.className = 'sp-timeline-item-line'
        root.className = 'sp-timeline-item'
        root.append(icon, line);
        root.iconEl = icon;
        root.lineEl = line;
        this.set({ root, attrs: root.attrs })
    }
    set({ root, attrs }: any) {
        runIFELSE(new Set([
            [attrs['color'] && root?.iconEl, () => {
                setStyle(root.iconEl, { borderColor: attrs['color'] })
            }],

            [attrs['icon'] && root?.iconEl, () => {
                root.iconEl.className = 'sp-icon ' + attrs['icon']
            }],
            [attrs['label'], () => {
                if (root?.labelEl) {
                    root.labelEl.innerText = attrs['label'];
                    return
                }
                let label = createEl('span')
                label.className = 'sp-timeline-item-label'
                root.className = 'sp-timeline-item label'
                label.innerText = attrs['label'];
                root.insertBefore(label, root.firstChild);
                root.parentElement?.classList.add('sp-timeline-label');
                root.labelEl = label;
            }],
            [attrs['position'], () => {
                if (attrs['position'] == 'right') {
                    root.classList.add('reverse');
                    return
                }
                if(root.labelEl && root['attr-position'] == 'left') {
                    setStyle(root, {
                        paddingLeft: 'calc(50% + 25px)',
                        textAlign: 'left',
                        paddingRight: 'inherit'
                    })
                    setStyle(root.labelEl, {
                        textAlign: 'right',
                        left: '-25px'
                    })
                }
                root.classList.remove('reverse')

            }],
        ]))
    }
}

export default new TimeLineItem()