
import { runIFELSE, sto } from '../_utils/common'
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
                let elAlls: any = $el('sp-message')
                runIFELSE.call(this, new Set([
                    [key == 'visible', () => {
                        let offsetHeight = this.offsetHeight
                        newval && setIndex();
                        if (newval == 'false') {
                            [...elAlls].forEach((element: any) => {
                                setStyle(element, {
                                    top: parseInt(element.style.top, 10) - offsetHeight - 20 + 'px'
                                })
                            });
                            setStyle(this, {
                                opacity: '0',
                                transform: 'translate(-50%, -100%)'
                            });
                            sto(() => {
                                this.remove()
                            }, 390)
                        } else {
                            setStyle(this, {
                                transform: elAlls.length == 0 ? 'translate(-50%, 0%)' : 'translate(-50%, 0%)'
                            })
                        }

                    }],
                ]))
            }
        })
    }

    public setup = function () {
        setStyle(this, {
            top: 20 + 'px',
            zIndex: getIndex() + '',
        });
    }

    protected initView = function () {
        this.className = 'sp-message sp-message-' + this.attrs.type
        let iconEl: HTMLElement = createEl('span'),
            contentEl: HTMLElement = createEl('div'),
            closeEl: HTMLElement = createEl('span'),
            allEls: NodeList | any = $el('sp-message')

        contentEl.innerHTML = this.attrs.message
        iconEl.className = 'sp-icon sp-icon-success'
        closeEl.className = 'sp-icon sp-icon-close'
        contentEl.className = 'sp-message-content'
        this.appendChild(iconEl);
        this.appendChild(contentEl);
        this.attrs.showclose == 'true' && this.appendChild(closeEl);

        sto(() => {
            this['attr-visible'] = false;
        }, +this.attrs.duration)
        closeEl.onclick = () => {
            this['attr-visible'] = false
        }
        let tot = [...allEls].reduce((total, el) => {
            total += el.offsetHeight + 20
            return total
        }, this.attrs.offset || 20);
        console.log(tot)
        // this.setup()
        setStyle(this, {
            top: tot + 'px',
            zIndex: getIndex() + '',
        });
        // let top: Number = allEls.length > 1 ?  
        // (+this.attrs.offset) + (allEls[allEls.length - 2].offsetTop +allEls[allEls.length - 2].offsetHeight)//   - (allEls.length ==2 ? this.offsetHeight + 20 : 0)
        // : (+this.attrs.offset)
        // if(allEls.length > 1 ) {
        //     console.log((+this.attrs.offset) + (allEls[allEls.length - 2].offsetTop +allEls[allEls.length - 2].offsetHeight))
        // }
        setStyle(contentEl, {
            justifyContent: this.attrs.center == 'true' ? 'center' : ''
        })


    }
    static info() {

    }
    static success(msg: string) {
        let t = createEl('sp-message')
        t['attr-message'] = msg;
        t['attr-visible'] = 'true';
        document.body.appendChild(t);
        t.setup()
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