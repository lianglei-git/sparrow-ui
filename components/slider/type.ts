export interface sliderTypes {
    default: string | number
    vertical: boolean
    min: number,
    max: number,
    marks: object
    step: number
    reverse: boolean
    range:boolean
    disabled: boolean
    tooltipVisible: boolean
}


export const sliderProps = {
    default: 0,
    vertical:false,
    min: 5,
    max: 10,
    marks: {},
    step: 0.1,
    reverse: false,
    range: undefined,
    disabled: undefined,
    tooltipVisible: undefined
}