/* 
  对象和数组的浅拷贝
*/
const arr = [1, 2, 3, { a: 1 }];
const obj = { a: [1, { b: 2 }], c: { d: { e: 1 } } }

// 扩展运算符 -- 数组

const arr1 = [...arr];

// 扩展运算符 -- 对象

const obj1 = { ...obj };

// slice
const arr2 = arr.slice(0);

const arr3 = [].concat(arr);

const arr4 = [...new Set(arr)];

const obj2 = Object.assign({}, obj);



/* 
  JavaScript中的变量类型能否在JSON中被表示
*/


const s = 'string';
const num = 123;
const num1 = NaN;
const num2 = Infinity;
const n = null;
const un = undefined;
const fn = function () { };
const o = { a: 1 };
const map = new Map([['123', 123]]);
const list = [1, 2, 3];
const set = new Set([1, 2, 3]);
const sym = Symbol();
const reg = new RegExp('ab+c', 'i');
const date = new Date();

const typeData = {
  s,
  num,
  num1,
  num2,
  n,
  un,
  fn,
  o,
  map,
  list,
  set,
  sym,
  reg,
  date
}
let jsonType = getTypeMap(typeData);
function getTypeMap(typeData) {
  let result = new Map();
  Object.keys(typeData).forEach(item => {
    const key = Object.prototype.toString.call(typeData[item]);
    const value = JSON.parse(JSON.stringify({ [key]: typeData[item] }));
    result.set(key, value);
  });
  return result
}

console.log(jsonType);

function cloneJson(arg) {
  if (arg === null || typeof arg !== 'object' || isDateType(arg)) throw new TypeError('形参必须是一个对象类型或者数组类型的值');
  return JSON.parse(JSON.stringify(arg))
}

function isDateType(arg) {
  return Object.prototype.toString.call(arg) === '[object Date]'
}



const data = typeData;



function deepClone(arg, hash = new WeakMap()) {
  if(arg instanceof Date) return new Date(arg);
  if(arg instanceof RegExp) return new RegExp(arg);
  const isArray = Array.isArray(arg); // 判断传入参数是不是一个数组
  hash.set(arg, isArray ? [...arg] : {...arg});
  const result = isArray ? [] : {}; // 设置容器
  const rangeData = isArray ? arg :  Object.keys(arg); // 遍历对象，如果是数组就是当前参数，如果不是数组就是keys

  rangeData.forEach((item, index) => {
    const flag = isArray ? index : item;
    // 如果rangeData是数组，则当前元素是item，如果rangeData是对象，则当前元素是arg[item]
    const cloneTarget = isArray ? item : arg[item];

    if(isLikeObject(flag, arg)) {
      if(hash.has(cloneTarget)) {
        result[flag] = hash.get(cloneTarget);
      }else {
        result[flag] = deepClone(cloneTarget, hash);
      }
    }else {
      result[flag] = cloneTarget;
    }
  })
  return result
}

function isLikeObject(flag, self) {
  return typeof self[flag] === 'object' && self[flag] !== null
}

const a = {};
const b = {c: { d: { e: a}}};
a.f = b;

const result = deepClone(a);
console.log(result);