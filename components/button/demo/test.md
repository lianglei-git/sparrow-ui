---
order: 0
title: 测试模块
---
## desc-cn

测试模块

```jsx
import React, { useState, useEffect, useRef } from 'react'

const Home = (props) => {
    let [shape, setshape] = useState('default')
    let [isloading, setloading] = useState(false)
    let [isloading1, setloading1] = useState(false)
    let [visible, setVisible] = useState(false)
    let [visible2, setVisible2] = useState(false)
    let [visible3, setVisible3] = useState(false)
    let [visible4, setVisible4] = useState(false)
    let [visible5, setVisible5] = useState(false)
    let [visible6, setVisible6] = useState(false)
    const click = (e) => {
        console.log(e, 'sparrow')
    }
    const showMessage1 = () => {
        let random = Math.floor(Math.random()* 15 +9) ;
        let str = new Array(random).fill(false).reduce((t, a ,i) => {
            t += i +'-'
            return t
        }, '')

        Spui.Message.success({
            message: str,
            duration: 3000,
            showclose: true,
            beforeClose() {
                console.log('关闭前的回调')
            }
        })
    }
    return <div>
        主页
        <sp-button loading={JSON.stringify({ m: 123, b: 123 })} class="sp-button-123" onClick={e => click(e)} disabled="true"> <span>布局</span> </sp-button>
        <button onClick={() => setshape(['circle', 'round', 'default'][Math.floor(Math.random() * 3)])}>修改类型</button>
        <hr />
        <sp-button onClick={() => setloading(!isloading)}>修改loading</sp-button>

        <div className="group-loading-button">
            <h1>加载按钮</h1>
            <sp-button loading={true} class="sp-button-123" >Loading</sp-button>
            <sp-button loading={true} class="sp-button-123" shape={shape}> </sp-button>
            <sp-button shape={shape} loading={isloading1} class="sp-button-123" onClick={e => {
                setloading1(true)
                setTimeout(() => {
                    setloading1(false)
                }, 3000);
            }}> <span>click me</span></sp-button>
        </div>

        <div className="group-size-button">
            <h1>大小按钮</h1>
            <sp-button size={'middle'} class="sp-button-123" >Loading</sp-button>
            <sp-button size={'small'} class="sp-button-123" >Loading</sp-button>
            <sp-button size={'mini'} class="sp-button-123" >Loading</sp-button>
            <sp-button size={'mini'} loading={true} class="sp-button-123" > </sp-button>
            <sp-button shape={shape} size={'mini'} loading={isloading1} class="sp-button-123" onClick={e => {
                setloading1(true)
                setTimeout(() => {
                    setloading1(false)
                }, 3000);
            }}> <span>click me</span></sp-button>
        </div>
    </div>
}
ReactDOM.render(<Home />, mountNode)
```