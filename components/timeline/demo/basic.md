---
order: 1
title: 基本用法
---
## desc-cn

基本的时间轴。

```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-timeline>
    <sp-timeline-item>Create a services site 2015-09-01</sp-timeline-item>
    <sp-timeline-item>Solve initial network problems 2015-09-01</sp-timeline-item>
    <sp-timeline-item>Technical testing 2015-09-01</sp-timeline-item>
    <sp-timeline-item>Network problems being solved 2015-09-01</sp-timeline-item>
</sp-timeline>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <>
        <h3>React: </h3>
        <sp-timeline>
            <sp-timeline-item>
            Solve initial network problems 1<br />

            Solve initial network problems 2<br />

            Solve initial network problems 3 2015-09-01
        </sp-timeline-item>  
            <sp-timeline-item>Network problems being solved 2015-09-01</sp-timeline-item>
        </sp-timeline>
    </>
}
ReactDOM.render(<Test />, mountNode)
```

