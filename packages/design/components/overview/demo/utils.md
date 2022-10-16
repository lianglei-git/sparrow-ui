---
order: 0
title: ShowTime
---


```jsx
import React, {useState, useRef} from 'react'

const ShowTime = () => {
    const [btnF, changeBtnf] = useState(false);
    const [progress, setprogress] = useState(0);
    const smart = useRef(0);
    const c = () => {
        changeBtnf(!btnF);
        clearInterval(smart.current);
        if(!btnF) {
           smart.current = setInterval(() => {
                setprogress((k) => k+10)
            }, 500);
        }else {
            setprogress(0);
        }
    }

    return <div>
     <sp-tooltip title='prompt text' get-popup-container='.show-components'>
    <sp-button onClick={c} shape="circle" type='dashed' className={["btnf", btnF ? 'btnfactive':''].join(' ')}>{!btnF ? '👊' : '🖐️' }</sp-button>
    </sp-tooltip>
    {btnF ? <sp-progress percentage={progress} show-info='false'></sp-progress> : null}
    </div>
}

ReactDOM.render(<ShowTime />, mountNode);

```

<style>
.btnf {
    font-size: 30px;
    transition: .4s;
};

</style>
