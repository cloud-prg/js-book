---
title: button需求分析
author: 云上舟
date: "2022-04-20"
---

[[toc]]



## type
1. primary 主要
2. default 默认
3. danger 危险
4. link-button 链接按钮
5. warning 警告⚠


## size
1. normal 正常
2. small 小字号
3. large 大字号

## disbaled状态
不可点击
disbaled
link button

## 是否支持原生
只要注意引入的className不与原生自带属性同名，剩余的自带属性通过`{...restProps}`去引入即可。
:::warning
`{...restProps}`必须放在最后，否则会报错
:::



## classnames模块
classnames模块,里面的default方法可以整合所有传入的className,其原理应该用到了柯里化函数，，可以引入
```shell
npm instlall classnames --save-dev
npm instlall @types/classnames --save-dev