export interface notifyTypesProps {
    visible?: boolean, // 展示
    type: 'success' | 'error' | 'info', // 主题
    message:  string,
    duration: number, // 显示时间, 毫秒。设为 0 则不会自动关闭
    showclose: boolean, // 	是否显示关闭按钮
    offset: number, // Message 距离窗口顶部的偏移量
    beforeClose?: () => any,
    style: undefined,
    title: string,
    classname?: string
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}
// default
export const notifyProps:Partial<notifyTypesProps> = {
    visible: false, // 展示
    type: 'success', // 主题
    message: undefined, // ''
    duration: 3000, // 3000 // 显示时间, 毫秒。设为 0 则不会自动关闭
    showclose: undefined, // false	是否显示关闭按钮
    offset: 20, // Message 距离窗口顶部的偏移量
    beforeClose: () => {},
    style: undefined,
    title: '',
    classname: undefined,
    position: 'top-right' //  | 'top-left' | 'bottom-right' | 'bottom-left'
}
// onChange 事件