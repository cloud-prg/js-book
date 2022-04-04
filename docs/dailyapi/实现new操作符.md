---
title: 序言
author: 云上舟
date: "2022-03-25"
---



## 题目要求
实现一个new 操作符。


## 答案解析

```js
// 题目:创建一个new操作符

/**
 * @param {function} fn
 * @param {arguments} args 类数组
 * @param {Array} ...args
 */
 function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...args);
  if (res && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}
function student(name, age) {
  this.name = name;
  this.age = age;
}
student.prototype.doSth = function () {
  console.log(this.name);
};

let stu = myNew(student, "懒懒", 123);
console.log(stu) // {name:"懒懒", age:123}


```




## 思路要点

- 创建一个新的对象
- 继承父类原型上的方法.
- 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
- 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。
- **`Object.create()`**方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
