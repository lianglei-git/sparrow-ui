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
        <sp-tooltip title='可用来代替系统默认的 title 提示，提供一个 按钮/文字/操作 的文案解释。可用来代替系统默认的 title 提示，提供一个 按钮/文字/操作 的文案解释。可用来代替系统默认的 title 提示，提供一个 按钮/文字/操作 的文案解释。' trigger='["click", "contextmenu"]' 
         popupstyle='width:50px'
        get-popup-container='.show-components' classname='ssllsl'>
            <sp-button>何为圣人？（点击 + 右键）</sp-button>
        </sp-tooltip>
        <sp-tooltip title='999999' placement='top-left' trigger='["click", "contextmenu"]' get-popup-container='.show-components' 
        arrow-point-at-center='true' 
        classname='ssllsl'>
            <sp-button>何为圣人？top-left</sp-button>
        </sp-tooltip>
        <sp-tooltip title='999999' placement='top-right' trigger='["click", "contextmenu"]' get-popup-container='.show-components' 
        arrow-point-at-center='true' 
        classname='ssllsl'>
            <sp-button>何为圣人？top-right</sp-button>
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

        <sp-tooltip title='NoYYYADHADBASDJs' color='red' popupstyle='color:#fff' get-popup-container='.show-components' trigger='focus' >
            <sp-button>自定义颜色</sp-button>
        </sp-tooltip>


        <sp-tooltip title='NoYYYADHADBASDJs' color='red' popupstyle='color:#fff' placement='bottom' get-popup-container='.show-components' trigger='click' arrow-point-at-center='true'>
            <sp-button>bottom</sp-button>
        </sp-tooltip>
        <sp-tooltip title='爱在西元前，是啊吗 挨顿马丁可用来代替系统默认的 title 提示，提供一个 按钮/文字/操作 的文案解释。可用来代替系统默认的 title 提示，提供一个 按钮/文字/操作 的文案解释。' color='red' popupstyle='color:#fff' placement='bottom-left' get-popup-container='.show-components' trigger='click'>
            <sp-button>bottom-left</sp-button>
        </sp-tooltip>

        <sp-tooltip title='爱在西元前，是啊吗 挨顿马丁' color='red' popupstyle='color:#fff' placement='bottom-right' get-popup-container='.show-components' trigger='click'>
            <sp-button>bottom-right</sp-button>
        </sp-tooltip>

        <sp-tooltip title='NoYYYADHADBASDJs' placement='left' get-popup-container='.show-components' trigger='click' arrow-point-at-center='true'>
            <sp-button>left</sp-button>
        </sp-tooltip>
        <sp-tooltip title='阿克索德了解阿莱克斯的拉卡斯蒂略 拉开三等奖阿莱克斯的拉开' 
        popupstyle='width:50px'
        placement='left-top' get-popup-container='.show-components' trigger='click'>
            <sp-button>left-top阿克</sp-button>
        </sp-tooltip>
        <sp-tooltip title='NoYYYADHADBASDJs' placement='left-bottom' get-popup-container='.show-components' trigger='click'>
            <sp-button>left-bottom</sp-button>
        </sp-tooltip>

        <sp-tooltip title='NoYYYADHADBASDJs' placement='right' get-popup-container='.show-components' trigger='click' arrow-point-at-center='true'>
            <sp-button>right</sp-button>
        </sp-tooltip>
        <sp-tooltip title='NoYYYADHADBASDJs' placement='right-top' get-popup-container='.show-components' trigger='click'>
            <sp-button>right-top</sp-button>
        </sp-tooltip>

        <sp-tooltip title='NoYYYADHADBASDJs' placement='right-bottom'
        popupstyle='width:50px'
        get-popup-container='.show-components' trigger='click'>
            <sp-button>right-bottom</sp-button>
        </sp-tooltip>
            
    </div>
}
ReactDOM.render(<Test />, mountNode);
```