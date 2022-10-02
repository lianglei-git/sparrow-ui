import { runIFELSE, sto } from '../_utils/common'
// import { getIndex, setIndex } from 'common/index'
import { timeItemlineProps, timelineItemTypesProps } from './type'
import { defineEl, createEl, setStyle, getProps } from '../_utils/dom'

class TimeLineItem {
    context: this
    constructor() {
        const context = this
        defineEl({
            tag: 'sp-timeline-item',
            observedAttributes: Object.keys(timeItemlineProps),
            async connectedCallback() {
                (this.attrs as Partial<timelineItemTypesProps>) = getProps(this);
                this.attrs = { ...timeItemlineProps, ...this.attrs };
                await context.initView(this)
                this.onload?.(this)
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                context.set({ attrs: { [key]: newval }, root: this })
            }
        })
    }

    async initView(root: HTMLElement | any) {
        // if (root.parentElement.tagName == 'SP-TIMELINE') {
        //     root.parentElement?.changeChildren?.(root)
        // }
        let icon = createEl('i'),
            line = createEl('span');
        icon.className = 'sp-timeline-item-icon'
        line.className = 'sp-timeline-item-line'
        this._setClassName(root)
        root?.prentCallback?.(icon)
        root.iconEl = icon;
        root.lineEl = line;
        await root.append(icon, line);
        this.set({ root, attrs: root.attrs })
    }

    private _setClassName(root: HTMLElement | any) {
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
            root.className,
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname'],
            root?.['attr-label'] || root?.attrs?.['label'] ? 'label' : '',
            (root?.['attr-position'] || root?.attrs?.['position'] == 'right') ? 'reverse' : '',
        ]
        root.className = classList.join(' ');

    }

    set({ root, attrs }: any) {
        runIFELSE(new Set([
            [attrs['color'] && root?.iconEl, () => {
                setStyle(root.iconEl, { borderColor: attrs['color'] })
            }],

            [root?.iconEl, () => {
                if (attrs['icon'] || root['attr-icon']) {
                    root.iconEl.className = 'sp-icon ' + (attrs['icon'] || root['attr-icon']);
                    return
                }
                root.iconEl.className = 'sp-timeline-item-icon'
            }],
            [attrs['label'], () => sto(() => {
                if (root?.labelEl) {
                    root.labelEl.innerText = attrs['label'];
                    return ''
                }
                let label = createEl('span')
                label.className = 'sp-timeline-item-label'
                this._setClassName(root)
                label.innerText = attrs['label'];
                root.insertBefore(label, root.firstChild);
                root.parentElement?.classList.add('sp-timeline-label');
                root.labelEl = label;
            })],
            [attrs['position'], () => {
                if (attrs['position'] == 'right') {
                    this._setClassName(root)
                    return
                }
                if (root.labelEl && root['attr-position'] == 'left') {
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