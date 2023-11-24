const fs = require('fs')
// const uiFuncs = require('design/config/build')
const path = require('path')
module.exports = {
    ['/build'](req, res) {
        // content 内容是传递过来的 现在开始写 前端逻辑 

        const tmppath = path.resolve(__dirname, '../../components/temp.ts');
        var data = "";
        req.on("data", function (chunk) {
            data += chunk;
        })
        req.on("end", function () {
            data = JSON.parse(data);
            fs.writeFile(tmppath, data.content, () => {
                // uiFuncs({ entryPath: tmppath, isCustom: true }).then(outputPath => {
                //     // console.log(outputPath);
                //     setTimeout(() => {
                //         res.write(JSON.stringify({ status: true }))
                //         res.end()
                //     }, 1000)

                // })

            })
        })
        return true
    },
}
