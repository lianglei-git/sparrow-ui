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
<div style="display:flex">
    <sp-button2 classname='h-sp-button2' type='primary'>Primary</sp-button2>
    <sp-button2 classname='h-sp-button2' >Default</sp-button2>
    <sp-button2 classname='h-sp-button2' type='dashed'>Dashed</sp-button2>
    <sp-button2 classname='h-sp-button2' type='text'>Text</sp-button2>
</div>
<script>
    window.changeHtmlButtonSize = (size) => {
       let buttons = document.querySelectorAll('.h-sp-button2');
       Array.from(buttons).map(el => el['attr-size'] = size)
    }
</script>
```


```jsx
// React 中使用
import React,{useState, useRef, useEffect} from 'react';
const Buttons = () => {
    const [size, setSize] = useState('middle');
     const demo = useRef()
    useEffect(() => {
        demo.current.onChange = (size) => {
            setSize(size);
            window.changeHtmlButtonSize(size)
        }
    }, []);
   return <>
        <div className='button-group'>
            <sp-radio-group value='midlle' ref={demo} type="button" optiontype="button">
                <sp-radio>midlle</sp-radio>
                <sp-radio>small</sp-radio>
                <sp-radio>mini</sp-radio>
              </sp-radio-group>
        </div>
        <h3>React:</h3>
        <div>
            <sp-button2 size={size} type='primary'>Primary</sp-button2>
            <sp-button2 size={size}>Default</sp-button2>
            <sp-button2 size={size} type='dashed'>Dashed</sp-button2>
            <sp-button2 size={size} type='text'>Text</sp-button2>
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