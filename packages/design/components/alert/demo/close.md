---
order: 3
title: 自定义关闭按钮
---


## desc-cn
自定义关闭按钮为文字或其他符号

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-alert title='不可关闭的 alert' effect="dark"> </sp-alert>
<sp-alert title='自定义 close-text' type='info' closable='true' effect="dark" close-text='了解'> </sp-alert>

```


```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Alert = () => {
    let alertone = useRef()
    useEffect(() => {
        alertone.current.close = () => {
            return new Promise(res => {
                setTimeout(() => {
                    Spui.Message.success('异步回调哦')
                    res()
                }, 1000)
            })
        }
    }, [])
    return <div> 
        <sp-alert title='设置了异步回调的 alert' ref={alertone} type='warning' effect="dark"  closable='true'> </sp-alert>
    </div>
}

ReactDOM.render(<Alert />, mountNode);

```

<style>
    sp-alert{
        margin-bottom:10px !important
    }
</style>