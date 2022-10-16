---
order: 3
title: 加载中
---
## desc-cn
点击按钮后进行数据加载操作，在按钮上显示加载状态。


```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-button loading='true'>Loading</sp-button>
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
            <sp-button loading={true} shape={shape}> </sp-button>
            <sp-button shape={shape} loading={isloading} onClick={e => {
                setloading(true)
                setTimeout(() => {
                    setloading(false)
                }, 3000);
            }}> <span>click me</span></sp-button>

            <sp-button shape='circle' onClick={e => {
                setIcon('sp-icon-loading')
                setTimeout(() => {
                   setIcon('sp-icon-success')
                }, 3000);
            }} icon={icon}></sp-button>
    </div>
}
ReactDOM.render(<Home />, mountNode)
```