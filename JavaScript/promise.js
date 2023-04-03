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




var promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
    console.log(promise);
  }, 3000)
});

var promise2 = promise.then(
  value => {
    console.log(value);
  },
  reason => { }
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