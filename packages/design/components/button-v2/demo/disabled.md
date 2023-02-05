---
order: 4
title: 禁用状态
---
## desc-cn
按钮不可用状态。


### Cursor not-allowed
The ButtonBase component sets pointer-events: none; on disabled buttons, which prevents the appearance of a disabled cursor.
1.**CSS only**. You can remove the pointer-events style on the disabled state of the element:
`
.sp-button2.is-disabled {
     cursor: not-allowed;
     pointer-events: auto;
}
`
2.**DOM change**. You can wrap the button:
``
<span style="cursor: not-allowed">
     <sp-button2 disabled="true">disabled</sp-button2>
</span>
``

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<div class="button-group button-group-default">
     <sp-button2 type='primary' disabled="true">主要按钮</sp-button2>
     <sp-button2 type='danger' disabled="true">危险按钮</sp-button2>
    <sp-button2 disabled="true">默认按钮</sp-button2>
     <sp-button2 type='dashed' disabled="true">虚线按钮</sp-button2>
     <sp-button2 type='text' disabled="true">文字按钮</sp-button2>
     <sp-button2 type='link' disabled="true">链接按钮</sp-button2>
</div>

<div class="button-group button-group-round">
    <sp-button2 shape="round" type='primary' disabled="true">圆角按钮</sp-button2>
    <sp-button2 shape="round" type='danger' disabled="true">圆角危险</sp-button2>
    <sp-button2 shape="round" disabled="true">圆角默认</sp-button2>
    <sp-button2 shape="round" type='dashed' disabled="true">圆角虚线</sp-button2>
    <sp-button2 shape="round" type='text' disabled="true">圆角文字</sp-button2>
   
</div>
<div class="button-group button-group-circle">
     <sp-button2 shape="circle"  type='primary' disabled="true">A</sp-button2>
     <sp-button2 shape="circle" type='danger' disabled="true">B</sp-button2>
     <sp-button2 shape="circle" disabled="true">C</sp-button2>
     <sp-button2 shape="circle" type='dashed' disabled="true">D</sp-button2>
     <sp-button2 shape="circle" type='text' disabled="true">E</sp-button2>
</div>

```

```jsx
```