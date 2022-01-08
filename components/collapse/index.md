---
category: Components
type: 展示
title: Collapse  
subTitle: 折叠面板
---

可以折叠/展开的内容区域。
## 何时使用
- 对复杂区域进行分组和隐藏，保持页面的整洁。
- 手风琴是一种特殊的折叠面板，只允许单个内容区域展开。

## API
### Collapse
| 参数         | 说明                                           | 类型             | 可选  | 默认值 |
| ------------ | ---------------------------------------------- | ---------------- | ----- | ------ |
| active-index | 初始化选中面板的 key                           | number \| string \| number[] \| string[] | -     | -      |
| accordion    | 是否开启手风琴模式，开启后每次至多展开一个面板 | boolean          | false | -      |
| simple       | 简洁边框风格的折叠面板                         | boolean          | false | -      |
| ghost        | 使折叠面板透明且无边框                         | boolean          | false | -      |

### Panel
| 参数       | 说明                                                         | 类型           | 可选  | 默认值 |
| ---------- | ------------------------------------------------------------ | -------------- | ----- | ------ |
| index      | 当前面板的 key，与 collapse 的active-index对应，不填为索引值 (默认1为起始索引) | string\|number | -     | -      |
| hide-arrow | 隐藏当前面板上的箭头                                         | boolean        | false | -      |