---
order: 1
title: basic
---

## desc-cn 
基本使用

```html
<h3>Layout</h3>

```


```jsx
import { useRef, useEffect, useState} from 'react';
const Demo = () => {
    const target = useRef(null);
    const alertRef = useRef(null);
    const [layoutTrs, setTrs] = useState([])
    const reset = () => {
        target.current.reset();
    }
    useEffect(() => {
        target.current.checkCallback = (a,b,style) => {
            if(!style) return;
            for(let k in style) {
                style[k] = style[k] * 100 + '%'
            }
            setTrs(xp => [...xp, style])
        }
    }, [])
    const random = () => {
        return `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(Math.random() * 255)})`
    }
    const changeMode = () => {
        const c = !target.current.attrs.iscustom;
        target.current['attr-iscustom'] = c;
        alertRef.current['attr-title'] = c ? 'mode: Custom' : 'mode: Default';
        target.current.reset();
    }
    return <div>
        <sp-alert effect="dark" style={{marginBottom: '10px'}}> <span slot='title'>You are free to choose the mode for "default" or "custom". </span></sp-alert>
        <sp-button style={{marginBottom: '10px'}} onClick={() => reset()}>Reset</sp-button>
        <sp-button onClick={changeMode}>Change Mode(is custom)</sp-button>
        <sp-alert title='mode: Default' style={{marginBottom: '10px'}} ref={alertRef}></sp-alert>
        <div style={{display: 'flex'}}>
            <sp-layout ref={target} ></sp-layout>
            <div style={{flex: '1', marginLeft: '20px',border: '1px dashed #8a8383', position:'relative'}}>
                {layoutTrs.map((item,idx) => {
                    return <div key={idx} style={{position: 'absolute',...item, background: random()}}></div>
                })}
            </div>
        </div>
    </div>
    
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    .sp-input-number {
        width: 200px;
        margin-top: 10px;
    }
</style>