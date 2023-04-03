## Promise

> Promise是什么

**Promise**是一种**异步编程的解决方案** ,在语法上Promise**是一个构造函数**,通过new操作符调用,语义是**承诺**,通过new Promise()**实例化一个promise对象**,**开启**一个**异步任务**,承诺过一段时间会**给**你一个**结果**.是一种对于回调函数的管理.

**实例化出来的promise对象**有三种**状态**:**pending**(等待态) | **fulfiled**(成功态) | **rejected**(失败态),状态只能**改变一次**,一旦改变就不会再变.

> 用Promise解决什么问题

一般情况下,我们开启一个一个异步任务,没什么问题.当我们需要在一个异步任务成功的时候开启另一个异步任务,如果这样的情况一直持续,就会给变成带来麻烦.如果是下面这种情况,如果出现了错误,问题的定位,或者没有报错,但是出了问题,或者用了第三方的一个api,然后给传入一个回调,然后那个api执行你这个回调一次,多次,或者不执行或者没有给你传递参数呢.当你遇到这些问题的时候就会很难受.

```js
setTimeout(() => {
  console.log('做一些前置工作');
  setTimeout(() => {
    console.log('移动左边的图片节点到右边');
    setTimeout(() => {
      console.log('移动右边的图节点消失');
      setTimeout(() => {
        throw(new Error('出错了'));
        setTimeout(() => {
          console.log('结尾工作');
        })
      })
    })
  })
})
```

上面的代码还有一个问题,就是当第一个异步执行成功后要执行的代码,我们要提前指定

```js
function callBack() {
  setTimeout(() => {
    console.log('移动左边的图片节点到右边');
    setTimeout(() => {
      console.log('移动右边的图节点消失');
      setTimeout(() => {
        throw(new Error('出错了'));
        setTimeout(() => {
          console.log('结尾工作');
        })
      })
    })
  })
}
```

要提前指定这部分的回调的代码,传入**第一个异步的回调**里面**包含**了**第二个异步任务第二个异步任务的回调和第三个异步任务......**,而不是第一个异步任务只有第一个异步任务的回调,第一个异步任务结束之后,开启第二个异步任务,第二个异步任务只包含第二个异步任务的回调,如果是纯回调的形式,会让异步的代码变得模糊,不清晰

> Promise怎么避免上面的那些问题的呢

首先看一下Promise怎么开启一个异步任务

```js
new Promise(
// 执行器函数,在new 创建promise实例的时候,就会被调用
  (resolve, reject) => {
    setTimeout(() => {
      try{
        // 回调执行成功
        resolve('成功了');
      }catch(err){
        // 回调执行失败
        reject('失败了');
      }
    })
  }
)
```

Promise构造函数接收一个执行器函数,在这个执行器函数中开启一个异步任务

**对于错误或者异常**

如果出现异常或者错误的时候,在我们异步任务失败或者异常的时候,我们会获得一个失败态(rejected)的promise实例对象,这个对象里有失败的信息,当我们没有设置捕获异常的时候,当JavaScript执行出现异常错误,也会让promise实例的状态改变为失败态(rejected),这样就避免了异常难以捕捉的情况

**调用一次或者多次**

promise实例对象只能改变一次,并且不能被修改,这种改变是不可逆，状态和值只能改变一次

**没有调用回调的情况**

promise实例对象状态会是等待态(pending),我们可以清楚的知道异步任务的状态

**如何让一个异步任务只包含当前异步任务的回调**

promise实例构造开启一个异步任务,传入当前异步任务的回调,当第一个promise对象决议之后,通过promise.then()开启第二个异步任务,第二个任务执行之后可以通过Promise.resolve() || Promise.reject()作为返回值,进而开启下一个异步任务。

就像《你不知道的JavaScript》中说的:Promise这种模式通过可信任的语义把回调作为参数传递，使得这种行为更可靠更合理。通过把回调的控制反转反转回来，我们把控制权放在了一个可信任的系统（Promise）中，这种系统的设计目的就是为了使异步编码更清晰。

> 实现一个Promise

为了更好的理解Promise做了什么，试着自己实现一下Promise构造函数

**一个promise对象有什么**

- state属性：pending(等待态) | fulfilled(成功态) | rejected(失败态)
- value属性：最终保存在promise实例对象中的值，成功的value或者失败的reason
- then方法：实现promise的链式调用，让开启异步更加的清晰，接收两个函数参数，成功的回调和失败的回调，回调中获取成功的value和失败的reason，回调函数的返回值是一个promise实例
- catch方法：实现对于失败的promise做捕获处理，从传入函数参数，回调函数中接收失败的原因

> **准备工作**

```js
class MyPromise {
  // 实例属性
  constructor(executor) {
    // 判断传入
    if(typeof executor !== 'function') throw new TypeError('Executor must be a function');
    this.status = 'pending';
    this.value = null;
    // 用于存放pending状态时候，then方法中的回调
    this.callbacks = [];
		
    
    let resolve = function(value) {
      if(this.status !== 'pending') return
      this.value = value;
      this.status = 'fulfilled';
    }.bind(this)

    let reject = function(value) {
      if (this.status !== 'pending') return
      this.value = value;
      this.status = 'rejected';
    }.bind(this);

    // 当开启一个异步任务报错返回一个失败的promise
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 原型


  // 构造函数静态属性
}
```

> **then方法都做了什么**

> 返回值

- 返回值类型的时候，返回一个成功的Promise，值是reason的返回值

- 报错的时候返回一个失败的Promise，值为报错

- 返回值为Promise的时候，返回这个Promise

> 返回值的来源

- 调用then方法，传入的成功或者失败的回调函数的返回值，步骤如上返回值的描述

>  成功的回调和失败的回调在什么时候执行

**promise状态未改变**：

- 等待Promise实例状态改变的时候，也就是状态改变，会调用resolve或者reject回调函数，这个时候调用then函数中的成功的回调或者失败的回调，要将这些回调存放在实例对象身上，同时回调要注意this的指向

**promise状态改变**：

- 直接调用，如果状态为成功调用成功的回调，状态为失败，调用失败的回调

> **then方法**

```js

    // 当开启一个异步任务报错返回一个失败的promise
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }


  // 原型
  then(onFulfilled, onRejected) {
    // 这里的self是开启的promise
    const self = this;
    return new MyPromise(
      (resolve, reject) => {
        switch (self.status) {
          case 'pending':
            // 这里的this是then的返回值
            // 将当前的成功或者失败或者失败的回调,保存在实例对象上，等待异步调用resolve或者reject的时候执行回调
            self.callbacks.push({ onFulfilled, onRejected, self, resolve, reject, that: this});
            break;
          case 'fulfilled':
            setTimeout(() => { self.handleCallbacks(self, onFulfilled, resolve, reject, this) },0)
            break;
          case 'rejected':
            setTimeout(() => { self.handleCallbacks(self, onRejected, resolve, reject, this) },0);
            break;
        }
      }
    )
  }

  handleCallbacks(thisArg, callback, resolve, reject, that) {
    try {
      // 执行callback，获取返回值，判断类型，调用resolve或者reject
      let result = callback(thisArg.value);
      if(result instanceof MyPromise) {
        result.then(
          value => {
            resolve.call(that, value);
          },
          reason => {
            reject.call(that, reason);
          }
        );
      }else {
        resolve.call(that, result);
      }
    } catch (error) {
      reject.call(that, error);
    }
  }

  // 构造函数静态属性
}
    // 当开启一个异步任务报错返回一个失败的promise
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }


  // 原型
  then(onFulfilled, onRejected) {
    // 这里的self是开启的promise
    const self = this;
    return new MyPromise(
      (resolve, reject) => {
        switch (self.status) {
          case 'pending':
            // 这里的this是then的返回值
            // 将当前的成功或者失败或者失败的回调,保存在实例对象上，等待异步调用resolve或者reject的时候执行回调
            self.callbacks.push({ onFulfilled, onRejected, self, resolve, reject, that: this});
            break;
          case 'fulfilled':
            setTimeout(() => { self.handleCallbacks(self, onFulfilled, resolve, reject, this) },0)
            break;
          case 'rejected':
            setTimeout(() => { self.handleCallbacks(self, onRejected, resolve, reject, this) },0);
            break;
        }
      }
    )
  }

  handleCallbacks(thisArg, callback, resolve, reject, that) {
    try {
      // 执行callback，获取返回值，判断类型，调用resolve或者reject
      let result = callback(thisArg.value);
      if(result instanceof MyPromise) {
        result.then(
          value => {
            resolve.call(that, value);
          },
          reason => {
            reject.call(that, reason);
          }
        );
      }else {
        resolve.call(that, result);
      }
    } catch (error) {
      reject.call(that, error);
    }
  }

  // 构造函数静态属性
}
```

如果执行下面的代码，它的执行流程，如果不在handleCallback调用的时候加上定时器的话，就会让下面这组代码执行结果输出的位置，正确的输出应该为

`Promise { 1 }
	1
	undefined
	Promise { undefined }`

then的执行在微队列中执行，通过定时器模仿微队列中的微任务

```js
var promise = new MyPromise((resolve,reject) => {
  setTimeout(() => {
    resolve(1);
    console.log(promise);
  },3000)
});

var promise2 = promise.then(
  value => {
    console.log(value);
  },
  reason => {}
)


promise2.then(
  value => {
    console.log(value);
    console.log(promise2);
  },
  reason => {
    console.log(reason);
    console.log(promise2);
  }
)
```

```js
// 如果then方法中没有参数
promise.then().then().then(
  value => {
    console.log(value);
  },
  reason => {}
)
// 要实现这样情况的调用,就需要判断传入的形参不是函数的时候，在then内部指定成功的回调函数和失败的回调函数
```

实现没有形参调用then方法，通过在then方法中在没有参数的时候实现成功和失败的回调，然后往下执行，成功就将成功的值作为函数的返回值，then方法会判断这个值的类型，然后返回一个promise，如果是失败就会抛出一个错误，这个时候then方法会将返回一个失败的promise，失败的结果是reason

```js
 then(onFulfilled, onRejected) {                 
    // 如果没有传参或者传递的是一个非函数的情况，设置一个默认的成功的回调和失败的回调
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
    // 这里的self是开启的promise
    const self = this;
    return new MyPromise(
      (resolve, reject) => {
        switch (self.status) {
          case 'pending':
            // 这里的this是then的返回值
            // 将当前的成功或者失败或者失败的回调,保存在实例对象上，等待异步调用resolve或者reject的时候执行回调
            self.callbacks.push({ onFulfilled, onRejected, self, resolve, reject, that: this});
            break;
          case 'fulfilled':
            setTimeout(() => { self.handleCallbacks(self, onFulfilled, resolve, reject, this) },0)
            break;
          case 'rejected':
            setTimeout(() => { self.handleCallbacks(self, onRejected, resolve, reject, this) },0);
            break;
        }
      }
    )
  }
```

**catch实现**

在then方法不传入成功的回调的时候就是then的实现

```js
catch(onRejected) {
  return this.then(_, onRejected);
}
```

**静态方法的实现**

**all方法**

- 参数：一个promise数组
- 返回值：都成功返回一个和原来promise顺序一样的由返回值组成的数组，若有一个失败，则返回一个失败的promise，则返回这个失败的promise包含失败的原因

每一个then都会在调用实例有结果之后进入微队列执行

**最终版**

```js
class MyPromise {
  // 实例属性
  constructor(executor) {
    // 判断传入
    if (typeof executor !== 'function') throw new TypeError('Executor must be a function');
    this.status = 'pending';
    this.value = null;
    // 用于存放pending状态时候，then方法中的回调
    this.callbacks = [];

    let resolve = (value) => {
      if (this.status !== 'pending') return
      this.value = value;
      this.status = 'fulfilled';
      //处理决议之后的promise.then的回调
      this.callbacks.forEach((item) => {
        setTimeout(() => { item.self.handleCallbacks(item.self, item.onFulfilled, item.resolve, item.reject) }, 0);
      })
    }

    let reject = (value) => {
      if (this.status !== 'pending') return
      this.value = value;
      this.status = 'rejected';
      this.callbacks.forEach((item) => {
        setTimeout(() => { item.self.handleCallbacks(item.self, item.onFulfilled, item.resolve, item.reject, item.that) }, 0);
      })
    }

    // 当开启一个异步任务报错返回一个失败的promise
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }


  // 原型
  then(onFulfilled, onRejected) {
    // 如果没有传参或者传递的是一个非函数的情况，设置一个默认的成功的回调和失败的回调
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    // 这里的self是开启的promise
    const self = this;
    return new MyPromise(
      (resolve, reject) => {
        switch (self.status) {
          case 'pending':
            // 这里的this是then的返回值
            // 将当前的成功或者失败或者失败的回调,保存在实例对象上，等待异步调用resolve或者reject的时候执行回调
            self.callbacks.push({ onFulfilled, onRejected, self, resolve, reject, that: this });
            break;
          case 'fulfilled':
            setTimeout(() => { self.handleCallbacks(self, onFulfilled, resolve, reject, this) }, 0)
            break;
          case 'rejected':
            setTimeout(() => { self.handleCallbacks(self, onRejected, resolve, reject, this) }, 0);
            break;
        }
      }
    )
  }

  handleCallbacks(thisArg, callback, resolve, reject, that) {
    try {
      // 执行callback，获取返回值，判断类型，调用resolve或者reject
      let result = callback(thisArg.value);
      if (result instanceof MyPromise) {
        result.then(
          value => {
            resolve.call(that, value);
          },
          reason => {
            reject.call(that, reason);
          }
        );
      } else {
        resolve.call(that, result);
      }
    } catch (error) {
      reject.call(that, error);
    }
  }

  // catch方法
  catch(onRejected) {
    return this.then(_, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) => MyPromise.reject(callback()).then(() => reason)
    )
  }

  // 构造函数静态属性
  static all(promises) {
    // 接受一个promise数组，返回一个promise
    let values = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((item, index) => {
        item.then(
          (value) => {
            values[index] = value;
            count++;
            if (count == promises.length) {
              resolve(values);
            }
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    })
  }

  static race(promises) {
    // 接受一个promise数组，返回执行最快的那个promise
    return new MyPromise((resolve, reject) => {
      promises.forEach(item => {
        item.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    })
  }

  static reject(reason) {
    // 接受一个原因，返回一个失败的promise
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }

  static resolve(value) {
    // 接受一个值，返回一个成功的promise
    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
  }
}
```

**执行题**

题目1

```js
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)
```

执行：在Promise执行器函数中开启了一个同步的任务，打印1，执行resolve()，打印2，现在的变量promise已经决议，走成功的回调，将then成功的回调进入微队列，执行同步的代码，打印4，微任务执行成功的回调，打印3

题目2

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
```

执行：在Promise执行器中开启了一个setTImeout的异步任务，在异步的回调中执行resolve('success')在一秒钟以后，进入时间管理模块，等待变量promise1决议之后执行then方法，现在将then参数的成功的回调和失败的回调，存在promise1变量上，在决议后，进入微队列执行。打印未决议的promise1，和未决议的promise2，setTimeout中的回调进入时间管理模块等待两秒，进入宏队列打印已经决议的promise1和promise2

题目3

```js
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```

执行：在Promise执行器中开启了一个同步任务，执行resolve('success1')，之后不能再改变该promise实例的状态和值，然后执行then，then中成功的回调进入微队列，打印结果succcess1

题目4

```js
Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })
```

执行：开启了一个成功的promise，微任务中执行成功的回调，打印1，then返回一个成功的promise值为2，执行catch中的微任务，没有成功的回调，利用then中重写的成功的回调，将这个值返回，执行下一个then，调用成功的回调进入微队列执行微任务打印2

题目5

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})
```

执行：开启一个setTimeout异步任务，在异步回调中打印once，调用resolve('success')，进入时间管理模块，获取当前时间戳，promise.then成功的回调存放在promise对象上等待决议，promise.then成功的回调存放在promise对象上等待决议，一秒钟到，回调进入宏队列执行，打印once，promise身上第一个成功的回调进入微任务队列执行，打印success，当前时间戳差值，promise身上第二个成功的回调进入微任务队列执行，打印success，当前时间戳差值

题目6

```js
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```

执行：Promise.resolve()返回一个成功的promise，值是undefined，then调用这个promise实例，传入成功的回调，成功的回调进入微队列执行，返回错误，返回一个成功的promise，值为error!!!，then调用，回调函数进入微队列打印then：Error对象。

题目7

```js
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)
```

执行：变量promise开辟内存空间，执行Promise.resolve()得到一个成功的promise值为undefined，调用then方法，调用成功的回调进入微队列执行，返回值沿着作用域链查找promise，此刻的值......，循环引用会报错

题目8

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

执行：Promise.resolve(1)执行得到了一个成功的promise值未1，执行then(2)，得到一个成功的promise值为1，执行then(Promise.resolve(3))，得到一个成功的promise值是1，then(console.log)，执行console.log函数打印1

题目9

```js
Promise.resolve()
  .then(function success (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .catch(function fail2 (e) {
    console.error('fail2: ', e)
  })
```

执行：Promise.resolve()获得一个成功的promise值为undeined，then方法成功的回调进入微队列执行，抛出错误，返回一个错误的promise值为Error对象，执行catch方法中的回调进入微队列，打印fail2: Error

题目10

```js
process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')
```

执行：end nextTick then setImmediate