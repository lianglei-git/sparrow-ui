---
order: 0
title: 普通提示
---

## desc-cn
基本的全局 info 提示，默认3s后消失。

```jsx
import {Message} from 'sparrow-ui';
const info = () => {
    Message.info('你又在偷偷摸🐟？')
}
ReactDOM.render(<>
<sp-button  type='dashed' onClick={info}>打开提示</sp-button>
</>,mountNode)
```