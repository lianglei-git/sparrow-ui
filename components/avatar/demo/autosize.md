---
order: 3
title: 自动调节字节
---



## desc-cn 
对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。

```html
<h3>Html:</h3>
<sp-avatar shape='circle' style='background-color: #f56a00'>R</sp-avatar>
<sp-avatar shape='circle' style='background-color: rgb(114, 101, 230)'>USER</sp-avatar>
<sp-avatar shape='circle' style='background-color: rgb(255, 191, 0)'>Rads</sp-avatar>
<sp-avatar shape='circle' style='background-color: rgb(0, 162, 174)'>Motivation</sp-avatar>

```


```jsx
const Demo = () => {
    return <div>
    <h3>React:</h3>
        <sp-avatar shape='circle' style={{ backgroundColor: '#f56a00'}}>R</sp-avatar>
        <sp-avatar shape='circle' style={{ backgroundColor: 'rgb(114, 101, 230)'}}>USER</sp-avatar>
        <sp-avatar shape='circle' style={{ backgroundColor: 'rgb(255, 191, 0)'}}>Rads</sp-avatar>
        <sp-avatar shape='circle' style={{ backgroundColor: 'rgb(0, 162, 174)'}}>Motivation</sp-avatar>
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