/**
 * 不传入第一个参数，那么上下文默认为 window
 * 改变了 this 指向，让新的对象可以执行该函数，并能接受参数
 */

Function.prototype.MyCall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || global // window
  const args = [...arguments].slice(1)
  context.fn = this // this为要执行的函数, 谁执行了这个函数, 函数中的this就指向谁
  const result = context.fn(...args)
  delete context.fn
  return result
}

console.log(Math.max.MyCall(null, 10, 9, 8, 100, 0, -1))
