---
order: 1    
title: 基本操作
---



## desc-cn 
最简单的用法


```html
 <sp-backtop target='.show-components' bottom='150'></sp-backtop>      
```

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