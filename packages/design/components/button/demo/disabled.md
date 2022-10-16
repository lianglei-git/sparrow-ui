---
order: 4
title: 禁用状态
---
## desc-cn
按钮不可用状态。


```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<div class="button-group button-group-default">
     <sp-button type='primary' disabled="true">主要按钮</sp-button>
     <sp-button type='danger' disabled="true">危险按钮</sp-button>
    <sp-button disabled="true">默认按钮</sp-button>
     <sp-button type='dashed' disabled="true">虚线按钮</sp-button>
     <sp-button type='text' disabled="true">文字按钮</sp-button>
     <sp-button type='link' disabled="true">链接按钮</sp-button>
</div>

<div class="button-group button-group-round">
    <sp-button shape="round" type='primary' disabled="true">圆角按钮</sp-button>
    <sp-button shape="round" type='danger' disabled="true">圆角危险</sp-button>
    <sp-button shape="round" disabled="true">圆角默认</sp-button>
    <sp-button shape="round" type='dashed' disabled="true">圆角虚线</sp-button>
    <sp-button shape="round" type='text' disabled="true">圆角文字</sp-button>
   
</div>
<div class="button-group button-group-circle">
     <sp-button shape="circle"  type='primary' disabled="true">A</sp-button>
     <sp-button shape="circle" type='danger' disabled="true">B</sp-button>
     <sp-button shape="circle" disabled="true">C</sp-button>
     <sp-button shape="circle" type='dashed' disabled="true">D</sp-button>
     <sp-button shape="circle" type='text' disabled="true">E</sp-button>
</div>

```

```jsx
```