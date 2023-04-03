// 给 list 中每个元素先加 1，再加 5，再减 1
let list = [1, 2, 3, 4, 5];

/* //正常做法
let list1 = list.map((value) => {
  return value + 1;
});
let list2 = list1.map((value) => {
  return value + 5;
});
let list3 = list2.map((value) => {
  return value - 1;
});
console.log(list3); // [6, 7, 8, 9, 10] */

// 柯里化
const changeList = (num) => {
  return (data) => {
    return data + num
  }
};
let list1 = list.map(changeList(1)).map(changeList(5)).map(changeList(-1));
console.log(list1); // [6, 7, 8, 9, 10]

var isLastInStock = _.prop('in_stock', _.last(cars));

var nameOfFirstCar = _.prop('in_stock', _.head(cars));