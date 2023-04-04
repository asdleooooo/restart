/* 
  迭代器：迭代也就是一段代码重复多次执行；
  循环是迭代机制的基础，它可以指定迭代的次数，每次迭代都会在下一次循环开始前完成；
  迭代会在一个有序(开始项和结束项有明确的定义)的集合上进行；
  数组中有forEach方法实现迭代，但是对于别的结构就需要借助循环或者其他辅助结构
*/

for (let i = 0; i < 10; i++) {
  console.log(i);
}
/* 
  迭代器模式：可以把有些结构称为可迭代对象，iterable接口
  可迭代对象可以理解为数组(类数组)或者集合这样的类型
*/
const set = new Set();
set.add(1);
console.log(set);

const arr = ['a', 'b', 'c'];
const iter = arr[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

class Counter {
  // 迭代器属性
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
  }

  [Symbol.iterator]() {
    let count = this.count;
    const limit = this.limit;
    return {
      next() {
        if (count > limit) {
          return {
            done: true,
            value: undefined
          }
        } else {
          return {
            done: false,
            value: count++
          }
        }
      }
    }
  }
}

const counter = new Counter(3);

for(let i of counter) {
  console.log(i);
}



/* 
  生成器：拥有在一个函数块内暂停和恢复执行的能力；
  也就是在函数定义的时候前面加上一个星号
*/
function* generatorFn() {};

let generator = function* () {

}
// 对象中生成一个生成器函数

const obj = {
  * generatorFn() {}
}

// 作为静态方法的生成器函数
class Bar{
  static * generatorFn() {}
}


/* 
  调用生成器函数会产生一个生成器对象，生成器对象一开始处于暂停状态，调用next()方法恢复执行
  next()返回值类似于迭代器next函数返回值{done: true,value: undefined}
*/
function *generatorFn1 () {
  console.log(123);
}
const generatorObj = generatorFn1();
generatorObj.next()
console.log(generatorObj.next());

// 通过yield中断执行，通过next()恢复执行，yield可以让生成器停止和开始执行
// 生成器之间不会互相影响
// yield必须在生成器函数中使用不能嵌套否则无效
function* fn3() {
  yield 1;
  yield 2;
  yield 3;
}
// 在生成器上显示调用next()方法作用并不大
for(const i of fn3()) {
  console.log(i);
}

// return方法和throw方法都能让生成器终止