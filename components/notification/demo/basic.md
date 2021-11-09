---
order: 0
title: 基本用法
---

## desc-cn
适用性广泛的通知栏

```jsx
import {Notify} from 'sparrow-ui';
const click = (type, any) => {
    Notify(any)
}
ReactDOM.render(<>
<sp-button onClick={() => click('info',{title: '提示', message: '可以自动关闭'})} >可自动关闭</sp-button>
<sp-button onClick={() => click('success',{duration: 0,title: '提示', message: '这是一条不会自动关闭的消息'})}>不会自动关闭</sp-button>
</>,mountNode)
```