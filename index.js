// PLUGIN_NAME: gulp-oss
var path = require('path');
var through2 = require('through2');
var PluginError = require('gulp-util').PluginError;
var colors = require('gulp-util').colors;
var log = require('gulp-util').log;
var ALY = require('aliyun-sdk');
var Moment = require('moment');
var Q = require('q');
var fs = require('fs')
var util = require('util')
var crypto = require('crypto')
var minimatch = require('minimatch')

var uploadedCount = 0;//上传文件数量


function oss(option) {
    option = option || {};
    var oss = new ALY.OSS({
        accessKeyId: option.accessKeyId,
        secretAccessKey: option.secretAccessKey,
        endpoint: option.endpoint,
        apiVersion: option.apiVersion
    });
    // creating a stream through which each file will pass
    var transformFunction = function(file, encoding, callback) {
        var that = this;
        var isIgnore = false;
        var filePath = path.relative(file.base, file.path);
        // do whatever necessary to process the file
        if (file.isNull()) {
            this.push(file);
            return callback();
        }
        option.ignore.forEach(function(item) {
            if (minimatch(filePath, item)) isIgnore = true;
        })
        if (isIgnore) return next();
        var fileKey = option.dir + ((!option.dir || option.dir[option.dir.length - 1]) === '/' ? '' : '/') + (option.versioning ? version + '/' : '') + filePath;

        console.log(fileKey);
        if (file.isBuffer()) {

        }
        if (file.isStream()) {

        }
        // just pipe data next, or just do nothing to process file later in flushFunction
        // never forget callback to indicate that the file has been processed.
        this.push(file);
        callback();
    };
    var flushFunction = function(callback) { // just pipe data next, just callback to indicate that the stream's over
        this.push(something);
        callback();
    }
    return through2(transformFunction, flushFunction);
};

// exporting the plugin
module.exports = oss;
