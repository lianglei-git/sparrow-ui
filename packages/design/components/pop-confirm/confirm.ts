
import { createEl, defineEl, getProps, listener, setStyle } from '../_utils/dom'
import ToolTipCommon from '../tooltip/Common';
import { popconfirmTypesProps, popconfirmProps } from './type'
import { runIFELSE, isObject, sto } from '../_utils/common'

interface classI {
    fixedView(type: 'tooltip' | 'popover' | 'confirm', attrs: popconfirmTypesProps): any
    confirmView(): HTMLElement;
    initVisible: boolean // 判断是否存在传入的Visible属性， 传入就要外部手动执行关闭， 内部不会执行关闭
}

class PopConfirmEds extends ToolTipCommon implements classI {
    initVisible;
    constructor(target: HTMLElement & popconfirmTypesProps) {
        super(target);
        this.initVisible = (target as any).attrs.visible == undefined ? false : true;
    }
    confirmView() {
        let container = createEl('div');
        return container;
    }
    fixedView() {
        let attrs: popconfirmTypesProps = this.contextTarget.attrs;
        // 内部button的参数配置；
        let cancelButtonProps = this.contextTarget?.cancelButtonProps
        let okButtonProps = this.contextTarget?.okButtonProps
        const handler = (type: 'ok' | 'cancel', e: any) => {
            let onCancel = this.contextTarget?.onCancel || (() => { });
            let onConfirm = this.contextTarget?.onConfirm || (() => { });
            if (this.initVisible) {
                type == 'ok' ? onConfirm(e) : onCancel(e);
                return;
            }
            let promise = type == 'ok' ? onConfirm(e) : onCancel(e);
            if (promise?.then) {
                promise.then(() => this._leave());
                return
            }
            this._leave()
        }
        const view = ({ title, content }: any) => {
            let icon = createEl('em'),
                cancelBut = createEl('sp-button'),
                okBut = createEl('sp-button');
            cancelBut['attr-size'] = 'mini';
            okBut['attr-size'] = 'mini';
            okBut['attr-type'] = attrs['ok-type'] || 'primary';
            cancelBut.innerText = attrs['cancel-text'];
            okBut.innerText = attrs['ok-text'];
            cancelBut['attr-type'] = 'link'
            icon.className = 'sp-icon ' + attrs.icon;
            !attrs['hide-icon'] && title.insertBefore(icon, title.firstChild);
            content.innerHTML = '';
            listener(cancelBut, 'click', e => handler('cancel', e))
            listener(okBut, 'click', e => handler('ok', e));
            if (cancelButtonProps) {
                if (!isObject(cancelButtonProps)) throw Error('Please pass in the "Object!"');
                for (let key in cancelButtonProps) {
                    cancelBut['attr-' + key] = cancelButtonProps[key];
                }
            }
            if (okButtonProps) {
                if (!isObject(okButtonProps)) throw Error('Please pass in the "Object!"');
                for (let key in okButtonProps) {
                    okBut['attr-' + key] = okButtonProps[key];
                }
            }
            content.append(cancelBut, okBut);
        }
        super.fixedView('confirm', attrs, view);
    }

}

const PopConfirm = function () {
    defineEl({
        tag: 'sp-popconfirm',
        observedAttributes: Object.keys(popconfirmProps),
        connectedCallback() {
            (this.attrs as Partial<popconfirmTypesProps>) = getProps(this);
            this.attrs = { ...popconfirmProps, ...this.attrs };
            this.setAttribute('hidefocus', true)
            this.setAttribute('tabindex', 0)
            setStyle(this, {
                outline: '0'
            })
            sto(() => this.super = new PopConfirmEds(this))
        },
        attributeChangedCallback(..._args) {
            let [key, _, newval] = _args;
            let root: ToolTipCommon = (this as any).super;
            root && runIFELSE(new Set([
                [key == 'visible', () => {
                    root.visible(newval + '' as any);
                }],
                [key == 'placement', () => {
                    root.fixedEl.className =
                        root.getRootClassName(root.contextTarget, ['__' + newval ?? '__top', (this as any).APAC ? 'APAC' : ''])
                }]
            ]))
        },
        disconnectedCallback() {
            this.super.destory();
        }
    });
}
export default new (PopConfirm as FunctionConstructor)()