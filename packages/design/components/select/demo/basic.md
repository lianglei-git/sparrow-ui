---
order: 1
title: 基本
---

## desc-cn 
基本使用。

```html
<h3>Html:</h3>
<sp-search placeholder='Basic usage' id='search'></sp-search>
<script>
    search.onSearch = (event, value) => {
        Spui.Message.info(value)
    }
</script>
```


```jsx
import {useEffect, useRef} from 'react'
const Demo = () => {
    const demo = useRef();
    useEffect(() => {
        demo.current.onSearch = (event, value) => {
            Spui.Message.info(value)
        }
    }, [])
     return <div>
     <h3>React:</h3>
        <sp-search ref={demo} placeholder='Basic usage'></sp-search>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
<style>
    .sp-search {
        width: 300px;
    }
</style>
