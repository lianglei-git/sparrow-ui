import { alertTypesProps, alertProps } from './type'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps, listener } from '../_utils/dom'
import './style'
const keys: string[] = Object.keys(alertProps);
const spAlertTitleCss = `.sp-alert-content {
    width: 100%;
  }
  .sp-alert-icon {
    margin-right: 10px;
  }
  .sp-alert-close {
    margin-left: 10px;
    cursor: pointer;
  }
  .sp-alert-close:hover {
    filter: brightness(0.8);
  }
  `
class Alert {
    context: this
    constructor() {
        const context = this;
        defineEl({
            tag: 'sp-alert',
            observedAttributes: keys,
            connectedCallback() {
                (this.attrs as Partial<alertTypesProps>) = getProps(this);
                this.attrs = { ...alertProps, ...this.attrs };
                context.initView(this)
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                context.set({
                    attrs: { [key]: newval },
                    target: this,
                    iconEl: this.iconEl,
                    contentEl: this.contentEl,
                    closeEl: this.closeEl
                })
            }
        })
    }

    private _setClassName(root: HTMLElement & { [attrK: string]: string } | any) {
        // 第一次执行的时候使用的应该是 默认的 如果不传值的情况下 --- root.attrs.classname
        // 反之 之后每次修改用到的都是 root['attr-classname'] 这样子的
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname'],
            basename + '--' + (root?.['attr-type'] || root?.attrs?.['type']),
            root?.['attr-effect'] || root?.attrs?.['effect'],
        ]
        root.className = classList.join(' ');
    }

    private _initTempalte<T extends HTMLElement>(root: T | any) {
        root.attachShadow({ mode: 'open' })
        const template: T = createEl('template');
        template.innerHTML = `
            <style>${spAlertTitleCss}${root?.['attr-setslotstyle']}</style>
            <slot name="l"></slot>
            <div class="sp-alert-content">
                <slot name="title"></slot>
            </div>
            <slot name="r"></slot>
        `
        root.shadowRoot.appendChild((template as any).content.cloneNode(true))

    }

    private showContentType(root: any) {
        let nodes: HTMLElement | any[] = Array.from(root.children);
        let slots: string[] = ['title']
        let slotObj = nodes.reduce((obj, i) => {
            let slot = i.getAttribute('slot')
            if (slots.includes(slot)) obj[slot] = slot
            return obj
        }, Object.create(null))
        return slotObj[slots[0]] || false
    }

    protected initView(root: HTMLElement | any) {
        let iconEl: HTMLElement | any = createEl('i'),
            contentEl: HTMLSpanElement | any = createEl('span'),
            closeEl: HTMLSpanElement | any = createEl('span');
        iconEl.basename = 'sp-alert-icon'
        contentEl.basename = 'sp-alert-content'
        closeEl.basename = 'sp-alert-close'
        iconEl.classList.add(iconEl.basename);
        contentEl.classList.add(contentEl.basename);
        closeEl.classList.add(closeEl.basename);
        this._setClassName(root);
        root.iconEl = iconEl;
        root.contentEl = contentEl;
        root.closeEl = closeEl;

        listener(closeEl, 'click',async () => {
            let flag = await root.close?.()
            !flag && root.remove()
        })
        this.set({
            attrs: root.attrs,
            target: root,
            iconEl,
            contentEl,
            closeEl
        })
        if (this.showContentType(root)) {
            this._initTempalte(root);
            contentEl = '';
            iconEl.setAttribute('slot', 'l')
            closeEl.setAttribute('slot', 'r')
        }
        root.append(iconEl, contentEl, closeEl)

    }

    private set({ attrs, target, contentEl, iconEl, closeEl }: any) {
        runIFELSE(new Set([
            [attrs?.icon && iconEl, () => {
                iconEl.className = iconEl.basename + ' sp-icon ' + attrs?.icon
            }],
            [attrs?.closable && closeEl, () => {
                let display = attrs.closable == 'true' ? 'block' : attrs.closable == 'false' ? 'none' : ''
                display == 'block' && (closeEl.innerHTML = '')
                display == 'block' && (closeEl.className = closeEl.basename + ' sp-icon sp-icon-close')
                setStyle(closeEl, { display })
            }],
            [attrs?.['close-text'] && closeEl, () => {
                closeEl.className = closeEl.basename
                closeEl.innerText = attrs?.['close-text']
            }],
            [attrs?.['classname'] || attrs['type'] || attrs?.['effect'], () => this._setClassName(target)],
            [attrs?.['center'] && contentEl, () => {
                let textAlign = attrs.center == 'true' ? 'center' : attrs.center == 'false' ? 'left' : ''
                setStyle(contentEl, { textAlign })
            }],
            [attrs?.['title'] && contentEl, () => { contentEl.innerText = attrs.title }],
        ]))
    }
}

export { Alert }
export default new Alert()