---
order: 1
title: 基本
---
## desc-cn

最基本的用法

```html
<!-- HTML 中使用 -->
<h3>Html: 两种主题: light | drak</h3>
<sp-tooltip title='prompt text' effect='light' get-popup-container='.show-components'>
    Tooltip will show on mouse enter.
</sp-tooltip>    
```


```jsx
// <!-- React 中使用 -->
const Demo = () => {
    return <div>
        <h3>React: </h3>
        <sp-tooltip title='prompt text' get-popup-container='.show-components'>
            Tooltip will show on mouse enter.
        </sp-tooltip>   
    </div>
}
 ReactDOM.render(<Demo />, mountNode);
```