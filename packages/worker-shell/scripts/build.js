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

const uiRollupBuild = async (bundle, config) => {
    if (Array.isArray(config.output)) {
        config.output.map(async i => {
            await bundle.generate(i)
            await bundle.write(i);
        })
    } else {
        await bundle.generate(config.output)
        await bundle.write(config.output);
    }
}
const uiFunc = async ({ isCustom, entryPath } = { isCustom: undefined, entryPath: '' }) => {
    let copy = Object.assign(rollupConfig);
    let file = null;
    if (isCustom) {
        if (Array.isArray(copy)) {
            copy[0].input = entryPath;
            file = copy[0].output.file
        } else {
            copy.input = entryPath;
            file = copy.output.file
        }
    }

    if (Array.isArray(copy)) {
        copy.forEach(async config => {
            const bundle = await Rollup.rollup(config)
            await uiRollupBuild(bundle, config);
        })
    } else {
        const bundle = await Rollup.rollup(copy)
        await uiRollupBuild(bundle, copy);
    }

    return Promise.resolve(file)
}

let runIFELSE = (sets) => {
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