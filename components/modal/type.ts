

const modaTypeslProps = () => ({
    title: String, // 标题
    closable: Boolean, // 是否显示关闭按钮
    appendbody: Boolean, // 是否插入在body上
    visible: Boolean, // 展示
    class: String || Array,
    classname: String || Array,
    center: Boolean, // 是否垂直居中 默认true
    modal:Boolean, // 是否需要遮罩
    canceltext: String, // 取消按钮文字
    oktext: String, // 确认按钮文字
    footer: String || Boolean
})
export interface modaTypeslProps {
    title: String, // 标题
    closable: Boolean, // 是否显示关闭按钮
    appendbody: Boolean, // 是否插入在body上
    visible: Boolean, // 展示
    class: String | Array<any>,
    classname: String | Array<any>,
    center: Boolean, // 是否垂直居中 默认true
    modal:Boolean, // 是否需要遮罩
    canceltext: String, // 取消按钮文字
    oktext: String, // 确认按钮文字
    footer: String | Boolean,
    setslotstyle: String, // 设置slot的样式  你要像使用style标签一样使用它
}
// 如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 append-to-body 属性。
const modalProps:Partial<{[K in keyof modaTypeslProps]?:modaTypeslProps[K] | String}> = {
    title: '提示',
    closable: 'true',
    appendbody: 'false',
    visible: 'false',
    class: '',
    classname: '',
    center: 'true',
    modal: 'true',
    canceltext: '取消',
    oktext: '确认',
    footer: 'true',
    setslotstyle: ''
}
export {
    modalProps
}
export default modaTypeslProps