
import { runIFELSE, sto, isObject, has } from '../_utils/common'
import { getIndex, setIndex } from '../common/index'
import { drawerProps, drawerTypesProps } from './type'
import { defineEl, createEl, setStyle, getProps, $el } from '../_utils/dom'
import './style';

const keys: string[] = Object.keys(drawerProps);

class Base {
    public _setClassName(root: HTMLElement | any) {
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname']
        ]
        root.className = classList.join(' ');
    }
}


class Drawer extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-drawer',
            observedAttributes: keys,
            connectedCallback() {
                (this.attrs as Partial<drawerTypesProps>) = getProps(this);
                this.attrs = { ...drawerProps, ...this.attrs };
                context.initView(this)
            }
        })
    }



    protected beforeAppend(...args: any) {
        let { title, attrs, close } = args;

        runIFELSE(new Set([
            [!attrs?.['title'], () => {
                title = ''
            }],
            [!attrs?.['closable'], () => {
                close = ''
            }]
        ]))
    }

    protected initView(root: HTMLElement | any) {
        let header = createEl('header'),
            title = createEl('span'),
            close = createEl('i');
        header.append(title, close);

        this.set({ title, attrs: root.attrs, close, target: root })
        root.insertBefore(header, root.firstChild);
    }
    protected set(...args: any) {
        let { title, attrs, close, target } = args;
        runIFELSE(new Set([
            [attrs?.['title'] && title, () => {
                title.innerText = attrs['title']
            }],
            [attrs?.['closable'] && close, () => {
                if (attrs?.['closable'] == 'true') {
                    close.className = 'sp-icon ' + (attrs?.['closable'] ? attrs?.['closable'] : 'sp-icon-close')
                }
                setStyle(close, {})
            }],
            [attrs?.['classname'], () => this._setClassName(target)],
            [attrs?.['visible'], () => {
                if(attrs?.['visible'] == 'true') {
                    // setStyle(target, { })
                    target.classList.add('v-right-fade-enter')
                    sto(() => target.classList.add('v-right-fade-enter-active'))
                }
            }]
        ]))
    }
}

export { Drawer }
export default new Drawer()