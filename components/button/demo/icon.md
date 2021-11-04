---
order: 5
title: 图标按钮
---

## desc-cn
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<div class="button-group button-group-default">
     <sp-button type='primary' icon="sp-icon-copy"></sp-button>
     <sp-button type='danger' icon="sp-icon-copy"></sp-button>
    <sp-button icon="sp-icon-copy"></sp-button>
     <sp-button type='dashed' icon="sp-icon-copy"></sp-button>
     <sp-button type='text' icon="sp-icon-copy"></sp-button>
     <sp-button type='link' icon="sp-icon-copy"></sp-button>
</div>


```


```jsx
// React 中使用
import React from 'react';
const Buttons = () => {
   return <>
   <h3>React:</h3>
        <sp-button icon="sp-icon-copy"></sp-button>
                <sp-button shape="round">成功 <i className="sp-icon sp-icon-success"></i></sp-button>
        <sp-button icon="sp-icon-Code" size='small'></sp-button>
        <sp-button icon="sp-icon-close" size='mini'></sp-button>
                <sp-button icon="sp-icon-close" size='mini' shape="round"></sp-button>
                <sp-button icon="sp-icon-close" size='mini' shape="circle"></sp-button>


    </>
}
ReactDOM.render(<Buttons />, mountNode);

```


<style>
    .button-group {
  margin-bottom: 10px;
}

</style>