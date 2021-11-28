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
    return <div className='box'>
    划一划 看右下角
        <sp-backtop target='.show-components'></sp-backtop>        
        <sp-backtop target='.show-components' bottom='100'>上去</sp-backtop>        
    </div>
}
ReactDOM.render(<Test />, mountNode)
```

<style> 
.box {
    height: 1000px;
}
</style>