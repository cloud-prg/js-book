# 目录

[[toc]]



# 什么是json Schema？

`json Schema` 是一款用于对json数据进行 **类型检查** 的工具。再直白一些来说，它有点像`jest`、`mocha` 这种测试工具，在特定的`mock`数据下，返回开发者写好的 **预期结果** 。

:::tip

**引用**：Json Schema定义了一套词汇和规则，这套词汇和规则用来定义Json[元数据](https://so.csdn.net/so/search?q=元数据&spm=1001.2101.3001.7020)，且元数据也是通过Json数据形式表达的。Json元数据定义了Json数据需要满足的规范，规范包括成员、结构、类型、约束等。

:::



# 安装指令

**注意:** 期间可能还会用到 **自定义格式化属性** 、 **自定义错误信息返回** 、**设置错误信息的语种** 1， 因此要额外安装3个包。

- `npm install ajv`
- `npm install ajv-formats`
- `npm install ajv-errors`
- `npm instlal ajv-i18n`



# 基本使用

## 官方demo

在`src`目录下，创建一个新文件夹`json-schema`，然后在其下创建`test.js`文件。

```js
// @/json-schema/test.js
const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

// 对象类型 模板
const schema = {
  type: "object", // 类型
  properties: {
    // 对象上的属性（特征）
    foo: { type: "number" },
    bar: { type: "string" },
  },
  required: ["foo"], // 必输入项
  additionalProperties: false,
};
// 单数据类型 模板
// const singleSchema = {
//     properties: {
//         foo: { type: "int32" }
//     },
//     optionalProperties: {
//         bar: { type: "string" }
//     }
// }

const validate = ajv.compile(schema);

const data = {
  foo: 1,
  bar: 1, // 故意输错
};

const valid = validate(data);
if (!valid) console.log(validate.errors);

```

## 如何定义数据的格式

使用`format`属性，在创建`schema`模板变量时，定义属性的`format`。

### 示例

```js
const Ajv = require("ajv");
const ajvFormats = require("ajv-formats");

// 对象类型模板
const schema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
        }
    }
};

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
ajvFormats(ajv);

const validate = ajv.compile(schema)
const valid = validate({
    email: 'haha@qq.com',
})
console.log("valid result",valid); // true
if (!valid) {
    console.log(validate.errors);
}
```



:::tip

​	由于format可设置属性很多，详情点击: [Format validation | Ajv JSON schema validator](https://ajv.js.org/guide/formats.html#string-formats)

:::



## 如何设置错误信息语种

```js
// 开头引入
const localize = require("ajv-i18n");

// ...xxx

// 尾部信息提示引入
if (!valid) {
  // 设置成zh---中文
  localize.zh(validate.errors);
  console.log(validate.errors);
}
```



## 如何设置报错提示

```js
// ...xxxx
// 开头引入`ajv-errors`
const { default: ajvErrors } = require("ajv-errors");

// 如果传的数据模板是单个数据，写法如下
const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
        
      // 设置错误信息
      errorMessage: {
        type:"必须是字符串",
        minLength: "长度不能是小于10",
        format: "格式不是email!"
      },
    }
  }
};

```



## 如何自添加 格式化

```js
// ...xxx
const Ajv = require("ajv");
const ajv = new Ajv();
// 添加ajv-formats包
const ajvFormat = require("ajv-formats");

// 将ajv传入ajvFormat函数中
ajvFormat(ajv);

const schema = {
	properties:{
		message:{
            type: 'string',
            format: "abc", //这里写下面添加的新format属性值
        }	
    }
}

/**
  *  @params 格式化属性值 名称
  *  @params ()=>{} 回调函数: 参数为传入的schema模板值
  */
ajv.addFormat("abc",(data)=>{
	// ...对data的逻辑判断,返回Boolean
})
```



## 参考文献

1. [【vue3学习系列】json-schema的初识与学习_庞囧的博客-CSDN博客](https://blog.csdn.net/pagnzong/article/details/121109775)
2. [Getting started | Ajv JSON schema validator](https://ajv.js.org/guide/getting-started.html)

