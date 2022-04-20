---
title: CSSTransition库方法再封装
author: 云上舟
date: "2022-04-20"
---

[[toc]]
## 封装初衷
`CSSTransition`用于为组件定制动画效果。分为6个阶段,以前缀名`zoom-in-top`为例
1. zoom-in-top-enter
2. zoom-in-top-enter-active
3. zoom-in-top-enter-done
4. zoom-in-top-leave
5. zoom-in-top-leave-active
6. zoom-in-top-leave-done

## 源代码示例
### CT组件封装
```tsx
import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, wrapper, animation, ...restProps } = props;

  return (
    <CSSTransition
      {...restProps}
      classNames={classNames ? classNames : animation}
    >
      {wrapper ? <div> {children}</div> : { children }}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;

```
### SCSS动画代码配置
`_mixin.scss`写入类函数scss混入代码
```scss
@mixin zoom-animation(
  $direction: "top",
  $scaleStart: scaleY(0),
  $scaleEnd: scaleY(1),
  $origin: center top
) {
  .zoom-in-#{$direction}-enter {
    opacity: 0;
    transform: $scaleStart;
  }

  .zoom-in-#{$direction}-enter-active {
    opacity: 1;
    transform: $scaleEnd;
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms,
      opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    transform-origin: $origin;
  }

  .zoom-in-#{$direction}-exit {
    opacity: 1;
  }

  .zoom-in-#{$direction}-exit-active {
    opacity: 0;
    transform: $scaleStart;
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms,
      opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    transform-origin: $origin;
  }
}

```

<br/>

`animation.scss`中引用
```scss
@include zoom-animation('top',scaleY(0),scaleY(1),center top);
@include zoom-animation('left',scale(0.45,0.45),scale(1,1),top left);
@include zoom-animation('right',scale(.45,.45),scale(1,1),top right);
@include zoom-animation('bottom',scaleY(0),scaleY(1),center bottom);
```

<br/>

`mixin.scss`全局引入
```scss
// animation
@import './animation.scss';

```
