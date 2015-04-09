var gulp = require('gulp');
var oss = require('gulp-oss');

gulp.task('upload_to_oss', function(){
    var options = {
        accessKeyId: '*******',
        secretAccessKey: '*******',
        endpoint: 'http://oss-cn-***.aliyuncs.com',
        apiVersion: '2013-10-15',
        prefix: 'assets/js',
        bucket: 'test'
    };
    return gulp.src(['./js/**/*']).pipe(oss(options));
});
