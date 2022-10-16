---
order: 5
title: 事件
---


## desc-cn 
当 Slider 的值发生改变时，会触发 `onChange` 事件，并把改变后的值作为参数传入。在 `onmouseup` 时，会触发 `onAfterChange` 事件，并把当前值作为参数传入。


```html
<div> 
    <h3>Html:</h3>
    <sp-slider default='0.46' tip-formatter='%' max='1' step='0.01' id='sliValue2'></sp-slider>
</div>
<script>
       document.getElementById('sliValue2').onChange = value => console.log('HTML::onChange::',value);
       document.getElementById('sliValue2').onAfterChange = value => console.log('HTML::onAfterChange::',value)
</script>
```

```jsx
import React, { useState, useEffect, useRef } from 'react';
const Test = () => {
    const demo = useRef()
    useEffect(() => {
        demo.current.onChange = value => console.log('React::onChange::',value);
        demo.current.onAfterChange = value => console.log('React::onAfterChange::',value);
    }, [])
    return <div> 
        <h3>React:</h3>
        <sp-slider default={[10,50]} ref={demo}></sp-slider>
    </div>
}
ReactDOM.render(<Test />, mountNode)

```


