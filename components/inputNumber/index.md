---
category: Components
type: 表单
title: InputNumber  
subTitle: 数字输入框
---

通过鼠标，输入范围内的数值。

## 何时使用
- 当需要获取标准数值时。



## API 
| 参数   | 说明                                      | 类型                           | 可选 | 默认值 |
| ------ | ----------------------------------------- | ------------------------------ | ---- | ------ |
| min    | 最小值                                    | number                         | -    | -      |
| max    | 最大值                                    | number                         | -    | -      |
| step   | 每次改变步数，可以为小数                  | number                         | -    | 1      |
| parser | 指定格式， 可以为属性也可以为元素上的方法 | string\| function(value)       | -    | -      |
| onStep | 增加，删减的毁掉函数                      | function(value, 'down'\| 'up') | -    | -      |

更多属性请参考 [Input](/components/input/#API)。