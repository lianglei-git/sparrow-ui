import React, { useState } from 'react'
import { Button } from 'sparrow-ui/button/index'


const Home = (props:any) => {
    let [shape, setshape] = useState('default')
    const click = (e:any) => {
        console.log(e, 'sparrow')
    }
    return <div>    
            {/* <button onClick={e => click(e)}>99</button> */}
        主页
        <sp-button shape={shape} loading class="sp-button-123" onClick={e => click(e)}> <span>布局</span> </sp-button>
        <button onClick={() => setshape(['circle', 'round', 'default'][Math.floor(Math.random() * 3)])}>修改类型</button>
    </div>
}
export default Home