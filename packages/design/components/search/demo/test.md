---
order: 0
title: 搜索框
---

## desc-cn 
带有搜索按钮的输入框。

```html
<sp-search value='这身不错啦' enter-button='Search'></sp-search>
<sp-search value='这身不错啦' ></sp-search>
<sp-search value='这身不错啦' allow-clear='true' suffix='sp-icon-success'></sp-search>

<sp-search value='这身不错啦' loading='true'></sp-search>
<sp-search value='这身不错啦' enter-button='Search' loading='true'></sp-search>


```


```jsx
import {useEffect, useRef, useState} from 'react';

const Demo = () => {
    const s1 = useRef()
    const s2 = useRef()

    const [l1, setl1] = useState(false)
    const [l2, setl2] = useState(false)

    useEffect(() => {
        s1.current.onSearch = () => {
            setl1(true)
            setTimeout(() => {
                setl1(false);
            }, 3000)
        }
        s2.current.onSearch = () => {
            setl2(true);
            setTimeout(() => {
                setl2(false);
            }, 3000)
        }
    }, [])
    return <div>
    <h3>React:</h3>
        <sp-search value='123' loading={l1} ref={s1} ></sp-search>
        <sp-search value='这身不错312啦' enter-button='Search' loading={l2} ref={s2}></sp-search>

    </div>
}

ReactDOM.render(<Demo />, mountNode)
```



<style>
    .sp-search {
        margin-top: 20px
    }
</style>