/**
 * 参数 thisArg Object
 * 参数 options Array
 * 返回值 函数的返回值
 * 作用 改变函数的this指向，this指向变为传入的第一个参数，函数的所有参数作为第二个值传入，并且执行函数，返回函数的返回值
 */

Function.prototype.myApply = function (thisArg, options) {
  // 判断this是否为函数，如果不是函数报类型错误
  if (typeof this !== 'function') throw new TypeError(`${this.name} 的类型应该是函数类型`);
  if (!(Array.isArray(options) || options == null)) throw new TypeError(`${this.name} 的第二个参数类型应该是一个Array`);
  // 定义返回的值
  let result;
  // 创建唯一的对象属性
  let fn = Symbol();

  // 如果传入的参数是null，或者undefined
  thisArg = thisArg || getGlobalThis()
  thisArg[fn] = this;

  // 执行函数
  result = options ? thisArg[fn](...options) : thisArg[fn]();

  // 删除fn属性
  delete thisArg[fn];

  return result
}


function getGlobalThis() {
  return this
}

function fn() {
  console.log(this, arguments);
}
let thisArg = [1,2,3];

fn.myApply(thisArg);