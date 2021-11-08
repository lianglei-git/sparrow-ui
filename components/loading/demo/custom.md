---
order: 2
title: 自定义
---


## desc-cn 
可自定义加载文案、图标和背景色。

```html
<!-- HTML 中使用 -->
<h3>Html: 自定义icon、文案</h3>
<div class='basic'>
    DOM
    <sp-loading icon='sp-icon-close' text="自定义"></sp-loading>
</div>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <>
        <h3>React: 自定义background</h3>
        <div className='basic'>
            DOM
            <sp-loading background='raba(0,89,27,.8)'></sp-loading>
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