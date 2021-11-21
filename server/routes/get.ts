// @ts-nocheck
const uiFuncs = require('../../scripts/build.ts')
module.exports = {
    ['/'](req,res) {
        res.write('get 方法 ---  /')
    },
    ['/build'](req,res) {
        uiFuncs()
        res.write('build 方法 ---  /')
    },
}