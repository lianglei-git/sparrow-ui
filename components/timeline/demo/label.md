---
order: 4
title: 标签
---
## desc-cn

使用 `label` 标签单独展示时间。

```html
<!-- HTML 中使用 -->
<h3>Html: 可以更换整体的位置 </h3>
<sp-button onclick="labelTempOne['attr-mode'] = 'right'">mode: <b>right</b></sp-button>
<sp-button onclick="labelTempOne['attr-mode'] = 'left'">mode: <b>left</b></sp-button>
<sp-timeline mode='left' id='labelTempOne'>
    <sp-timeline-item>Create a services site 2015-09-01</sp-timeline-item>
    <sp-timeline-item label='2015-09-01'>Solve initial network problems</sp-timeline-item>
    <sp-timeline-item>Technical testing </sp-timeline-item>
    <sp-timeline-item  label='2015-09-01'>Network problems being solved</sp-timeline-item>
</sp-timeline>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [mode, setMode] = useState('left');
    const [position, setposition] = useState();
    return <>
        <h3>React: 你可以操作label，或者强制变更某元素的位置，不受mode影响</h3>
        <sp-button onClick={() => setMode('left')}>left</sp-button>
        <sp-button onClick={() => setMode('right')}>right</sp-button>
        <sp-button onClick={() => setposition('right')}>第三条固定右侧</sp-button>
        <sp-timeline mode={mode}>
            <sp-timeline-item>Create a services site 2015-09-01</sp-timeline-item>
            <sp-timeline-item label='2015-09-01'>Solve initial network problems</sp-timeline-item>
            <sp-timeline-item position={position}>Technical testing </sp-timeline-item>
            <sp-timeline-item  label='2015-09-01'>Network problems being solved</sp-timeline-item>
        </sp-timeline>
    </>
}
ReactDOM.render(<Test />, mountNode)
```

