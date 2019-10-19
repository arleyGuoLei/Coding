/**
 * 涉及面试题：new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？
 */

function MyNew() {
  const obj = {} // 新生成一个空对象, 接下来构造函数和参数都会绑定在这个对象上
  const Con = [].shift.call(arguments) // 获取构造函数
  obj.__proto__ = Con.prototype // 链接到原型 => 设置空对象的原型 obj.__proto__.Construct = Foo
  const result = Con.apply(obj, arguments) // 绑定this 并执行构造函数, 将函数中的this都指向obj, 相当于把内容都挂在obj上面
  return result instanceof Object ? result : obj // 返回新对象(obj)
}

function Foo() {
  this.name = 'foo'
}

const obj = MyNew(Foo)
console.log(obj.name)
