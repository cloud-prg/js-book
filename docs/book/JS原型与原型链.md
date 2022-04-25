---
title: JS原型与原型链
author: 云上舟
date: "2022-04-21"
---

[[toc]]

## 开篇放一张示例图

<img src="https://yunshangzhou.github.io/learn-javascript/proto_photo.jpg" alt="proto show">

##  什么是原型？
JS中的原型分为 **显示原型`prototype`** 以及 **隐式原型`__proto__`**

一般，**构造函数**的prototype和其**实例**的`__proto__`是指向同一个地方的，这个地方就叫做**原型对象**。

## 什么是构造函数？
通俗的讲，可以用**new**创造出来的函数，就叫做**构造函数**，**箭头函数**不能用来当作构造函数。
```js
function Person(name,age) { // 这个就是构造函数
	this.name = name
	this.age = age
}

const person = new Person('小明',20) // 这个是Person构造函数的实例
```


## 函数
### prototype和_proto_对象的指向
**实例**的__proto__和**构造函数**的prototype指向同一地方（可看完一下例子后看示例图。看示例图)
```js
// 声明一个人物函数
function Person(name, age) {
  this.name = name
  this.age = age
}
// 在该函数的显示原型对象上，添加sayName函数
Person.prototype.sayName = function() {
  console.log(this.name)
}
console.log(Person.prototype) // { sayName: [Function] }

/**
  * 创造person1,person2两个实例。
  * 实例的隐式原型与函数的显示原型，打印的内容相同
  */
const person1 = new Person('小明', 20)
console.log(person1.__proto__) // { sayName: [Function] }

const person2 = new Person('小红', 30)
console.log(person2.__proto__) // { sayName: [Function] }

// 可以看出他们是全等的。
console.log(Person.prototype === person1.__proto__) // true
console.log(Person.prototype === person2.__proto__) // true

```

### 构造函数自身的_proto_指向
**构造函数**自身的`_proto_`指向**原生函数**的`prototype`
```js
function fn1(){
	return "fn1";	
}
function fn2(){
	return "fn2";	
}
// 构造函数自身的隐式对象，指向它的构造它的函数。
console.log(Function.prototype === fn1.__proto__);
console.log(Function.prototype === fn2.__proto__);
```

## 对象
平时创建对象，通常有以下几种方法:
- 构造函数创建对象，他创造出来的对象都是**Function构造函数**的实例。
- 字面量创建对象
- new Object创建对象
- Object.create创建对象，创建出来的是一个**空原型**的对象。
```js
// 第一种：构造函数创建对象
function Person(name){
	this.name = name;
}
const person1 = new Person("宇宙");
console.log(person1) // Perosn {name:"宇宙"}

// 第二种 字面量创建
const person2 = {name:"宇宙"};
console.log(person2) //  {name:"宇宙"}

// 第三种：new Object创建对象
const person3 = new Object()
person3.name="宇宙"
console.log(person3) //  {name:"宇宙"}


// 第四种：Object.create创建对象
const person4 = Object.create({});
person4.name="宇宙"
console.log(person4) //  {name:"宇宙"}
```

:::tip
字面量创建对象，本质是new Object创建对象
:::

### 对象中的构造函数prototype与实例__proto__的关系
上文提到 "构造函数的prototype与实例的__proto__指向同一个地方，这里的person2,person3也即是 **Object构造函数** 的实例
```js
const person2 = {name:"宇宙"}

const person3 = new Object();
person3.name = "宇宙"

console.log(Object.prototype === person2.__proto__); // true
console.log(Object.prototype === perosn3.__proto__); //true

```


## Function和Object
从上文得知
- **函数**是**Function构造函数**的实例
- **对象**是 **Object构造函数**的实例

那问题是，**Function构造函数**和**Object构造函数**是谁的实例？
- function Object()是**Function构造函数**的实例
- functino Function()是 **Function构造函数**的实例,Function构造函数的实例 **它本身**。
```js
console.log(Function.prototype === Object.__proto__)// true
console.log(Function.prototype === Function.__proto__)// true
```

## 构造体constructor

**constructor**和**prototype**是成对的。看个例子:
```js
console.log(fn.prototype) // {constructor: fn}
console.log(fn.prototype.constructor === fn) // true
```
可以得知，**consturctor**是在构造函数的**prototype**上

## 原型链

上文得知 
- **Person.prototype**是**构造函数Prototype**的原型对象。
- **Function.prototype**是**构造函数Function**的原型对象。
另外，**原型对象**的**本质**也是**Object()** 的实例。那么可以得出结论，上面两个原型对象的__proto__都是function Object()的**prototype**。
```js
function Person(){}

console.log(Person.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true

```

## 那原型链的终点在哪？
这个需要将提到**原型继承**，即**实例**可以使用**构造函数**上的属性和方法。
- 在访问实例时，如果实例上没有方法，实例就会去自己的__proto__ (即构造函数的prototype)上面找。
- 如果__proto__没有，那么构造函数会往**创造它**的构造函数上的__proto__ 去找，一级一级往上找（如同作用域从里到外寻找变量一样）。
- 直到最上级的构造函数，它的prototype为null(可看本章的示例图)
```js
function Person(name) { // 构造函数
  this.name = name
}
Person.prototype.sayName = function() { // 往原型对象添加方法
  console.log(this.name)
}


const person = new Person('宇宙') // 实例
// 使用构造函数的prototype中的方法
person.sayName() // 宇宙
person.name // 宇宙
```

## 知识拓展
开发中常用的，如何判断变量是否为某个特定类型，需要用到 **instanceof**,其原理就是用原型来判断。
```js
function Person(){ // 构造函数
retrn "小明"
}

const person = new Person() // 实例

// Person()是构造函数Function()的实例
console.log(Person instanceof Function) // true

// 构造函数Function.prototype是构造函数Object()的实例
console.log(Person instanceof Object) // true


// person.__proto__ === Person.prototype
console.log(person instanceof Person) // true

// person.__proto__.__proto__为Object.prototype
console.log(person instanceof Object) // true

```


## 练习题

### 习题一
```js
var F = function() {};
Object.prototype.a=function(){
console.log('a')
}

Function.prototype.b= fucntion(){
console.log('b')
}

var f= new F();

// 实例f的原型链路径 f.__proto__ === F.prototype
// f.__proto__.__proto__ === Object.prototype
//  f.__proto__.__proto__.__proto__ === null
// 因此始终取不到Function.prototype上的b
f.a(); // a
f.b(); // b is not defined

// 构造函数F的原型链路径
// F.__proto__ === Function.prototype
// F.__proto__.__proto__ === Object.prototype 
// 因此能取到Funtion和Object上的b和a
F.a();// 'a'
F.b();// 'b'

```

### 习题二
```js
// 每new一个实例，实例的__proto__将指向堆中一块独立区域
// 当修改prototype时，前面new过的实例指向不会变，而跟在其后的新实例指向会变。
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();


console.log(b.n); // 1
console.log(b.m); // m is not defined

console.log(c.n); // 2
console.log(c.m); // 3

```
<img src="https://yunshangzhou.github.io/learn-javascript/second_show.png" alt="second show">

### 习题三

```js
var foo = {},
    F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

// foo是字面量创建，即 new Object()
// 得知此点,foo.__proto__ === Object.prototype
console.log(foo.a); // value a
console.log(foo.b); // b is not defined

// F.__proto__ === Function.prototype
// F.__proto__.__proto__ === Object.prototype
console.log(F.a); // value a
console.log(F.b); // value b

```

### 习题四
```js
function A() {}
function B(a) {
    this.a = a;
}
function C(a) {
    if (a) {
        this.a = a;
    }
}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;

console.log(new A().a); // 1
console.log(new B().a); // undeinfed
console.log(new C(2).a); // 2

```

### 习题五

```js
// 123为数字，数字本身没有方法。则去它的__proto__找
// 123["__proto__"] === Number.prototype
// 找到Number.prototype.toString
// 该方法接收一个参数，因此函数长度为1.
console.log(123['toString'].length + 123) // 124
```
:::tip
函数的长度由接收参数决定。接收1个参数，则长度为1，2个则为2。
:::
:::tip
在各类型的构造函数中，只有Number的toString有接收参数（长度为1）
```js
Number.prototype.toString.length 1
Function.prototype.toString.length 0
Object.prototype.toString.length 0
Array.prototype.toString.length 0
```
:::

## 总结
1. 所有构造函数都是Function的实例，所有原型对象都是Object的实例除了Object.prototype自身。
2. constructor属性本质上是只有prototype对象才有的，也就是构造函数.prototype.contructor === 该构造函数，而实例对象之所以也有，只是通过__proto__继承来自**其构造函数的原型对象**。
3. 当创建实例时，实例的__proto__指向堆内存已确定。在创建新实例的之前，如果构造函数的prototype发生了改变，则**旧实例**的__proto__**指向区将不会发生改变，数据不改变**。**新实例**的__proto__将会指向新的内存区，数据为**改变后的prototype**。
4. 原型链简单概括就是，当访问实例中某个属性或者方法，如果没有找到，则会沿着它的__proto__找，再没找到，就继续往__proto__的__proto__找，直到找到或者最后层级的__proto__为null为止。


## 参考文献
- [Number.prototype.toString MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
- [这可能是掘金讲「原型链」，讲的最好最通俗易懂的了，附练习题！](https://juejin.cn/post/7007416743215759373)