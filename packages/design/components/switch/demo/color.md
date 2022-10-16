---
order: 6
title: color
---
## desc-cn
修改背景颜色

```html
<!-- HTML 中使用 -->
<div>
    <h3>Html中使用</h3>
    <sp-switch id="spswitch1" default-checked='true'></sp-switch>
    <sp-button  type='dashed' onclick="
    spswitch1['attr-active-color'] = 'red'">修改选中颜色</sp-button>
</div>



```

```jsx
// React 中使用
import React, { useState, useRef, useEffect } from 'react'
import {Message} from 'sparrow-ui'
const Switchs = () => {
    const [activecolor,setactivecolor] = useState('red'); 
    const [inactivecolor,setinactivecolor] = useState('yellow');
return <div>
    <h3>React中使用</h3>
    <sp-button onClick={() => setactivecolor(activecolor == 'black'? 'red' : 'black')}>change active-color</sp-button>
    <sp-button onClick={() => setinactivecolor(inactivecolor == 'yellow'? 'green' : 'yellow')}>change inactive-color</sp-button>
    
    <sp-switch 
    active-color={activecolor}
    inactive-color={inactivecolor}
    ></sp-switch>
    </div>
}

ReactDOM.render(<Switchs />, mountNode);
```
