---
order: 3
title: 渲染在当前 DOM
---


## desc-cn 
渲染在当前 dom 里。查看 fullscreen

```html
<!-- HTML 中使用 -->
<h3>Html:  </h3>
<div style='width:400px;height:200px'>
    <sp-button onclick='drawer3["attr-visible"] = "true"' type='primary'>Open</sp-button>
    <sp-drawer title='Basic Drawer' fullscreen='false' id='drawer3'>
        <div slot='content'> 
            <p>Some contents...</p>
        </div>
    </sp-drawer>
</div>

<script>
    drawer3.onClose = () => drawer3["attr-visible"] = "false"
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
    return <div style={{width:'400px',height:'200px'}}>
        <h3>React: 方式基本是一样的</h3>
        <sp-button onClick={() => setVisible(true)} type='primary'>open</sp-button>
        <sp-drawer visible={visible} title='Basic Drawer' fullscreen='false' ref={cur}>
            <div slot='content'> 
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </div>
        </sp-drawer>
    </div>
}
ReactDOM.render(<Test />, mountNode)
```