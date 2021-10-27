---
order: 1
title: 其他类型的提示
---

## desc-cn
成功、失败、警告。

```jsx
import {Message} from 'sparrow-ui';
const click = (type) => {
    Message[type]('' + type)
}
ReactDOM.render(<>
<sp-button onClick={() => click('info')}>info</sp-button>
<sp-button onClick={() => click('success')}>success</sp-button>
<sp-button onClick={() => click('error')}>error</sp-button>
</>,mountNode)
```