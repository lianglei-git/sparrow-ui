---
order: 1
title: basic
---

## desc-cn 
基本使用

```html
<h3>Html: </h3>
<h6>默认: </h6>
<sp-rate></sp-rate>
<br />
<h6>自定义数量: </h6>
<sp-rate count="2"></sp-rate>
<br />
<h6>自定义形式: </h6>
<sp-rate character="卟"></sp-rate>
<br />
<h6>自定义icon: </h6>
<sp-rate character="sp-icon sp-icon-favorites-fill"  count="2.2" half="true"></sp-rate>
<br />
<h6>支持半星: </h6>
<sp-rate character="无"  count="2.2" half="true"></sp-rate>
<br />
<h6>自定义总数: </h6>
<sp-rate character="无"  count="2.2" total=10 half="true"></sp-rate>

```


```jsx
import { SpRate } from 'sparrow-ui/rate';
import { useState } from 'react'
const Demo = () => {
     return <div>
     <h3>React: </h3>
       <SpRate Lib={React} count={2}/>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```