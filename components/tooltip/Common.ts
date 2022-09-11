
import { setIndex, getIndex } from 'common';
import { sto } from '_utils/common';
import { $el, createEl, listener, setStyle } from '_utils/dom';
import Base from '../_utils/Base'
import { tooltipTypesProps } from './type'

type ComType = 'tooltip' | 'popover' | 'confirm'

interface Config {
    readonly contextTarget: HTMLElement;
    readonly tagName: string
    fixedView(type: ComType, attrs: tooltipTypesProps, calback: (args: {
        core: HTMLElement,
        title: HTMLElement,
        arrow: HTMLElement,
        content: HTMLElement
    }) => void): any
}

export default class ToolTipCommon extends Base implements Config {
    protected _target: HTMLElement | any
    public fixedEl: HTMLElement & {
        [key: string]: HTMLElement | any
    }
    private _type: ComType
    protected visibleStatus: boolean | string; // 字符串的布尔值 当前是否显示(为了避免重复调用一样的参数)
    constructor(target: any) {
        super()
        this._target = target;
        if (target.attrs['arrow-point-at-center'] + '' == 'true') {
            this._target.APAC = true // 是否常驻局中
        }
        this.init(this._target);
    }


    _adapterTrigger<T extends tooltipTypesProps['trigger']>(trigger: T): any[] {
        if (trigger.length) {
            if (trigger[0] == '[') {
                return JSON.parse((trigger as any));
            }
            if (Array.isArray(trigger)) {
                return trigger
            }
            return [trigger]
        }
        return ["hover"]
    }

    protected getType(): ComType {
        return this.tagName.indexOf('sp-tooltip') > -1 ?
            'tooltip' :
            this.tagName.indexOf('sp-popover') > -1 ?
                'popover'
                : 'confirm'
    }
    protected init(target: HTMLElement | any) {
        let interval = 0;
        let t = 0;
        let attrs: tooltipTypesProps = target.attrs;
        let trigger: tooltipTypesProps['trigger'] = this._adapterTrigger<tooltipTypesProps['trigger']>(attrs.trigger);
        this._type = this.getType();
        this.fixedView(this._type, attrs);

        if (trigger.includes('hover')) {
            listener(target, 'mouseenter', _ => {
                if (!this.fixedEl.inset || !this.fixedEl.outset) {
                    interval = Date.now();
                }
                t = sto(this._mouseenter.bind(this, _), attrs['mouse-enter-delay'])
            });
            listener(target, 'mouseleave', _ => {
                if (Date.now() - interval < attrs['mouse-move-delay'] ?? 80) { // 这个是传入过来的延迟
                    clearTimeout(t)
                    return
                };
                sto(this._mouseleave.bind(this, _), attrs['mouse-leave-delay'] ?? 100)
            });
            listener(this.fixedEl, 'mouseenter', _ => sto(this._fixedEl_mouseenter.bind(this, _), 80));
            listener(this.fixedEl, 'mouseleave', _ => sto(this._fixedEl_mouseleave.bind(this, _), 100));
        }
        if (trigger.includes('click')) {
            listener(target, 'click', _ => this._click.call(this, _));
            listener(this.fixedEl, 'click', e => { e.stopPropagation(); e.preventDefault(); });
        }
        if (trigger.includes('contextmenu')) {
            listener(target, 'contextmenu', _ => this._contextmenu.call(this, _));
            listener(this.fixedEl, 'click', e => { e.stopPropagation(); e.preventDefault(); });
        }
        if (trigger.includes('focus')) {
            // 第三个参数 2022/1/10修改 （并修改了button的聚焦问题）
            listener(target, 'blur', this._leave.bind(this), true)
            listener(target, 'focus', _ => this._focus.call(this, _), true);
            listener(this.fixedEl, 'click', e => { e.stopPropagation(); e.preventDefault(); });
        }
        if (trigger.includes('click') || trigger.includes('contextmenu')) {
            listener(document.body, 'click', this._reset.bind(this)) 
        }

    }

    get tagName() {
        return this.contextTarget.tagName.toLocaleLowerCase()
    }
    get contextTarget() {
        return this._target
    }

    public visible(is: 'true' | 'false') {
        if (this.visibleStatus == is) return;
        if (is == 'true') {
            this.visibleStatus = is
            this._changePosition(this.fixedEl);
            return
        }
        this.visibleStatus = is
        this._leave();
    }

    fixedView(type: ComType, attrs: any, callback?: (args: any) => any) {
        let core: HTMLElement = createEl('div'),
            arrow: HTMLSpanElement = createEl('span'),
            content: HTMLDivElement | any = createEl('div'),
            arrow_child: HTMLSpanElement = createEl('span'),
            title: HTMLSpanElement = createEl('span');
        core.setAttribute('role', type);
        core.className = this.getRootClassName(this.contextTarget, ['__' + attrs['placement'] ?? '__top', this.contextTarget?.APAC ? 'APAC' : '']);
        arrow.className = this.tagName + '__arrow';
        title.className = this.tagName + '__title';
        content.className = this.tagName + '__content';
        if(attrs?.title && attrs?.title.indexOf('<') > -1 && attrs?.title.indexOf('/>') > -1) {
            title.innerHTML = attrs.title
        }else {
            title.textContent = attrs?.title || '';
        }
        if (attrs.popupstyle) {
            try { (core as any).style = attrs.popupstyle }
            catch (error) { throw Error(error) }
        }

        if (attrs['effect'] == 'light') {
            setStyle(core, {
                backgroundColor: '#fff',
                color: '#000'
            })
            setStyle(arrow_child, {
                backgroundColor: '#fff'
            })
        }
        if (attrs.color) {
            setStyle(arrow_child, { backgroundColor: attrs.color });
            setStyle(core, { backgroundColor: attrs.color });
        }

        if (type == 'tooltip') {
            content = ''
        } else {
            content.innerHTML = attrs?.content || this.contextTarget?.content || ''
        }
        callback?.({ core, title, arrow, content })


        arrow.append(arrow_child)
        core.append(title, content, arrow)
        this.fixedEl = core;
        this.fixedEl.contentEl = content;
        this.fixedEl.arrowEl = arrow;
        this.fixedEl.titleEl = title;

        this._reset()
        this._appendTarget(attrs).append(this.fixedEl);

        // 临时加的 可能会注视掉 // 漠视为默认的行为
        if (attrs['visible'] + '' == 'true') {
            sto(() => this.visible('true'), 200)
        }
    }

    _contextmenu(e: Event) {
        !this.contextTarget.attrs?.['ispreventdefault'] && document.body.click()
        e.stopPropagation();
        e.preventDefault();
        this._changePosition(this.fixedEl);
    }
    _click(e: Event) {
        !this.contextTarget.attrs?.['ispreventdefault'] && document.body.click()
        e.stopPropagation(); e.preventDefault();
        this._changePosition(this.fixedEl)
    }

    _focus(e: Event) {
        e.stopPropagation(); e.preventDefault();
        this._changePosition(this.fixedEl);
    }
    _mouseenter(_: MouseEvent) {
        this.fixedEl.inset = true;
        if (this.fixedEl.outset) return
        this._changePosition(this.fixedEl);
    }
    _mouseleave(_: MouseEvent) {
        this.fixedEl.inset = false
        if (!this.fixedEl.outset) this._leave()

    }
    _fixedEl_mouseenter(e: any) {
        e.stopPropagation(); e.preventDefault();
        this.fixedEl.outset = true
    }
    _fixedEl_mouseleave() {
        this.fixedEl.outset = false;
        if (!this.fixedEl.inset) this._leave()
    }
    _reset() {
        setStyle(this.fixedEl, { zIndex: '-1', opacity: '0', left: '-100%', top: '-100%' });
    }

    _leave() {
        this._animation(this.fixedEl, 'leave').then(this._reset.bind(this))
    }

    _appendTarget(attrs: tooltipTypesProps): HTMLElement {
        if (typeof attrs['get-popup-container'] == 'string') {
            let t = $el(attrs['get-popup-container']);
            return t?.[0] ?? document.body
        }
        return this.contextTarget?.getPopupContainer?.() ?? document.body
    }

    _weight(target: HTMLElement) {
        setIndex()
        setStyle(target, {
            zIndex: '' + getIndex(),
            opacity: '1'
        })
    }

    _animation($target: any, mode: 'enter' | 'leave' = 'enter') {
        this.contextTarget?.onVisibleChange?.(mode == 'enter' ? true : false);
        return new Promise((res: any) => {
            $target.classList.add('zoom-big-fast-' + mode);
            sto(() => {
                $target.classList.remove('zoom-big-fast-' + mode);
                res()
            }, 200)
        })

    }

    _changePosition($target: HTMLElement | any, _placement: tooltipTypesProps['placement'] = this.contextTarget.attrs?.placement, isshow:boolean = true) {
        // let rect: DOMRect = getTargetRect(this.contextTarget);
        let lixinH = this.contextTarget.attrs['offcenter'] || 4; // 离心点
        let oLeft = this.contextTarget.offsetLeft;
        let oTop = this.contextTarget.offsetTop;
        let fixH = $target.clientHeight;
        let fixW = $target.clientWidth;
        let ctxH = this.contextTarget.offsetHeight;
        let ctxW = this.contextTarget.offsetWidth;
        let APAC = this.contextTarget?.APAC;
        const setArrow = (dir: any) => {
            // 有极端条件
            let fan = dir == 'left' ? 'right' : dir == 'right' ? 'left' : dir == 'top' ? 'bottom' : 'top';
            let value = dir == 'left' || dir == 'right' ?
                (APAC ? (ctxW / 2 > fixW ? fixW / 2 - 4.5 : ctxW / 2 - 4.5) : ((ctxW > fixW ? fixW : ctxW) / 4) - 4.5) : // (ctxW / 4 + 8.5 > fixW ? fixW - 10 : ctxW / 4 - 4.5)
                (APAC ? (ctxH / 2 > fixH ? fixH / 2 - 5.5 : ctxH / 2 - 5.5) : ((ctxH > fixH ? fixH : ctxH) / 4) - 4.5) // (ctxH / 4 + 8.5 > fixH ? fixH - 10 : ctxH / 4 - 5.5)
            setStyle(this.fixedEl.arrowEl,
                {
                    [dir]: value + 'px',
                    [fan]: 'initial',
                    transform: 'initial'
                })
        }
        switch (_placement) {
            case 'bottom': setStyle($target, {
                top: oTop + ctxH + 5 + lixinH + 'px',
                left: oLeft + ctxW / 2 - fixW / 2 + 'px',
            }); break
            case 'bottom-left':
                setArrow('left')
                setStyle($target, {
                    top: oTop + ctxH + 5 + lixinH + 'px',
                    left: oLeft + 'px',
                }); break
            case 'bottom-right':
                setArrow('right')
                setStyle($target, {
                    top: oTop + ctxH + 5 + lixinH + 'px',
                    left: oLeft + ctxW - fixW + 'px',
                }); break
            case 'top': setStyle($target, {
                left: oLeft + ctxW / 2 - fixW / 2 + 'px',
                top: oTop - fixH - 5 - lixinH + 'px'
            }); break
            case 'top-left':
                setArrow('left')
                setStyle($target, {
                    left: oLeft + 'px',
                    top: oTop - fixH - 5 - lixinH + 'px'
                }); break
            case 'top-right':
                setArrow('right')
                setStyle($target, {
                    left: oLeft + ctxW - fixW + 'px',
                    top: oTop - fixH - 5 - lixinH + 'px'
                }); break
            case 'right': setStyle($target, {
                left: oLeft + ctxW + lixinH + 'px',
                top: oTop + ctxH / 2 - fixH / 2 + 'px'
            }); break
            case 'right-bottom':
                setArrow('bottom')
                setStyle($target, {
                    left: oLeft + ctxW + lixinH + 'px',
                    top: oTop - fixH + ctxH + 'px'
                }); break
            case 'right-top':
                setArrow('top')
                setStyle($target, {
                    left: oLeft + ctxW + lixinH + 'px',
                    top: oTop + 'px'
                }); break
            case 'left': setStyle($target, {
                left: oLeft - fixW - lixinH + 'px',
                top: oTop + ctxH / 2 - fixH / 2 + 'px'
            }); break
            case 'left-bottom':
                setArrow('bottom')
                setStyle($target, {
                    left: oLeft - fixW - lixinH + 'px',
                    top: oTop - fixH + ctxH + 'px'
                }); break
            case 'left-top':
                setArrow('top')
                setStyle($target, {
                    left: oLeft - fixW - lixinH + 'px',
                    top: oTop + 'px'
                }); break
        }
        if(!isshow) return;
        this._weight($target);
        this._animation($target);
    }
}

