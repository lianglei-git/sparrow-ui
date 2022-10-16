---
order: 9
title: 带标签的滑块
---


## desc-cn 
使用 marks 属性标注分段式滑块，使用 default 指定滑块位置

```html
<div> 
    <h3>Html:</h3>
    <sp-slider default='[10, 30]' tooltipvisible='true' marks='{"20": "20°C", "87": "87°C"}'></sp-slider>
</div>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <div> 
        <h3>React:</h3>
        <sp-slider default={[10,50]} marks='{"20": "20°C", "87": "87°C"}'></sp-slider>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```


