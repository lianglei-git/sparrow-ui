---
order: 9
title: 无边框
---

## desc-cn 
没有边框。

```html
<h3>Html:</h3>
<sp-input bordered='true' placeholder='Basic usage'></sp-input>
<sp-input bordered='true' prefix='<span>1 + 1 =</span>' allow-clear='true' placeholder='allow-clear'></sp-input>
```


```jsx
const Demo = () => {
     return <div>
    <h3>React:</h3>
        <sp-input bordered='true' prefix='<span>银行卡号:</span>' placeholder='Basic usage'></sp-input>
        <sp-input bordered='true' prefix='<span>银行卡密码:</span>' placeholder='Basic usage'></sp-input>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    #components-input-demo-noborder .sp-input {
        width: 350px;
    }
</style>
