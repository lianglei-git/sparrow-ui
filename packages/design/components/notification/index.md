---
category: Components
type: 展示
title: Notification
subTitle: 通知
---

悬浮出现在页面角落，显示全局的通知提醒消息。

## 何时使用
在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。

- 带有交互的通知，给出用户下一步的行动点。

- 系统主动推送。
  
## API

组件提供了一些静态方法，使用方式和参数如下：

- `Notify.success(params)`
- `Notify.error(params)`
- `Notify.info(params)`
- `Notify.wraning(params)`

| 参数   | 说明                         | 类型 | 默认值 |
| ------ | ---------------------------- | ---- | ------ |
| params | 如下参考，另包括 beforeClose | {}   | object |
也可以对象的形式传递参数：
- `Notify[type](config)` 如下参数。

`config` 对象属性如下：

| 参数        | 说明                                  | 类型                                                      | 默认值      | 版本 |
| ----------- | ------------------------------------- | --------------------------------------------------------- | ----------- | ---- |
| type        | 主题                                  | 'success'\|'error'\|'info'\| 'warning'                    | 'success'   |      |
| showclose   | 是否显示右上角的关闭按钮              | boolean                                                   | false       |      |
| duration    | 显示时间, 毫秒。设为 0 则不会自动关闭 | Number                                                    | 4500        |      |
| center      | 文字是否居中                          | boolean                                                   | false       |      |
| offset      | Message 距离窗口顶部的偏移量          | number, string                                            | 20          |      |
| beforeClose | 关闭前回调                            | function                                                  | -           |      |
| visible     | 是否展示                              | string & bollean                                          | false       |      |
| message     | 消息内容                              | string                                                    | -           |      |
| title       | 标题                                  | string                                                    | -           |      |
| position    | 位置                                  | 'top-right'\| 'top-left'\| 'bottom-right' \|'bottom-left' | 'top-right' |      |
| classname   | 自定义class                           | string                                                        | -           | -    |

### 全局方法

还提供了全局配置和全局销毁方法：

- `Notify.closeAll()` 关闭全部的message
- `target.close()` 关闭当前message