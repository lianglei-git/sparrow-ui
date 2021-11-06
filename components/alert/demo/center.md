---
order: 5
title: 文字居中
---


## desc-cn
使用 center 属性让文字水平居中。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-alert title='成功提示的文案' center='true'> </sp-alert>
<sp-alert title='消息提示的文案' center='true' type='info' closable='true'> </sp-alert>

```


```jsx
// React 中使用
const Alert = () => {
    return <div> 
        <sp-alert title='警告提示的文案' center='true' type='warning'> </sp-alert>
        <sp-alert title='错误提示的文案' center='true' type='danger'> </sp-alert>
    
    </div>
}

ReactDOM.render(<Alert />, mountNode);

```

<style>
    sp-alert{
        margin-bottom:10px !important
    }
</style>