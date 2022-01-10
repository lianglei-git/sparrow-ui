import { avatarProps, avatarTypes } from './type'
import { sto, runIFELSE } from '../_utils/common'
import { defineEl, setStyle, getProps } from '../_utils/dom'
import './style'
import Base from '../_utils/Base'
import { createEl } from 'sparrow-ui/_utils/dom';


class Avatar extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-avatar',
            connectedCallback() {
                (this.attrs as Partial<avatarTypes>) = getProps(this);
                this.attrs = { ...avatarProps, ...this.attrs };
                context.initView(this);
            }
        })
    }


    initView(root: HTMLElement | any) {
        const attr = root.attrs;
        const size = attr.size == 'large' ? 40 : attr.size == 'small' ? 24 : attr.size == 'default'?32 : parseFloat(attr.size || 0);
        const shape = attr.shape == 'circle' ? '50%' : attr.shape == 'square' ? '3px' : '0';
        let iconEl: any = '', textEl: any = '', imgEl: any = '';
        this._setClassName(root, [attr.size || '', attr.shape || '']);
        runIFELSE(new Set([
            [attr.icon, () => {
                iconEl = createEl('i');
                iconEl.className = '--icon sp-icon ' + attr.icon;
                return true;
            }],
            [attr.src, () => {
                imgEl = createEl('img');
                imgEl.className = '--src';
                imgEl.src = attr.src;
                return true;
            }],
            [true, () => {
                textEl = createEl('span');
                textEl.className = '--string';
                textEl.textContent = root.textContent || '';
            }],
        ]));
        root.textContent = '';
        setStyle(root, {
            width: (!root.style.width ? size : undefined) + 'px',
            height: (!root.style.height ? size : undefined) + 'px',
            borderRadius: (!root.style.borderRadius ? shape : undefined)
        })

        root.append(iconEl, imgEl, textEl);
        sto(() => {
            if(textEl) {
                let textwidth = textEl.getBoundingClientRect().width;
                if (textwidth > size) {
                    setStyle(textEl, {
                        transform: 'scale(' + size / (textwidth + 6) + ') translateX(-50%)'
                    })
                }
            }
            
        })
    }
}


export default new Avatar()