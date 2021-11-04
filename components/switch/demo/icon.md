---
order: 5
title: 修改icon
---

## desc-cn 
可以动态修改icon。  

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-switch id='switchIcond'></sp-switch>
<sp-button onclick=" (switchIcond['attr-inactive-icon'] = 'sp-icon-success') ">修改icon</sp-button> 
```

```jsx

// React 中使用
import React, { useState, useRef, useEffect } from 'react'
import {Message} from 'sparrow-ui'
const Switchs = () => {
    const [icon,seticon] = useState(false);
    const [inicon,setinicon] = useState(false);
return <div>
    <h3>React中使用</h3>
    <sp-button  type='primary' onClick={() => seticon(icon == 'sp-icon-success'? 'sp-icon-info' : 'sp-icon-success')}>change active-icon</sp-button>
    <sp-button  type='primary' onClick={() => setinicon(inicon == 'sp-icon-error'? 'sp-icon-copy' : 'sp-icon-error')}>change inactive-icon</sp-button>
    
    <sp-switch 
    active-icon={icon}
    inactive-icon={inicon}
    ></sp-switch>
    </div>
}

ReactDOM.render(<Switchs />, mountNode);

```
