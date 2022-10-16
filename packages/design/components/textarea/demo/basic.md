---
order: 1
title: 基本
---

## desc-cn 
基本使用

```html
<h3>Html: </h3>
<sp-textarea value='身法不错' id='textarea1'></sp-textarea>
<script>
    window.$('#textarea1').onChange = (e, v) => {
        console.log(v)
    }
</script>
```


```jsx
import {useEffect, useRef} from 'react'
const Demo = () => {
     return <div>
     <h3>React:</h3>
        <sp-textarea placeholder='Basic usage'></sp-textarea>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```



<style>
    .sp-textarea {
        margin-top: 20px
    }
</style>