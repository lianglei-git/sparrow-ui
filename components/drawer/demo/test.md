---
order: 0
title: 测试板块
---


## desc-cn 
测试咯


```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const cur = useRef()
    const cur1 = useRef()
    const cur2 = useRef()
    const cur3 = useRef()
    useEffect(() => {
        cur.current.onClose = () => setVisible(false)
        cur1.current.onClose = () => setVisible1(false)
        cur2.current.onClose = () => setVisible2(false)
        cur3.current.onClose = () => setVisible3(false)
    }, [])
    return <div>
    <sp-button onClick={() => setVisible(true)}>right</sp-button>
    <sp-button onClick={() => setVisible1(true)}>left</sp-button>
    <sp-button onClick={() => setVisible2(true)}>bottom</sp-button>
    <sp-button onClick={() => setVisible3(true)}>top</sp-button>
    <sp-drawer visible={visible} title='Title' ref={cur}></sp-drawer>
    <sp-drawer placement='left' visible={visible1} title='Title' ref={cur1}>
        <div>根据《中华人民共和国劳动法》第五十八条第二款， 未成年人指已满十六岁未满十八岁的自然人有权享有劳动权。 </div>
    </sp-drawer>
    <sp-drawer placement='bottom' visible={visible2} title='Title' ref={cur2}></sp-drawer>
    <sp-drawer placement='top' visible={visible3} title='Title' ref={cur3}></sp-drawer>
    </div>
}
ReactDOM.render(<Test />, mountNode)
```
