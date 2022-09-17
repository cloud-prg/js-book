## 目录
[[toc]]


## BEM是什么？
`BEM`是`Block Element Modifier`的缩写，定制`css`书写的规范。它由 **块** 、 **元素** 、 **修饰符** 三个层级组成。每个 **层级之间** 有不同的连接符，而 **层级内部** 也有连接符。`BEM`规范的出现能够很好的帮助团队进行`css`代码统一、代码管理。
:::tip
- 层级内部连接符: `-`,`ps: el-button、el-menu-item`
- 块与元素间的连接符：`__`
- 元素与修饰符之间的连接符: `--`
:::
## BEM解决了什么痛点？
   ## 痛点由来
   在日常的页面开发当中，有些开发者可能习惯使用`css`去编写样式。为了防止`css`样式冲突，都会使用 **深层次嵌套** 的方式去写样式。 这样导致的后果是: 在开发者需要对样式进行 **查找** 或者 **修改** 时，不能及时快速定位到指定的目标类，及时修改完，其本身所保留的可读性也十分差。用`scss`的 父元素引用符号`&__`也会引出一层层嵌套，其转换的`css`或者`min.css`文件,代码结构存在同样的问题。
   
   ## 痛点解决
   使用`BEM`规范去书写`css`代码，无需一层层嵌套，其独特的样式命名极大减少了 **样式冲突** 的可能。 更确切地来说是 **组件化** ---- 单体样式不管放在哪里都可以正常运行生效。

## BEM的优势与劣势在哪里？
## 优势
  1. 高复用性: 每一个类都是单独的样式。
  2. 可读性强: 低嵌套 或 无嵌套的样式代码。代码语义精炼。（类名语义化，结构化）
  3. 函数式代码： 与`sass`的 `function`、`mixin`、`include`相结合，结构清晰，逻辑性强。
  4. 扩展性强: `CSS`选择器的颗粒度足够细，可灵活改动
## 劣势
  1. 有一定的学习成本(sass及其中的函数)，需要多加使用，才能沉淀其精髓
  2. 不具有 **普适性**, 部分开发者无法接受其较长的命名规范而中途放弃。
  3. 样式命名一定有个前缀，比如`element-ui`中的`el`

## html代码示例
比如产品名字的简称叫`y`
```html
<div class="container">
  <!-- 头部 -->
  <header class="y-header">
    <div class="y-header__nav">
      <div></div>
    </div>
    <!-- 头像区域 -->
    <!-- 激活 -->
    <div class="y-header__profile y-header__profile--active"></div>
    <!-- 禁用 -->
    <div class="y-header__profile y-header__profile--disabled"></div>
    <!-- 绿色边框（登陆成功时) -->
    <div class="y-header__profile y-header__profile--disabled is-success"></div>
  </header>
  <!-- 主体 -->
  <section class="y-content"></section>
  <!-- 底部 -->
  <footer class="y-footer"></footer>
<div>
```

## scss代码示例
在`scss`中，通过配置 前缀、连接符变量名、`BEM`快速生成函数，去更高效便捷地书写`css`代码。

:::tip
`scss`用到的指令:
1. `@at-root`  : 可以使一个或多个规则被限定在根层级上，而不是定在其所在的位置（在父级规则之下） 。
2. `@content`  ：调用了`@include mixinHandler(xx){}`混合函数后，花括号`{}`里的内容都会在`@content`声明处显示。
3. `!global`   : 变量提升为全局变量。
4. `hitAllSpecialNestRule`  ：判断父级选择器是否包含`--`,`is-`,`:`
:::


## 主要用到的函数
1. `b($block)`: 块
2. `e($element)`: 元素
3. `m($modifier)`：修饰符
4. `when($state)`: 状态样式

## 变量名配置
```scss
// config.scss
$namespace: "y";
$element-separator: "__";
$modifier-separator: "--";
$state-prefix: "is-";
```

## `BEM`函数配置 
### `B`函数
```scss
@mixin b($block) {
  // 提升到全局
  $B: $namespace+"-"+$block !global;
  #{$B}{
    $content;
  }    
}
```


### `E`函数
```scss
@mixin e($element){
  // 提升到全局
  $E: $element !global; // 元素 提升至全局
  $selector: &; // 父级选择器
  $currentSelector: ""; // 当前选择器

  //这一步的迭代，考虑到传入的$element可以是数组形式，如['button','card']
  @each $unit in $element {
    // .el-card__content , .el-card__header
    $currentSelector: #{$currentSelector + "." + $B + $element-separator + $unit + "," };
  }
  
  // 检测父级是否有 `is-` `--` `:`
  @if hitAllSpecialNestRule($selector) {
    @at-root {
       // 元素样式将在父级规则下，并最终在文档的根层级下生成。
       #{$selector}{
         #{$currentSelector}{
          @content 
         }
       }       
    }
  } @else {
    // 在文档的根层级下生成。
    @at-root {
      #{$currentSelector}{
        @content
      }
    }
  }
}****
``` 

### `M`函数
```scss
@mixin m($modifier) {
  $M: $modifier !global;
  $currentSelector : "";
  
  @each $unit in $modifier{
    $currentSelector : $currentSelector + & + $modifier-separator + $unit + ","; 
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}
```

### `when`函数
```scss
@mixin when($state){
  @at-root{
    #{$state-prefix +$state}{
      @content
    }
  }
}
```


## 知识直通车
1. [什么是BEM？](https://www.cnblogs.com/ChengWuyi/p/5667945.html)
2. [浅谈element-ui中的BEM范式实践](https://www.cnblogs.com/ChengWuyi/p/8684776.html)
3. [结合Element分析基于scss实现BEM的方法(类源码解析)](https://juejin.cn/post/6894265906596642829##heading-9)