
# scss语法小记
[[toc]]

1. `!default`用法，给css变量赋上默认值，当用户定义了新值，则旧值不使用。
```scss
$font-size-base:      1rem !default;
```


2. `@extend`
继承某一变量的所有属性值。


3. `@import`
引入scss文件
@import "variables" 

4. `node-sass`
编译scss到本地。如果是parse分析过的scss文件，是没法被编译的。只能被导入
npx node-sass styles/_variables.scss var.css

5. `百分位操作符`
SCSS 的”%” 与 “.” 功能类似，但是不会输出代码 , 配合 `@extend`使用，继承特定属性段
```scss
%heading {
  margin-top: 0; // 1
  margin-bottom: $headings-margin-bottom;
  font-family: $headings-font-family;
}

h1 {
  @extend %heading;
  font-size: $h1-font-size;
}
```

6. `mixin`
     1. @mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。
     2. @include 指令可以将混入（mixin）引入到文档中。

7. 内置函数lighten: 
     1. 使颜色变浅 lighten($color, persent)
     2. persent为浅化多少，浅化7%，就填7%