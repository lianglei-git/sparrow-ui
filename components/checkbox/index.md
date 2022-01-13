---
category: Components
type: 表单
title: CheckBox  
subTitle: 多选框
---

多选框。

## 何时使用
- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。





## API 
| 参数          | 说明       | 类型    | 可选 | 默认值 |
| ------------- | ---------- | ------- | ---- | ------ |
| checked       | 是否选中   | boolean | -    | false  |
| disabled      | 是否不可用 | boolean | -    | false  |
| indeterminate | 半全选壮他 | boolean | -    | false  |


## Group API
| 参数     | 说明           | 类型     | 可选 | 默认值 |
| -------- | -------------- | -------- | ---- | ------ |
| value    | 选中的数组     | string[] | -    | -      |
| disabled | 是否全部不可用 | boolean  | -    | -      |