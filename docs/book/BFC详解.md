---
title: BFC详解
author: 云上舟
date: "2022-04-11"
---

[[toc]]



## 什么是BFC?

  BFC全称为 `Block Formatting Context`，译文为 **块级格式化上下文**。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。 　　　



## 如何创造BFC？

- 根元素或包含他的元素
- 浮动( 元素的 `float` 不为 `none`)(**脱离文档流**)
- 绝对定位元素 (元素的 `position` 为 `absolute` 或 `fixed`)（**脱离文档流**）
- 行内块 inline-blocks (元素的 `display: inline-block`)
- 表格标题`display: table-caption`
- 表格单元格`display:table-cell`
- `overflow`值不为`visible`的元素
- 弹性盒 flex boxes(元素的 `display: flex` 或 `inline-flex`)

在以上几种触发方法中，最常用的是`overflow:hidden`、`display:inline-block`、`display:flex`。



## BFC的约束规则

1. 同属于一个BFC的两个相邻Box将会造成margin重叠（塌陷)
2. BFC中的子元素不会超出包含它的块。
3. BFC的区域不会与float元素区域重叠
4. 计算BFC的高度时，浮动子元素(子元素与父元素同属一个BFC)也参与计算。



## 不使用BFC将可能造成哪些现象？

- 浮动高度塌陷
- 相邻元素外边距margin重叠
- 左右相邻的块因浮动而重叠

## BFC的实际应用场景

### 1、解决margin重叠（塌陷）

1. 包裹一层`overflow:hidden`的div 创造不同的BFC

```html
<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
    .new-bfc-div{
        overflow:hidden;
    }
</style>
<body>
    <div class="new-bfc-div">
        <p >父级设置overflow:hidden，将自身处于不同的BFC当中</p>
    </div>
    <p>Hehe</p>
</body>
```

2. 为其中一个p设置`display:inline-block`创造不同的BFC。

```html
<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p style="display: inline-block;">设置 display:inline-block</p>
    <p>Hehe</p>
</body>
```

### 2、清除内部浮动

当容器内部有浮动子元素时，给容器添加overflow:hidden,创造一个新的BFC。触发BFC规则:**BFC内的子元素参与高度计算**。

```html
<style>
    .par {
        border: 5px solid #fcc;
        width: 300px;

        /* 包含子元素时，创建BFC使用 overflow:hidden或display:flex */
        overflow: hidden;
        /* display: flex; */
    }
 
    .child {
        border: 5px solid #f66;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class="par">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```



### 3、水平方向margin取消重叠

我们可以给div加个`display:inline-block`，触每个div容器生成一个BFC。那么三个DIV便不属于同一个BFC（这个只body根元素形成的BFC），就能**取消margin重叠**了。

```html
<!doctype HTML>
<html>
<head>
<style type="text/css">

    #green {
        margin:10px 10px 10px 10px;
        display: inline-block;
    }
    #blue {
        margin:10px 10px 10px 10px;
        display: inline-block;
    }
    #red {
        margin:10px 10px 10px 10px;
        display: inline-block;
    }
    body {
        writing-mode:tb-rl;
    }

</style>
</head>
<body>

<div id="green" style="background:lightgreen;height:100px;width:100px;"></div>
<div id="blue" style="background:lightblue;height:100px;width:100px;"></div>
<div id="red" style="background:pink;height:100px;width:100px;"></div>

</body>
</html>
```



### 4、嵌套margin消除

经典的嵌套`margin`,例如`ul>li`,我们需要给ul添加 `overflow:hidden`，让子元素参与高度计算。同时给`li`添加 `display:table-caption`（这里不使用`display:inline-block`,为了**不改变**li纵向布局）,给`li`添加独立的`BFC`，**取消margin重叠问题**。

```html
<!DOCTYPE html>
<html>  
<head> 
  <style> 
    html, body { height: 100%; width: 100%; margin: 0; padding: 0; }
    #map{
      padding:0;
    }
    ul{
      /* 设置overflow:hidden 让子元素参与高度计算 */
      margin:10px;
      background:lightblue;
      overflow:hidden ;
    }
    li{
        /* 设置inline-caption,这里不使用Inline-block，防止布局变成横向,让每个li有独立的BFC */
      display: table-caption;
      margin:25px;
    }
  </style> 
  
  
</head> 

<body class="claro"> 
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</body> 

</html>
```



### 5、自适应多栏布局

多栏布局中，如果存在`float:left`块元素以及 `float:none`的元素，则会造成float浮动导致**多栏重叠**。根据BFC规则：BFC区域不会与浮动元素重叠。只要为其他非浮动元素触发BFC即可。(添加`overflow:hidden`或 `display:flex`)

```html
<style>
    body {
        width: 300px;
        position: relative;
    }
 
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
 
    .main {
        height: 200px;
        background: #fcc;

        /* 添加以下条件之一,触发BFC。 */
        display: flex;
        overflow: hidden;
    }
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
```





## 总结

1. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
2. BFC的主要几个用法：清除浮动、解决margin重叠塌陷问题、让子元素参与高度计算。
3. 在为元素创造BFC的同时，尽量不要改变原有的布局。例如给li设定 `display:inline-block`，虽然有效解决的margin重叠塌陷，但也导致li布局变成了横向。



## 参考文章

1. [BFC原理剖析 - github](https://github.com/zuopf769/notebook/blob/master/fe/BFC原理剖析/README.md)
2. [块格式化上下文 - Web 开发者指南 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

