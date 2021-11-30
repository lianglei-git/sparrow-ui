---
order: 2
title: 进度圈

---


## desc-cn 
圈形的进度。



```html
<!-- HTML 中使用 -->
<h3>Html:圈形的进度。</h3>
 <sp-progress percentage='30' type='circle'  ></sp-progress>
 <sp-progress percentage='30' type='circle'   status='success'></sp-progress>
 <sp-progress percentage='30' type='circle'   status='error'></sp-progress>
```


```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [percentage, setpercentage] = useState(0)
    return <div>
    <h3>React: 圈形的进度。</h3>
    <div className='box'>
    <sp-progress percentage={30} type='circle'  stroke-width='30' ></sp-progress>
    <sp-progress percentage={30} type='circle'  stroke-width='4' ></sp-progress>
    </div>
        
    </div>
}
ReactDOM.render(<Test />, mountNode)
```

<style> 
.box {
    width: auto;
}
.sp-progress {
    margin: 10px 5px;
    display: inline-block;
}
</style>