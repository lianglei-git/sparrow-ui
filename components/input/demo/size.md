---
order: 2
title: 三种大小
---

## desc-cn 
我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 40px、32px 和 24px。

```html
<h3>Html:</h3>
<sp-input prefix='sp-icon-earth' size='large' placeholder='Large'></sp-input>
<sp-input prefix='sp-icon-earth' placeholder='Default'></sp-input>
<sp-input prefix='sp-icon-earth' size='small' placeholder='Small'></sp-input>
```


```jsx
const Demo = () => {
     return <div>
        <h3>React:</h3>
        <sp-input prefix='sp-icon-icon_commonly_user' size='large' placeholder='Large'></sp-input>
        <sp-input prefix='sp-icon-icon_commonly_user' placeholder='Default'></sp-input>
        <sp-input prefix='sp-icon-icon_commonly_user' size='small' placeholder='Small'></sp-input>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
