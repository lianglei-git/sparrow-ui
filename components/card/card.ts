import { cardProps, cardTypes } from './type'
import { sto } from '_utils/common'
import { defineEl, setStyle, getProps, createEl } from '_utils/dom'
import './style'
import Base from '_utils/Base'

class Card extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-card',
            observedAttributes: Object.keys(cardProps),
            connectedCallback() {
                (this.attrs as Partial<cardTypes>) = getProps(this);
                this.attrs = { ...cardProps, ...this.attrs };
                sto(() => context.initView(this))
            },
            attributeChangedCallback(...args: any) {
                let [key, _, newval] = args;
                if(key == 'title' && this.titleEl) {
                    this.titleEl.textContent = newval
                }
            }
        })
    }

    initView(root: HTMLElement | any) {
        let attrs = root.attrs;
        this._setClassName(root, [attrs['dis-hover']+ '' == 'true' ? '' : 'hover']);
        let headerEl:HTMLElement| any = createEl('header'),
            titleEl:HTMLElement | any = '',
            extraEl:HTMLElement | any = '';

        if(attrs['no-boder'] + '' == 'true') {
            setStyle(root, {
                border: 'none'
            })
        }
        if(attrs.title) {
            headerEl.className = 'sp-card-header'
            titleEl = createEl('span');
            titleEl.className = 'sp-card-title'
            titleEl.textContent = attrs.title;
            root.titleEl = titleEl
        } else {
            headerEl = ''
        }
        if(attrs.extra) {
            extraEl = createEl('div');
            extraEl.className = 'sp-card-extra';
            extraEl.innerHTML = attrs.extra;
        }
        headerEl?.append?.(titleEl, extraEl);
        (root as HTMLElement).insertBefore(headerEl || createEl('sup'),  root.firstChild);
    }
}


export default new Card()