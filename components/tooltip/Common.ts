
import { getTargetRect } from 'sparrow-ui/affix/utils';
import { setIndex, getIndex } from 'sparrow-ui/common';
import { createEl, setStyle } from 'sparrow-ui/_utils/dom';
import Base from '../_utils/Base'
import {tooltipTypesProps} from './type'

export default class ToolTipCommon extends Base {
    protected _target: HTMLElement | any
    protected fixedEl: HTMLElement & {
        [key: string]: HTMLElement | any
    }
    private _type: 'tooltip' | 'popover'
    constructor() {
        super()
    }

    protected init(target: HTMLElement | any) {
        this._target = target;
        // this._setClassName(target);
        this._type = this.tagName.indexOf('sp-tooltip') > -1 ? 'tooltip' : 'popover'
        this.fixedView(this._type, this._target.attrs);
        console.log(this)
    }

    get tagName() {
        return this._target.tagName.toLocaleLowerCase()
    }

    fixedView(type: 'tooltip' | 'popover', attrs: any) {
        let core: HTMLElement = createEl('div'),
            arrow: HTMLSpanElement = createEl('span'),
            content: HTMLDivElement | any = createEl('div'),
            title: HTMLSpanElement = createEl('span');
        core.setAttribute('role', 'tooltip');
        core.className = this.getRootClassName(this._target);
        arrow.className = this.tagName + '__arrow';
        title.className = this.tagName + '__title';
        content.className = this.tagName + '__content';
        title.textContent = attrs?.title || '';
        if (type == 'tooltip') {
            content = ''
        } else {
            content = attrs?.content
        }
        console.log(type, content)
        core.append(title, content, arrow)
        this.fixedEl = core;
        this.fixedEl.contentEl = content;
        this.fixedEl.arrowEl = arrow;
        this.fixedEl.titleEl = title
        // this._weight(this.fixedEl)
        document.body.append(this.fixedEl);
    }

    _weight(target: HTMLElement) {
        setIndex()
        setStyle(target, {
            zIndex: '' + getIndex()
        })
    }

    _changePosition(target: HTMLElement, placement: tooltipTypesProps['placement']) {
        let rect: DOMRect = getTargetRect(target)
        console.log(rect);
    }


}

