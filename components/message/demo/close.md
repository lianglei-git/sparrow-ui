---
order: 4
title: 关闭
---

## desc-cn
可以关闭全部， 也可以单个关闭

```jsx
import {Message} from 'sparrow-ui';
let o = null;
const click = (type) => {
    Message[type]('' + type, {duration: 10000});
}
ReactDOM.render(<>
<sp-button onClick={() => { o = Message.success('单个')}}>打开一个</sp-button>
<sp-button onClick={() => o?.close()}>关闭上一个</sp-button>
<sp-button onClick={Message.closeAll}>关闭全部</sp-button>
</>,mountNode)
```