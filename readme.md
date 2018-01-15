1、webpack的loader加载顺序是从右往左，从下往上

2、css-loader 是处理css文件中的url()等  style-loader 将css插入到页面的style标签

3、loader的三种写法

+ 第一种写法：直接用use。

    ```
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }
    ```
 
+ 第二种写法：把use换成loader。

    ```
    module:{
        rules:[
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            }
        ]
    }
    ```

+ 第三种写法：用use+loader的写法。

    ```
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
    ```

4、webpack命令打包生成文件，webpack-dev-server命令在内存中生成文件，不生成真实文件

5、使用'html-webpack-plugin'插件打包html文件，在html文件中不需要引入js文件，webpack会自动为我们引入入口的js文件。

6、关于图片

```
    {
        test:/\.(png|jpg|gif)/,
        use: [{
            loader: 'url-loader',
            options: {
                limit:500000,
                name: 'images/[name].[ext]'
            }
        }]
    }
```

    图片打包： test:/\.(png|jpg|gif)/是匹配图片文件后缀名称。
              
    use：是指定使用的loader和loader的配置参数。
              
    limit：是把小于500000B的文件打成Base64的格式，写入JS。（大于这个数的输出文件直接输出）
              
    name: 设置直接输出的图片的路径和后缀名

    如果需要将css文件独立出来，则需要使用extract-text-webpack-plugin插件。使用方式：
    1、设置Plugins   new extractTextPlugin("/css/index.css")
    2、
```
    module:{
        rules: [
            {
              test: /\.css$/,
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },{
               test:/\.(png|jpg|gif)/ ,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:500000``
                   }
               }]
            }
          ]
    }
```

此时路径存在问题，解决方式：
    1、头部声明
        var website ={
            publicPath:"http://192.168.1.108:1717/"
        }
    2、output选项中引用这个对象的publicPath属性
        //出口文件的配置项
        output:{
            //输出的路径，用了Node语法
            path:path.resolve(__dirname,'dist'),
            //输出的文件名称
            filename:'[name].js',
            publicPath:website.publicPath
        }

使用插件"html-withimg-loader"可以解决hmtl文件中引入<img>标签的问题

7、npm install --production   安装生产环境依赖包

8、设置生产环境和开发环境
```
 "scripts": {
    "server": "webpack-dev-server --open",
    "dev":"set type=dev&webapck",
    "build": "set type=build&webpack"
  }



//webpack中的代码  
if(process.env.type== "build"){
    var website={
        publicPath:"http://192.168.0.104:1717/"
    }
}else{
    var website={
        publicPath:"http://cdn.jspang.com/"
    }
}
```

9、引入第三方插件
方式一： 	

import $ from 'jquery';

方式二：

plugins:[
    new webpack.ProvidePlugin({
        $:"jquery"
    })
]

10、抽离第三方插件
```
// 修改入口
entry:{
        entry:'./src/entry.js',
        jquery:'jquery'
}

// 修改配置
new webpack.optimize.CommonsChunkPlugin({
    //name对应入口文件中的名字，我们起的是jQuery
    name:'jquery',
    //把文件打包到哪里，是一个路径
    filename:"assets/js/jquery.min.js",
    //最小打包的文件模块数，这里直接写2就好
    minChunks:2
})
```

多个第三方插件的情况

```
entry:{
    entry:'./src/entry.js',
    jquery:'jquery',
    vue:'vue'
}

new webpack.optimize.CommonsChunkPlugin({
    //name对应入口文件中的名字，我们起的是jQuery
    name:['jquery','vue'],
    //把文件打包到哪里，是一个路径
    filename:"assets/js/[name].js",
    //最小打包的文件模块数，这里直接写2就好
    minChunks:2
})
```

11、静态资源集中输出

```
npm install --save-dev copy-webpack-plugin

const copyWebpackPlugin= require("copy-webpack-plugin");

new copyWebpackPlugin([{
    from:__dirname+'/src/public',
    to:'./public'
}])

```

12、Json配置文件使用 webpack1或者webpack2版本中，你是需要加载一个json-loader的loader进来的，但是在webpack3.x版本中，你不再需要另外引入了

```
	
<div id="json"></div>

var json =require('../config.json');
document.getElementById("json").innerHTML= json.name;
```

13、热更新  new webpack.HotModuleReplacementPlugin()

这里说的热加更新和我们平时写程序的热加载不是一回事，比如说我们Vue或者React中的热更新，并不是刷新整个页面，而是一个局部更新，而这里的更新是重新刷新了页面。