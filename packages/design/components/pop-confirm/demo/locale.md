---
order: 2
title: 国际化
---
## desc-cn

使用 ok-text 和 cancel-text 自定义按钮文字。



```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-popconfirm title='Are you sure?'  get-popup-container='.show-components' ok-text='Yes' cancel-text='No'>
   <sp-button type='link'>delete</sp-button>
</sp-popconfirm>    
```

```jsx
// React 中使用
const Demo = () => {
    return <div>
    <h3>React: </h3>
       <sp-popconfirm title='Are you sure?'  get-popup-container='.show-components' ok-text='Yes' cancel-text='No'>
    <sp-button type='link'>delete</sp-button>
    </sp-popconfirm>     
    </div>
}

ReactDOM.render(<Demo />, mountNode);
```
