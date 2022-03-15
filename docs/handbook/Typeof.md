---
title: typeof判断
author: 云上
date: "2022-03-15"
---

### 数据类型

  在ES5中，数据类型分为两大类，分别是基础类型(undefined、null、number、string、boolean)和引用类型(object)。在实际工作中，为判断获取到的数据是什么类型，我们会用到typeof。



### typeof的通常用途

判断基础类型

```
typeof(1) //number
typeof(true) //boolean
typeof("moc") //string
typeof(undefined) //undefined
```

判断引用类型

```
typeof(new Date()) // object
typeof({}) // object
typeof([]) // object (数组属于引用类型)
```



### typeof的缺陷

  虽然大多时候typeof判断类型很好用，但它也不是万能的。

##### 1、无法判断null

```
typeof(null) // object
```

可以看到判断null时，返回的类型是object。这是因为JS语言在最初设计时，判断数据是通过机器码的末尾3位判断的。而null和object的末尾3位恰好都是”000“。而导致的这一bug。

##### 2、对于部分引用数据判断为function

``` 
typeof Array //function
typeof(function(){})  //function
```

虽然他们都是引用类型，但是ECMA官方文档有规定，内置call工具类的引用类型都算作是function。因此，部分引用类型并不判断为Object。

### 总结

  typeof判断除null之外的基础数据类型不会出错。判断引用类型时，需要了解数据是否内置call工具类，若内置则判断为function，否则为object。

