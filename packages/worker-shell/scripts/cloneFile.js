const fs = require("fs");
const path = require("path");
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const maps = [
    {
        fromFileName:  path.resolve(__dirname, '../../design/components/package.json'),
        toFileName: path.resolve(__dirname, '../../sparrow-ui/package.json')
    },
    {
        fromFileName:  path.resolve(__dirname, '../../design/components/overview/index.md'),
        toFileName: path.resolve(__dirname, '../../sparrow-ui/README.md'),
        readOptions: {
            start: 63
        }
    },
    {
        fromFileName:  path.resolve(__dirname, '../../../LICENSE'),
        toFileName: path.resolve(__dirname, '../../sparrow-ui/LICENSE')
    },

]

maps.map(({fromFileName, toFileName, readOptions = {}}) => {
    try{
        fs.rmSync(toFileName);
    }catch(err) {

    }
    const rs = fs.createReadStream(fromFileName, {
        autoClose: true,
        encoding: 'utf-8',
        highWaterMark: 64 * 1024 * 1024,
        flags: 'r',
        ...readOptions
    })
    const ws = fs.createWriteStream(toFileName, {
        encoding: 'utf-8',
        flags: 'a',
        highWaterMark: 16 * 1024 * 1024,
        autoClose: true
    })
    rs.pipe(ws);
    
})
