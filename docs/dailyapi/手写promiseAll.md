---
title: 手写promise.all方法
author: 云上舟
date: "2022-04-08"
---



## 题目要求
手写一个Promise.all。


## 答案解析
```js
/**
 * promise.all的特点是，如果都是resolve,则.then继续执行
 * 其中碰到reject，则直接返回错误err。
 */
function promiseAll(arr) {
  let resultArr = []; // 存放resolve结果

  // 考虑到数组为空情况
  if (arr.length == 0) throw Error("数组不能为空");

  // 如果数组元素不是Promise
  arr.forEach((item) => {
    console.log(item, item instanceof Promise);
    if (!(item instanceof Promise)) throw Error("数组元素存在非Promise类型");
  });

  return new Promise((resolve, reject) => {
    /**
     * 迭代每个Promise,如果全部resolve,则用长度判断是否结束，并resolve返回结果。
     * 如果碰到错误，则直接返回reject。
     */
    arr.forEach((p) => {
      Promise.resolve(p).then(
        (res) =>
          resultArr.push(res) &&
          resultArr.length == arr.length &&
          resolve(resultArr),
        (err) => reject(err)
      );
    });
  });
}

```

## 测试用例

```js

const p1 = new Promise((resolve) => {
  resolve(11);
});

const p2 = new Promise((resolve) => {
  resolve(22);
});

// 未处理的reject，node将会提示
const p3 = Promise.reject("3333");

const p4 = new Promise((resolve) => {
  resolve(44);
});

promiseAll([p1, p2, p4]).then(
  (res) => {
    console.log(res); // [ 11, 22, 44 ]
  },
  (err) => {
    console.log(err);
  }
);

promiseAll([p1, p3, p4]).then(
  (res) => {
    console.log(res); // [ 11, 22, 44 ]
  },
  (err) => {
    console.log(err); // 3333
  }
);

// 抛出报错 Error: 数组不能为空
promiseAll([]).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

// 抛出报错 Error: 数组元素存在非Promise类型
promiseAll([1, 2, 3]).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);


```


## 思路要点

1. promise.all接收一个数组类型的参数，里面存放Promise。
2. .all()之后可以使用.then，因此all方法返回一个Promise。
3. 当数组内所有的Promise返回resolve,则.all后的.then第一个参数返回一个数组，数组内部保存每一个resolve的结果
4. 当数组内存在一个或多个reject，则.all后的.then第二个参数返回第一个reject的信息。
