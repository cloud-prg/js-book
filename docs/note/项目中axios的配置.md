# 项目中axios的配置
[[toc]]

## 创建实例
```js
import axios from "axios"

const service =axios.create()
```

## 设置默认属性
```js
// 默认的URL前缀
service.defaults.baseURL= process.env.VUE_APP_BASE_URL;

// 设置请求超时时间(30秒)
service.defaults.timeout = 30000;

//跨域是否携带凭证
service.default.withCredentials = true;

// 设置post请求头(文本类型json,字体编码UTF-8)
service.default.headers["Content-Type"]= "application/json;charset=UTF-8"；
service.default.post["X-Access-Token"]="00";
```

## 请求拦截
```js
// 请求拦截
service.interceptors.request.use(
    (config)=>{
        // 在发送请求之前做些什么 验证token之类的
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.error(error);
    }
)
```

## 响应拦截
```js
// 响应拦截
service.interceptors.response.use(
    (response)=>{
        // endLoading();
        // 对相应数据做点什么
        return response;
    },
    (error) => {
        // 对相应错误做点什么
        return Promise.reject(error);
    }
)
```
