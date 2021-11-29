---
order: 1
title: 基操
---


## desc-cn 
最简单的用法



```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
 <sp-progress percentage='30'></sp-progress>
```


```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [percentage, setpercentage] = useState(0)
    return <div>
    <h3>React: </h3>
    <div className='box'>
    <sp-progress percentage={30} text-inside='true' stroke-width='30' ></sp-progress>
    </div>
        
    </div>
}
ReactDOM.render(<Test />, mountNode)
```

<style> 
.box {
    width: 200px;
}
</style>