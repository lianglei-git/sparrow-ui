---
order: 2
title: 触发方式
---
## desc-cn

鼠标移入、聚集、点击。

```html
<h3>Html: </h3>
<sp-popover title='标题' trigger='hover' content='提示内容' get-popup-container='.show-components'>
    <sp-button type='primary'>Hover Me</sp-button>
</sp-popover>
<sp-popover title='标题' trigger='click' content='提示内容' get-popup-container='.show-components'>
    <sp-button type='primary'>Click Me</sp-button>
</sp-popover>
<sp-popover title='标题' trigger='focus' content='提示内容' get-popup-container='.show-components'>
    <sp-button type='primary'>Focus Me</sp-button>
</sp-popover>
```

```jsx
```