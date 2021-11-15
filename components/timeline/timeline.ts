import { runIFELSE} from '../_utils/common'
// import { getIndex, setIndex } from '../common/index'
import { timelineProps, timelineTypesProps } from './type'
import { defineEl, getProps } from '../_utils/dom'

class TimeLine {
    constructor() {
        const context = this
        defineEl({
            tag: 'sp-timeline',
            observedAttributes: ['pending', 'mode'],
            connectedCallback() {
                (this.attrs as Partial<timelineTypesProps>) = getProps(this);
                this.attrs = { ...timelineProps, ...this.attrs };
                context.initView(this);

            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                context.set({ attrs: { [key]: newval }, root: this })
            }
        })
    }
    // changeChildren(child:any) {
    //     console.log(child)
    // }
    initView(root: HTMLElement | any) {
        let islabel = false
        Array.from(root.children).filter((el: HTMLElement) => {
            el.getAttribute('label') && (islabel = true)
            return el.tagName == 'SP-TIMELINE-ITEM'
        })
        root.className = 'sp-timeline' + (islabel ? ' sp-timeline-label' : '');
        root.islabel = islabel
        this.set({
            root,
            attrs: root.attrs
        })
    }

    set({ root, attrs }: any) {
        runIFELSE(new Set([
            [attrs['mode'], () => {
                if (root.islabel) {
                    if (attrs['mode'] == 'right') {
                        root.classList.add('label-reverse')
                        return
                    }
                    root.classList.remove('label-reverse')
                    return
                };
                if (attrs['mode'] == 'right') {
                    root.classList.add('is-reverse')
                    return
                }
                root.classList.remove('is-reverse')
            }],
            [attrs['pending'],  () => {
                let childrens: any = Array.from(root.children).filter((el: HTMLElement) => {
                    return el.tagName == 'SP-TIMELINE-ITEM'
                })
                // 这里需要满足两个条件， 默认和动态改变的 还有一个额外条件 新添加的元素 如果改变？
                let lastChildIconEl = childrens?.[childrens.length - 1]
                if (attrs['pending'] == 'true') {
                    root.classList.add('is-pending');
                    let isicon = lastChildIconEl?.getAttribute?.('icon')
                    if (isicon) return;
                    if (lastChildIconEl?.iconEl) {
                        lastChildIconEl.iconEl.className = 'sp-icon sp-icon-loading'
                        return
                    }
                    lastChildIconEl.prentCallback = (iconEl: any) => { iconEl.className = 'sp-icon sp-icon-loading' };
                    return
                }
                (attrs['pending'] == 'false') && lastChildIconEl.iconEl && (lastChildIconEl.iconEl.className = 'sp-timeline-item-icon')
                root.classList.remove('is-pending')
            }]
        ]))
    }
}

export default new TimeLine()