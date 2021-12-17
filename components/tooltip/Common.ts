
import { getTargetRect } from 'sparrow-ui/affix/utils';
import { setIndex, getIndex } from 'sparrow-ui/common';
import { sto } from 'sparrow-ui/_utils/common';
import { $el, createEl, listener, setStyle } from 'sparrow-ui/_utils/dom';
import Base from '../_utils/Base'
import { tooltipTypesProps } from './type'
import './style/common.less'

export default class ToolTipCommon extends Base {
    protected _target: HTMLElement | any
    protected fixedEl: HTMLElement & {
        [key: string]: HTMLElement | any
    }
    private _type: 'tooltip' | 'popover'
    constructor(target: any) {
        super()
        this._target = target;
        this.init(this._target);
        if(target.attrs['arrow-point-at-center'] + '' == 'true') {
            this._target.APAC = true // 是否常驻局中
        }
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
    protected init(target: HTMLElement | any) {
        let interval = 0;
        let t = 0;
        let attrs:tooltipTypesProps = target.attrs;
        let trigger: tooltipTypesProps['trigger'] = this._adapterTrigger<tooltipTypesProps['trigger']>(attrs.trigger);
        
        this._type = this.tagName.indexOf('sp-tooltip') > -1 ? 'tooltip' : 'popover';
        this.fixedView(this._type, attrs);
      
        if (trigger.includes('hover')) {
            listener(target, 'mouseenter', _ => {
                if (!this.fixedEl.inset || !this.fixedEl.outset) {
                    interval = Date.now();
                }
                t = sto(this._mouseenter.bind(this, _), attrs['mouse-enter-delay'])
            });
            listener(target, 'mouseleave', _ => {
                if (Date.now() - interval <  attrs['mouse-move-delay'] ?? 80) { // 这个是传入过来的延迟
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
            // listener(target, 'focus', _ => { console.log('聚焦') })
            // listener(target, 'blur', _ => { console.log('失焦') })
            listener(target, 'blur', this._leave.bind(this))
            listener(target, 'focus', _ => this._focus.call(this, _));
            listener(this.fixedEl, 'click', e => { e.stopPropagation(); e.preventDefault(); });
        }

    }

    get tagName() {
        return this.contextTarget.tagName.toLocaleLowerCase()
    }
    get contextTarget() {
        return this._target
    }

    public visible(is: 'true' | 'false') {
        if (is == 'true') {
            this._changePosition(this.fixedEl);
            return
        }
        this._leave()
    }

    fixedView(type: 'tooltip' | 'popover', attrs: any) {
        let core: HTMLElement = createEl('div'),
            arrow: HTMLSpanElement = createEl('span'),
            content: HTMLDivElement | any = createEl('div'),
            arrow_child: HTMLSpanElement = createEl('span'),
            title: HTMLSpanElement = createEl('span');
        core.setAttribute('role', 'tooltip');
        core.className = this.getRootClassName(this.contextTarget);
        arrow.className = this.tagName + '__arrow';
        title.className = this.tagName + '__title';
        content.className = this.tagName + '__content';
        title.textContent = attrs?.title || '';
        if(attrs.popupstyle) {
            try { (core as any).style = attrs.popupstyle } 
            catch (error) {throw Error(error)}
        }

        if(attrs.color) {
            setStyle(arrow_child, {backgroundColor: attrs.color});
            setStyle(core, {backgroundColor: attrs.color});
        }

        if (type == 'tooltip') {
            content = ''
        } else {
            content = attrs?.content
        }
        arrow.append(arrow_child)
        core.append(title, content, arrow)
        this.fixedEl = core;
        this.fixedEl.contentEl = content;
        this.fixedEl.arrowEl = arrow;
        this.fixedEl.titleEl = title;
        setStyle(this.fixedEl, { zIndex: '-1', left: '-100%', top: '-100%' });
        this._appendTarget(attrs).append(this.fixedEl);
    }

    _contextmenu(e: Event) {
        e.stopPropagation(); e.preventDefault();
        this._changePosition(this.fixedEl);
        listener(document.body, 'click', this._leave.bind(this))
    }
    _click(e: Event) {
        console.log('点击');
        e.stopPropagation(); e.preventDefault();
        this._changePosition(this.fixedEl);
        listener(document.body, 'click', this._leave.bind(this))
    }

    _focus(e: Event) {
        console.log('聚焦');
        e.stopPropagation(); e.preventDefault();
        this._changePosition(this.fixedEl);
    }
    _mouseenter(e: MouseEvent) {
        this.fixedEl.inset = true;
        if (this.fixedEl.outset) return
        this._changePosition(this.fixedEl);
        console.log('内侧进入')
    }
    _mouseleave(e: MouseEvent) {
        this.fixedEl.inset = false
        if (!this.fixedEl.outset) this._leave()
        console.log('内侧出去')

    }
    _fixedEl_mouseenter(e: any) {
        e.stopPropagation(); e.preventDefault();
        this.fixedEl.outset = true
        console.log('外侧进入')
        // this._changePosition(this.fixedEl);
    }
    _fixedEl_mouseleave() {
        this.fixedEl.outset = false;
        if (!this.fixedEl.inset) this._leave()
        console.log('外侧出去')
    }

    _leave() {
        this._animation(this.fixedEl, 'leave').then(() => {
            setStyle(this.fixedEl, { zIndex: '-1', left: '-100%', top: '-100%' });
        })
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
            zIndex: '' + getIndex()
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

    _changePosition($target: HTMLElement | any, _placement: tooltipTypesProps['placement'] = this.contextTarget.attrs?.placement) {
        let rect: DOMRect = getTargetRect(this.contextTarget)
        console.log(this.contextTarget.APAC)
        let x = this.contextTarget.offsetLeft + (this.contextTarget.offsetWidth / 2) - $target.clientWidth / 2;
        let y = this.contextTarget.offsetTop - $target.clientHeight - (this.contextTarget.offsetHeight / 2) - 4;
        switch (_placement) {
            case 'bottom': setStyle($target, {
                bottom: rect.bottom + 'px',
                left: rect.left + 'px'
            })
            case 'top': setStyle($target, {
                top: y + 'px',
                left: x + 'px'
            })
        }
        this._weight($target);
        this._animation($target);

    }

}

