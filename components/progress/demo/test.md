---
order: 0
title: 测试板块
---


## desc-cn 
测试咯

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [percentage, setpercentage] = useState(0)
    return <div>
    <div className='box'>
    <sp-button onClick={() => setpercentage(percentage-10)}>-</sp-button>
    <sp-button onClick={() => setpercentage(percentage+10)}>+</sp-button>
    <sp-progress percentage={percentage}></sp-progress>
    <sp-progress percentage={percentage} text-inside='true' stroke-width='30'></sp-progress>

    <sp-progress percentage={percentage} type='circle' stroke-width='4'></sp-progress>
    <sp-progress percentage={percentage} color={percentage > 60 ? 'red' : percentage > 30 ? 'green': 'blue'} type='dashboard' stroke-width='4'></sp-progress>
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