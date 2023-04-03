function myCall(thisArg) {
  // 函数调用时，是函数调用的，也就是【对象.方法】的形式，this指向为改变this指向的函数
  let fn = this;
  // 如果thisArg是null或者undefined就将this指向为window
  thisArg = thisArg || window;
  // 改变this的方式就看怎么调用，直接调用不行、new操作符也不行、只有【对象.方法】的形式比较符合
  thisArg.fn = fn;
  // 调用函数
  let result = thisArg.fn(...Array.from(arguments).slice(1));
  // 删除fn属性
  delete thisArg.fn;

  return result;
}

Function.prototype.myCall = myCall;




function callThis() {
  console.log(this, arguments);
}

callThis.myCall([1,2,3], 1,2,3,4,5);
callThis.call([1,2,3], 1,2,3,4,5);
