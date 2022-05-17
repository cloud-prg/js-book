
# 手写Promise
[[toc]]

## 基本原理

-   Promise是一个类，在执行这个类时传入一个回调函数，这个回调函数将会立即执行。

-   Promise会有三种状态：
  - Pending 等待
  - Fulfilled 完成
  - Rejected 失败
-  状态只能由Pending --> Fulfilled 或者 Pending --> Rejected,且一旦发生改变便不可二次修改；
-   Promise中使用resolve 和 reject 两个函数来更改状态；
-   then 方法内部做的事情是状态判断
  - ​	如果状态是成功，调用成功回调函数。
  - ​    如果状态是失败，调用失败回调函数。

## 实现过程

1. 创建MyPromise这个类，传入回调函数callback

   ```js
   // 创建MyPromise class
   class MyPromise{
   	// 传入回调函数
   	constructor(callback){
   		// 立即执行
   		callback();
   	}
   }
   ```

2. callback传入resolve和reject方法

   ```js
   // 定义常量表示状态
   const PENDING = "pending";
   const FULFILLED = "fulfilled";
   const REJECTED = "rejected";
   
   // 创建MyPromise class
   class MyPromise {
     // 传入回调函数
     constructor(callback) {
       // 立即执行
       callback(this.resolve, this.reject);
     }
   
     // 初始化状态
     status = PENDING;
   
     // 状态转变为成功的值
     value = null;
   
     // 状态转变为失败的值
     reason = null;
   
     /**
      * 在这里是用箭头函数，可以指向实例对象
      * 而普通函数会指向window或者undefined;
      */
   
     // 更改成功后的状态
     resolve = (val) => {
       if (this.status === PENDING) {
         this.status = FULFILLED;
         this.value = val;
       }
     };
   
     // 更改失败后的状态
     reject = (val) => {
       if (this.status === PENDING) {
         this.status = REJECTED;
         this.reason = val;
       }
     };
   }
    
   ```

3. then的简单实现

   ```js
     /**
      * 两个参数
      * 状态为成功时返回调用第一个
      * 状态为失败时返回调用第二个
      * */
     then = (resCallback, rejCallback) => {
       // 判断状态
       if (this.status == FULFILLED) {
         resCallback(this.resolve);
       } else if (this.status == REJECTED) {
         rejCallback(this.reject);
       }
     }
   ```

4. 完整代码

   ```js
   // 定义常量表示状态
   const PENDING = "pending";
   const FULFILLED = "fulfilled";
   const REJECTED = "rejected";
   
   // 创建MyPromise class
   class MyPromise {
     // 传入回调函数
     constructor(callback) {
       // 立即执行
       callback(this.resolve, this.reject);
     }
   
     // 初始化状态
     status = PENDING;
   
     // 状态转变为成功的值
     value = null;
   
     // 状态转变为失败的值
     reason = null;
   
     /**
      * 在这里是用箭头函数，可以指向实例对象
      * 而普通函数会指向window或者undefined;
      */
   
     // 更改成功后的状态
     resolve = (val) => {
       if (this.status === PENDING) {
         this.status = FULFILLED;
         this.value = val;
       }
     };
   
     // 更改失败后的状态
     reject = (val) => {
       if (this.status === PENDING) {
         this.status = REJECTED;
         this.reason = val;
       }
     };
   
     /**
      * 两个参数
      * 状态为成功时返回调用第一个
      * 状态为失败时返回调用第二个
      * */
     then = (resCallback, rejCallback) => {
       // 判断状态
       if (this.status == FULFILLED) {
         resCallback(this.value);
       } else if (this.status == REJECTED) {
         rejCallback(this.reason);
       }
     };
   }
   
   
   let promise = new MyPromise((resolve,reject)=>{
       resolve("我成功了");
   })
   
   promise.then((res)=>{
       console.log(res); // 我成功了
   })
   ```

   

## 加入异步逻辑

  如果在promise实例中，以setTimout异步逻辑来写入resolve或reject，则在then中不会有任何响应。因为then是立即执行，在执行时status仍然处于PENDING状态。

```js
// 定义常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 创建MyPromise class
class MyPromise {
  // 传入回调函数
  constructor(callback) {
    // 立即执行
    callback(this.resolve, this.reject);
  }

  // 初始化状态
  status = PENDING;

  // 存储成功回调
  onFulfilledCallbacks = null;

  // 存储失败回调
  onRejectedCallbacks = null;

  // 状态转变为成功的值
  value = null;

  // 状态转变为失败的值
  reason = null;

  /**
   * 在这里是用箭头函数，可以指向实例对象
   * 而普通函数会指向window或者undefined;
   */

  // 更改成功后的状态
  resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = val;

      // 若实例中执行的是异步逻辑
      this.onFulfilledCallbacks && this.onFulfilledCallbacks(val);
    }
  };

  // 更改失败后的状态
  reject = (val) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = val;

      // 若实例中执行的是异步逻辑
      this.onRejectedCallbacks && this.onRejectedCallbacks(val);
    }
  };

  /**
   * 两个参数
   * 状态为成功时返回调用第一个
   * 状态为失败时返回调用第二个
   * */
  then = (onFulfilled, onRejected) => {
    console.log("this.status", this.status);
    // 判断状态
    if (this.status == FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status == REJECTED) {
      onRejected(this.reason);
    } else if (this.status == PENDING) {
      /**
       * 此处有修改，因then立即执行，则状态为pending,将成功和失败的回调存储起来。
       * 若干秒后，在resolve后reject函数中执行存储函数
       * */
      this.onFulfilledCallbacks  = onFulfilled;
      this.onRejectedCallbacks = onRejected;
    }
  };
}

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("222我成功了");
  }, 2000);
});

promise.then(
  (res) => {
    console.log("resolve", res); // 222我成功了
  },
  (reason) => {
    console.log("reject", reason);
  }
);

```



## 存储多次回调

  当使用多次promise.then时，只有最后一次的回调函数实行了，因为onFulfilledCallbacks 存储函数，只存储了最后一次的回调。因此需要改成**数组形式**。

```js
promise.then(
  (res) => {
    console.log("1");
    console.log("resolve", res); // success
  },
);

promise.then(
  (res) => {
    console.log("2");
    console.log("resolve", res); // success
  },
);

promise.then(
  (res) => {
    console.log("3");
    console.log("resolve", res); // success
  },
);

// ---最终打印结果---
// 3
// success
```



先修改成数组形式，并在resolve,reject函数中做逻辑修改。

```js
// 存储函数的变化 
// 存储成功回调
  //   onFulfilledCallbacks = null;
  onFulfilledCallbacks = [];

  // 存储失败回调
  //   onRejectedCallbacks = null;
  onRejectedCallbacks = [];

```

```js
  // 更改成功后的状态
  resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = val;

      // 若实例中执行的是异步逻辑
      this.onFulfilledCallbacks.forEach((item) => item());
        this.onFulfilledCallbacks = []; // 循环完置空
    }
  };

  // 更改失败后的状态
  reject = (val) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.value = val;
      // 若实例中执行的是异步逻辑
      this.onRejectedCallbacks.forEach((item) => item());
      this.onRejectedCallbacks = []; // 循环完置空
    }
  };
```

```js
// 打印结果
// 1
// resolve success
// 2
// resolve success
// 3
// resolve success

```



## 如何做到链式调用

1.  为了达到链式调用，应在第一个then里返回promise。我们就返回一个promise2: `promise2 = new Promise((resolve,reject)=>{})`
2.  我们规定第一个then返回的值，称之为x，判断x的函数叫做resolvePromise.

逻辑梳理:

- 判断x是否为promise(使用instanceof判断)
- 如果是promise，则取结果，作为新的promise2成功的结果。



```js
// 改变 状态为FULFILLED时的代码逻辑。
then(onFulfilled, onRejected) {
    // 为了链式调用，这里直接创建一个 MyPromise, 并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status == FULFILLED) {
         // 需要改变的地方,第一个then返回值称之为x
         let x = onFulfilled(this.value);
         // resolvePromise函数，处理自己return的promise和默认的promise2的关系
         resolvePromise(promise2, x, resolve, reject);

        onFulfilled(this.value);
      } else if (this.status == REJECTED) {
        onRejected(this.reason);
      } else if (this.status == PENDING) {
        /**
         * 此处有修改，因then立即执行，则状态为pending,将成功和失败的回调存储起来。
         * 若干秒后，在resolve后reject函数中执行存储函数
         * */
        this.onFulfilledCallbacks.push(() => {
          return onFulfilled(this.value);
        });
        this.onRejectedCallbacks.push(() => {
          return onRejected(this.reason);
        });
      }
    });
    return promise2;
  }
}
```

### 完成resolvePromise函数

  让不同的promise代码互相套用，叫做resolvePromise

- 如果 x === promise2,则会造成循环引用，自己等待自己完成，则报错“循环引用”。

```js
let p = new Promise(resolve=>{
    resolve(0)
});
let p2 = p.then(data => {
    // 循环引用，自己等待自己完成
    return p2;
})
```

#### 判断x的必要条件

- x不能为null
- 若为普通值，则resolve(x)
- 声明了then
- 如果取then报错，则走reject()
- 如果then是个函数，则call执行then,第一个参数为this,后面是成功的回调和失败的回调。
- 如果成功的回调还是promise,就递归继续解析
- 成功和失败只能调用一个，所以设定一个called来防止多次调用。

```js
// 定义常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 创建MyPromise class
class MyPromise {
  // 传入回调函数
  constructor(executor) {
    // 立即执行
    executor(this.resolve, this.reject);
  }

  // 初始化状态
  status = PENDING;

  // 存储成功回调
  //   onFulfilledCallbacks = null;
  onFulfilledCallbacks = [];

  // 存储失败回调
  //   onRejectedCallbacks = null;
  onRejectedCallbacks = [];

  // 状态转变为成功的值
  value = null;

  // 状态转变为失败的值
  reason = null;

  /**
   * 在这里是用箭头函数，可以指向实例对象
   * 而普通函数会指向window或者undefined;
   */

  // 更改成功后的状态
  resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = val;

      // 若实例中执行的是异步逻辑
      this.onFulfilledCallbacks.forEach((item) => item());
      this.onFulfilledCallbacks = []; // 循环完置空
    }
  };

  // 更改失败后的状态
  reject = (val) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.value = val;
      // 若实例中执行的是异步逻辑
      this.onRejectedCallbacks.forEach((item) => item());
      this.onRejectedCallbacks = []; // 循环完置空
    }
  };

  /**
   * 两个参数
   * 状态为成功时返回调用第一个
   * 状态为失败时返回调用第二个
   * */
  then(onFulfilled, onRejected) {
    // 为了链式调用，这里直接创建一个 MyPromise, 并在后面 return 出去

    // 以下是立即执行的
    const promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status == FULFILLED) {
        // 需要改变的地方,第一个then返回值称之为x
        let x = onFulfilled(this.value);
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject);
      } else if (this.status == REJECTED) {
        onRejected(this.reason);
      } else if (this.status == PENDING) {
        /**
         * 此处有修改，因then立即执行，则状态为pending,将成功和失败的回调存储起来。
         * 若干秒后，在resolve后reject函数中执行存储函数
         * */
        this.onFulfilledCallbacks.push(() => {
          return onFulfilled(this.value);
        });
        this.onRejectedCallbacks.push(() => {
          return onRejected(this.reason);
        });
      }
    });

    return promise2;
  }
}

// 循环引用报错
// let p = new Promise(resolve=>{
//     resolve(0)
// });
// let p2 = p.then(data => {
//     // 循环引用，自己等待自己完成
//     return p2;
// })

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    // reject报错
    return reject(new TypeError("chaining cycle detected for promise"));
  }

  // 防止多次调用
  let called;
  //  x不是null 且x是对象或者函数
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      // A+规定， 声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise
      if (typeof then == "function") {
        // 让then执行 第一个参数是this 后面为成功回调 和 失败回调
        // y就是then中的callback
        then.call(
          x,
          (y) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err); // 失败了便报错
          }
        );
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了即不再继续执行
      reject(e);
    }
  } else {
    // 若为普通值，则直接返回x
    resolve(x);
  }
}
```

#### 为参数设置可选

 then中的两个参数，如果不是函数，则直接返回value

```js
  then(onFulfilled, onRejected) {
        // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;
        // onRejected如果不是函数，就忽略onRejected，直接扔出错误
        onRejected = typeof onRejected === "function" ? onRejected : (err) => {throw err;};
    // ...
  }
```

且切记一点，onFulfilled和onRejected不能同步被调用，必须异步调用。我们用setTimeout解决异步问题。



```js
  const promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            // 需要改变的地方,第一个then返回值称之为x
            let x = onFulfilled(this.value);
            // resolvePromise函数，处理自己return的promise和默认的promise2的关系
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            console.log(e);
          }
        }, 0);
      } else if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            // 需要改变的地方,第一个then返回值称之为x
            let x = onRejected(this.reason);
            // resolvePromise函数，处理自己return的promise和默认的promise2的关系
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            console.log(e);
          }
        }, 0);
      } else if (this.status == PENDING) {
        /**
         * 此处有修改，因then立即执行，则状态为pending,将成功和失败的回调存储起来。
         * 若干秒后，在resolve后reject函数中执行存储函数
         * */
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              // 需要改变的地方,第一个then返回值称之为x
              let x = onFulfilled(this.value);
              // resolvePromise函数，处理自己return的promise和默认的promise2的关系
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              console.log(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              // 需要改变的地方,第一个then返回值称之为x
              let x = onRejected(this.value);
              // resolvePromise函数，处理自己return的promise和默认的promise2的关系
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              console.log(e);
            }
          }, 0);
        });
      }
    });

```





## 完整代码

```js
// 定义常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 创建MyPromise class
class MyPromise {
  // 传入回调函数
  constructor(executor) {
    // 立即执行
    executor(this.resolve, this.reject);
  }

  status = PENDING; // 初始化状态

  onFulfilledCallbacks = []; // 存储成功回调

  onRejectedCallbacks = []; // 存储失败回调

  value = null; // 状态转变为成功的值

  reason = null; // 状态转变为失败的值

  /**
   * 在这里是用箭头函数，可以指向实例对象
   * 而普通函数会指向window或者undefined;
   */

  // 更改成功后的状态
  resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = val;

      // 若实例中执行的是异步逻辑
      this.onFulfilledCallbacks.forEach((item) => item());
      this.onFulfilledCallbacks = []; // 循环完置空
    }
  };

  // 更改失败后的状态
  reject = (val) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.value = val;
      // 若实例中执行的是异步逻辑
      this.onRejectedCallbacks.forEach((item) => item());
      this.onRejectedCallbacks = []; // 循环完置空
    }
  };

  /**
   * 两个参数
   * 状态为成功时返回调用第一个
   * 状态为失败时返回调用第二个
   * */
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    // 为了链式调用，这里直接创建一个 MyPromise, 并在后面 return 出去
    // 以下是立即执行的
    const promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            // 需要改变的地方,第一个then返回值称之为x
            let x = onFulfilled(this.value);
            // resolvePromise函数，处理自己return的promise和默认的promise2的关系
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            console.log(e);
          }
        }, 0);
      } else if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            // 需要改变的地方,第一个then返回值称之为x
            let x = onRejected(this.reason);
            // resolvePromise函数，处理自己return的promise和默认的promise2的关系
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            console.log(e);
          }
        }, 0);
      } else if (this.status == PENDING) {
        /**
         * 此处有修改，因then立即执行，则状态为pending,将成功和失败的回调存储起来。
         * 若干秒后，在resolve后reject函数中执行存储函数
         * */
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              // 需要改变的地方,第一个then返回值称之为x
              let x = onFulfilled(this.value);
              // resolvePromise函数，处理自己return的promise和默认的promise2的关系
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              console.log(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              // 需要改变的地方,第一个then返回值称之为x
              let x = onRejected(this.value);
              // resolvePromise函数，处理自己return的promise和默认的promise2的关系
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              console.log(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    // reject报错
    return reject(new TypeError("chaining cycle detected for promise"));
  }

  // 防止多次调用
  let called;
  //  x不是null 且x是对象或者函数
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      // A+规定， 声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise
      if (typeof then == "function") {
        // 让then执行 第一个参数是this 后面为成功回调 和 失败回调
        // y就是then中的callback
        then.call(
          x,
          (y) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err); // 失败了便报错
          }
        );
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了即不再继续执行
      reject(e);
    }
  } else {
    // 若为普通值，则直接返回x
    resolve(x);
  }
}

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000);
});

function other() {
  return new MyPromise((resolve, reject) => {
    resolve("other");
  });
}

function other2() {
  return new MyPromise((resolve, reject) => {
    resolve("other2");
  });
}

promise
  .then((res) => {
    console.log("resolve", res); // success
    return other();
  })
  .then((res) => {
    console.log("resolve2", res); // resolve2 other
    return other2();
  })
  .then((res) => {
    console.log("resolve3", res); // resolve3 toher2
  });

```





## 手写思路总结

1. 标明三种状态:Pending、Fulfilled、Rejected
2. Promise传入1个参数，该参数为callback,参数为resolve和reject，这两个值为可选值。
3. then函数传入2个参数，第一个是状态成功后的callback,第二个是状态失败后的回调。then只会返回一种状态。
4. 考虑到异步逻辑在Promise的callback中，因此成功函数和失败函数需要存储，以数组形式保存。等到异步操作执行完，再挨个执行成功/失败函数。
5. 为then做链式调用，需要then中返回一个MyPromise实例，称之为promise2。
6. 设x为第一个成功时的回调函数，编写一个resolvePromise来判断x，为then的下一步编写逻辑。
7. x不能为null,当x与Promise2全等时，将进入循环，这种情况将抛出错误。
8. 当x有then方法，且then方法的类型为function时，将执行then方法，指向x。
9. 需要设置一个called，表示状态是否已定，pending定向了Fulfilled，或是定向了Rejected。
10. 因为onFulfiiled和onRejeted不能同时走，需要在promise2函数中每一步做setTimout异步处理。

