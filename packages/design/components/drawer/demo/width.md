---
order: 5
title: 自定义宽度
---


## desc-cn 
默认40%

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [visible, setVisible] = useState(false)
    const cur = useRef()
     useEffect(() => {
        cur.current.onClose = () => setVisible(false)
    }, [])
    return <>
        <h3>React: 方式基本是一样的</h3>
        <sp-button onClick={() => setVisible(true)} type='primary'>open</sp-button>
        <sp-drawer visible={visible} width="777px" title='Basic Drawer' ref={cur}>
            <div slot='content'> 
                777px
            </div>
        </sp-drawer>
    </>
}
ReactDOM.render(<Test />, mountNode)
```
