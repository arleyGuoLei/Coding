/**
 * 不传入第一个参数，那么上下文默认为 window
 * 改变了 this 指向，让新的对象可以执行该函数，并能接受参数
 */

Function.prototype.MyCall = function(...args) {
  const isWeb = () => (typeof window !== 'undefined')

  if (typeof this !== 'function') {
    throw new TypeError('Call can only be called by a function') // 1. 什么情况下能触发这个错误 ?
  }
  const context = args[0] || (isWeb() ? window : global) // 2. 如何让call支持浏览器且支持nodejs
  context.fn = this
  const result = context.fn(...args.slice(1))
  delete context.fn
  return result
}

console.log(Math.max.MyCall(null, 10, 9, 8, 100, 0, -1))

