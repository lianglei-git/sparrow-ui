export interface InputTypes {
    size:'large'|'default'|'small'
    'addon-before': string | HTMLElement
    'addon-after': string | HTMLElement
    type: 'textarea' | 'input' | 'password' | 'search'
    disabled:string | boolean  
    bordered: string | boolean
    value: string | number // ?
    'max-length': number // ?
    'show-count': number // ?
    'allow-clear': boolean 
    prefix:any
    suffix:any
}
//onPressEnter
//onChange

export const InputProps = {
    size: 'default',
    type: 'input',
    placeholder: '这是一个简单的输入框',
    // prefix: 'sp-icon-rmb'
}

