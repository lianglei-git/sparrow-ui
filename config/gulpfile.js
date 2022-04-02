const gulp = require('gulp');
const through2 = require('through2'); // transfrom的steam
const babel = require('gulp-babel');
const transformLess = require('./gulp/transformLess');
const { getProjectPath } = require('./gulp/utils/projectHelper');
const tsConfig = require('./gulp/getTSCommonConfig')();
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const tsDefaultReporter = ts.reporter.defaultReporter();
const argv = require('minimist')(process.argv.slice(2));
const getBabelCommonConfig = require('./gulp/getBabelCommonConfig');
const { cssInjection } = require('./gulp/utils/styleUtil');
const { src, dest } = gulp;

// var uglify = require('gulp-uglify'); // 待下载
// exports.default = function () {
//     return src('src/*.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(dest('output/'));
// }

const libDir = getProjectPath('libs');
const esDir = getProjectPath('es');
// 暂时不考虑 ES module
const compile = (esModule) => {
    let error= null;
    // =================LESS=================
    const less = src(['components/**/*.less'])
        .pipe(through2.obj(function (file, encoding, next) {
            const cloneFile = file.clone();
            const content = file.contents.toString().replace(/^\uFEFF/, '');
            cloneFile.contents = Buffer.from(content);
            const cloneCssFile = cloneFile.clone();
            this.push(cloneFile);
            // Transform less file
            if (
                file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
                file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/)
            ) {
                transformLess(cloneCssFile.contents.toString(), cloneCssFile.path)
                    .then(css => {
                        cloneCssFile.contents = Buffer.from(css);
                        cloneCssFile.path = cloneCssFile.path.replace(/\.less$/, '.css');
                        this.push(cloneCssFile);
                        next();
                    })
                    .catch(e => {
                        console.error(e);
                    });
            } else {
                next();
            }


        }))
        .pipe(dest(libDir))

    const assets = src(['components/**/*.@(png|svg)'])
        .pipe(dest(libDir));

    // =================TS=================

    const source = [
        'components/**/*.tsx',
        'components/**/*.ts',
        'typings/**/*.d.ts',
        '!components/**/__tests__/**',
        'components/**/*.jsx'
    ]
    let sourceStream = src(source);
    // if(!esModule) {
    //     sourceStream = sourceStream.pipe(
    //         stripCode({
    //           start_comment: '@remove-on-es-build-begin',
    //           end_comment: '@remove-on-es-build-end',
    //         })
    //       );
    // }

    const tsResult = sourceStream.pipe(
        ts(tsConfig, {
          error(e) {
            tsDefaultReporter.error(e);
            error = 1;
          },
          finish: tsDefaultReporter.finish,
        })
      );
      function check() {
        if (error && !argv['ignore-error']) {
          process.exit(1);
        }
      }
    
      tsResult.on('finish', check);
      tsResult.on('end', check);
      const tsFilesStream = babelify(tsResult.js, esModule);
      const tsd = tsResult.dts.pipe(dest(libDir));
      return merge2([less, tsFilesStream, tsd, assets].filter(s => s));
}




function babelify(js, modules) {
    const babelConfig = getBabelCommonConfig(modules);
    delete babelConfig.cacheDirectory;
    if (modules === false) {
      babelConfig.plugins.push(replaceLib);
    }
    const stream = js.pipe(babel(babelConfig)).pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          if (content.indexOf("'react-native'") !== -1) {
            // actually in antd-mobile@2.0, this case will never run,
            // since we both split style/index.mative.js style/index.js
            // but let us keep this check at here
            // in case some of our developer made a file name mistake ==
            next();
            return;
          }
  
          file.contents = Buffer.from(cssInjection(content));
          file.path = file.path.replace(/index\.js/, 'css.js');
          this.push(file);
          next();
        } else {
          next();
        }
      })
    );
    return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
  }


  gulp.task('compile-with-lib', done => {
    console.log('[Parallel] Compile to js...');
    compile().on('finish', done);
  });