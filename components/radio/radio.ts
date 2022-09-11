import { radioProps as Props, radioTypes as Types } from './type'
import { createEl, defineEl, getProps, listener } from '_utils/dom' // setStyle
import Base from '_utils/Base'
class Radio extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-radio',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                context.initView(this)
            },
            attributeChangedCallback(...args: any) {
                let [k, _o, v] = args;
                if (k == 'checked') {
                    this?.checked?.(v)
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

    initView(root: HTMLElement | any) {
        root.label = root.textContent.trim();
        let core = createEl('span'),
            radio = createEl('input'),
            inner = createEl('span');
        let attrs = root['attrs'];
        let defaultChecked = attrs['checked'];
        const checked = (checked: boolean = true) => {
            if (root._disabled + '' == 'true') {
                this.setClassName(root);
                return
            };
            root._checked = checked + '' == 'true' ? true : false;
            this.setClassName(root);
            root?.onChange?.(root._checked);
        }

        root.checked = checked;

        if (defaultChecked + '' == 'true') {
            root._checked = true;
            checked(true)
        }

        if (attrs['disabled'] + '' == 'true') {
            root._disabled = true;
        }        this.setClassName(root);

        listener(root, 'click', _ => checked(true))
        radio.setAttribute('type', 'radio');
        core.className = 'sp-radio-core';
        radio.className = 'sp-radio-core-input';
        inner.className = 'sp-radio-core-inner'
        core.append(radio, inner);
        root.insertBefore(core, root.firstChild);

    }
}


export default new Radio()