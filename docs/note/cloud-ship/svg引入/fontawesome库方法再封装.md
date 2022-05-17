
# fontawesome库方法再封装
[[toc]]
## 封装初衷
如果直接在对应组件文件中去使用`@fortawesome/react-fontawesome`,那么，随着组件数量增多，需要`fortawesome`的组件也逐渐增多。将会导致重复导入。因此将他封装为一个`<Icon/>`组件，方便在开发中使用。

## 源代码示例
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