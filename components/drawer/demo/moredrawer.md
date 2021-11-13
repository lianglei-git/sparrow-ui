---
order: 4
title: 多层抽屉
---


## desc-cn 
在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

```html
<!-- HTML 中使用 -->
<h3>Html:  </h3>
<sp-button onclick='drawer4["attr-visible"] = "true"' type='primary'>Open</sp-button>
<sp-drawer title='Basic Drawer' id='drawer4'>
    <div slot='content'> 
       <sp-button onclick='drawer5["attr-visible"] = "true"' type='primary'>Open</sp-button>
    </div>
</sp-drawer>
<sp-drawer title='Basic Drawer' id='drawer5' width='30%'>
    <div slot='content'> 
       <sp-button onclick='drawer6["attr-visible"] = "true"' type='primary'>Open</sp-button>
    </div>
</sp-drawer>
<sp-drawer title='Basic Drawer' id='drawer6' width='20%'>
    <div slot='content'> 
       本根
    </div>
</sp-drawer>
<script>
    drawer4.onClose = () => drawer4["attr-visible"] = "false"
    drawer5.onClose = () => drawer5["attr-visible"] = "false"
    drawer6.onClose = () => drawer6["attr-visible"] = "false"
</script>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const cur1 = useRef()
    const cur2 = useRef()
    const cur3 = useRef()
     useEffect(() => {
        cur1.current.onClose = () => setVisible1(false)
        cur2.current.onClose = () => setVisible2(false)
        cur3.current.onClose = () => setVisible3(false)
    }, [])
    return <>
        <h3>React: 方式基本是一样的</h3>
        <sp-button onClick={() => setVisible1(true)} type='primary'>open</sp-button>
        <sp-drawer visible={visible1} title='10岁' ref={cur1}>
            <div slot='content'> 
                10岁
            <sp-button onClick={() => setVisible2(true)} type='primary'>下一层</sp-button>
            </div>
        </sp-drawer>
        <sp-drawer visible={visible2} title='20岁' ref={cur2} width='30%'>
            <div slot='content'> 
                20岁
            <sp-button onClick={() => setVisible3(true)} type='primary'>下一层</sp-button>
            </div>
        </sp-drawer>
        <sp-drawer visible={visible3} title='30岁' ref={cur3} width='20%'>
            <div slot='content'> 
                30岁
            </div>
        </sp-drawer>
    </>
}
ReactDOM.render(<Test />, mountNode)
```