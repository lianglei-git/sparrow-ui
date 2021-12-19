/// 这里引用 和 抛出组件
import { getGlobalThis } from './_utils/common'
import './common/styles'
export * as button from "./button/index"
import { Message } from './message'
import { Modal } from "./modal"
import './switch/index'
import './alert'
import { Loading } from './loading'
import { Notify } from './notification'
import './drawer'
import './timeline'
import './breadcrumb'
import './progress'
import './affix'
import './backtop'
import './tooltip'
import './popover'


// 打包ui时候关闭下面这些代码，打包site时候打开这个定制代码。
import './custom-tc-brands';

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