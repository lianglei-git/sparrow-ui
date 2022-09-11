
import { runIFELSE, sto} from '_utils/common'
import { getIndex, setIndex } from 'common/index'
import { drawerProps, drawerTypesProps } from './type'
import { defineEl, createEl, setStyle, getProps, listener } from '_utils/dom'
import SlotsBase from './Slots'
import './style';

const keys: string[] = Object.keys(drawerProps);
const $$style: string = ``
class Drawer extends SlotsBase {
    context: this
    constructor() {
        super({
            $$style
        })
        const context = this;
        defineEl({
            tag: 'sp-drawer',
            shadow: 'open',
            observedAttributes: keys,
            connectedCallback() {
                (this.attrs as Partial<drawerTypesProps>) = getProps(this);
                this.attrs = { ...drawerProps, ...this.attrs };
                // if (this.attrs['append-to-body'] == 'true') {
                //     this.isbody = true
                //     // this.remove();
                //     this['attr-append-to-body'] = 'false' // 重新走下面
                //     context._setClassName(this)
                //     // document.body.append(this)
                //     // return;
                // }
                if(this.attrs.fullscreen == 'true') {
                    this.isbody = true;
                    context._setClassName(this)
                }
                sto(() => {
                    context.initView(this)
                });// 初始化视图
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


    // protected beforeAppend(...args: any) {
    //     let { title, attrs, close } = args;

    //     runIFELSE(new Set([
    //         [!attrs?.['title'], () => {
    //             title = ''
    //         }],
    //         [!attrs?.['closable'], () => {
    //             close = ''
    //         }]
    //     ]))
    // }


    protected initView(root: HTMLElement | any) {
        let header = createEl('header'),
            title = createEl('span'),
            close = createEl('i'),
            mask = createEl('div'),
            template = createEl('template'),
            slotObj = this._showContentType(root, ['header']);
        mask.className = 'sp-drawer-mask __' + getIndex();
        template.innerHTML = this._template(root)
        this._setClassName(root)
        header.setAttribute('slot', 'header')
        header.append(title, close);
        listener(close, 'click', () => root?.onClose())
        root.attrs?.['keyboard'] == 'true' && listener(document.body, 'keydown', (e: KeyboardEvent) => {
            if (e.which === 27 && root['attr-visible'] == 'true') {
                root?.onClose()
            }
        })



        root.attrs?.['mask'] == 'false' && (mask = '')
        root.attrs?.['mask-closable'] == 'true' && mask && listener(mask, 'click', () => root?.onClose())
        root.headerEl = header;
        !slotObj.header && root.insertBefore(header, root.firstChild);
        root.shadowRoot.appendChild(template.content.cloneNode(true))
        this.set({ title, attrs: root.attrs, close, target: root, mask, header })
        root.maskEl = mask
    }

    protected set(args: any) {
        let { title, attrs, close, target, mask } = args;
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
            [attrs?.['placement'], () => this._setClassName(target)],
            [attrs?.['visible'], () => {
                let width = target['attr-width']
                if (attrs?.['visible'] == 'true') {
                    target.classList.add('_-_' + target?.$$placement)
                    mask?.classList.add('block')
                    sto(() => {
                        width && setStyle(target, {width})
                        target.classList.add('_-_' + target?.$$placement + '-open')
                        mask?.classList.add('open')
                    });
                    {
                        setIndex()
                        setStyle(mask, {
                            zIndex: getIndex() + ''
                        })
                        setStyle(target, {
                            zIndex: (getIndex() + 1) + ''
                        })
                    }
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
            [attrs?.fullscreen, () => {
                if (!mask) return
                if (target.isbody) {
                    document.body.append(mask);
                    return
                }

                let nesetparent = target.parentElement;
                nesetparent.append(mask)
                setStyle(nesetparent, {
                    position: 'relative'
                });
            }]
        ]))
    }
}

export { Drawer }
export default new Drawer()