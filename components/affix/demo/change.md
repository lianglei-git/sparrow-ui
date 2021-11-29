---
order: 2
title: 固定状态改变的回调

---



## desc-cn 
可以获得是否固定的状态。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-affix offset-top='64' id='affix1'>
        <sp-button type='primary'>affix top</sp-button>
</sp-affix>

<script>
affix1.onChange = (isFixed, type) => {
    console.log('html::', isFixed, type)
}
</script>
```



```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [percentage, setpercentage] = useState(0)
    const el = useRef()
    useEffect(() => {
        el.current.onChange = (isFixed, type) => {
            console.log('react::', isFixed, type)
        }
    },[])
    return <div>
    <h3>React:</h3>
    <div className='box'>
        <sp-affix offset-bottom='10' ref={el}>
            <sp-button type='primary'>affix bottom</sp-button>
        </sp-affix>

    </div>
        
    </div>
}
ReactDOM.render(<Test />, mountNode)
```