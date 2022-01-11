export interface InputTypes {
    size: 'large' | 'default' | 'small'
    'addon-before': string | HTMLElement
    'addon-after': string | HTMLElement
    type: 'textarea' | 'input' | 'password' | 'search' | 'number'
    disabled: string | boolean
    bordered: string | boolean
    value: string | number
    'max-length': number
    'show-count': number
    'allow-clear': boolean
    prefix: any
    suffix: any
}
//onPressEnter
//onChange

export const InputProps = {
    size: 'default',
    type: 'input',
    placeholder: '这是一个简单的输入框',
    'max-length': undefined,
    value: undefined,
    prefix: undefined,
    suffix: undefined,
    disabled: undefined,
    bordered: undefined,
    'allow-clear': undefined,
    'show-count': undefined,
    'addon-before': undefined,
    'addon-after': undefined
    // prefix: 'sp-icon-rmb'
}

