/// 这里引用 和 抛出组件
// build:ui 会直接把entryStyle输出成css，并不会有js残留文件。postcss特性!
// import './entryStyle'
import { getGlobalThis } from './_utils/common'
import { Message } from './message'
import { Modal } from "./modal"
import { Loading } from './loading'
import { Notify } from './notification'
// import './common/styles'
import './drawer'
import './switch'
import './alert'
import './button'
import './button-v2'
import './timeline'
import './breadcrumb'
import './progress'
import './affix'
import './backtop'
import './tooltip'
import './popover'
import './pop-confirm'
import './slider'
import './avatar'
import './badge'
import './card'
import './collapse'
import './divider'
import './input'
import './search'
import './password'
import './textarea'
import './InputNumber'
import './checkbox'
import './radio'
import './layout'
import './select'
import './rate'


// 打包ui时候关闭下面这些代码，打包site时候打开这个定制代码。
// import './custom-tc-brands';

const Spui = {
    Modal,
    Message,
    Loading,
    Notify
}


getGlobalThis().Spui = Spui
export default Spui

export {
    Modal,
    Message,
    Loading,
    Notify
}