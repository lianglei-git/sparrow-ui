// 打包用： 打包UI lib库 打包成一个文件

// const denv =( 'dotenv'
const typescript = require('rollup-plugin-typescript2')
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const external = require('rollup-plugin-peer-deps-external')
const replace = require('rollup-plugin-replace')
const { join } = require('path')

const config = {
    input: join(__dirname, '../', 'components/index.ts'),
    output: {
        file: join(__dirname, '../lib/index.js'),// process.env.npm_package_main
        format: 'iife', // cjs
        name: "named", // ElectronMainBundle
        sourcemap: true,
    },
    plugins: [
        external(),
        typescript(),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        resolve(),
        commonjs({
            // namedExports: {
            //   'node_modules/react/index.js': ['createElement'],
            //   'node_modules/react-dom/index.js': ['render']
            // }
        }),
        replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ]
}


module.exports = config;