---
order: 0
title: 测试板块
---


## desc-cn 
测试咯

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
return <div> 
<sp-slider default={9}></sp-slider>
<sp-slider default={9} reverse='true'></sp-slider>
<sp-slider default={[5.5, 7]}></sp-slider>
<sp-slider default="[6, 7]" reverse='true'></sp-slider>
<sp-slider default="[6, 7]" tooltipvisible='false'></sp-slider>
</div>
}
ReactDOM.render(<Test />, mountNode)

```