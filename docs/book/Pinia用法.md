
# Pinia用法
[[toc]]


## 安装pinia

```shell
npm install pinia
```



## 创建目录

在src下创建store,及store/index.js

```js
// src/store/index.js

import {createPinia} from "pinia"

const store = creatPinia();
export default store;
```



## 主文件导入

main.js中导入pinia

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store/'

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');

```



## 定义State

在store目录下创建user.js

```js
// user.js
import {defineStore} from "pinia"

const useUserStore = defineStore({
	id:"user", // 注意，id必须是唯一值
    // state为回调中的返回值，值类型为对象。
    state: ()=>{
			return {
                name:"张三"
            }
    	}
})
```



## 获取State

在页面中引用,有三种获取方式。

- 直接在页面中使用属性
- 使用计算属性在script中获取
- 直接解构赋值取出的name，会使name失去响应性。使用pinia模块中的storeToRefs，可以解决此问题。

```vue
<script setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
// import { computed } from "vue";

const userStore = useUserStore();

// ---获取方式一---
// 使用计算属性获取
// const name = computed(() => userStore.name);

// ---获取方式二---
// 直接解构赋值取出的name，会使name失去响应性。使用pinia模块中的storeToRefs，可以解决此问题。
const { name } = storeToRefs(userStore);
</script>
<template>
  <div>
    <h1>{{ context }}</h1>

    <!-- 不需要userStore.state去取name -->
    <h2>{{ name + "123" }}</h2>

    <!-- ---获取方式三--- -->
    <h2>{{ userStore.name }}</h2>
  </div>
</template>


```



## 修改State

在user.js中添加action

```js
//src/store/user.js

import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user", // id必填, 且需要唯一

  // 声明state,为一个回调返回一个对象。
  state: () => {
    return {
      name: "张三",
    };
  },

  action:{
      updateName(name){
          this.name = name;
      }
  }
});

```

在页面中引用该方法即可

```vue
<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
userStore.updateName('李四')
</script>

```

### 批量修改

可用$patch方法修改多个数据，这样做的好处是**只更新一次视图**。

```js
    // 方法二，需要修改多个数据，建议用 $patch 批量更新，传入一个对象
    userStore.$patch({
        count: user_store.count1++,
        // arr: user_store.arr.push(1) // 错误
        arr: [ ...userStore.arr, 1 ] // 可以，但是还得把整个数组都拿出来解构，就没必要
    })
    
    // 使用 $patch 性能更优，因为多个数据更新只会更新一次视图
    
    // 方法三，还是$patch，传入函数，第一个参数就是 state
    userStore.$patch( state => {
        state.count++
        state.arr.push(1)
    })
```



## 计算属性getter

创建一个回调，返回state中的值，可在return中做些逻辑操作。

```js
getters: {
   fullName: (state) => {
     return state.name + '丰'
   }
 }
```

在页面中引用

```js
userStore.fullName // 张三丰
```



## 使用异步action

使用异步便能调用HTTP方法，请求接口。再创建一个setData方法，便能实现返回数据保存在状态中。

```js
 actions: {
    async login(account, pwd) {
      const { data } = await api.login(account, pwd)
      const appStore = useAppStore()
      this.setData(data) // 调用 app store 里的 action 方法
      return data
    },
    setData(data) {
      console.log(data); // 打印数据
    }
  }

```



## 实现数据持久化

插件 pinia-plugin-persist 可以辅助实现数据持久化功能。

### 安装

```shell
npm install pinia-plugin-persist --save
```



### 使用

在对应的store中启用persist即可。数据默认存在sessionStorage离，并且会以store的id作为key.

```js
export const useUserStore = defineStore({
  id: 'user',

  state: () => {
    return {
      name: '张三'
    }
  },
  
  // 开启数据缓存
  persist: {
    key:"my_user"
    enabled: true
  }
})
```

### 指定持久化

可用path来指定state中的几个属性持久化，没有被指定的将在刷新时丢失，重新回到初始状态。且在strategies中，可设置storage类型，默认为会话存储，也可设置会localStorage本地存储。

```js
state: () => {
  return {
    name: '张三',
    age: 18,
    gender: '男'
  }  
},

    
  // 开启数据缓存，在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage
    // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化，如：paths: ['userinfo'] 替换key的位置
  // 只要state中的数据发生变化，它就实时刷新并存储到相应得storage中。
persist: {
  enabled: true,
  strategies: [
    {
      storage: localStorage,
      paths: ['name', 'age']
    }
  ]
}
```



## 总结

1.  安装pinia命令 `npm install pinia` 
2.  页面中可用3种方式获取state中的值.
   - ​	直接在模板中使用
   - ​    用计算方式提前获取
   - ​    直接解构赋值取出的name，会使name失去响应性。使用pinia模块中的  `storeToRefs`，可以解决此问题。
3.  可引用pinia-plugin-persist 插件，将store中的状态都存入SessionStorage或者localStorage。且该插件可选择指定的数据存储到浏览器的storage中。

    - ​	在store下，设置一个属性persist,该对象里标注`enabled:true`,即可实现数据持久化
    - ​    persist对象里设置一个属性`strategies`数组，第一个参数为对象，可设置key和storage，对应着浏览器中`storage`中存储的键名以及对应storage类型。
    - ​    stategies中可设置`paths`,来指定哪些状态允许被**持久化**。
    - ​    只要state变化，则storage的**持久化部分**的数据将会**刷新**。

