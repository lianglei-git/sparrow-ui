// @ts-nocheck
import React, { createRef, useEffect, useState, useRef } from 'react';
import { Link, } from 'bisheng/router';
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
    const [metaId, setMetaId] = useState('')
    const switchEl = useRef(null)
    const codeEl = createRef<HTMLDivElement>()
    const to = ($$i: Meta) => {
        let toL = $$i.filename.split('/');
        let topath
        try {
            topath = props.$type == 'cmps' ? toL[0] + '/' + toL[1] + '/' : toL.join('/').slice(0, toL.join('/').indexOf('.md')) + '/';
        } catch (error) {
            topath = '/'
            throw Error('路由解析错误，请检查！ content--36')
        }
        [...$el('.temp_scripts')].map((i, idx) => {
            if (idx == 0) {
                [...$el('.children-modal')].map(i2 => i2?.remove())
            }
            i.remove()
        })
        return <Link to={topath}> {$$i.title} {$$i.subTitle}</Link>
    }

    const getMenuItems = () => {
        let components = new Array();
        if (props.$type == 'cmps') {
            let cdata = props.data.components;
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
                            order: props.themeConfig.typeOrder[_i?.meta?.type] || 9,
                            children: [_i?.meta]
                        }
                        components.push(type)
                    }
                }
            }
        } else if (props.$type == 'react') {
            let docs = props.data.docs[props.$type];
            let children = new Array()
            for (let k in docs) {
                let _i = docs[k];
                children.push(_i?.meta)
            }
            components.push({
                children,
                type: 'Docs'
            })
        }
        components = components.sort((a, b) => (a.order || 0) - (b.order || 0));

        return <ul>
            {
                components.map(item => {
                    return <li key={item.type}>
                        <p>{item.type}</p>
                        <ol>
                            {item.children.map((i2: Meta) => {
                                return <li
                                    key={i2.title}
                                    className={i2.filename.indexOf(location.pathname.slice(1, location.pathname.length -1)) > -1 ? 'active' : ''}
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
        setCode(_code)
    }

    const demo = () => {
        console.log(props)
        if (!props.demo) return <></>
        const demos = props.demo;
        const l = new Array();
        for (let [_, v] of Object.entries(demos)) {
            l.push(v)
        }
        let $l = l.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
        return $l.map((content, i) => {
            if (content.meta.id.indexOf('demo-test') > -1) {
                testElId = content.meta.id
            }
            return <Demo key={i} {...{ ...content, childrenSetCode, utils: props.utils, className: content.meta.id == curCodeDetails ? 'active' : '', location, metaId }} />
        })
    }
    useEffect(() => {
        // console.log($el('.temp_scripts'))
        testElId = 0
        setMetaId('')
        setSwitchVal(false)
        setCode(null);
        switchEl.current.style.color = '#000'
        switchEl.current.onChange = (is: Boolean, _: EventTarget) => {
            setStyle(_, {
                color: is ? '#fff' : '#000'
            })
            setMetaId(is ? 'components-' + props.params.children + '-demo-test' : '')
            if (!testElId) Message.error('该组件暂无测试模块！')
        }
        switchEl.current.onClick = (is: boolean, context: EventTarget) => {
            setSwitchVal(!is);
        }
    }, [location.pathname])
    return <div className='main'>
        <div className="menu">
            {getMenuItems()}
        </div>
        <div className="show-components">
            <div className="_cmps">
                <h1>
                    {props.$type == 'cmps' ? props.index.meta.title : props?.meta.title} {props.$type == 'cmps' ? props.index.meta.subTitle : props?.meta.subTitle}
                </h1>
                <ComponentInMarkdown utils={props.utils} content={props.$type == 'cmps' ? props.index.content : props?.content}></ComponentInMarkdown>
                {
                    props.$type == 'cmps' ?
                        <h2><span>代码演示</span> <sp-switch inactive-text='调试' active-text='关闭' ref={switchEl} value={switchVal}></sp-switch></h2>
                        : <div ref={switchEl}></div>
                }

                {demo()}
                {props.utils.toReactComponent(
                    [
                        'section',
                        {
                            className: 'markdown api-container',
                        },
                    ].concat(getChildren(props?.index?.api || ['placeholder'])),
                )}
            </div>
        </div>
        <div className={code !== null ? 'code active' : 'code'} ref={codeEl} >
            <div className="back" onClick={() => setCode(null)} dangerouslySetInnerHTML={{
                __html: `<svg class="icon" aria-hidden="true">
                <use xlink:href="#sp-icon-qianjin"></use>
            </svg>`}}></div>
            <CodeView toReactComponent={props.utils.toReactComponent} code={code} />
        </div>

    </div>
}

export default Content

export { Meta }