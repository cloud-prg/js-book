---
title: Es6数组测试
author: 云上舟
date: "2022-03-16"
---

### 测试内容

   通过es6的一些数组api,来完成以下的数组测试:

1. 声明一个变量，查找arr数组中的aaa并且返回。
2.  声明一个变量，返回一个数组给arr数组内的每一项添加字符串"$"符号。
3.  声明一个变量，返回一个数组arr中的字符串
4.  声明一个变量，返回布尔值，如果arr数组中存在字符串则返回true,否则返回false
5.  声明一个变量,返回布尔值，如果arr数组中所有值都是字符串，则返回true，否则返回false
6.  声明一个变量,返回arr数组中数字的总和



### 题目详解

:::tip

  使用ES6中的一些新增api,对数组进行测试,使用并练习。

:::

题解1：

```js
/**
  * 声明一个变量，查找arr数组中的aaa并且返回。
  */

var localArr = [1,2,'aaa',34,21,'str'];
let goalStr = "";
goalStr = localArr.filter(item=> item=='aaa')[0];// "aaa"
return goalStr;
```



题解2：

```js
/**
  * 声明一个变量，返回一个数组给arr数组内的每一项添加字符串"$"符号。
  */

var arr = [1,2,'aaa',34,21,'str'];
let dollarArr = new Array;
//  其中1,2,34,21会被转换成字符串与"$"拼接
dollarArr = arr.map(item=> "$"+item); // ["$1","$2",'$aaa',"$34","$21","$str"]
return dollarArr;

```



题解3：

```
/**
  * 声明一个变量，返回一个数组arr中的字符串
  */

var arr = [1,2,'aaa',34,21,'str'];
let strArr = new Array;
strArr= arr.filter(item => typeof(item) == "string" ) // ['aaa','str']
return strArr;

```



题解4：

```
/**
  * 声明一个变量，返回布尔值，如果arr数组中存在字符串则返回true,否则返回false
  */

var localArr = [1,2,'aaa',34,21,'str'];
let isHaveStr = undefined; // 是否存在字符串
isHaveStr = localArr.some(item=> typeof(item)=="string");
return isHaveStr;
```



题解5：

```
/**
  * 声明一个变量,返回布尔值，如果arr数组中所有值都是字符串，则返回true，否则返回false
  */

var localArr = [1,2,'aaa',34,21,'str'];
let isAllStr = undefined; // 是否所有值为字符串
isAllStr = localArr.every(item=>typeof(item)=="string");
return isAllStr; // false

```



题解6：

```
/**
  * 声明一个变量,返回arr数组中数字的总和。
  */

var arr = [1,2,'aaa',34,21,'str'];
let summary = 0; //计数数字总和

for (let item of arr){
   if(typeof(item)=="number"){
   		summary+=item
   }
   continue;
}

return summary; //58

```

