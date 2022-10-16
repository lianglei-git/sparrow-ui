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
    const [visible4, setVisible4] = useState(false)
    const [visible6, setVisible6] = useState(false)
    const [visible7, setVisible7] = useState(false)
    const [visible8, setVisible8] = useState(false)
    const cur = useRef()
    const cur1 = useRef()
    const cur2 = useRef()
    const cur3 = useRef()
    const cur4 = useRef()
    const cur6 = useRef()
    const cur7 = useRef()
    const cur8 = useRef()
    useEffect(() => {
        cur.current.onClose = () => setVisible(false)
        cur1.current.onClose = () => setVisible1(false)
        cur2.current.onClose = () => setVisible2(false)
        cur3.current.onClose = () => setVisible3(false)
        cur4.current.onClose = () => setVisible4(false)
        cur6.current.onClose = () => setVisible6(false)
        cur7.current.onClose = () => setVisible7(false)
        cur8.current.onClose = () => setVisible8(false)
    }, [])

    const closeAll = () => {
      setVisible(false);
       setVisible1(false);
        setVisible2(false);
        setVisible3(false)
    }
    return <div>
    <sp-button onClick={() => setVisible(true)}>right</sp-button>
    <sp-button onClick={() => setVisible1(true)}>left</sp-button>
    <sp-button onClick={() => setVisible2(true)}>bottom</sp-button>
    <sp-button onClick={() => setVisible3(true)}>top</sp-button>
    <sp-drawer visible={visible} title='Title' ref={cur}>
    <div slot='content'> <sp-button onClick={() => setVisible3(true)}>top</sp-button></div>
    </sp-drawer>
    <sp-drawer placement='left' visible={visible1} title='Title' ref={cur1}>
        <div slot='content'><sp-button onClick={() => setVisible2(true)}>bottom</sp-button></div>
    </sp-drawer>
    <sp-drawer placement='bottom' visible={visible2} title='Title' ref={cur2}>
        <div slot='content'> 
            <sp-button onClick={() => closeAll()}>closeAll</sp-button> 
            <div id="childShowDrawer">
                <sp-button onClick={() => setVisible4(true)}>当前元素的展示</sp-button> 
                <sp-drawer placement='top' visible={visible4} title='当前元素' ref={cur4} fullscreen='false'>
                    <div slot='content'>77 88 99 </div>
                </sp-drawer>
            </div>
            
        </div>
    </sp-drawer>
    <sp-drawer placement='top' visible={visible3} title='Title' ref={cur3}><div slot='content'><sp-button onClick={() => setVisible1(true)}>left</sp-button> </div></sp-drawer>


    二级菜单 三级菜单
    <sp-button onClick={() => setVisible6(true)}>右边</sp-button>
    <sp-drawer visible={visible6} title='Title' ref={cur6}>
        <div slot='content'> 
            <sp-button onClick={() => setVisible7(true)}>二级菜单</sp-button>
        </div>
    </sp-drawer>
    <sp-drawer visible={visible7} title='Title' ref={cur7} width='30%'>
        <div slot='content'> 
            <sp-button onClick={() => setVisible8(true)}>三级菜单</sp-button>
        </div>
    </sp-drawer>
    <sp-drawer visible={visible8} title='Title' ref={cur8} width='20%'>
        <div slot='content'> 
           这是四级菜单了
        </div>
    </sp-drawer>
    </div>
}
ReactDOM.render(<Test />, mountNode)
```
<style>
#childShowDrawer {
    width: 600px;
    height: 400px;
}
    
</style>