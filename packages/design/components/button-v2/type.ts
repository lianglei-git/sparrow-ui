import {tuple} from '../_utils/type'

const ButtonTypes = tuple('default', 'primary', 'dashed', 'text', 'link', 'danger')
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
    htmltype: ButtonHTMLTypes,
    disabled: Boolean,
    loading: Boolean || {
        delay: Number
    },
    icon: String,
    /** new */
    ripplecenter: Boolean
})
const baseprops:any = {
    type: 'default',
    size: 'middle',
    shape: 'default',
    htmltype: 'button',
    disabled: 'false',
    loading: false,
    'icon': '',
    ripplecenter: false
    }
export {baseprops}
export type ButtonProps = Partial<ReturnType<typeof buttonProps>>
export default buttonProps