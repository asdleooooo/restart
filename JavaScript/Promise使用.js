var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
    console.log(promise);
  }, 3000)
});

var promise2 = promise.then(
  value => {
    console.log(value);
  },
  reason => { }
)


promise2.then(
  value => {
    console.log(value);
    console.log(promise2);
  },
  reason => {
    console.log(reason);
    console.log(promise2);
  }
)