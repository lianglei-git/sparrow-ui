---
order: 1
title: 基本使用
---
## desc-cn

适用广泛的基础用法。

```html
<h3>Html：</h3>
<sp-breadcrumb separator='👉'>
    <sp-breadcrumb-item><a href='/'> 首页</a> </sp-breadcrumb-item>
    <sp-breadcrumb-item>活动管理</sp-breadcrumb-item>
    <sp-breadcrumb-item>活动列表</sp-breadcrumb-item>
    <sp-breadcrumb-item>活动详情</sp-breadcrumb-item>
</sp-breadcrumb>
```

```jsx
const Test = () => { 

    return <div>
        <sp-breadcrumb>
        <sp-breadcrumb-item><a href='/'> 首页</a> </sp-breadcrumb-item>
        <sp-breadcrumb-item>活动管理</sp-breadcrumb-item>
        <sp-breadcrumb-item>活动列表</sp-breadcrumb-item>
        <sp-breadcrumb-item>活动详情</sp-breadcrumb-item>
        </sp-breadcrumb>
    </div>
}

ReactDOM.render(<Test />, mountNode);
```