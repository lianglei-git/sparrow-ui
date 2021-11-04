---
order: 2
title: 按钮尺寸
---
## desc-cn
按钮有中、小、mini三种尺寸。

通过设置 size 为 small mini 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中(middle)。


```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<div>
    <sp-button classname='h-sp-button' type='primary'icon="sp-icon-copy" >拷贝</sp-button>
    <sp-button classname='h-sp-button' type='dashed' shape="circle">Ds</sp-button>
    <sp-button classname='h-sp-button' type='danger' shape="round" icon="sp-icon-copy">小黄人</sp-button>
    <sp-button classname ='h-sp-button' icon="sp-icon-close" shape="circle" ></sp-button>
</div>
<script>
    window.changeHtmlButtonSize = (size) => {
       let buttons = document.querySelectorAll('.h-sp-button');
       Array.from(buttons).map(el => el['attr-size'] = size)
    }
</script>
```


```jsx
// React 中使用
import React,{useState} from 'react';
const Buttons = () => {
    const [size, setSize] = useState('middle')
    const changeSize = (size) => {
        setSize(size);
        window.changeHtmlButtonSize(size)
    }
   return <>
        <h3>React:</h3>
        <div className='button-group'>
            <sp-button onClick={() => changeSize('midlle')}>middle</sp-button>
            <sp-button onClick={() => changeSize('small')}>small</sp-button>
            <sp-button onClick={() => changeSize('mini')}>mini</sp-button>
        </div>
        <div>
            <sp-button size={size} type='primary'>primary</sp-button>
            <sp-button size={size}>default</sp-button>
            <sp-button size={size} type='dashed'>dashed</sp-button>
            <sp-button size={size} type='text'>text</sp-button>
        </div>
        
    </>
}
ReactDOM.render(<Buttons />, mountNode);

```

<style>
    .button-group {
  margin-bottom: 10px;
}

</style>        