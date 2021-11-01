---
order: 7
title: 自定义样式
---

## desc-cn
使用 `style` 和 `className` 来定义样式。

```jsx
import {Message} from 'sparrow-ui';
const success = () => {
  Message.success({
    message: '自定义样式和类名',
    className: 'custom-class',
    style: {
      marginTop: '20vh',
    },
    offset: '100px' // 100
  });
};
ReactDOM.render(<sp-button onClick={success}>Customized style</sp-button>, mountNode);
```