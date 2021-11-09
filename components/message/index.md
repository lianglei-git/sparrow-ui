---
category: Components
type: 展示
title: Message
subTitle: 消息提示
---

全局展示操作反馈信息。

## 何时使用
- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。
  
## API

组件提供了一些静态方法，使用方式和参数如下：

- `Message.success(content, [params])`
- `Message.error(content, [params])`
- `Message.info(content, [params])`
- `Message.loading(content, [params])`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | string | - |
| params | 如下参考，另包括 beforeClose | {} | object |
也可以对象的形式传递参数：
- `Message[type](config)` 如下参数。

`config` 对象属性如下：

| 参数        | 说明                                  | 类型                     | 默认值    | 版本 |
| ----------- | ------------------------------------- | ------------------------ | --------- | ---- |
| type        | 主题                                  | 'success'\|'error'\|'info'\| 'loading' | 'success' |      |
| showclose   | 是否显示右上角的关闭按钮              | boolean                  | false     |      |
| duration    | 显示时间, 毫秒。设为 0 则不会自动关闭 | Number                   | 3000      |      |
| center      | 文字是否居中                          | boolean                  | false     |      |
| offset      | Message 距离窗口顶部的偏移量          | number, string           | 20        |      |
| beforeClose | 关闭前回调                            | function                 | -         |      |
| visible | 是否展示                            | string & boolean                 | false         |      |
| message | 展示信息                            | string                 | -         |      |
### 全局方法

还提供了全局配置和全局销毁方法：

- `Message.closeAll()` 关闭全部的message
- `target.close()` 关闭当前message