## 打包的范围

### 缩小文件搜素范围

在module中配置命中规则：通过test、include、exclude三个配置来设置，例如只对src中的文件进行babel-loader的处理

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
 +       include: path.resolve(__dirname, 'src')
      }
    ]
  }
}
```

对于文件的缓存操作，默认使用webpack内置的缓存机制

在module配置中有一个noParse配置项可以让webpack忽略对部分没有采用模块化的文件递归解析处理

关于**reslove.modules**查找第三方模块的目录，如果不设置就会现在本地目录下查找node_modules文件下查找，如果找不到就会去../node_modules下查找，如果没有就会继续去../../node_modules下查找，减少查找的路径

```js
module.exports = {
  resolve: {
+    modules: [path.resolve(__dirname, '/node_modules')]
 }
}
```

resolve.mainFields配置项，用于配置第三方模块使用哪个入口文件

```js
module.exports = {
  resolve: {
+    mainFields: ['main'],
  }
}
```

**注意：使用这个方法进行优化的时候，需要考虑所运行的依赖的第三方模块的入口文件描述字段**

resolve.alias配置，配置项通过别名，在引入的时候自动查找文件下的最小的文件路径

resolve.extensions配置，用来查找路径的后缀，建议不要太长

```js
module.exports = {
  resolve: {
    extensions: ['.js']
  }
}
```

对于没有采用模块化的第三方库，采用module.noParse配置不被解析的第三方库的文件

## 动态链库

让大量服用模块的动态连库只要编译一次，在构建过程中被动态链库包含的模块不会重新编译，webpack已经内置了对动态链接库的支持，需要通过两个内置的插件接入

- DllPlugin 插件：用于打包出一个个单独的动态链接库文件。
- DllReferencePlugin 插件：用于在主要配置文件中去引入



将常用的一些第三方模块包，打包成一个dll库，然后在webpack中引用

## 使用HappyPack

将任务分发给子进程完成后传给主线程

## JS代码压缩【生产模式】

webpack-parallel-uglify-plugin：多进程处理压缩JS代码

## 自动刷新

对于网页开发来说，我们想要看到修改后的效果就需要重新运行代码，借助自动化手段，可以将这个重复的操作交给代码帮我们完成

监听也就是获取当前文件最后编辑的时间，如果前后两次时间不一致，就说明已经更新了

## 热模替换

在不刷新整个页面的情况下，替换掉发生修改的代码，DevServer默认不会开启热模替换模式，需要携带参数`--hot`，也可以使用插件hot-module-replace-plugin，也可以在devServer配置中将`hot: true`

现在当你看见你的JS文件被修改了，但是触发了自动刷新，没有触发热更新

虽然开启了热模替换，但是并不会进行替换，并不是开箱即用的一个功能，需要在main.js中配置

```js
if(module.hot) {
  module.hot.accept(模块)
}


```

vue-loader已经实现了对热模块替换的拦截处理，不需要自己手动写

## 区分环境

通过definePlugin定义环境变量

## CSS优化

css压缩：css-minimizer-webpack-plugin

## CDN加载

通过web-plugin进行加载引入

## tree shaking

就是把没有用过的代码去掉，关掉babel对于es6的处理

## 抽离公共代码

一个由多个页面组成的大型网站

## 按需加载

babel-loader不认识import()这样的异步加载的语法，需要相应的plugin，babel-plugin-syntax-dynamic-import然后使用了vue-router或者react-router的单页面应用中的异步组件就会被打包成不同的chunk，然后再跳转相应路由的时候被加载进来

## prepack【不太完善】

[prepack-webpack-plugin](https://github.com/gajus/prepack-webpack-plugin)

在保持运行结果一致的情况下，改变源代码的运行逻辑，编译代码时，提前将计算结果放到编辑后的代码中

##  开启Scope Hoisting

作用域提升，Scope Hoisting 的实现原理其实很简单：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。 因此只有那些被引用了一次的模块才能被合并。

ModuleConcatenationPlugin

## oneOf

一个文件会遍历所有的rules的所有项，一个项默认我们只会让它处理一种文件，所以要使用oneOf的一个操作

将所有rule写到一个oneOf里面，然后放在{}，作为rule