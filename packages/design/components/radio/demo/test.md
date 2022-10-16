---
order: 0
title: 测试板块
---

## desc-cn 
测试咯

```jsx
import {useState, useEffect, useRef} from 'react'
const Demo = () => {
       return <div>
       
              <sp-radio>label吗</sp-radio>
              <sp-radio checked='true'>label吗</sp-radio>
              <sp-radio disabled='true'>👌</sp-radio>
        <sp-divider></sp-divider>

              <sp-radio-group value='香蕉'>
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
        <sp-divider></sp-divider>
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

       </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
</style>