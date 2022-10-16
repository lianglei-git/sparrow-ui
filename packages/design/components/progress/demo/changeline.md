---
order: 3
title: 动态展示
---


## desc-cn 
会动的进度条才是好进度条。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
 <sp-progress percentage='30' id='progress1'></sp-progress>
 <sp-button onclick="decline()">-</sp-button>
 <sp-button onclick="increase()">+</sp-button>

 <script>
    window.increase = () => {
            if(+progress1['attr-percentage'] == 100) return
            progress1['attr-percentage'] = +progress1['attr-percentage']+10
    }
    window.decline = () => {
        if(+progress1['attr-percentage'] == 0) return
        progress1['attr-percentage'] = +progress1['attr-percentage']-10
    }
 </script>
```


```jsx
import React, { useState } from 'react'
const Test = () => {
    const [percentage, setpercentage] = useState(30)
    return <div>
    <h3>React: </h3>
    <div className='box'>
    <sp-button onClick={() => setpercentage(percentage == 0 ? 0 : percentage-10)}>-</sp-button>
    <sp-button onClick={() => setpercentage(percentage == 100 ? 100 : percentage+10)}>+</sp-button>
    <sp-progress percentage={percentage} text-inside='true' stroke-width='30' ></sp-progress>
    </div>
        
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