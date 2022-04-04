---
title: 序言
author: 云上舟
date: "2022-03-30"
---

## 题目要求
手写一个ajax.


## 答案解析



```js
/**
 * 实现一个maxRequest 成功后resolve结果,失败后重试n次才真正reject。
 * @param {function} fn
 * @param {number} n
 * */

/**
 * 依靠XMLHttpRequest(异步) 配合 Promise完成
 */
function fAjax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
}

async function getData(){
  let res = await fAjax("/getList");
  return res;
}
```




## 思路要点

- 当 `readyState` 的值改变的时候，`*callback*` 函数会被调用。
- 需要用到的api,及api里的方法，属性
  - XMLHttpRequest
    - open(method,url, isAsync) 设置方法，请求资源定位符，是否使用异步
    - setRequestHeader("Content-Type","application/json") 设置请求头 类型 内容
    - onreadystatechange = callback()  设置当readyState改变时需要做什么样的回调
    - send() 发送
    - status 状态码
    - readyState 准备状态码
    - 响应文本

