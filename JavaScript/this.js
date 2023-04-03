// // 直接调用函数中的this

// function f() {
//   console.log(this === global);
// }

// f();

// // call/apply/bind方法实现this的绑定

// function thisDirection() {
//   console.log(this);
//   console.log(Array.from(arguments));
// }

// let c = {}
// thisDirection();
// thisDirection.call(c,1,2,3);
// thisDirection.apply(c,[1,2,3]);
// // bind方法将函数的this永久的绑定了c,不能再被call/apply/bind方法修改
// let bindC = thisDirection.bind(c);
// bindC();
// bindC.call([]);
// bindC.bind([])();

// let person = {
//   name: 'John',
//   age: 21,
//   say() {
//     console.log('你好哇');
//     console.log(this);
//   }
// }

// person.say();

// class Person{
//   constructor(name,age){
//     this.name = name;
//     this.age = age;
//     console.log(this);
//   }
// }

// let p1 = new Person('zhangsan',21);




// function Foo() {
//   getName = function () {
//     console.log(1);
//   };
//   return this
// }

// function getName() {
//   console.log(5);
// }

// Foo().getName()

var value = 1;
var foo = {
  value: 2,
  bar: function() {
    return this.value
  }
}

console.log(foo.bar());
/**
 * 表达式为foo.bar
 */
console.log((foo.bar)());
console.log((foo.bar = foo.bar)());
console.log((false || foo.bar)());
console.log((foo.bar, foo.bar)());