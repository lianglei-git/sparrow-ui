---
order: 2
title: 类型
---



## desc-cn 
支持三种类型：图片、icon 以及字符，其中 icon 和字符型可以自定义图标颜色及背景色。


```html
<h3>Html:</h3>
        <sp-avatar icon='sp-icon-atm' shape='circle' ></sp-avatar>
        <sp-avatar shape='circle'>U</sp-avatar>
        <sp-avatar shape='circle'>USER</sp-avatar>
        <sp-avatar shape='circle' style='color: #f56a00; background-color: #fde3cf'>U</sp-avatar>
        <sp-avatar shape='circle' src='https://avatars3.githubusercontent.com/u/62378518'>默认</sp-avatar>
        <sp-avatar shape='circle' icon='sp-icon-atm' style='background-color: #87d068'></sp-avatar>
```

```jsx
const Demo = () => {
    return <div>
    <h3>React:</h3>
        <sp-avatar icon='sp-icon-atm' shape='circle'></sp-avatar>
        <sp-avatar shape='circle'>U</sp-avatar>
        <sp-avatar shape='circle'>USER</sp-avatar>
        <sp-avatar shape='circle' style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>U</sp-avatar>
        <sp-avatar shape='circle' src='https://avatars3.githubusercontent.com/u/62378518'>默认</sp-avatar>
        <sp-avatar shape='circle' icon='sp-icon-atm' style={{backgroundColor: '#87d068'}}></sp-avatar>
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