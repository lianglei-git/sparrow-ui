---
order: 5
title: 加载中
---
## desc-cn
点击按钮后进行数据加载操作，在按钮上显示加载状态。


```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-button2 loading='true' disabled='true'> Save</sp-button2>
<sp-button2 disabled='true'>Loading...</sp-button2>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'

const Home = (props) => {
    let [shape, setshape] = useState('default')
    let [isloading, setloading] = useState(false)
    let [icon, setIcon] = useState('sp-icon-error')

    return <div className="group-loading-button">
           <h3>React:</h3>
            <sp-button2 loading={true} shape={shape}> </sp-button2>
            <sp-button2 shape={shape} loading={isloading} onClick={e => {
                setloading(true)
                setTimeout(() => {
                    setloading(false)
                }, 3000);
            }}> <span>click me</span></sp-button2>

            <sp-button2 shape='circle' onClick={e => {
                setIcon('sp-icon-loading')
                setTimeout(() => {
                   setIcon('sp-icon-success')
                }, 3000);
            }} icon={icon}></sp-button2>
    </div>
}
ReactDOM.render(<Home />, mountNode)
```