---
title: ES6之变量声明
author: 云上舟
date: "2022-03-19"
---

[[toc]]

## var的用法及注意点

 var声明在函数内属于**局部变量**，仅在函数的作用域内可访问。在函数之外则属于**全局变量**，顾名思义，var声明的变量影响至全局（比如A module、b module被引入一个文件，倘若AB声明了同名变量，则按照先后顺序，前者声明将被后者覆盖。）。除此之外，var还有几个特性:

1. 具有变量提升，例如声明a，js允许var声明没有初始值，默认为undefined。

   ```js
   var a = 2;
   //实际上是
   var a; // undefined
   a=2;
   ```

   ```js
   function foo(){
       let name = "李斯特";
       // var dd; //变量提升
       if(name == "奥尔莱"){
           var dd = 4;
       }
       console.log("dd",dd); // dd undeinfed
       
   }
   ```

2. 可以重复声明

   ```js
   var c = 1;
   var c = 2;
   var c = 3;
   console.log(c) // 3
   ```

3. js设计上的缺陷，顶层对象属性会被var声明所覆盖

   ```js
   // 浏览器的顶层对象是window,Node的是global
   window.a = 2;
   var a = 3;
   console.log(a); // 3;
   ```



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

   ```js
   var outer = 123;
   console.log(inner); // inner is undefined
   
   function test(){
    console.log(outer); // 123
   }
   ```

3. 在for循环中有特别之处，for中的作用域，与代码块里的作用域是互相独立的。

   ```js
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

2. 声明时需要确切的值。

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

```js
window.a = 1;
a // 1

a = 2;
window.a // 2
```

<br />

但好在**let**可以解决var污染顶层对象属性这一情况

```js
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

