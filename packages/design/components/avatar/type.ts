export interface avatarTypes {
    shape: 'circle' | 'square' // 触发滚动的对象    
    size : 'large' | 'small' |'default' | number// 滚动高度达到此参数值才出现
    src: string	
    icon: string
}

export const avatarProps = {
    shape: 'square',
    size: 'default',
    src: undefined,
    icon: undefined
}

// click 回调事件