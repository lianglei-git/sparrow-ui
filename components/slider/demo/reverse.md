---
order: 11
title: 反方向的slider
---


## desc-cn 
设置 `reverse` 可以将滑动条置反。

```html
<div> 
    <h3>Html:</h3>
    <sp-slider default='[10, 30]' reverse='true' tooltipvisible='true' ></sp-slider>
    <sp-slider default='15' reverse='true'></sp-slider>
</div>
```

```jsx
import React, { useState, useEffect, useRef } from 'react';
const Test = () => {
    return <div> 
        <h3>React:</h3>
        <div style={{height:'300px', display:'flex'}}>
            <sp-slider default={[10,50]} vertical='true' reverse='true'></sp-slider>
            <sp-slider default={[10]} vertical='true' reverse='true'></sp-slider>
        </div>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```


