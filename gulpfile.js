var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bowerFiles = require('main-bower-files'),
    plugins = require('gulp-load-plugins')({
      rename: {
        'gulp-develop-server': 'server'
      }
    });

const path = '',
    buildPath = 'build/';

gulp.task('default', ['build-less']);

gulp.task('build-less', function(){
  return gulp.src(path + 'less/*.less')
      .pipe(plugins.less())
      .pipe(gulp.dest(path + 'css/'))
      .pipe(plugins.cssmin())
      .pipe(plugins.rename({ extname: '.min.css' }))
      .pipe(gulp.dest(path + 'css/')).on('error', gutil.log);
});

gulp.task('inject', function () {
  return gulp.src(path + 'index.html')
      .pipe(plugins.inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
      .pipe(plugins.inject(gulp.src([path + 'js/**/*.js', path + 'css/**/*.min.css'], {read: true})))
      .pipe(gulp.dest(''));
});

// run server
gulp.task( 'server:start', function() {
  plugins.server.listen( { path: path + 'index.html' } );
});

// restart server if app.js changed
gulp.task( 'server:restart', function() {
  plugins.gulp.watch( [ './app.js' ], plugins.server.restart );
});