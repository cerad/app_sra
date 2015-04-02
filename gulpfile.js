var 
  gulp     = require('gulp'),
  concat   = require('gulp-concat')
;
var scriptFiles = [ 'ang/app.js' ];
var scriptDest  = 'web_app/js';
var scriptVendorFiles = 
[
  'bower_components/angular/angular.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/ngstorage/ngstorage.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap.min.js',
  'bower_components/ngstorage/ngstorage.min.js'
];

var watchTask = function() 
{
  buildTask();
  
  gulp.watch(scriptFiles,['scripts' ]);
};
gulp.task('watch',watchTask);

var buildTask = function()
{
  scriptsTask();
};
gulp.task('build',buildTask);

var scriptsTask = function() 
{/*
  gulp.src(scriptFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('web/js'));*/
    
  gulp.src(scriptVendorFiles)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(scriptDest));
    
  // Map files to keep chrome happy
  var scriptVendorMapFiles = [];
  scriptVendorFiles.forEach(function(jsFile)
  {
    scriptVendorMapFiles.push(jsFile + '.map');
  });
  gulp.src(scriptVendorMapFiles)
    .pipe(gulp.dest(scriptDest));
};
gulp.task('scripts', scriptsTask);