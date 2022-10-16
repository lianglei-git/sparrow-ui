---
order: 2
title: 自定义弹出位置
---

## desc-cn
可以让 Notification 从屏幕四角中的任意一角弹出

```jsx
import {Notify} from 'sparrow-ui';
const click = (type, any) => {
    Notify[type]({
          title: type,
          message: '这是一条' + type +'的提示消息',
          ...any
        })
}
ReactDOM.render(<>
<sp-button onClick={() => click('warning')}>右上</sp-button>
<sp-button onClick={() => click('success', {position:'top-left'})} >左上</sp-button>
<sp-button onClick={() => click('success', {position:'bottom-left'})} >左下</sp-button>
<sp-button onClick={() => click('success', {position:'bottom-right'})} >右下</sp-button>

</>,mountNode)
```