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
    draggabletrack: undefined
}