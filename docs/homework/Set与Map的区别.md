---
title: Set和Map的区别
author: 云上舟
date: "2022-04-08"
---
[[toc]]
​    

## 概念

`Set` 对象是值的集合，你可以按照插入的顺序迭代它的元素。 `Set`中的元素只会出现一次，即 `Set` 中的元素是唯一的。

`Map` 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。



## 应用场景

- set用于数据重组，是一种称为集合的数据结构。
- map用于数据存储、映射，是一种称为字典的数据结构。

### 区别

- **共同点**: 集合、字典 可以储存不重复的值
- **不同点**: 集合以 `[value,value]`的形式存储元素。而字典以 `[key,value]`形式存储元素。



## 参数格式

初始化map时，需要传入一个**二维数组**。
初始化set时，需要传入**一维数组**。

```js
let singleArr = [1,2,2,2,3,3,4,5,6]
let doubleArr = [["a",1],["b",2]];

let set = new Set(singleArr);
let map = new Map(doubleArr);

console.log([...set]); // [1,2,3,4,5,6];
console.log([...map]); // [["a",1],["b",2]];
```



## 默认遍历器接口

set和map都有默认的遍历器接口。

- **共同点**:   当直接输出set和map时，就调用了这个接口（`Symbol.iterator`属性）。

- **不同点**：因为它们的**数据结构**不同，因此遍历器接口所调用的**对应方法**不同。

  ```js
  map[Symbol.iterator] === map.entries
  // true
  
  set[Symbol.iterator] === set.values
  // true
  ```



## 总结

1. set和map**所需参数**不同，set需要传入**一维数组**,map需要传入**二维数组**
2. set和map的每个**数据元素结构**不同。set没有键值对的概念，它的键也是他的值，即`[value,value]`。而map有键值对的概念，即`[key,value]`
3. set和map的默认遍历器接口对应的方法不同。
   - set对应原型中的`Set.prototype.values()`方法
   - map对应原型中的`Map.prototype.entries()`方法
4. Map的**键**是**不能修改**的，但是键**对应的值**是**可以修改**的；Set不能通过迭代器来改变Set的值，因为set中键就是值。
5. 所有的元素都会被自动排序



## 参考文章

[js 中 Map 和 Set 的用法以及区别 - 掘金 (juejin.cn)](https://juejin.cn/post/7064479924757168165#heading-2)

