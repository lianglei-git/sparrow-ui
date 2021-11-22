// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import './index.less'
import { Message } from 'sparrow-ui';
const Home = (props) => {
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
        './alert',
        './switch/index',
        './button/index',
        './drawer',
        './timeline',
        './breadcrumb',
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
        common: 'Common 公共样式'
    }

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
                if (myJson.status) {
                    location.href = 'http://localhost:8214/downfile'
                }
            }).catch(rej => {
                Message.error(rej, {
                    duration:0,
                    showclose: true
                })
            })
    }

    return <div className="custom">
        定制， 包括主题 和 自定义下载资源
        <div className='custom-components'>
            <h3>定制组件</h3>
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