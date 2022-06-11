---
title: 如何处理若干if..else
author: 云上舟
date: "2022-04-05"
---


```js
const statusStr = new Map([
  ["1", "待付款"],
  ["2", "待发货"],
  ["3", "已发货"],
  ["4", "交易完成"],
  ["5", "交易关闭"],
  ["default", "无"],
]);

const getStatus = (status) => {
  let actions = statusStr.get(status) || statusStr.get("default");
  console.log(actions);
  return actions;
};

console.log(getStatus("0"));

```
