// @ts-nocheck
import React, { ReactComponentElement } from 'react';
import { Meta } from '../content';
import { createEl } from 'sparrow-ui/_utils/dom'
import {Message} from 'sparrow-ui'
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
        this.state = {
            codes: [], // 展示
            hightCodes: [] // 执行
        }
    }
    renderContent(content: any[]) {
        let c = [...content]
        // let _o = Object.create(null);
        // console.log(content)
        // while (c.length) {
        //     let cur = c.shift(),
        //         next = c.shift();
        //     _o[cur[1]] = next[1];
        // }
            
        return <>{this.props.utils.toReactComponent(['div'].concat(c))}</>
    }
    reset(props) {
        let codes = [props.highlightedCodes];
        let hightCodes = []
        // console.log(this.props.content)
        for(let [k, ...v] of props.content){
            if(k == 'pre') {
                for(let i = 0; i< v.length; i++){
                    if(v[i]?.length && v[i][0] == 'code') {
                        hightCodes.push(v[i][1])
                    } else if(v[i]?.lang){
                        codes.push({[v[i].lang]:v[i].highlighted})
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
    componentWillReceiveProps (nextProps, nextState) {
        // console.log(nextProps)
        // if (this.props.location.pathname !== nextProps.location.pathname){
        //     // 路由发生了变化
        // }
        this.reset(nextProps)
    }

    // componentDidUpdate() {
    //     this.props.history.listen(location => {
    //         // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
    //         if (this.props.location.pathname !== location.pathname) {
    //            // 路由发生了变化
    //            console.log(123)
    //         }
    //     })
    // }
    copy(highlightedCodes) {
        let code = createEl('code');
        let html = highlightedCodes.jsx;
        code.innerHTML = html;
        clipboardObj.writeText(code.innerText)
        Message.success('复制成功')
    }
    // setCode(childrenSetCode, highlightedCodes, content) {
    //     let codes = [highlightedCodes];
    //     let hightCode = []
    //     for(let [k, ...v] of content){
    //         if(k == 'pre') {
    //             for(let i = 0; i< v.length; i++){
    //                 if(v[i]?.length && v[i][0] == 'code') {
    //                     hightCode.push(v[i][1])
    //                 } else if(v[i]?.lang){
    //                     codes.push({[v[i].lang]:v[i].highlighted})
    //                 }
    //             }
    //         }
    //     }
    // }
    render() {
        let { preview, meta, highlightedCodes, content, childrenSetCode = () => { }, className, style} = this.props;
        return <section id={meta.id} className={'preview ' +  className} style={{display: meta.id?.indexOf('demo-test') > -1? 'none': ''}}>
            <style>
                {style}
            </style>
            <div className="cmps_p">
                {preview()}
                {this.state.hightCodes.map((code, key) => {
                    let codehtml = '';
                    while(code.indexOf('<script') > -1) {
                        let start = code.indexOf('<script');
                        let end = code.indexOf('</script>');
                        let script = document.createElement('script');
                        script.type = 'module';
                        script.innerHTML = code.slice(start + 8, end)
                        codehtml += code.slice(0, start)
                        if(code.slice(end + 9, code.length).indexOf('</script>') == -1) {
                            codehtml += code.slice(end + 9, code.length)
                        }
                        code = code.slice(end+ 9, code.length);
                        document.body.appendChild(script)
                    } 
                    return <div key={key} dangerouslySetInnerHTML={{__html:codehtml || code}}></div>
                })}
            </div>
            <div className="introduce" >
                <h5>{meta.title}</h5>
                <pre>{this.renderContent(content)}</pre>
            </div>
            <ul className='tools'>
                <li onClick={() => this.copy(highlightedCodes)} className='sp-icon sp-icon-copy' title='复制代码'></li>
                <li onClick={() => childrenSetCode(this.state.codes, this.props)} className='sp-icon sp-icon-Code' title='代码展示'></li>
                <li className='sp-icon sp-icon-yunhang' title='在线运行'></li>
            </ul>
        </section>
    }
}

export default Demo