---
order: 1
title: 带有倾向性
---

## desc-cn
带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息

```jsx
import {Notify} from 'sparrow-ui';
const click = (type) => {
    Notify[type]({
          title: type,
          message: '这是一条'+type+'的提示消息'
        })
}
ReactDOM.render(<>
<sp-button onClick={() => click('info')} >info</sp-button>
<sp-button onClick={() => click('success')}>success</sp-button>
<sp-button onClick={() => click('error')}>error</sp-button>
<sp-button onClick={() => click('warning')}>warning</sp-button>

</>,mountNode)
```