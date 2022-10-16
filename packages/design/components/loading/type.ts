export interface loadingTypesProp {
    'classname': string
    'icon': string | number | any
    'background': string
    'text': string
    'fullscreen': string | boolean
    'target': string 
    'status': string | boolean
}


// default // [默认值] // [是否完成]
export const loadingProps: Partial<loadingTypesProp> = {
    'icon': undefined, //'sp-icon-loading' // ok
    'classname': undefined,// '' // ok
    'background': undefined, // 'rgba(0,0,0,.3)' // ok ?
    'fullscreen': undefined,//'false' // ok
    'text': '加载中...', //'加载中...' // ok
    'target': undefined,  //'children' ok
    'status': 'true' // ok
}
// close 事件