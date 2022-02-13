// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
// import ReactDOM  from 'react-dom'
import './index.less';
if (typeof window !== 'undefined') {
    window.$ = s => document.querySelector(s);

}
const Home = (props) => {

    return <div className="home">
        <div className="logo-home"></div>
        <h1>Sparrow UI</h1>
        <h2>一个基于JavaScript的响应式的简洁UI组件库</h2>
        <div className='ot'>
            <sp-button type='primary' shape="round"><a href="/components/modal/">开始使用</a></sp-button>
            <sp-button shape="round"><a href="https://github.com/lianglei-git" target="_blank">Github</a></sp-button>
        </div>
        <div className="fixed-cop">
            <span>备案</span>
        </div>
    </div>
}
export default Home                 