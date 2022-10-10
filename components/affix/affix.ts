import { affixTypes, affixProps } from './type'
import { defineEl, setStyle, getProps, listener } from '../_utils/dom'
import Base from '../_utils/Base'
import { createEl } from '../_utils/dom';
import { getTargetRect, getFixedBottom, getFixedTop } from './utils'
import raf from '../_utils/raf'


// raf 代替 sto
const keys: string[] = Object.keys(affixProps);
interface targetPrototype {
    isFixed: boolean
    attrs: Partial<affixTypes> | any
    [bottom: string]: boolean
    top: boolean
    star: any
    onChange: ((isFixed: boolean, location: 'top' | 'bottom') => any) | any
}

class Affix extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-affix',
            observedAttributes: keys,
            connectedCallback() {
                (this.attrs as Partial<affixTypes>) = getProps(this);
                this.attrs = { ...affixProps, ...this.attrs };
                raf(() => context.initView(this))
            }
        })
    }
    initView(root: HTMLElement & targetPrototype) {
        root.isFixed = false;
        this._setClassName(root);
        let offsetTop = root.attrs?.['offset-top'] ? +root.attrs?.['offset-top'] : undefined;
        let offsetBottom = root.attrs?.['offset-bottom'] ? +root.attrs?.['offset-bottom'] : undefined;
        let placeholderEl = createEl('div');
        let parent = root.parentElement || root.parentNode || document.body
        setStyle(placeholderEl, {
            width: root.offsetWidth + 'px',
            height: root.offsetHeight + 'px'
        });
        // setStyle(root, {
        //     width: root.offsetWidth + 'px',
        //     height: root.offsetHeight + 'px'
        // });

        function handler(t: any, distance: number, type: string, cal: (distance: number) => any) {
            if (root[type == 'bottom' ? 'top' : 'bottom']) return;
            let toFixedDistance: any = type == 'top' ? getFixedTop(t, 0) : getFixedBottom(t, 0);
            let fixedDistance = toFixedDistance && parseInt(toFixedDistance);
            if (fixedDistance < distance && !root.isFixed) {
                root.isFixed = true;
                root[type] = true;
                parent.insertBefore(placeholderEl, root)
                setStyle(root, {
                    position: 'fixed',
                    ...cal(distance)
                })
                root.onChange?.(root.isFixed, type)
                return
            }
            if (root.isFixed) {
                let _placeholder = getTargetRect(placeholderEl);
                let placeholderElToFixedtDistance: any = type == 'top' ? getFixedTop(_placeholder, 0) : getFixedBottom(_placeholder, 0);
                let placeholderElDistance = placeholderElToFixedtDistance && parseInt(placeholderElToFixedtDistance);
                if (placeholderElDistance > distance) {
                    placeholderEl.remove();
                    root[type] = false
                    setStyle(root, { position: 'static' })
                    root.isFixed = false;
                    root.onChange?.(root.isFixed, type)
                }
            }
            return
        }
        function star(_: any) {
            let target = getTargetRect(root);
            if (offsetTop != undefined) {
                handler(target, offsetTop, 'top', (top) => ({ top: top + 'px', bottom: 'inherit' }))
            }
            if (offsetBottom != undefined) {
                handler(target, offsetBottom, 'bottom', (bottom) => ({ bottom: bottom + 'px', top: 'inherit' }))
            }
        }
        root.star = star
        star(0)
        listener((window as any), 'scroll', star, true)
        listener((window as any), 'resize', () => {
            star(0)
        }, true)
    }

}

export { Affix }
export default new Affix()