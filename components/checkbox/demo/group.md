---
order: 4
title: 全选
---

## desc-cn 
在实现全选效果时，你可能会用到 indeterminate 属性。

```html
<h3>Html: </h3>
<sp-checkbox-group value='["苹果", "西瓜"]' disabled='true'>
        <sp-checkbox>西瓜</sp-checkbox>   
        <sp-checkbox>苹果</sp-checkbox>   
        <sp-checkbox>香蕉</sp-checkbox>   
    </sp-checkbox-group>
```


```jsx
import {useState, useEffect, useRef} from 'react';
const Demo = () => {
    const indeterminate = useRef();
    const groups = useRef();
   useEffect(() => {
        indeterminate.current.onChange = (v) => {
            groups.current['attr-value']= v ? '["苹果", "西瓜","香蕉"]':'[]'
        }
        groups.current.onChange = v => {
            if(v.length == 3) {
                indeterminate.current._checked = true;
                indeterminate.current['attr-indeterminate'] = false;
            } else if(v.length < 3 && v.length>0) {
                indeterminate.current._checked = false;
                indeterminate.current['attr-indeterminate'] = true;
            } else {
                indeterminate.current['attr-indeterminate'] = false;
            }
        }
    }, [])

     return <div>
     <h3>React: </h3>
       <sp-checkbox indeterminate='false' ref={indeterminate}>默认选中</sp-checkbox>   
        <sp-divider></sp-divider>
    <sp-checkbox-group value='["苹果", "西瓜"]' ref={groups}>
        <sp-checkbox>西瓜</sp-checkbox>   
        <sp-checkbox>苹果</sp-checkbox>   
        <sp-checkbox>香蕉</sp-checkbox>   
    </sp-checkbox-group>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```