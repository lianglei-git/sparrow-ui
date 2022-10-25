# sparrow


[entry](./packages/design/components/overview/index.md)
随笔。[官网](http://sparrowui.cn)

望你度过美好的一天！
<hr>
<p align='center'>春江花月夜</p>
<p align='center'>
春江潮水连海平，海上明月共潮生。
滟滟随波千万里，何处春江无月明！
<p align='center'>
江流宛转绕芳甸，月照花林皆似霰；
空里流霜不觉飞，汀上白沙看不见。
<p align='center'>
江天一色无纤尘，皎皎空中孤月轮。
  <b>江畔何人初见月？江月何年初照人？</b>
<p align='center'>
人生代代无穷已，江月年年望相似。
不知江月待何人，但见长江送流水。
<p align='center'>
白云一片去悠悠，青枫浦上不胜愁。
谁家今夜扁舟子？何处相思明月楼？
<p align='center'>
可怜楼上月裴回，应照离人妆镜台。
玉户帘中卷不去，捣衣砧上拂还来。
<p align='center'>
此时相望不相闻，愿逐月华流照君。
鸿雁长飞光不度，鱼龙潜跃水成文。
<p align='center'>
昨夜闲潭梦落花，可怜春半不还家。
江水流春去欲尽，江潭落月复西斜。
<p align='center'>
斜月沉沉藏海雾，碣石潇湘无限路。
不知乘月几人归，落月摇情满江树。
</p>
<hr>

#### Other
- 一个 circle 被切割成1/5份和1/10份 总结一起的压位计算不会精确到整数，因无整圆，那计算机的方式是? 请解答。

#### 下载

- [ZIP下载](http://101.43.178.134:8888/down/yMRFr9IzdDFR): http://101.43.178.134:8888/down/yMRFr9IzdDFR
- npm暂时告一段落， 要去补习民刑了， 还有页面设计的也放一放...

目前项目还是个乞丐版本， 整体的文档完善以及jest测试，还有部分组件未开发完成，还有site兼容移动端展示，以及加载速度 全部都没有开始搞， 我天， 我天， 总之，先告一段落。 
<!-- 另外 下一个项目已经开始， 个人独资开发的音乐软件（客户端以及apk）... 拖一拖 拖一拖 -->


### TODO
- 2022/8/7
  1. 接下来会再次重构项目，会把dom加载、更新等操作替换template
  2. lines 已经开始把基本的base做完了，大概要几个月后再来写它
  3. canvas的系列还没有开始准备base；这个要等一等
  4. 动画系列也还没有准备；也要等一等
  5. sevlte、Vue、React兼容也要等一等
  6. site的完善 权重还是比较高的
  7. 单元测试的变更，接下来的开发模式也会发生变化；
  8. 要开辟出服务端渲染的接口
- 推迟... 整体来描述一个事情“工程重新架构”
  1. 重写 md-loader
  2. 作出适配项目的 file watch
  3. 重写自己的单元测试
  4. 工程架构！！！！



npm 

```js
import { Message } from "@sparrowend/ui";
import '@sparrowend/ui/dist/spui.css'
```

or

```js
import { Message } from "@sparrowend/ui";
import '@sparrowend/ui/es/message/style/css'
```