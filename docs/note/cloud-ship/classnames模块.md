## 介绍
classnames模块能够快速添加react中的className

组件中
``` tsx
  // btn, btn-lg, btn-primary
  const classes = classNames("btn", {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

```

页面中
```tsx
<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button btnType={ButtonType.Link} href="http://www,baidu.com" >baidu link</Button>
        <h1>Hello World</h1>
```

浏览器中
```
btn btn-primary=
```