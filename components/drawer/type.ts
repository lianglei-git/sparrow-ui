export interface drawerTypesProps {
    classname: string  // 自定义类名
    closable: string | boolean // 是否显示右上角的关闭按钮
    closeicon: string // 自定义关闭图标
    mask: string | boolean // 是否展示遮罩 
    onClose: (ang:any) => any // 关闭前的回调
    // afterVisibleChange: (vivible:boolean) => void // 切换抽屉时动画结束后的回调
    keyboard: string | boolean // 是否支持键盘 esc 关闭
    'mask-closable': string | boolean // 点击蒙层是否允许关闭
    placement: 	'top' | 'right' | 'bottom' | 'left' // 抽屉的方向
    visible	: string | boolean,
    'append-to-body': string | boolean // 以目前的各种因素来看 不得不舍去这个属性， 没有太多的对react和vue进行考虑 
    fullscreen:string | boolean // 代替 是否全局和局部
    width: string | number
}

export const drawerProps: Partial<drawerTypesProps> = {
    'append-to-body': 'true', 
    'mask-closable': 'true',
    keyboard: 'true',
    visible: undefined,
    classname: '',
    placement: 'right',
    closable: 'true',
    closeicon: undefined,
    mask: 'true',
    fullscreen: 'true',
    width: undefined
} 