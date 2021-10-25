import React, { useEffect, useRef } from 'react'
import {Link} from 'bisheng/router'
import './index.less';
const Header: React.FC = () => {
    const l = [{
        to: '/',
        label: '设计'
    },
    {
        to: '/docs',
        label: '文档'
    },
    {
        to: '/components/modal/',
        label: '组件'
    },
    {
        to: '/theme',
        label: '主题'
    }, {
        to: '/github',
        label: 'github'
    },
]

    useEffect(() => {
    }, [])
    // function go(o:object | any) {
    //     if(o.to.indexOf('components') > 0) {
    //         header.current.classList.add('cmps')
    //     }
    //     // throw new Error('Function not implemented.');
    // }
    return <section className='Header'>
        <div>
            <div className="l-h">
                <div className="logo">
                    <span>Logo</span>

                    Sprrow
                </div>
                <div>
                    Search
                </div>
            </div>
            <div className="r-h">
                <div className="l">
                    <ul>
                        {
                            l.map(i => {
                                return <li key={i.label}>
                                    <Link to={i.to} > {i.label}</Link>
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


