---
order: 2
title: 可以控制方向的
---


## desc-cn 
自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭。

```html
<!-- HTML 中使用 -->
<h3>Html:  </h3>
<sp-button onclick='drawer2["attr-placement"] = "left";drawer2["attr-visible"] = "true"' type='primary'>左</sp-button>
<sp-button onclick='drawer2["attr-placement"] = "right";drawer2["attr-visible"] = "true"' type='primary'>右</sp-button>
<sp-drawer title='Basic Drawer' id='drawer2'>
    <div slot='content'> 
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </div>
</sp-drawer>
<script>
    drawer2.onClose = () => drawer2["attr-visible"] = "false"
</script>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [visible, setVisible] = useState(false)
    const [placement, setPosition] = useState('top')
    const cur = useRef()
     useEffect(() => {
        cur.current.onClose = () => setVisible(false)
    }, [])
    return <>
        <h3>React: 方式基本是一样的</h3>
        <sp-button onClick={() => {setVisible(true);setPosition('top') }} type='primary'>上</sp-button>
        <sp-button onClick={() => {setVisible(true);setPosition('bottom')}} type='primary'>下</sp-button>
        <sp-drawer visible={visible} placement={placement} title='Basic Drawer' ref={cur}>
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