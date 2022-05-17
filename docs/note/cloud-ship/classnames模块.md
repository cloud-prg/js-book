
# classnames模块
[[toc]]
## 介绍
classnames模块能够快速添加react中的className。可填入函数名，也可填入对象形式，判断其中每个className属性是否**展示**在标签中。

### 组件中的使用

```tsx
  // btn, btn-lg, btn-primary
  const classes = classNames("btn", {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

```
### 页面中的效果
```tsx
<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button btnType={ButtonType.Link} href="http://www,baidu.com" >baidu link</Button>
        <h1>Hello World</h1>
```