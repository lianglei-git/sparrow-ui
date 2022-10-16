---
order: 0
title: test
---

## desc-cn 
-

```html
<sp-button id="layout_test_reset" style='margin-bottom:20px'>Reset</sp-button>
<sp-button id="layout_test_changetype" style='margin-bottom:20px'>Change Mode(is custom)</sp-button>

<sp-alert title='原始模式' id="layout_test_alert"></sp-alert>

<sp-layout id='layout_test_custom'></sp-layout>
<script>
   const layout_test_custom = document.getElementById('layout_test_custom');
   const layout_test_changetype = document.getElementById('layout_test_changetype');
   const layout_test_alert = document.getElementById('layout_test_alert')
   const layout_test_reset = document.getElementById('layout_test_reset');
   layout_test_reset.onclick = () => {
    layout_test_custom.reset();
   }
   layout_test_changetype.onclick = () => {
    const c = !layout_test_custom.attrs.iscustom;
    layout_test_custom['attr-iscustom'] = c;
    layout_test_custom.reset();
    layout_test_alert['attr-title'] = c ? '自定义模式' : '原始模式'
   }
</script>
```


```jsx
const Demo = () => {
    return <div>Layout</div>
}

ReactDOM.render(<Demo />, mountNode)
```
