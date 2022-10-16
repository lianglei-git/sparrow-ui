---
order: 4
title: 关闭
---

## desc-cn
可以关闭全部， 也可以单个关闭

```jsx
import {Message} from 'sparrow-ui';
let o = null;
ReactDOM.render(<>
<sp-button type='dashed' onClick={() => { o = Message.success('单个')}}>打开一个</sp-button>
<sp-button type='dashed' onClick={() => o?.close()}>关闭上一个</sp-button>
<sp-button type='dashed' onClick={Message.closeAll}>关闭全部</sp-button>
<sp-button type='dashed' onClick={() => { o = Message.success('关闭按钮', {showclose: true, duration: 0})}}>显示可关闭按钮</sp-button>
</>,mountNode)
```