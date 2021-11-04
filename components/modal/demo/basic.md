---
order: 1
title: 基本
---

## desc-cn
第一个对话框。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-button onclick="modal['attr-visible'] = true" type="primary">Html弹窗</sp-button>
<sp-modal id="modal">
    <div slot='content'>Super Sparrow</div>
</sp-modal>
<script>
    modal.onClose = function () {
        this.setAttribute('visible', false)
    }
    modal.onOk = function () {
        this.setAttribute('visible', false)
    }
</script>
```



```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react'

const Modal = () => {
    let [visible, setVisible] = useState(false);
    let modalone = useRef()
    useEffect(() => {
        modalone.current.onClose = () => {
            setVisible(false)
        }
        modalone.current.onOk = () => {
            Spui.Message.success({
                message: '魔法最终战胜了魔法',
                duration: 3000,
                showclose: true,
                center: true
            })
            setVisible(false)
        }
    }, [])
   return <>
        <h3>React:</h3>
        <sp-button onClick={e => setVisible(true)} > Jsx弹窗 </sp-button>
        <sp-modal ref={modalone} title="Basic Modal" visible={visible} >
                <div slot="content">Some contents....</div>
        </sp-modal>
    </>
}

ReactDOM.render(<Modal />, mountNode);

```


