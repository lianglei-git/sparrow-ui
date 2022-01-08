---
order: 1
title: 基本操作
---



## desc-cn 
可以同时展开多个面板，这个例子默认展开了第一个。

```html
<h3>Html: </h3>
<sp-collapse active-index='2'>
    <sp-collapse-panel index='1' title='This is panel header 1'>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
    </sp-collapse-panel>
    <sp-collapse-panel index='2' title='This is panel header 2'>
        <div>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
    </sp-collapse-panel>
</sp-collapse>
```

```jsx
const Demo = () => {
    return <div>
    <h3>React: </h3>
      <sp-collapse active-index='[1]'>
    <sp-collapse-panel title='标题1'>
        <div>
        <p>content....</p>
        <p>content....</p>
        <p>content....</p>
        </div>
    </sp-collapse-panel>
    <sp-collapse-panel title='标题2'>
       <div>
        <p>content....</p>
        <p>content....</p>
        <p>content....</p>
        </div>
    </sp-collapse-panel>
</sp-collapse>
        </div>
}
ReactDOM.render(<Demo />, mountNode)
```