const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: {
        demo: "./src/biz/demo/index.js",
        test: "./src/biz/test/index.js",
    },
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
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader','stylus-loader']
            },
            {
                test: /\.js/,
                use: [
                    path.resolve(__dirname, '../loaders/replaceLoader.js'),
                ]
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(['dist', 'build']),
    ],
};
