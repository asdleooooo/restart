function test(a) {
  /**
   * 函数执行上下文创建阶段->创建变量对象【函数声明，变量声明，arguments】
   * vo = {a函数声明, a变量声明，b变量声明，d函数声明}
   * 如果函数声明和变量声明重名，函数会替代变量声明
   * 
   */
  console.log(a);
  var a = 2;
  console.log(a);
  function a() { }
  console.log(a);
  var b = function () { };
  console.log(b);
  function d() { }
}
test(1);
