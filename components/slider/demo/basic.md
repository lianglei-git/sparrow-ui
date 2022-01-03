---
order: 1
title: 基本的用法
---


## desc-cn 
base

```html
<h3>Html:</h3>
<sp-slider default='22'></sp-slider>

```

```jsx
import React, { useState, useEffect, useRef } from 'react'
const Test = () => {
return <div> 
<h3>React:</h3>
<sp-slider default={[44]} ></sp-slider>

</div>
}
ReactDOM.render(<Test />, mountNode)

```


<style>
    ._cmps {
        width: 900px !important;
    }
</style>