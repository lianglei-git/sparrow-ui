export interface badgeTypes {
    count: number
    'max-count': number
    dot: boolean
    'show-zero': boolean
    status: 'success' | 'processing' |'default' | 'error' |'warning'
    text: string
    color: string
}

export const badgeProps = {
    'max-count': 99,
    count: undefined,
    'show-zero': true,
    color: undefined,
    text: undefined
}

// click 回调事件