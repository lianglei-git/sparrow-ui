import { runIFELSE} from '../_utils/common'
// import { getIndex, setIndex } from '../common/index'
import { defineEl, getProps, createEl, listener } from '../_utils/dom'
import Base from '../_utils/Base'
import './index.scss'
import { ScrollableElement } from './lib/scrollableElement'

function getRandomChineseWord () {
    var _rsl = "";
    for(let i = 0 ; i <  ~~(Math.random() * 100 + 50); i++) {
        var _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
        eval("_rsl+=" + '"\\u' + _randomUniCode + '"');
    }
    return _rsl;
}
class Lines extends Base {
    context: this
    constructor() {
        super()
        const context = this
        defineEl({
            tag: 'sp-lines',
            observedAttributes: [],
            connectedCallback() {
                context._setClassName(this)
                let ul = createEl('ul');
                let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
               {
                let i = 0;
               
                for(; i<100; ) {
                    i++
                    var li = createEl('li');
                    var span = createEl('span');
                    var dl = createEl('dl');
                    var dt = createEl('dt');
                    var dd = createEl('dd');
                    let img = createEl('img');
                    img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100120461512E-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641544856&t=535d5980b5301989a3c14804bb1e0667'
                    span.innerText = i +'::'+ getRandomChineseWord();
                    dt.append(img)
                    dd.append(span)
                    dl.append(dt, dd)
                    li.append(dl)
                    ul.append(li)
                }
               }
                this.append(ul);

                // listener(this, 'wheel', (e:WheelEvent) => {
                //     e.preventDefault();
                //     e.stopPropagation();
                //     console.log(e.deltaY)
                // })
                new ScrollableElement(this, {})
            },
            attributeChangedCallback(...args) {
            }
        })
    }
    initView(root: HTMLElement | any) {
    }
}

export default new Lines()