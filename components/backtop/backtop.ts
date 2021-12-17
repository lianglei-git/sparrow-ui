import { backTopProps, backTopTypes } from './type'
import { sto } from '../_utils/common'
import raf from '../_utils/raf'
import { getIndex } from '../common/index'
import { defineEl, setStyle, getProps } from '../_utils/dom'
import './style'
import Base from '../_utils/Base'
import { createEl, $el } from 'sparrow-ui/_utils/dom';


class BackTop extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-backtop',
            connectedCallback() {
                (this.attrs as Partial<backTopTypes>) = getProps(this);
                this.attrs = { ...backTopProps, ...this.attrs };
                context.initView(this)
            }
        })
    }



    initView(root: HTMLElement | any) {
        this._setClassName(root)
        root.show = false;
        let { target: propTarget, bottom, right, 'visibility-height': vHeight } = root.attrs
        let target = $el(propTarget);
        if (target.length <= 0) throw Error('!!! Please pass in a valid element')
        let _target = target[0];
        let s = 0
        function scrollTop(target:any) {
            if( _target.scrollTop <= 0) return;
            s+=2
            _target.scrollTop -= s
            raf(() => scrollTop(target))
        }

        root.onclick = (e:any) => {
            s = 0
            scrollTop(_target)
            root?.click?.(e)
        }
        function scroller(__tar: HTMLElement) {
            let scrollTop = propTarget == 'body' ? document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset : __tar.scrollTop
            if (scrollTop > vHeight && !root.show) {
                root.show = true;
                setStyle(root, {
                    display: 'flex',
                    opacity: '0',
                    zIndex: '' + (getIndex() + 1),
                    bottom: bottom + 'px',
                    right: right + 'px'
                })
                sto(() => setStyle(root, { opacity: '1' }), 190)
                return
            }
            if (scrollTop < vHeight && root.show) {
                root.show = false;
                setStyle(root, { opacity: '0' })
                sto(() => setStyle(root, { display: 'none' }),190)
            }
        }
        _target.addEventListener('scroll', (e:any) => scroller(e.target), true)
        scroller(_target)
        let icon = createEl('em')
        icon.className = 'sp-icon sp-icon-rising';
        root?.childNodes?.length == 0 && root.append(icon)
    }
}


export default new BackTop()