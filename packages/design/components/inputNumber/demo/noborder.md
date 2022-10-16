---
order: 6
title: 无边框
---

## desc-cn 
没有边框

```html
<h3>Html:</h3>
<sp-input-number value='2' max='10' bordered='true'></sp-input-number>

```


```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
    <sp-input-number bordered='true' value='10' min='1'></sp-input-number>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
