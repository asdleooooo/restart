## 常见构建工具

源代码通过scss、es6、vue之后源代码无法直接运行，必须通过转换之后才能正常运行

> 构建是做什么?

把源代码转换发布到线上的可执行的JavaScript、CSS、HTML代码

- 代码转换：TypeScript编译JavaScript、SCSS编译成CSS等
- 文件优化：压缩JavaScript、CSS、HTML代码，压缩合并图片等
- 代码分割：提取**多个页面的公共代码**，提取**首屏不需要执行部分的代码让其异步加载**
- 模块合并：在采用模块化的项目里会有很多模块和文件，需要构建功能把模块分类合成一个文件
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器
- 代码校验：在代码被提交到仓库钱需要校验代码是否符合规范，以及单元测试是否通过
- 自动发布：更新完代码后，自动构建初线上发布代码并传输给发布系统

> npm run？

**任务执行者**，scripts字段中每一个属性对应一段Shell脚本，内置，无需安装其他依赖

## 配置入口出口信息

```js
const path = require('path');

module.exports = {
 entry: './main.js',
 output: {
 	filename: 'bundle.js',
   path: path.resolve(__diename, './dist')
  }
}
```

打包之后文件夹会出现一个dist文件夹，文件夹下有一个bundle.js的打包文件

## 使用loader

引入css代码，main.css文件中

```css
#app {
  text-align: center;
}
```

引入main.js中

```js
require('./main.css');
```

 webpack并不支持解析原生CSS文件，要支持非JavaScript类型的文件需要使用webpack的Loader机制

- module的rules属性包含的loader配置需要有两个必填的test属性和use属性，告诉编译器碰到以test定义文件结尾的时候用什么loader来转换

```js
const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize']
      }
    ]
  }
}
```

**minimize**是告诉css-loader要开启CSS压缩

查看依赖版本可以在github上的版本库中的package.json文件中查询

