const fs = require('fs');
const path = require('path');
const vm = require('vm');
const manifest = require('../../../manifest.json');
const config = require('../../../config/index');

// 模板缓存
const templateCache = {};

/**
 * 模板对象上下文
 * vm api link: "https://nodejs.cn/api/vm.html#vm_vm_createcontext_sandbox_options"
 * @returns {object}
 */
const templateContext = vm.createContext({
    include: function (name, data = {}) {
        const src = path.resolve(__dirname, '../../views/', name);
        const template = templateCache[name] || createTemplate(src);
        debugger;
        return template(data);
    },
    vueJs: function(name) {
        const staticPath = manifest[`${name}.js`];
        if (config.isDev) {
            return `http://${config.devStaticHost}:${config.devStaticPort}/${name}.js`;
        }
        return staticPath;
    },
});

/**
 * 创建模板
 * @param {string} templatePath 模板路径
 * @returns {string}
 */
const createTemplate  = (templatePath) => {
    templateCache[templatePath] = vm.runInContext(
        `(function (data) {
            with (data) {
                return \`${fs.readFileSync(templatePath, 'utf-8')}\`
            }
        })`,
        templateContext,
    );

    return templateCache[templatePath];
}

module.exports = createTemplate;
