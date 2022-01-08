---
order: 1
title: 基本
---

## desc-cn 
水平分割线
默认为水平分割线，可在中间加入文字。

```html
<h3>Html:</h3>
    <p>时间（Time）是物质的永恒运动、变化的持续性、顺序性的表现，包含时刻和时段两个概念。</p>
    <sp-divider></sp-divider>
    <p>时间是人类用以描述物质运动过程或事件发生过程的一个参数，确定时间，是靠不受外界影响的物质周期变化的规律。</p>
    <sp-divider>时间</sp-divider>

```


```jsx
const Demo = () => {
    return <div>
    <h3>React:</h3>
    <p>文明，是人类历史积累下来的有利于认识和适应客观世界、符合人类精神追求、能被绝大多数人认可和接受的人文精神、发明创造的总和</p>
        <sp-divider></sp-divider>
    <p>文明是使人类脱离野蛮状态的所有社会行为和自然行为构成的集合，至少包括了以下要素：家族、工具、语言、文字、宗教、城市、乡村和国家等等。</p>
        <sp-divider>文明</sp-divider>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```