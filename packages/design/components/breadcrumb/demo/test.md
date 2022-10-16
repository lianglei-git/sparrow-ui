---
order: 0
title: 测试模块
---
## desc-cn

测试模块


```jsx
const Test = () => { 

    return <div>
        <sp-breadcrumb separator='>'>
        <sp-breadcrumb-item> <a href='/'> 首页</a> </sp-breadcrumb-item>
        <sp-breadcrumb-item>导航一</sp-breadcrumb-item>
        <sp-breadcrumb-item>导航二</sp-breadcrumb-item>
        <sp-breadcrumb-item>导航三</sp-breadcrumb-item>
        </sp-breadcrumb>
    </div>
}

ReactDOM.render(<Test />, mountNode);
```