---
order: 1
title: 基础按钮
---
## desc-cn
按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<div class="button-group button-group-default">
     <sp-button type='primary'>主要按钮</sp-button>
    <sp-button>默认按钮</sp-button>
     <sp-button type='dashed'>虚线按钮</sp-button>
     <sp-button type='text'>文字按钮</sp-button>
     <sp-button type='link'>链接按钮</sp-button>
</div>

<div class="button-group button-group-round">
    <sp-button shape="round" type='primary'>圆角按钮</sp-button>
    <sp-button shape="round">圆角按钮</sp-button>
    <sp-button shape="round" type='dashed'>圆角按钮</sp-button>
    <sp-button shape="round" type='text'>圆角按钮</sp-button>
   
</div>
<div class="button-group button-group-circle">
     <sp-button shape="circle"  type='primary'>圆</sp-button>
     <sp-button shape="circle">圆</sp-button>
     <sp-button shape="circle" type='dashed'>圆</sp-button>
     <sp-button shape="circle" type='text'>圆</sp-button>
</div>

```


```jsx
// React 中使用
import React from 'react';
const Buttons = () => {
   return <>
   <h3>React:</h3>
        <sp-button>默认按钮</sp-button>
    </>
}
ReactDOM.render(<Buttons />, mountNode);

```


<style>
    .button-group {
  margin-bottom: 10px;
}

</style>