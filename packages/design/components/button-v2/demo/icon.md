---
order: 3
title: 图标按钮
---

## desc-cn
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<div class="button-group button-group-default">
     <sp-button2 type='primary' icon="sp-icon-copy"></sp-button2>
     <sp-button2 type='danger' icon="sp-icon-copy"></sp-button2>
    <sp-button2 icon="sp-icon-copy"></sp-button2>
     <sp-button2 type='dashed' icon="sp-icon-copy"></sp-button2>
     <sp-button2 type='text' icon="sp-icon-copy"></sp-button2>
     <sp-button2 type='link' icon="sp-icon-copy"></sp-button2>
</div>


```


```jsx
// React 中使用
import React from 'react';
const Buttons = () => {
   return <>
   <h3>React:</h3>
      <sp-button2 classname='h-sp-button2' type='link' shape="circle" style={{color:'red'}} icon="sp-icon-favorites-fill" ripplecenter='true'></sp-button2>
      <sp-button2 classname='h-sp-button2' type='link' shape="circle" icon="sp-icon-MPR"></sp-button2>
      <sp-button2 classname ='h-sp-button2' type='link' icon="sp-icon-icon_commonly_share" shape="circle" style={{color:'rgb(156, 39, 176)'}}></sp-button2>
    </>
}
ReactDOM.render(<Buttons />, mountNode);

```


<style>
    .button-group {
  margin-bottom: 10px;
}

</style>