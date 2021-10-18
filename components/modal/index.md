---
subtitle: 模态框
title: Modal
---
模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。


| 参数       | 说明                                                     | 类型            | 默认值         | 版本 |
| ---------- | -------------------------------------------------------- | --------------- | -------------- | ---- |
| title      | Modal 标题                                               | string          | -              |      |
| closable   | 是否显示右上角的关闭按钮                                 | string, boolean | true           |      |
| appendbody | 是否插入在body上                                         | string, boolean | false          |      |
| canceltext | 取消按钮文字                                             | string          | `取消`         |      |
| oktext     | 取消按钮文字                                             | string          | `确认`         |      |
| center     | 垂直居中展示 Modal                                       | boolean         | true           |      |
| modal      | 是否需要遮罩                                             | boolean         | true           |      |
| class      | 类名                                                     | string          | -              |      |
| visible    | Modal 显示                                               | string, boolean | false          |      |
| footer     | 底部内容，当不需要默认底部按钮时，可以设为 `footer=null` | ReactNode       | (确定取消按钮) |      |
## 须知！！
如果需要自定义footer请按照下列操作， 需要使用slot进行自定义底部
```jsx
<sp-modal ref={modalfive} title="第5个modal" modal='false' center='false' visible={visible5} >
    <div slot="content">内容一定要定义content 的 插槽</div>
    <div slot='footer'>自定义</div>
</sp-modal>
```

``` html
<!-- html 中使用 -->
<html>
    <body>
        <sp-modal>
            <div slot='content'>
                你可以通过 "[attr-参数字段名称]" 来赋值 ta会自动更新的
                <sp-button onclick="this['arrt-loading']=true; setTimeout(() => {this.setAttribute('loading', false)},1000)">加载</sp-button>
                </div>
            <div slot='content'>
                大白(●●—)
            </div>
        </sp-modal>
    </body>
    <script>
        // 第二种用法 ⬇️⬇️
        let {Modal} = Spui
       let modal =  Modal.config({ // 这里面包含了标签的attrs的类型key
            visible: false,
            onOk(){},
            onClose(){},
            bodyhtml: '', //必须是字符串
            footerhtml: '', //必须是字符串
            ...
        })
        modal.show(true) 
        // 如果需要更改 html内容
            modal.setBodyHtml();
            modal.setFooterHtml();

    </script>
</html>
```
<!-- | closeIcon | 自定义关闭图标 | ReactNode | &lt;CloseOutlined /> |  | -->
