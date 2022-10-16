
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
    min: undefined,
    max: undefined,
    step: 1,
    parser: undefined
})