
# 序言
## 题目要求

​	实现一个maxRequest 成功后resolve结果,失败后重试n次才真正reject。

## 答案解析

```js
/**
 * 实现一个maxRequest 成功后resolve结果,失败后重试n次才真正reject。
 * @param {function} fn
 * @param {number} n
 * */

/**
 * 返回一个Promise实例，在实例内部声明help函数
 * 在里面做一个Promise.resolve立即执行
 * 如果正常运行，走then，则结束流程
 * 如果报错，走了catch，则提示剩余次数，并减少一次，再次调用help
 * */ 

function maxRequest(fn, maxNum = 3) {
  return new Promise((resolve, reject) => {
    function help(index) {
      // 注意这里传的fn，为执行的fn，为了在then中拿到它的value
      Promise.resolve(fn())
        .then((value) => {
          console.log("ok");
          resolve(value);
        })
        .catch((err) => {
          console.log("重试剩余次数:", index);

          if (index - 1 > 0) {
            help(index);
          } else {
            reject(err);
          }
        });
    }

    help(maxNum);
  });
}

function add() {
  return 1 + 3;
}

let result = maxRequest(add, 3);
let res =result.then(value=>{
   console.log(value); // 4
})

```

## 思路要点

 在Promise实例的内部声明函数，则可以通过这个函数的逻辑，来决定状态走向Fulfilled或者Rejected。
