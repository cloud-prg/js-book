---
title: Es6数组测试
author: 云上
date: "2022-03-16"
---

### 数组测试

  通过javascript中的数组api，或手写一些api，来完成这些数组测试。

```
var arr = [1,2,'aaa',34,21,'str'];
1.  声明一个变量，查找arr数组中的aaa并且返回。
2.  声明一个变量，返回一个数组给arr数组内的每一项添加字符串"$"符号。
3.  声明一个变量，返回一个数组arr中的字符串
4.  声明一个变量，返回布尔值，如果arr数组中存在字符串则返回true,否则返回false
5.  声明一个变量,返回布尔值，如果arr数组中所有值都是字符串，则返回true，否则返回false
6.  声明一个变量,返回arr数组中数字的总和
```



### 解题思路

测试中使用到JS自带的数组api，及循环语句。

题解1：

使用map循环，返回含有'aaa'的数组，再用filter过滤不相关元素。

考虑到传入数组中不一定只含有一个'aaa'，因此map返回时以映射的形式返回，方便数据区分。

```
 var arr = [1,2,'aaa',34,21,'str'];
 /**
  * map迭代数组，返回(item,index)，作为每个数组元素的映射
  * map无法跳出循环
  * map不改变原数组
  * filter迭代数组，返回(item,index),只返回布尔值为true的数据
  * filter同样不改变原数组
  */

const strArray = arr.map((item,index)=> item=='aaa' && {item,index}).filter(item=>item);
console(strArray); // {item:"aaa",index:"2"}


/**
  * 
  */

```



