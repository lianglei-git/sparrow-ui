import { dividerProps as Props, dividerTypes as Types } from './type'
import { sto } from '../_utils/common'
import { createEl, defineEl, getProps } from '../_utils/dom' // setStyle
// import './style'
import Base from '../_utils/Base'
class Divider extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-divider',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                sto(() => context.initView(this))
            }
        })
    }

    initView(root: HTMLElement | any) {
        let attrs = root.attrs;
        this._setClassName(root, [attrs['type'] == 'vertical' ? '--vertical' : '', '--' + attrs['orientation'], attrs['dashed'] + '' == 'true' ? '--dashed' : '', attrs['plain'] + '' == 'true' ? '--plain' : '']);
        if(root.innerHTML) {
            let html = createEl('div');
            html.className='sp-divider-text';
            html.innerHTML = root.innerHTML;
            root.classList.add('__text')
            root.innerHTML = '';
            root.append(html)
        }

        
    }
}


export default new Divider()