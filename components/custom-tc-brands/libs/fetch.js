
export default {
    getBrands({res}) {
        res(require('./level1.json'))
    },
    tcStyle({res}) {
        res(require('./level2.json'))
    },
    tcModel({res}) {
        res(require('./level3.json'))
    },
}