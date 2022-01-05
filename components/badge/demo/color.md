---
order: 3    
title: 颜色
---



## desc-cn 
自定义颜色



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

