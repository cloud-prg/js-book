---
title: new操作符
author: 云上舟
date: "2022-04-22"
---

[[toc]]

## 什么是new?
**new运算符**创建了一个用户定义的**对象类型** (Object)的实例，或具有**构造函数的内置对象**(xxx.prototype)的实例。

## new的参数
- `constructor` 
一个指定对象实例的类型的 **类**或**函数**
- `arguments`
一个用于被`constructor`调用的参数列表。

## new关键字做了什么？
1. 创建一个空的简单JavaScript对象(即{});
2. 为**空对象**添加属性__proto__,将该属性链接至 构造函数的原型对象
3. 将步骤1新创建的对象作为 **this** 的上下文
4. 如果该函数没有返回对象，则返回 **this**


## 手写实现new

根据new所做的事情。代码将一步步注释分明地写出，并与原生new的效果作对比。
```js
// 手写new代码
function myNew(fn) {
  // 判断fn是否为function
  if (typeof fn !== "function") {
    throw "fn is not a function";
  }

  // 创建一个空对象
  let obj = new Object();
  // 将空对象的__proto__与fn的prototype做链接
  obj.__proto__ = fn.prototype;

  /**
   * 或者上述两步合并成: let obj = Object.create(fn.prototype)
   * Object.create，规定第一个参数为原型，并将其作为新对象的__proto__
   * */

  // fn传参，this指向obj,并且参数排除fn本身。
  let resultObj = fn.apply(obj, [...arguments].slice(1));

  // 当结果为对象类型时，返回该结果，否则返回Obj自身
  if (typeof resultObj === "object" && typeof resultObj === "function") {
    return resultObj;
  }

  return obj;
}
 
```

### 示例
```js
function Person(name){
	this.name = name;
	return name;
}

// new是创建实例
// 而不是执行函数并给变量赋值它的返回值。
let p1 = new Person("zhngsan");
let p2 = myNew(Person,"zhangsan");


console.log(p1); // Person {name:"zhangsan"};
console.log(p2); // Person {name:"zhangsan"};

```
## 总结
1. new操作符所创建的实例对象，其__proto__指向构造函数的prototype(即**原型**)
2. 如果函数没有返回对象类型Object(包含**Functoin**, **Array**, **Date**, **RegExg**, **Error**)，那么new表达式中的函数调用会自动返回这个新的对象。
3. `Object.create(xxx.prototype)`可以看作是`let obj = new Object()`加上`obj.__proto__ = xxx.prototype`的合并版。

## 参考文献
1. [new操作符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
2. [面试官问：能否模拟实现JS的new操作符](https://juejin.cn/post/6844903704663949325#heading-7)