
# typescript巩固
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

// 联合声明
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
const add2: (x: number, y: number, z?: number) => number = add;
```

## 类型推测

当创建一个变量而没有声明类型时，ts 将会自动推测该变量的类型

```ts
let str = "str";
str = 123; // 报错
```

## 类 Class

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
// 父类
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  run() {
    return `${this.name} is run ning`;
  }
}

// 子类继承
class Dog extends Animal {
  
  // 子类内部的新方法
  bark() {
    return `${this.name} is barking`;
  }
}

// 子类继承
class Cat extends Animal {
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }
  // run方法重写(Overwrite)
  run() {
    return "Meow, " + super.run();
  }
}

// 继承 多态 创建子类 Dog实例
// const xiaobao = new Dog('xiaobao');
// console.log(xiaobao.run());
// console.log(xiaobao.bark());

// 继承 多态 创建子类 Cat实例
const maomao = new Cat("maomao");
console.log(maomao.run());

// 封装 创建父类 Animal实例
// const snake = new Animal('lily')
// console.log(snake.run())
```

## 属性修饰符

typescript 中有4种属性修饰符，它们分别是 public、private、protect、readonly。用法如下:

### public 修饰符

```ts
// public的name 具有可访问、可修改权限
class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  run() {
    return `${this.name} is run ning`;
  }
}

const snake = new Animal("lily");
console.log(snake.name); // lily
snake.name = "lucy";
console.log(snake.name); // lucy
```

### private 修饰符

将上述的 `public name`,修改成 `private name`,那么全局的 name 都会有红色下划线提示。`Property 'name' is private and only accessible in within class 'Animal'`(name 属性是私有的，且只能在 Animal 类中通行),因此能知道 `private` 拥有**不可访问性**和**不可修改性**。

### protect 修饰符

将上述的 `public name`,修改成 `protected name`。则**子类**可以**享有** name 属性的**访问权限**及修改权限。（属性“name”受保护，只能在类“Animal”及其子类中访问)。

### static 修饰符

它可以表明哪些属性为静态属性。在类没有实例化的情况下，可以直接访问到这些类中的属性。

```ts
class Animal {
  name: string;
  static catagories: string[] = ["mammal", "bird"];
  static isAnimal(a: Object) {
    return a instanceof Animal;
  }
  constructor(name: string) {
    this.name = name;
  }

  run() {
    return `${this.name} is run ning`;
  }
}
const snake = new Animal("lily");
console.log(Animal.catagories); // ['mammal','bird']
console.log(Animal.isAnimal(snake)); // true
```

### readonly 只读修饰符

顾名思义，除了读取外，无法做任何操作

```ts
class Person {
  readonly name = "Alice";
}
let p = new Person();
console.log(p.name); // Alice
```

:::tip
以上四种修饰符：访问修饰符、只读修饰符和静态修饰符可以组合修饰同一成员
但需要注意

修饰符是可选的，在没有写任何修饰符，默认有个 public
同类修饰符只能有一个
三种修饰符有先后顺序，分别是：访问、静态、只读

即：【public/static/protected】 【static 】【readonly】
:::

## 接口与类

我们可以通过 extends、implements 重写接口或者类.
当继承或实现多个接口或类时，可以让**接口继承其他接口。**再将未继承的方法、属性放入**集成接口**即可。

```ts
interface Radio {
  switchRadio(): void;
}

interface Battery {
  checkBatteryStatus();
}

// 继承Radio中的方法，并将Battery方法写入
// interface RadioWithBattery extends Radio , Battery{
interface RadioWithBattery extends Radio {
  checkBatteryStatus();
}
// 实现多个接口，用逗号隔开。
// class Cellphone implements Radio,Battery{
class Cellphone implements RadioWithBattery {
  switchRadio() {}
  checkBatteryStatus() {}
}
```

:::tip
1、接口用于定义每个属性或函数是什么类型, 无须关心里面的具体值、具体函数实现。而类则是实现接口中每个属性和函数的具体内容。

2、implements 有个硬性要求,类必须按照接口中定义的一一写出，否则将会报错。
:::

## 枚举 Enum

```ts
// enum.ts
enum Direction {
  Up,
  left,
  right,
  down,
}
console.log(Direction);
```

其打印出来的结果：

```js
//  {
//   '0': 'Up',
//   '1': 'left',
//   '2': 'right',
//   '3': 'down',
//   Up: 0,
//   left: 1,
//   right: 2,
//   down: 3
// }
```

其编译成 js 文件后的结果:

```js
// enum.js
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["left"] = 1)] = "left";
  Direction[(Direction["right"] = 2)] = "right";
  Direction[(Direction["down"] = 3)] = "down";
})(Direction || (Direction = {}));
// 也可以把枚举看作是数组，取第0项
// 个人理解，更像是对象，下标与值互相映射。
console.log(Direction[0]); // Up
console.log(Direction.Up); // 0
// console.log(Direction);
```

可以看到 enum.js 做了一个 IIFE 自执行函数，利用默认值在 Direction 对象中，对属性做了双向映射处理。

:::tip
若在 Direction 中，定义了一个属性为数字，那么紧跟其后且未赋值的属性，将会按数字+1 的顺序自动赋值。
:::

## 泛型

泛型，个人理解它为一个不确定类型的 any。一开始为 any 类型，但是依靠某些变量，依靠 ts 自动推断后，ts 为他们声明了类型，此刻泛型就会从 any 转为这个类型。(可以拿 Promise 中的状态作比喻，一开始为 pending,根据具体逻辑判断是倾向 Fulfilled 还是 Rejected)

### 简单例子

创建一个函数，要求返回值的类型和输入值的类型相同,这里就用到了泛型，在函数后面加尖括号，内部写的声明什么字符按照开发者习惯，一般都以**字母T**为泛型声明。

```ts
function consoleNumber<T>(num: T): T {
  return num;
}

// 光标移至res，显示 let res: number
let res = consoleNumber(3);

console.log(res); // 3
```

### 接口中使用泛型

```ts
// 这里的泛型T,U,在变量声明时必须定义参数类型.
interface KeyPair<T, U> {
  key: T;
  value: U;
}

// 定义了接口的参数类型 number,string
let kp1: KeyPair<number, string> = { key: 123, value: "str" };
```

### 在类中使用泛型

```ts
class Queue<T> {
  private data: T[] = [];

  push(item: T): void {
    this.data.push(item);
  }

  // 在立即执行shift()时，将会返回undefined。这就是为什么要规定返回类型为T | undefined
  pop(): T | undefined {
    return this.data.shift();
  }
}

// 可在实例后定义泛型的具体类型
const queue = new Queue();
// const queue2 = new Queue<string>(); // 传入内容只能为字符串类型
// const queue3 = new Queue<number>(); // 传入内容只能为数字类型
queue.push(1);
queue.push("str");
console.log(queue.pop()); // 1
console.log(queue.pop()); // str
```

### 在函数声明时使用泛型

```ts
function plus(a:number,b: number,c: number): number{
    return a + b + c;
}

// 为plus函数定义配套的接口
interface plusInterface<T>{
    (a:T,b:T,c:T):T;
}

// 声明时，定义number类型即可
let pp: plusInterface <number> = plus;
console.log(pp(1,2,3)); // 6

```

## 类型别名(type aliases)
可将ts类型声明当作一种变量来声明并使用。
```ts
// 声明一个返回值为string的function 的类型
type NameResolver = () => string;

// 在其他类型别名中使用它
type NameOrResolver = string | NameResolver;

// 与下面类型别名的效果是一样的
// type NameOrResolver = string | (() => string);

// 参数n为string | (()=>string)
function getName(n: NameOrResolver): string {
    if(typeof n === 'string'){
        return n   
    }else{
        return n();
    }
}
```

## 类型断言(type assertion)
当出现联合类型时，参数需要确定成某一类型，才能让代码正常执行下去。这时就需要类型断言。
```ts
/**
 * type assertion 类型断言 
 * */

function getLength(input: string | number) : number{
  // input 断言成了 String类型
//   const str = input as String
//   if (str.length) {
//       return str.length
//   } else {
//       // input 断言成了 Number类型
//       const number = input as Number
//       return number.toString().length;
//   }

// 以下代码段效果等同于上面注释部分
  if((<string>input).length){
    return (<string>input).length;
  }else{
      return (<number>input).toString().length;
  }
}
```

:::warning
  只能断言已声明的联合类型。否则将提示报错。
:::


## 声明(declare)
declare可以声明文件，也可以声明变量，声明函数。
```ts
// 声明函数类型，参数类型
declare function func(str: string): void;

// 声明变量类型
declare var ant:string;

//声明常量并赋值1
declare const num:1;

//声明类
declare class Cat{
  static name:string;
  static getAge(): number;
  getName(id: number): string;
}

//声明命名空间
declare namespace space{
  function func(str: string): string;
  let num: number;
}

// 引入模块，定义其中的属性
declare module "foo" {
  export let a: number;
  export function b(): number;
  export namespace c{
    let cd: string
  }
}
 
```
### 在项目中声明文件
项目目录下，创建`xxx.d.ts`文件，如`jQuery.d.ts`文件。这样全局都能共享到文件里的声明。
```ts
declare var jQuery: (selector: string) => any
```
#### 配置tsc
如果没有声明，则需要配置一下tsc。在项目目录下创建`tsconfig.json`。设置完后，在项目中代码行中输入jQuery，就能弹出相应提示。
```json
{
  "include":["**/*"]
}

```
#### 下载npm上的ts模块
npm上的ts模块，下载后，可直接在项目中使用。代码行输入后就有相应提示。比如`@types/react`  , `@types/jquery`

```shell
npm install --save @types/jquery
```

## 参考文章

1.  [extends 和 implements 的区别](https://stackoverflow.com/questions/38834625/whats-the-difference-between-extends-and-implements-in-typescript)
2. [TypeScript declare声明使用](https://blog.csdn.net/sd19871122/article/details/105116290?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-2.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-2.pc_relevant_default&utm_relevant_index=5)

