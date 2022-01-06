import { cardProps, cardTypes } from './type'
import { sto } from '../_utils/common'
import { defineEl, setStyle, getProps } from '../_utils/dom'
import './style'
import Base from '../_utils/Base'
import { createEl } from 'sparrow-ui/_utils/dom';

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
                if (!this.badge) return;
            }
        })
    }


    set() {
        
    }

    initView(root: HTMLElement | any) {
        let attrs = root.attrs;
        this._setClassName(root, [attrs['dis-hover']+ '' == 'false' ? '' : 'hover']);
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
        } else {
            headerEl = ''
        }
        if(attrs.extra) {
            extraEl = createEl('div');
            extraEl.className = 'sp-card-extra';
            extraEl.innerHTML = attrs.extra;
        }

        headerEl?.append(titleEl, extraEl);
        (root as HTMLElement).insertBefore(headerEl,  root.firstChild);
    }
}


export default new Card()