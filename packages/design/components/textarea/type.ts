
import { InputProps , InputTypes } from '../input/type'

export interface TextareaTypes extends InputTypes {
    'auto-size': [] | string | boolean
    'min-rows' : undefined
    'max-rows': undefined
} 

export const TextareaProps = Object.freeze({
    ...InputProps, 
    type: 'textarea',
    'auto-size': undefined,
    'min-rows' : undefined,
    'max-rows': undefined
})
//onResize