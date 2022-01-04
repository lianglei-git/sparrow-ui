---
order: 1
title: 基本
---



## desc-cn 
头像有三种尺寸，两种形状可选。
属性 `size` 可以设置为数值


```jsx
const Demo = () => {
    return <div>
        <sp-avatar icon='sp-icon-atm' shape='circle' style={{width: '64px', height: '64px', fontSize: '32px', lineHeight: '64px'}}></sp-avatar>
        <sp-avatar icon='sp-icon-atm' shape='circle' size='large'></sp-avatar>
        <sp-avatar icon='sp-icon-atm' shape='circle'></sp-avatar>
        <sp-avatar icon='sp-icon-atm' shape='circle' size='small'></sp-avatar>
        <br />
        <sp-avatar icon='sp-icon-atm' style={{width: '64px', height: '64px', fontSize: '32px', lineHeight: '64px'}}></sp-avatar>
        <sp-avatar icon='sp-icon-atm' size='large'></sp-avatar>
        <sp-avatar icon='sp-icon-atm' ></sp-avatar>
        <sp-avatar icon='sp-icon-atm' size='small'></sp-avatar>
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