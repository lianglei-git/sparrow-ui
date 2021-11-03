---
order: 7
title: 自定义状态
---
## desc-cn

当然 你也可以自己用外部变量来修改状态，但是由于根原因 你需要手动修改状态值在(click事件中)；
根据 `true` 或 `false` 来修改指定状态。

完全可以应用在各大框架中。


```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-switch value="false" id="switchValue"></sp-switch>
<sp-button onclick="changeSwitchValue()"  type='primary'>手动修改</sp-button>
<div>当前元素实现:</div> <sp-switch value="false" id="switchValue2"></sp-switch> 
<script>
    window.changeSwitchValue =  function() {
        let v = switchValue['attr-value']
        switchValue['attr-value'] = v == 'false'? true: false
    }
    switchValue2.onClick = (is, context) => {
        let v = context['attr-value']
        context['attr-value'] = v == 'false'? true: false
    }
</script>
```

```jsx
import React, {useState} from 'react';
const Switchs = () => {
    const [value, setValue] = useState(false)
    return <div>
             <h3>React:</h3>
             <sp-switch value={value}></sp-switch>
              <sp-button onClick={() => setValue(!value)}>修改状态</sp-button>
           </div>
}
ReactDOM.render(<Switchs />, mountNode);

```
