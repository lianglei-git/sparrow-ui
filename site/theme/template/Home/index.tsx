// @ts-nocheck
import React, { useState , useEffect} from 'react'
// import sp-button from 'sp-button'

const Home = (props: any) => {
    let [shape, setshape] = useState('default')
    let [isloading, setloading] = useState(false)
    let [isloading1, setloading1] = useState(false)
    const click = (e: any) => {
        console.log(e, 'sparrow')
    }
    return <div>
        {/* <button onClick={e => click(e)}>99</button> */}
        主页
        <sp-button  loading={JSON.stringify({m:123,b:123})} class="sp-button-123" onClick={e => click(e)} disabled="true"> <span>布局</span> </sp-button>
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
            <sp-button  size={'mini'} loading={true} class="sp-button-123" > </sp-button>
            <sp-button shape={shape}  size={'mini'} loading={isloading1} class="sp-button-123" onClick={e => {
                setloading1(true)
                setTimeout(() => {
                    setloading1(false)
                }, 3000);
            }}> <span>click me</span></sp-button>
        </div>
        <sp-modal title="111" appendbody>
            <div>说到健身房看见还是恐惧的护肤科技</div>
        </sp-modal>
        

        {/* <sp-modal title="222"></sp-modal>
        <sp-modal title="333" appendbody></sp-modal> */}

        <div>
            <span>卡点测试</span>
        </div>

        {/* <sp-modal title="第一个modal" ></sp-modal>

        <sp-modal title="第二个modal" title></sp-modal> */}

    </div>
}
export default Home