
# jest简单使用
[[toc]]
# jest介绍

一款开源免费且通用的测试工具，可以对代码进行单元测试。

## 语法及api介绍


1. toBe:与结果是否全等
```js
test('测试的名称',()=>{
    // 期望得到的结果，是否全等
    expect("结果值，可以是任何类型").toBe("需要比对的目标值")
})
```
2. toEqual: 与结果是否值相等
3. toBeTruthy: 是否为真
4. toBeFalsy: 是否为假
5. toBeGreaterThan: 是否大于
6. toBeLessThan: 是否小于