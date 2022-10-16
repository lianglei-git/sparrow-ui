---
order: 1
title: 基本
---
## desc-cn

最简单的用法。



```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-popconfirm title='Are you sure to delete this task?' id='popconfirm2' get-popup-container='.show-components' >
   <sp-button type='link'>delete</sp-button>
</sp-popconfirm>    
<script>
popconfirm2.onConfirm = () => {Spui.Message.success('ok')}
</script>
```

```jsx
import React,{useRef, useState, useEffect} from 'react';
// React 中使用
const Demo = () => {
    const c = useRef();
    useEffect(() => {
        c.current.onConfirm = () => {Spui.Message.success('ok')}
    }, [])

    return <div>
    <h3>React: </h3>
        <sp-popconfirm ref={c} title='Are you sure to delete this task?' get-popup-container='.show-components' >
          <sp-button type='link'>delete</sp-button>
        </sp-popconfirm>    
    </div>
}

ReactDOM.render(<Demo />, mountNode);
```
