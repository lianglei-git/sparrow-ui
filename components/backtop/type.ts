export interface backTopTypes {
    target: string // 触发滚动的对象    
    'visibility-height': number// 滚动高度达到此参数值才出现
    right: number	
    bottom:number
}

export const backTopProps = {
    target: undefined,
    'visibility-height': 200,
    right: 40,
    bottom: 40
}

// click 回调事件