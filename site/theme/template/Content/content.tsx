// @ts-nocheck
import React, { createRef, useEffect, useState, useRef } from 'react';
import { Link } from 'bisheng/router';
import Demo from './Demo';
import CodeView from './Demo/CodePreView'
import { getChildren } from 'jsonml.js/lib/utils';
import { Message } from 'sparrow-ui'
import './index.less';
import { $el, setStyle } from 'sparrow-ui/_utils/dom';
interface Meta {
    category: string | "Components"
    filename: string
    subTitle: string
    title: string
    type: string
    id?: string
}
const ComponentInMarkdown = React.memo(({ content, utils }: any) =>
    utils.toReactComponent(['section', { className: 'markdown' }].concat(getChildren(content))),
);
let testElId = ''
const Content = (props: any) => {
    const [code, setCode] = useState<Object | any>(null);
    const [curCodeDetails, setCodeDetails] = useState('');
    const [switchVal, setSwitchVal] = useState(false);
    const switchEl = useRef(null)
    const codeEl = createRef<HTMLDivElement>()
    const to = ($$i: Meta) => {
        let toL = $$i.filename.split('/');
        let topath = toL[0] + '/' + toL[1] + '/';
        return <Link to={topath}> {$$i.title} {$$i.subTitle}</Link>
    }

    const getMenuItems = () => {
        let cdata = props.data.components;
        let components = new Array()
        for (let k in cdata) {
            let _i = cdata[k]?.index
            let title = _i?.meta?.title || false;
            if (_i?.meta?.category === 'Components') {
                let typed = components.find($$i => $$i.type == _i?.meta?.type);
                if (typed) {
                    typed.children.push(_i?.meta)
                } else {
                    let type = {
                        type: _i?.meta?.type,
                        children: [_i?.meta]
                    }
                    components.push(type)
                }
            }
        }
        return <ul>
            {
                components.map(item => {
                    return <li key={item.type}>
                        <p>{item.type}</p>
                        <ol>
                            {item.children.map((i2: Meta) => {
                                return <li
                                    key={i2.title}
                                    className={i2.filename.indexOf(location.pathname.slice(1)) > -1 ? 'active' : ''}
                                >{to(i2)}</li>
                            })}
                        </ol>
                    </li>
                })
            }
        </ul>
    };

    const childrenSetCode = (_code: Object, props: any) => {
        setCodeDetails(props.meta.id)
        // (codeEl.current as any).classList.add('active');
        setCode(_code)
    }

    const demo = () => {
        testElId = 0
        const demos = props.demo;
        const l = new Array();
        for (let [_, v] of Object.entries(demos)) {
            l.push(v)
        }
        let $l = l.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
        return $l.map((content, i) => {
            if (content.meta.id.indexOf('demo-test') > -1) {
                // setTestElId(content.meta.id)
                testElId = content.meta.id
            }
            return <Demo key={i} {...{ ...content, childrenSetCode, utils: props.utils, className: content.meta.id == curCodeDetails ? 'active' : '', location }} />
        })
    }
    useEffect(() => {
        // switchEl.current?.isActive = false // 
        setSwitchVal(false)
        setCode(null);
        // (document.querySelector('.Header') as any).classList.add('cmps')
    }, [location.pathname])
    useEffect(() => {
        switchEl.current.onChange = (is: Boolean, _: EventTarget) => {
            setStyle(_, {
                color: is ? '#fff' : '#000'
            })
            if (testElId) {
                setStyle($el('#' + testElId)[0], {
                    display: is ? 'block' : 'none'
                })
            } else Message.error('该组件暂无测试模块！')
        }
        switchEl.current.onClick = (is:boolean, context:EventTarget) => {
            setSwitchVal(!is);
        }
    }, [])
    return <div className='main'>
        <div className="menu">
            {getMenuItems()}
        </div>
        <div className="show-components">
            <h1>
                {props.index.meta.title} {props.index.meta.subTitle}
            </h1>
            <ComponentInMarkdown utils={props.utils} content={props.index.content}></ComponentInMarkdown>
            <h2><span>代码演示</span> <sp-switch inactive-text='开启调试' active-text='关闭调试' ref={switchEl} value={switchVal}></sp-switch></h2>
            {demo()}
            {props.utils.toReactComponent(
                [
                    'section',
                    {
                        className: 'markdown api-container',
                    },
                ].concat(getChildren(props.index.api || ['placeholder'])),
            )}
        </div>
        <div className={code !== null ? 'code active' : 'code'} ref={codeEl} >
            <CodeView toReactComponent={props.utils.toReactComponent} code={code} />
        </div>

    </div>
}

export default Content

export { Meta }