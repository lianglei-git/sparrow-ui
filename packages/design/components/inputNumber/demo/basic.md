---
order: 1
title: basic
---

## desc-cn 
基本使用

```html
<h3>Html: 最大 10</h3>
<sp-input-number value='2' max='10'></sp-input-number>

```


```jsx
import {useRef, useEffect} from 'react';
const Demo = () => {
    const ref = useRef();
    useEffect(() => {
        ref.current.onStep=(v,t) => console.log(v,t)
    }, [])
     return <div>
     <h3>React: 最小 1</h3>
    <sp-input-number value='10' min='1' ref={ref}></sp-input-number>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    .sp-input-number {
        width: 200px;
        margin-top: 10px;
    }
</style>