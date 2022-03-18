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

  使用了双循环+splice剔除重复项+JSON字符串化+数据属性格式化

题解1：

```
/**
 * 声明一个变量，返回list中的项，并且去掉重复项
 */

/**
 *
 * 格式化每个对象，使他们的属性顺序都一样
 * 再通过JSON.stringify对比两者字符串，如若同样则不推入 结果数组
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

let resultArr = new Array();

// 格式化对象属性，key按字母顺序排列
function formatObjInnerProperty(obj) {
  let keyArr = Object.keys(obj).sort();
  let newObj = {};
  for (const item of keyArr) {
    newObj[item] = obj[item];
  }
  return newObj;
}

// 字符串化对象
function JStringify(obj) {
  return JSON.stringify(obj);
}

// 双层遍历，返回重复项数组
function getMoreArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (
        JStringify(formatObjInnerProperty(arr[i])) ==
        JStringify(formatObjInnerProperty(arr[j]))
      ) { 
        arr.splice(j, 1);
      }
    }
  }
  return arr;
}

resultArr = getMoreArr(list);
console.log(resultArr);
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

/**
 *
 * 格式化每个对象，使他们的属性顺序都一样
 * 再通过JSON.stringify对比两者字符串，如若同样则推入 结果数组
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

let resultArr = new Array();

// 格式化对象属性，key按字母顺序排列
function formatObjInnerProperty(obj) {
  let keyArr = Object.keys(obj).sort();
  let newObj = {};
  for (const item of keyArr) {
    newObj[item] = obj[item];
  }
  return newObj;
}

// 字符串化对象
function JStringify(obj) {
  return JSON.stringify(obj);
}

// 双层遍历，去除重复项
function getUniqueArr(arr) {
  let moreEleArr=new Array;
  if (arr instanceof Array == false) return;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (
        JStringify(formatObjInnerProperty(arr[i])) ==
        JStringify(formatObjInnerProperty(arr[j]))
      ) {
        moreEleArr.push(arr[j]);
        arr.splice(j, 1);
      }
    }
  }
  return moreEleArr;
}

resultArr = getUniqueArr(list);
console.log(resultArr); // [ { name: 'aaa', age: 13 }, { name: 'bbb', age: 15 } ]

```



题解3：

```
/**
 * 声明一个变量，返回arr1和arr2中重复的项
 */

/**
 *
 * 格式化每个对象，使他们的属性顺序都一样
 * 再通过JSON.stringify对比两者字符串，如若同样则不推入 结果数组
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

let resultArr = new Array();

// 格式化对象属性，key按字母顺序排列
function formatObjInnerProperty(obj) {
  let keyArr = Object.keys(obj).sort();
  let newObj = {};
  for (const item of keyArr) {
    newObj[item] = obj[item];
  }
  return newObj;
}

// 字符串化对象
function JStringify(obj) {
  return JSON.stringify(obj);
}

// 双层遍历，返回重复项数组
function getMoreArr(arr) {
  let moreArr = new Array();
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (
        JStringify(formatObjInnerProperty(arr[i])) ==
        JStringify(formatObjInnerProperty(arr[j]))
      ) {
        moreArr.push(arr[j]);
        arr.splice(j, 1);
      }
    }
  }
  return moreArr;
}

resultArr = getMoreArr(arr1).concat(getMoreArr(arr2));
console.log(resultArr);
// [
//   { name: 'aaa', age: 13 },
//   { name: 'bbb', age: 15 },
//   { name: 'aaa', age: 13 },
//   { name: 'bbb', age: 15 }
// ]

```



