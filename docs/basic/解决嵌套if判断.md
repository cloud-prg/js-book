---
title: 解决嵌套if判断
author: 云上舟
date: "2022-03-30"
---

[[toc]]


## 问题提出

在业务开发中，如果遇到了 3 个以上的 if，将会怎么处理？在 ES6 版本以前，我是这么写的

```js
// 获取A值
function getAValue() {
  return 1;
}

// 获取B值
function getBValue() {
  return 2;
}

// 获取C值
function getCValue() {
  return 3;
}
function getTest() {
  let a = getAValue();
  if (a == 1) {
    let b = getBValue();
    if (b == 2) {
      let c = getCValue();
      if (c == 3) {
        console.log("测试成功");
      }
    }
  }
}
```

上面的函数是用来测试 get 方法，每调用一次 get，就在下一层级判断是否为特定值。但这样的写法可读性差,耦合程度高不易维护，多层 if 嵌套会让其他的开发者刚接手时看得头疼。

## 解决方法

上述的多层 if 嵌套判断使代码感官上难以阅读，且修改逻辑也难以下手。如果有更多这样的判断，那无疑是"回调地狱"。

针对像这样一层一层判断，然后给出结果，不就是异步编程吗？为了解决“回调地狱”，我们可以使用 ES6 中的**Promise**。

### 什么是 Promise?

Promise,一个用于解决异步编程的函数。它就像一个内部未知的容器，当声明他时，内部容器的状态为 pending(等待)，在做了一些逻辑判断后，状态会变成 resolve(成功)，后者 rejected(失败)。我们来看一个简单例子。

```js
let a = 3;
let p = new Promise((resolve, rejected) => {
  if (a == 1) {
    resolve("a为1");
  }
  rejected("b为2");
});

let p2 = new Promise((resolve, rejected) => {
  if (a == 3) {
    resolve("a为3");
  }
  rejected("b为2");
});
p.then(
  (res) => {
    // 第一个参数打印成功时的状态值
    console.log(res);
    return p2;
  },
  (err) => {
    // 第二个参数打印失败时的状态值
    console.log("err", err); // err b为2
    return p2;
  }
).then((res2) => {
  console.log("res2", res2);
}); // a为3
```

​ 可以看到他有 2 个状态，且 then 方法里有两个参数，第一个参数回调，参数值为 resolve 里传入的值。第二个参数回调，参数值为 rejected 里传入的值。注意！如果想要后续使用 then,则需要在两个回调里分别返回新的 promise。

## 使用 Promise 解决 if 嵌套

知道了 Promise 的基本用法后，我们尝试将它使用在问题提出中的 if 嵌套中，效果如下:

```js
// 返回一个Promise,并在成功里传入对应状态值。

function getAValue() {
  return new Promise((resolve) => {
    resolve(1);
  });
}

function getBValue() {
  return new Promise((resolve) => {
    resolve(2);
  });
}

function getCValue() {
  return new Promise((resolve) => {
    resolve(3);
    console.log("测试成功");
  });
}

function getTest() {
  getAValue()
    .then(getBValue)
    .then(getCValue)
    .catch((err) => {
      console.log(err);
    });
}

getTest(); //测试成功
```

## 总结

1.  当业务中遇到 3 个 if 以上的判断时，我们可以使用 Promise 异步编程函数解决它。
2.  多层 if 嵌套会导致代码可读性低；在运行出错时，调试起来十分麻烦，不好寻找哪一层报错；耦合度高，可能为了改一处逻辑而需要动好几个地方。
3.  Promise 共有三种状态，pending(等待)、resolve(成功)、rejected(失败),在经过逻辑判断后，状态最终将会由 pending 转向其中的一种
4.  若需要在.then 后继续使用.then,则需要在 then 中的参数里返回 promise.
