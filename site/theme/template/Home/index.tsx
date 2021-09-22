import React, { useState } from 'react'
import { Button } from 'sparrow-ui/button/index'


const Home = (props:any) => {
    let [shape, setshape] = useState('default')
    const click = (e:any) => {
        console.log(e)
    }
    return <div>    

        主页
        <sp-button shape={shape} loading class="sp-button-123" on={JSON.stringify({click:() => {console.log(7689)}})}>布局</sp-button>
        <button onClick={() => setshape(['circle', 'round', 'default'][Math.floor(Math.random() * 3)])}>修改类型</button>
    </div>
}
export default Home