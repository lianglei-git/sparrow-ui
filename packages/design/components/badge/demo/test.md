---
order: 0
title: 测试板块
---



## desc-cn 
测试咯

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [count, setcount] = useState(3)
    return <div className='box'>
    <sp-button onClick={() => setcount(count+10)}>+</sp-button>
    <sp-button onClick={() => setcount(count-10)}>-</sp-button>
        <sp-badge count={count}> <a></a></sp-badge>        
        <sp-badge count='0'> <a></a></sp-badge>        
        <sp-badge count='100'> <a></a></sp-badge>        
        <sp-badge text='牛逼'> <a></a></sp-badge>    
        <sp-badge dot='true'>red</sp-badge>    
        <sp-badge dot='true' color='orange'>red</sp-badge>    
        <sp-badge dot='true' status='processing'>processing</sp-badge>    
    </div>
}
ReactDOM.render(<Test />, mountNode)
```

<style> 
sp-badge{
    margin-right:25px;
}
sp-badge > a {
      width: 42px;
    height: 42px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
}
</style>