const fs = require("fs");
const path = require("path");
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));


const fromFileName = path.resolve(__dirname, '../components/package.json');
const toFileName = path.resolve(__dirname, '../npm/package.json');
const rs = fs.createReadStream(fromFileName, {
    autoClose: true,
    encoding: 'utf-8',
    highWaterMark: 64 * 1024 * 1024,
    flags: 'r'
})
const ws = fs.createWriteStream(toFileName, {
    encoding: 'utf-8',
    flags: 'a',
    highWaterMark: 16 * 1024 * 1024,
    autoClose: true
})
rs.pipe(ws);
