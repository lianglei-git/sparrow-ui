import { breadcrumbTypesProps, breadcrumbProps } from './type'
import { defineEl, getProps, createEl } from '../_utils/dom'


class BreadCrumb {
    constructor() {
        const context = this
        defineEl({
            tag: 'sp-breadcrumb',
            connectedCallback() {
                (this.attrs as Partial<breadcrumbTypesProps>) = getProps(this);
                this.attrs = { ...breadcrumbProps, ...this.attrs };
                this.className += ' '+this.tagName.toLocaleLowerCase()
                context.initView(this);
            }
        })
    }

    initView(root: any) {
        let el = createEl('span');
        if (root.attrs['separator-class']) {
            el.className = 'sp-separator sp-icon ' + root.attrs['separator-class']
        }
        if (!root.attrs['separator-class']) {
            el.className = 'sp-separator';
            el.innerText = root.attrs['separator']
        }
        root.icon = el;
    }
}


export default new BreadCrumb()