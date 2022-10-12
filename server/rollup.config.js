import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
export default {
    input: './source/index.js',
    output:  {
        file: './dist/index.js',
        format: 'cjs'
    },
    plugins: [
        json(),
        resolve(),
        commonjs(),
        babel()
    ]
}