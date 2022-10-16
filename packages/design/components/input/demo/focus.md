---
order: 10
title: 聚焦
---

## desc-cn 
聚焦额外配置属性


```jsx
import {useEffect, useRef} from 'react'
const Demo = () => {
    const demo = useRef();
    const demo1 = useRef();
    useEffect(() => {
        demo.current.onChange = (v) => {
            demo1.current.focus({cursor:v.slice(6, 30)})
        }
    }, [])
     return <div>
     <h3>React:</h3>
     <sp-radio-group type='button' optiontype='button' ref={demo}>
        <sp-radio>focus start</sp-radio>
        <sp-radio>focus end</sp-radio>
        <sp-radio>focus all</sp-radio>
     </sp-radio-group>
        <sp-input placeholder='Basic usage' value='功成，名遂，身退，天之道也。' ref={demo1}></sp-input>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
