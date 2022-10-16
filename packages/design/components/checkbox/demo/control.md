---
order: 3
title: 受控的 Checkbox
---

## desc-cn 
联动 checkbox。


```jsx
import {useState} from 'react';
const Demo = () => {
    const [checked, SetC] = useState(false);
    const [disabled, SetD] = useState(false);
     return <div>
     <h3>React: </h3>
     <sp-button onClick={() => SetC(!checked)}>UnCheck</sp-button>
     <sp-button onClick={() => SetD(!disabled)}>Disable</sp-button>
     <sp-divider plain='true'>分割线</sp-divider>
        <sp-checkbox checked={checked} disabled={disabled}>checkbox</sp-checkbox>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```