/// 这里引用 和 抛出组件
// @ts-nocheck
import {runIFELSE} from './_utils/common'
import 'sparrow-ui/common/styles'
export * as button from "./button/index"
export * as modal from "./modal"
export * as alert from "./alert/alert"
runIFELSE(new Set([
    [1==1, () => console.log('这里是组件了')],
    [2==2, () => console.log(999)],
]))


// export {
//     Button
// }