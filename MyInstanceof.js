/**
  instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
 */

// 利用原理: right.prototype === left.__proto__
// person.__proto__ === Person.prototype
function MyInstanceof(left, right) {
  const prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined) {
      return false
    }
    if (prototype === left) {
      return true
    }
    left = left.__proto__ // 一层一层的往里面找
  }
}

const str = new String('arley')
console.log(MyInstanceof(str, String))

// Object是所有对象的爸爸
// Function是所有函数的爸爸
// 函数的prototype是一个对象
// 对象的__proto__指向原型
// 原型链 => 多个对象通过__proto__的方式连接起来

// person.__proto__ === Person.prototype
// Person.prototype.constructor === Person === Person.constructor === person.__proto__.constructor

