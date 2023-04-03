function myBind(thisArg) {
  let fn = this;
  thisArg = thisArg || getGlobalObject()
  let args = Array.from(arguments).slice(1);
  return function() {
    fn.apply(thisArg, args.concat(Array.from(arguments)));
  }
}

function getGlobalObject() {
  return this
}


function fn() {
  console.log(this, arguments);
}

Function.prototype.myBind = myBind;

fn.myBind([1,2,3], 1,2,3)(4,5,6);