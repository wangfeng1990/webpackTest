
const path=require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
module.exports={
    entry:{
        entry:'./src/entry.js',
        entry2:'./src/entry2.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: ["style-loader", "css-loader"]
            },{
                test:/\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit:500,
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
            },{
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_modules/
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
            hash: true,  // 问号后面的hash是因为这句话  webpack-dev-server用这个config没有任何问题啊  图片能加载到的  开发的时候不用extractTextPlugin  goodbye
            //是要打包的html模版路径和文件名称。
            template:'./src/index.html'
        })
    ],
    devServer:{
       contentBase:path.resolve(__dirname,'dist'),
       host:'localhost',
       compress:true,
       port:1717
    }
}