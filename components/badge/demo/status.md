---
order: 2
title: 状态
---



## desc-cn 
用于表示状态的小圆点。



```html
<h3>Html:</h3>
<sp-badge dot="true" status="success"></sp-badge>
<sp-badge dot="true" status="error"></sp-badge>
<sp-badge dot="true" status="default"></sp-badge>
<sp-badge dot="true" status="processing"></sp-badge>
<sp-badge dot="true" status="warning"></sp-badge>
<sp-badge dot="true" status="error"></sp-badge>
<br />
<sp-badge dot="true" status="success" >success</sp-badge>
<br />
<sp-badge dot="true" status="error" >error</sp-badge>
<br />
<sp-badge dot="true" status="default" >default</sp-badge>
<br />
<sp-badge dot="true" status="processing" >processing</sp-badge>
<br />
<sp-badge dot="true" status="warning" >warning</sp-badge>
<br />
<sp-badge dot="true" status="error" >error</sp-badge>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [count, setcount] = useState(3)
    return <div className='box'>
    <h3>React:</h3>
            <sp-badge dot="true" status="success"></sp-badge>
            <sp-badge dot="true" status="error"></sp-badge>
            <sp-badge dot="true" status="default"></sp-badge>
            <sp-badge dot="true" status="processing"></sp-badge>
            <sp-badge dot="true" status="warning"></sp-badge>
            <sp-badge dot="true" status="error"></sp-badge>
            <br />
            <sp-badge dot="true" status="success" >success</sp-badge>
<br />
            <sp-badge dot="true" status="error" >error</sp-badge>
<br />
            <sp-badge dot="true" status="default" >default</sp-badge>
<br />
            <sp-badge dot="true" status="processing" >processing</sp-badge>
<br />
            <sp-badge dot="true" status="warning" >warning</sp-badge>
<br />
            <sp-badge dot="true" status="error" >error</sp-badge> 
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

