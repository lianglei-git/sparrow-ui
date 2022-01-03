---
order: 10
title: 垂直
---


## desc-cn 
垂直方向的 Slider。

```html
<div> 
    <h3>Html:</h3>
    <div style='height:300px'> <sp-slider default='[10, 30]' vertical='true' tooltipvisible='true'></sp-slider></div>
</div>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <div> 
        <h3>React:</h3>
        <div style={{height:'300px', display:'flex'}}>
            <sp-slider default={[10,50]} vertical='true'></sp-slider>
            <sp-slider default={[10]} vertical='true'></sp-slider>
        </div>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```


