---
category: Components
type: 展示
title: Drawer
subTitle: 抽屉
---

屏幕边缘滑出的浮层面板。

## 何时使用
抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。

- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。


## API
| 参数           | 说明                     | 类型                                   | 默认值        | 版本   |
| -------------- | ------------------------ | -------------------------------------- | ------------- | ------ |
| append-to-body | 是否插入body（已抛弃）   | string&boolean                         | true          | 已废弃 |
| mask-closable  | 点击蒙层是否允许关闭     | string&boolean                         | true          | -      |
| placement      | 抽屉的方向               | 'top' \| 'right' \| 'bottom' \| 'left' | right         | -      |
| fullscreen     | 代替 是否全局和局部      | string&boolean                         | true          | -      |
| width          | 自定义宽度               | string \| number                       | 40%           | -      |
| visible        | 展示                     | string&boolean                         | false         | -      |
| keyboard       | 是否支持键盘 esc 关闭    | string&boolean                         | true          | -      |
| mask           | 是否展示遮罩             | string&boolean                         | true          | -      |
| closable       | 是否显示右上角的关闭按钮 | string&boolean                         | true          | -      |
| classname      | 自定义类名               |                                        |               |        |
| closeicon      | 自定义关闭图标           | string                                 | sp-icon-close | -      |
| onClose        | 关闭前的回调             |                                        |               |        |

