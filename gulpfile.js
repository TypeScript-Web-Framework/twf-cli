const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', {
    declaration : false,
    removeComments : true,
    declarationFiles :false
});
const clean = require('gulp-clean');
gulp.task("compile", () => gulp.src( __dirname + "/src/**/*.ts").pipe(tsProject()).pipe(gulp.dest(__dirname + '/tmp')));
gulp.task('compress', () => gulp.src(__dirname + '/tmp/**/*.js').pipe(gulp.dest(__dirname + '/dist')));
gulp.task("remove:tmp", () => gulp.src( [__dirname + '/tmp'], { read: false, allowEmpty:  true}).pipe(clean()));
gulp.task("remove:dist", () => gulp.src( __dirname + '/dist', {read : false, allowEmpty: true}).pipe(clean()));
gulp.task("copy:json", () => gulp.src( __dirname + "/src/**/*.json").pipe(gulp.dest(__dirname + '/dist')));
gulp.task("default", gulp.series(['remove:dist' , 'compile', 'compress' , 'copy:json', 'remove:tmp']));
