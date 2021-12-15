export interface tooltipTypesProps {
    title:string
    placement: 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'| 'left-top'|'left-bottom'|'right-top'|'right-bottom'
}


export const tooltipProps: Partial<tooltipTypesProps> = {
    title: '',
    placement: 'top'
}