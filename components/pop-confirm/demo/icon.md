---
order: 4
title: 自定义Icon图标
---
## desc-cn

自定义提示 `icon`。



```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-popconfirm title='Are you sure?' 
 icon='sp-icon-info' get-popup-container='.show-components' ok-text='Yes' cancel-text='No'>
   <sp-button type='link'>custom Icon</sp-button>
</sp-popconfirm>    
```

```jsx
// React 中使用
const Demo = () => {
    return <div>
    <h3>React: </h3>
       <sp-popconfirm title='Are you sure?'  icon='sp-icon-success'  get-popup-container='.show-components' ok-text='Yes' cancel-text='No'>
    <sp-button type='link'>Success</sp-button>
    </sp-popconfirm>     
    </div>
}

ReactDOM.render(<Demo />, mountNode);
```
