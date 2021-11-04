---
order: 4
title: 代码操作
---

## desc-cn
垂直居中展示 Modal

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-button onclick="window.codeOpen()" type="primary">Html代码打开</sp-button>
<script>
    const modal = Spui.Modal.config({
                    visible: false,
                    bodyhtml: '<div slot="content"> 全局创建 </div>'
                })
    window.codeOpen = () => {
        modal.show(true)
    }
</script>
```



```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'

const Modal = () => {
   return <>
        <h3>React:</h3>
        <sp-button onClick={e => Spui.Modal.config({visible:true})} > Jsx代码打开 </sp-button>
    </>
}

ReactDOM.render(<Modal />, mountNode);

```


