---
order: 4
title: 隐藏关闭按钮
---

## desc-cn
可以不显示关闭按钮

```jsx
import {Notify} from 'sparrow-ui';

ReactDOM.render(<>
<sp-button onClick={() => Notify['success']({title: '隐藏',message: '隐藏关闭按钮', showclose: 'false'})} >隐藏关闭按钮</sp-button>

</>,mountNode)
```