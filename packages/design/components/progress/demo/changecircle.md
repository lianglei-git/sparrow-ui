---
order: 4
title: 进度圈动态展示
---


## desc-cn 
会动的进度条才是好进度条。



```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
 <sp-progress percentage='30' id='progress2' type='circle'></sp-progress>
 <sp-button onclick="decline1()">-</sp-button>
 <sp-button onclick="increase1()">+</sp-button>

 <script>
    window.increase1 = () => {
            if(+progress2['attr-percentage'] == 100) return
            if(+progress2['attr-percentage']+10 == 100) {
                progress2.format = () => 'Done'
            } 
            progress2['attr-percentage'] = +progress2['attr-percentage']+10;
    }
    window.decline1 = () => {
        if(+progress2['attr-percentage'] == 0) return
        progress2['attr-percentage'] = +progress2['attr-percentage']-10
    }
 </script>
```


```jsx
import React, { useState } from 'react'
const Test = () => {
    const [percentage, setpercentage] = useState(10)
    const [status, setstatus] = useState(undefined)
    return <div>
    <h3>React: </h3>
    <div className='box'>
    <sp-button onClick={async () => {
        status !== 'normal' && await setstatus('normal') // 需要同步修改
        setpercentage(percentage == 0 ? 0 : percentage-10)
    }}>-</sp-button>
    <sp-button onClick={() => {
        if(percentage+10 == 100) {
            setstatus('success')
        }
        setpercentage(percentage == 100 ? 100 : percentage+10);
    }}>+</sp-button>
    <sp-progress percentage={percentage} type='circle' stroke-width='4' status={status} ></sp-progress>
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