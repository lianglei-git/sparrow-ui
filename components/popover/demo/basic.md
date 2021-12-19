---
order: 1
title: 基本
---
## desc-cn

最简单的用法，浮层的大小由内容区域决定。

```html
<h3>Html: </h3>
<sp-popover title='标题' trigger='hover' content='提示内容' get-popup-container='.show-components'>
    <sp-button type='primary'>Hover Me</sp-button>
</sp-popover>
```

```jsx
import React,{useRef, useEffect} from 'react'
const Test = () => {
    return <div>
        <h3>React: </h3>
        <sp-popover title='标题' trigger='hover' content='提示内容' get-popup-container='.show-components'>
            <sp-button type='primary'>Hover Me</sp-button>
        </sp-popover>
            
    </div>
}
ReactDOM.render(<Test />, mountNode);
```