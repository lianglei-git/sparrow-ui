---
order: 1
title: 基本
---



## desc-cn 
概括。



```html
<h3>Html:</h3>
<sp-badge count="6" type="primary">
  <a ></a>
</sp-badge>
<sp-badge count="6" type="success">
  <a ></a>
</sp-badge>
<sp-badge count="6" type="normal">
  <a ></a>
</sp-badge>
<sp-badge count="6" type="info">
  <a ></a>
</sp-badge>
<sp-badge count="6" type="error">
  <a ></a>
</sp-badge>
<sp-badge count="6" type="warning">
  <a ></a>
</sp-badge>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [count, setcount] = useState(3)
    return <div className='box'>
    <h3>React:</h3>
        <sp-button onClick={() => setcount(count+10)}>+</sp-button>
        <sp-button onClick={() => setcount(count-10)}>-</sp-button>
        <br />    
        <sp-badge count={count}> <a></a></sp-badge>        
        <br />    
        <sp-badge count='0'> <a></a></sp-badge>       
        <br />    
        <sp-badge count='100'> <a></a></sp-badge>    
        <br />    
        <sp-badge text='厉害了'> <a></a></sp-badge>   
        <br />    
        <sp-badge dot='true'>red</sp-badge>    
        <br />    
        <sp-badge dot='true' color='orange'>orange</sp-badge>   
        <br />    
        <sp-badge dot='true' status='processing'>processing</sp-badge>   
        <br />    
        <sp-badge dot='true' status='warning'>warning</sp-badge>   
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

