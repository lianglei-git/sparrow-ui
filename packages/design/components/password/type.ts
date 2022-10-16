
import { InputProps , InputTypes } from '../input/type'

export interface PasswordTypes extends InputTypes {
    'icon-show': string
    'icon-unshow': string
    visible: boolean
} 

export const PasswordProps = Object.freeze({
    ...InputProps, 
    type: 'password',
    'icon-show': 'sp-icon-eye',
    'icon-unshow': 'sp-icon-eyes',
    visible: true
})