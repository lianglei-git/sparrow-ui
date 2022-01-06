---
order: 1
title: 基本的使用
---



## desc-cn 
包含标题、内容、操作区域。

```html
<h3>Html: </h3>
<sp-card style='width=340px' title='第一个卡片' extra='<a>更多</a>'>
    <p>内容6666</p>
    <p>内容9999</p>
    <p>内容0000</p>
</sp-card>
```

```jsx
const Demo = () => {
    return <div>
    <h3>React: </h3>
        <sp-card style={{width:'340px'}} title='第一个卡片' extra='<a>更多</a>'>
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