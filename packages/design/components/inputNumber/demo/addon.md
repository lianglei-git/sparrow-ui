---
order: 4
title: 前置/后置标签
---

## desc-cn 
用于配置一些固定组合。

```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
    <sp-input-number value='10' min='1' addon-before='+' addon-after='$'></sp-input-number><br/>
    <sp-input-number value='10' min='1' addon-after='<span>📖</span>'></sp-input-number><br />
    <sp-input-number value='10' min='1' addon-before='🎩'></sp-input-number>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
