---
order: 0
title: 测试
---


```jsx
import React, { useState } from 'react'

const Switchs = () => {
    const [size,setSize] = useState('default');
    const [loading,setloading] = useState('false');
    const [disabled,setdisabled] = useState('false');
    const [width,setwidth] = useState(60);
    const [activecolor,setactivecolor] = useState('red'); 
    const [inactivecolor,setinactivecolor] = useState('yellow');
return <div>
    <sp-button onClick={() => setSize(size =='default'? 'small' : 'default')}>change size</sp-button>
    <sp-button onClick={() => setloading(loading =='false'? 'true' : 'false')}>change loading</sp-button>
    <sp-button onClick={() => setdisabled(disabled =='false'? 'true' : 'false')}>change disabled</sp-button>
    <sp-button onClick={() => setwidth(width == 60? 80 : 60)}>change width</sp-button>
    <sp-button onClick={() => setactivecolor(activecolor == 'black'? 'red' : 'black')}>change inactive-color</sp-button>
    <sp-button onClick={() => setinactivecolor(inactivecolor == 'yellow'? 'green' : 'yellow')}>change active-color</sp-button>
    
    <sp-switch 
    size={size} 
    loading={loading} 
    disabled={disabled}
    width={width}
    default-checked={'true'}
    active-color={activecolor}
    inactive-color={inactivecolor}
    active-text={'麻雀'}
    inactive-text={'早鸟'}
    ></sp-switch>
    </div>
}

ReactDOM.render(<Switchs />, mountNode);
```