/**
 * promise的简易版原生实现
 */
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  /**
   * 5. 执行resolve函数
   * @param {*} value 传入then函数的参数
   */
  function resolve(value) {
    /**
     * 正常执行至此的时候,状态是pending
     */
    if (that.state === PENDING) {
      /**
       * 改变当前promise的状态
       */
      that.state = RESOLVED
      that.value = value
      /**
       * 遍历then函数中push进数组的函数, 并且执行
       */
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  function reject(value) {
    /**
     * 至此状态已经不对, 所以不会进入条件
     */
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }

  try {
    /**
     * 1. promise中传入的函数直接执行, 所以是同步方法
     */
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
        throw r
      }
  /**
   * PENDING状态的时候, 将需要执行的函数push进数组保存;
   * 在异步回调之后(resolve或reject执行), promise状态改变
   * --------------
   * 2. 在执行.then函数的时候, promise的状态还是pending
   */
  if (that.state === PENDING) {
    /**
     * 3. push进数组then中传入的函数
     */
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    /**
     * 4. 定义好的resolve函数被执行
     */
    resolve(1)

    /**
     * reject函数进入之后, 状态不对了, 所以相当于不会执行传入的reject函数
     */
    reject(2)
    /**
     * 执行完resolve中的下面这行代码还会执行
     */
    console.log('end')
  }, 0)
}).then(value => {
  console.log(value)
})
