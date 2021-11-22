// 打包文件
const minimist = require('minimist')

const rollupConfig = require('../config/rollup.config')

const Rollup = require('rollup')

const config = require('../config/webpack.config')

const webpack = require('webpack')

const argv = minimist(process.argv.slice(2))

const webOptions = config()

const compilers = webpack(webOptions)

const siteFunc = () => compilers.run()

const uiFunc = async ({ isCustom, entryPath }: { isCustom: boolean, entryPath: '' }) => {
    let copy = { ...rollupConfig }
    if (isCustom) {
        copy.input = entryPath
    }
    const bundle = await Rollup.rollup(isCustom ? copy : rollupConfig)

    await bundle.generate(rollupConfig.output)

    await bundle.write(rollupConfig.output);
    return Promise.resolve(rollupConfig.output.file)
}

let runIFELSE: (sets: Set<any[]>) => void | any = (sets) => {
    for (let [is, fn] of sets) {
        if (is) {
            if (fn()) {
                break
            }
        }
    }
}


runIFELSE(new Set([
    [argv.ui, uiFunc],
    [argv.site, siteFunc],
]))


module.exports = uiFunc