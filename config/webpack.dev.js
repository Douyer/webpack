//webpack4.29.6
const path = require('path');
//JS压缩
const uglify = require('uglifyjs-webpack-plugin');
//html打包
const htmlPlugins = require('html-webpack-plugin');
//CSS分离  webpack 4.0版本必须使用min-css-extract-plugin插件，用extract-text-plugin插件来打包会报错
const extractCssPlugin = require('mini-css-extract-plugin'); 
//定义对象来处理静态文件路径
var website = {publicPath: '/'};
module.exports = {
    //开发环境
    mode: "development",
    //入口文件设置
    entry:{
        index :'./src/js/index.js'
    },
    //出口文件配置
    output:{
        //打包后的文件根目录路径
        path: path.resolve(__dirname,"../dist"),
        //打包后的JS文件路径，[name]表示打包之后的文件名仍然使用打包之前的文件名
        //JS打包后的位置：dist目录下的js文件夹下面的name.js
        filename: './js/[name].js',
        //处理静态文件路径,以dist作为根目录，以绝对路径来处理
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
                            //小于500B的文件会打包成base64的格式写入JS中
                            limit: 500,
                            //img图片打包之后的路径：dist/images/
                            outputPath: './images/'
                        }
                    }
                ]
            },
            //html中图片加载
            {
                test: /\.(html|htm)$/i,
                use: ["html-withimg-loader"]
            }
        ]
    },
    //插件
    plugins:[
        //压缩JS
        new uglify(),
        //html打包
        new htmlPlugins({
            hash: true,   //JS缓存
            template: "./src/index.html"   //将要打包的html文件
        }),
        //css从JS中分离开来
        new extractCssPlugin(
            {
                filename:"./css/[name].css"
            }
        )
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