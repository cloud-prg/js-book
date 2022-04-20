---
title: fortawesome的使用
author: 云上舟
date: "2022-04-20"
---

[[toc]]

## 安装
1. `npm i --save-dev @fortawesome/free-solid-svg-icons`
2. `npm i --save-dev @fortawesome/fontawesome-svg-core`
3. `npm i --save-dev @fortawesome/react-fontawesome`

## 使用

### 封装

```tsx
import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props;
  const classes = classNames("viking-icon",className,{
     [`icon-${theme}`]:theme
  });

  return (
      <FontAwesomeIcon className={classes} {...restProps} />
  )
};

export default Icon;
```

### 全局引入
在`App.tsx`中引入library,fas。这样节省时间去挨个引入svg图标
1. `import { fas } from "@fortawesome/free-solid-svg-icons";` fas意为引入所有图标
2. `import { library } from "@fortawesome/fontawesome-svg-core";`
3. `library.add(fas);`
```tsx
  <Icon theme="primary" icon="coffee" size="3x"></Icon>
```

### 创建_style
为了每个`icon-type`,type意为`primary danger dark light`等，需要引入各种各样的颜色，这时可以借助scss中的迭代语法`@each in`完成。 
```scss
$theme-colors: 
(
  "primary":    $primary,
  "secondary":  $secondary,
  "success":    $success,
  "info":       $info,
  "warning":    $warning,
  "danger":     $danger,
  "light":      $light,
  "dark":       $dark
);
```
```scss
@each $key,$val in $theme-colors {
  .icon-#{$key} {
    color: $val;
  }
}
```

## 遇到的问题
menu-item设置渐变效果时,`display:none`会使`transition`的动画效果失效。当注释掉使就能动画正常渲染,但少了`display:none`将导致透明度100%时元素仍然占据文档流位置。
### 解决方案
安装`react-transition-group`库，以及`typescript`配套库
1. `npm install --save-dev react-transition-group`
2. `npm install --save-dev @types/react-transition-group`

