---
order: 2
title: 附带文字
---

## desc-cn 
文字描述，并可以响应式修改。

```html
<!-- HTML 中使用 -->
<h3>Html:</h3>
<sp-switch default-checked="true"  active-text="关闭"></sp-switch>
```

```jsx

import React from 'react'
ReactDOM.render(<div>
<h3>React:</h3>
<sp-switch inactive-text="点击打开"></sp-switch>
<sp-switch active-text="开会" inactive-text="闭会"></sp-switch>
</div>, mountNode);

```
