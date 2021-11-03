---
category: Components
type: 表单
title: Switch
subTitle: 开关
---

开关选择器。

## 何时使用
- 需要表示开关状态/两种状态之间的切换时；

- 和 checkbox 的区别是，切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。
  
- 本组件已经做到了每个属性的响应式，即灵活使用，翱翔于各大知名框架 任由宰割。
  

## API
#### 一些参考：
- 响应式带来复杂化
- 当loading与自定义icon同时出现时，loading的权重高于其他
- 当你要自定义状态`value`时，之前状态无效
- 事实上，如果诉求是html中属性响应并添加动画，这应该是个不错的选择。

#### 事件(Event)
*如果在html中 需要自行获取元素，并绑定事件，其他雷同。*
- `target.onClick = (status:当前状态(boolean), target:当前元素，非Event对象) => ...`   点击触达
- `target.onChange = (status:最新状态(boolean), target:当前元素，非Event对象) => ...`   改变后触达

#### 配置(Config) 
| 参数            | 说明                             | 类型              | 默认值                                    | 版本 |
| --------------- | -------------------------------- | ----------------- | ----------------------------------------- | ---- |
| width           | 元素宽度，写入文字时，会默认计算 | string \| number  | size为'small'时28px;size为'default'时40px | 0.1  |
| disabled        | 禁用属性                         | boolean & string  | false                                     | -    |
| classname       | 元素 class类名                   | string            | -                                         | -    |
| default-checked | 非响应，第一次的默认值           | boolean & string  | false                                     | -    |
| loading         | 加载中                           | boolean \| string | false                                     | -    |
| size            | 大小                             | default \| small  | default                                   | 0.1  |
| active-text     | 选中文字                         | string            | -                                         | 0.1  |
| inactive-text   | 非选中文字                       | string            | -                                         | 0.1  |
| active-color  | 选中背景                         | string            | rgb(64, 158, 255                          | 0.1  |
| inactive-color  | 非选中背景                       | string            | rgb(220, 223, 237)                        | 0.1  |
| active-icon   | 选中icon                         | string            | -                                         | 0.1  |
| inactive-icon   | 非选中icon                       | string            | -                                         | 0.1  |
| value           | 自定义状态                       | boolean & string  | -                                         | -    |