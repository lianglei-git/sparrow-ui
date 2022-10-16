---
order: 4
title: 手动增加
---


## desc-cn 
手动增加


```html
<div> 
    <h3>Html:</h3>
    <sp-slider default='0.46' tip-formatter='%' max='1' step='0.01' id='sliValue'></sp-slider>
    <sp-button id='slit'>-</sp-button>
    <sp-button id='slio'>+</sp-button>
</div>
<script>
    let _default = 0.46
    document.getElementById('slio').onclick = () => {
       document.getElementById('sliValue')['attr-value'] =_default += 0.06
    }
    document.getElementById('slit').onclick = () => {
       document.getElementById('sliValue')['attr-value'] = _default -= 0.06
    }
</script>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [value, set] = useState(90);
    return <div> 
        <h3>React:</h3>
        <sp-slider default={90} tip-formatter='%' value={value}></sp-slider>
        <sp-button onClick={() => set(value - 1)}>-</sp-button>
        <sp-button onClick={() => set(value + 1)}>+</sp-button>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```


