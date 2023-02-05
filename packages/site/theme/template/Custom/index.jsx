// @ts-nocheck
import React, { useState, useRef } from 'react'
import { Collapse, CollapsePanel } from 'design/components/loader-react'
import './index.less';
import TouchRipple from 'design/components/common/Ripple/use-react'
let Message = (() => { })
if (typeof window !== 'undefined') {
    Message = window?.Spui?.Message
}
let components = [
    // {
    //     path: './_utils/common',
    //     $export: 'getGlobalThis, sto'
    // },
    {
        path: './message',
        $export: 'Message'
    },
    {
        path: './loading',
        $export: 'Loading'
    },
    {
        path: './notification',
        $export: 'Notify'
    },
    {
        path: './modal',
        $export: 'Modal'
    },
    './common/styles',
    './drawer',
    './switch',
    './alert',
    './button',
    './timeline',
    './breadcrumb',
    './progress',
    './affix',
    './backtop',
    './tooltip',
    './popover',
    './pop-confirm',
    './slider',
    './avatar',
    './badge',
    './card',
    './collapse',
    './divider',
    './input',
    './search',
    './password',
    './textarea',
    './InputNumber',
    './checkbox',
    './radio',
    './custom-tc-brands'
];
let adapter = {
    breadcrumb: 'Breadcrumb 面包屑',
    timeline: 'Timeline 时间轴',
    drawer: 'Drawer 抽屉',
    button: 'Button 按钮',
    switch: 'Switch 开关',
    alert: 'Alert 警告',
    loading: 'Loading 加载中',
    modal: 'Modal 弹窗',
    notification: 'Notification 通知',
    message: 'Message 提示',
    common: 'Common 公共样式',
    progress: 'Progress 进度条',
    affix: 'Affix 固钉',
    backtop: 'Backtop 回到顶部',
    tooltip: 'Tooltip 文字提示',
    popover: 'Popover 气泡卡片',
    'pop-confirm': 'Popconfifirm 气泡确认框',
    slider: 'Slider 滑动输入条',
    avatar: 'Avatar 头像',
    badge: 'Badge 徽标数',
    card: 'Card 卡片',
    collapse: 'Collapse 折叠面板',
    divider: 'Divider 分割线',
    input: 'Input 输入框',
    search: 'Search 搜索框',
    password: 'Password 密码框',
    textarea: 'Textarea 文本域',
    InputNumber: 'InputNumber 数字输入框',
    checkbox: 'Checkbox 多选框',
    radio: 'Radio 单选框',
    'custom-tc-brands': 'TcBrands 定制选级',
}
const Home = (props) => {
    return <>暂时下架</>
    const target = useRef(null);
    let [scaleStyle, setScaleStyle] = useState({})
    let [checked, setChecked] = useState([]);
    const downCustomCom = () => {
        let entryContent = `import { getGlobalThis } from './_utils/common'\n`;
        let filterArr = components.filter(i => {
            let path = i?.path || i;
            return checked.includes(path)
        });
        let _exports = `{\n`
        filterArr.map(i => {
            if (i.$export) {
                entryContent += `import {${i.$export}} from '${i.path}'\n`;
                _exports += '  ' + i.$export + ',\n'
                return
            }
            entryContent += `import '${i}'\n`
        })
        _exports += '}\n'
        entryContent += `const Spui = ${_exports} \n`
        entryContent += `getGlobalThis().Spui = Spui; \nexport default Spui\n\n`
        entryContent += `export ${_exports} \n`;
        fetch('http://localhost:8214/build', {
            body: JSON.stringify({ content: entryContent }),
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                Message.success('打包成功，即将下载...')
                if (myJson.status && typeof window != 'undefined') {
                    location.href = 'http://localhost:8214/downfile'
                }
            }).catch(rej => {
                Message.error(rej, {
                    duration: 0,
                    showclose: true
                })
            })
    }

    return <div className="custom">
        {/* 

     <Collapse  type="vertical" active-index='2'>
        <CollapsePanel  index='1' title='This is panel header 1'>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
        </CollapsePanel>
        <CollapsePanel  index='2' title='This is panel header 2'>
            <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
            </div>
        </CollapsePanel>
    </Collapse> */}
        <TouchRipple target={target} />



        定制， 包括主题 和 自定义下载资源
        <div className='custom-components'>
            <h3 ref={target} style={{userSelect: 'none'}}>定制组件</h3>
            <ul>
                {components.map((i, idx) => {
                    let path = i?.path || i
                    let cmp = path.split('/')
                    return (
                        <li key={idx} onClick={
                            () => {
                                checked.includes(path) ? setChecked([...checked].filter(i => i !== path)) : setChecked([...checked, path])
                            }
                        }>
                            <em className={checked.includes(path) ? 'active' : ''}></em>
                            <span>{adapter[cmp[1]]}</span>
                        </li>
                    )
                })}
            </ul>
            <sp-button type='primary' onClick={downCustomCom}>开始下载</sp-button>
        </div>
    </div>
}
export default Home                 