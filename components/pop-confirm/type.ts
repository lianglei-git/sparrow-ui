import { tooltipProps, tooltipTypesProps } from '../tooltip/type'
import {ButtonType} from '../button/type'

export interface popconfirmTypesProps extends tooltipTypesProps {
    icon: string
    'ok-text': string
    'cancel-text': string
    'ok-type': ButtonType
    'hide-icon': boolean
}

export const popconfirmProps = Object.freeze({
    ...tooltipProps,
    icon: 'sp-icon-warning',
    'ok-type': 'primary',
    'ok-text': 'Yes',
    'cancel-text': 'No',
    effect: 'light',
    'hide-icon': false
})