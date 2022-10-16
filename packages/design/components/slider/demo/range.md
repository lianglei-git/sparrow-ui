---
order: 8
title: 双滑块
---


## desc-cn 
当 default 为2个时，渲染为双滑块


```html
<div> 
    <h3>Html:</h3>
    <sp-slider default='[10, 30]'></sp-slider>
</div>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <div> 
        <h3>React:</h3>
        <sp-slider default={[10,50]} ></sp-slider>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```


