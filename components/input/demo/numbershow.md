---
order: 8
title: 带字数提示
---

## desc-cn 
展示字数提示。

```html
<h3>Html:</h3>
<sp-input placeholder='Basic usage' show-count='true'></sp-input>
        <br/>
<sp-input placeholder='Basic usage' show-count='true' max-length='30'></sp-input>
        <br/>
<sp-input placeholder='Basic usage' bordered='true' show-count='true' max-length='30'></sp-input>
        <br/>
<sp-input placeholder='Basic usage' bordered='true' show-count='true' allow-clear='true'></sp-input>
```


```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
        <sp-input placeholder='Basic usage' show-count='true'></sp-input>
        <br/>
        <sp-input placeholder='Basic usage' show-count='true' max-length='30'></sp-input>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
<style>
    #components-input-demo-numbershow .sp-input {
        width: 250px;
    }

</style>
