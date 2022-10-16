---
order: 2
title: size
---

## desc-cn 
三种大小的数字输入框，当 `size` 分别为 `large` 和 `small` 时，输入框高度为 40px 和 24px ，默认高度为 32px。

```html
<h3>Html: size</h3>
<sp-input-number value='2' max='10' size='large'></sp-input-number><br/>
<sp-input-number value='2' max='10'></sp-input-number><br/>
<sp-input-number value='2' max='10' size='small'></sp-input-number>

```


```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
     <sp-input-number value='2' max='10' size='large'></sp-input-number><br/>
    <sp-input-number value='2' max='10'></sp-input-number><br/>
    <sp-input-number value='2' max='10' size='small'></sp-input-number>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
