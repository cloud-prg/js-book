---
title: typeof判断
author: 云上
date: "2022-03-15"
---

[[toc]]

## 变量类型声明

### 基本类型声明

```ts
let u: undeinfed = undefined;
let n: null = null;

let num: number = undefined;

let notSure: any = 4;
notSure = "maybe it is a string";
notSure = true;

// 可选择的声明
let numberOrString: number | string = 234;
```

### 数组、元组类型声明

```ts
// 数组元素只能是number类型
let arrOfNumbers: number[] = [1, 2, 3, 4];
arrOfNumbers.push(5);

function test() {
  console.log(arguments);
}

// 元组类型 规定了必须传入2个数组元素，且对应位置必须为对应类型。
let user: [string, number] = ["yunshangzhou", 1];
```

## 接口 Interface 声明

```ts
/**
 * 定义一个对象里有什么样的属性，属性的类型是什么。
 * 在对一个对象声明该接口时，属性不能多，也不能少。数量固定。
 * 如果接口定义的属性名，后面加了问号 ?,则代表可选择，声明接口时，属性可忽略。
 * */
interface Person {
  name: string;
  age?: number; // 该属性可在实例中不定义
}

let cloud: Person = {
  name: "cloud",
  age: 20,
};
```

## function 声明

```ts
// 注意，必选参数不可在可选参数之后，否则报错
// 可声明函数返回值为什么类型
function add(x: number, y: number, z?: number): number {
  if (typeof z === "number") {
    return x + y + z;
  } else {
    return x + y;
  }
}

let result = add(2, 3);

// 声明一个和add一样类型的函数
// 在赋值前头声明函数，返回值类型则用 => 箭头来定义
const add2 : (x: number, y: number, z?: number) => number = add; 
```

## 类型推测
当创建一个变量而没有声明类型时，ts将会自动推测该变量的类型
```ts
let str = 'str'
str = 123; // 报错
```

## 类Class
类(Class) : 定义了一切事物的抽象特点
对象(Object) : 类的实例
面向对象(OOP) 三大特性: 封装、继承、多态

### 什么是封装?
将数据的操作细节隐藏起来，只暴露对外的接口。调用端不需要知道细节，只需要知道如何使用即可。
### 什么是继承?
子类继承父类，子类拥有父类的一些特性
### 什么是多态?
多态是由继承产生的相关的类，这些类子类重写了父类的方法。因为继承的关系，他们的类型和父类是一样的，因此使用子类时，同名函数执行出来的结果就为多个形态。

```ts


```