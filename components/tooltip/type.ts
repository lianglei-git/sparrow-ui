export interface tooltipTypesProps {
    title:string
    placement: 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'| 'left-top'|'left-bottom'|'right-top'|'right-bottom'
    trigger: 'hover' | 'click' | 'contextmenu' | 'focus' | string | string[]
    'get-popup-container': string | Function
    visible: string | boolean
    'mouse-enter-delay': number // 鼠标移入后延时多少才显示 Tooltip，单位：毫秒
    'mouse-leave-delay': number
    'mouse-move-delay': number // 移入移出速度的延时， 在多久外有效触发， 不得高于滑入延时
    classname: string // 这里面的classname 是弹出层的自定义name 原始的建议通过属性选择器选择， 这何况不是一种方式呢？
    color: string // 背景颜色
    popupstyle: string // 弹出层style
    'arrow-point-at-center': string | boolean
}


// getPopupContainer 或 get-popup-container 前者为function 后者为string 不同的传参数方式， 属性权重较大
// onVisibleChange显示隐藏的回调函数
export const tooltipProps: Partial<tooltipTypesProps> = {
    title: '',
    placement: 'top',
    trigger: 'hover',
    visible: undefined,
    'get-popup-container': undefined,
    'mouse-enter-delay': 100,
    'mouse-leave-delay': 100,
    'mouse-move-delay': 90,
    classname: undefined,
    color: undefined,
    popupstyle: undefined, // 弹出层style
    'arrow-point-at-center': false

}