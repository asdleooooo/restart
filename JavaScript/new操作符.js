function Student(name, age) {
  this.name = name;
  this.age = age;
  // Object.setPrototypeOf(this, Object.prototype);
  // console.log(Student.prototype);
  return {}
};

var student = new Student('hello', 20);

console.log(Object.prototype.toString.call(student)); // [object Object]

console.log(student);

function myNew(constructFn) {
  // 参数为一个构造函数
  if (typeof constructFn !== 'function') throw (new Error('第一个参数必须是一个函数'));
  // 创建一个新的对象
  let newObj = new Object();
  // 设置实例对象身上的原型指向
  Object.setPrototypeOf(newObj, constructFn.prototype);
  // 执行构造函数中的代码
  let fnResult = constructFn.apply(newObj, Array.from(arguments).slice(1));
  // 如果构造函数没有返回值或者返回值不是一个对象或者函数，返回这个对象
  let fnResultType = Object.prototype.toString.call(fnResult).slice(8, -1);
  if (['Function', 'Object'].includes(fnResultType)) {
    return fnResult
  }
  // 返回这个对象
  return newObj
  
}

console.log(myNew(Student, 'zhangsan', 21));