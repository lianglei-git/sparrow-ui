---
order: 4
title: icon
---


## desc-cn
自定义icon

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-alert title='成功提示的文案' icon='success' > </sp-alert>
<sp-alert title='消息提示的文案' type='info' icon='info' closable='true' effect="dark"> </sp-alert>

```


```jsx
// React 中使用
const Alert = () => {
    return <div> 
        <sp-alert title='警告提示的文案' type='warning' icon='copy' > </sp-alert>
    
    </div>
}

ReactDOM.render(<Alert />, mountNode);

```

<style>
    sp-alert{
        margin-bottom:10px !important
    }
</style>