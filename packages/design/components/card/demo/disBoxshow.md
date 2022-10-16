---
order: 3
title: 禁止悬停
---



## desc-cn 
通过设置属性`dis-hover="true"`来禁用鼠标悬停显示阴影的效果。

```html
<h3>Html: </h3>
<sp-card style='width=340px' title='标题' dis-hover='true'>
    <p>内容6666</p>
    <p>内容9999</p>
    <p>内容0000</p>
</sp-card>
```

```jsx
const Demo = () => {
    return <div>
    <h3>React: </h3>
        <sp-card style={{width:'340px'}} title='标题' >
            <div>
                <p>内容6666</p>
                <p>内容9999</p>
                <p>内容0000</p>
            </div>
        </sp-card>
        </div>
}
ReactDOM.render(<Demo />, mountNode)
```