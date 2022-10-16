import { badgeProps, badgeTypes } from './type'
import { defineEl, setStyle, getProps, createEl } from '../_utils/dom'
// import './style'
import Base from '../_utils/Base'

class Badge extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-badge',
            observedAttributes: Object.keys(badgeProps),
            connectedCallback() {
                (this.attrs as Partial<badgeTypes>) = getProps(this);
                this.attrs = { ...badgeProps, ...this.attrs };
                context.initView(this)
            },
            attributeChangedCallback(...args: any) {
                let [key, _, newval] = args;
                if (!this.badge) return;
                context.set([this.badge, key, newval, this])
            }
        })
    }


    set([badge, key, newval, root]: any) {
        if (key == 'count' || key == 'text') {
            if (key == 'count' && badge.showZero && newval > 0) {
                root.showZero = false;
                badge.textContent = newval
                setStyle(badge, { display: 'block' });
                return;
            }

            if (key == 'count' && root.attrs['show-zero'] + '' == 'true' && parseFloat(root['attr-count'] || newval) <= 0) {
                badge.showZero = true;
                setStyle(badge, { display: 'none' });
            }

            if (key == 'count' && newval >= root.attrs['max-count']) {
                badge.textContent = root.attrs['max-count'] + '+';
                return;
            }
            newval && (badge.textContent = newval);
        }
        if (root.attrs['dot'] + '' == 'true' && key == 'status') {
            if (newval == 'processing') {
            } else {
                setStyle(badge, {
                    backgroundColor:
                        newval == 'success' ? '#52c41a' : newval == 'default' ? '#e6ebf1' : newval == 'error' ? '#ff4d4f' : '#faad14'
                });
            }
        }
        if (key == 'dot') {
            if (newval + '' == 'true') {
                badge.textContent = '';
                badge.classList.add('sp-badge--point');

            } else {
                badge.classList.remove('sp-badge--point');
            }
        }
        if (key == 'type') {
            setStyle(badge, { backgroundColor: `var(--color-${newval})` })
        }

        if (key == 'color') {
            setStyle(badge, { backgroundColor: newval })
        }
    }

    initView(root: HTMLElement | any) {
        this._setClassName(root);
        let { count, text }: any = root.attrs;
        let badge = createEl('span');
        badge.className = 'sp-badge' + (count || text ? '--count' : '--point');
        badge.textContent = count || text;
        for (let k in root.attrs) {
            this.set([badge, k, root.attrs[k], root])
        }
        root.badge = badge;
        if (badge.className.indexOf('point') > -1) {
            root.insertBefore(badge, root.firstChild)
            return;
        }
        root.append(badge)
    }
}


export default new Badge()