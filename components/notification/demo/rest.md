---
order: 1
title: 其他类型的提示
---

## desc-cn
成功、失败、警告

```jsx
import {Notify} from 'sparrow-ui';
const click = (type, any) => {
    Notify[type]({
          title: '错误',
          message: '这是一条错误的提示消息',
          ...any
        })
}
ReactDOM.render(<>
<sp-button onClick={() => click('info')} >info</sp-button>
<sp-button onClick={() => click('success')}>success</sp-button>
<sp-button onClick={() => click('error')}>error</sp-button>
<sp-button onClick={() => click('warning')}>warning</sp-button>

<sp-button onClick={() => click('success', {position:'top-left'})} >左上</sp-button>
<sp-button onClick={() => click('success', {position:'bottom-left'})} >左下</sp-button>
<sp-button onClick={() => click('success', {position:'bottom-right'})} >右下</sp-button>

</>,mountNode)
```