---
category: Components
type: 表单
title: Select  
subTitle: 选择框
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用
- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。



## API 
| 参数         | 说明                                         | 类型                   | 可选 | 默认值 |
| ------------ | -------------------------------------------- | ---------------------- | ---- | ------ |
| enter-button | 是否有确认按钮，可设为按钮文字。             | html\|string           | -    | false  |
| loading      | 搜索 loading                                 | boolean                | -    | false  |
| onSearch     | 点击搜索图标、清除图标，或按下回车键时的回调 | function(value, event) | -    | - |

##### 更多属性请参考 [Input](/components/input/#API)。