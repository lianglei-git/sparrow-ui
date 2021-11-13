---
order: 2
title: 圆圈颜色
---
## desc-cn
圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态，灰色表示未完成或失效状态。

```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-timeline>
    <sp-timeline-item color='red'>Create a services site 2015-09-01</sp-timeline-item>
    <sp-timeline-item color='green'>Solve initial network problems 2015-09-01</sp-timeline-item>
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
            <sp-timeline-item color='gray'> section one</sp-timeline-item>  
            <sp-timeline-item color='yellow'> section two</sp-timeline-item>
        </sp-timeline>
    </>
}
ReactDOM.render(<Test />, mountNode)
```

