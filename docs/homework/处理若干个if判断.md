---
title: 解决若干个if判断
author: 云上舟
date: "2022-04-06"

---

[[toc]]

## 问题提出

业务开发中，会遇到点击一个 Dom，触发各种回调。当这样的 Dom 属于同一个逻辑块时(例如 tab 标签页,头像中的下拉框(数个按钮))。就会有多个 if...else 判断。如以下示例：

```js
let tabText = "000";
function changeTab(index) {
    if (index == "1") {
      tabText = "外卖配送";
    } else if (index == "2") {
      tabText = "到店自取";
    } else if (index == "3") {
      tabText = "团购订餐";
    } else if (index == "4") {
      tabText = "精致好物";
    }
  }
  console.log("tabText",tabText) // 000
  changeTab("1");
  console.log("tabText",tabText) // 外卖配送
```

## Switch解法

switch(){ case x...}是常用的一种解决多个if...else判断的解法。

```js
let tabText = "000";
function changeTab(index) {
  switch (index) {
    case "1":
      tabText = "外卖配送";
      break;
    case "2":
      tabText = "到店自取";
      break;
    case "3":
      tabText = "团购订餐";
      break;
    case "4":
      tabText = "精致好物";
      break;
    default:
      tabText = "-----";
  }
}
  console.log("tabText",tabText) // 000
  changeTab("1");
  console.log("tabText",tabText) // 外卖配送
```

## Object映射

1、可以将key值作为判断，value值作为输出。

```js
function changeTab(index) {
  let obj = {
      "1": "外卖配送",
      "2": "到店自取",
      "3": "团购订餐",
      "4": "精致好物",
  }
  return obj[index];
}
console.log(`changeTab("1")`, changeTab("1")); // changeTab("1") 外卖配送
```

<br />

2、以回调函数来输出值

```js
function changeTab(index) {
  // 这里的值都以函数返回值进行输出，可在内部做逻辑操作。
  let obj = {
      "1": ()=>"外卖配送",
      "2": ()=>"到店自取",
      "3": ()=>"团购订餐",
      "4": ()=>"精致好物",
  }
  return obj[index]();
}
console.log(`changeTab("1")`, changeTab("1")); // changeTab("1") 外卖配送


```

## Map映射

1、可以利用Map中的.get方法，获取对应的值。

```js
// 基本类型取值写法
function changeTab(index) {
  let map = new Map([
    ["1", "外卖配送"],
    ["2", "到店自取"],
    ["3", "团购订餐"],
    ["4", "精致好物"],
  ]);

  return map.get(index);
}
console.log(`changeTab("1")`, changeTab("1")); // changeTab("1") 外卖配送

```

<br />

2、设置映射值为回调函数写法

```js
function changeTab(index) {
//设置映射值为回调函数写法，内部可添加业务逻辑。
 let map = new Map([
    ["1", ()=>"外卖配送"],
    ["2", ()=>"到店自取"],
    ["3", ()=>"团购订餐"],
    ["4", ()=>"精致好物"],
  ]);

  return map.get(index)();
}
console.log(`changeTab("1")`, changeTab("1")); // changeTab("1") 外卖配送

```

## 问题进阶

如果在判断status的基础上，还要加上用户身份的判断，那么代码将会如下所示:

```js
const onButtonClick = (status, identity) => {
  if (identity == "guest") {
    if (status == 1) {
      //do sth
    } else if (status == 2) {
      //do sth
    } else if (status == 3) {
      //do sth
    } else if (status == 4) {
      //do sth
    } else if (status == 5) {
      //do sth
    } else {
      //do sth
    }
  } else if (identity == "master") {
    if (status == 1) {
      //do sth
    } else if (status == 2) {
      //do sth
    } else if (status == 3) {
      //do sth
    } else if (status == 4) {
      //do sth
    } else if (status == 5) {
      //do sth
    } else {
      //do sth
    }
  }
};

```

### 进阶解决

依然可用map和object映射解决。变化的地方在于取结果时用到模板字符串拼接取值属性。

1、map写法

```js
function handleClick(identity,status) {
  // map写法
  let map = new Map([
    ["customer_1", () => "游客权限，状态值为1"],
    ["customer_2", () => "游客权限，状态值为2"],
    ["customer_3", () => "游客权限，状态值为3"],
    ["developer_1", () => "开发者权限，状态值为1"],
    ["developer_2", () => "开发者权限，状态值为2"],
    ["developer_3", () => "开发者权限，状态值为3"],
  ]);

  return map.get(`${identity}_${status}`)();
}

console.log(handleClick("developer","2")); // 开发者权限，状态值为2

```

2、 Object写法

```js
function handleClick(identity,status) {
    // object写法
    let obj = {
      "customer_1":()=>"游客权限，状态值为1",
      "customer_2":()=>"游客权限，状态值为2",
      "customer_3":()=>"游客权限，状态值为3",
      "developer_1":()=>"开发者权限，状态值为1",
      "developer_2":()=>"开发者权限，状态值为2",
      "developer_3":()=>"开发者权限，状态值为3",
    };
  
    return obj[`${identity}_${status}`]();
  }
  console.log(handleClick("developer","2")); // 开发者权限，状态值为2
```

3、Object联合Map写法
这种写法比较简洁。需要用到es6中的扩展运算符、filter。

```js
function handleClick(identity="developer", status="3") {
  // object联合map写法
  let map = new Map([
    [{ identity: "customer", status: "1" }, () => "游客权限，状态值为1"],
    [{ identity: "customer", status: "2" }, () => "游客权限，状态值为2"],
    [{ identity: "customer", status: "3" }, () => "游客权限，状态值为3"],
    [{ identity: "developer", status: "1" }, () => "开发者权限，状态值为1"],
    [{ identity: "developer", status: "2" }, () => "开发者权限，状态值为2"],
    [{ identity: "developer", status: "3" }, () => "开发者权限，状态值为3"],
  ]);

   // 遍历每个数组元素，再取数组元素的第一元素中的,key值,对比identity和status。返回对应结果
   let res =[...map].filter(([key, value]) => key.identity==identity && key.status==status);
   
   // res的值为[ [ { identity: 'developer', status: '3' }, [Function (anonymous)] ] ],取function的值
   return res[0][1]();
}
handleClick(); // 开发者权限，状态值为3

```

## 函数式编程

引入 ramda 库，也可以做if...else判断，格式上和Map相似。

```js
import R from "ramda";
var fn = R.cond([
  [R.equals(0), R.always("water freezes at 0°C")],
  [R.equals(100), R.always("water boils at 100°C")],
  [R.T, (temp) => "nothing special happens at " + temp + "°C"],
]);
fn(0); //=> 'water freezes at 0°C'
fn(50); //=> 'nothing special happens at 50°C'
fn(100); //=> 'water boils at 100°C'

```

## 总结

 在if...else判断逐渐增多时，可以选用switch、object映射、Map映射等方式去优化代码。也可引用第三方库Ramda去做判断。优化的最终目的，是保证代码有一定的可读性、高效性。



## 参考文章

[彻底消除if else， 让你的代码看起来更优雅 - 掘金](https://juejin.cn/post/6882390231715151879#heading-10)

