---
title: 记忆函数
author: 云上舟
date: "2022-03-18"
---

# 什么是记忆函数？

  记忆函数是能够对长递归、长迭代进行性能优化的编程实践。其作用是作数据缓存，减少不必要的逻辑运算。



# 记忆函数使用在哪些场景?

   当需要多次遍历去寻找一个重复项时,便可以使用记忆函数。以下例举几个场景。

- 搜索一个单词的释义，每次搜索出结果，都将单词名称和释义，以键值对方式存储到记忆函数中。当下次搜索时，将优先在记忆函数中寻找，如果找到对应词汇，则无需调用接口发送请求，直接返回其值。
- 有些需求中，地区列表是通过实时调用接口完成的，请求数据时将带有市区编号的payload发送出去，返回相关地段的信息。当下次请求时，携带的payload相同时，便可使用记忆函数，减少不必要的重复请求。
- 剔除数组中相同数组元素，减少多层循环挨个对比。



# 记忆函数的原理

  当一组**参数**初次参与到函数中，其**参数**和**计算结果**将被缓存下来，当再次传入相同的参数调用API时，则直接返还该参数所映射的值，即被缓存下来的计算结果。

:::warning

:warning:注意

记忆函数不可以有副作用

:::



# 记忆函数的实现

  首先看一看《JavaScript权威指南》中是怎么实现的

```javascript
function memorize(f) {
  var cache = {}; // 定义缓存对象

  // 返回一个函数，即闭包
  return function () {
    // 将参数的长度 拼接 参数名字符串化(并以逗号隔开)，作为键名,传入缓存对象
    var key = arguments.length + Array.prototype.join.call(arguments, ",");
    if (key in cache) {
      return cache[key];
    } else return (cache[key] = f.apply(this, arguments)); // 传入的数组或类数组,里面的元素将会被一一传入
  };
}
```





# 效率测试

   以一个计算参数和的函数为例，使用记忆函数时，执行时间在37毫秒左右。不使用记忆函数时，执行时间在0.7毫秒左右。

```
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



再以寻找数组重复项为例，使用记忆函数时，执行时间在37毫秒左右。不使用记忆函数时，执行时间在0.7毫秒左右。

```

```

