let obj = {
  name: 'zhangsan',
  age: 20
}

let obj1 = {
  a: 1
};

let obj2 = {
  b: 2
}


let fn = function () {}

Object.setPrototypeOf(obj1, obj2);

let o = Object.create(Object.prototype, {
  a: { value: 1, enumerable: true },
  b: { value: 2, enumerable: true }
})

class Person {
  // constructor
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // getter
  get personInfo() {
    return this.firstName + ' ' + this.lastName
  }

  // setter
  set personInfo(newValue) {
    this.firstName = newValue.split(' ')[0];
    this.lastName = newValue.split(' ')[1];
  }

  // method
  showMyself() {
    console.log(`大家好，我的名字叫${this.personInfo}`)
  }

  // static method
  static toUpperCaseName(thisArg) {
    return thisArg.personInfo.toUpperCase();
  }

  // static attr
  static constructorName = 'Person';

  // 实例化对象都有的属性名和值
  toLowerCaseName = function (thisArg) {
    return thisArg.personInfo.toLowerCase();
  }
  constructorName1 = 'Person';
}

class Student extends Person {
  constructor(firstName, lastName) {
    super(firstName, lastName);
  }
}


let person = new Person('zhang', 'san');
let student = new Student('wang', 'wu');