// import denv from 'dotenv'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import replace from 'rollup-plugin-replace'
// const { join } = require('path')
import { join } from 'path'
// denv.config({
//     path: join(__dirname, '../.wenv')
// })
// console.log(process.env.npm_package_main)


let isSite = true

const config = {
    input: join(__dirname, isSite ? '../site/App.tsx' : '../index.ts'),
    output: {
        file: join(__dirname, '../dist/index.js'),// process.env.npm_package_main
        format: 'iife', // cjs
        name: "named", // ElectronMainBundle
        sourcemap: true,
        // globals: {
        //     react: 'React',
        //     'react-dom': 'ReactDOM'
        // }
    },
    // external: ['react', 'react-dom'],
    plugins: [
        external(),
        typescript(),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        resolve(),
        commonjs({
            namedExports: {
              'node_modules/react/index.js': ['createElement'],
              'node_modules/react-dom/index.js': ['render']
            }
          }),
        replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ]
}


export default config;