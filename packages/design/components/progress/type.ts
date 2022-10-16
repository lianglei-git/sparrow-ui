export interface progressTypes {
    percentage: number | string // 百分比    
    type: 'line' | 'circle' | 'dashboard'
    'stroke-width': string | number
    status: 'success' | 'error' | 'normal'
    color: string
    width: string | number  
    'show-info': string | boolean
    'text-inside': string | boolean // 进度条显示文字内置在进度条内（只在 type=line 时可用）
    'stroke-linecap': 'butt'|'round'|'square'
    format: (percentage:number) => any
}

export const progressProps = {
    percentage: 0,
    type: 'line',
    'text-inside': undefined,
    'stroke-width': 6,
    status: undefined,
    color: undefined,
    'show-info': true, // 是否展示进度条的标识
    width: 100,//环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）
    'stroke-linecap': 'round'
}
