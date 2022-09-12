
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'bisheng/router';
import './index.less';
let location = {pathname: ''}
if(typeof window != 'undefined') {
    location = window.location
}
 const Header: React.FC = () => {
    const [isotherClass, setOther] = useState('');
    const l = [{
        to: '/',
        label: '设计'
    },
    {
        to: '/docs/react/index/',
        label: '文档'
    },
    {
        to: '/components/overview/',
        label: '组件'
    },
    // {
    //     to: '/theme',
    //     label: '主题'
    // }, 
    {
        to: () => (<a href='https://github.com/lianglei-git/' target="_blank" >github</a>),
        label: 'github'
    },
    {
        to: '/custom',
        label: '定制'
    },
    ]

    useEffect(() => {
        setOther(location.pathname == '/' ? '' : 'other');
        if(location.pathname !== '/') {
            (document.querySelector('#react-content') as HTMLElement).classList.add('active')
        }  else {
            (document.querySelector('#react-content') as HTMLElement).classList.remove('active')

        }
    }, [location.pathname])

    return <section className={['Header', isotherClass].join(' ')} >
        <div className={isotherClass}>
            <div className="l-h">
                <Link to='/' className="logo">
                    <div className="img" > </div>
                    <span>Sprrow</span>
                </Link>
                {/* <div style={{width: 200}}>
                    <sp-search placeholder='搜索组件' allow-clear='true' enter-button='false' bordered='true' className='seatch-site' prefix='<span class="sp-icon sp-icon-search"></span>'></sp-search>
                    <div className='fixed--searchComs'></div>
                </div> */}
            </div>
            {/** 动画 */}
            <div className='c-center'></div>
            <div className="r-h">
                <div className="l">
                    <ul>
                        {
                            l.map(i => {
                                return <li key={i.label} className={location.pathname == i.to || (location.pathname.indexOf('components') > -1 && typeof i.to == 'string' && i.to.indexOf('components') > -1) ? 'active' : ''}>
                                    {
                                      typeof i.to == 'function'? i.to() :  <Link to={i.to} > {i.label}</Link>  
                                    }
                                   
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>

    </section>
}

export default Header


