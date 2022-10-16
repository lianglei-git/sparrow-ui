---
order: 5
title: 加载中...
---
## desc-cn

加载中有两种方式，但如果继续添加的情况下需要重置`pending`或自定义`icon`为`sp-icon-loading`。

```html
<!-- HTML 中使用 -->
<h3>Html: 还可以使用pending变更 </h3>
<sp-button onclick="upPending['attr-pending']='true'">更为loading</sp-button>
<sp-button onclick="addItem()">添加一条</sp-button>
<sp-timeline id="upPending">
    <sp-timeline-item>Create a services site 2015-09-01</sp-timeline-item>
    <sp-timeline-item>Solve initial network problems 2015-09-01</sp-timeline-item>
</sp-timeline>
<script>
    window.addItem = function() {
        upPending['attr-pending']='false'
        let nitem = document.createElement('sp-timeline-item');
        nitem.innerText = '努力加载中...';
        upPending.append(nitem);
        nitem.onload = () => upPending['attr-pending']='true'
    }
   
</script>
```

```jsx
// React 中使用
import React, { useState, useEffect, useRef } from 'react';
let n = [
        {
            label:'第4步',
            content: '徒步法考'
        },
        {
            label:'第5步',
            content: '律师之年'
        },
        {
            label:'第6步',
            content: '先见之正义，后思至货币'
        },
        {
            label:'第7步',
            content: '觉悟已此，致良知。'
        },
        {
            label:'第8步',
            content: '云南小镇牧场，收关。'
        },
        {
            label:'最后',
            content: '当生则生，当死则死。'
        },
    ];
const Test = () => {
    let [lines, setLines] = useState([
        {
            label:'第1步',
            content: '先学民法'
        },
        {
            label:'第2步',
            content: '再学民诉'
        },
        {
            label:'第3步',
            content: 'b站搜索罗小翔学刑法等等'
        },
    ]);


    return <>
        <h3>React: 你可以使用icon变更 </h3>
        <sp-button onClick={() => n.length > 0 && setLines([...lines,n.shift()])}>next?</sp-button>
        <sp-timeline>
            {lines.map((i, key) => {
                return <sp-timeline-item key={key} label={i.label} 
                icon={i.label == '最后' ? 'sp-icon-success': key == lines.length-1 ? 'sp-icon-loading': ''}>{i.content}</sp-timeline-item>  
            })}
        </sp-timeline>
    </>
}
ReactDOM.render(<Test />, mountNode)
```

