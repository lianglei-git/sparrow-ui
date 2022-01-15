import { getGlobalThis } from './_utils/common'
import {Loading} from './loading'
import './common/styles'
import './drawer'
import './switch'
import './alert'
import './button'
import './timeline'
import './progress'
import './popover'
import './slider'
import './badge'
import './collapse'
import './input'
const Spui = {
  Loading,
}
 
getGlobalThis().Spui = Spui; 
export default Spui

export {
  Loading,
}
 
