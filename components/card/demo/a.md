---
order: 0
title: 测试板块
---



## desc-cn 
测试咯


```jsx
const Demo = () => {
    return <div>
        <sp-card style={{width:'340px'}} title='第一个卡片' extra='<a>更多</a>'>
            <div>
                <p>内容6666</p>
                <p>内容9999</p>
                <p>内容0000</p>
            </div>
        </sp-card>
         <sp-card style={{width:'340px'}} title='第一个卡片' dis-hover='false' extra='<a>更多</a>'>
            <div>
                <p>内容6666</p>
                <p>内容9999</p>
                <p>内容0000</p>
            </div>
        </sp-card>
        <sp-card style={{width:'340px'}} title='第一个卡片' extra='<a>更多</a>' no-boder='true'>
            <div>
                <p>内容6666</p>
                <p>内容9999</p>
                <p>内容0000</p>
            </div>
        </sp-card>

        <sp-card >
            <div>
                <p>内容6666</p>
                <p>内容9999</p>
                <p>内容0000</p>
            </div>
        </sp-card>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    a {
        color: blue;
    }
    sp-card {
        margin-top: 20px
    }
</style>