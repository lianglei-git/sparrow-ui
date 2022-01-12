import { checkboxGroupProps as Props, checkboxGroupTypes as Types } from './type'
import { defineEl, getProps } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
import { sto, ArrayRemove } from 'sparrow-ui/_utils/common'
class CheckBoxGroup extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-checkbox-group',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0)
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

    adapterDefaults(_default: string | any[] | number | any): any[] {
        return _default.pop ?
            _default :
            _default.indexOf('[') > -1 ?
                JSON.parse(_default)
                :
                _default.indexOf(',') == -1 ?
                    [_default]
                    : _default.split(',');
    }

    reset(root: any, clear = true) {
        if (clear && root.checkedArr) return
        root.checkedArr = [];
        root.checkedArr.remove = ArrayRemove;
    }

    onValue(root: any, value: string, init = true) {
        let formt = this.adapterDefaults(value);
        [...root.children].map((el: HTMLElement & { label: string, _checked?: any, checked: (is?: boolean, isSup?: boolean) => any, onChange?: any }, index: number) => {
            if (init) {
                let onChange = el?.onChange
                el.onChange = (value: boolean) => {
                    if (!root.sup) {
                        onChange?.(value);
                        root?.checkedArr?.[value + '' == 'true' ? 'push' : 'remove'](el?.label)
                        root?.onChange?.([...new Set(root.checkedArr)]);
                    }
                }

            }

            if (formt.length > 0) {
                formt.map((item: string) => {
                    if (item == el?.label) {
                        el._checked = true
                        el?.checked?.(true);
                        root?.checkedArr?.push(el?.label)
                    }
                })
            }

            if (!init && formt.length == 0) {
                el._checked = false
                root?.checkedArr?.remove(el?.label)
                el?.checked?.(false, true);
            }

        });
        root?.onChange?.([...new Set(root.checkedArr)]);
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
        this.reset(root);
        let attrs: Types = root['attrs'];
        let { value, disabled } = attrs;
        this.onValue(root, value);
        this.onDisabled(root, disabled);
    }
}


export default new CheckBoxGroup()