/// 这里引用 和 抛出组件
import {runIFELSE} from './utils/common'


runIFELSE(new Set([
    [1==1, () => console.log('这里是组件了')],
    [2==2, () => console.log(999)],
]))