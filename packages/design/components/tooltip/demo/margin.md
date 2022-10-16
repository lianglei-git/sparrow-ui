---
order: 3
title: 边缘对齐
---
## desc-cn

箭头指向

```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-tooltip title='prompt text' effect='light' arrow-point-at-center='true' get-popup-container='.show-components' >
    Arrow points to center / 箭头指向中心
</sp-tooltip>    
```


```jsx
// <!-- React 中使用 -->
const Demo = () => {
    return <div>
            <h3>React: </h3>
        <sp-tooltip title='prompt text' placement='top-left' get-popup-container='.show-components'>
            Align edge / 边缘对齐
        </sp-tooltip>   
    </div>
}
 ReactDOM.render(<Demo />, mountNode);
```