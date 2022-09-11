


import { Props } from './type'
import type { LayoutProps } from './type'
import { defineEl, getProps } from '_utils/dom' // setStyle
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
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0);
                context.initView(this);
                context.bindTargetFunc(this, ['reset', 'initView']);
            },
            attributeChangedCallback(...args: any) {
                if(!this.attrs) return;
                let [k, _o, v] = args;
                if (k == 'iscustom') {
                    this.attrs['iscustom'] = v === 'false' || v === false ? false : v === 'true' || v === true ? true : null;
                }
            }
        })
    }

    bindTargetFunc(target:HTMLElement & {[k:string]:any}, bindl: string[]) {
        bindl.map((k: string) => {
            target[k] = (...args: any[]) => (this as any)[k](target, ...args)
        })
    }


    /** reset */
    reset(target: HTMLElement) {
        target.innerHTML = '';
        this.initView(target);
    }

    /** init */
    initView(self: HTMLElement | any) {
        const controlCfg: LayoutProps = Object.create(self.attrs);
        
        const [UI, StyleElement] = initUi([controlCfg.column, controlCfg.row], controlCfg as any);
        controlCfg.checkCallback = (...args) => {
            self?.checkCallback?.(...args);
        };
        /** props */
        control(UI, controlCfg, UI.table);
        self.append(UI, StyleElement);
    }

}


export default new Layout()