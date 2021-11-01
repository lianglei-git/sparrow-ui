export interface switchTypesProps {
    disabled: boolean
    width: string | number
    classname: string
    'default-checked': boolean
    loading: boolean
    size: 'default' | 'small'
    ['active-text']: string | number | any
    ['inactive-text']: string | number | any
    ['active-color']: string
    ['inactive-color']: string
    'active-icon': string
    'inactive-icon': string
}
// default
export const switchProps:Partial<{[K in keyof switchTypesProps]?: switchTypesProps[K] | string}> = {
    disabled: 'false',// 👌
    width: '',// 👌
    classname: '',
    'default-checked': 'false',// 👌
    loading: 'false',// 👌
    size: 'default',// 👌
    'active-text': '',
    'inactive-text': '',
    'active-color': '',// 👌
    'inactive-color': '',// 👌
    'active-icon': '',
    'inactive-icon': ''
}