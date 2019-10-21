// 考虑一个场景，滚动事件中会发起网络请求，但是我们并不希望用户在滚动过程中一直发起请求，而是
// 隔一段时间发起一次，对于这种情况我们就可以使用节流。
const throttle = (func, wait = 50) => {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}

setInterval(
  throttle(() => {
    console.log(1)
  }, 500), 1)
