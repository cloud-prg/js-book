---
title: ES6之变量声明
author: 云上舟
date: "2022-03-19"
---

## let的用法及注意点

let和var一样用来声明变量，其有以下几个不同点:

1. 不允许重复声明
2. 声明时需要确切的值。
3. 不存在变量提升

```js
console.log(foo);
var foo = "a";

//var实际上的声明是
var foo = undeinfed;
console.log(foo);
foo = "a";
//--------------------

//而let不存在变量提升
console.log(bar); // 报错ReferenceError
let bar = 2;

```

2. 作用域为当前代码段

   ```
   var outer = 123;
   console.log(inner); // inner is undefined
   
   function test(){
    console.log(outer); // 123
   }
   ```

3. 在for循环中有特别之处，for中的作用域，与代码块里的作用域是互相独立的。

   ```
   for(let i = 0 ; i< 3;i++) {
     let i = 'abc';
     console.log(i);
   }
   // abc
   // abc
   // abc
   
   ```

4. 暂时性死区

   ```js
   /**
     *  用let声明一个其作用域外已声明过的变量
     *  则作用域内的变量，不再受到外界的影响
     */
   var tmp = 123;
   
   if (true) {
     tmp = 'abc'; // ReferenceError
     let tmp;
   }
   
   ```



:::warning

ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

:::

## const的用法及注意点

const的用法及注意点和let相似，异同点如下:

1. 与let拥有相同作用域。

2. 和let一样，声明时需要确切的值。

3. const常量并不是绝对保证变量无法改动。而是保证找个变量指向的内存地址所保存的数据无法改动。但如果是引用类型，则涉及到堆内存，那么堆内存中的数据将可以改动。

   ```js
   const a = [];
   a.push('Hello'); // 可执行
   a.length = 0;    // 可执行
   a = ['Dave'];    // 报错
   ```

   



# ES6中有几种声明方式?

  一共有6种，分别是var、function、let、const、class、import。



# 全局变量

  JS中除了有var这样声明全局变量，还有顶层对象window,如果给window添加属性，则会和全局变量混淆，这是**JS中设计失误的地方。**

```
window.a = 1;
a // 1

a = 2;
window.a // 2
```

<br />

但好在**let**可以解决var污染顶层对象属性这一情况

```
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```



:::tip

​	并非所有环境下(Node、Web Worker)都拥有window，因此ES2020中引入globalThis作为顶层对象，以保证适配各种环境。

:::

