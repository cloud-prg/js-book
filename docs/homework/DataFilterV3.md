---
title: 数据过滤
author: 云上舟
date: "2022-03-17"
---

### 测试内容

​    对数组中的数据进行过滤:

1. 声明一个声明，返回list中的项，并且去掉重复项
2. 声明一个变量，返回list中的重复项
3. 声明一个变量，返回arr1和arr2中重复的项





### 题目详解

:::tip

   遵循了记忆函数的思想，将数据字符串化，以key形式保存在对象中。使用hasOwnProperty进行比对，这样循环讲至单次，且可读性提高。

:::

题解1：

```
/**
 * 声明一个变量，返回list中的项，并且去掉重复项
 */

let list = [
  { name: "aaa", age: 13 },
  { name: "bbb", age: 15 },
  { name: "ccc", age: 17 },
  { name: "ddd", age: 22 },
  { name: "bbb", age: 15 },
  { name: "aaa", age: 13 },
  { name: "bbb", age: 16 },
];

// 单次遍历，返回无重复项数组
const getUniqueArr = (arr) => {
  let memorize = {}; // 记忆对象
  arr.reduce((pre, cur) => {
    let stringCur = JSON.stringify(cur); //对前一个数据字符串化

    //如果记忆对象没有这个属性,则推进
    if (!memorize.hasOwnProperty(stringCur)) {
      memorize[stringCur] = cur;
      return cur;
    }

    return cur;
  }, {});
  return Object.values(memorize);
};

console.log(getUniqueArr(list));
// [
//   { name: 'aaa', age: 13 },
//   { name: 'bbb', age: 15 },
//   { name: 'ccc', age: 17 },
//   { name: 'ddd', age: 22 },
//   { name: 'bbb', age: 16 },
// ]

```



题解2：

```
/**
 * 声明一个变量，返回list中的重复项
 */
let list = [
  { name: "aaa", age: 13 },
  { name: "bbb", age: 15 },
  { name: "ccc", age: 17 },
  { name: "ddd", age: 22 },
  { name: "bbb", age: 15 },
  { name: "aaa", age: 13 },
  { name: "bbb", age: 16 },
];

// 单次遍历，返回重复项
const getMoreArr = (arr) => {
  let memorize = {}; // 记忆对象
  let more = {}; // 重复对象
  arr.reduce((pre, cur) => {
    let stringCur = JSON.stringify(cur); //对前一个数据字符串化

    //如果记忆对象没有这个属性,则推进。否则推入重复对象
    if (!memorize.hasOwnProperty(stringCur)) {
      memorize[stringCur] = cur;
    } else {
      more[stringCur] = cur;
    }

    return cur;
  }, {});
  return Object.values(more);
};

console.log(getMoreArr(list)); // [ { name: 'aaa', age: 13 }, { name: 'bbb', age: 15 } ]

```



题解3：

```
/**
 * 声明一个变量，返回arr1和arr2中重复的项
 */

 let arr1 = [
  { name: "aaa", age: 13 },
  { name: "bbb", age: 15 },
  { name: "ccc", age: 17 },
  { name: "ddd", age: 22 },
  { name: "bbb", age: 15 },
  { name: "aaa", age: 13 },
  { name: "bbb", age: 16 },
];

let arr2 = [
  { name: "aaa", age: 13 },
  { name: "bbb", age: 15 },
  { name: "ccc", age: 17 },
  { name: "ddd", age: 22 },
  { name: "bbb", age: 15 },
  { name: "aaa", age: 13 },
  { name: "bbb", age: 16 },
];

// 单次遍历，返回重复项
const getMoreArr = (arr) => {
  let memorize = {}; // 记忆对象
  let more = {}; // 重复对象
  arr.reduce((pre, cur) => {
    let stringCur = JSON.stringify(cur); //对前一个数据字符串化

    //如果记忆对象没有这个属性,则推进。否则推入重复对象
    if (!memorize.hasOwnProperty(stringCur)) {
      memorize[stringCur] = cur;
    } else {
      more[stringCur] = cur;
    }

    return cur;
  }, {});
  return Object.values(more);
};

console.log(getMoreArr(arr1).concat(getMoreArr(arr2)));
// [
//   { name: 'aaa', age: 13 },
//   { name: 'bbb', age: 15 },
//   { name: 'aaa', age: 13 },
//   { name: 'bbb', age: 15 }
// ]

```



