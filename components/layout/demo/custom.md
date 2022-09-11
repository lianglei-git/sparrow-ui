---
order: 3
title: custom
---

## desc-cn 
自定义

```html
<h3>Html: Layout</h3>
<style>
    #layout_custom_showTime {
        width: 360px;
        height: 360px;
        margin: 0 30px 0;
        position: relative;
        border: 1px dashed #8a8383
    }
</style>
   <div>
        <sp-alert effect="dark" style="margin-bottom:10px"> <span slot='title'>mode: Custom </span></sp-alert>
        <sp-button style="display: inline-block;margin-bottom:10px"  id="layout_custom_reset">Reset</sp-button>
        <div style="display: flex">
            <sp-layout iscustom="true" id="layout_custom"></sp-layout>
            <div id="layout_custom_showTime"></div>
        </div>
   </div>
   <script>
    const layout_custom = document.getElementById('layout_custom')
    const layout_custom_showTime = document.getElementById('layout_custom_showTime')
    const layout_custom_reset = document.getElementById('layout_custom_reset')
    const showTransfromList = Array();

    layout_custom.checkCallback = (_, __, style) => {
        if(style) {
            for(let k in style) {
                style[k] = style[k] * 100 + '%'
            }
            showTime({...style, position : 'absolute',background : randomBackground()})
        }
    }

    layout_custom_reset.onclick = () => {
        layout_custom.reset();
        showTime.reset();
    }

    function showTime(_style) {
        showTransfromList.push(_style);
        showTransfromList.map(style => {
            const el = document.createElement('div');
            for(let k in style) {
                el.style[k] = style[k]
            }
            layout_custom_showTime.append(el);
        })
    }

    showTime.reset = () => {
        layout_custom_showTime.innerHTML = '';
        showTransfromList.length = 0;
    }

    const randomBackground = () => {
        return `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(Math.random() * 255)})`
    }
   </script>
```


```jsx
import { useRef, useEffect, useState} from 'react';
const Demo = () => <span></span>
ReactDOM.render(<Demo />, mountNode)
```