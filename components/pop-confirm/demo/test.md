---
order: 0
title: 测试模块
---
## desc-cn

测试模块



```jsx
import React,{useRef, useState, useLayoutEffect} from 'react'
const Test = () => {
    const c = useRef();
    const d = useRef();
    const [visible, setVisible] = useState(true)
    useLayoutEffect(() => {
        c.current.onVisibleChange = visible => {
            console.log(visible)
        }
        c.current.onConfirm = (e) => {
            e.target['attr-loading'] = true
            return new Promise(resolve => {
                setTimeout(() => {
                     e.target['attr-loading'] = false
                    resolve()
                    }, 3000);
            })
        };
        d.current.onVisibleChange = (visible) => {
            visible && setVisible(visible)
        }
        d.current.okButtonProps = {
            type: 'dashed',
            size: 'small',
            shape: 'round'
        }
        d.current.onConfirm = e => {
             e.target['attr-loading'] = true
            setTimeout(() => {
             e.target['attr-loading'] = false
                setVisible(false)
            }, 3000);
        }
         d.current.onCancel = _ => {
              setVisible(false)
        }
    }, [])
    return <div>
        <sp-popconfirm title='Are you sure to delete this task?' ref={c} trigger='click' get-popup-container='.show-components'>
        99
        </sp-popconfirm>

        <sp-popconfirm title='Are you sure to delete this task?' ref={d} visible={visible} trigger='click' get-popup-container='.show-components'>
        100
        </sp-popconfirm>
            
    </div>
}
ReactDOM.render(<Test />, mountNode);
```

<style>
.sp-icon-loading {
    color: #f53f3f
}
</style>