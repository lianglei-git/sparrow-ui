---
order: 0
title: 测试板块
---



## desc-cn 
测试咯


```jsx
const Demo = () => {
    return <div>
        <sp-avatar>默认</sp-avatar>
        <sp-avatar src='https://img1.baidu.com/it/u=2810961871,2645366895&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'>默认</sp-avatar>
        <sp-avatar icon='sp-icon-close'>默认</sp-avatar>

        <br />

        size 
        <br />
        <sp-avatar icon='sp-icon-atm' style={{width: '64px', height: '64px', fontSize: '32px', lineHeight: '64px'}}></sp-avatar>
        <sp-avatar icon='sp-icon-atm' size='large'></sp-avatar>
        <sp-avatar icon='sp-icon-atm' ></sp-avatar>
        <sp-avatar icon='sp-icon-atm' size='small'></sp-avatar>
        <br />
        <sp-avatar icon='sp-icon-atm' shape='circle' style={{width: '64px', height: '64px', fontSize: '32px', lineHeight: '64px'}}></sp-avatar>
        <sp-avatar icon='sp-icon-atm' shape='circle' size='large'></sp-avatar>
        <sp-avatar icon='sp-icon-atm' shape='circle'></sp-avatar>
        <sp-avatar icon='sp-icon-atm' shape='circle' size='small'></sp-avatar>
        <br />
        type
        <br />
        <sp-avatar icon='sp-icon-atm' shape='circle'></sp-avatar>
        <sp-avatar shape='circle'>U</sp-avatar>
        <sp-avatar shape='circle'>USER</sp-avatar>
        <sp-avatar shape='circle' style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>U</sp-avatar>
        <sp-avatar shape='circle' src='https://avatars3.githubusercontent.com/u/62378518'>默认</sp-avatar>
        <sp-avatar shape='circle' icon='sp-icon-atm' style={{backgroundColor: '#87d068'}}></sp-avatar>

        <br />

        自动调整大小
        <br />
        
        <sp-avatar shape='circle' style={{ backgroundColor: '#f56a00'}}>R</sp-avatar>
        <sp-avatar shape='circle' style={{ backgroundColor: 'rgb(114, 101, 230)'}}>USER</sp-avatar>
        <sp-avatar shape='circle' style={{ backgroundColor: 'rgb(255, 191, 0)'}}>Rads</sp-avatar>
        <sp-avatar shape='circle' style={{ backgroundColor: 'rgb(0, 162, 174)'}}>Motivation</sp-avatar>


    </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    sp-avatar{
        margin-top: 15px;
        margin-right:15px
    }
</style>