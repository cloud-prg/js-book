




## 需求分析
-  顶部有标题
-  主体顶部有个输入框，可以搜索关键字，通过关键字，下列列表动态改变，显示与搜索有关的项。
-  主题顶部最左侧有个按钮，表示反选
-  主体内容，列有最多5行数据，可通过滚动条来下滑找数据。
-  主体内容，最右边有个"x"按钮，当光标移动到相关行时显示。点击则移除。
-  主体左下角，显示条目数。中间有3小列字，All,Active,Completed,右下角按钮，清空待办事项。
-  当条目数为0时，主题内容显示 ”暂无内容



## 执行步骤

1. App.vue页面删减一些不必要的代码。

   ```
   
   ```

   

2. 配置路由vue-router,  `npm install vue-router`, `vue add router`然后在 **根目录**下创建router文件夹，配置index.js。

   ```js
   import { createRouter, createWebHashHistory } from 'vue-router'
   import HomeView from '../views/HomeView.vue'
   
   const routes = [
     {
       path: '/',
       name: 'home',
       component: HomeView
     },
     {
       path: '/about',
       name: 'about',
       // route level code-splitting
       // this generates a separate chunk (about.[hash].js) for this route
       // which is lazy-loaded when the route is visited.
       component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
     }
   ]
   
   const router = createRouter({
     history: createWebHashHistory(),
     routes
   })
   
   export default router
   
   ```

3. 在main.js中挂载router

   ```js
   import { createApp } from 'vue'
   import App from './App.vue'
   import router from './router'
   
   const app = createApp(App);
   app.use(router);
   app.mount('#app');
   
   ```

   :::warning 注意

   ​	Vue3在main.js挂载router要写出链接的形式。

   ​	`const app = createApp(App).use(Router);`

   :::

4. APP页面

   ```js
   <template>
     <nav>
       <router-link to="/">Home</router-link> |
       <router-link to="/about">About</router-link>
     </nav>
     <router-view/>
   </template>
   
   <style lang="less">
   #app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
   }
   
   nav {
     padding: 30px;
   
     a {
       font-weight: bold;
       color: #2c3e50;
   
       &.router-link-exact-active {
         color: #42b983;
       }
     }
   }
   </style>
   
   ```

   

