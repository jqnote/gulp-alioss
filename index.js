// PLUGIN_NAME: gulp-oss
const PLUGIN_NAME = 'gulp-oss';

var path = require('path');
var through2 = require('through2');
var PluginError = require('gulp-util').PluginError;
var colors = require('gulp-util').colors;
var log = require('gulp-util').log;
var ALY = require('aliyun-sdk');
var Moment = require('moment');

function oss(option) {
    if (!option) {
        throw new PluginError(PLUGIN_NAME, 'Missing option!');
    }
    if(!option.bucket){
        throw new PluginError(PLUGIN_NAME, 'Missing option.bucket!');
    }

    var ossClient = new ALY.OSS({
        accessKeyId: option.accessKeyId,
        secretAccessKey: option.secretAccessKey,
        endpoint: option.endpoint,
        apiVersion: option.apiVersion
    });

    var version = Moment().format('YYMMDDHHmm');

    return through2.obj(function (file, enc, cb) {
        if(file.isDirectory()) return cb();
        if(file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        var getFileKey = function(){
            return option.prefix
                + ((!option.prefix || option.prefix[option.prefix.length - 1]) === '/' ? '' : '/')
                + (option.versioning ? version + '/' : '')
                + path.relative(file.base, file.path);
        };
        var uploadFile = function(fileKey){
            ossClient.putObject({
                    Bucket: option.bucket,
                    Key: fileKey,
                    Body: file.contents,
                    AccessControlAllowOrigin: '',
                    ContentType: 'text/plain',
                    CacheControl: 'no-cache',
                    ContentDisposition: '',
                    ContentEncoding: 'utf-8',
                    ServerSideEncryption: 'AES256',
                    Expires: Moment().unix()
                }, function (err, data) {
                    if (err) {
                        log('ERR:', colors.red(fileKey + "\t" + err.code));
                    }else{
                        log('OK:', colors.green(fileKey));
                    }
                }
            );
        };
        uploadFile(getFileKey());
        this.push(file);
        return cb();
    });
}

module.exports = oss;
