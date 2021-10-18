// @ts-nocheck
<<<<<<< HEAD
import React, { useState , useEffect} from 'react'
// import sp-button from 'sp-button'

=======
import React, { useState, useEffect, useRef } from 'react'
import './index.less'
>>>>>>> master
const Home = (props: any) => {
    let [shape, setshape] = useState('default')
    let [isloading, setloading] = useState(false)
    let [isloading1, setloading1] = useState(false)
    let [visible, setVisible] = useState(false)
    let [visible2, setVisible2] = useState(false)
    let [visible3, setVisible3] = useState(false)
    let [visible4, setVisible4] = useState(false)
    let [visible5, setVisible5] = useState(false)
    let modalone = useRef()
    let modaltwo = useRef()
    let modalthree = useRef()
    let modalfour = useRef()
    let modalfive = useRef()
    const click = (e: any) => {
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
    return <div>
        {/* <button onClick={e => click(e)}>99</button> */}
        主页
        <sp-button loading={JSON.stringify({ m: 123, b: 123 })} class="sp-button-123" onClick={e => click(e)} disabled="true"> <span>布局</span> </sp-button>
        <button onClick={() => setshape(['circle', 'round', 'default'][Math.floor(Math.random() * 3)])}>修改类型</button>
        <hr />
        <sp-button onClick={() => setloading(!isloading)}>修改loading</sp-button>

        <div className="group-loading-button">
            <h1>加载按钮</h1>
            <sp-button loading={true} class="sp-button-123" >Loading</sp-button>
            <sp-button loading={true} class="sp-button-123" shape={shape}> </sp-button>
            <sp-button shape={shape} loading={isloading1} class="sp-button-123" onClick={e => {
                setloading1(true)
                setTimeout(() => {
                    setloading1(false)
                }, 3000);
            }}> <span>click me</span></sp-button>
        </div>

        <div className="group-size-button">
            <h1>大小按钮</h1>
            <sp-button size={'middle'} class="sp-button-123" >Loading</sp-button>
            <sp-button size={'small'} class="sp-button-123" >Loading</sp-button>
            <sp-button size={'mini'} class="sp-button-123" >Loading</sp-button>
            <sp-button size={'mini'} loading={true} class="sp-button-123" > </sp-button>
            <sp-button shape={shape} size={'mini'} loading={isloading1} class="sp-button-123" onClick={e => {
                setloading1(true)
                setTimeout(() => {
                    setloading1(false)
                }, 3000);
            }}> <span>click me</span></sp-button>
        </div>
<<<<<<< HEAD
=======
        {/* 
>>>>>>> master
        <sp-modal title="111" appendbody>
            <div>说到健身房看见还是恐惧的护肤科技</div>
        </sp-modal>
        

        {/* <sp-modal title="222"></sp-modal>
        <sp-modal title="333" appendbody></sp-modal> */}

<<<<<<< HEAD
=======
        <sp-modal title="222"></sp-modal>
        <sp-modal title="333" appendbody></sp-modal> */}
>>>>>>> master
        <div>
            <span>卡点测试</span>
        </div>

<<<<<<< HEAD
        {/* <sp-modal title="第一个modal" ></sp-modal>

        <sp-modal title="第二个modal" title></sp-modal> */}

=======
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
            <sp-modal ref={modaltwo} title="嵌套modal" visible={visible2} center={false}>
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

        {/* <sp-modal title="333" appendbody visible></sp-modal> 
        <sp-modal title="444" appendbody visible></sp-modal> 
        <sp-modal title="555" appendbody visible></sp-modal> 
        <sp-modal title="666" appendbody visible></sp-modal>  */}
>>>>>>> master
    </div>
}
export default Home