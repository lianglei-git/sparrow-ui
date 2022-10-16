---
category: Components
type: 数据
title: ToolTip
subTitle: 文字提示
---

简单的文字提示气泡框。

## 何时使用
- 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

- 可用来代替系统默认的 title 提示，提供一个 按钮/文字/操作 的文案解释。



## API

| 参数                  | 说明                                                                                                                                                   | 类型                | 默认值 | 版本 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ------ | ---- |
| title                 | 提示文字                                                                                                                                               | string              | -      | -    |
| placement             | 气泡框位置，可选 `top` `left` `right` `bottom` `top-left` `top-right` `bottom-left` `bottom-right` `left-top` `left-bottom` `right-top` `right-bottom` | string              | `top`  | -    |
| trigger               | 触发行为，可选 `hover` \| `focus` \| `click` \| `contextMenu`，可使用数组设置多个触发行为                                                              | string \| string[]  | hover  | -    |
| get-popup-container   | 浮层渲染父节点，默认渲染到 body 上                                                                                                                     | string              | body   | -    |
| getPopupContainer     | 浮层渲染父节点，默认渲染到 body 上                                                                                                                     | () => document.body | body   | -    |
| color                 | 背景颜色                                                                                                                                               | string              | -      | -    |
| visible               | 默认是否显隐                                                                                                                                           | boolean             | false  | -    |
| popupstyle            | 弹出层样式                                                                                                                                             | string              | -      | -    |
| effect                | 主题 可选：`drak` \| `light`                                                                                                                           | string              | drak   | -    |
| mouse-enter-delay     | 鼠标移入后延时多少才显示 Tooltip，单位：毫秒                                                                                                           | number              | 100    | -    |
| mouse-leave-delay     | 鼠标移出后延时多少才显示 Tooltip，单位：毫秒                                                                                                           | number              | 100    | -    |
| mouse-move-delay      | 移入移出速度的延时， 在多久外有效触发， 不得高于滑入延时                                                                                               | number              | 90     | -    |
| classname             | 弹出层的自定义name 原始的建议通过属性选择器选择， 这何况不是一种方式呢？                                                                               | string              | -      | -    |
| arrow-point-at-center | 箭头是否指向弹出层元素中心                                                                                                                             | boolean             | false  | -    |
| onVisibleChange       | 显示隐藏的回调函数                                                                                                                                     | (visible) => void   | -      | -    |
| offcenter             | 离心距离                                                                                                                                               | string\|nmber       | 4         | - |

`getPopupContainer 或 get-popup-container 前者为function 后者为string 不同的传参数方式， 属性权重较大`