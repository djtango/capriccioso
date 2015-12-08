var gulp              = require('gulp');
var protractor        = require('gulp-protractor').protractor;
var ecstatic          = require('ecstatic');
var http              = require('http');
var enableDestroy     = require('server-destroy');
var karmaServer       = require('karma').Server;

(function karmaUnitTests() {
  gulp.task('karma', function (done) {
    new karmaServer({
      configFile: __dirname + '/test/karma.conf.js',
      singleRun: true
    }, done).start();
  });
})();

(function e2eTests() {
  var server;
  gulp.task('server', function(){
    var port = 8080;
    server = http.createServer(
      ecstatic({ root: 'public/.' })
    ).listen(port);
    enableDestroy(server);
    console.log('Server is live on ' + port);
  });

  gulp.task('e2e', ['server'], function(cb) {
    gulp.src(["./public/js/token.js", "./test/e2e/*.js"])
      .pipe(protractor({
        configFile: "test/e2e/conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
      }))
      .on('error', function(e) { throw e })
      .on('close', function() { server.destroy })
  });
})();
