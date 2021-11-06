export interface alertTypesProps {
    'classname': string
    'icon': string | number | any
    'type': 'success' | 'warning' | 'info' | 'error'
    'closable': string | boolean// 字符串的boolean
    'center': string | boolean // 字符串的boolean
    'title': string
    'close-text': string | number // 文字
    'effect': 'light' | 'dark'
}
// default // [默认值] // [是否完成]
export const alertProps: Partial<{ [K in keyof alertTypesProps]?: alertTypesProps[K] | string }> = {
    'icon': undefined,//'' // ok
    'classname': undefined,// '' // ok
    'type': 'success', // ok 
    'closable': undefined,// false  // ok
    'center': undefined, // false // ok
    'title': undefined,//'' // ok
    'close-text': undefined,//'' // ok
    'effect': 'light' // ok
}
// close 事件