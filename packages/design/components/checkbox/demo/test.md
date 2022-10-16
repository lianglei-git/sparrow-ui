---
order: 0
title: 测试板块
---

## desc-cn 
测试咯

```jsx
import {useState, useEffect, useRef} from 'react'
const Demo = () => {
    const demo = useRef();
    const indeterminate = useRef();
    const groups = useRef();
    useEffect(() => {
        demo.current.onChange = v => {
            console.log(v, '00000')
        }
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
        <sp-checkbox>选中</sp-checkbox>   
        <sp-checkbox checked='true'>默认选中</sp-checkbox>   
        <sp-checkbox disabled='true'>zhihui</sp-checkbox>   
        <sp-checkbox disabled='true' checked='true'>zhihui</sp-checkbox>   
<br />
        <sp-checkbox indeterminate='false' ref={indeterminate}>默认选中</sp-checkbox>   
        <sp-divider></sp-divider>
    <sp-checkbox-group value='["苹果", "西瓜"]' ref={groups}>
        <sp-checkbox ref={demo}>西瓜</sp-checkbox>   
        <sp-checkbox>苹果</sp-checkbox>   
        <sp-checkbox>香蕉</sp-checkbox>   
    </sp-checkbox-group>
    <sp-divider></sp-divider>
     <sp-checkbox-group value='["苹果", "西瓜"]' disabled='true'>
        <sp-checkbox ref={demo}>西瓜</sp-checkbox>   
        <sp-checkbox>苹果</sp-checkbox>   
        <sp-checkbox>香蕉</sp-checkbox>   
    </sp-checkbox-group>
    
       </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
</style>