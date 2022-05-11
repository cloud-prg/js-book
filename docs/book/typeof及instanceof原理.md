---
title: typeof及instanceof原理
author: 云上舟
date: "2022-05-11"
---

[[toc]]

## typeof 的定义
typeof 操作符返回一个字符串，表示未经计算的操作数的类型。
### 返回的类型有哪些？
**注意**：判断操作符类型返回的字符串，都是**类型**的 **字母小写**。
1. Undefined
2. Null
3. Boolean
4. Number
5. BigInt
6. String
7. Symbol
8. Function 对象
9. 其他任何对象

### 如何使用typeof?
`typeof`运算符后接操作数:
```js
typeof operand
typeof(operand)
```
### 示例
```js
// 数值
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof(42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number'; // Number 会尝试把参数解析成数值

typeof 42n === 'bigint';


// 字符串
typeof '' === 'string';
typeof 'bla' === 'string';
typeof `template literal` === 'string';
typeof '1' === 'string'; // 注意内容为数字的字符串仍是字符串
typeof (typeof 1) === 'string'; // typeof 总是返回一个字符串
typeof String(1) === 'string'; // String 将任意值转换为字符串，比 toString 更安全


// 布尔值
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(1) === 'boolean'; // Boolean() 会基于参数是真值还是虚值进行转换
typeof !!(1) === 'boolean'; // 两次调用 ! (逻辑非) 操作符相当于 Boolean()


// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';


// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined';


// 对象
typeof {a: 1} === 'object';

// 使用 Array.isArray 或者 Object.prototype.toString.call
// 区分数组和普通对象
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';
typeof /regex/ === 'object'; // 历史结果请参阅正则表达式部分


/**
  *  new操作符会生成一个新对象，继承目标函数的prototype。因此它算Object类型。
  *  除 Function 外的所有构造函数的类型都是 'object'
  */
var str = new String('String');
var num = new Number(100);

typeof str; // 返回 'object'
typeof num; // 返回 'object'

var func = new Function();

typeof func; // 返回 'function'


// 函数
typeof function() {} === 'function';
typeof class C {} === 'function'
typeof Math.sin === 'function';


```
## 底层原理
 js在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息。👇
 - 000: 对象
 - 010：浮点数
 - 100： 字符串
 - 110： 布尔
 - 1： 整数
<br />
但机器码对于`undefined`和`null`的信息存储处理是特殊的。
- `null`: 所有机器码均为0
- `undefined`: 用-2^30整数来表示
因此，`typeof`在判断`null`时，将他归类到**对象**类型。**这也是javascript的历史遗留bug**。所以建议`typeof`只用于判断**基本类型**。

## Object原型方法判断类型
`Object.prototype.toString`，我们可以利用这个方法来对一个变量的类型来进行比较准确的判断。
```js
Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"

```

### 手写typeof
```js
function myTypeof(obj){
	return Object.prototype.toString.call(obj).slice(8,-1).toLowrCase();
}
```

## instanceof 操作符的定义
`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。
:::tip
参数:
- `object` 某个实例对象
- `constructor` 某个构造函数
语法: `object instanceof constructor`
:::

### 示例
它可以判断对象的具体类型，也可以判断一个实例是否为它的父类型或者祖先类型的实例。
```js
// 实例类型为构造函数
let person = function () {
}
let nicole = new person()
nicole instanceof person // true

// nicole的实例类型为构造函数，也为构造函数的原型
let person = function () {
}
let programmer = function () {
}
programmer.prototype = new person()
let nicole = new programmer()
nicole instanceof person // true
nicole instanceof programmer // true

```

### 原理实现
```js
function myInstanceof(target , source) {
		let target__proto__ = target.__proto__;
		while(true){
			if(target__proto__=== null) return false;
			if(target__proto__ === source.prototype) return true;
			target__proto__ = target__proto__.__proto__;
		}
}

const Animal = function(name){
	this.name = name;
}

const dog = new Animal("dog");
console.log(myInstanceof(dog, Array));
console.log(myInstanceof(dog, Animal));
console.log(myInstanceof(dog, Object));

```


## 总结
1. `typeof` 的原理是通过**操作符**的尾部三位机器码来判断类型的。
2. `instanceof`的原理是通过判断**实例的隐式原型**是否与**构造函数的原型**相等，若不等，则在实例的原型链上找，直到找到或者隐式原型为null为止。
3. 在使用上，判断**基本类型**时用`typeof`。判断`引用类型`用instanceof。
4. 想要获取**引用类型操作符**的确切类型，可使用`Object.prototype.toString`方法，改变其上下文，使其指向`操作符`,即可。


## 参考文章
1. [浅谈 instanceof 和 typeof 的实现原理](https://juejin.cn/post/6844903613584654344#comment)
2. [typeof @MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#try_it)
3. [instanceof @MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)


