export interface timelineTypesProps {
    mode: 'left' | 'right',
    pending: string | boolean
}

export const timelineProps: Partial<timelineTypesProps> = {
    mode: 'left',
    pending: 'false'
}


export interface timelineItemTypesProps {
    color: string
    position: 'left' | 'right'
    label: string
    icon: string | null
}

export const timeItemlineProps: Partial<timelineItemTypesProps> = {
    color: undefined,
    position: 'left', // 只有子元素中有label值的时候才能有效！
    label: undefined,
    icon: undefined
} 