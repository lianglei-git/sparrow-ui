

const modalProps = () => ({
    title: String, // 标题
    closable: Boolean, // 是否显示关闭按钮
    appendbody: Boolean, // 是否插入在body上
    visible: Boolean, // 展示
    class: String || Array,
    classname: String || Array,
    center: Boolean, // 是否垂直居中 默认true
    modal:Boolean, // 是否需要遮罩
    cancelText: String, // 取消按钮文字
    okText: String, // 确认按钮文字
    footer: String || Boolean
})
// 如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 append-to-body 属性。

export default modalProps