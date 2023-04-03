/* function a() {
  b();
  let fun1 = function() {};
  let var1 = 1;
}

function b() {
  c();
  let var2 = 2;
}

function c() {
  let var3 = 3;
  console.log(this===global);
}

var aa = 1;
var bb = 2;
var cc = 3;
a();
 */

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// }

// console.log(i); // 5 55555

// 生成5 01234

// function output(i) {
//   return setTimeout(() => {
//     console.log(i);
//   }, 1000)
// }

// for (var i = 0; i < 5; i++) {
//   output(i);
// }

// console.log(i);

// 生成012345

/* function out(j) {
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(j);
      resolve(1);
    },1000)
  })
}

var tasks1 = [];

for (var j = 0; j < 5; j++) {
  // 开启异步任务
  tasks1.push(out(j));
}

Promise.all(tasks1).then(() => {
  console.log(j);
},() => {
}) */

function f1() {
  console.log(1);
  let a = 2;
  let b = 3;
}

function f2() {
  try {
    f1();
  } catch (error) {
    console.log(error);
  }
}

f2();