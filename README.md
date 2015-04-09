# gulp-oss
Aliyun Oss Client for Gulp

###DEMO
``` node
var gulp = require('gulp');
var oss = require('gulp-oss');
gulp.task('oss', function(){
    var options = {
        accessKeyId: '********',
        secretAccessKey: '*********',
        endpoint: 'http://oss-cn-***.aliyuncs.com',
        apiVersion: '2013-10-15',
        prefix: 'assets/js',
        bucket: 'test'
    };
    //./js/a.js -> <prefix>/a.js
    // ......
    //./js/b/a.js -> <prefix>/b/a.js
    return gulp.src(['./js/**/*']).pipe(oss(options));
});
```
###操作结果

``` bash
cd /path/to/gulpfile.js/
gulp oss
[14:50:59] Using gulpfile ~/path/to/gulpfile.js
[14:50:59] Starting 'oss'...
[14:50:59] Finished 'oss' after *** ms
[14:50:59] OK: assets/a.js
[14:50:59] OK: assets/b/a.js
[14:50:59] ERR: assets/b/c.js NetworkingError
....
```

