
import { InputProps , InputTypes } from '../input/type'

export interface numberTypes extends InputTypes {
    min: number
    max: number
    step: number
    parser: string
} 

export const numberProps = Object.freeze({
    ...InputProps, 
    type: 'number',
    min: 1,
    max: 10,
    step: 0.5,
    parser: '%'
})