import { radioGroupProps as Props, radioGroupTypes as Types } from './type'
import { createEl, defineEl, getProps, listener, setStyle } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
import { sto } from 'sparrow-ui/_utils/common'
class RadioGroup extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-radio-group',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                sto(() => context.initView(this))

            },
            attributeChangedCallback(...args: any) {
                let [k, _o, v] = args;
                if (k == 'value') {
                    this.sup = true
                    context?.onValue?.(this, v, false)
                }
                if (k == 'disabled') {
                    context?.onDisabled?.(this, v)
                }
            }
        })
    }

    onValue(root: any, value: any, init = true) {
       
        [...root.children].map((el: HTMLElement & { label: string, _checked?: any, checked: (is?: boolean, isSup?: boolean) => any, onChange?: any }, index: number) => {
            if (init) {
                let onChange = el?.onChange;
                listener(el, 'click', _ => {
                    if(root.lastRadio && root.lastRadio!= el) {
                        root.lastRadio.checked(false);
                        root.lastRadio = el
                    }else {
                        root.lastRadio = el
                    }
                })
                el.onChange = (value: boolean) => {
                    if (!root.sup) { 
                    onChange?.(el?.label);
                    value +'' == 'true' && root?.onChange?.(el?.label);
                    }
                }
            }
            if(value == el?.label) {
                el._checked = true
                el.checked();
                root.lastRadio = el; 
            }
        });
        root.sup = false
    }

    onDisabled(root: any, disabled: boolean | string | undefined) {
        let formt = disabled + '' == 'true' ? true : false;
        [...root.children].map((el: any) => {
            el._disabled = formt ? true : false;
            el.classList[formt ? 'add' : 'remove']('--disabled');
        })
        return
    }

    initView(root: HTMLElement | any) {
        root.sup = true
        let attrs: Types = root['attrs'];
        let { value, disabled } = attrs;
        this.onValue(root, value);
        this.onDisabled(root, disabled);
        this._setClassName(root)
    }
}


export default new RadioGroup()