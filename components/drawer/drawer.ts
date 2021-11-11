
import { runIFELSE, sto, isObject, has } from '../_utils/common'
import { getIndex, setIndex } from '../common/index'
import { drawerProps, drawerTypesProps } from './type'
import { defineEl, createEl, setStyle, getProps, listener } from '../_utils/dom'
import './style';

const keys: string[] = Object.keys(drawerProps);

class Base {
    public _setClassName(root: HTMLElement | any) {
        let basename = root.tagName.toLocaleLowerCase();
        root.$$placement = root?.['attr-placement'] || root?.attrs?.['placement']
        let classList = [
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname'],
            '_-_' + root.$$placement,
            (root?.['append-to-body'] || root?.attrs?.['append-to-body']) == 'true' ? 'is-fixed' : ''
        ];
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
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                context.set({
                    attrs: { [key]: newval },
                    target: this,
                    mask: this?.maskEl,
                    header: this?.headerEl
                })
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
            close = createEl('i'),
            mask = createEl('div');
        mask.className = 'sp-drawer-mask __' + getIndex();
        setIndex()
        setStyle(mask, {
            zIndex: getIndex() + ''
        })
        setStyle(root, {
            zIndex: (setIndex() + 1) + ''
        })
        root.attrs?.['keyboard'] == 'true' && listener(document.body, 'keydown', (e:KeyboardEvent) => {
            if (e.which === 27 && root['attr-visible'] == 'true'){
                root?.onClose()
            }
        })
        listener(close, 'click', () => root?.onClose())
        this._setClassName(root)

        header.append(title, close);
        root.attrs?.['mask'] == 'false' && (mask = '')
        root.attrs?.['mask-closable'] == 'true' && mask && listener(mask, 'click', () => root?.onClose())
        root.headerEl = header
        this.set({ title, attrs: root.attrs, close, target: root, mask, header })
        root.insertBefore(header, root.firstChild);
        root.maskEl = mask

    }
    protected set(args: any) {
        let { title, attrs, close, target, mask, header } = args;
        runIFELSE(new Set([
            [attrs?.['title'] && title, () => {
                title.innerText = attrs['title']
            }],
            [attrs?.['closable'] && close, () => {
                if (attrs?.['closable'] == 'true') {
                    close.className = 'sp-icon ' + (attrs?.['closeicon'] ? attrs?.['closeicon'] : 'sp-icon-close')
                } else {
                    setStyle(close, { display: 'none' })
                }
            }],
            [attrs?.['classname'], () => this._setClassName(target)],
            [attrs?.['visible'], () => {
                if (attrs?.['visible'] == 'true') {
                    target.classList.add('_-_' + target?.$$placement)
                    mask?.classList.add('block')
                    sto(() => {
                        target.classList.add('_-_' + target?.$$placement + '-open')
                        mask?.classList.add('open')
                    });
                    return
                }

                if (attrs?.['visible'] == 'false') {
                    target?.classList.remove('_-_' + target?.$$placement + '-open')
                    mask?.classList.remove('open');
                    sto(() => {
                        mask?.classList.remove('block');
                    }, 290);
                }
            }],
            [attrs?.['append-to-body'], () => {
                if (attrs?.['append-to-body'] == 'true' && !target.isbody) {
                    this._setClassName(target)
                    target.remove();
                    target.isbody = true;
                    document.body.append(target, mask)
                    target?.headerEl?.remove();
                }
                if (attrs?.['append-to-body'] == 'false') {
                    let nesetparent = target.parentElement;
                    nesetparent.append(mask)
                    setStyle(nesetparent, {
                        position: 'relative'
                    });
                }
            }]
        ]))
    }
}

export { Drawer }
export default new Drawer()