---
order: 0
title: 测试模块
---
## desc-cn

测试模块



```jsx
import React,{useRef, useEffect} from 'react'
const Test = () => {
    // const c = useRef();
    // useEffect(() => {
    //     c.current.onVisibleChange = visible => {
    //         console.log(visible)
    //     }
    //     //  c.current['attr-visible'] = true 
    // }, [])
    return <div>
        <sp-popover title='嗯哼？' trigger='click' content='内容内饿哦给你' get-popup-container='.show-components'>
        看看
        </sp-popover>
            
    </div>
}
ReactDOM.render(<Test />, mountNode);
```