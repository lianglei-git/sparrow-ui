---
order: 2
title: 无边框
---



## desc-cn 
通过设置属性`no-border="true"` ，可以不添加边框，建议在灰色背景下使用。

```html
<h3>Html: </h3>
<sp-card style='width=340px' title='无边框' no-boder='true'>
    <p>内容6666</p>
    <p>内容9999</p>
    <p>内容0000</p>
</sp-card>
```

```jsx
const Demo = () => {
    return <div>
    <h3>React: </h3>
        <sp-card style={{width:'340px'}} title='无边框' no-boder='true'>
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