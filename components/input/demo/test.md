---
order: 0
title: 测试板块
---

## desc-cn 
测试咯

```jsx
import {useState, useEffect, useRef} from 'react'
const Demo = () => {
    const demo = useRef();
    useEffect(() => {
        demo.current.onChange = value => {
            console.log(value)
        }
    })
    return <div>
    <sp-button onClick={() => {
        demo.current.focus({cursor:'start'})
    }}>光标置前</sp-button>
    <sp-input size='large' ref={demo}></sp-input>
    <sp-input allow-clear='true'></sp-input>
    <sp-input allow-clear='true' size='small'></sp-input>
    <sp-input size='large' placeholder='这是一个带有前缀的输入框' prefix='sp-icon-rmb' ></sp-input>
    <sp-input size='large' prefix='sp-icon-rmb' placeholder='这是一个带有前缀后缀的输入框1'  suffix='<span>RMB</span>'></sp-input>
    <sp-input size='large' addon-before='Https://'  addon-after='.com' prefix='sp-icon-rmb' placeholder='这是一个带有前缀后缀的输入框2'  suffix='<span>RMB</span>' allow-clear='true'></sp-input>

    <sp-input size='large' addon-before='Https://'  addon-after='.com' prefix='sp-icon-rmb' placeholder='这是一个带有前缀后缀的输入框2'  suffix='<span>RMB</span>' allow-clear='true'></sp-input>

    <sp-input size='small' disabled='true' addon-before='Https://'  addon-after='.com' prefix='sp-icon-rmb' placeholder='这是一个带有前缀后缀的输入框2'  suffix='<span>RMB</span>' allow-clear='true'></sp-input>

    <sp-input size='large' addon-before='Https://'   placeholder='这是一个带有前缀后缀的输入框3' ></sp-input>

    <sp-input size='large' addon-after='.com' placeholder='这是一个有后安排的'  ></sp-input>

    <sp-input size='large' bordered='true' addon-before='Https://' prefix='sp-icon-rmb'  addon-after='.com' placeholder='这是一个没有边框的'  ></sp-input>

    

    <sp-input id='spInPuy' placeholder='这是一个带有前后缀tips的输入框' size='large' prefix='sp-icon-rmb' suffix='<sp-tooltip get-popup-container="#spInPuy" title="提示咯"><span class="sp-icon sp-icon-info"></span></sp-tolltip>'></sp-input>
    <sp-input id='spInPuy' placeholder='这是一个带有前后缀tips的输入框' size='small' prefix='sp-icon-rmb' suffix='<sp-tooltip get-popup-container="#spInPuy" title="提示咯"><span class="sp-icon sp-icon-info"></span></sp-tolltip>'></sp-input>
    <sp-input placeholder='这是一个带有前后缀tips的输入框' size='small' disabled='true' prefix='sp-icon-rmb' suffix='<sp-tooltip get-popup-container="#spInPuy" title="提示咯"><span class="sp-icon sp-icon-info"></span></sp-tolltip>'></sp-input>

    <sp-input show-count='true' value='我是默认的文字哦' max-length='30'></sp-input>
    <sp-input show-count='true' value='我是默认的文字哦' ></sp-input>
    <sp-input show-count='true' value='我是默认的文字哦' max-length='30' allow-clear='true'></sp-input>

    
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    .sp-input {
        margin-top: 20px
    }
</style>