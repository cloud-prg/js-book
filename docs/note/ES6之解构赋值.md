---
title: 解构赋值
author: 云上舟
date: "2022-03-21"
---



# 解构赋值的定义

  ES6允许按照一定模式，从**数组**或者**对象**中提取值，对变量进行赋值，这被称为结构(Destructuring)。

```js
// 简单示例
let a =1,b=2,c=3;

//等同于 let [a,b,c] = [1,2,3];
```



## 数组的解构赋值

1. 等号左右必须时数组形式，否则会报错

   ```js
   // error
   let [foo] = 1;
   let [foo] = false;
   let [foo] = NaN;
   let [foo] = undefined;
   let [foo] = null;
   let [foo] = {};
   ```

2. 如果解构不成功，那么变量的值将默认为undefined

   ```js
   let [foo] = [];
   let [bar,abc] = [1];
   
   console.log(foo); // undefined
   console.log(abc); // undefined
   ```

3. 等号右边的值，只要是含有Iterator的某种数据结构，都可以采用数组形式解构赋值。

   ```js
   let [x,y,z] = new Set(['a','b','c']);
   x // "a"
   ```

4. 解构赋值允许变量拥有默认值,但要注意只有当右边赋值**严格等于**undefined,默认值才能生效。

   ```js
   let [foo = true] = [];
   console.log(foo); // true
   
   let [a,b=2] = [1];
   console.log(a,b); // 1 2
   
   // 右边的值严格等于undeinfed
   let [c=1] = [null]; 
   console.log(c); // null
   
   ```

5. 默认值可为其他变量所引用，但必须声明。且声明是按从左往右的次序排。

   ```js
   let [x = 1, y = x] = [];     // x=1; y=1
   let [x = 1, y = x] = [2];    // x=2; y=2
   let [x = 1, y = x] = [1, 2]; // x=1; y=2
   let [x = y, y = 1] = [];     // ReferenceError: y is not defined
   ```

## 对象的解构赋值

1.   对象的解构赋值不同于数组的解构赋值。数组的元素按次序排列，因此变量取值由相应的位置决定。而对象的属性没有次序这一判断，变量和属性要同名，才能取到正确的值。

   ```js
   let {bar,foo} = {foo:'aaa',bar:'bbb'};
   console.log(foo,bar); // aaa bbb
   
   let { baz } = { foo:'aaa', bar:'bbb' };
   baz // undefined
   ```

2. 可直接用在现有对象身上

   ```js
   let {log} = console;
   let {floor,max,min} = Math;
   ```

3. 解构赋值的内部机制: 先找到同名属性，再赋值给对应(**如果变量起了新变量名，则只赋值给新变量名**)的变量。

   ```js
   let {foo:bbb} = {foo:'aaa', bar:"ccc"};
   console.log(foo); // foo is not defined
   console.log(bbb); // 'aaa'
   ```

4. 嵌套赋值

   ```js
   let obj = {};
   let arr = [];
   
   ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
   
   obj // {prop:123}
   arr // [true]
   
   // 报错
   let {foo: {bar}} = {baz: 'baz'};
   ```

5. 可设置默认值，生效条件是右侧值严格等于undefined

   ```js
   var {x = 3} = {};
   x // 3
   
   var {x, y = 5} = {x: 1};
   x // 1
   y // 5
   
   var {x: y = 3} = {};
   y // 3
   
   var {x: y = 3} = {x: 5};
   y // 5
   
   var { message: msg = 'Something went wrong' } = {};
   msg // "Something went wrong"
   
   
   // 严格等于undefined才能触发默认值
   var {x = 3} = {x: undefined};
   x // 3
   
   var {x = 3} = {x: null};
   x // null
   ```

6. 对于已经声明的变量a，且解构赋值时用到了与该变量名相同的变量。则需要在外边添加括号。防止被JS解读为代码块

   ```js
   // 错误的写法
   let x;
   {x} = {x: 1};
   // SyntaxError: syntax error
   ```

   <br />

   正确的写法

   ```js
   // 正确的写法
   let x;
   ({x} = {x: 1});
   ```

7. 解构赋值允许左侧变量名为空。语法合法。

   ```js
   ({} = [true,false]);
   ({} = "abc");
   ({} = []);
   ```

8. 数组本质上是特殊的对象，因此可以解构赋值给对象

   ```js
   let arr = [1,2,3];
   let {0:first, [arr.length-1]:last} = arr;
   // 这里的0，指的是下标，first指的才是变量。
   console.log(first); // 1
   console.log(last); // 3
   ```

## 字符串的解构赋值

1. 字符串被转换成了类似数组的对象，每个字符可以被拆解成一个个数组元素被赋值.

   ```js
   const [a, b, c, d, e] = 'hello';
   a // "h"
   b // "e"
   c // "l"
   d // "l"
   e // "o"
   ```

2. 类数组对象还拥有length属性，因此还可以对这个属性解构赋值

   ```js
   let {length : len} = "hello";
   len // 5
   ```



## 数值和布尔值的解构赋值

1. 如果等号右边是数值或者布尔值，则会转为对象。

   ```js
   let {toString : s} = 123;
   s === Number.prototype // true
   // 这里的toString是123转为对象的方法，s才是变量，被赋值。
   
   
   let {toString: s} =true;
   s === Boolean.prototype.toString // true
   ```

2. 但null和undefined无法转换成对象，因此对他们解构赋值会报错。

   ```js
   let {prop: x} = undefined; // TypeError
   let {prop: y} = null; // TypeError
   ```

## 函数参数的解构赋值

1. 函数参数也能解构赋值

   ```js
   function add([x,y]){
   return x + y;
   }
   
   add([1,2]); // 3
   ```

   ```js
   [[1, 2], [3, 4]].map(([a, b]) => a + b);
   // [ 3, 7 ]
   ```

2. 函数参数也可以有默认值

   ```js
   function move({x = 0, y = 0} = {}) {
     return [x, y];
   }
   
   move({x: 3, y: 8}); // [3, 8]
   move({x: 3}); // [3, 0]
   move({}); // [0, 0]
   move(); // [0, 0]
   ```

   ```js
   // undefined会触发函数的默认值
   [1, undefined, 3].map((x = 'yes') => x);
   // [ 1, 'yes', 3 ]
   ```

## 不能使用圆括号的情况

  不论是变量声明，还是函数参数，还是对象赋值，一律不能放在圆括号内。否则将引起报错。

```js
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };

// ------------------------------
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }

// ----------------------
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];

// -----------------------
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```

## 可以使用圆括号的情况

  赋值语句的非模式部分，可以使用圆括号.

```js
// 这一段难以理解
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是`p`，而不是`d`；第三行语句与第一行语句的性质一致。



## 用途

1. 交互变量值

2. 快速从JSON中取出数据

3. 方便将参数的变量名对应起来

4. 定义参数的默认值。

5. 遍历map结构

   ```js
   const map = new Map();
   map.set('first', 'hello');
   map.set('second', 'world');
   
   for (let [key, value] of map) {
     console.log(key + " is " + value);
   }
   // first is hello
   // second is world
   ```

6. 输入模块的指定方法

   ```js
   const { SourceMapConsumer, SourceNode } = require("source-map");
   ```

   

