---
category: Components
type: 展示
title: Loading
subTitle: 加载中
---
用于页面和区块的加载中状态。

## 何时使用
页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## API
`Loading.config` 配置项如下雷同

| 参数       | 说明     | 类型           | 可选 | 默认值            |
| ---------- | -------- | -------------- | ---- | ----------------- |
| icon       | icon图标 | string         | —    | 'sp-icon-loading' |
| background | 背景颜色 | string         | -    | rgba(0,0,0,.8)    |
| fullscreen | 是否全局 | string&boolean | —    | false             |
| text       | 加载文案 | string         | —    | '加载中...'       |
| target     | 目标对象 | string         | —    | —                 |
| status     | 状态     | string&boolean |      | true              |
| classname  | 类名     | string         | -    | -                 |