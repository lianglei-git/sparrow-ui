import l1 from './level1'
import l2 from './level2'
import l3 from './level3'


export default {
    getBrands({res}) {
        res(l1)
    },
    tcStyle({res}) {
        res(l2)
    },
    tcModel({res}) {
        res(l3)
    },
}