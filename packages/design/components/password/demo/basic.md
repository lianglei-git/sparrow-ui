---
order: 1
title: 基本
---

## desc-cn 
基本使用。

```html
<h3>Html: 基本使用</h3>
<sp-password placeholder='password'></sp-password>
<br/>
<sp-password placeholder='password' style='width:300px' addon-before='卡密码:'></sp-password>
<br/>
<sp-password placeholder='clear' allow-clear='true' style='width:300px' prefix='<span>🈳️</span>'></sp-password>
<br />
<sp-password placeholder='password' style='width:300px' addon-after='IP'></sp-password>

```


```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
       <sp-password placeholder='password'></sp-password>
       <br/>
       <sp-password placeholder='password' visible='false'></sp-password>
       
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
<style>
    .sp-password {
        margin-top:10px;
        width:150px;
    }
</style>