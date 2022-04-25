---
title: Vuex的使用
author: 云上舟
date: "2022-04-02"
---

## 安装命令

  npm安装

```shell
npm install vuex --save
```

## 方法及作用
1. state:用于存储值得地方
2. getters:用于返回经过特定计算的值
3. mutation:编写一个函数，去改变存储值
4. action:支持异步函数，用于提交mutaion中的方法`this.$store.commit("mutationApi",payload)`,在实例中`this.$store.dispatch(actionApi,payload)`。


## 集合引入Vuex
1. **mapState**:为了防止一个个引入 **state** 中的存储值，vuex提供了这个方法。
```js
computed:{
  ...mapState(["likes","friends","token"]),
  // 也可为它们取别名
  // ...mapState({
  //     myLikes:"likes",
  //     myFriends:"friends",
  //     theUserInfo:"userInfo"
  // }),

  /**
   * 取state中类型为Object里的属性
   * 第一个参数为 模块名
   * 第二个参数为 内部属性
   * */ 
    // ...mapState("vehicle", {
    //   orderId: ({ orderId }) => orderId,
    //   control: ({ control }) => control,
    //   car: ({ car }) => car,
    //   vehicleType: ({ vehicleType }) => vehicleType
    // })

} 
```
2. **mapGetter**: 可以引入多个返回 **经过特定计算的属性** 。
```js
computed:{
  ...mapGetters(['realName','myMoney']),
```

1. **mapMutation**: 引入多个 **改变state存储值的方法**
```js
computed:{
  ...mapMutation(['realName','myMoney']),
  // 从模块中获取
  // ...mapMutations("vehicle", ["setVehicleType", "setCarInfo"]),
}
```

4. **mapAction**: 引入多个 **可以异步操作mutation的方法**

action部分:
```js
import {
    ADD_AGE,
    CHANGE_NAME,
    ADD_FRIEND,
    SET_USER_INFO,
    SET_TOKEN
} from "./mutation_type.js"

export default{
   //定义一个异步获取用户信息的action
    async getUserInfo(context){
       //context可以理解为它是整个Store的对象.类似于this.$store，里面包含了state，getter，mutations，actions
       const res = await axios.get('/接口url')
       
       //这个时候就用到了 mutation_type.js
       context.commit( SET_USER_INFO,{userInfo:res.userData}
       )
    },
    
    //定义一个异步获取用户token的action
    async getToken(context){
         const res = await axios.get('/接口url')
         context.commit(
             SET_TOKEN,
             {token:res.token}
       )
    }
    
}
```
vue页面:
```js
computed:{
  ...mapAction(['getUserInfo','getToken']),
}
```


## 创建目录

在 src目录下，创建store,以及store里的index.js

```
/* src/stre/index.js */

```

