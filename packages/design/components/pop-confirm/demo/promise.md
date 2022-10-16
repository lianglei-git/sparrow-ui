---
order: 6
title: Promise异步关闭
---
## desc-cn

点击确定后异步关闭 Popconfirm，例如提交表单。



```html
<!-- HTML 中使用 -->
<h3>Html: </h3>
<sp-popconfirm title='Are you sure?' 
 icon='sp-icon-success' id='popconfirm3' get-popup-container='.show-components' ok-text='Yes' cancel-text='No'>
   <sp-button type='link'>promise</sp-button>
</sp-popconfirm>    
<script>
    popconfirm3.onConfirm = (e) => { 
        e.target['attr-loading'] = true;
        return new Promise((resolve) => {
            setTimeout(() => {
                e.target['attr-loading'] = false;
                Spui.Message.success('promise 3000ms')
                resolve()
            }, 3000)
        })
    }
</script>
```

```jsx
// React 中使用
import React,{useRef, useState, useEffect} from 'react';
const Demo = () => {
    const c = useRef();
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        c.current.onVisibleChange = (visible) => {
            visible && setVisible(visible)
        }
         c.current.onConfirm = (e) => {
            e.target['attr-loading'] = true
            return Spui.Message.loading('wait...').then(() => {
                e.target['attr-loading'] = false
            })
        };
    }, [])
    return <div>
    <h3>React: message的异步</h3>
       <sp-popconfirm title='Are you sure?' ref={c} icon='sp-icon-success'  get-popup-container='.show-components' ok-text='Yes' cancel-text='No'>
            <sp-button type='link'>async message</sp-button>
        </sp-popconfirm>     
    </div>
}

ReactDOM.render(<Demo />, mountNode);
```
