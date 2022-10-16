---
order: 3
title: 带有偏移
---

## desc-cn
让 Notification 偏移一些位置

```jsx
import {Notify} from 'sparrow-ui';

ReactDOM.render(<>
<sp-button onClick={() => Notify['success']({title: '偏移信息',message: '带有偏移色彩', offset:'100'})} >偏移一下</sp-button>
</>,mountNode)
```