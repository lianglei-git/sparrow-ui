---
order: 4
title: 从浮层内关闭
---
## desc-cn

以下示例显示如何创建可悬停和单击的弹出窗口。

```jsx
import React,{useRef, useEffect} from 'react'
const Test = () => {
    return <div>
        <h3>React: </h3>
        <sp-popover title='标题' trigger='click' id='popover' content={`<sp-button type="primary" onclick="popover['attr-visible'] = false"}>close</sp-button>`} get-popup-container='.show-components'>
            <sp-button>Click Me</sp-button>
        </sp-popover>
            
    </div>
}
ReactDOM.render(<Test />, mountNode);
```