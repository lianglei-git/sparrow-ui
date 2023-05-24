import { createEl, listener, setStyle } from "../../_utils/dom";
import './ripple.less'
/** params */

type RippleOptions = {
    center?: boolean
}

type Parasite = HTMLSpanElement & {
    /** 当前标记 */
    _index?: number
};
type ParasiteParentTarget = HTMLElement & {
    ripple_options: RippleOptions;
    rippleElement: Parasite;
    ripples: Array<HTMLSpanElement>;
    /** 参数空为删除， 参数有为增加 */
    setRipples: (k?: Parasite | undefined) => void;
    startTimer: NodeJS.Timeout
    /** 总标记 */
    nextKey: number;
    ignoringMouseDown: boolean
}

enum DURATION {
    RIPPLE = 80,
    QUICK = 100,
    DEFAULT = 550,
    SLOW = 2500
}


/** @private */
const _createShadowElement = (): Parasite => {
    const rippleElement = createEl('span');
    const rippleChildElement = createEl('span');

    rippleElement.className = 'ripple'
    rippleChildElement.className = 'ripple-child'

    rippleElement.append(rippleChildElement);
    return rippleElement;
}

/** @private */
const setRippleStyles = (parasite, rippleStyles: any) => {
    for (let k in rippleStyles) rippleStyles[k] = rippleStyles[k] + 'px';
    setStyle(parasite, rippleStyles)
}

/** 
 * 走社会相对论概念路线， 没人强迫😄
 * 2023/2/15 四川省卫生健康委员会正式试运行“未婚生育可登记”
 */
const useRipple_Calc = (event: MouseEvent & TouchEvent) => {
    const treeRoot: ParasiteParentTarget = (event as any).treeRoot as ParasiteParentTarget;
    const rect = treeRoot?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
    }
    let rippleX;
    let rippleY;
    let rippleSize;
    let center = treeRoot.ripple_options.center;

    if (
        center ||
        event === undefined ||
        (event.clientX === 0 && event.clientY === 0) ||
        (!event.clientX && !event.touches)
    ) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
    } else {
        const { clientX, clientY } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
    }


    if (center) {
        rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

        // For some reason the animation is broken on Mobile Chrome if the size is even.
        if (rippleSize % 2 === 0) {
            rippleSize += 1;
        }
    } else {
        const sizeX =
            Math.max(Math.abs((treeRoot ? treeRoot.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
        const sizeY =
            Math.max(Math.abs((treeRoot ? treeRoot.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }

    return {
        rippleSize,
        rippleY,
        rippleX
    }

}

const useRipple_Star = (event: MouseEvent & TouchEvent) => {
    const treeRoot: ParasiteParentTarget = (event as any).treeRoot as ParasiteParentTarget;
    const parasite: Parasite = treeRoot.rippleElement = _createShadowElement();
    const {
        rippleSize,
        rippleY,
        rippleX
    } = useRipple_Calc(event);
    const rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX,
    };
    if (event?.touches) {
        treeRoot.startTimer = setTimeout(() => {
            setRippleStyles(parasite, rippleStyles)
        }, DURATION.RIPPLE)
    } else {
        setRippleStyles(parasite, rippleStyles)
    }
    treeRoot.setRipples(parasite);
    treeRoot.ignoringMouseDown = false;
    parasite._index = treeRoot.nextKey++;
    parasite.classList.add('active')

}

const useRipple_Stop = (event: MouseEvent & TouchEvent, Delay:DURATION = DURATION.DEFAULT) => {
    const treeRoot: ParasiteParentTarget =(event as any).treeRoot as ParasiteParentTarget;
    const parasite: Parasite = treeRoot.rippleElement;
    treeRoot.ignoringMouseDown = true;
    clearTimeout(treeRoot.startTimer);
    parasite.classList.add('leave')
    let p = setTimeout(() => {
        treeRoot.setRipples();
        clearTimeout(p);
    }, Delay)
}


/** 不会更改，只能仅限 mouse touch 事件 */
const useRipple = (target: ParasiteParentTarget, options?: RippleOptions): Parasite => {
    const rippleroot = createEl('span');
    rippleroot.className = 'ripple-root';

    /** 兼容 */
    if (!target.style.position || target.style.position == 'staic') {
        target.style.position = 'relative';
    }

    target.ripple_options = Object.assign({center: false}, options ?? {})
    target.nextKey = -1;
    target.ignoringMouseDown = true;
    target.ripples = target.ripples ?? [];
    target.setRipples = (ripple: Parasite | undefined) => {
        if (ripple) {
            rippleroot.append(ripple)
            return target.ripples.push(ripple);
        }
        if (target.ripples.length > 0) {
            rippleroot.children.item?.(0).remove?.();
            target.ripples.splice(1);
        }
    }

    const twist = (e, callback, ...params) => {
        e.treeRoot = target;
        callback(e, ...params);
    } 

    listener(target, 'mouseleave', e => {
        if(!target.ignoringMouseDown) {
            twist(e, useRipple_Stop), DURATION.QUICK;
            target.ignoringMouseDown = true;
        }
    })

    listener(target, 'mousedown', e => twist(e, useRipple_Star));
    listener((target as any), 'mouseup', e => twist(e, useRipple_Stop));
    

    listener(target, 'touchstart', e => twist(e, useRipple_Star));
    listener((target as any), 'touchend', e => twist(e, useRipple_Stop));

    target.append(rippleroot);
    return rippleroot;
}


export {
    useRipple
}