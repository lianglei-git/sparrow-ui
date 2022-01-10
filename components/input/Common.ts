import { InputProps as Props, InputTypes as Types } from './type'
import { sto, runIFELSE } from '../_utils/common'
import { createEl, defineEl, getProps, listener, setStyle } from '../_utils/dom' // setStyle
import './style'
import Base from '../_utils/Base';
import Spui from '..';
const get = Reflect.get;
const set = Reflect.set;

function ArrayRemove(any: any) {
    if (Array.isArray(any)) {
        any.map(i => {
            this.map((i2: any, idx: number) => {
                if (i == i2) this.splice(idx, 1)
            })
        });
        return;
    }
    this.map((i: any, idx: number) => i == any && this.splice(idx, 1))
}


export default class InputCommon {

    input?: HTMLInputElement | any

    textarea?: HTMLTextAreaElement | any

    search?: HTMLTextAreaElement | any

    password?: HTMLTextAreaElement | any

    CommonClassname: any[] | any = [];

    IptCommonClassname: any = []

    supRootAttrs: Partial<Types>

    supRoot: HTMLElement | any

    maxLength: string | number

    callback = (_arg: any) => { }

    supValues: {
        inputValues?: string | number
    } | any

    type: Types['type']

    constructor({ root, callback }: any) {
        this.supRoot = root;
        this.supRoot._allowClearEl = ''
        this.supRoot._addonBeforeEl = ''
        this.supRoot._addonAfterEl = ''
        this.supRoot._searchIconEl = '';
        this.supRoot.showCountEl = '';
        this.supRoot._suffixEl = '';
        this.supRoot._prefixEl = '';
        this.supRootAttrs = this.supRoot.attrs
        this.maxLength = this.supRootAttrs['max-length'] || ''
        this.type = this.supRoot.attrs['type'];
        this.callback = callback || (() => { })
        this.CommonClassname = ['sp-' + this.type + '-core', this.supRootAttrs['addon-before'] || this.supRootAttrs['addon-after'] ? '--shows' : ''];
        this.IptCommonClassname = [this.type + '-core']
        this.CommonClassname.remove = ArrayRemove;
        this.IptCommonClassname.remove = ArrayRemove;
        const self = this
        this.supValues = new Proxy({ inputValues: '' }, {
            get(target, p) {
                return get(target, p)
            },
            set(target, p, value) {
                // mac-length
                self.valueObevse(target, p, value)
                return get(target, p) || value + '' || true
            }
        })

        this.init()
    }
    init() {
        let allowClear = this.allowClear();
        let prefix = this.prefix();
        let suffix = this.suffix();
        let addonBefore = this.addonBefore(this.supRoot.attrs['addon-before'])
        let addonAfter = this.addonAfter(this.supRoot.attrs['addon-after'])
        let ipt = this._core();
        let showCountEl = this.showCount()
        this.disabled(this.supRootAttrs['disabled'])
        this.bordered(this.supRootAttrs['bordered'])
        let type = this.type;
        this.callback({
            ipt, type, prefix, suffix, allowClear, addonBefore, addonAfter, showCountEl
        })
    }

    isHtml(text: string) {
        return text.indexOf('<') > -1 && text.indexOf('</') > -1
    }

    valueObevse(...args: any[]) {
        let [target, p, value] = args;
        if (this.supRootAttrs['allow-clear'] + '' == 'true') {
            setStyle(this.supRoot._allowClearEl, { opacity: value.length > 0 ? '1' : '0' })
        }

        if (this.supRootAttrs['show-count'] + '' == 'true') {
            this.changeCountOfSupRoot(value.length)
        }
        if (this.maxLength && this.maxLength <= value.length) {
            return true
        }
        set(target, p, value)
        // console.log(target, p, value)
    }

    prefix() {
        let prefix = this.supRoot?.attrs?.['prefix'];
        if (prefix) {
            let El = this.supRoot._prefixEl = createEl('span'), baseName = 'icon-prefix';
            if (this.isHtml(prefix)) {
                El.innerHTML = prefix;
                El.className = baseName;
                return this.supRoot._prefixEl;
            }
            El.className = baseName + ' sp-icon ' + prefix;
            return this.supRoot._prefixEl;
        }
        return this.supRoot._prefixEl;
    }

    suffix() {
        let suffix = this.supRoot?.attrs?.['suffix'];
        if (suffix) {
            let El = this.supRoot._suffixEl = createEl('span'), baseName = 'icon-suffix';
            if (this.isHtml(suffix)) {
                El.innerHTML = suffix;
                El.className = baseName;
                return this.supRoot._suffixEl;
            }
            El.className = baseName + ' sp-icon ' + suffix;
            return this.supRoot._suffixEl;
        }
        return this.supRoot._suffixEl;
    }

    allowClear() {
        let allowClear = this.supRoot?.attrs?.['allow-clear'] + '' == 'true' ? true : false
        if (allowClear) {
            let clearIcon = this.supRoot._allowClearEl = createEl('em');
            clearIcon.className = 'allow-clear sp-icon sp-icon-error';
            listener(this.supRoot._allowClearEl, 'click', _ => {
                this.supValues.inputValues = this[this.type].value = '';
            })
            return this.supRoot._allowClearEl;
        }
        return this.supRoot._allowClearEl;
    }

    disabled(is: string | boolean | undefined) {
        let $is = is + '' == 'true' ? 1 : 0;
        if ($is && this.CommonClassname.includes('--disabled')) return;
        this.CommonClassname[$is ? 'push' : 'remove']('--disabled');
        Base.setClassName(this.supRoot, this.CommonClassname);
    }

    bordered(is: string | boolean | undefined) {
        let $is = is + '' == 'true' ? 1 : 0;
        if ($is && this.CommonClassname.includes('--bordered')) return;
        this.CommonClassname[$is ? 'push' : 'remove']('--bordered');
        Base.setClassName(this.supRoot, this.CommonClassname);

    }

    showCount() {
        let is = this.supRootAttrs['show-count'] + '' == 'true' ? 1 : 0
        if (is) {
            let el = this.supRoot.showCountEl = createEl('span');
            el.className = 'showCount';
            this.IptCommonClassname[is ? 'push' : 'remove']('showCount')
            Base.setClassName(this[this.type], this.IptCommonClassname);
            this.changeCountOfSupRoot()
        }
        return this.supRoot.showCountEl;
    }

    changeCountOfSupRoot(count: string | number = this.supValues.inputValues.length) {
        let _count = this.maxLength ? `${count} / ${this.maxLength}` : count
        if (this.type == 'textarea') {
            this.supRoot.setAttribute('count', _count);
            return
        }
        if(this.supRoot?.showCountEl) {
            this.supRoot.showCountEl.textContent = _count
        }
    }

    onFocus(e: Event) {

        this.supRoot.classList.add('focus')
    }

    onBlur(e: any) {
        // this.supRoot.blur()
        this.supRoot.classList.remove('focus')

    }

    change(value: string) {
        this.supValues.inputValues = value
        this.supRoot?.onChange?.(value)
    }

    onPressEnter(value: string) {
        this.supValues.inputValues = value
        this.supRoot?.onPressEnter?.(value)
    }
    _core() {
        let type = this.type;
        let placeholder = this.supRoot?.attrs?.['placeholder']
        runIFELSE(new Set([
            [type == 'input' || type == 'password' || type == 'search', () => {
                if (!this[type]) {
                    this[type] = createEl('input');

                    this[type].placeholder = placeholder || ''
                    // console.log(this.supRoot, this.CommonClassname)

                    Base.setClassName(this[type], this.IptCommonClassname);

                }
            }],
            [type == 'textarea', () => {
                if (!this.textarea) {
                    this.textarea = createEl('textarea');
                    this.textarea.placeholder = placeholder || ''
                    Base.setClassName(this.textarea, this.IptCommonClassname);
                }
            }],
        ]))

        this[type].value = this.supValues.inputValues = this.supRootAttrs['value'] || ''


        if (this.maxLength) {
            this[type].setAttribute('maxlength', this.maxLength)
        }

        listener(this[type], 'input', (e: any) => {
            this.change(e.target.value)
        })

        listener(this[type], 'keydown', (e: any) => {
            if (e.keyCode == "13") {
                this.onPressEnter(e.target.value)
            }
        })

        listener(this[type], 'focus', (e: any) => {
            if (this.supRoot._addonBeforeEl || this.supRoot._addonAfterEl) {
                return
            }
            e.stopPropagation();
            e.preventDefault()
            this.onFocus(e)
        })

        listener(this[type], 'blur', (e: any) => {
            this.onBlur(e)
        })
        return this.textarea || this.input || this.search || this.password

    }

    get currentTarget() {
        return this[this.type]
    }

    size(size: Types['size']) { // 手触发
        if (!this.input) this._core();
        this.supRoot['size'] = size;
    }
    // html好像不能🦐使用“innerHTML”
    addonBefore(any: Types['addon-before']) {
        // 暂时支持字符串格式吧...
        if (!this.supRoot._addonBeforeEl && any) {
            let tmpb = createEl('span');
            tmpb.className = 'sp-input-before';
            tmpb.innerHTML = any;
            this.supRoot._addonBeforeEl = tmpb;
        }
        return this.supRoot._addonBeforeEl
    }
    addonAfter(any: Types['addon-after']) {
        if (!this.supRoot._addonAfterEl && any) {
            let tmpb = createEl('span');
            tmpb.className = 'sp-input-after';
            tmpb.innerHTML = any;
            this.supRoot._addonAfterEl = tmpb;
        }
        return this.supRoot._addonAfterEl
    }

    _searchButton() {
        let icon = createEl('em'), button = createEl('sp-button');
        icon.className = 'sp-icon sp-icon-search';
        button.setAttribute('classname', 'sp-input-search')
        button.iconEl = icon;
        button.append(icon)
        this.supRoot._searchIconEl = button;
        listener(button, 'click', _ => {
            this.supRoot?.onSearch?.(_, this.supValues.inputValues)
        })
        return this.supRoot._searchIconEl
    }


    destory() {
        this.input = null;
    }

}