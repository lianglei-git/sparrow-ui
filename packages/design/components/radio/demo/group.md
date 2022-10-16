---
order: 3
title: 组合
---

## desc-cn 
组合与不同类型

```html
<h3>Html: </h3>
<sp-radio-group value='香蕉'  type='button'>
    <sp-radio>苹果</sp-radio>
    <sp-radio>香蕉</sp-radio>
    <sp-radio>葡萄</sp-radio>
</sp-radio-group>
<sp-divider></sp-divider>
<sp-radio-group value='香蕉'  type='button' optiontype='button'>
    <sp-radio>苹果</sp-radio>
    <sp-radio>香蕉</sp-radio>
    <sp-radio>葡萄</sp-radio>
</sp-radio-group>

```


```jsx
import {useState, useEffect, useRef} from 'react'
const Demo = () => {
    const demo = useRef()
    useEffect(() => {
        demo.current.onChange = (label) => {
            Spui.Message.info(label)
        }
    }, [])
     return <div>
     <h3>React: </h3>
        <sp-radio-group value='香蕉' ref={demo}>
                     <sp-radio>苹果</sp-radio>
                     <sp-radio>香蕉</sp-radio>
                     <sp-radio>葡萄</sp-radio>
              </sp-radio-group>
        <sp-divider></sp-divider>
        <sp-radio-group value='香蕉' disabled='true'>
                     <sp-radio>苹果</sp-radio>
                     <sp-radio>香蕉</sp-radio>
                     <sp-radio>葡萄</sp-radio>
        </sp-radio-group>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```