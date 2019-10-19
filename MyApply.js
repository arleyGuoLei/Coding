/**
 * apply, 可以传入两个参数, 第一个为this, 第二个为完整参数的数组
 */
Function.prototype.MyApply = function(context) {
  if (typeof this !== 'function') { throw new TypeError('error') }
  context = context || global
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

console.log(Math.max.MyApply(null, [10, 9, 8, 999, 0]))
