---
order: 3
title: 格式化
---

## desc-cn 
通过 formatter 格式化数字，以展示具有具体含义的数据，往往需要配合 parser 一起使用。

```html
<h3>Html:</h3>
<sp-input-number value='2' max='10' parser='%'></sp-input-number>

```


```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
    <sp-input-number value='10' min='1' parser='*'></sp-input-number>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
