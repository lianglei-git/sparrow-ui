import { runIFELSE, sto, isObject, has } from '../_utils/common'
import { getIndex, setIndex } from '../common/index'
import { notifyTypesProps, notifyProps } from './type'
import { defineEl, createEl, setStyle, getProps, $el } from '../_utils/dom'
import './style'

const keys: string[] = Object.keys(notifyProps);
type El<T> = (T extends (infer U)[] ? U : T) | (any | any[]);
type ChildrenCal = (root: HTMLElement | any, func: (...args: (NodeList | HTMLElement)[]) => void) => void

class Notify {
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
                // this.setup = context.setup.bind(this)
            }
        })
    }
    private _setClassName(root: HTMLElement & { [attrK: string]: string } | any) {
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
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
        iconEl.basename = basename + '-icon';
        contentEl.basename = basename + '-content';
        closeEl.basename = basename + '-close';
        iconEl.classList.add(iconEl.basename, 'sp-icon', 'sp-icon-' + root?.['attr-type'] || root?.attrs?.['type']);
        contentEl.classList.add(contentEl.basename);
        root.iconEl = iconEl;
        this._setClassName(root)
        await callback(iconEl, contentEl);
        contentEl.append(titleEl, pEl)
        root.append(iconEl, contentEl, closeEl)
    }
    protected initView(root: El<any>) {
        const init: <T = El<HTMLElement>>(iconEl: T, contentEl: T) => void = (iconEl, contentEl) => {
            this.set({
                attrs: root.attrs,
                target: root,
                iconEl,
                contentEl,
            })
        }
        this.initChildrens(root, init)
    }

    protected set({ attrs, target, iconEl, contentEl}:any) {

    }
}

export { Notify }
export default new Notify()