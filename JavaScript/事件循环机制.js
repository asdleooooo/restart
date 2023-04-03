// 1
console.log('1');

// 定时器触发线程
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5');
    })
})

// 微任务，进入微队列
process.nextTick(function() {
    console.log('6');
})

// 7
// 微任务，进入微队列
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

// 定时器触发线程
setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})


/* 
  控制台：1 7 6 8 2 4 3 5 9 11 10 12
  event loop：所有微任务[6 8]
  event loop：第一个宏任务[2]，微队列[3 5]
  event loop：所有微任务[3 5]
  event loop：第一个宏任务[9]，微队列[10 12]
*/