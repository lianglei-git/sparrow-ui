---
order: 1
title: 基本
---


## desc-cn
页面中的非浮层元素，不会自动消失。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-alert title='成功提示的文案'> </sp-alert>
<sp-alert title='消息提示的文案' type='info' closable='true'> </sp-alert>

```


```jsx
// React 中使用
const Alert = () => {
    return <div> 
        <sp-alert title='警告提示的文案' type='warning'> </sp-alert>
        <sp-alert title='错误提示的文案' type='danger'> </sp-alert>
    
    </div>
}

ReactDOM.render(<Alert />, mountNode);

```

<style>
    sp-alert{
        margin-bottom:10px !important
    }
</style>