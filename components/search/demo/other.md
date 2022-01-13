---
order: 3
title: other
---

## desc-cn 
杂货。

```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
        <sp-search placeholder='Basic usage'></sp-search><br/>
        <sp-search placeholder='Basic usage' allow-clear='true'></sp-search><br/>
        <sp-search placeholder='Basic usage' addon-before='Http://' allow-clear='true'></sp-search><br/>
        <sp-search placeholder='Basic usage' allow-clear='true' enter-button='搜索'></sp-search><br/>
        <sp-search placeholder='Basic usage' allow-clear='true' enter-button='Search'></sp-search><br/>
        <sp-search placeholder='Basic usage' allow-clear='true' suffix='sp-icon-hot'></sp-search><br/>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
