---
order: 7
title: 范围可拖拽
---


## desc-cn 
当 `draggabletrack` 为 true 时，使得范围刻度整体可拖拽。

```html
<div> 
    <h3>Html:</h3>
    <sp-slider draggabletrack='true' default='[10, 30]'></sp-slider>
</div>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    return <div> 
        <h3>React:</h3>
        <sp-slider default={[10,50]} draggabletrack={true}></sp-slider>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```


