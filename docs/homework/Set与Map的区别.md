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


## 方法

:::tip
  set方法
:::

1. add()：添加值，返回实例
2. delete()：删除值，返回布尔
3. has()：检查值，返回布尔
4. clear()：清除所有成员
5. keys()：返回以属性值为遍历器的对象
6. values()：返回以属性值为遍历器的对象
7. entries()：返回以属性值和属性值为遍历器的对象
8. forEach()：使用回调函数遍历每个成员
9. 
:::tip
  map方法
:::

1. get(): 返回键值对
2. set(): 添加键值对
3. delete(): 删除键值对，返回布尔值
4. has(): 检查键值对，返回布尔值
5. clear(): 清除所有成员
6. keys()：返回以键为遍历器的对象
7. values()：返回以值为遍历器的对象
8. entries()：返回以键和值为遍历器的对象
9. forEach()：使用回调函数遍历每个成员

## 应用场景

:::tip
set应用场景
:::
- set用于数据重组，是一种称为集合的数据结构。
- 去重字符串：[...new Set(str)].join("")
- 去重数组：[...new Set(arr)]或Array.from(new Set(arr))
- 集合数组
    - 声明：const a = new Set(arr1)、const b = new Set(arr2)
    - 并集：new Set([...a, ...b])
    - 交集：new Set([...a].filter(v => b.has(v)))
    - 差集：new Set([...a].filter(v => !b.has(v)))


- 映射集合
    - 声明：let set = new Set(arr)
    - 映射：set = new Set([...set].map(v => v * 2))或set = new Set(Array.from(set, v => v * 2))

- 难点
    - 遍历顺序：插入顺序
    - 没有键只有值，可认为键和值两值相等
    - 添加多个NaN时，只会存在一个NaN
    - 添加相同的对象时，会认为是不同的对象
    - 添加值时不会发生类型转换(5 !== "5")
    - keys()和values()的行为完全一致，entries()返回的遍历器同时包括键和值且两值相等


:::tip
map应用场景
:::
 - map用于数据存储、映射，是一种称为字典的数据结构。
 - 难点
    - 遍历顺序：插入顺序
    - 对同一个键多次赋值，后面的值将覆盖前面的值
    - 对同一个对象的引用，被视为一个键
    - 对同样值的两个实例，被视为两个键
    - 键跟内存地址绑定，只要内存地址不一样就视为两个键
    - 添加多个以NaN作为键时，只会存在一个以NaN作为键的值
    - Object结构提供字符串—值的对应，Map结构提供值—值的对应

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

