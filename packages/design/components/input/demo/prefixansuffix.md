---
order: 6
title: 前缀和后缀
---

## desc-cn 
在输入框上添加前缀或后缀图标。


```html
<h3>Html:</h3>
 <sp-input placeholder='100' prefix='sp-icon-rmb' ></sp-input>
        <br/>
 <sp-input placeholder='100' suffix='sp-icon-rmb' ></sp-input>
        <br/>
 <sp-input placeholder='100' prefix='sp-icon-rmb' suffix='<span>RMB</span>' ></sp-input>
```


```jsx
const Demo = () => {
     return <div>
     <h3>React:</h3>
        <sp-input prefix='sp-icon-icon_commonly_user' placeholder='Basic usage' suffix='sp-icon-info'></sp-input>
        <br/>
        <sp-input prefix='<span style="color:red">Clear</span>' placeholder='allow-clear' allow-clear='true' suffix='sp-icon-info'></sp-input>
        <br/>
        <sp-input id='spInpips' prefix='<span style="color:orange">Tips</span>' placeholder='划入info' allow-clear='true' suffix='<sp-tooltip get-popup-container="#spInpips" offcenter="-2" title="可以提示"><span class="sp-icon sp-icon-info"></span></sp-tolltip>'></sp-input>
        <br/>
        <sp-input id='spInpipss' disabled='true' prefix='<span style="color:orange">Tips</span>' placeholder='划入info' allow-clear='true' suffix='<sp-tooltip get-popup-container="#spInpipss" offcenter="-2" title="可以提示"><span class="sp-icon sp-icon-info"></span></sp-tolltip>'></sp-input>

    </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    #components-input-demo-prefixansuffix .sp-input {
        width: 200px;
    }
</style>
