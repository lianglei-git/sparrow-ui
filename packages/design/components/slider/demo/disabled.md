---
order: 2
title: 不可以使用
---


## desc-cn 
测试咯

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const switchEl = useRef();
    const dd = useRef();
    useEffect(() => {
        switchEl.current.onChange = (v) => {
            dd.current['attr-disabled'] = v
        }
    }, [])
    return <div> 
        <div style={{display:'flex',alignItems:'center'}}>disabled：<sp-switch ref={switchEl}  default-checked="true"></sp-switch></div>
        <sp-slider default={90} disabled='true' ref={dd}></sp-slider>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```