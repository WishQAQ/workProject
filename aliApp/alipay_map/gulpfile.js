"use strict";
const gulp    = require('gulp')
const rename  = require('gulp-rename') // 文件重命名
const less    = require('gulp-less') // less

const source = [
  './pages/**/*-less.acss',
  './assets/styles/*-less.acss',
  './components/**/*-less.acss'
]

// less
gulp.task('less', () => {
  gulp.src(source)
    .pipe(less())
    .pipe(rename((path) => {
      path.basename = path.basename.replace('-less', '')
      path.extname = '.acss'
    }))
    .pipe(gulp.dest((file) => {
      return file.base
    }))
})

// watch
gulp.task('watch', () => {
  gulp.watch(source.concat(['./assets/styles/**/*-less.acss']), ['less'])
});

gulp.task('default', ['less', 'watch'])