---
order: 3
title: 自定义提示
---


## desc-cn 
你可以自定义提示后缀。
`target.tipFormatter(value)`
`属性 tip-formatter`

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const demo = useRef();
    useEffect(() => {
        demo.current.tipFormatter = value => value+'*'
    }, [])
    return <div> 
        <sp-slider default={90} tip-formatter='%'></sp-slider>
        <sp-slider default={90} ref={demo}></sp-slider>
        
    </div>
}
ReactDOM.render(<Test />, mountNode)

```