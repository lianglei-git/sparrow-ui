---
category: Components
type: 表单
title: Rate  
subTitle: 评分
---

评分

## 何时使用
- 当汝需要更直观的评价时；



## API 
| 参数      | 说明                                                    | 类型                          | 可选 | 默认值 |
| --------- | ------------------------------------------------------- | ----------------------------- | ---- | ------ |
| count     | 当前评分（5为总数）                                     | number                        | -    | 0      |
| half      | 是否可以半星展示                                        | boolean                       | -    | false  |
| character | 自定义显示内容，使用icon 请直接输入icon，反之自定义文字 | string\|function(idx):Element | -    | ''     |
| total     | 总数量                                                  | number                        | -    | 5      |

```js
/** 获取当前选中索引 */
target.activeIndex;

/** 设置选中数量，小数点代表半个 */
target.customCount(count);

/** sp-rate离开状态 */
target.onMouseLeave = (fullOrHalf, activeIndex) => boolean;

/** sp-rate item进入状态 */
target.onItemMouseEnter(item, fullOrHalf, index) => boolean;

/** sp-rate item点击状态 */
target.onItemMouseClick(item, fullOrHalf, activeIndex) => boolean;

```