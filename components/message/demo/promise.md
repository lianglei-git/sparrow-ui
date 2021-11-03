---
order: 6
title: Promise 接口
---

## desc-cn
可以通过 then 接口在关闭后运行 callback 。以上用例将在每个 message 将要结束时通过 then 显示新的 message 。

```jsx
import {Message} from 'sparrow-ui';
const click = (type) => {
   Message[type]('' + type)
   .then(() => Message['info']('info'))
   .then(() => Message['success']('success'))
}
ReactDOM.render(<>
<sp-button type='primary' onClick={() => click('loading')}>Prmose message</sp-button>
</>,mountNode)
```