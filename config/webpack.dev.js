


const path = require('path');
const htmlPlugins = require('html-webpack-plugin');
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
        filename: '[name].js'
    },
    //模块
    module:{
        rules:[
            //加载CSS
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                   
                ]
    
            }
        ]
    },
    //插件
    plugins:[
        new htmlPlugins({
            minify:{ //对html进行压缩
                removeAttributeQuotes:true 
            },
            hash: true,   //JS缓存
            template: "./src/index.html"   //将要打包的html文件
        })
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