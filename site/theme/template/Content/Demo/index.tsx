// @ts-nocheck
import React, { ReactComponentElement } from 'react';
import { Meta } from '../content';
import { createEl } from 'sparrow-ui/_utils/dom'
import './index.less'
interface Content {
    ['desc-cn']?: string
    code?: string
    title: string
}
interface Props {
    content: Array<any>
    meta: Meta
    preview: () => ReactComponentElement<any>
    highlightedCodes: Object | any
    childrenSetCode: () => any
}
const clipboardObj = navigator.clipboard;
class Demo extends React.Component<Props> {
    constructor(props: any) {
        super(props)
    }
    renderContent(content: any[]) {
        let c = [...content]
        let _o = Object.create(null);
        while (c.length) {
            let cur = c.shift(),
                next = c.shift();
            _o[cur[1]] = next[1];
        }
        return <>{_o['desc-cn']}</>
    }
    copy(highlightedCodes) {
        let code = createEl('code');
        let html = highlightedCodes.jsx;
        code.innerHTML = html;
        clipboardObj.writeText(code.innerText)
    }
    render() {
        let { preview, meta, highlightedCodes, content, childrenSetCode = () => { } } = this.props;
        return <section id={meta.id} className='preview'>
            <div className="cmps_p">
                {preview()}
            </div>
            <div className="introduce" >
                <h5>{meta.title}</h5>
                <pre>{this.renderContent(content)}</pre>
            </div>
            <ul className='tools'>
                <li onClick={() => this.copy(highlightedCodes)} className='sp-icon sp-icon-copy' title='复制代码'></li>
                <li onClick={() => childrenSetCode(highlightedCodes)} className='sp-icon sp-icon-Code' title='代码展示'></li>
                <li className='sp-icon sp-icon-yunhang' title='在线运行'></li>
            </ul>
        </section>
    }
}

export default Demo