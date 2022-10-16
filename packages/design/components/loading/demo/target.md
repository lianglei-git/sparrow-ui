---
order: 3
title: 目标元素
---


## desc-cn 
可自定义目标元素。

```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-button onclick="loading['attr-target'] = '#target2'">换到上面</sp-button>
<div class='target' id="target1">
    DOM
    <sp-loading background="hsla(50%,30%,60%,.9)" text="自定义" id="loading"></sp-loading>
</div>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <>
        <h3>React: </h3>
        <sp-button onClick={() => loading['attr-target'] = '#target1'}>换到下面</sp-button>
        <div className='target'  id="target2">
            DOM
        </div>
    </>
}
ReactDOM.render(<Test />, mountNode)
```
<style>
    .target {
        width: 700px;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center
        
    }
</style>