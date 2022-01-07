import { collapseProps, collapseTypes } from './type'
import { sto } from '../_utils/common'
import { defineEl, getProps, listener, setStyle } from '../_utils/dom' 
import './style'
import Base from '../_utils/Base'
import { createEl } from 'sparrow-ui/_utils/dom';

class CollapseItem extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-collapse-panel',
            observedAttributes: Object.keys(collapseProps),
            connectedCallback() {
                (this.attrs as Partial<collapseTypes>) = getProps(this);
                this.attrs = { ...collapseProps, ...this.attrs };
                sto(() => context.initView(this))
            },
            attributeChangedCallback(...args: any) {
                let [key, _, newval] = args;
                key
                newval
            }
        })
    }

    active(_iconEl: any, root: any, headerEl: any) {
            let f = headerEl.classList.toggle('active');
            console.log(root.scrollHeight)
            setStyle(root, {
                height: f ? root.scrollHeight + 32 + 'px' : '38px'
            })
    }


    initView(root: HTMLElement | any) {
        let _ptagName = root.parentElement.tagName
        let pattrs = root?.parentElement?.attrs;
        let attrs = root?.attrs;
        this._setClassName(root);
        let headerEl = createEl('header');
        let titleEl = createEl('span');
        let iconEl = createEl('em');
        headerEl.className = 'sp-collapse-panel-header';
        listener(headerEl, 'click', _ => {
            if (pattrs['accordion'] == 'true') {
                if (root.parentElement.lastEl && root.parentElement.lastEl != headerEl) {
                    root.parentElement?.lastEl?.classList.remove('active');
                    setStyle(root.parentElement?.lastEl?.parentElement, { height: '38px' })
                }
                root.parentElement.lastEl = headerEl;
                this.active(iconEl, root, headerEl)
                return
            }
            this.active(iconEl, root, headerEl)
        })
        if (_ptagName !== 'SP-COLLAPSE') {
            throw Error('The parent element should be SP-COLLAPSE');
        }
        if (attrs['hide-arrow'] + '' == 'true') {
            iconEl = ''
        }
        if (!attrs['title']) {
            titleEl = '';
            throw Error('Please pass in the title');
        }

        if (pattrs['active-index'] && attrs['index'] == pattrs['active-index']) {
            root.parentElement.lastEl = headerEl;
            sto(() => this.active(iconEl, root, headerEl))
        }
        titleEl.textContent = attrs['title'];
        iconEl && (iconEl.className = 'sp-icon sp-icon-arrow-right')
        titleEl.className = '--title'
        headerEl.append(iconEl, titleEl);
        root.insertBefore(headerEl, root.firstChild);
    }
}


export default new CollapseItem()