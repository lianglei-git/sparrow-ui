---
order: 1
title: 基础使用
---


## desc-cn 
基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。

```html
<!-- HTML 中使用 -->
<h3>Html:  </h3>
<sp-button onclick='drawer1["attr-visible"] = "true"' type='primary'>Open</sp-button>
<sp-drawer title='Basic Drawer' id='drawer1'>
    <div slot='content'> 
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </div>
</sp-drawer>
<script>
    drawer1.onClose = () => drawer1["attr-visible"] = "false"
</script>
```

```jsx
// React 中使用
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
        <sp-drawer visible={visible} title='Basic Drawer' ref={cur}>
            <div slot='content'> 
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </div>
        </sp-drawer>
    </>
}
ReactDOM.render(<Test />, mountNode)
```