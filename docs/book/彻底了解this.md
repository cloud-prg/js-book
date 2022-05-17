
# 彻底了解this
[[toc]]

## 为什么要彻底了解this
-  this的使用频率非常高，在项目中几乎是随处可见。如果我们对this始终保持**一知半解**的状态，那么在以后遇到问题时，将可能因 **忽视this** 引发的问题而**耗费大把时间**在**调试**上。
- 合理使用this,可以帮助开发人员写出简洁、高复用性的代码。

## 什么是this?
this是一个指针，指向调**用函数**的**对象**。

## this中的规则
1. 默认绑定
2. 隐式绑定
3. 硬绑定
4. new绑定

## 默认绑定
- 调用`sayHi`时，默认绑定this指向全局对象（非严格模式下）
- 严格模式下，this指向undefined。
- 在浏览器中，执行`sayHi`输出`Hello,zs`.因为name挂在全局对象(window)上。
- 在node环境中，输出`Hello,undefined`。这是因为node中name并不是挂在**全局对象**（global）上的。
```js
function sayHi(){
		console.log("Hello",this.name);
}
var name = "zs";
sayHi();
```

## 隐式绑定

`sayHi`的调用是在某个对象上，即**调用位置**的**上下文**是这个对象内部区域，这个时候this指向这个对象。
```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
person.sayHi(); //  Hello,YvetteLau.

```

### 对象属性链中的隐式绑定
- `sayHi`函数作为`person2`的属性
- `person2`对象作为`person1`的`friend`属性
- 调用`person1.friend.sayHi`时，`sayHi`的上下文为`Person2`
- 因此`sayHi`的this指向`Person2`,输出`Hello, Christina.`

:::warning
  对象属性链中只有最后一层会影响到调用位置。
  因为只有最后一层会确定this指向的是什么，不管有多少层，在判断this的时候，我们只关注最后一层，即此处的friend。
:::
```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person2 = {
    name: 'Christina',
    sayHi: sayHi
}
var person1 = {
    name: 'YvetteLau',
    friend: person2
}
person1.friend.sayHi(); // Hello, Christina.

```

### 隐式绑定的陷阱
当调用的 函数 ，不是对象去调用它时，它将不是`隐式绑定`。
:::tip
  只需牢牢记住:XXX.fn();fn()前如果什么都没有，那么肯定不是隐式绑定。
:::
```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'aaa',
    sayHi: sayHi
}
var name = 'bbb';
var Hi = person.sayHi;
Hi(); // 输出bbb，此时this上下文与person没关系。

```

### 异步中的隐式绑定
在上述例子中添加了`setTimeout`异步函数代码。
1. setTimeout的回调函数中，this使用的是默认绑定，非严格模式下，执行的是全局对象
2. setTimout(fn,delay),若第一个参数直接传入函数，则可以视为将参数赋值给fn。则函数执行时，实际上是fn执行，则this指向全局。
3. 有了第二条规则的解释，就可以理解为什么传入的参数都需要以回调`()=>{ Hi();}`形式去执行。为了保持调用函数的this指向。

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person1 = {
    name: 'aaa',
    sayHi: function(){
        setTimeout(function(){
            console.log('Hello,',this.name);
        })
    }
}
var person2 = {
    name: 'bbb',
    sayHi: sayHi
}
var name='ccc';
person1.sayHi(); // ccc
setTimeout(person2.sayHi,100); // cc
setTimeout(function(){
    person2.sayHi(); // bbb
},200);


```

## 硬绑定
  硬绑定，也称显示绑定，即通过 call,apply,bind方式，显示指定this指向。具体示例可以移步[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)官网中查看。

:::warning
如果将 null、undeinfed传入call、apply或者bind,那么值被调用时，this指向将遵循默认绑定规则。
:::

## new绑定
-  new使构造函数的this指向绑定到了实例上。
-  具体实现可以看这篇 [new操作符](https://yunshangzhou.github.io/js-book/book/new%E6%93%8D%E4%BD%9C%E7%AC%A6.html)
```js
function sayHi(name){
    this.name = name;
	
}
var Hi = new sayHi('Yevtte');
console.log('Hello,', Hi.name);

```
可以看到构造函数上的name，在实例中可以访问到。


## 绑定优先级

new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

##  箭头函数

- 函数体内的this对象，继承的是代码块外层的this。
- 不可以当作构造函数，无法用它new出实例，否则报错。
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用**rest**参数代替。
- 箭头函数没有自己的this,因此不可以用call、apply、bind去改变指向

### 简单示例
```js
var obj = {
    hi: function(){
        console.log(this);
        return ()=>{
            console.log(this);
        }
    },
    sayHi: function(){
        return function() {
            console.log(this);
            return ()=>{
                console.log(this);
            }
        }
    },
    say: ()=>{
        console.log(this);
    }
}
let hi = obj.hi();  //输出obj对象
hi();               //输出obj对象
let sayHi = obj.sayHi();
let fun1 = sayHi(); //输出window
fun1();             //输出window
obj.say();          //输出window

```
1. obj.hi(); 对应了this的隐式绑定规则，this绑定在obj上，所以输出obj。
2. hi(); 这一步执行的就是箭头函数，箭头函数继承上一个代码库的this，刚刚我们得出上一层的this是obj，显然这里的this就是obj.
3. 执行sayHi();这一步也很好理解，我们前面说过这种隐式绑定丢失的情况，这个时候this执行的是默认绑定，this指向的是全局对象window.
4. fun1(); 这一步执行的是箭头函数，如果按照之前的理解，this指向的是箭头函数定义时所在的对象，那么这儿显然是说不通。OK，按照箭头函数的this是继承于外层代码库的this就很好理解了。外层代码库我们刚刚分析了，this指向的是window，因此这儿的输出结果是window.
5. obj.say(); 执行的是箭头函数，当前的代码块**obj**中是**不存在**this的，只能往上找，就找到了全局的this，指向的是window.


## 总结(如何准确判断this指向)
1. 如果为**new绑定**，则this指向实例。
2. 如果为**硬绑定**，则this指向传入的函数对象。但在传入null,undeinfed的情况下，this指向全局。
3. 如果函数是在对象中被作为属性调用（**隐式绑定**），则this绑定为上下文
4. 如果非以上情况，则视为**默认绑定**。严格模式下，绑定到**undefined**。非严格模式下，绑定到**全局对象**。
5. setTimeout中，第一个参数fn可视为**待定变量**，传入函数时，做的其实是`fn = Obj.func`。即调用时是`fn()`，触发**默认绑定**规则，this指向全局。
因此fn需要传入回调函数`()=>{}`，让函数的上下文保持不变，this指向调用它的**对象**。

## 参考文章
1. [高点赞讲解this--掘金](https://juejin.cn/post/6844903805587619854#heading-3)
2. [this文档--MDN](https://www.baidu.com/link?url=OtQz1311VcnzppHGcOE32iERB4TD6qQJvRMDMP5YcX96O9RP91JIf51mGOYoK5XsmQBkARLTcrXXjbN1yUaPZAXcb-6648Wdh6NPHn4AT2f_gGwLUdKRY-ds6AaXIx0j&wd=&eqid=8813a1180008dcb9000000046266c4d2)