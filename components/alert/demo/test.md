---
order: 0
title: 测试板块
---


## desn-cn 
测试咯


```jsx
import React, { useState, useEffect, useRef } from 'react'

const Test = () => {

    return <>
        <sp-alert title='9999'> </sp-alert>
        <sp-alert title='9999' type='danger'> </sp-alert>
        <sp-alert title='9999' type='warning'> </sp-alert>
        <sp-alert title='9999' type='info'> </sp-alert>
        <sp-alert type='info'> <span slot='title'>aksdkad</span> </sp-alert>
    </>
}

ReactDOM.render(<Test />, mountNode)
```

<style>
    sp-alert{
        margin-bottom:10px !important
    }
</style>