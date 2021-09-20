import React, { useState } from 'react'

import App from './App'
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const Home = (props:any) => {
    let [shape, setshape] = useState('default')
    return <div>    

        主页
        <sp-button shape={shape} loading class="sp-button-123">布局</sp-button>
        <button onClick={() => setshape(['circle', 'round', 'default'][Math.floor(Math.random() * 3)])}>修改类型</button>
    </div>
}
export default Home