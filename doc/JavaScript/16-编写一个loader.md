## loader

loader就像一个翻译官，一般项目通过翻译官翻译，起一个http本地服务就差不多能跑起来了

对于文件的处理，不同的loader作用不同，对于相同的文件，配置多个不同的loader，loader会从后往前执行，后面的loader会把翻译完的结果作为参数传递给前面的loader

相同的等级的loader从后到前执行，如果设置了enforce：pre | narmal | inline | post

感觉loader就像函数式编程一样，单一职责，更加灵活，你可以随着你的需求改造源代码

## loader基础

由于webpack时运行在Node.js之上的，一个Loader其实就是一个Node.js模块，这个模块导出一个函数，参数是处理前的原内容，对于原内容执行处理后，返回处理后的内容

