// @ts-nocheck
import React, { ReactComponentElement } from 'react';
import { Meta } from '../content';
import default_react_template from './template/react_tmpl'
import default_html_template from './template/html_tmpl'

import './index.less'
let Message = (() => { })
if (typeof window !== 'undefined') {
    Message = window?.Spui?.Message
}
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
let clipboardObj = { writeText() { } }
if (typeof navigator != 'undefined') {
    clipboardObj = navigator.clipboard;
}

class Demo extends React.Component<Props> {
    constructor(props: any) {
        super(props)
        this.state = {
            codes: [], // 展示
            hightCodes: [] // 执行
        }
    }
    renderContent(content: any[]) {
        let c = [...content]

        return <>{this.props.utils.toReactComponent(['div'].concat(c))}</>
    }
    reset(props) {
        let codes = [props.highlightedCodes];
        let hightCodes = []
        for (let [k, ...v] of props.content) {
            if (k == 'pre') {
                for (let i = 0; i < v.length; i++) {
                    if (v[i]?.length && v[i][0] == 'code') {
                        hightCodes.push(v[i][1])
                    } else if (v[i]?.lang) {
                        codes.push({ [v[i].lang]: v[i].highlighted })
                    }
                }
            }
        }
        this.setState({
            codes,
            hightCodes
        })
    }
    componentDidMount() {
        this.reset(this.props)
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.reset(nextProps)
    }

    htmlTxt2Code(target:string) {
        let code = document.createElement('code');
        code.innerHTML = target;
        return code.innerText;
    }

    copy(highlightedCodes) {
        if(typeof window !== 'undefined')  {
            let code = document.createElement('code');
            let html = highlightedCodes.jsx;
            code.innerHTML = html;
            clipboardObj.writeText(code.innerText)
            Message.success('复制成功')
        }
    }

    runCardcode() {
        let htmlCode = '';
        let jsxCode = [];
        this.state.codes.map(item => {
            if(item.jsx) {
                jsxCode.push(this.htmlTxt2Code(item.jsx));
            }
            if(item.html){
                htmlCode = this.htmlTxt2Code(item.html)
            }
        });

        const react_tmpl = default_react_template(jsxCode);
        const html_tmpl = default_html_template(htmlCode);
        localStorage.setItem('cardCode',jsxCode.length >0 ? JSON.stringify(react_tmpl) : 'false');
        localStorage.setItem('cardCodeReact', jsxCode.length >0 ? JSON.stringify(react_tmpl) : 'false');
        localStorage.setItem('cardCodeHtml', htmlCode.length >0 ?JSON.stringify(html_tmpl) : 'false');
        
        try {
        window.open(location.origin+'/coding/?cardCode')
        } catch (error) {
            Message.error(error.stack)
        }
    }

    render() {
        let { preview, meta, highlightedCodes, content, childrenSetCode = () => { }, className, style, metaId } = this.props;
        return <section id={meta.id} className={'preview ' + className} >
            <style>
                {style}
            </style>
            <div className="cmps_p">
                {preview()}
                {this.state.hightCodes.map((code, key) => {
                    let codehtml = '';
                    while (code.indexOf('<script') > -1) {
                        let start = code.indexOf('<script');
                        let end = code.indexOf('</script>');
                        let script
                        if(typeof window !== 'undefined') {
                            script = document.createElement('script');
                        }
                        script.type = 'module';
                        script.className = 'temp_scripts'
                        script.innerHTML = code.slice(start + 8, end)
                        codehtml += code.slice(0, start)
                        if (code.slice(end + 9, code.length).indexOf('</script>') == -1) {
                            codehtml += code.slice(end + 9, code.length)
                        }
                        code = code.slice(end + 9, code.length);
                        if(typeof window !== 'undefined')  {
                            document.body.appendChild(script)
                        }
                    }

                    return <div key={key} dangerouslySetInnerHTML={{ __html: codehtml || code }}></div>
                })}
            </div>
            <div className="introduce" >
                <h5>{meta.title}</h5>
                <pre>{this.renderContent(content)}</pre>
            </div>
            <ul className='tools'>
                <sp-tooltip title='复制代码' get-popup-container='.show-components' ><li onClick={() => this.copy(highlightedCodes)} className='sp-icon sp-icon-copy' ></li></sp-tooltip>
                <sp-tooltip title='查看代码' get-popup-container='.show-components' ><li onClick={() => childrenSetCode(this.state.codes, this.props)} className='sp-icon sp-icon-Code' ></li></sp-tooltip>
                <sp-tooltip title='在线运行' get-popup-container='.show-components' ><li onClick={() => this.runCardcode()} className='sp-icon sp-icon-yunhang'></li></sp-tooltip>
            </ul>
        </section>
    }
}

export default Demo