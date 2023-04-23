# 流程概述

1、初始化参数，从配置文件或者shell语句中读取合并参数，得出最终的参数

2、开始编译：加载所有的插件，执行run方法开始执行编译

3、确定入口

4、从入口出发，调用所有配置的loader对模块进行翻译，再找出该模块依赖的模块，再进行递归本步骤，知道所有入口依赖的文件都经过本步骤的处理

5、完成模块编译，得到了每个模块被翻译后的最终内容以及他们之间的依赖关系

6、输出资源：根据入口和模块之间的依赖关系，组成一个个包含多个模块的Chunk，再把每一个Chunk转换成一个单独文件加入到输出列表，这步时可以修改输出内容最后的机会

7、完成输出，把文件写入

## bundle.js

关于模块之间的调用

```js
(function(moduleList) {
  /*
  1、把moduleList[0],也就是entry的入口文件拿出来执行
  2、entry入口文件中引用了moduleList列表中的模块引用进来执行
  3、如果引用进来了，就用对象保存一下，以免重复引入
  4、判断是否使用该模块，已经使用从缓存中拿，将这一步放到最开始的位置
  */
})([allModuleList])
```

## 0.bundle.js

关于代码分割之后不同的chunk文件

```js
webpackJsonp([0],[对应的模块代码])
```

```js
__webpack_require__: {
  e: '执行函数，将异步的模块代码插入',
  p: 'publicpath路径',
  s: '入口文件的ID',
  m: 'modules也就是moduleList'
}

  
__webpack_require__ = function(moduleId) {
  	// 如果这个模块已经引入了，那么将从缓存里面直接拿
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// 将这个模块加入缓存
 		var module = installedModules[moduleId] = {
      // 模块的ID
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

		// 执行这个模块的函数，也就是执行moduleList第moduleId项的函数，传入当前模块的exports:{}，当前模块，这个函数
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// 这个模块已经加载
 		module.l = true;

 		// 返回模块的输出
 		return module.exports;
}
  
  
/*
在bundle.je中执行这个代码
(function (module, exports, __webpack_require__) {
      // 通过 __webpack_require__.e 去异步加载 show.js 对应的 Chunk
      __webpack_require__.e(0).then(__webpack_require__.bind(null, 1)).then((show) => {
        // 执行 show 函数
        show('Webpack');
      });
    })
*/

// 异步加载对应的chunk
  __webpack_require__.e = function (chunkId) {
    // chunkId = 0
    // 已经安装的chunk的数据，从已经安装的chunk的列表中查找
    var installedChunkData = installedChunks[chunkId];
    // 如果已经安装的chunk列表中有这个chunk就返回一个成功的promise实例，promsie的值为undefined，然后就会执行then方法，本函数执行结束
    if(installedChunkData === 0) {
 			return new Promise(function(resolve) { resolve(); });
 		}
    // 如果installedChunkData不为空也不为0，就返回installedChunkData[2]，也就是说数组中的对象，可能是数字类型，也可能是数组类型，接着往下看
    if(installedChunkData) {
      // 这是个什么玩意
			return installedChunkData[2];
 		}
    
    
    // 如果为空，那么说明chunk没有加载过，加载chunk，生成一个Promsie，让installedChunkData等于installedChunks[chunkId]等于[resolve, reject]
    var promise = new Promise(function (resolve, reject) {
    installedChunkData = installedChunks[chunkId] = [resolve, reject];
    });
    // 这不是上面那个玩意嘛，敲，现在这个installedChunkData = [ resolve, reject, promise ]
    installedChunkData[2] = promise;
    
    // 创建一个script标签
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.timeout = 120000;
    
    // 设置这个标签的路径，后面这些根据你配置的output.chunkFilename的值来定
     script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
    // 异步的响应时间
    var timeout = setTimeout(onScriptComplete, 120000);
    script.onerror = script.onload = onScriptComplete;
    
    // 定时器的回调
    function onScriptComplete() {
      // 防止内存泄露
      script.onerror = script.onload = null;
      clearTimeout(timeout);

      // 去检查 chunkId 对应的 Chunk 是否安装成功，安装成功时才会存在于 installedChunks 中
      var chunk = installedChunks[chunkId];
      if (chunk !== 0) {
        if (chunk) {
          chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
        }
        installedChunks[chunkId] = undefined;
      }
    };
    
    // 移出script标签
    head.appendChild(script);
    
    
    // 返回这个promise
    return promise;
  }

```

