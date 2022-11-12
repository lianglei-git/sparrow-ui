import Base from '../_utils/Base';
import wrapperRaf from '../_utils/raf';
// import { SelectProps as Props, SelectTypes as Types } from './type'
import { $el, createEl, defineEl, getProps, listener, setStyle } from '../_utils/dom'
// import InputCommon from '../input/Common';
// import { setIndex } from '../common';

const Tag = 'sp-rate' as const;

const Props = {
    count: -1,
    character: false,
    half: false,
    total: 5
}

type Types = {
    character: string;
    count: number;
    half: boolean & string
    total: string | number
}

interface RateImp extends Base {
    context: this;
    createRateItemCore<T extends Element>(el: T): T[];
    createRateItem(attrs: Partial<Types>, idx: number): Node;
    initView(target: HTMLElement, attrs: Partial<Types>): any
}

// abstract rate
abstract class AbstractRate extends Base implements RateImp {
    context: this = this;

    // fn: define custom "rate"
    private getCustomRate(node: string & any, idx?: number): Node {
        const el: HTMLElement = createEl('div');
        if (typeof node === 'function') {
            el.innerHTML = node(idx);
            return el;
        }
        if (node.indexOf('sp-icon') > -1) el.className = node;
        else el.innerHTML = node;
        return el;
    }

    // fn: define default "rate"
    private getDefaultRate(): SVGAElement | Node {
        var SVG_NS = "http://www.w3.org/2000/svg";
        const svg: SVGAElement | Element = document.createElementNS(SVG_NS, 'svg');
        const path: string = `
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"> </path>
        `;
        svg.setAttribute('viewBox', "64 64 896 896")
        svg.setAttribute('width', "1em")
        svg.setAttribute('height', "1em")
        svg.setAttribute('fill', "currentColor")
        svg.setAttribute('focusable', "false")
        svg.setAttribute('aria-hidden', "true")
        svg.innerHTML = path;
        return svg;
    }

    public abstract initView(target: HTMLElement, attrs: Partial<Types>): any;

    createRateItemCore<T extends Element>(el: T): T[] {
        // throw new Error('Method not implemented.');
        let first = el.cloneNode(true) as T;
        let second = el.cloneNode(true) as T;
        first.classList.add('sp-rate-star-first');
        second.classList.add('sp-rate-star-second');
        return [first, second];
    }

    createRateItem(attrs: Partial<Types>, idx?: number): Node {
        const li: any = createEl('li');
        const container = createEl('div');
        li.className = 'sp-rate-star';
        let core_el: Node = attrs.character ? this.getCustomRate(attrs.character, idx) : this.getDefaultRate()
        const childs = li.childs = this.createRateItemCore(core_el as Element)
        container.append(...childs);
        li.append(container)
        return li;
    }

    constructor() {
        super()
        const context = this;
        defineEl({
            tag: Tag,
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                const that: any = this;
                that.listeners = Array(0);
                that.className = Tag;
                (that.attrs as Partial<Types>) = getProps(that);
                that.attrs = { ...Props, ...that.attrs };
                that.setAttribute('hidefocus', true)
                that.setAttribute('tabindex', 0);
                context.initView(this as unknown as HTMLElement, that.attrs)
            },
            attributeChangedCallback(...args: any) {
                // console.log(args);
            },
            disconnectedCallback() {
                this.listeners.forEach((element:any) => element.remove?.());
                this.listeners = Array();
            }
        })
    }


}


// entry implementation for "Rate UI design"
class Rate extends AbstractRate {

    private leave(target: HTMLElement, activeIndex: number) {
        for (let i = activeIndex, item = target.children[i]; item !== void 0; i++, item = target.children[i]) {
            // item.children[0].classList.remove('half', 'full');
            item.children[0].className = ''
        }
    }

    private setActive(target: HTMLElement, classes: string, length: number) {
        for (let i = 0; i <= length; i++) {
            if (i === length && classes.indexOf('half') > -1) {
                target.children[i].children[0].className = 'half'
            } else {
                target.children[i].children[0].className = 'full'
            }
        }
    }

    private defineMouseMove<T extends HTMLElement>(isHalf: boolean, target: T, els: T[], idx: number) {
        // wrapperRaf(() => {
        //     offsetWidth = el.offsetWidth;
        // })
        els.forEach((item, elIdx) => {
            (target as any).listeners.push(listener(item, 'mouseenter', _ => {
                const fullOrHalf = !elIdx ? 'half' : 'full';
                if ((target as any).onItemMouseEnter?.(item, fullOrHalf, idx)) return void 0;
                this.leave(target, idx);
                isHalf ? this.setActive(target, fullOrHalf, idx) : this.setActive(target, '', idx)
            }));
            (target as any).listeners.push(listener(item, 'click', _ => {
                if ((target as any).onItemClick?.(item, elIdx ? 'half' : 'full', idx)) return void 0;
                (target as any).activeIndex = idx;
                (target as any).leaveIsHalf = elIdx;
            }));
        })
    }

    // target.customCount(3.5 || 3); 
    customCount(target: HTMLElement, isHalf: boolean) {
        const self = this;
        function isInteger(obj: number) {
            return typeof obj === 'number' && obj % 1 === 0
        }
        return function (count: number) {
            // count - 0.5
            const isinteger = isInteger(count);
            const activeIndex = (target as any).activeIndex = ~~(isinteger && !isHalf ? count - 1 : count);
            const leaveIsHalf = (target as any).leaveIsHalf = !isinteger;
            self.leave(target, activeIndex < 0 ? 0 : activeIndex);
            isHalf ? self.setActive(target, leaveIsHalf ? 'half' : '', activeIndex) : self.setActive(target, '', activeIndex)
        }
    }



    initView(target: HTMLElement, attrs: Partial<Types>) {
        const isHalf = attrs.half === 'true' ? true : false;
        const count = +attrs.count;
        const total = +attrs.total;
        (target as any).listeners.push(listener(target, 'mouseleave', () => {
            let activeIndex = (target as any).activeIndex ?? -1;
            this.leave(target, activeIndex < 0 ? 0 : activeIndex);
            const fullOrHalf = !(target as any).leaveIsHalf ? 'half' : 'full'
            isHalf ? this.setActive(target, fullOrHalf, activeIndex) : this.setActive(target, '', activeIndex);
            (target as any).onMouseLeave?.(fullOrHalf, activeIndex);
        }));
        (target as any).customCount = this.customCount.call(this, target, isHalf);

        let appendRateContainer: Node[] = Array(total).fill(0).map((_, idx) => {
            let el = this.createRateItem(attrs, idx);
            this.defineMouseMove(isHalf, target, (el as any).childs as HTMLElement[], idx)
            return el;
        });
        wrapperRaf(() => ((target as any).customCount as any)(count));
        target.append(...appendRateContainer);
    }
}


/**
 * @emaple 
      <SpRate count={count} character="⬇" half={true}></SpRate>
 * 
 */

new Rate();
const SpRate = (p) => {
    const fn = new Function('p', `
    const { children = null,Lib = null, ...props } = p;
    if(!Lib) return document.createElement('div')
    return Lib.createElement('sp-rate', props , children)
    `)
    return fn(p);
}

export {
    SpRate
}





// function wrapperRaf(arg0: () => void) {
//     throw new Error('Function not implemented.');
// }
// function getSize() {
// }

// type GetsizeProps = {callback(k: string): any}// & ThisType<Getsize>;

// class Getsize {
//     size = 10
//     constructor(public props: GetsizeProps) {
//         // props.callback.bind(this)
//         // props.callback('')
//     }
// }

// new Getsize({
//     callback(p: string) {
//         // this.size
//     //   return this
//         // console.log(this)
//         // this
//     }
// })


// type ThisParameterType<T> = T extends (this: unknown, ...args: any[]) => any
//   T extends (this: infer U, ...args: any[]) => any
//   ? U
//   : unknow