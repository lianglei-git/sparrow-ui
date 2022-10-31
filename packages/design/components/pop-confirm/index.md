---
category: Components
type: 数据
title: Popconfirm
subTitle: 气泡确认框
---

点击元素，弹出气泡式的确认框。

## 何时使用
- 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

- 和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。


当你传入`visible`时候，只能由你自己来更新组件的状态；

当你不传入`visible`时候， 你可以在onCancel 或 onConfirm 返回Promise； 此组件支持promise， 无需你自行更新组件；

当你不传入也不反悔promise时， 默认形态；


`target.okButtonProps` : ok 按钮 props
`target.cancelButtonProps`: cancel 按钮 props
## API
| 参数        | 说明                      | 类型        | 默认值       | 版本 |
| ----------- | ------------------------- | ----------- | ------------ | ---- |
| title       | 提示文字                  | string      | -            | -    |
| cancel-text | 取消按钮文字              | string      | 取消         | -    |
| icon        | 自定义弹出气泡 Icon class | string      | sp-icon-info | -    |
| ok-text     | 确认按钮文字              | string      | 确定         | -    |
| ok-type     | 确认按钮类型              | string      | primary      | -    |
| onCancel    | 点击取消的回调            | function(e) | -            | -    |
| onConfirm   | 点击确认的回调            | function(e) | -            | -    |
| hide-icon   | 是否隐藏icon              | boolean     | false        | -    |

##### 更多属性请参考 [Tooltip](/components/tooltip/#API)。