---
order: 0
title: 测试模块
---
## desc-cn

测试模块



```jsx
import React,{useRef, useEffect} from 'react'
const Test = () => {
    const c = useRef();
    useEffect(() => {
        c.current.onVisibleChange = visible => {
            console.log(visible)
        }
        //  c.current['attr-visible'] = true 
    }, [])
    return <div>
        六六六啊 
        <sp-tooltip title='999999' trigger='["click", "contextmenu"]' get-popup-container='.show-components' classname='ssllsl'>
            <sp-button>何为圣人？（点击）</sp-button>
        </sp-tooltip>

        <sp-tooltip title='NoYYYADHADBASDJs' get-popup-container='.show-components' trigger='contextmenu'>
            <sp-button>右键</sp-button>
        </sp-tooltip>

        <sp-tooltip title='NoYYYADHADBASDJs' get-popup-container='.show-components' ref={c}>
            <sp-button>不知不晓（滑动）</sp-button>
        </sp-tooltip>


        <sp-tooltip title='NoYYYADHADBASDJs' get-popup-container='.show-components' trigger='focus'>
            <sp-button>聚焦</sp-button>
        </sp-tooltip>

        <sp-tooltip title='NoYYYADHADBASDJs' color='red' popupstyle='color:#fff' get-popup-container='.show-components' trigger='focus' arrow-point-at-center='true'>
            <sp-button>聚焦</sp-button>
        </sp-tooltip>
            
    </div>
}
ReactDOM.render(<Test />, mountNode);
```