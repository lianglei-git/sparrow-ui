---
order: 3
title: 禁用属性
---

## desc-cn 
禁用状态，不可修改其值，可以点击。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-switch disabled="true"></sp-switch>
```

```jsx
import {Message} from 'sparrow-ui'
import React, { useState, useRef, useEffect } from 'react'
const Switchs = () => {
    const [disabled,setdisabled] = useState('false');
    const switchone = useRef()
    
    useEffect(() => {
        switchone.current.onClick = (cur, context) => {
            cur && Message.error('已禁用')
        }
        switchone.current.onChange = (cur, context) => {
            cur && setdisabled(true)
        }
    },[])
    
    return <>
            <h3>React:</h3>
            <sp-switch 
            inactive-text="打开后不可关闭" 
            disabled={disabled}
            ref={switchone}
            ></sp-switch>
            <sp-switch default-checked="true" disabled="true"></sp-switch>
           </>
}
ReactDOM.render(<Switchs />, mountNode);

```
