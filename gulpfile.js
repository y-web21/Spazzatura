'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const del         = require('del');
const plumber     = require('gulp-plumber');

// let argK

// tes
let nodeInclude = require('browser-sync');
let inheritClass = nodeInclude.create({
  // doneCallback : arg.doneCallback
});
// enum
let sassStyleDef = {
  'nested' : 0,
  'expanded' : 1,
  'compacted' : 2,
  'compressed' : 3
};
const sassStyleList = ['nested','expanded','compacted','compressed'];
const sassStyleNum = 1;




gulp.task('deploy', () => {

  let
    ftp = require('vinyl-ftp'),
    conn = ftp.create({
      host      : 'mysite.com',
      user      : arg.user || arg.u,      // command line option
      password  : arg.password || arg.p,  // command line option
      parallel  : 5
    }),
    glob = [
      'build/**/*'
    ],
    src = {
      base      : 'build/',
      buffer    : false
    },
    remotePath = '/public_html/';

    console.log(gulp       );
    console.log(browserSync);
    console.log(sass       );
    console.log(del        );
    console.log(nodeInclude);
    console.log(plumber    );

    console.log(conn);
  return gulp.src(glob, src)
    .pipe(conn.newerOrDifferentSize(remotePath))
    .pipe(conn.dest(remotePath));

});
// fetch command line arguments
const arg = (argList => {

  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    }
    else {

      // argument name
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  return arg;

})(process.argv);


gulp.task('delHtml',function() {
  del(['html/*.html']);
});
gulp.task('delJs',function() {
  del(['html/js/*.js']);
});
gulp.task('delSass',function() {
  del(['html/css/*.css']);
});

gulp.task('copyHtml',function() {
  return gulp.src(['assets/**/*.html'])
  .pipe(plumber())
  .pipe(gulp.dest('html/'))
  .pipe(browserSync.stream());
});

gulp.task('copyJs',function() {
  return gulp.src(['assets/js/*.js'])
  .pipe(plumber())
  .pipe(gulp.dest('html/js/'))
  .pipe(browserSync.stream());
});

gulp.task('sass',function() {
  // console.log(sassStyleNum);
  console.log(nodeInclude);
  console.log(inheritClass);
  // console.log(oden);
  return gulp.src(['assets/scss/*.scss'])
  .pipe(plumber())
  .pipe(sass({outputStyle: sassStyleList[sassStyleNum]}))
  .pipe(gulp.dest('html/css/'))
  .pipe(browserSync.stream());
});

gulp.task('default',['delHtml','delJs','delSass','copyHtml','copyJs','sass'], function() {
  console.log('hello world!');
  browserSync.init({
    server: {
      baseDir: 'html'
    }
  });
  gulp.watch(['assets/**/*.html'],['delHtml','copyHtml']);
  gulp.watch(['assets/js/*.js'],['delJs','copyJs']);
  gulp.watch(['assets/scss/*.scss'],['delSass','sass']);
})
