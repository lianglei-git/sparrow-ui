---
order: 3
title: 前置/后置标签
---

## desc-cn 
用于配置一些固定组合。

```html
<h3>Html:</h3>
<sp-input addon-before='Https://'  addon-after='.com' placeholder='mysite'   allow-clear='true'></sp-input>
```


```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
      <sp-input addon-before='Https://'  addon-after='.com' placeholder='mysite'   allow-clear='true'></sp-input>
      <sp-input addon-after='.com' placeholder='mysite' ></sp-input>
       <sp-input addon-before='Https://' placeholder='mysite'  ></sp-input>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
