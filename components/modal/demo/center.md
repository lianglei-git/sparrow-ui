---
order: 3
title: 居中布局
---

## desc-cn
垂直居中展示 Modal

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-button onclick="modalthree['attr-visible'] = true" type="primary">Html垂直弹窗</sp-button>
<sp-modal id="modalthree" center>
    <div slot='content'>Super Sparrow</div>
</sp-modal>
<script>
    modalthree.onClose = function () {
        this.setAttribute('visible', false)
    }
    modalthree.onOk = function () {
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
        <sp-button onClick={e => setVisible(true)} > Jsx垂直弹窗 </sp-button>
        <sp-modal ref={modalone} title="Basic Modal" center visible={visible} >
                <div slot="content">Some contents....</div>
        </sp-modal>
    </>
}

ReactDOM.render(<Modal />, mountNode);

```


