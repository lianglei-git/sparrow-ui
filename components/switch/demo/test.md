---
order: 0
title: 测试模块
---
## desc-cn
点击 active-color 或 inactive-color 可以修改背景颜色， 同时也可以修改选中和取消选中的文字哦

根据我司诉求，禁止后还可以点击提示，所以 尽之后的点击事件依然生效， 不同于 onChange事件 

完全可以应用在各大框架中。

```html
<!-- HTML 中使用 -->
<div>
    <sp-switch />
<script>
    window.abs = () => {
        console.log(9876)
    }
</script>
<span>99999</span>
</div>



```

```jsx
// React 中使用
import React, { useState, useRef, useEffect } from 'react'
import {Message} from 'sparrow-ui'
const Switchs = () => {
    const [size,setSize] = useState('default');
    const [loading,setloading] = useState('false');
    const [disabled,setdisabled] = useState('false');
    const [width,setwidth] = useState(60);
    const [activecolor,setactivecolor] = useState('red'); 
    const [inactivecolor,setinactivecolor] = useState('yellow');
    const [icon,seticon] = useState(false);
    const [inicon,setinicon] = useState(false);
    const switchone = useRef()
    useEffect(() => {
    switchone.current.onChange = (cur, context) => {
        if(cur) {
            context["attr-disabled"] = true
        }
    }
     switchone.current.onClick = (cur, context) => {
        if(cur == true) {
            Message.error('不可以点了哦')
        }
    }
    },[])
return <div>
    <sp-button onClick={() => setSize(size =='default'? 'small' : 'default')}>change size</sp-button>
    <sp-button onClick={() => setloading(loading =='false'? 'true' : 'false')}>change loading</sp-button>
    <sp-button onClick={() => setdisabled(disabled =='false'? 'true' : 'false')}>change disabled</sp-button>
    <sp-button onClick={() => setwidth(width == 60? 80 : 60)}>change width</sp-button>
    <sp-button onClick={() => setactivecolor(activecolor == 'black'? 'red' : 'black')}>change inactive-color</sp-button>
    <sp-button onClick={() => setinactivecolor(inactivecolor == 'yellow'? 'green' : 'yellow')}>change active-color</sp-button>
    <sp-button onClick={() => seticon(icon == 'sp-icon-success'? 'sp-icon-info' : 'sp-icon-success')}>change active-icon</sp-button>
    <sp-button onClick={() => setinicon(inicon == 'sp-icon-error'? 'sp-icon-copy' : 'sp-icon-error')}>change inactive-icon</sp-button>
    
    <sp-switch 
    size={size} 
    loading={loading} 
    disabled={disabled}
    width={width}
    default-checked={'false'}
    active-color={activecolor}
    inactive-color={inactivecolor}
    active-text={inactivecolor == 'yellow'? '幺鸡' : '东风'}
    inactive-text={activecolor == 'black'? '早鸟' : '麻雀'}
    active-icon={icon}
    inactive-icon={inicon}
    ref={switchone}
    ></sp-switch>
    </div>
}

ReactDOM.render(<Switchs />, mountNode);
```

<style>
    sp-button {
        margin-bottom:5px !important
    }

</style>

