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

## 使用Loader

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

## Plugin

是用来**扩展Webpack功能**的，通过**在构建流程上注入钩子**实现

下面使用[这可以通过使用mini-css-extract-plugin插件，将注入到JS代码中的css提取出到一个独立的文件中

```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: 'main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}
```

## DevServer

webpack可以监听文件变化并自动刷新网页，做到实时预览；支持Source Map以方便调试

而DevServer是官方提供的开发工具，提供HTTP服务而不是使用本地文件预览，

是一个基于node开发的服务器，在web应用程序中，同茶馆会将一些公共资源放在public目录下，以便页面引用这些资源

网页通过发送 HTTP 请求来向 DevServer 请求资源，例如 HTML、CSS、JavaScript 文件等。DevServer 接收到请求后，会根据请求 URL 找到对应的资源，并将其返回给网页。如果请求的资源不存在，DevServer 会返回 404 状态码。如果请求的资源需要进行编译或处理（例如通过 Webpack 打包），DevServer 会在返回资源之前先对其进行处理

在开发过程中，DevServer 还提供了一些其他的通信机制，例如 Websocket 和 HMR（热模块替换）等。通过 Websocket，DevServer 可以将编译过程中的消息实时地发送给网页，以便网页可以显示编译进度或错误信息。通过 HMR，DevServer 可以在不刷新页面的情况下，替换网页中的某个模块或组件，从而提高开发效率

```js
webpack-dev-server --hot --devtool source-map
```

## 核心概念

- entry：入口，webpack执行构建的第一步要从entry开始
- module：模块，在webpack里一切都是模块，一个模块对应着一个文件，从配置的entry开始递归找所有的依赖的模块
- chunk：代码块，一个chunk由多个模块组合而成，用于代码合并于分割
- loader：模块转换器，用于把模块原内容按照需求转化为新内容
- plugin：扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情
- output：输出结果，在webpack经过一系列处理并得到最终想要的代码后输出结果

## 配置

### entry

是配置模块的入口，可以抽象成输入，webpack执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块，必填项

#### context

在寻找相对路径的文件的时候会以context为根目录，context默认执行启动时，所在的当前工作目录，如果要改变context的默认配置

```js
const path = require('path');

module.exports = {
  // context必须是一个绝对路径
  context: path.resolve(__dirname, 'app')；
}
```

#### entry可以接受的三种类型

| 类型   | 例子                                                         | 含义                                  |
| ------ | ------------------------------------------------------------ | ------------------------------------- |
| string | './app/entry'                                                | 入口模块的文件路径，可以是相对路径    |
| array  | ['./app/entry1', './app/entry2']                             | 入口模块路径，可以是相对路径          |
| object | {a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']} | 配置多个入口，每一个入口生成一个Chunk |

#### Chunk名称

webpack会给每一个生成的Chunk取一个名称，Chunk的名称和Entry的配置有关

如果**entry是string或者array**，则会生成一个Chunk，这时Chunk的名称是**main**;

如果**entry是一个object**，可能就会生成出现多个Chunk，**这是Chunk的名称是object键值对里键的名称**

#### 配置动态entry

将entry写成函数的方式

```js
// 同步函数
entry: () => {
  return {
    a: './pages/a',
    b: './pages/b',
  }
};

// 异步函数
entry: () => {
  return new Promise(resolve) => {
    reslove({
      a: './pages/a',
      b: './pages/b'
    });
  };
};
```

### output

配置如何最终输出想要的代码，output是一个object，里面包含一系列配置项

#### filename

output.filename配置输出文件的名称是string类型，如果只有一个输出文件，则可以写成静态不变的

```js
filename: 'bundle.js'
```

但是在有多个Chunk要输出时，就需要借助模板和变量，webpack会为每一个Chunk取一个名称，根据Chunk的名称来区分输入的文件名：

```js
filename: '[name].js'
```

内置的变量

| 变量名    | 含义                     |
| --------- | ------------------------ |
| id        | Chunk的唯一标识，从0开始 |
| name      | Chunk的名称              |
| hash      | Chunk的唯一标识的Hash值  |
| chunkhash | Chunk内容的Hash值        |

#### chunkFilename

output.chunkFilename配置无入口的Chunk在输出时的文件名

#### path

output.path配置输出文件存放在本地的目录，必须时string类型的绝对路径，通常使用node.js的path模块去获取绝对路径:

```js
path: path.resolve(__dirname, 'dist_[hash]')
```

#### publicPath

在项目中有些资源需要异步引入的时候

```js
filename: '[name]_[chunkhash:8].js'
publicPath: 'http://cdn.example.com/assets/'
```

发布到线上就会在HTML中加入

```html
<script src='https://cdn.example.com/assets/a_12345678.js'></script>
```

### module

配置如何处理这些模块

#### 配置loader

rules配置模块的读取和解析规则，通常用来配置loader，类型是一个数组，数组里的每一个项都描述了如何去处理部分文件，配置一项rule时大致通过一下方式：

1、条件匹配：通过test、include、exclude三个配置项类命中Loader要应用规则的文件

2、应用规则：对选中后的文件通过use配置项来应用Loader，可以应用一个Loader或者从后往前舒徐应用一组Loader，同时还可以分别给Loader传入参数

通过include或者exclude来限制命中的文件夹

通过noParse来配置不解析的文件名

通过parser来配置，是否解析这些语法

### resolve

webpack启动后会从配置入口模块触发找出所有依赖的模块，配置webpack如何寻找模块对应文件

#### alias

配置项通过别名把原导入路径映射成一个新的导入路径，可以使用$缩小命中的范围

```js
resolve: {
  alias: {
    components: './src/components/'
  }
}
```

#### mainFields

某些第三方模块会对不同的环境提供不同的代码，webpack会根据mainFields的配置去决定优先采用那份代码

```js
mainFields: ['brower', 'main']
```

#### extensions

在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在

```js
extensions: ['.js', '.json']
```

#### modules

配置webpack去哪里目录下寻找第三方模块，默认只会去node_modules下寻找

```js
modules: ['./src/components', 'node_modules']
```

#### descriptionFiles

配置描述第三方模块的文件名称

```js
descriptionFiles: ['package.json']
```

#### enforceExtension

如果配置为true所有导入语句都必须带文件后缀

### plugins

plugin用于扩展webpack的功能，各种各样的plugin几乎让webpack可以做任何构建相关的事情

plugin接受一个数组，数组里每一项都是一个要使用的plugin的实例

### devServer

它提供的一些配置可以**在配置文件中进行配置**，还可以通过**命令参数的方式进行配置**

#### hot

devServer默认行为在发现源代码被更新后会通过刷新整个页面来做到实时预览，开启模块热替换功能后将在不刷新整个页面的情况下通过用新模块替换老模块来实现实时预览

#### inline

实时预览功能依赖一个注入到页面里的代理客户端去接受来自DevServer的命令和负责刷新网页的工作，要实现实时预览，要通过inline配置

#### historyApiFallback

用于方便的使用HTML5 History API的单页面应用，应用瑶求服务器在针对任何命中路由时都返回对应的HTML文件

```js
historyApiFallBack: true
```

#### contentBase

配置DevServer HTTP服务器的文件根目录，默认情况下为当前执行目录

```js
devServer: {
  contentBase: path.resolve(__dirname, 'public')
}
```

#### headers

配置项可以在HTTP响应中注入一些HTTP响应头

```js
devServer: {
  headers: {
    
  }
}
```

#### host

配置DevServer服务监听的地址，默认值127.0.0.1

#### port

默认使用的端口号，默认8080

#### allowedHosts

配置一个域名白名单列表，只有http请求在列表菜正常返回页面

#### disableHostCheck

配置是否关闭用于DNS冲绑定滚动HTTP请求的HOST检查

#### https

DevServer默认使用HTTP协议服务，它也能通过HTTPS协议服务。有些情况你必须使用HTTPS

#### clientLogLevel

配置在客户端的日志等级

#### compress

配置是否开启gzip压缩

#### open

第一次构建完，自动打开网页