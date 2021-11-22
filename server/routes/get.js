
const fss = require('fs')
const path = require('path')
module.exports = {
    ['/'](_, res) {
        res.write('get 方法 ---  /')
    },
    ['/build'](req, res) {
        console.log(req)
        // content 内容是传递过来的 现在开始写 前端逻辑 
        //         const tmppath = path.resolve(__dirname, '../../components/temp.ts');
        //         const content = `
        // import { getGlobalThis } from './_utils/common'
        // import './common/styles'
        // import { Message } from './message'
        // const Spui = {
        //     Message,
        // }
        // getGlobalThis().Spui = Spui
        //                         `
        // fss.writeFile(tmppath, content, () => {
        //     uiFuncs({ entryPath: tmppath, isCustom: true })
        // })

        res.write(JSON.stringify({ data: 888 }))
    },
    ['/downfile'](req, res) {
        //Users/apple/Desktop/梅西/beforeschool/sparrow-ui/lib/index.js
        res.setHeader('Content-type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment;filename=sp.js');    // 'aaa.txt' can be customized.
        var fileStream = fss.createReadStream(path.resolve(__dirname, '../../lib/index.js'));
        fileStream.on('data', function (data) {
            res.write(data, 'binary');
        });
        fileStream.on('end', function () {
            res.end(null)
        });
        return true
    }
}
