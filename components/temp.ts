import { getGlobalThis } from './_utils/common'
import {Message} from './message'
import {Loading} from './loading'
import {Notify} from './notification'
import {Modal} from './modal'
// import './common/styles'
import './alert'
import './switch/index'
import './button/index'
import './drawer'
import './timeline'
import './breadcrumb'
const Spui = {
  Message,
  Loading,
  Notify,
  Modal,
}
 
getGlobalThis().Spui = Spui; 
export default Spui

export {
  Message,
  Loading,
  Notify,
  Modal,
}
 
