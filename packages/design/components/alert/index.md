---
category: Components
type: 展示
title: Alert
subTitle: 警告
---
警告提示，展现需要关注的信息。
## 何时使用

当某个页面需要向用户显示警告的信息时。

非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

你可以通过属性传入 title 也可以使用另一种方式， slot 方式 

```jsx
<sp-alert><span slot="title">这是插槽哦</span> </sp-alert>
```

## API
| 参数       | 说明               | 类型    | 可选                       | 默认值 |
| ---------- | ------------------ | ------- | -------------------------- | ------ |
| title      | 标题               | string  | —                          | —      |
| type       | 主题               | string  | success/warning/info/error | info   |
| closable   | 是否可关闭         | boolean | —                          | true   |
| center     | 文字是否居中       | boolean | —                          | true   |
| close-text | 关闭按钮自定义文本 | string  | —                          | —      |
| effect     | 选择提供的主题     | string  | light/dark                 | light  |
| classname  | 类名               | string  | -                          | -      |

## Slot
| 参数  | 说明       |
| ----- | ---------- |
| title | 标题的内容 |

## Events
| 事件名称 | 说明                  |
| -------- | --------------------- |
| close    | 关闭alert时触发的事件 |
