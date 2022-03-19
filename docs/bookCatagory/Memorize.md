---
title: 记忆函数
author: 云上舟
date: "2022-03-18"
---

## 什么是记忆函数？

  记忆函数是能够对长递归、长迭代进行性能优化的编程实践。其作用是作数据缓存，减少不必要的逻辑运算。



## 记忆函数使用在哪些场景?

   当需要多次遍历去寻找一个重复项时,便可以使用记忆函数。以下例举几个场景。

- 搜索一个单词的释义，每次搜索出结果，都将单词名称和释义，以键值对方式存储到记忆函数中。当下次搜索时，将优先在记忆函数中寻找，如果找到对应词汇，则无需调用接口发送请求，直接返回其值。
- 有些需求中，地区列表是通过实时调用接口完成的，请求数据时将带有市区编号的payload发送出去，返回相关地段的信息。当下次请求时，携带的payload相同时，便可使用记忆函数，减少不必要的重复请求。
- 斐波那契数列。



## 记忆函数的原理

  当一组**参数**初次参与到函数中，其**参数**和**计算结果**将被缓存下来，当再次传入相同的参数调用API时，则直接返还该参数所映射的值，即被缓存下来的计算结果。

:::warning

:warning:注意

记忆函数不可以有副作用

:::



## 记忆函数的实现

  首先看一看《JavaScript权威指南》中是怎么实现的

```javascript
function memorize(f) {
    var cache = {}; // 定义缓存对象
   console.log("cache",cache);
    // 返回一个函数，即闭包
    return function () {
      // 将参数的长度 拼接 参数名字符串化(并以逗号隔开)，作为键名,传入缓存对象
      var key = arguments.length + Array.prototype.join.call(arguments, ",");

      // 同cache.hasOwnProperty(key)
      if (key in cache) {
        return cache[key];
      } else return (cache[key] = f.apply(this, arguments)); // 传入的数组或类数组,里面的元素将会被一一传入
    };
  }
```





## 函数测试

   以一个计算参数和的函数为例，使用记忆函数时，执行时间在37毫秒左右。不使用记忆函数时，执行时间在0.7毫秒左右。在这里，总是接受相同参数。计算结果没有变化，且循环量大的情况下，记忆函数不太适用。

```js
function sum(a, b, c) {
  return a +b + c;
}

let sumMemorize = memorize(sum);

function calcTime(funcName, count) {
  console.time(`${funcName}计时`);

  for (let i = 0; i < count; i++) {
    funcName == "sum" ? sum(1, 2, 3) : sumMemorize(1, 2, 3);
  }

  console.timeEnd(`${funcName}计时`);
}

calcTime("sum", sum, Math.pow(10,5)); // 平均0.077ms
// calcTime("sumMemorize", Math.pow(10,5)); // 平均36.465ms

```


<br/> 
<br/> 
再以斐波那契数列为例，使用记忆函数时，执行次数是5。不使用时，执行次数为19。在这里，总是接受不同参数，计算结果多变，且循环量大的情况下，记忆函数的优势便凸显出来。

```javascript
// 斐波那契数列
var count = 0; // 斐波那契数列循环次数

// 如果n小于2，返回本身，反则返回前两项之和
function fibonacci(n) {
  count++;
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci = memorize(fibonacci);
for (let i = 0; i < 5; i++) {
  fibonacci(i);
}

// console.log(count); // 19 --未使用记忆函数
console.log(count); // 5 -- 使用记忆函数

```






## 总结

1.   记忆函数能够缓存计算结果，以参数作为映射。
2.   记忆函数不能有副作用
3.   记忆函数在参数多变，计算结果多变，且迭代次数多的情况下，才能显出优势。
