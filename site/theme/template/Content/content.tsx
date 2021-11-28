// @ts-nocheck
import React, { createRef, useEffect, useState, useRef } from 'react';
import { Link, } from 'bisheng/router';
import Demo from './Demo';
import CodeView from './Demo/CodePreView'
import { getChildren } from 'jsonml.js/lib/utils';
import { Message } from 'sparrow-ui'
import raf from 'sparrow-ui/_utils/raf'
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
let testElId = 0
const Content = (props: any) => {
    const [code, setCode] = useState<Object | any>(null);
    const [curCodeDetails, setCodeDetails] = useState('');
    const [showCode, setshowCode] = useState(false);
    const [metaId, setMetaId] = useState('')
    const switchEl = useRef(null)
    const [affixList, setAffixList] = useState(new Array());
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
                                    className={i2.filename.indexOf(location.pathname.slice(1, location.pathname.length - 1)) > -1 ? 'active' : ''}
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

    const sortDemos = () => {
        if (!props.demo) return []
        const demos = props.demo;
        const l = new Array();
        for (let [_, v] of Object.entries(demos)) {
            l.push(v)
        }
        return l.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
    }
    function clearActiveToc() {
        [].forEach.call(document.querySelectorAll('.fixed-content li a'), node => {
            node.className = '';
        });
    }
    const demo = () => {
        if (!props.demo) return <></>
        let $l = sortDemos();
        return $l.map((content, i) => {
            if (content.meta.id.indexOf('demo-test') > -1) {
                testElId = content.meta.id
            }
            return <Demo key={i} {...{ ...content, childrenSetCode, utils: props.utils, className: content.meta.id == curCodeDetails ? 'active' : '', location, metaId }} />
        })
    }

    function updateActiveToc(id) {
        const currentNode = document.querySelectorAll(`.fixed-content li a[href="#${id}"]`)[0];
        if (currentNode) {
            clearActiveToc()
            currentNode.className = 'current';
        }
    }
    function scroller() {
        let i = 0;
        const handler = () => {
            if (i < 10) {
                i++;
                return
            }
            i = 0;
            let lists = document.querySelectorAll('.preview');
            let filter = [...lists].filter((item: HTMLElement) => {
                let top = item.getBoundingClientRect().top
                return top > 0
            })
            filter[0] && updateActiveToc(filter[0].id)
        }
        window.addEventListener('scroll', handler, true)
    }
    useEffect(() => {
        testElId = 0
        setMetaId('')
        setshowCode(false)
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
            setshowCode(!is);
        };

        let $l = sortDemos()
        let _affixList = new Array();
        $l.map(i => {
            _affixList.push(i.meta)
        })
        _affixList.push({
            title: 'API',
            id:'API'
        })
        setAffixList(_affixList);

        window.addEventListener('hashchange', () => {
            updateActiveToc(window.location.hash.replace(/^#/, ''))
        })

        setTimeout(() => updateActiveToc(window.location.hash.replace(/^#/, '')))
        scroller()

    }, [location.pathname])
    return <div className='main'>
        <div className="menu">
            {/* <sp-affix offset-top='84'>  */}
            {getMenuItems()}
            {/* </sp-affix> */}
        </div>
        <div className="show-components">
            <div className="_cmps">
                <h1>
                    {props.$type == 'cmps' ? props.index.meta.title : props?.meta.title} {props.$type == 'cmps' ? props.index.meta.subTitle : props?.meta.subTitle}
                </h1>
                <ComponentInMarkdown utils={props.utils} content={props.$type == 'cmps' ? props.index.content : props?.content}></ComponentInMarkdown>
                {
                    props.$type == 'cmps' ?
                        <h2><span>代码演示</span> <sp-switch inactive-text='调试' active-text='关闭' ref={switchEl} value={showCode}></sp-switch></h2>
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
                <div className='fixed-content'>
                    <sp-affix offset-top="74" >
                        <ul>
                            {
                                affixList.map((meta, index) => {
                                    return <li key={meta.id} style={{ display: !showCode && meta.id.indexOf('demo-test') > -1 ? 'none' : 'block' }}>
                                        <a href={'#' + meta.id}> {meta.title} </a>
                                    </li>
                                })
                            }
                        </ul>
                    </sp-affix>
                </div>
            </div>


        </div>
        <div className={code !== null ? 'code active' : 'code'} ref={codeEl} >
            <div className="back" onClick={() => setCode(null)} dangerouslySetInnerHTML={{
                __html: `<svg class="icon" aria-hidden="true">
                <use xlink:href="#sp-icon-qianjin"></use>
            </svg>`}}></div>
            <CodeView toReactComponent={props.utils.toReactComponent} code={code} />
        </div>
        {/* <div className={code !== null ? 'place active' : 'place'}>
        <CodeView toReactComponent={props.utils.toReactComponent} code={code} />

        </div> */}
        <sp-backtop target='.show-components'></sp-backtop>        
    </div>
}

export default Content

export { Meta }