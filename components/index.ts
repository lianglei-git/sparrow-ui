/// 这里引用 和 抛出组件
// @ts-nocheck
import {runIFELSE, getGlobalThis} from './_utils/common'
import 'sparrow-ui/common/styles'
export * as button from "./button/index"
import {Modal} from "./modal"
export * as alert from "./alert/alert";
const Spui = {
    Modal
}


getGlobalThis().Spui = Spui
export default Modal