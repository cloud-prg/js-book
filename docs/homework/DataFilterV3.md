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

// 双层遍历，返回无重复项数组
const getUniqueArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (list[i].name == list[j].name && list[i].age == list[j].age) {
        arr.splice(j, 1);
      }
    }
  }
  return arr;
};

console.log(getUniqueArr(list));
// [
//   { name: 'aaa', age: 13 },
//   { name: 'bbb', age: 15 },
//   { name: 'ccc', age: 17 },
//   { name: 'ddd', age: 22 },
//   { name: 'bbb', age: 16 }
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

// 双层遍历，返回重复项
const getUniqueArr = (arr) => {
  let moreEleArr = new Array();
  if (arr instanceof Array == false) return;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (list[i].name == list[j].name && list[i].age == list[j].age) {
        moreEleArr.push(arr[j]);
        arr.splice(j, 1);
      }
    }
  }
  return moreEleArr;
};

console.log(getUniqueArr(list)); // [ { name: 'aaa', age: 13 }, { name: 'bbb', age: 15 } ]

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

// 双层遍历，返回重复项数组
const getMoreArr = (arr) => {
  let moreArr = new Array();
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].name == arr[j].name && arr[i].age == arr[j].age) {
        moreArr.push(arr[j]);
        arr.splice(j, 1);
      }
    }
  }
  return moreArr;
};

console.log(getMoreArr(arr1).concat(getMoreArr(arr2)));
// [
//   { name: 'aaa', age: 13 },
//   { name: 'bbb', age: 15 },
//   { name: 'aaa', age: 13 },
//   { name: 'bbb', age: 15 }
// ]

```



