import { checkboxProps as Props, checkboxTypes as Types } from './type'
import { createEl, defineEl, getProps, listener } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
class CheckBox extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-checkbox',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0)
                context.initView(this)
            },
            attributeChangedCallback(...args: any) {
                let [k, _o, v] = args;
                if (k == 'checked') {
                    this?.checked?.(v)
                }

                if (k == 'indeterminate') {
                    this._indeterminate = v;
                    context.setClassName(this);
                }

                if (k == 'disabled') {
                    this._disabled = v;
                    context.setClassName(this);
                }
            }
        })
    }


    setClassName(root: any): void {
        this._setClassName(root, [
            root._indeterminate + '' == 'true' ? '--indeterminate' : '',
            root._checked + '' == 'true' ? '--checked' : '',
            root._disabled + '' == 'true' ? '--disabled' : ''
        ])
    }


    indeterminate(root: any) {
        if (root._indeterminate + '' == 'true') {
            root._checked = false;
            root._indeterminate = false;
        }


    }
    initView(root: HTMLElement | any) {
        root.label = root.textContent.trim();
        let core = createEl('span'),
            checkbox = createEl('input'),
            inner = createEl('span');
        let attrs = root['attrs'];
        let defaultChecked = attrs['checked'];
        this.setClassName(root);

        const checked = (checked: boolean = true, isSup:boolean = false, inser: boolean = false) => {
            if(root._disabled+'' == 'true') {
                this.setClassName(root);
                return
            };
            if(inser) {
                root._checked = root._checked ? false : true;
            } else {
                root._checked = checked + '' == 'true' ? true : false;
            }
            this.indeterminate(root);
            this.setClassName(root);

            !isSup && root?.onChange?.(root._checked);
        }
        root.checked = checked;
        if (defaultChecked + '' == 'true') {
            root._checked = true;
            checked(true)
        }

        if (attrs['indeterminate'] + '' == 'true') {
            root._indeterminate = true;
        }

        if (attrs['disabled'] + '' == 'true') {
            root._disabled = true;
        }



        listener(root, 'click', _ => checked(true, false, true))
        checkbox.setAttribute('type', 'checkbox');
        core.className = 'sp-checkbox-core';
        checkbox.className = 'sp-checkbox-core-input';
        inner.className = 'sp-checkbox-core-inner'
        core.append(checkbox, inner);
        root.insertBefore(core, root.firstChild);
    }
}


export default new CheckBox()