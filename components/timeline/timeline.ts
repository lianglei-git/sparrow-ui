import { runIFELSE, sto, isObject, has } from '../_utils/common'
import { getIndex, setIndex } from '../common/index'
import { timelineProps, timelineTypesProps } from './type'
import { defineEl, createEl, setStyle, getProps, listener, $el } from '../_utils/dom'

class TimeLine {
    constructor() {
        const context = this
        defineEl({
            tag: 'sp-timeline',
            observedAttributes: ['pending', 'mode'],
            connectedCallback() {
                (this.attrs as Partial<timelineTypesProps>) = getProps(this);
                this.attrs = { ...timelineProps, ...this.attrs };
                context.initView(this)
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                context.set({ attrs: { [key]: newval }, root: this})
            }
        })
    }

    initView(root: HTMLElement | any) {
        let islabel = false
        let childrens = Array.from(root.children).filter((el: HTMLElement) => {
            el.getAttribute('label') && (islabel = true)
            return el.tagName == 'SP-TIMELINE-ITEM'
        })
        console.log(childrens, islabel);
        root.className = 'sp-timeline' + (islabel ? ' sp-timeline-label' : '');
        root.islabel = islabel
        this.set({
            root,
            attrs: root.attrs
        })
    }

    set({root, attrs}:any) {
        runIFELSE(new Set([
            [attrs['mode'], () => {
                if(root.islabel) {
                    if(attrs['mode'] == 'right') {
                        root.classList.add('label-reverse')
                        return
                    } 
                    root.classList.remove('label-reverse')
                    return
                };
                if(attrs['mode'] == 'right') {
                    root.classList.add('is-reverse')
                    return
                } 
                root.classList.remove('is-reverse')
            }]
        ]))
    }
}

export default new TimeLine()