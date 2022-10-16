---
order: 5
title: 加载中
---

## desc-cn
进行全局 loading，异步自行移除。

```jsx
import {Message} from 'sparrow-ui';
const click = (type) => {
   let hide =  Message[type]('' + type, {duration: 0});
    setTimeout(hide.close, 2500)
}
ReactDOM.render(<>
<sp-button onClick={() => click('loading')}>loading</sp-button>
</>,mountNode)
```