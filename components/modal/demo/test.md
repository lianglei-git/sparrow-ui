---
order: 0
title: 基础弹窗
---
## desc-cn

模态对话框。



```jsx
import 'sparrow-ui'
import React, { useState, useEffect, useRef } from 'react'
const Home = (props) => {
    let [shape, setshape] = useState('default')
    let [isloading, setloading] = useState(false)
    let [isloading1, setloading1] = useState(false)
    let [visible, setVisible] = useState(false)
    let [visible2, setVisible2] = useState(false)
    let [visible3, setVisible3] = useState(false)
    let [visible4, setVisible4] = useState(false)
    let [visible5, setVisible5] = useState(false)
    let [visible6, setVisible6] = useState(false)
    let modalone = useRef()
    let modaltwo = useRef()
    let modalthree = useRef()
    let modalfour = useRef()
    let modalfive = useRef()
    const click = (e) => {
        console.log(e, 'sparrow')
    }
    useEffect(() => {
        console.log(modalthree)
        modalone.current.onClose = () => {
            setVisible(false)
        }
        modaltwo.current.onClose = () => {
            setVisible2(false)
        }
        modalthree.current.onClose = () => {
            setVisible3(false)
        }
        modalfour.current.onClose = () => {
            setVisible4(false)
        }
        modalfive.current.onClose = () => {
            setVisible5(false)
        }
        modalfive.current.onOk = () => {
            console.log('‘确认收款')
            setVisible5(false)
        }
        modalone.current.onOk = () => {
            console.log('最终打败了魔法')
            setVisible(false)
        }
        modaltwo.current.onOk = () => {
            console.log('最终打败了魔法')
            setVisible2(false)
        }
        modalthree.current.onOk = () => {
            console.log('最终打败了魔法')
            setVisible3(false)
        }
        modalfour.current.onOk = () => {
            console.log('最终打败了魔法')
            setVisible4(false)
        } 
    }, [])
    const showMessage1 = () => {
        let random = Math.floor(Math.random()* 15 +9) ;
        let str = new Array(random).fill(false).reduce((t, a ,i) => {
            t += i +'-'
            return t
        }, '')

        Spui.Message.success({
            message: str,
            duration: 3000,
            showclose: true,
            beforeClose() {
                console.log('关闭前的回调')
            }
        })
    }
    return <div>
        <div className="group-modal">
            模块展示
            <sp-button onClick={e => setVisible(true)} > 打开基础弹窗 </sp-button>
            <sp-modal ref={modalone} title="第一个modal" visible={visible} setslotstyle='
            slot[name="content"]{
                display:block;
                color:red
            }
            '>
                内部外部好像没办法联通
            </sp-modal>

            <sp-button onClick={e => setVisible2(true)} > 打开嵌套modal </sp-button>
            <sp-modal ref={modaltwo} title="嵌套modal"  visible={visible2} center={false}>
                <div slot="content">
                <sp-button onClick={e => setVisible3(true)} > 打开子模块 </sp-button>
                <sp-modal ref={modalthree} title="子modal" appendbody visible={visible3} class="children-modal">
                    <div slot="content">嵌套子modal</div>
                </sp-modal>
                </div>

            </sp-modal>
            <sp-button onClick={e => setVisible4(true)} > 打开无遮罩 </sp-button>
            <sp-modal ref={modalfour} title="第4个modal" modal='false' center='false' visible={visible4} footer='null'>
                没有遮罩 modal = 'false'
            </sp-modal>
            
            <sp-button onClick={e => setVisible5(true)} > 打开 自定义footer </sp-button>
            <sp-modal ref={modalfive} title="第5个modal" modal='false' center='false' visible={visible5} cacceltext='关吧' oktext='👌'>
                <div slot="content">
        ????
                </div>
                <div slot='footer'>
                    自定义
                </div>
            </sp-modal>
        </div>

            <div className='group-message'>
            <sp-button onClick={() => showMessage1()}>打开message</sp-button>
            </div>
    </div>
}
ReactDOM.render(<Home />,
  mountNode,
);
```

```jsx
import 'sparrow-ui'
ReactDOM.render(
  <>
   双击666
   <sp-button>按钮点击</sp-button>
  </>,
  mountNode,
);
```