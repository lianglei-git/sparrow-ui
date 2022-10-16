const cfg = require('./rollup.config')

const rollup = require('rollup');

const watcher = rollup.watch(cfg);

console.log('Rollup is watching for changes...');

watcher.on('event', event => {
    switch (event.code) {
        case 'START':
            console.info('Rebuilding...');
            break;
        case 'BUNDLE_START':
            console.info('Bundling...');
            break;
        case 'BUNDLE_END':
            console.info('Bundled!');
            break;
        case 'END':
            console.info('Done!');
            break;
        case 'ERROR':
        case 'FATAL':
            console.error("Rollup error: ", event);
    }
});

process.on('exit', () => {
    watcher.close();
});