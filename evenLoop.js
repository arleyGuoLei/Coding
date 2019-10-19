/**
 * await 让出线程
 */
function testA(){
  console.log("script start"); // 1

  async function async1() {
    await async2();
    console.log("async1 end"); //7
  }
  async function async2() {
    console.log("async2 end"); // 2
  }
  async1();

  setTimeout(function() {
    console.log("setTimeout"); // 8
  }, 0);

  new Promise(resolve => {
    console.log("Promise"); // 3
    resolve();
  })
    .then(function() {
      console.log("promise1"); // 5
    })
    .then(function() {
      console.log("promise2"); // 6
    });

  console.log("script end"); // 4
}

{
  setTimeout(() => {
    console.log('=====') // 9
  }, 0)
  const promise1 = new Promise(resolve => {
    console.log('promise1 start') // 1
    return resolve(Promise.resolve())
  }).then(() => {
    console.log('promise1 then1') // 5
  }).then(() => {
    console.log('promise1 then2') // 6
  }).then(() => {
    console.log('promise1 then3') // 7
    return Promise.reject('lazy')
  }).catch(e => console.log(e)) // 8

  promise1.finally(() => {
    console.log('p1 end!!!') // 9
  })

  const promise2 = new Promise(resolve => {
    console.log('promise2 start') // 2
    resolve()
  }).then(()=>{
    console.log('promise2 then') // 3
  })

  promise2.finally(() => {
    console.log('p2 end!!!') // 4
  })
}

/**
 * EvenLoop执行顺序如下
 * 1. 所有同步代码 (宏任务同步代码)
 * 2. 所有微任务(jobs)
 *    - process.nextTick ，promise ，MutationObserver
 * 3. 当执行完所有微任务后，如有必要会渲染页面
 * 4. 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数
 * 
 * 宏同 => 微 => 宏异
 * 
 * 宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。
 */