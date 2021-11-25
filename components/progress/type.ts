export interface progressTypes {
    percentage: number | string // 百分比    
    type: 'line' | 'circle' | 'dashboard'
    'stroke-width': string | number
    status: 'success' | 'exception' | 'warning'
    color: string
    width: string | number  
    'text-inside': string | boolean // 进度条显示文字内置在进度条内（只在 type=line 时可用）
    'stroke-linecap': 'butt'|'round'|'square'
}

export const progressProps = {
    percentage: 0,
    type: 'line',
    'text-inside': undefined,
    'stroke-width': 6,
    status: undefined,
    color: undefined,
    width: 100,//环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）
    'stroke-linecap': 'round'
}
