---
order: 3
title: 置灰
---

## desc-cn 
灰显。

```html
<h3>Html:</h3>
<sp-password placeholder='Basic usage' disabled='true'></sp-password>
```


```jsx
import {useState} from 'react'
const Demo = () => {
    const [disabled, Set] = useState(false)
     return <div>
     <h3>React:</h3>
     <sp-button onClick={() => Set(!disabled)} type='text'>change</sp-button>
     <sp-divider plain='true'>改变灰显</sp-divider>
        <sp-password placeholder='Basic usage'  disabled={disabled}></sp-password>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
