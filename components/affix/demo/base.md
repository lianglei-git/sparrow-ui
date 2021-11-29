---
order: 1
title: 基本用法
---



## desc-cn 
最简单的用法。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-affix offset-top='64' >
            <sp-button type='primary'>affix top</sp-button>
</sp-affix>
```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
    const [percentage, setpercentage] = useState(0)
    return <div>
    <h3>React:</h3>
    <div className='box'>
        <sp-affix offset-bottom='10' >
            <sp-button type='primary'>affix bottom</sp-button>
        </sp-affix>

    </div>
        
    </div>
}
ReactDOM.render(<Test />, mountNode)
```