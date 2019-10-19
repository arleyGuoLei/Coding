/**
 * 未考虑返回的函数的执行方式, 下方为直接调用的方式, 且不能拼接参数
 * Bind(null, 1, 2, 3)(999)
 */
Function.prototype.BindA = function(context) {
  if (typeof this !== 'function') {
    return new TypeError('error')
  }
  context = context || global
  context.fn = this
  const args = [...arguments].slice(1)
  return function() {
    return context.fn(args)
  }
}
/**
 * 1. 直接调用 _this.apply(context, args.concat(...arguments))
 *    例如: f.bind(obj, 1)(2)
 */
Function.prototype.MyBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments) // 通过new调用的, this instanceof F成立, 不改变this的指向
    }
    return _this.apply(context, args.concat(...arguments)) // args为原来的参数, 拼接上返回的函数传入的参数
  }
}
