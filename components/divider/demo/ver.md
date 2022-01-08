---
order: 3
title: 垂直
---

## desc-cn 
使用`type="vertical"`设置为行内的垂直分割线。

```html
<h3>Html:</h3>
        标题1<sp-divider type='vertical'></sp-divider>
        标题2<sp-divider type='vertical'></sp-divider>
        标题3
```

```jsx
const Demo = () => {
    return <div>
    <h3>React:</h3>
        标题1<sp-divider type='vertical'></sp-divider>
        标题2<sp-divider type='vertical'></sp-divider>
        标题3
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```