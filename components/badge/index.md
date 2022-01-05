---
category: Components
type: 展示
title: Badge  
subTitle: 徽标数
---

图标右上角的圆形徽标数字。
## 何时使用
一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。


## API
| 参数      | 说明                                                                       | 类型    | 可选  | 默认值 |
| --------- | -------------------------------------------------------------------------- | ------- | ----- | ------ |
| count     | 显示的数字，大于maxCount时，显示${maxCount}+，为 0 时隐藏                  | number  | -     | -      |
| max-count | 展示封顶的数字值                                                           | number  | 99    | -      |
| dot       | 不展示数字，只有一个小红点，如需隐藏 dot                                   | boolean | false | -      |
| show-zero | 当数值为 0 时，是否展示 Badge                                              | boolean | false | -      |
| status    | 设置 Badge 为状态点，可选值为 success、processing、default、error、warning | string  | -     | -      |
| type      | 使用预设的颜色，可选值为 success、primary、normal、error、warning、info    | string  | -     | -      |
| text      | 自定义内容，如果设置了 status，则为状态点的文本                            | string  | -     | -      |
| color     | 设置更多状态点的颜色或自定义颜色                                           | string  | -     | -      |