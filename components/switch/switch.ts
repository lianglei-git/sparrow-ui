import { switchTypesProps, switchProps } from './type'
import { runIFELSE } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps, listener } from '../_utils/dom'
import './style'
const keys: string[] = Object.keys(switchProps);
const iconbaseclass = 'sp-switch-icon sp-icon '
class Switch {
    constructor() {
        let self = this
        defineEl({
            tag: 'sp-switch',
            observedAttributes: keys,
            connectedCallback() {
                (this.attrs as Partial<switchTypesProps>) = getProps(this);
                this.attrs = { ...switchProps, ...this.attrs };
                this.isActive = false;

                this.onclick = (_: Event) => {
                    this.onClick?.(this.isActive, this)
                    if (this['attr-disabled'] == 'true') return
                    self.click(this)
                    this.onChange?.(this.isActive, this)
                }
                Object.defineProperty(this, 'isActive', {
                    enumerable: false,
                    set(v: boolean) {
                        setStyle(this, {
                            backgroundColor: !v ? this.attrs?.['inactive-color'] || '#dcdfed' : this.attrs?.['active-color'] || '#409eff'
                        })
                        this.textEl && (this.textEl.textContent = !v ? this?.['attr-inactive-text'] || '' : this?.['attr-active-text'] || '')
                        if (this.iconEl && this?.['attr-loading'] !== 'true') {
                                this.iconEl.set(!this.isActive ?this?.['attr-active-icon']:this?.['attr-inactive-icon'])
                        }
                        this['_isActive'] = v;
                    },
                    get() {
                        return this['_isActive'] || false
                    }
                })
                self.initView(this);
            },
            attributeChangedCallback(...args) {
                let [key, old, newval] = args;
                key == 'size' && this.classList.remove(old)
                self.set({ attrs: { [key]: newval }, target: this, icon: this.iconEl, text: this.textEl })
            }
        })
    }
    private click(root: any) {
        let is = root.isActive;
        root.isActive = !is
        let small = root.className.indexOf('small') > -1
        let iconleft = (is ? 1 : root.offsetWidth - (small ? 12 : 16) - 3) + 'px';
        setStyle(root.iconEl, { left: iconleft });
        setStyle(root.textEl, { transform: `translateX(${!is ? 3 + 'px' : (root.offsetWidth - root.iconEl.offsetWidth - (root.textEl.offsetWidth / 2) - 2) + 'px'})` });
    }
    private initView(root: HTMLElement & { isActive: boolean } | any) {
        let text: HTMLSpanElement = createEl('span'),
            icon: HTMLElement & { set(v: string): any } = createEl('em');
        root.classList.add('sp-switch');
        icon.classList.add('sp-switch-icon');
        text.classList.add('sp-switch-text');
        if (root.attrs?.['default-checked'] == 'true') {
            root.isActive = true;
        }
        root.appendChild(text);
        root.appendChild(icon);
        icon.set = (v) => {
            icon.className = iconbaseclass + v
        }
        this.set({ attrs: root.attrs, target: root, text, icon })
        root.textEl = text;
        root.iconEl = icon;

    };

    set({ attrs, target, icon, text }: any) {
        runIFELSE(new Set([
            [attrs?.['classname'], () => {
                let str = 'sp-switch ' + attrs?.['classname'] + ' '
                    //   + (target?.['attr-loading'] == 'true'? 'sp-icon sp-icon-loading ' : ' ')
                    + (target?.['attr-size'] || 'default') + ' '
                    + (target?.['attr-disabled'] == 'true' ? 'is-disabled ' : ' ')
                target.className = str
            }],
            [attrs?.['loading'] && icon, () => {
                let isloading: string = attrs?.['loading'];
                if (isloading == 'false') {
                    icon.classList.remove('sp-icon-loading')
                } else if (isloading == 'true') {
                    icon.set('sp-icon-loading')
                }
            }],
            [attrs?.['active-icon'], () => {
                if (attrs?.['active-icon'].indexOf('sp-icon') > -1) {
                    target.isActive && icon.set(attrs?.['active-icon'])
                }
            }],
            [attrs?.['inactive-icon'], () => {
                if (attrs?.['inactive-icon'].indexOf('sp-icon') > -1) {
                    !target.isActive && icon.set(attrs?.['inactive-icon'])
                }
            }],
            [attrs?.['size'], () => {
                target.classList.add(attrs?.['size'])
            }],
            [attrs?.['active-text'], () => {
                target.isActive && text && (text.textContent = attrs?.['active-text'])
            }],
            [attrs?.['inactive-text'], () => {
                !target.isActive && text && (text.textContent = attrs?.['inactive-text'])
            }],
            [attrs?.['active-color'], () => {
                target.isActive && (setStyle(target, { backgroundColor: attrs?.['active-color'] }))
            }],
            [attrs?.['inactive-color'], () => {
                !target.isActive && (setStyle(target, { backgroundColor: attrs?.['inactive-color'] }))
            }],
            [attrs?.['disabled'], () => {
                let disabled = attrs?.['disabled'];
                let type = disabled == 'true' ? 'add' : disabled == 'false' ? 'remove' : 0;
                type && (target.classList as any)[type]('is-disabled');
            }],
            [attrs?.['width'], () => {
                let is = target.isActive
                let width: string = (parseInt(attrs?.['width']) || 24) + 'px';
                setStyle(target, { width });
                let small = target.className.indexOf('small') > -1
                let left = (!is ? 1 : parseInt(width) - (small ? 12 : 16) - 3) + 'px';
                icon && setStyle(icon, { left });
                text && icon && setStyle(text, { transform: `translateX(${is ? 3 + 'px' : (parseInt(width) - icon.offsetWidth - (text.offsetWidth / 2) - 2) + 'px'})` });
            }],
        ]));
    }
}

export { Switch }
export default new Switch()