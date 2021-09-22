import {tuple, tupleNum} from 'sparrow-ui/_utils/type'

const ButtonTypes = tuple('default', 'primary', 'dashed', 'text', 'link')
export type ButtonType  =typeof ButtonTypes[number]

const ButtonSizes = tuple('middle', 'small', 'mini')
export type ButtonSize = typeof ButtonSizes[number]

const ButtonShapes = tuple('circle', 'default', 'round')
export type ButtonShape = typeof ButtonShapes[number];

const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];


const buttonProps = () => ({
    type: ButtonTypes,
    size: ButtonSizes,
    shape:ButtonShapes,
    htmlType: ButtonHTMLTypes,
    ['on-click']: () => [],
    disabled: Boolean,
    loading: Boolean || {
        delay: Number
    }
})
export type ButtonProps = Partial<ReturnType<typeof buttonProps>>
export default buttonProps