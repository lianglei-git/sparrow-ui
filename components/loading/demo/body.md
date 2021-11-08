---
order: 4
title: 全局使用
---


## desc-cn 
整页加载
`fullscreen` 字段

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-button onclick="loading1['attr-status'] = 'true'; setTimeout(() => { loading1['attr-status'] = 'false' },3000)">全局加载</sp-button>
    <sp-loading id='loading1' fullscreen='true' status='false'></sp-loading>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
import {Loading} from 'sparrow-ui'
const Test = () => {
    return <>
        <h3>React: </h3>
        <sp-button onClick={() => {
            let rs = Loading.config({
                fullscreen: true,
                text: '全局界定',
                status: true
            });
            setTimeout(rs.close,3000)
        }}>服务方式</sp-button>
    </>
}
ReactDOM.render(<Test />, mountNode)
```