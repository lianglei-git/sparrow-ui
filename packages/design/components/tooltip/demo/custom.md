---
order: 4
title: 多彩的文字提示
---
## desc-cn

我们添加了多种预设色彩的文字提示样式，用作不同场景使用。

```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-tooltip title='prompt text' effect='light' color='#f50' get-popup-container='.show-components'>
   #f50
</sp-tooltip>
<sp-tooltip title='prompt text' effect='light' color='#2db7f5' get-popup-container='.show-components'>
   #2db7f5
</sp-tooltip>
<sp-tooltip title='prompt text' effect='light' color='#87d068' get-popup-container='.show-components'>
   #87d068
</sp-tooltip>
<sp-tooltip title='prompt text' effect='light' color='#108ee9' get-popup-container='.show-components'>
   #108ee9
</sp-tooltip>
```


```jsx
// <!-- React 中使用 -->
const Demo = () => {
const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'gold',
  'lime',
]
    return <div className='demo-colors'>
        <h3>React: </h3>
        {colors.map(color => (
            <sp-tooltip title="prompt text" get-popup-container='.show-components' color={color} key={color}>
            <sp-button>{color}</sp-button>
            </sp-tooltip>
        ))} 
    </div>
}
 ReactDOM.render(<Demo />, mountNode);
```

<style>
    .demo-colors {
        width: 700px;
    }
    .demo-colors sp-button {
        margin: 5px !important;
    }
</style>