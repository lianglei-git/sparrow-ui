---
order: 2
title: 适应文本高度的文本域
---

## desc-cn 
autoSize 属性适用于 textarea 节点，并且只有高度会自动变化。
min-rows 设置最小行数
max-rows 设置最大行数

```html
<h3>Html: </h3>
<sp-textarea value='身法不错' auto-size='true'></sp-textarea>
<br />
<sp-textarea min-rows='2' max-rows='7'></sp-textarea>

```


```jsx
import {useEffect, useRef} from 'react'
const Demo = () => {
     return <div>
     <h3>React:</h3>
        <sp-textarea placeholder='Basic usage' auto-size='true'></sp-textarea>
        <br />
        <sp-textarea min-rows='2' max-rows='7'></sp-textarea>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```



<style>
    .sp-textarea {
        width: 300px;
        margin-top: 20px
    }
</style>