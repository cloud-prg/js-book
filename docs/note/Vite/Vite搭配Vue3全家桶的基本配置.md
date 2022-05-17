
# Vite搭配Vue3全家桶的基本配置
[[toc]]
:::warning
Nodejs版本要大于 12 。(若低于此版本，可用gnvm node版本控制工具)
<br />
版本显示命令`node -v`
:::

## 一、创建Vite

1. 快捷创建，可选择UI框架，`npm init @vitejs/app`

2. 快捷创建vue,若npm为6.x, 则执行 `npm init vite@latest my-vue-app --template vue`
3.  快捷创建vue,若npm为7+, 则执行 `npm init vite@latest my-vue-app -- --template vue`



## 二、配置vite.config.ts

### 配置 **路径别名** 

 在`defineConfig` 中，配置 `resolve`, `resolve`下配置`alias`,搭配 `path`模块的`path.resolve(___dirname,路径)`

:::tip
需要引入`path`模块
:::

```ts
import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'


const pathResolve = (dir: string) => resolve(__dirname,dir);

// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: {
      "@": resolve(__dirname,"./src"),
      "utils": resolve(__dirname, "src/utils"),
    },
  },

})

```



### 配置Element Plus按需引入

:::tip
需要引入两个模块: `unplugin-auto-import`、`unplugin-vue-components`
:::

```ts
import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/vite'; 


export default definedConfig({
    // xxx
    plugins:[{
        vue(),
        AutoImport({
			resolvers:[ ElementPlusResolver() ]
    	}),
    	Components){
            resolvers: [  ElementPlusResolver()]
        }
    }]
})
```

#### 在main.js添加el-plus

```ts
// 添加elementUI组件库
import ElementPlus from "element-plus";

// 添加中文
import zhCn from "element-plus/es/locale/lang/message/style.scss"

// 添加指定样式
import "element-plus/es/components/message/style.css"
import "element-plus/es/components/message-box/style.css"

const app = createApp("App");
app.use(ElementPlus,{local: zhCn})
```



## 配置vuex

:::tip
​需要模块vuex,安装命令:`npm install vuex@next`
:::

```ts
// src/store/index.ts
import { createStore } from "vuex";

export default createStore({
    state:{
        count: 0
    },
    mutations: {
        setCount(state,count) {
            state.count = count+1;
        }
    },
    actions:{
        getCount({ commit }){
            commit("setCount",4);
        }
    }
})
```

```ts
// src/main.ts
// ...
app.use(store)
```



## 配置路由

:::tip
​需要模块`vue-router`，安装命令: `npm install vue-route@4`
:::

```ts
// src/router/index.ts
import { createRouter,createWebHashHistory, RouteRecordRaw} from "vue-router";


const routes: Array<RouteRecordRaw> = [
    {
        path:"/home",
        name:"Home",
        component: () => import("@/views/home.vue"),
    },
    {
        path:"/",
        redirect:"/home",
    }
];


export const Router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default Router;
```

```ts
// src/main.ts
app.use(router);
```



## 配置axios

:::tip
​需要模块`axios`,安装命令: `npm install axios`
:::

```ts
// src/utils/http.ts
import Axios from "axios";



const BASE_URL = "" ; // 默认前缀
const TIME_OUT = undefined; // 默认超时

const instance = Axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})


// 默认请求体头部 post请求
instance.defaults.headers.post = {
    "Content-Type" : "application/x-www-urlencoded"
}

// 请求拦截
instance.interceptors.request.use(config=>{

    return config
},error=>{

    return Promise.reject(error);
})

// 响应拦截
instance.interceptors.response.use(config=>{

    
},error=>{

    return Promise.reject(error);
})

export default instance;
```

```ts
// src/Api/user.ts
import $http from "@/utils/http";


// 添加用户登录请求 如果data约定好，可以添加ts 接口类型
export const userLogin = (data: any) => {
  return $http({
    url: "xxx",
    method: "post",
    data,
  });
};

```



## 问题记录

### 1.alias失效

在vite.config.ts中，关于`alias`别名失效了，使 `@/utils/http` 这一段引入，报了错。以下是原配置:

```ts
import { defineConfig } from 'vite'
import { resolve } from "path";
const pathResolve = (dir: string) => resolve(__dirname,dir);
export default defineConfig({
  plugins: [vue(),
  ],
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: {
      "@": resolve(__dirname,"./src"),
      "utils": resolve(__dirname, "src/utils"),
    },
  },
})
```



### 1.问题的原因及解决

如果用了ts那么还需要在tsconfig.js中进行额外配置，注意path对象是在compilerOptions对象里面

```ts
"compilerOptions": {
"paths": {
      "@/*":["./src/*"],
    }
}
```

## vite的webpack打包

```ts
// xxx

export default defineConfig({
    // xx
 build: {
    target: "es2015", // 主要用于兼容低版本浏览器 可以解决chrome65版本打包
    cssTarget: 'chrome65', // 兼容低版本浏览器上样式问题
    assetsDir: './assets', // 打包配置路径
    rollupOptions: {
      input: {    // 主要用于配置多页面
        platForm: resolve(__dirname, 'platform.html'),
        merchant: resolve(__dirname, 'merchant.html')
      }
    }
  }
})
```





## 配置总结

 `Vite`+`Vue3`的搭建，基本上有:

1.  Vuex: 状态管理工具 (可用其他插件代替，比如pinia)
2. axios: 异步请求api
3. vue-router: 路由管理器
4. element-plus: UI组件库 (可用其他UI组件库搭配使用)
5. 打包配置，详情配置参阅官方文档 [[配置 Vite {#configuring-vite} | Vite中文网 (vitejs.cn)](https://vitejs.cn/config/)](https://vitejs.cn/config/)