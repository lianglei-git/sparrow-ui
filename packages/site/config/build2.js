// 打包文件
const minimist = require('minimist')

const config = require('./webpack.config')

const webpack = require('webpack')

const argv = minimist(process.argv.slice(2))

const webOptions = config()

const compilers = webpack(webOptions)

const siteFunc = () => compilers.run()

runIFELSE(new Set([
    [argv.site, siteFunc],
]))
