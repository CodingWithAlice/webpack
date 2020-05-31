
// 第一步：获取到本项目的所有entries对象

var glob = require('glob');
var path = require('path');
const prefix = './src/'; // 所有入口index.js的路径
const devFiles = 'biz/**/index.js';

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, pathname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        pathname = dirname.replace(new RegExp('^' + pathDir), '');
        entries[pathname] = './' + entry;
    }
    return entries;
}
var entries = getEntry(prefix + devFiles, prefix + 'biz/');



// 第二步：获取到输入语句中的路径 --path形式传入
var argv;
var filter;
try {
    argv = JSON.parse(process.env.npm_config_argv).original;
    argv.forEach(function(item, index) {
        if(item.indexOf('--') === 0) {
            filter = item.replace('--', '');
        }
    });
}	catch(ex) {
    argv = process.argv;
}
// 第三步：如果输入了路径，那么就用正则匹配获取入口文件数组中想要到路径
if (filter) {
    var regStr = toString.call(filter) === '[object Array]' ?  filter.join('|') : filter;
    var regExp = new RegExp(regStr);
    for (var item in entries) {
        if (entries.hasOwnProperty(item) && !regExp.test(item)) {
            delete entries[item];
        }
    }
}


var fs = require('fs');
const env = process.env.NODE_ENV || 'development';
// 第四步：输出需要启动的入口路径
exports.entries = entries;