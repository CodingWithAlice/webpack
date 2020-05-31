const path      = require('path');
const template  = require('../helpers/template/index');

const resolve       = (src) => path.resolve(__dirname, src);
const getTpl        = (src) => template(resolve(`../views/${src}`));
const createTpl     = (ctx, src, options) => getTpl(src)(Object.assign({}, ctx.state || {}, options));
const routerFactory = (path, callback) => ({path, callback});

const routers = [
    // routerFactory('/home', async (ctx, next) => {
    //     await next();
    //     ctx.body = createTpl(ctx, 'home/index.html', {name: 'wrold'});
    // }),
    // routerFactory('/login', async (ctx, next) => {
    //     await next();
    //     ctx.body = '登录';
    // }),
    routerFactory('/demo', async (ctx, next) => {
        await next();
        ctx.body = createTpl(ctx, 'demo/index.html', {title: 'demo'});
    }),
];

module.exports = routers;
