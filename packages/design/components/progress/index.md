---
category: Components
type: 展示
title: Progress 
subTitle: 进度条
---
用于展示操作进度，告知用户当前状态和预期

## 何时使用
页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。


## API
| 参数           | 说明                                                  | 类型                              | 可选                      | 默认值                   |
| -------------- | ----------------------------------------------------- | --------------------------------- | ------------------------- | ------------------------ |
| format         | 内容的模板函数                                        | function(percent, successPercent) | -                         | (percent) => percent + % |
| percent        | 百分比                                                | number                            | -                         | 0                        |
| show-info      | 是否显示进度数值或状态图标                            | boolean                           | -                         | true                     |
| status         | 状态                                                  | string                            | success \|error \|normal  | normal                   |
| color          | 进度条的色彩                                          | string                            | -                         | -                        |
| stroke-linecap | 进度条的样式                                          | string                            | 'butt'\|'round'\|'square' | round                    |
| text-inside    | 进度条显示文字内置在进度条内（只在 type=line 时可用） | string                            | -                         | -                        |
| stroke-width   | 线条宽度                                              | number                            | -                         | -                        |
| classname      | -                                                     | -                                 | -                         | -                        |