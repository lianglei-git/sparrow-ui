// 打包用： 打包UI lib库 打包成一个文件

// const denv =( 'dotenv'
const typescript = require('rollup-plugin-typescript2')
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const external = require('rollup-plugin-peer-deps-external')
const replace = require('rollup-plugin-replace')
const { uglify } = require('rollup-plugin-uglify')
const { join } = require('path')
const postcss = require('rollup-plugin-postcss');
let basePath = '../npm/dist';
const plugins = [
    // less({
    //     output: join(__dirname, '../lib/index.css')
    // }),
    postcss({
        extract: join(__dirname, basePath + '/spui.css'),
        // name: ['spui.css'],
        config: {
            path: join(__dirname, basePath)
        },
        to: join(__dirname, basePath + '/spui.css'),
        extensions: ['.css', '.less'],
        minimize: true,
        exec: true,
        inject: true,
    }),
    external(),
    // typescript({
    //     tsconfig: "components/tsconfig.json",
    // }),
    typescript(),
    babel({
        exclude: ['node_modules/**', 'components/loading/index.ts'],
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
    // uglify(),


]
const onwarn = function (warning) {
    // Skip certain warnings 

    // should intercept ... but doesn't in some rollup versions 
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }

    // console.warn everything else 
    console.warn(warning.message);
}
const basicConfig = {
    // input: {
    //     entryStyle: join(__dirname, '../', 'components/entryStyle.ts'),
    //     spui: join(__dirname, '../', 'components/index.ts')
    // },
    input: join(__dirname, '../', 'components/index.ts'),
    // preserveModules: true,
    // output: {
    //     // file: join(__dirname, '../' + basePath + '/spui.js'),// process.env.npm_package_main
    //     format: 'es', // cjs
    //     file: join(__dirname, basePath, 'spui-es.js'),
    //     // name: "[name]", // ElectronMainBundle
    //     // sourcemap: true,
    //     // entryFileNames: '[name].js',
    //     // inlineDynamicImports: true
    // },
    output: [
        {
            file: join(__dirname, basePath + '/spui.js'),// process.env.npm_package_main
            format: 'iife', // cjs
            // name: "named", // ElectronMainBundle
            sourcemap: true,
        },
        {
            file: join(__dirname, basePath + '/spui-umd.js'),
            format: 'umd',
            name: 'umd',
            sourcemap: true,
        },
        {
            file: join(__dirname, basePath + '/spui-amd.js'),
            format: 'amd',
            sourcemap: true,

        },
        {
            file: join(__dirname, basePath + '/spui-es.js'),
            format: 'es',
            sourcemap: true,

        },
        {
            file: join(__dirname, basePath + '/spui-cjs.js'),
            format: 'cjs',
            sourcemap: true,

        }
    ]

}

const lessConfig = {
    input: join(__dirname, '../', 'components/entryStyle.ts'),
    output: {
        file: join(__dirname, basePath + '/entryStyle.js'),// process.env.npm_package_main
        format: 'iife',
    }
}


// module.exports = [basicConfig, lessConfig]
// .map(element => {
//     element.onwarn = onwarn;
//     element.plugins = plugins;
//     return element;
// });

basicConfig.onwarn = onwarn;
basicConfig.plugins = plugins;
module.exports = basicConfig