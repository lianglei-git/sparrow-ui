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