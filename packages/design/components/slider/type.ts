export interface sliderTypes {
    default: string | number | Array<any>
    vertical: boolean
    min: number,
    max: number,
    marks: object
    step: number
    reverse: boolean
    // range:boolean
    disabled: boolean
    tooltipvisible: boolean
    draggabletrack: boolean
    value: string | any[] | number | any
    tipFormatter(value:string | number):any; // 挂在元素的自定义文字
    'tip-formatter': string
}


export const sliderProps = {
    default: 0,
    vertical:false,
    min: 0,
    max: 100,
    marks: undefined,
    step: 1,
    reverse: false,
    // range: undefined, // 去除双滑块模式 采用default 数组传两个参数自动变为双滑块模式
    disabled: undefined,
    tooltipvisible: undefined,
    draggabletrack: undefined,
    value: undefined,
    'tip-formatter': ''
}