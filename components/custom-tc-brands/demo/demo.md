---
order: 1
title: 定制
---
## desc-cn

定制组件

```jsx
// React 中使用
import React from 'react';
const Buttons = () => {
    const click = (e) => {
        e.preventDefault()
        e.stopPropagation()
        window.brandsinit({
            target:e.target,
            callbacks:{
                onLevel3(_, item) {
                    alert(item.modelName);
                }
            }
        })
    }
   return <>
   <h3>React:</h3>
        <sp-button onClick={e => click(e)}>点我</sp-button>
    </>
}
ReactDOM.render(<Buttons />, mountNode);

```