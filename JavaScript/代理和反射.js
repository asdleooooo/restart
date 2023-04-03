/* 
  代理和反射：为开发者提供拦截并向基础操作嵌入额外行为的能力；
  通过Proxy构造函数来创建代理，接受两个参数：目标对象和处理程序对象，缺少任意一个参数都会抛出类型错误
*/
// 目标对象
const target = {
  id: 'target'
};
// 处理程序对象
const handler = {
  get(trapTarget, property, receiver) {
    // 捕获器的参数，捕获对象、属性、代理对象
    return Reflect.get(...arguments);
  }
};
// 代理对象
const proxy = new Proxy(target, handler);

console.log(target.id);
console.log(proxy.id);
// 目标对象可以直接被操作，也可以通过代理来操作，但直接操作会绕过代理施予的行为
target.id = 'foo';
console.log(target.id);
console.log(proxy.id);