---
order: 5
title: 自定义文字格式
---


## desc-cn 
format 属性指定格式。


```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
 <sp-progress id='progress3'></sp-progress>
 <sp-progress id='progress4' kkk='9999' type='circle'></sp-progress>

 <script>
     progress3.format = () => 'Done'
     progress3['attr-percentage'] = '30'
     progress4.format = (percentage) => percentage + 'S'
     progress4.kkkk = '123'
     progress4['attr-percentage'] = 80
 </script>
```


```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [percentage, setpercentage] = useState(0)
    const el = useRef();
    useEffect(() => {
        el.current.format = () => 'No'
        setpercentage('0')
    }, [])
    return <div>
    <h3>React: </h3>
    <div className='box'>
    <sp-progress percentage={percentage} text-inside='true' type='circle' ref={el}></sp-progress>
    </div>
        
    </div>
}
ReactDOM.render(<Test />, mountNode)
```

<style> 
.box {
    width: 200px;
}
.sp-progress {
    margin: 10px 0;
}
</style>