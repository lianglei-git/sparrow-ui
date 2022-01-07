---
order: 0
title: 测试板块
---



## desc-cn 
测试咯


```jsx
const Demo = () => {
    return <div>
    <sp-collapse active-index='1' accordion='true'>
        <sp-collapse-panel index='1' title='标题1'>
            <p>
            内嗯嗯额涅你</p>
            <p>
            啊时刻打开了手机</p>
        </sp-collapse-panel>
        <sp-collapse-panel index='2' title='标题1'>
            <div>
                <p>content....</p>
                <p>content....</p>
                <p>content....</p>
             </div>
        </sp-collapse-panel>
    </sp-collapse>

    <sp-collapse active-index='2'>
        <sp-collapse-panel index='1' title='标题1'>
            <p>
            内嗯嗯额涅你</p>
            <p>
            啊时刻打开了手机</p>
        </sp-collapse-panel>
        <sp-collapse-panel index='2' title='标题1'>
            <div>
                <p>content....</p>
                <p>content....</p>
                <p>content....</p>
             </div>
        </sp-collapse-panel>
    </sp-collapse>

    <sp-collapse active-index='2'>
        <sp-collapse-panel index='1' title='标题1'>
            <p>
            内嗯嗯额涅你</p>
            <p>
            啊时刻打开了手机</p>
        </sp-collapse-panel>
        <sp-collapse-panel index='2' title='标题1' hide-arrow="true">
            <div>
                <p>content....</p>
                <p>content....</p>
                <p>content....</p>
             </div>
        </sp-collapse-panel>
    </sp-collapse>

    <sp-collapse active-index='2' ghost='true'>
        <sp-collapse-panel index='1' title='标题1'>
            <p>
            内嗯嗯额涅你</p>
            <p>
            啊时刻打开了手机</p>
        </sp-collapse-panel>
        <sp-collapse-panel index='2' title='标题1' hide-arrow="true">
            <div>
                <p>content....</p>
                <p>content....</p>
                <p>content....</p>
             </div>
        </sp-collapse-panel>
    </sp-collapse>
    
     <sp-collapse active-index='2' simple='true'>
        <sp-collapse-panel index='1' title='标题1'>
            <p>
            内嗯嗯额涅你</p>
            <p>
            啊时刻打开了手机</p>
        </sp-collapse-panel>
        <sp-collapse-panel index='2' title='标题1' hide-arrow="true">
            <div>
                <p>content....</p>
                <p>content....</p>
                <p>content....</p>
             </div>
        </sp-collapse-panel>
    </sp-collapse>

    
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    sp-collapse {
        margin-top: 20px
    }
</style>