---
order: 5
title: 异步关闭
---
## desc-cn

点击确定后异步关闭气泡确认框，例如提交表单。



```html
<!-- HTML 中使用 -->
<h3>Html:要利用 onVisibleChange 来处理visible的值</h3>
<sp-popconfirm title='Are you sure?' 
 icon='sp-icon-close' id='popconfirm1' visible='false' get-popup-container='.show-components' ok-text='Yes' cancel-text='No'>
   <sp-button type='link'>delay 3000ms</sp-button>
</sp-popconfirm>    

<script>
    popconfirm1.onVisibleChange = visible => (popconfirm1['attr-visible'] = visible)
    popconfirm1.onConfirm = (e) => {
        e.target['attr-loading'] = true;
        setTimeout(() => {
            e.target['attr-loading'] = false;
            popconfirm1['attr-visible'] = false;
            Spui.Message.success('ok')
        }, 3000)
    }
    popconfirm1.onCancel = () => {
        Spui.Message.error('Click on No')
        popconfirm1['attr-visible'] = false;
    }
</script>
```

```jsx
// React 中使用
import React,{useRef, useState, useEffect} from 'react';
const Demo = () => {
    const c = useRef();
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        c.current.onVisibleChange = (visible) => {
            visible && setVisible(visible)
        }
         c.current.onConfirm = (e) => {
            e.target['attr-loading'] = true
            setTimeout(() => {
                setVisible(false)
                    e.target['attr-loading'] = false
            }, 3000);
        };
        c.current.onCancel = () => {
            Spui.Message.error('Click on No')
          setVisible(false)
        }
    }, [])
    return <div>
    <h3>React: </h3>
       <sp-popconfirm ref={c} title='Are you sure?'  icon='sp-icon-success'  get-popup-container='.show-components' visible={visible} ok-text='Yes' cancel-text='No'>
    <sp-button type='link'>delay 3000ms</sp-button>
    </sp-popconfirm>     
    </div>
}

ReactDOM.render(<Demo />, mountNode);
```
