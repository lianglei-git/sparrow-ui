// onSearch
import { InputProps , InputTypes } from '../input/type'

export interface SearchTypes extends InputTypes {
    'enter-button': boolean | string
    'loading': boolean
} 

// observe 就一个loading 写在直属文件里面了
export const SearchProps = Object.freeze({
    ...InputProps, 
     type: 'search',
     'loading': undefined,
    'enter-button': undefined
})