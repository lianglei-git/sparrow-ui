const gulp = require('gulp');
const program = require('commander')

program.parse(process.argv);

const task = program.args[0];


require('./gulpfile');

if (task) {
    const metadata = { task }
    const taskInstance = gulp.task(task);

    if (taskInstance === undefined) {
        gulp.emit('task_not_found', metadata);
    }
    const start = process.hrtime();
    gulp.emit('task_start', metadata);
    try {
        taskInstance.apply(gulp);
        metadata.hrDuration = process.hrtime(start);
        gulp.emit('task_stop', metadata);
        gulp.emit('stop');
    } catch (err) {
        err.hrDuration = process.hrtime(start);
        err.task = metadata.task;
        gulp.emit('task_err', err);
    }
}else {
  program.help();
}