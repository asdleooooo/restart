// es6以后出现
// Map，是一种新的集合类型，键值对的形式
const m = new Map();
// Map构造函数接收一个迭代对象，包含键值的
const m1 = new Map([
  ['key','value'],
  ['key1','value2'],
  ['key2','value2']
])
// m1包含一个size属性
const m2 = new Map([[]])

// Map实例的方法
// get方法
m2.get(undefined);
m2.set(undefined, '11111111');


// set方法




// has方法
m2.has(undefined);

// keys方法
m2.keys()

// values方法
m2.values()
// delete方法
m2.delete(undefined);
// WeakMap是Map的一个子集，其键必须为Object类型，值可以为任意类型
// WeakMap中的键就是一种弱引用，不会影响垃圾回收机制对于键的处理
const wm = new WeakMap();

const container = {
  key: {}
}
wm.set(container.key, '111111');
function removeKey() {
  container.key = null;
}

removeKey();
const wm1 = new WeakMap();


const s = new Set();