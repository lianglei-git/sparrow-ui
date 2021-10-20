
import { runIFELSE, sto, isObject } from '../_utils/common'
import { getIndex, setIndex } from '../common/index'
import typeProps from './type'
import { defineEl, createEl, setStyle, getProps, $el } from '../_utils/dom'
import './style'

type Props = Partial<ReturnType<typeof typeProps>>
class MessageBase {
    verticalOffset: Number
    constructor() {
        let self = this;
        defineEl({
            tag: 'sp-message',
            observedAttributes: Object.keys(typeProps()),
            connectedCallback() {
                (this.attrs as Props) = getProps(this);
                this.attrs = { ...typeProps(), ...this.attrs }
                sto(() => {
                    self.initView.call(this)
                })
                this.setup = self.setup.bind(this)
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                let elAlls: Array<any> = Array.from($el('sp-message'));
            
                runIFELSE.call(this, new Set([
                    [key == 'visible', () => {
                        let offsetHeight = this.offsetHeight
                        newval && setIndex();
                        if (newval == 'false') {
                            console.log(this.id)
                            let _index = elAlls.findIndex(i => i.id == this.id);
                            this.beforeClose && this.beforeClose();
                            elAlls.forEach((element: any, i:number) => {
                                if(i >= _index) {
                                    setStyle(element, {
                                        top: parseInt(element.style.top, 10) - offsetHeight - 20 + 'px'
                                    })
                                }
                            });
                            setStyle(this, {
                                opacity: '0',
                                transform: 'translate(-50%, -100%)'
                            });
                            this.remove();
                        } else {
                            setStyle(this, {
                                transform: 'translate(-50%, 0%)'
                            })
                        }
                    }],
                ]))
            }
        })
    }

    public setup = function () {
        let allEls: NodeList | any = $el('sp-message')
        let propsOffset = +this.attrs.offset || 20
        let top: Number = [...allEls].reduce((total, el) => {
            total += el.offsetHeight + 20
            return total
        }, propsOffset);
        this['attr-visible'] = 'true';
        setStyle(this, {
            top: top + 'px',
            zIndex: getIndex() + '',
        });
    }

    protected initView = function () {
        this.className = 'sp-message sp-message-' + this.attrs.type
        this.id= 'sp-message__'+ getIndex()
        let iconEl: HTMLElement = createEl('span'),
            contentEl: HTMLElement = createEl('div'),
            closeEl: HTMLElement = createEl('span'),
            t:any = null;

        contentEl.innerHTML = this.attrs.message
        iconEl.className = 'sp-icon sp-icon-' + this.attrs.type
        closeEl.className = 'sp-icon sp-icon-close'
        contentEl.className = 'sp-message-content'
        this.appendChild(iconEl);
        this.appendChild(contentEl);
        this.attrs.showclose == 'true' && this.appendChild(closeEl);
        if(+this.attrs.duration > 0) {
         t = sto(() => {
                this['attr-visible'] = false;
            }, +this.attrs.duration)
        }
        closeEl.onclick = () => {
            t > 0 && clearTimeout(t)
            this['attr-visible'] = false
        }
        setStyle(contentEl, {
            justifyContent: this.attrs.center == 'true' ? 'center' : ''
        })

        this.close = () => {
            this['attr-visible'] = false;
        }
    }
}

function Message(params: Props = typeProps()) {
    let props: Props = { ...typeProps(), ...params };
    delete props.visible;
    let t = createEl('sp-message');
    if(Reflect.has(props, 'beforeClose')) {
        t.beforeClose = props.beforeClose;
        delete props.beforeClose;
    }
    
    
    for (let k in props) {
        t[`attr-${k}`] = (props as any)[k] + '';
    }
    document.body.appendChild(t);
    t.setup();
    return t;
}
['info', 'success', 'error'].forEach((type: string) => {
    (Message as any)[type] = (options: Props | any) => {
        if (isObject(options)) {
            return Message({ ...options, type })
        }
        return Message({ type, message: options })
    }
});

Message.closeAll = () => {
    let allEls: NodeList | any = $el('sp-message');
    [...allEls].forEach((el: HTMLElement | any) => {
        el['attr-visible'] = false;
    });
}

export { Message }
export default new MessageBase()