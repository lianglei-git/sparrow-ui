---
order: 4
title: 带字数提示的文本域
---

## desc-cn 
展示字数提示。

```html
<h3>Html: </h3>
<sp-textarea value='这是五个字' max-length='30' show-count='true' ></sp-textarea>
```


```jsx
import {useEffect, useRef} from 'react'
const Demo = () => {
     return <div>
     <h3>React:</h3>
        <sp-textarea placeholder='Basic usage' show-count='true' ></sp-textarea>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```



<style>
    .sp-textarea {
        margin-top: 20px
    }
</style>