---
order: 1
title: 基本
---

## desc-cn 
基本使用。

```html
<h3>Html:</h3>
<sp-select></sp-select>

<div id="basic_sp_select_2"></div>
<script>
    // search.onSearch = (event, value) => {
    //     Spui.Message.info(value)
    // }
    const select =  document.createElement('sp-select');
   select.downOptions = [{
            value: '1',
            label: 'aaa'
        }, {
            value: '2',
            label: 'bbb'
        }, {
            value: '3',
            label: 'ccc'
        }, {
            value: '4',
            label: 'ddd'
        }, {
            value: '5',
            label: 'eee'
        }];

   select['attr-value'] = '3'

document.querySelector('#basic_sp_select_2').append(select);
    
</script>
```


```jsx
import {useEffect, useRef} from 'react'
const Demo = () => {
    const demo = useRef();
    useEffect(() => {
        demo.current.onSearch = (event, value) => {
            Spui.Message.info(value)
        }
    }, [])
     return <div>
     <h3>React:</h3>
        <sp-search ref={demo} placeholder='Basic usage'></sp-search>
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```
<style>
    .sp-search {
        width: 300px;
    }
</style>
