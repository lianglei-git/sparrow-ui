
import { runIFELSE, sto } from '../_utils/common'
import { getIndex, setIndex } from '../common/index'
import typeProps from './type'
import { defineEl, createEl, setStyle, getProps, $el } from '../_utils/dom'
import './style'

type Props = Partial<ReturnType<typeof typeProps>>
class MessageBase {
    constructor() {
        let self = this
        defineEl({
            tag: 'sp-message',
            observedAttributes: Object.keys(typeProps()),
            connectedCallback() {
                (this.attrs as Props) = getProps(this);
                this.attrs = { ...typeProps(), ...this.attrs }
                sto(() => {
                    self.initView.call(this)
                })
            },
            attributeChangedCallback(...args) {
                let [key, _, newval] = args;
                let elAlls:any = $el('sp-message')
                runIFELSE.call(this, new Set([
                    [key == 'visible', () => {
                        let offsetTop = this.offsetTop
                        newval && setIndex();
                        if(newval == 'false') {
                            setStyle(this, {
                                opacity: '0',
                                transform: 'translate(-50%, -100%)'
                            });
                            [...elAlls].forEach((element:any) => {
                                setStyle(element, {
                                    top: element.offsetTop - offsetTop + 'px' 
                                })
                            });

                            sto(() => {
                                this.remove()
                            }, 390)
                        }
                         else {
                            setStyle(this, {
                                transform: 'translate(-50%, 100%)'
                            })
                        }

                    }],
                ]))
            }
        })
    }

    protected initView = function () {
        this.className = 'sp-message sp-message-' + this.attrs.type
        let iconEl: HTMLElement = createEl('span'),
            contentEl: HTMLElement = createEl('div'),
            closeEl: HTMLElement = createEl('span'),
            allEls: NodeList | any = $el('sp-message'),
        top: Number = allEls.length > 1 ? allEls[allEls.length - 2].offsetTop + allEls[allEls.length - 2].offsetHeight + 10 : (+this.attrs.offset)

        contentEl.innerHTML = this.attrs.message
        iconEl.className = 'sp-icon sp-icon-success'
        closeEl.className = 'sp-icon sp-icon-close'
        contentEl.className = 'sp-message-content'
        this.appendChild(iconEl);
        this.appendChild(contentEl);
        this.attrs.showclose == 'true' && this.appendChild(closeEl);

        sto(() => {
            this['attr-visible'] = false
            setStyle(this, {
                opacity: '0',
                transform: 'translate(-50%, -100%)'
            })
            sto(() => {
                this.remove()
            }, 390)
        }, +this.attrs.duration)
        closeEl.onclick = () => {
            this['attr-visible'] = false
        }

        setStyle(this, {
            top: top + 'px',
            zIndex: getIndex() + '',
        })
        console.log(window.getComputedStyle(allEls[allEls.length - 1]).top, allEls[allEls.length - 1].offsetTop)

        setStyle(contentEl, {
            justifyContent: this.attrs.center == 'true' ? 'center' : ''
        })

    }
    static info() {

    }
    static success(msg: string) {
        let t = createEl('sp-message')
        t['attr-visible'] = 'true';
        t['attr-message'] = msg;

        document.body.appendChild(t)
    }
    static error() {

    }
}

function Message(params: any) {

}
Message.info = MessageBase.info;
Message.success = MessageBase.success;
Message.error = MessageBase.error;


export { Message }
export default new MessageBase()