export interface collapseTypes {
    'no-boder': boolean
    'dis-hover': boolean
    title: string
    extra: string | HTMLElement

    /** 2023/1/10 type = 'vertical' | 'default' */
    type: 'vertical' | 'default'
}

export const collapseProps:collapseTypes = {
    'no-boder': undefined,
    'dis-hover': undefined,
    title: undefined,
    extra: undefined,
    type: 'default'
}
