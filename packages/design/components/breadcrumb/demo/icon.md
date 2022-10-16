---
order: 2
title: 图标分隔符
---


```jsx
const Test = () => { 

    return <div>
        <sp-breadcrumb separator-class='sp-icon-backward'>
        <sp-breadcrumb-item><a href='/'> 首页</a> </sp-breadcrumb-item>
        <sp-breadcrumb-item>活动管理</sp-breadcrumb-item>
        <sp-breadcrumb-item>活动列表</sp-breadcrumb-item>
        <sp-breadcrumb-item>活动详情</sp-breadcrumb-item>
        </sp-breadcrumb>
    </div>
}

ReactDOM.render(<Test />, mountNode);
```