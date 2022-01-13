---
order: 3
title: 带移除图标
---

## desc-cn 
带移除图标的输入框，点击图标删除所有内容。

```html
<h3>Html: </h3>
<sp-textarea value='小伙子不凡呀..' allow-clear='true'></sp-textarea>
```


```jsx
import {useEffect, useRef} from 'react'
const Demo = () => {
     return <div>
     <h3>React:</h3>
        <sp-textarea placeholder='Basic usage' allow-clear='true'></sp-textarea>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```



<style>
    .sp-textarea {
        margin-top: 20px
    }
</style>