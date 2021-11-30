---
order: 7
title: 圆角/方角边缘
---


## desc-cn 

通过设定 strokeLinecap="square|round" 可以调整进度条边缘的形状。



```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
 <sp-progress percentage='75'  stroke-linecap='butt' type='circle' ></sp-progress>
 <sp-progress percentage='88' stroke-linecap='butt' show-info='false' type='dashboard'></sp-progress>
``` 


```jsx
import React from 'react'
const Test = () => {
    return <div>
    <h3>React: </h3>
 <sp-progress percentage='75'  stroke-linecap='butt' ></sp-progress>
        
    </div>
}
ReactDOM.render(<Test />, mountNode)
```