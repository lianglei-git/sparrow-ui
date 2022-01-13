---
category: Components
type: 表单
title: Input  
subTitle: 输入框
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用
- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。



## API 
| 参数         | 说明                                             | 类型           | 默认值 | 版本 |
| ------------ | ------------------------------------------------ | -------------- | ------ | ---- |
| addon-after  | 带标签的 input，设置后置标签                     | html           | -      |      |
| addon-before | 带标签的 input，设置前置标签                     | html           | -      |      |
| allow-clear  | 可以点击清除图标删除内容                         | boolean        | false  |      |
| bordered     | 是否有边框                                       | boolean        | true   | -    |
| disabled     | 是否禁用状态，默认为 false                       | boolean        | false  |      |
| max-length   | 最大长度                                         | number         | -      |      |
| show-count   | 是否展示字数                                     | boolean        | false  | -    |
| prefix       | 带有前缀图标的 input                             | html           | -      |      |
| size         | 控件大小。注：标准表单内的输入框大小限制为 large | large \| small | -      | -    |
| suffix       | 带有后缀图标的 input                             | html           | -      |      |
| value        | 输入框内容                                       | string         | -      |      |
| onChange     | 输入框内容变化时的回调                           | function(e)    | -      |      |
| onPressEnter | 按下回车的回调                                   | function(e)    | -      |      |