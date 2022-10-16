---
order: 6
title: 仪表盘
---


## desc-cn 
通过设置 type=dashboard，可以很方便地实现仪表盘样式的进度条



```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
 <sp-progress percentage='30' type='dashboard'></sp-progress>
```


```jsx
import React, { useState} from 'react'
const Test = () => {
    return <div>
    <h3>React: </h3>
     <sp-progress percentage='90' type='dashboard'></sp-progress>
    </div>
}
ReactDOM.render(<Test />, mountNode)
```

<style> 
.box {
    width: 200px;
}
.sp-progress {
    margin: 10px 0;
}
</style>