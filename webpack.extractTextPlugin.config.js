
const path=require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
var website ={
    publicPath:"http://10.1.200.59:1717/"
}
module.exports={
    entry:{
        entry:'./src/entry.js',
        entry2:'./src/entry2.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicPath
    },
    module:{
        rules:[
           {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader'
                    ]
                })
            },{
                test:/\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit:5000000,
                        name: 'images/[name].[ext]'
                    }
                }]
            },{
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                }]
            },{
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins:[
        new uglify(),
        new htmlPlugin({
            //minify：是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
            minify:{
                removeAttributeQuotes: true
            },
            //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            hash: true,
            //是要打包的html模版路径和文件名称。
            template:'./src/index.html'
        }),
        new extractTextPlugin("/css/index.css")
    ],
    devServer:{
       contentBase:path.resolve(__dirname,'dist'),
       host:'10.1.200.59',
       compress:true,
       port:1717
    }
}