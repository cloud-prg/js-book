---
title: JS继承
author: 云上舟
date: "2022-05-17"
---
[[toc]]

## 什么是继承

 子类可以重用父类上的 **属性** 和 **方法** ，从而提高代码的复用性。



## 有几种实现方式？
1. 原型链继承
2. 构造继承
3. 实例继承
4. 拷贝继承
5. 组合继承
6. 寄生组合继承



## 具体实现

  在实现之前，先编一个父类，作为每种实现方式的构造函数。

```js
// 定义一个动物类
function Animal(name) {
  // 属性
  this.name = name || "Animal";
  // 实例方法
  this.sleep = function () {
    console.log(this.name + "正在睡觉！");
  };
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + "正在吃：" + food);
};

module.exports = Animal;
```



### 一、原型链继承

**核心**： 将父类的实例作为子类的原型

```js
const Animal = require("./parent");
function Cat() {}

/**
 * 创造父类的实例放在子类的原型上
 * Cat.prototype.__proto__ == Animal.prototype
 * */ 
Cat.prototype = new Animal();
Cat.prototype.name = "cat";

/**
 * 1. cat.name会到cat.__proto__上找，而cat.__proto__== Cat.prototype
 * 2. cat本身没有eat,会去原型链上找。cat.__proto__->Cat.prototype,Cat.prototype.__proto__->Animal.prototype
 * 3. sleep寻找同2
 * 4. instanceof , 持续将左边原型链上的__proto__与右边的prototype比较,因此都为true。
*/
var cat = new Cat();
console.log(cat.name);
console.log(cat.eat("fish"));
console.log(cat.sleep());
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat); //true

```

- **特点**：实例是子类的实例也是父类的实例，父类新增的原型方法/属性，子类都能够访问，并且原型链继承简单易于实现。
- **缺点**：来自原型对象的所有**引用类型**属性被所有实例**共享**，无法实现多继承，无法向父类构造函数传参。



### 二、构造继承

**核心：**使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）

```js
const Animal = require("./parent");
function Cat(name) {
  // 主要是利用call改变父类Animal的context上下文.
  Animal.call(this);
  this.name = name || "Tom";
}

var cat = new Cat();
console.log(cat.name); // TOM
console.log(cat.sleep()); // TOM正在睡觉！

// 因为不是创造父类实例放到子类的原型上，所以不存在原型相同。
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
```

- **特点** :  1.  子类可以给父类传值 2. 子类可以继承多个父类( 多个父类改变context上下文指向子类即可) 
- **缺点** :  1.  实例并非父类的实例，而是子类的实例  2. 只能继承父类的实例属性和方法，不能继承其原型属性和方法。 3. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能。



### 三、 实例继承

**核心：**为父类实例添加新特性，作为子类实例返回

```js
const Animal = require('./parent');
function Cat(name){
    var instance = new Animal();
    instance.name = name || 'Tom';
    return instance;
  }
  
  // Test Code
/**
 *  与原型链继承差不多，只是子类可以给父类传值了。
 *  var cat = new (function(){return new Animal()})()
 * */ 
  var cat = new Cat();
  console.log(cat.name);
  console.log(cat.sleep());
  console.log(cat instanceof Animal); // true
  console.log(cat instanceof Cat); // false
```

- **特点** :  1. 子类可以给父类传值 2. 子类享有父类实例上、原型上的方法 3. 不管是new一个子类，或者是直接创造子类，返回的都是父类实例。
- **缺点** :  1. 实例是父类的实例，不是子类的实例 2. 不支持多继承



### 四、拷贝继承

**核心** : 迭代父类的实例，获取所有父类实例上的属性和方法，赋值到子类原型上。

```js
const Animal = require("./parent");
function Cat(name) {
  // 父类实例
  var animal = new Animal();
  // 实例上的方法及属性都拷贝到子类的原型上
  for (var p in animal) {
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || "Tom";
}

// Test Code
var cat = new Cat();
console.log(cat.name);

var cat2 = new Cat("SSS");
console.log(cat2.name);

var cat3 = new Cat();
console.log(cat3.name);

console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

```

**特点** : 支持多继承

**缺点** : 1. 效率极低，内存占用高（因为要迭代获取父类实例上的属性方法） 2. 无法获取不可枚举的属性值。



### 五、组合继承

**核心** ： 通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。

```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();

// 组合继承需要修复构造函数指向的。

Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true

```

- **特点**：

1. 可以继承实例属性/方法，也可以继承原型属性/方法
2. 既是子类的实例，也是父类的实例
3. 不存在引用属性共享问题
4. 可传参
5. 函数可复用

- **缺点**：

1. 在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。



### 六、 寄生组合继承

**核心：**通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

```js
const Animal = require("./parent");

/**
 * 继承实例 原型上的属性方法
 * 这一步相对组合继承来说，砍掉了new Animal()的实例方法，只保留Animal.prototype方法
 */
function Cat(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
(function () {
  // 创建一个没有实例方法的类
  var Super = function () {};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();
Cat.prototype.constructor = Cat; // 需要修复下构造函数
// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true

```



## 总结

1. 原型继承 : 
   				- 通过 **父类实例** 赋值到 **子类原型** 。 但改变 **子类实例** 上没有的**引用类型属性，将会造成后续创造的 **子类实例** 一同共享这个 **引用类型属性****
   				- **无法继承**多个父类。
2. 构造继承 : 创建子类实例时调用**父类**构造函数，于是**子类**的每个实例都会将SuperType中的属性复制一份。
            - 无法继承 **父类原型** 的属性
            - 每次创造 **子类实例** 都要创造父类的副本，造成性能影响
            - 可以继承多个父类
3. 实例继承: 相对于构造继承来说，不能继承多个父类。
         - 子类不管new还是直接创造，都有返回对象的效果
         - 不能继承多个父类
         - 实例是父类的实例
4. 拷贝继承: **迭代**父类实例属性到**子类原型**上
        - 支持多继承
        - 效率低，占用内存高
        - **子类原型**不能获取**父类实例**的不可枚举属性。
5. 组合继承： 构造继承+原型继承
          -   注意，要修正子类原型构造体的指向
          -   会生成两份实例相同属性值。
6. 寄生组合继承： 构造函数+改良版原型继承（子类原型只继承父类原型上的属性和方法）

## 参考文章

1. [JS实现继承的几种方式 - 幻天芒 - 博客园 ](https://www.cnblogs.com/humin/p/4556820.html)
2. [JS中继承实现的几种方式，__牛客网 ](https://www.nowcoder.com/questionTerminal/d1b16cb7677f4818a27aee25984aac20)
3. [JavaScript常用八种继承方案 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903696111763470)

  