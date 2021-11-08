---
order: 1
title: 基本用法
---


## desc-cn 
区域中的加载。
`status` 是控制是否加载中的“状态”,默认为 `true`

```html
<!-- HTML 中使用 -->
<h3>Html: 默认的basic</h3>
<div class='basic'>
    DOM
    <sp-loading></sp-loading>
</div>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <>
        <h3>React: 可以自定义的icon</h3>
        <div className='basic'>
            DOM
            <sp-loading icon='sp-icon-close'></sp-loading>
        </div>
    </>
}
ReactDOM.render(<Test />, mountNode)
```
<style>
    .basic {
        width: 700px;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center
    }
</style>