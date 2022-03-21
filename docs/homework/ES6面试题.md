---
title: ES6面试题
author: 云上舟
date: "2022-03-20"
---

[[toc]]

## 说明数组中 map 和 forEach 的区别？

map 和 forEach 同为 ES6 中操作数组的 api，内部参数是一个 callback 函数，参数都是 item、index（对应的是数组元素的值和下标）。

而**区别**在于 map**有返回值**，forEach**没有返回值**。如果打印 arr.map，则会发现打印出的是一个数组，每一个数组元素都是每一轮遍历的返回值。而打印 forEach 只会打印出 undefined。

```js
let arr = [1, 2, 3, 4];
let arr2 = arr.map((item) => item * 2);
let arr3 = arr.forEach((item) => item * 2);

console.log(arr); // [1,2,3,4],说明map、forEach不会对原数组改变
console.log(arr2); // [2,4,6,8] 说明map创建了新数组，并将返回值作为数组元素。
console.log(arr3); // undefined 说明forEach没有返回值。
```

:::warning

map 不会改变原数组，他会创造一个新数组来保存每一轮遍历的返回值作为数组元素。

:::

## 数组的 find 中，如果有两个以上条件满足，则返回?

则会返回第一个满足条件的数组元素，且跳出循环。

```js
/**
 * 对调12和130的位置，可以发现find只要满足条件，则跳出并返回。
 */

const array1 = [5, 12, 8, 130, 44];
const array2 = [5, 130, 8, 12, 44];
const found = array1.find((element) => element > 10);
const found2 = array2.find((element) => element > 10);

console.log(found);
// expected output: 12

console.log(found2);
// expected output: 130
```

## 解释说明 js 的深拷贝和浅拷贝的区别

js 中的直接拷贝，指的是**要拷贝的变量**的内存指针 指向了**被拷贝的变量**在栈中内存地址。如果**被拷贝的变量**是基本类型，那么将直接拷贝其值。但如果**被拷贝的变量**是个引用类型，则两个变量的内存指针将指向同一内存地址，这将导致他们共享一个对象，哪个变量改变了对象，另一个将同时受到影响。为解决互相影响的问题，便引入了浅拷贝、深拷贝。

### 什么是浅拷贝？

浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

### 什么是深拷贝？

深拷贝指的是将一个对象从内存中完整的拷贝出来，从堆内存中开辟一个新的区域放新对象，且新对象将不会影响旧对象。

### 两者的区别

浅拷贝：重新在堆中创建内存，基本类型数据的改变互不影响，但引用类型数据改变将互相影响，因为他们共用一块内存

深拷贝：将开辟一块新区域放对象，且对这个对象进行深层递归拷贝。因此不论原变量是基本类型还是引用类型，变量改变都将互不影响。

### 浅拷贝举例

```js
// 浅拷贝的实现
function shallowCopy(obj) {
  let cache = {};

  for (let item in obj) {
    if (item in obj) {
      cache[item] = obj[item];
    }
  }

  return cache;
}

// 引用类型案例
let originObj = { a: 1, b: 2, c: [1, [2, 3], 4] }; // 原数据
let copyObj = originObj; // 直接拷贝
let shallowCopyObj = shallowCopy(originObj); // 浅拷贝

// 引用类型第一层改变
originObj.a = 11;
originObj.b = 33;

// 引用类型第二层改变
originObj.c[1] = [666, 666];

/**
 * 可以看到直接拷贝的数据，引用类型内的数据与原类型修改一致
 * 而浅拷贝的数据，第一层则不受影响，但深层依然受影响。
 */

console.log(originObj); // { a: 11, b: 33, c: [ 1, [ 666, 666 ], 4 ] }
console.log(copyObj); // { a: 11, b: 33, c: [ 1, [ 666, 666 ], 4 ] }
console.log(shallowCopyObj); // { a: 1, b: 2, c: [ 1, [ 666, 666 ], 4 ] }
```

<br />

### 深拷贝举例

因为 js 的特性靠 Object.assign，展开运算符...拷贝的不会那么深，有时候会 null，undefined，function，1000 层嵌套这些都拷贝不到，所以这时候就需要深拷贝了，深拷贝是很难写的，得用递归函数一次一次的嵌套+判断来写

```js
// 深拷贝的实现
function deepCopy(obj) {
  // 因需要用到递归拷贝，所以需要对参数判断
  if (typeof obj == null) return obj;
  if (obj instanceof Date) return obj;
  if (obj instanceof RegExp) return obj;
  if (typeof obj != "object") return obj;

  // 赋值参数类型，是{}还是[]
  let cache = new obj.constructor();

  for (let item in obj) {
    if (item in obj) {
      // 在浅拷贝的基础上微调，对赋值进行递归，达到深拷贝效果。
      cache[item] = deepCopy(obj[item]);
    }
  }

  return cache;
}

// 引用类型案例
let originObj = { a: 1, b: 2, c: [1, [2, 3], 4] }; // 原数据
let copyObj = originObj; // 直接拷贝
let deepCopyObj = deepCopy(originObj); // 浅拷贝

// 引用类型第一层改变
originObj.a = 11;
originObj.b = 33;

// 引用类型第二层改变
originObj.c[1] = [666, 666];

/**
 * 可以看到直接拷贝的数据，引用类型内的数据与原类型修改一致
 * 而浅拷贝的数据，第一层则不受影响，但深层依然受影响。
 */

console.log(originObj); // { a: 11, b: 33, c: [ 1, [ 666, 666 ], 4 ] }
console.log(copyObj); // { a: 11, b: 33, c: [ 1, [ 666, 666 ], 4 ] }
console.log(deepCopyObj); // { a: 1, b: 2, c: [ 1, [ 2, 3 ], 4 ] }
```

### 浅拷贝的方法有哪些？

1. Object.assign，对象合并 API

   ```js
   let obj1 = { a: 1, b: 2, c: { name: "Bob", age: 11 } };
   let obj2 = Object.assign({}, obj1); // 将obj2与{}合并

   obj1.a = 1111;
   obj1.b = 2222;
   obj1.c.name = "CCC";

   console.log(obj1); //{ a: 1111, b: 2222, c: { name: 'CCC', age: 11 } }
   console.log(obj2); //{ a: 1, b: 2, c: { name: 'CCC', age: 11 } }
   ```

2. 展开运算符...

   ```js
   let obj1 = { a: 1, b: 2, c: { name: "Bob", age: 11 } };
   let obj2 = { ...obj1 }; // 展开obj1

   obj1.a = 1111;
   obj1.b = 2222;
   obj1.c.name = "CCC";

   console.log(obj1); //{ a: 1111, b: 2222, c: { name: 'CCC', age: 11 } }
   console.log(obj2); //{ a: 1, b: 2, c: { name: 'CCC', age: 11 } }
   ```

3. Array.prototype.concat

   ```js
   let array1 = [1, { a: 1, b: 2 }, 4];
   let array2 = array1.concat(); // 将{}与array1合并

   array2[0] = 1111;
   array2[2] = 2222;

   array2[1].a = 5555;

   console.log(array1); // [ 1, { a: 5555, b: 2 }, 4 ]
   console.log(array2); // [ 1111, { a: 5555, b: 2 }, 2222 ]
   ```

4. Array.prototype.slice()

   ```js
   let array1 = [1, { a: 1, b: 2 }, 4];
   let array2 = array1.slice(); // 将{}与array1合并

   array2[0] = 1111;
   array2[2] = 2222;

   array2[1].a = 5555;

   console.log(array1); // [ 1, { a: 5555, b: 2 }, 4 ]
   console.log(array2); // [ 1111, { a: 5555, b: 2 }, 2222 ]
   ```

### 深拷贝的实现方式有哪些？

1. JSON.parse(JSON.stringify()),利用 JSON.stringify 将对象转成 JSON 字符串，再用 JSON.parse 把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

   ```js
   let array1 = [1, { a: 1, b: 2 }, 4];
   let array2 = JSON.parse(JSON.stringify(array1));

   array2[0] = 1111;
   array2[2] = 2222;

   array2[1].a = 5555;

   console.log(array1); // [ 1, { a: 1, b: 2 }, 4 ]
   console.log(array2); // [ 1111, { a: 5555, b: 2 }, 2222 ]
   ```

## 说明 es6 中箭头函数的特点和作用

1.  箭头函数没有原型，意味着它本身没有 this 指向。

```js
let a = () => {};
console.log(a.prototype); // undefined
```

2. 箭头函数的 this 指向定义为离他外层最近一层的普通函数，即继承外层第一层普通函数的 this。

   ```js
   let a,
     barObj = { msg: "bar的this指向" };
   fooObj = { msg: "foo的this指向" };
   bar.call(barObj); // 将bar的this指向barObj
   foo.call({}); // 将foo的this指向fooObj
   function foo() {
     a(); // 结果：{ msg: 'bar的this指向' } "this指向定义的时候外层第一个普通函数"
   }
   function bar() {
     a = () => {
       console.log(this, "this指向定义的时候外层第一个普通函数"); //
     }; // 在bar中定义 this继承于bar函数的this指向
   }
   ```

3. 不能直接修改箭头函数的 this 指向，但可以修改调用它的外层的普通函数的 this 指向，达到间接修改箭头函数 this 指向的效果

   ```js
   bar.call(fooObj); // 将bar的this指向fooObj

   a(); // 结果：{ msg: 'foo的this指向' } "this指向定义的时候外层第一个普通函数"
   ```

4. 无论在严格模式还是非严格模式，如果箭头函数外层没有普通函数，那么 this 指向全局 **Window**

5. 写法简洁

6. 箭头后没有花括号{}时，默认 return。

## 说明所有 js 类型转换成的布尔值是?

```js
// number
Boolean(0); // false
Boolean(1); // true
Boolean(infinity); // true
Boolean(-1); // true

// string
Boolean(""); // false
Boolean("1"); // true

// null,undeinfed,NaN
Boolean(null); // false
Boolean(undefined); // false
Boolean(NaN); // false

// 引用类型
// 对象，数组，函数
Boolean({}); // true
Boolean([]); // true
Boolean(function () {}); // true
```

## 解释说明什么是递归，并且手写一个递归函数出来

递归，就是声明一个函数后，这个函数返回值是函数本身。一般来说需要带参，通过参数做一些取值逻辑限制，防止无限循环导致 stack 内存溢出。

```js
// 拿斐波那契数列举例
function fibonacci(n) {
  // n小于2时返回n本身，否则返回前两项.
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10)); // 55
```

## 解释说明函数节流和函数防抖，并且分别手写出来。

### 什么是防抖？

当接收到多条同一个执行命令，为了防止用户是操作失误而导致多次执行，则会设定一段时间，延迟命令的输出。在这段时间里，只有最后一次执行命令有效，如果有新的命令输入，则限制时间刷新，且旧执行命令作废，直到没有新命令输入。

```js
// 防抖函数
function debounce(callback, delay) {
  let timeout;
  return function (args) {
    let that = this; // 保存this指向
    let _args = args; // 保存argumens参数组
    clearTimeout(timeout); // 每次触发防抖都将清除旧命令
    timeout = setTimeout(() => {
      callback.call(that, _args);
    }, delay);
  };
}
```

### 什么是节流

在规定的时间内，只能触发一次执行命令，如果触发多次命令，则只有一次生效。

```js
// 节流函数
// 其实现方法中用到的逻辑和防抖很相像
function throttle(func, delay) {
  let begin; // 起始时间
  let timout;

  return function () {
    let that = this;
    let _args = args;
    let now = +new Date(); // 最新时间
    if (begin && now < begin + delay) {
      // 当起始时间存在，且最新时间还在延迟之中
      clearTimeout(timout);
      return (timout = setTimeout(() => {
        begin = now;
        func.apply(that, _args);
      }, delay));
    } else {
      begin = now;
      func.apply(that, _args);
    }
  };
}
```

## 编程题

### 写一个 getColor 函数，返回随机十六进制颜色

```js
// 写一个getColor函数，返回随机十六进制颜色
function getColor() {
  let color;
  color = [...new Array(6)].reduce(
    (pre) => pre + Math.floor(Math.random() * 16).toString(16),
    "#"
  );
  return color;
}

console.log(getColor()); // #de96d5
```
