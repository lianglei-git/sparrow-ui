---
order: 2
title: 主题
---


## desc-cn
Alert 组件提供了两个不同的主题：light和dark。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-alert title='成功提示的文案' effect="dark"> </sp-alert>
<sp-alert title='消息提示的文案' type='info' closable='true' effect="dark"> </sp-alert>

```


```jsx
// React 中使用
const Alert = () => {
    return <div> 
        <sp-alert title='警告提示的文案' type='warning' effect="dark"> </sp-alert>
        <sp-alert title='错误提示的文案' type='danger' effect="dark"> </sp-alert>
    
    </div>
}

ReactDOM.render(<Alert />, mountNode);

```

<style>
    sp-alert{
        margin-bottom:10px !important
    }
</style>