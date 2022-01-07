---
order: 5
title: 隐藏icon
---



## desc-cn 
`hide-arrow` true

```html
<h3>Html: </h3>
<sp-collapse active-index='1'>
    <sp-collapse-panel index='1' title='This is panel header 1' hide-arrow='true'>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
    </sp-collapse-panel>
    <sp-collapse-panel index='2' title='This is panel header 2' hide-arrow='true'>
        <div>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
    </sp-collapse-panel>
</sp-collapse>
```

```jsx
const Demo = () => {
    return <div>
    <h3>React: </h3>
      <sp-collapse active-index='1'>
    <sp-collapse-panel index='1' title='标题1' hide-arrow='true'>
        <div>
        <p>content....</p>
        <p>content....</p>
        <p>content....</p>
        </div>
    </sp-collapse-panel>
    <sp-collapse-panel index='2' title='标题2' hide-arrow='true'>
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