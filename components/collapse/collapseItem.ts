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
        setStyle(root, {
            height: f ? root.scrollHeight + 32 + 'px' : '38px'
        })
    }

    getIndex(root: HTMLElement) {
        let idx;
        [].map.call((root.parentElement?.children || []), (item: HTMLElement, index: number) => {
            item == root && (idx = index)
        })
        return idx;
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

    initIndex(pattrsIndex: any, root: any, rootIndex: any, headerEl: any, iconEl: any) {
        if (pattrsIndex && rootIndex && rootIndex == pattrsIndex) {
            root.parentElement.lastEl = headerEl;
            sto(() => this.active(iconEl, root, headerEl))
        }
        if (pattrsIndex && !rootIndex) {
            let idx = this.getIndex(root);
            if (idx != undefined && pattrsIndex == (+idx + 1)) {
                root.parentElement.lastEl = headerEl;
                sto(() => this.active(iconEl, root, headerEl))
            }
        }
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
        let defaults = this.adapterDefaults(pattrs['active-index'])
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
        if (pattrs['accordion'] !== 'true' && defaults.length > 1) {
            defaults.map(i => {
                this.initIndex(i, root, attrs['index'], headerEl, iconEl)
            })
        } else {
            this.initIndex(defaults[0], root, attrs['index'], headerEl, iconEl)
        }

        titleEl.textContent = attrs['title'];
        iconEl && (iconEl.className = 'sp-icon sp-icon-arrow-right')
        titleEl.className = '--title'
        headerEl.append(iconEl, titleEl);
        root.insertBefore(headerEl, root.firstChild);
    }
}


export default new CollapseItem()