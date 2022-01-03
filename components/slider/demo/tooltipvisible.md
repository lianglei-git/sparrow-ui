---
order: 6
title: 控制 ToolTip 的显示
---


## desc-cn 
当 `tooltipvisible` 为 true 时，将始终显示 ToolTip；反之则始终不显示，即使在拖动、移入时也是如此。


```html
<div> 
    <h3>Html:</h3>
    <sp-slider tooltipvisible='true' default='10'></sp-slider>
    <sp-slider default='90' tooltipvisible='false'></sp-slider>
</div>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <div> 
        <h3>React:</h3>
        <sp-slider default={[10,50]} tooltipvisible={true}></sp-slider>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```


