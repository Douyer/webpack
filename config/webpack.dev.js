const path = require('path');
//JS压缩
const uglify = require('uglifyjs-webpack-plugin');
//html打包
const htmlPlugins = require('html-webpack-plugin');
//CSS分离
const extractCssPlugin = require('mini-css-extract-plugin'); 
//实例化CSS分离对象
// const extractCSS = new extractCssPlugin("css/[name].css");
var website = {publicPath: 'http://localhost:8090'};
module.exports = {
    //开发环境
    mode: "development",
    //入口文件设置
    entry:{
        index :'./src/js/index.js'
    },
    //出口文件配置
    output:{
        //打包后的文件路径
        path: path.resolve(__dirname,"../dist"),
        //打包后的文件名称，[name]表示打包之后的文件名仍然使用打包之前的文件名
        filename: '[name].js',
        publicPath: website.publicPath
    },
    //模块
    module:{
        rules:[
            //加载CSS
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    extractCssPlugin.loader,
                    "css-loader"
                ]
                    
                // [
                //     {loader: "style-loader"},
                //     {loader: "css-loader"}
                // ]
            },
            //CSS样式中的图片加载
            {
                test:/\.(png|jpg|gif|jpeg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500,
                        }
                    }
                ]
            }
        ]
    },
    //插件
    plugins:[
        //压缩JS
        new uglify(),
        //html打包
        new htmlPlugins({
            minify:{ //对html进行压缩
                removeAttributeQuotes:true 
            },
            hash: true,   //JS缓存
            template: "./src/index.html"   //将要打包的html文件
        }),
        //css从JS中分离开来
        new extractCssPlugin("css/[name].css")
    ],
    //配置webpack开发服务
    devServer:{
        //起始目录结构设置
        contentBase: path.resolve(__dirname,"../dist"),
        //服务器地址，可以是本地IP地址
        host:'localhost',
        //服务器端压缩是否开启
        compress:true,
        //端口
        port: 8090
    }  
}