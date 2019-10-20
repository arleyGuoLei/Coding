function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}
function Child(value) {
  Parent.call(this, value) // 将父类构造函数里面有的成员挂在到子类上, 相当于es6中的super()
}
// Child.prototype = new Parent() // 组合继承
/**
 * 寄生组合继承: 解决了无用的父类属性问题，还能正确的找到子类的构造函数
 */
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})// 让子类有父类的方法

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
