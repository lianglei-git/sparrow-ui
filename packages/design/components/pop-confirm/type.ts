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
    'ok-text': '确定',
    'cancel-text': '取消',
    effect: 'light',
    trigger: 'click',
    'hide-icon': false
})