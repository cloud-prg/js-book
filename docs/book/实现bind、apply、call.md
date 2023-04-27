
# 实现bind、apply、call
[[toc]]

## call介绍
call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  // call将Product的this ，指向了Food内部。因此能享有Food传进来的name,price
	Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"
```
## apply介绍
apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
```js
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

// 这里转变this指向为null,实则指向全局。参数类型为一个 数组 或者 类数组
const min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2
```

## bind介绍
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // 这个函数调用时的环境为全局。
// expected output: undefined

// 将函数运行的环境指向module内部。
const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42

```

## 注意事项
1. call、apply、bind是Function.prototype上的方法。即调用它们的必须是个**函数**
2. 非严格模式下，传入第一个参数**thisArg**指定为 **null** 或 **undefined** 时会自动替换为指向全局对象，原始值会被包装。
3. 严格模式下, **thisArg** 默认为 **undefined**

## 区别
- call/apply改变了函数的this上下文后马上执行该函数
- bind则是返回改变了上下文后的函数,需要调用它，才执行该函数。

## 应用场景
- 类数组 借用 数组的方法
```js
var arrayLike = {
	0: 'OB',
	1: "Koro1",
	length: 2
}
Array.prototype.push.call(arrayLike,"a","b")
```

- 防抖
改变传入fn的上下文。
```js
function debounce(fn,delay){
 let timeout;
	return function(){
	 timeout && clearTimeout(timeout);
		timeout = setTimeout(()=>{
				fn.apply(this,arguments);
		},delay)
	}
}
```
- 数据类型的判断
改变上下文，使一些没有Object的toString方法的数据也能获取数据类型。
```js
// 用Object原型上的toString方法，获取数据类型。
Object.prototype.toString.call(data); 
```

- 获取大小值
apply会默认将 类数组 或 数组的值展开。
```js
const arr = [15, 6, 12, 13, 16];
const max = Math.max.apply(null, arr); // 16
const min = Math.min.apply(null, arr); // 6
```

- new操作符内部，改变fn上下文到obj。
```js
function myNew(fn){
	let obj = Object.create(fn.prototype);
	let result = fn.call(obj,...[...arguments].slice(1))
	// ...
}
```
- 使用场景还有很多，以上仅作示例。
## 手写call
1. 设置上下文对象
2. 将this指向**隐式绑定**到context上
3. 通过隐式绑定执行函数并传递参数
4. 删除symbol唯一键
5. 返回结果
```js
Function.prototype.myCall = function (context, ...args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
	
			// 给后续参数也做个简单处理
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
	
		 // 这一步，将Function的方法环境绑定在了context上。
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    // 调用完删除添加的属性，保证函数的完整性
    delete context[key]
    //返回函数调用的返回值
    return result
}
```
## 手写apply
```js
Function.prototype.myApply = function (context, args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
	
			// 给后续参数也做个简单处理
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
	
		 // 这一步，将Function的方法环境绑定在了context上。
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    // 调用完删除添加的属性，保证函数的完整性
    delete context[key]
    //返回函数调用的返回值
    return result
}

```

## 手写bind
与上文类似，只不过返回时为函数，需要多调用一次
```js
Function.prototype.myBind = function (context) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
	
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
	
		 // 这一步，将Function的方法环境绑定在了context上。
    context[key] = this
  
	
			return function(...args){
				  //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    // 调用完删除添加的属性，保证函数的完整性
    delete context[key]
    //返回函数调用的返回值
    return result
			}
}
```

## 总结
1. 严格模式下，**thisArg**传入为 null 、undefined时返回undeinfed。
2. 非严格模式下，**thisArg**传入为 null 、undefined时返回 全局对象 window。
3. call与apply的区别，在于后续传入的参数个数不同，传入参数的类型不同。从第二位参数开始，call需要逐一传入，apply只需要传入**类数组** 或 **数组** 数据。
4. bind 与 call、apply的区别，bind的返回值为一个**function**，该function接收的参数是**调用bind的函数所需要的参数**。bind自身接收的参数是 **指定上下文**.
5. 在手写他们时，主要要给上下文添加一个唯一属性，防止冲突。在取完结果后再`delete`掉它，保证函数的完整性。
## 参考文章
1. [call函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
2. [js基础-面试官想知道你有多理解call,apply,bind？](https://juejin.cn/post/6844903906279964686)


