---
order: 1
title: 基础按钮
---
## desc-cn
按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。

```html
<!-- HTML 中使用 -->
<h3 style="margin-top: 25px">Html:</h3>
<div class="button-group button-group-default">
     <sp-button2 type='primary'>Primary</sp-button2>
     <sp-button2 type='danger'>Danger</sp-button2>
    <sp-button2>Default</sp-button2>
     <sp-button2 type='dashed'>Dashed</sp-button2>
     <sp-button2 type='text'>Text</sp-button2>
     <sp-button2 type='link'>Link</sp-button2>
</div>

<div class="button-group button-group-round">
    <sp-button2 shape="round" type='primary'>Primary</sp-button2>
    <sp-button2 shape="round" type='danger'>Danger</sp-button2>
    <sp-button2 shape="round">Default</sp-button2>
    <sp-button2 shape="round" type='dashed'>Dashed</sp-button2>
    <sp-button2 shape="round" type='text'>Text</sp-button2>
    <sp-button2 shape="round" type='link'>Link</sp-button2>
   
</div>
<div class="button-group button-group-circle">
     <sp-button2 shape="circle"  type='primary'>A</sp-button2>
     <sp-button2 shape="circle" type='danger'>B</sp-button2>
     <sp-button2 shape="circle">C</sp-button2>
     <sp-button2 shape="circle" type='dashed'>D</sp-button2>
     <sp-button2 shape="circle" type='text'>E</sp-button2>
</div>

```


```jsx
// React 中使用
import React from 'react';
const Buttons = () => {
   return <>
   <h3>React:</h3>
        <sp-button2>Default</sp-button2>
    </>
}
ReactDOM.render(<Buttons />, mountNode);

```


<style>
    .button-group {
  margin-bottom: 10px;
}

</style>