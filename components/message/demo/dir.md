---
order: 3
title: 修改延长
---

## desc-cn
默认3秒，修改为8秒后自动关闭

```jsx
import {Message} from 'sparrow-ui';
const click = (type) => {
    Message[type]('' + type, {
        duration: 8000
    })
    // 或
    // Message({
    //     type,
    //      duration: 8000
    // })
}
ReactDOM.render(<>
<sp-button onClick={() => click('success')}>delay 8s</sp-button>
</>,mountNode)
```