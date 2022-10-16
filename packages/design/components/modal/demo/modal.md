---
order: 2
title: 嵌套的 Dialog
---

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-button onclick="modal1['attr-visible'] = true" type="primary">Html嵌套弹窗</sp-button>
<sp-modal id="modal1">
    <div slot='content'>
        <sp-button onclick="modal2['attr-visible'] = true" > 打开子模块 </sp-button>
        <sp-modal id="modal2" title="children modal" appendbody='true' visible='false' class="children-modal">
            <div slot="content">嵌套子modal</div>
        </sp-modal>
        
    </div>
</sp-modal>
<script>
    modal1.onClose = function () {
        this.setAttribute('visible', false)
    }
    modal1.onOk = function () {
        this.setAttribute('visible', false)
    }
    modal2.onClose = function () {
        this.setAttribute('visible', false)
    }
    modal2.onOk = function () {
        this.setAttribute('visible', false)
    }
</script>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Modal = () => {
    let [visible, setVisible] = useState(false);
    let [visible3, setVisible3] = useState(false)
    let modalone = useRef()
    let modalthree = useRef()
    useEffect(() => {
        modalone.current.onClose = () => {
            setVisible(false)
        }
        modalone.current.onOk = () => {
            setVisible(false)
        }
        modalthree.current.onClose = () => {
            setVisible3(false)
        }
        modalthree.current.onOk = () => {
            Spui.Message.success('You win?')
            setVisible3(false)
        }
    }, [])
   return <>
        <h3>React:</h3>
        <sp-button onClick={e => setVisible(true)} > Jsx嵌套弹窗 </sp-button>
        <sp-modal ref={modalone} title="Basic Modal" visible={visible} >
                <div slot="content">
                    <sp-button onClick={e => setVisible3(true)} > 打开子模块 </sp-button>
                    <sp-modal ref={modalthree} title="children modal" appendbody visible={visible3} class="children-modal">
                        <div slot="content">嵌套子modal</div>
                    </sp-modal>
                </div>
        </sp-modal>
    </>
}

ReactDOM.render(<Modal />, mountNode);

```