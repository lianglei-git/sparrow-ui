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
        <sp-affix offset-bottom='10' offset-top='64'></sp-affix>

    </div>
        
    </div>
}
ReactDOM.render(<Test />, mountNode)
```

<style> 
.box {
    height: 390px;
}
</style>