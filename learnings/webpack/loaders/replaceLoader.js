// 实现功能：遇到 测试 替换为“我的loader111”
module.exports = function(source) {
    return source.replace('测试','我的loader111');
}