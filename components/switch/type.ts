export interface switchTypesProps {
    'disabled': boolean
    'width': string | number
    'classname': string
    'default-checked': boolean
    'loading': boolean
    'size': 'default' | 'small'
    ['active-text']: string | number | any
    ['inactive-text']: string | number | any
    ['active-color']: string
    ['inactive-color']: string
    'active-icon': string
    'inactive-icon': string
    'value': boolean | string 
}
// default
export const switchProps:Partial<{[K in keyof switchTypesProps]?: switchTypesProps[K] | string}> = {
    'disabled': 'false',// π
    'width': '',// π
    'classname': '',// π
    'default-checked': 'false',// π
    'loading': 'false',// π
    'size': '',// π
    'active-text': '',// π
    'inactive-text': '',// π
    'active-color': '',// π
    'inactive-color': '',// π
    'active-icon': '',// π
    'inactive-icon': '',// π
    'value': undefined
}
// onChange δΊδ»Ά