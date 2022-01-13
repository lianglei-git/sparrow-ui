---
order: 10
title: 置灰
---

## desc-cn 
不可选中。

```html
<h3>Html:</h3>
<sp-input size='small' disabled='true' addon-before='Https://'  addon-after='.com' prefix='sp-icon-rmb' placeholder='这是一个带有前缀后缀的输入框'  suffix='<span>RMB</span>' allow-clear='true'></sp-input>
```


```jsx
import {useEffect, useRef, useState} from 'react'
const Demo = () => {
    const [disabled, Set] = useState(true);
     return <div>
        <h3>React:</h3>
        <sp-button type='primary' onClick={() => Set(!disabled)}>change Disabled</sp-button>
        <sp-input disabled={disabled}   placeholder='Basic usage'></sp-input>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
