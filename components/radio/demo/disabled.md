---
order: 2
title: 不可用
---

## desc-cn 
不可用

```html
<h3>Html: </h3>
<sp-radio checked='true' disabled='true'>checkbox</sp-radio>

```


```jsx
const Demo = () => {
     return <div>
     <h3>React: </h3>
        <sp-radio  checked='false' disabled='true'>checkbox</sp-radio>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```