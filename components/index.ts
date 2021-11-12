/// 这里引用 和 抛出组件
// @ts-nocheck
import { runIFELSE, getGlobalThis } from './_utils/common'
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