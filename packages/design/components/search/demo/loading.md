---
order: 2
title: loading
---

## desc-cn 
加载中...

```html
<h3>Html:</h3>
<sp-search placeholder='Basic usage' id='search1' ></sp-search>
<br />
<sp-search placeholder='Basic usage' enter-button='Search' id='search2'></sp-search>
<script>
    let el = window.$('#search1');
    let el2 = window.$('#search2');
   el.onSearch = (_, v) => {
        el['attr-loading'] = true;
        setTimeout(() => {
            el['attr-loading'] = false;
                Spui.Message.info(v)
        }, 3000)
    }
    el2.onSearch = (_, v) => {
        el2['attr-loading'] = true;
        setTimeout(() => {
            el2['attr-loading'] = false;
                Spui.Message.info(v)
        }, 3000)
    }
</script>
```


```jsx
import {useEffect, useRef, useState} from 'react'
const Demo = () => {
    const demo = useRef();
    const [v,Set] = useState(false)
    const demo2 = useRef();
    const [v2,Set2] = useState(false)
    useEffect(() => {
        demo.current.onSearch = (event, value) => {
            Set(true);
            setTimeout(() => {
                Set(false);
                Spui.Message.info(value)
            }, 3000)
        }
        demo2.current.onSearch = (event, value) => {
            Set2(true);
            setTimeout(() => {
                Set2(false);
                Spui.Message.info(value)
            }, 3000)
        }
    }, [])
     return <div>
     <h3>React:</h3>
        <sp-search placeholder='Basic usage' loading={v} ref={demo}></sp-search>
        <br />
        <sp-search placeholder='Basic usage' loading={v2} ref={demo2} enter-button='搜索'></sp-search>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
