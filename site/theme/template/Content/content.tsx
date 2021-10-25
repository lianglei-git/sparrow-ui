import React, { useEffect } from 'react';
import './index.less';
import {$el} from 'sparrow-ui/es/_utils/dom'
 const Content = (props:any) => {
     const getMenuItems = () => {
         let cdata = props.data.components;
         let components = new Array()
         for(let k in cdata) {
             let _i = cdata[k]?.index
            let title = _i?.meta?.title || false;
            console.log(title)
            if(_i?.meta?.category === 'Components') {
                let typed = components.find($$i => $$i.type == _i?.meta?.type);
                if(typed) {
                    typed.children.push(_i?.meta)
                } else {
                    let type = {
                        type: _i?.meta?.type,
                        children: [_i?.meta]
                    }
                    components.push(type)
                }
            }
         }
        return <ul>
            {
                components.map(item => {
                    return <li key={item.type}>
                        <p>{item.type}</p>
                        <ol>
                            {item.children.map((i2:any) => {
                                return <li key={i2.title}>
                                    {i2.title} {i2.subTitle}
                                </li>
                            })}
                        </ol>
                    </li>
                })
            }
        </ul>
     }
    useEffect(() => {
        console.log(props);
        (document.querySelector('.Header') as any).classList.add('cmps')
    }, [])
    return <div className='main'>
        <div className="menu">
            {getMenuItems()}
        </div>
        <div className="show-components">

        </div>
        <div className="code">

        </div>
    </div>
}

export default Content