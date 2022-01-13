---
order: 2
title: 自定义icon
---

## desc-cn 
自定义icon。

```html
<h3>Html:</h3>
<sp-password placeholder='Basic usage' icon-show='sp-icon-cut'></sp-password>
```


```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
        <sp-password placeholder='Basic usage' icon-unshow='sp-icon-scanning'></sp-password>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
