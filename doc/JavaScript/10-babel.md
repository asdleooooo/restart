## Babel

是一个JavaScript编译器，用于ECMAScript 2015+版本的代码转换为向后兼容的JavaScript语法

- 语法转换
- 通过Polyfill的方式在目标环境中添加缺失的特性
- JS源码转换

### Babel的使用

1、babel/cli

是babel提供的内建命令行工具

2、@babel/core

@babel/cli在执行的时候会依赖@babel/core提供的生成AST相关方法

### babel的插件和预设

插件是**用来定义如何转换你的代码**，插件的执行顺序是从左到右，插件在预设前执行

预设**就是一堆插件的组合**，从而达到某种转译的能力，从右往左执行的

