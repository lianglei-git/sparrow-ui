---
category: Components
type: 数据
title: TimeLine
subTitle: 时间轴
---

垂直展示的时间流信息。

## 何时使用
- 当有一系列信息需按时间排列时，可正序和倒序。

- 需要有一条时间轴进行视觉上的串联时。


## API 

`sp-timeline`

| 参数    | 说明                       | 类型             | 默认值 | 版本 |
| ------- | -------------------------- | ---------------- | ------ | ---- |
| mode    | 内容方向                   | left\|right      | left   | -    |
| pending | 最后的节点是否处于加载状态 | string\| boolean | false  | -    |


`sp-timeline-item`


| 参数     | 说明     | 类型        | 默认值 | 版本 |
| -------- | -------- | ----------- | ------ | ---- |
| color    | 颜色     | string      | -      | -    |
| icon     | 节点图标 | string      | -      | -    |
| label    | 对应内容 | string      | -      | -    |
| position | 内容位置 | left\|right | -      | -    |