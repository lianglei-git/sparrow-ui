const messageTypeslProps = () => ({
    visible: false, // 展示
    type: 'success' || 'error' || 'info' || 'warning' || 'loading', // 主题
    message: '',
    duration: 3000, // 显示时间, 毫秒。设为 0 则不会自动关闭
    showclose: false, // 	是否显示关闭按钮
    center: false, // 文字是否居中
    offset: 20, // Message 距离窗口顶部的偏移量
    beforeClose: () => {},
    style: undefined,
    className: ''
})


export default messageTypeslProps