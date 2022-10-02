import {InputTypes as Types } from './type'
import { sto, runIFELSE, ArrayRemove } from '../_utils/common'
import { createEl, listener, setStyle } from '../_utils/dom' // setStyle
import './style'
import Base from '../_utils/Base';
const get = Reflect.get;
const set = Reflect.set;

const svgup = `<svg viewBox="64 64 896 896" focusable="false" data-icon="up" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path></svg>`
const svgdown = `<svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>`
export interface InputFocusOptions extends FocusOptions {
    cursor?: 'start' | 'end' | 'all';
}

export function triggerFocus(
    element?: HTMLInputElement | HTMLTextAreaElement,
    option?: InputFocusOptions,
) {
    if (!element) return;

    element.focus(option);

    // Selection content
    const { cursor } = option || {};
    if (cursor) {
        const len = element.value.length;

        switch (cursor) {
            case 'start':
                element.setSelectionRange(0, 0);
                break;

            case 'end':
                element.setSelectionRange(len, len);
                break;

            default:
                element.setSelectionRange(0, len);
        }
    }
}

export default class InputCommon {

    input?: HTMLInputElement | any

    textarea?: HTMLTextAreaElement | any

    search?: HTMLTextAreaElement | any

    number?: HTMLTextAreaElement | any

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

    type: Types['type'];
    // [func in ['focus', 'blur', 'setSelectionRange', 'select']]: any

    constructor({ root, callback }: any) {
        this.supRoot = root;
        this.supRoot._allowClearEl = ''
        this.supRoot._addonBeforeEl = ''
        this.supRoot._addonAfterEl = ''
        this.supRoot._searchIconEl = '';
        this.supRoot.showCountEl = '';
        this.supRoot._suffixEl = '';
        this.supRoot._prefixEl = '';
        this.supRoot._numberEl = '';
        this.supRootAttrs = this.supRoot.attrs
        this.maxLength = this.supRootAttrs['max-length'] || ''
        this.type = this.supRoot.attrs['type'];
        this.callback = callback || (() => { })
        this.CommonClassname = ['sp-' + this.type + '-core', this.supRootAttrs['addon-before'] || this.supRootAttrs['addon-after'] ? '--shows' : ''];
        this.IptCommonClassname = [this.type + '-core']
        this.CommonClassname.remove = ArrayRemove;
        this.IptCommonClassname.remove = ArrayRemove;
        const self = this;
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

        this.init();
        this.mounted()
    }

    mounted() {
        ['focus', 'blur', 'setSelectionRange', 'select'].map((func: string) => {
            this.supRoot[func] = (this as any)[func].bind(this);
        })
    }

    init() {
        let allowClear = this.allowClear();
        let prefix = this.prefix();
        let suffix = this.suffix();
        let addonBefore = this.addonBefore(this.supRoot.attrs['addon-before'])
        let addonAfter = this.addonAfter(this.supRoot.attrs['addon-after'])
        let ipt = this._core();
        let number = this.numberView();
        let showCountEl = this.showCount();
        this.disabled(this.supRootAttrs['disabled'])
        this.bordered(this.supRootAttrs['bordered'])
        let type = this.type;
        this.callback({
            ipt, type, prefix, suffix, allowClear, addonBefore, addonAfter, showCountEl, number
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
        if (this.supRoot?.showCountEl) {
            this.supRoot.showCountEl.textContent = _count
        }
    }

    onFocus(_: Event) {
        this.supRoot.classList.add('focus')
    }

    onBlur(_: any) {
        this.supRoot.classList.remove('focus')

    }

    change(e:Event, value: string) {
        this.supValues.inputValues = value
        this.supRoot?.onChange?.(e, value)
    }

    focus(option?: InputFocusOptions) {
        sto(() => triggerFocus(this[this.type], option));
    };

    blur() {
        this[this.type].blur();
    }

    setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none') {
        this[this.type].setSelectionRange(start, end, direction);
    }

    select() {
        this[this.type].select();
    }

    numberView() {
        if (this.type == 'number') {
            let numberWrap = this.supRoot._numberEl = createEl('div'),
                up = createEl('span'),
                down = createEl('span');
            numberWrap.className = 'number-handle-wrap';
            up.className = 'number-handle-wrap-up';
            down.className = 'number-handle-wrap-down';
            up.innerHTML = svgup;
            down.innerHTML = svgdown;
            numberWrap.up = up
            numberWrap.down = down
            numberWrap.append(up, down);
        }
        return this.supRoot._numberEl;
    }

    onPressEnter(value: string) {
        this.supValues.inputValues = value
        this.supRoot?.onPressEnter?.(value)
    }
    _core() {
        let type = this.type;
        let placeholder = this.supRoot?.attrs?.['placeholder']
        runIFELSE(new Set([
            //type == 'input' || type == 'password' || type == 'search' || type == 'number'
            [type != 'textarea', () => {
                if (!this[type]) {
                    this[type] = createEl('input');
                    this[type].placeholder = placeholder || ''
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
            this.change(e, e.target.value)
        })

        listener(this[type], 'keydown', (e: any) => {
            if (e.keyCode == "13") {
                this.onPressEnter(e.target.value);
                this.supRoot?.onSearch?.(e, e.target.value)
            }
        })

        listener(this[type], 'focus', (e: any) => {
            if(this.CommonClassname.includes('--disabled')) {
                e.stopPropagation();
                e.preventDefault();
                this.blur()
                return
            }
            if (this.supRoot._addonBeforeEl || this.supRoot._addonAfterEl) {
                return
            }
           
            this.onFocus(e)
        }, true)

        listener(this[type], 'blur', (e: any) => {
            this.onBlur(e)
        })
        return this[type]

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
            tmpb.className = 'sp-'+ this.type+'-before';
            tmpb.innerHTML = any;
            this.supRoot._addonBeforeEl = tmpb;
        }
        return this.supRoot._addonBeforeEl
    }
    addonAfter(any: Types['addon-after']) {
        if (!this.supRoot._addonAfterEl && any) {
            let tmpb = createEl('span');
            tmpb.className = 'sp-'+ this.type+'-after';
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