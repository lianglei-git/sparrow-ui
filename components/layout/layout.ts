


import { Props } from './type'
import type { LayoutProps } from './type'
import { defineEl, getProps } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
import { initUi, control } from './lib'
class Layout extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-layout',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<LayoutProps>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                console.log(this.attrs)
                const that = this;
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0);
                context.initView<ThisType<{ attrs: any }>>(this);
                context.bindTargetFunc(this, ['reset', 'initView']);
            },
            attributeChangedCallback(...args: any) {
                let [k, _o, v] = args;
                if (k == 'iscustom') {
                    this.attrs['iscustom'] = v === 'false' || v === false ? false : v === 'true' || v === true ? true : null;
                }
            }
        })
    }

    bindTargetFunc(target, bindl) {
        bindl.map(k => {
            target[k] = (...args) => this[k](target, ...args)
        })
    }


    /** reset */
    reset(target: HTMLElement) {
        target.innerHTML = '';
        this.initView(target);
    }

    /** init */
    initView<T>(self) {
        const controlCfg: LayoutProps = Object.create(self.attrs);
        const UI = initUi([controlCfg.column, controlCfg.row], controlCfg);
        controlCfg.checkCallback = (...args) => {
            self?.checkCallback?.(...args);
        };
        /** props */
        control(UI, controlCfg, UI.table);
        self.append(UI);
    }

}


export default new Layout()