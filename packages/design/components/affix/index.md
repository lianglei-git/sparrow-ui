---
category: Components
type: 导航
title: Affix 
subTitle: 固钉
---
将页面元素钉在可视范围。

## 何时使用
当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。


## API

| 参数          | 说明           | 类型     | 可选 | 默认值                  |
| ------------- | -------------- | -------- | ---- | ----------------------- |
| offset-top    | 距离顶部的距离 | number   | -    | 0                       |
| offset-bottom | 距离底部的距离 | number   | -    | undefined               |
| onChange      | 回掉           | function |      | (isFixed, type) => void |
| origin-elfixed | 源元素是否根据原始宽度、高度进行固定|boolean\|string|false|