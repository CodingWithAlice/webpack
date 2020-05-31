const path = require('path');
const EndWebpackPlugin = require('./EndWebpackPlugin');
const orderName = process.env;
// 第五步：启动指定的单个页面
let { entries } = require('./get_entry');
module.exports = {
    mode: 'development',
    entry: entries, // 这里只启动第一个监听的页面，
    // 如果有多个的话，需要在外层把entries数组遍历循环，为每一个数组项都生成一个webpack配置对象·
    devServer: {
        contentBase: './', // 定义在哪个文件下启动HTTP服务器
        open: true, // 在webpack打包后自动打开浏览器页面
        inline: true,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../assets/static'),
    },
    resolveLoader:{
        modules: ['node_modules','./loaders'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader','stylus-loader']
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    // path.resolve(__dirname, '../loaders/replaceLoader.js'),
                    'replaceLoader.js'
                ]
            }
        ]
    },
    plugins: [
        new EndWebpackPlugin(() => {
        },(err) => {
            console.err(err);
        })
    ],
    devServer: {
            contentBase: './', // 相对于publicPath
            openPage: `../app/views/${orderName}/index.html`,
            // host: '0.0.0.0',
            // port: 8000,
            inline: true, // 实时刷新
            hot: true, // 开启热更新
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            // },
            // disableHostCheck: true,
            // noInfo: true,
    }
};
