import { loadingTypesProp, loadingProps } from './type'
import { runIFELSE, sto } from '../_utils/common'
import { defineEl, createEl, setStyle, getProps, $el } from '../_utils/dom'
import './style'

const keys: string[] = Object.keys(loadingProps);
type El<T> = (T extends (infer U)[] ? U : T) | (any | any[]);
// type B<A> = (A extends infer U ? U : A[])| (any | any[]);
type ChildrenCal = (root: HTMLElement | any, func: (...args: (NodeList | HTMLElement)[]) => void) => void

class Loading {
    context: this
    constructor() {
        const context = this;
        defineEl({
            tag: 'sp-loading',
            observedAttributes: keys,
            connectedCallback() {
                (this.attrs as Partial<loadingTypesProp>) = getProps(this);
                this.attrs = { ...loadingProps, ...this.attrs };
                context.initView(this)
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                context.set({
                    attrs: { [key]: newval },
                    target: this,
                    iconEl: this.iconEl,
                    contentEl: this.contentEl,
                })
            }
        })
    }

    private _setClassName(root: HTMLElement & { [attrK: string]: string } | any) {
        // 第一次执行的时候使用的应该是 默认的 如果不传值的情况下 --- root.attrs.classname
        // 反之 之后每次修改用到的都是 root['attr-classname'] 这样子的
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname']
        ]
        root.className = classList.join(' ');
    }

    protected initChildrens: ChildrenCal = async (root, callback) => {
        let iconEl: HTMLElement | any = createEl('i'),
            contentEl: HTMLSpanElement | any = createEl('span'),
            basename = root.tagName.toLocaleLowerCase();
        iconEl.basename = basename + '-icon';
        contentEl.basename = basename + '-content';
        iconEl.classList.add(iconEl.basename, 'sp-icon', 'sp-icon-loading');
        contentEl.classList.add(contentEl.basename);
        root.iconEl = iconEl;
        root.contentEl = contentEl;
        this._setClassName(root)
        await callback(iconEl, contentEl);
        root.append(iconEl, contentEl)
    }

    protected initView(root: HTMLElement | any) {

        const init: <T = El<HTMLElement>>(iconEl: T, contentEl: T) => void = (iconEl, contentEl) => {
            let parent = root?.parentElement?.style
            if (root.parentElement && parent.position == '' || parent.position == 'static') {
                root.parentElement.style.position = 'relative'
            }
            this.set({
                attrs: root.attrs,
                target: root,
                iconEl,
                contentEl,
            })
        }
        this.initChildrens(root, init)
    }

    private set({ attrs, target, iconEl, contentEl }: any) {

        runIFELSE(new Set([
            [attrs?.['icon'] && iconEl, () => {
                iconEl.className = iconEl.basename + ' sp-icon ' + attrs?.['icon']
            }],
            [attrs?.['classname'], () => this._setClassName(target)],
            [attrs?.['background'], () => {
                setStyle(target, {
                    backgroundColor: attrs?.['background']
                })
            }],
            [attrs?.['fullscreen'], () => {
                if (target?.['target']) return
                let nesetparent = target.parentElement
                let istrue = attrs?.['fullscreen'] == 'true' && 'true';
                let isfalse = attrs?.['fullscreen'] == 'false' && 'false';
                if (istrue || (target.isfullscreen && isfalse)) {
                    target?.remove()
                    iconEl?.remove()
                    contentEl?.remove()
                }
                if (target.isfullscreen && isfalse) {
                    target.isfullscreen = false;
                    target.parentEl.append(target)
                    return
                }
                if (istrue) {
                    target['attr-fullscreen'] = ''
                    target.isfullscreen = true;
                    target.parentEl = nesetparent
                    document.body.appendChild(target);
                }

            }],
            [attrs?.['text'] && contentEl, () => {
                contentEl.textContent = attrs?.['text']
            }],
            [attrs?.['target'], () => {
                let el = $el(attrs?.['target']);
                target['attr-target'] = '';
                target._target = attrs?.['target']
                el = el.length && el.length > 0 ? el[0] : el;
                if (!el) throw Error('target nothingness');
                target.remove();
                iconEl.remove()
                contentEl.remove()
                el.appendChild(target);

            }],
            [attrs?.['status'], () => {
                if (attrs?.['status'] == 'true') {
                    target.classList.remove('sp-loading-fade-leave')
                    setStyle(target, { display: 'flex', opacity: '0' })
                    sto(() => target.classList.add('sp-loading-fade-enter'))
                    return;
                }
                if (attrs?.['status'] == 'false') {
                    target.classList.remove('sp-loading-fade-enter')
                    target.classList.add('sp-loading-fade-leave')
                    sto(() => setStyle(target, { display: 'none' }), 190)
                }
            }],
        ]))

    }

    static config(params: loadingTypesProp) {
        const target = createEl('sp-loading');
        for(let k in params) {
            target['attr-' + k] = (params as any)[k]
        }
        return {
            close() {
                target['attr-status'] = 'false'
            }
        }
    }
}

export { Loading }
export default new Loading()