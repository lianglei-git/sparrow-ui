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
<sp-slider default={90}></sp-slider>
<sp-slider default={90} reverse='true'></sp-slider>
<sp-slider default={[50.5, 70.5]}></sp-slider>
<sp-slider default={[50, 70]} tooltipvisible='true' marks='{"20": "20°C", "87": "87°C"}'></sp-slider>
<sp-slider default={[44, 55]} draggabletrack='true' reverse='true'></sp-slider>
<sp-slider default="[22,33]" reverse='true'></sp-slider>
<sp-slider default="[18, 52]" tooltipvisible='false'></sp-slider>
<sp-slider default="64" vertical='true' style={{height:'300px'}}></sp-slider>
<sp-slider default="20"  vertical='true' reverse='true' style={{height:'300px'}}></sp-slider>
<sp-slider default="[50, 70]" draggabletrack='true' tooltipvisible='true' vertical='true' style={{height:'300px'}}></sp-slider>
<sp-slider default="[30, 70]" tooltipvisible='true' vertical='true' reverse='true' style={{height:'300px'}}></sp-slider>
</div>
}
ReactDOM.render(<Test />, mountNode)

```