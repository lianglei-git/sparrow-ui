import { runIFELSE, sto, isObject, has } from '../_utils/common'
import { getIndex, setIndex } from 'common/index'
import { notifyTypesProps, notifyProps } from './type'
import { defineEl, createEl, setStyle, getProps, $el } from '../_utils/dom'
import './style'

const keys: string[] = Object.keys(notifyProps);
type El<T> = (T extends (infer U)[] ? U : T) | (any | any[]);
type ChildrenCal = (root: HTMLElement | any, func: (args: { [K: string]: El<HTMLElement> }) => void) => void // (NodeList | HTMLElement)[]

class NotifyBase {
    context: this
    constructor() {
        const context = this
        defineEl({
            tag: 'sp-notify',
            observedAttributes: keys,
            connectedCallback() {
                (this.attrs as Partial<notifyTypesProps>) = getProps(this);
                this.attrs = { ...notifyProps, ...this.attrs };
                this.close = () => {
                    this['attr-visible'] = false;
                }
                sto(() => {
                    context.initView(this)
                })
                this.setup = context.setup.bind(this)
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                let elAlls: Array<any> = Array.from($el('sp-notify'));
                if (key == 'visible') {
                    let offsetHeight = this.offsetHeight
                    newval && setIndex();
                    if (newval == 'false') {
                        this.classList.add('sp-notify-fade-leave-' + this['attr-position']);
                        setStyle(this, {
                            opacity: '0',
                            zIndex: '0'
                        })
                        let _index = elAlls.findIndex(i => i.id == this.id);
                        this.beforeClose && this.beforeClose();
                        elAlls.forEach((element: any, i: number) => {
                            if (i >= _index && element['attr-position'].indexOf(this['attr-position']) > -1) {
                                let dir = this['attr-position'].indexOf('bottom') > -1 ? 'bottom' : 'top'
                                let px = parseInt(element.style[dir], 10) - offsetHeight - 20 + 'px'
                                setStyle(element, {
                                    [dir]: px
                                })
                            }
                        });
                        this.beforeDistroy?.()
                        sto(() => this.remove(), 290)
                    } else {
                        this.classList.add('sp-notify-fade-enter-' + this['attr-position'] + '')
                        sto(() => this.classList.add('sp-notify-fade-enter-' + this['attr-position'] + '-active'))
                    }
                }
            }
        })
    }
    private _setClassName(root: HTMLElement & { [attrK: string]: string } | any) {
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
            root.className,
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname'],
            root?.['attr-position'] || root?.attrs?.['position'],
            basename + '--' + root?.['attr-type'] || root?.attrs?.['type'],
        ]
        root.className = classList.join(' ');

    }
    protected initChildrens: ChildrenCal = async (root, callback) => {
        let iconEl: HTMLElement | any = createEl('i'),
            contentEl: HTMLDivElement | any = createEl('div'),
            titleEl: HTMLSpanElement | any = createEl('span'),
            pEl: HTMLSpanElement | any = createEl('p'),
            closeEl: HTMLSpanElement | any = createEl('i'),
            basename = root.tagName.toLocaleLowerCase();
        this._setClassName(root)
        root.id = 'sp-notify__' + getIndex()
        iconEl.basename = basename + '-icon';
        contentEl.basename = basename + '-content';
        closeEl.basename = basename + '-close';
        iconEl.classList.add(iconEl.basename, 'sp-icon', 'sp-icon-' + root?.['attr-type'] || root?.attrs?.['type']);
        contentEl.classList.add(contentEl.basename);
        closeEl.classList.add(closeEl.basename, 'sp-icon', 'sp-icon-close');
        titleEl.innerText = root.attrs.title
        pEl.innerText = root.attrs?.message || ''
        root.iconEl = iconEl;
        root.titleEl = titleEl;
        root.pEl = pEl;
        root.attrs.showclose !== 'true' && (closeEl = '')
        await callback({ iconEl, contentEl, closeEl });
        contentEl.append(titleEl, pEl)
        root.append(iconEl, contentEl, closeEl)
    }

    public setup = function () {
        let allEls: NodeList | any = $el('sp-notify')
        let propsOffset = parseInt(this.attrs.offset) || 20
        let top: Number = [...allEls].reduce((total, el) => {
            if (el['attr-position'].indexOf(this['attr-position']) > -1) {
                el['attr-visible'] == 'true' && (total += el.offsetHeight + propsOffset)
            }
            return total
        }, propsOffset);
        this['attr-visible'] = 'true';
        setStyle(this, {
            [this['attr-position'].indexOf('bottom') > -1 ? 'bottom' : 'top']: top + 'px',
            zIndex: getIndex() + '',
        });

    }

    protected initView(root: El<any>) {
        let t: number = 0
        const init: <T = El<any>>(args: { [k: string]: T }) => void = ({ closeEl }) => {
            if (+root.attrs.duration > 0) {
                t = sto(() => {
                    root['attr-visible'] = false;
                }, +root.attrs.duration)
            }
            if (closeEl) {
                (closeEl as any).onclick = () => {
                    t > 0 && clearTimeout(t)
                    root['attr-visible'] = false
                }
            }
        }
        this.initChildrens(root, init)
    }
}

function Notify(params: notifyTypesProps) {
    let props: notifyTypesProps = { ...notifyProps, ...params };
    delete props.visible;
    let t = createEl('sp-notify');
    runIFELSE(new Set([
        [has(props, 'beforeClose'), () => {
            t.beforeClose = props.beforeClose;
            delete props.beforeClose;
        }],
        [has(params, 'style'), () => {
            setStyle(t, (params.style as any))
            delete props.style;
        }],
        [has(params, 'classname'), () => {
            t.classList.add(params.classname);
            delete params.classname;
        }]
    ]))
    for (let k in props) {
        let v = (props as any)[k]
        if (v == undefined) continue
        t[`attr-${k}`] = v + '';
    }
    document.body.appendChild(t);
    sto(t.setup);
    let p = new Promise(r => {
        t.beforeDistroy = () => r(t)
    })
    return Object.assign(p, t)
}

['info', 'success', 'error', 'warning'].forEach((type: notifyTypesProps['type']) => {
    (Notify as any)[type] = (options: notifyTypesProps | any, args: any) => {
        if (isObject(options)) {
            return Notify({ ...options, type })
        }
        return Notify({ type, message: options, ...args })
    }
});

Notify.closeAll = () => {
    let allEls: NodeList | any = $el('sp-notify');
    [...allEls].forEach((el: HTMLElement | any) => {
        el['attr-visible'] = false;
    });
}
export { Notify }
export default new NotifyBase()