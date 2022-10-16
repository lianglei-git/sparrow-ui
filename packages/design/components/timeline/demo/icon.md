---
order: 3
title: 自定义时间轴点
---
## desc-cn

可以设置为图标或其他自定义元素。

```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-button onclick="addLabel['attr-label']='time'">添加label</sp-button>
<sp-timeline>
    <sp-timeline-item>Create a services site 2015-09-01</sp-timeline-item>
    <sp-timeline-item icon="sp-icon-warning" id="addLabel">Solve initial network problems 2015-09-01</sp-timeline-item>
    <sp-timeline-item>Technical testing 2015-09-01</sp-timeline-item>
</sp-timeline>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <>
        <h3>React: </h3>
        <sp-timeline>
            <sp-timeline-item icon="sp-icon-error">
            Solve initial network problems 1<br />

            Solve initial network problems 2<br />

            Solve initial network problems 3 2015-09-01
        </sp-timeline-item>  
            <sp-timeline-item icon="sp-icon-success">Network problems being solved 2015-09-01</sp-timeline-item>
        </sp-timeline>
    </>
}
ReactDOM.render(<Test />, mountNode)
```

