
# vue3的通信方式
   本文主要以vue3版本列举父子、兄弟组件的通信方式。

[[toc]]

## Props方式

- 父组件中，引入子组件并在内部以 `:子组件接收props属性名=" 传入的父组件数据的变量名 "`的格式传入。
- 子组件中，需用到Vue模块中的defineProps创建props实例。defineProps传入一个对象，每一个**键名**都为上层组件传下来的**属性名**，**值**也为对象，定义接收数据的类型、默认值。

```vue
// 父组件
<template>
  <div class="parent_page">
    <div>
      <h1>{{ context }}</h1>
      <div class="add_container fl fl-column">
        <input placeholder="请输入姓名" v-model="name" />
        <input placeholder="请输入id" v-model="id" />
        <input placeholder="请输入年龄" v-model="age" />
        <button @click="addItem">添加</button>
      </div>
    </div>

    <div>
      <!-- list数据传送到子组件,接收属性取名list -->
      <child-com :list="list.listData"></child-com>
    </div>
  </div>
</template>

<script setup>
import ChildCom from "./ChildCom.vue";
import { ref, reactive } from "vue";
let context = "父级组件";
let name = ref();
let id = ref();
let age = ref();
let list = reactive({
  listData: [
    {
      name: "张三",
      id: "01",
      age: "18",
    },
    {
      name: "李斯特",
      id: "02",
      age: "20",
    },
  ],
});

function addItem() {
  list.listData.push({
    name,
    id,
    age,
  });
}
</script>

<style lang="less" scoped>
.parent_page {
  .add_container {
    width: 300px;
  }
}
</style>
```

```vue
// 子组件
<script setup>
import { defineProps } from "vue";
// 引入defineProps拿到父组件传入的list
// 需要定义type和初始值default
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
let context = "子级组件";
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <ul>
      <li v-for="(item, index) in props.list" :key="index">
        {{ `姓名:${item.name} 年龄:${item.age} id:${item.id}` }}
      </li>
    </ul>
  </div>
</template>
```

## emit方式

​	Emit这种通信方式，主要用于子传父。

- 子组件通过执行`emits('传给父组件的emit名称', 传输的数据)`，并传入defineEmits的参数(该参数为一个数组，内部数组元素皆为emit名称)中。
- 父组件引用子组件后，在子组件内部的 `@emit名称 = "父组件本地回调"`来接收子组件的传值。
- 子组件传来的emit函数为自执行。

```vue
// 子组件
<script setup>
import { ref, defineEmits } from "vue";

const value = ref("默认值v");
let emits = defineEmits(["add"]);
(function addEmit() {
  console.log("value.value", value.value);
  emits("add", value.value);
})();

let context = "子级组件";
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
  </div>
</template>


```

```vue
// 父组件
<script setup>
import ChildCom from "./ChildCom.vue";
let context = "父级组件";

// 注意，子组件传来的emit函数为自执行。
function receiveChildAdd(value) {
  console.log("child value", value); // child value 默认值v
}
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <child-com @add="receiveChildAdd"></child-com>
  </div>
</template>

```



## v-model方式

v-model是个出色的语法糖,他将简化了数据绑定的语法。

```vue
// 简化后
<child-com v-model:title= "pageTitle">
```

```vue
// 简化前
<child-com :title="pageTitle" @update:title="pageTitle=$event" />
```

:::warning

​	@update: emit属性名 =  "接收子组件callback" ，这是vue3的固定写法。

当emit("update:emit属性名",data)时。且**emit属性名**应与父组件传入的**数据变量名**相同。再使用v-model:emit属性名，即可实现父子互相通信。

:::

```vue
// 父组件
<script setup>
import { reactive } from "vue";
import ChildCom from "./ChildCom.vue";
let context = "父级组件";
let list = reactive({
  listData: ["hero"],
});
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <div>
      <ul>
        <li v-for="(item, index) in list.listData" :key="index">{{ "父级"+item }}</li>
      </ul>
    </div>
    <div>---------------</div>
    <!-- 子组件中emit上来的是 update:list, 在v-model简化下 无需@update:list="handleUpdateList" -->
    <!-- v-model实现了父子互相通信 -->
    <child-com v-model:list="list.listData"></child-com>
  </div>
</template>
```

```vue
// 子组件
<script setup>
import { ref, defineEmits, defineProps } from "vue";

let defaultVal = ref('默认值v');
let props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
let emits = defineEmits(["update:list"]);
function addEmit() {
  let arr =props.list;
  arr.push(defaultVal.value);
  emits("update:list", arr);
  defaultVal.value = "";
}

let context = "子级组件";
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <div class="fl">
      <input v-model="defaultVal" />
      <button @click="addEmit">添加</button>
    </div>
    <div>
        <ul>
            <li v-for="(item,index) in props.list" :key="index">{{"子级"+item}}</li>
        </ul>
    </div>
  </div>
</template>
```

## refs方式

refs通信，主要是通过 定义一个同名的Ref对象，以及子组件中将需要传输的数据暴露出去(利用vue模块中的 defineExpose,内部传入一个对象{},数据放在里面)，在组件挂载后就可以访问。

```vue
// 子组件
<script setup>
import { ref, defineExpose, reactive } from "vue";
const list = reactive({
    listData:["hero"]
})
let context = "子级组件";
let itemValue = ref('');
function addItem(){
    list.listData.push(itemValue.value);
    itemValue.value="";
}

// 将list数据暴漏出去
defineExpose({ list });
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <input v-model="itemValue">
    <button @click="addItem">添加</button> 
    <ul>
        <li v-for="(item,index) in list.listData" :key="index">
            {{item}}
        </li>
    </ul>
  </div>
</template>


```

```vue
// 父组件
<script setup>
import {ref} from 'vue';
import ChildCom from "./ChildCom.vue";
let context = "父级组件";
let childRefs = ref(null);
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <div>
      <ul>
        <li v-for="(item, index) in childRefs?.list" :key="index">
            {{item}}
        </li>
      </ul>
    </div>
    <div>--------------</div>
    <child-com ref="childRefs"></child-com>
  </div>
</template>
```

:::tip

`setup`组件默认是关闭的，也即通过模板`ref`获取到的组件的公开实例，不会暴露任何在`<script setup>`中声明的绑定。如果需要公开，则须通过`defineExpose`API暴露。

:::

## provide/inject方式

在父组件引如provide,第一个参数名为 **传值名**，第二个参数为**变量值名**。

子组件引入inject，创造inject实例，inject中传入 **传值名** 即可。

```vue
// 父组件
<script setup>
import { provide, reactive} from 'vue';
import ChildCom from "./ChildCom.vue";
let context = "父级组件";

let list = reactive({
    listData:["hero"],
})

function addItem(){
    list.listData.push("aaa");
}

// 提供名，数据
provide("list",list.listData);
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <button @click="addItem">添加aaa</button>
    <div>
      <ul>
        <li v-for="(item, index) in list.listData" :key="index">
            {{item}}
        </li>
      </ul>
    </div>
    <div>--------------</div>
    <child-com ></child-com>
  </div>
</template>

```

```vue
// 子组件
<script setup>
import { inject } from "vue";
 const list = inject("list")
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <ul>
        <li v-for="(item,index) in list" :key="index">
            {{item}}
        </li>
    </ul>
  </div>
</template>
```



## Pinia插件

基础用法这里不做介绍，详情请看原文档。这里主要**使用action来改变state状态**。

```js
// store/user.js
export const useUserStore = defineStore({
  id: "user", // id必填, 且需要唯一
  // 声明state,为一个回调返回一个对象。
  state: () => {
    return {
      // 默认有2条数据
      userList: [
        {
          id: 1,
          name: "z33",
        },
        {
          id: 2,
          name: "l44",
        },
      ],
    };
  },
  // methods方法
  actions: {
    // 添加用户信息
    addInfo(payload) {
      this.userList.push(payload);
    },
  },
  // 引入pinia-plugin-persist插件，实现数据持久化
  persist: {
    enabled: true, //是否开启
    strategies: [
      {
        key: "my_user", // 唯一键名
        storage: localStorage, // 使用storage的类型
          
        // 指定哪些state允许被持久化
        // path:["name","count","userList"],
      },
    ],
  },
});

```

<br />

父组件和子组件使用store的方式是一样的。都是通过引入user.js中的store实例，调用其中action中的**特定方法**，去改变值。

```vue
// 父组件
<script setup>
import { useUserStore } from "@/store/user";
import { reactive, ref} from "vue";
import ChildCom from './ChildCom.vue'
const userStore = useUserStore();
const context = ref("父组件");
let localList = reactive({
  data1: null,
});

// 因为setup生命周期比created还要早，因此在里面做IIFE来赋值
(() => {
  localList.data1 = userStore.userList;
})();

function handleAddInfo() {
  // 调用store中的action的方法，操作state。
  userStore.addInfo({
    id: 5,
    name: "yyy555",
  });
  
}
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <button @click="handleAddInfo">添加一条yyy555</button>

    <ul>
      <li v-for="(item, index) in localList.data1" :key="index">
        {{ item.name }}
      </li>
    </ul>

    <child-com></child-com>
  </div>
</template>

```

```vue
// 子组件
<script setup>
import { useUserStore } from "@/store/user";
import { reactive,ref } from "vue";
const context = ref("子组件");

const userStore = useUserStore();
let childLocalList = reactive({
  data1: null,
});

// 因为setup生命周期比created还要早，因此在里面做IIFE来赋值
(() => {
  childLocalList.data1 = userStore.userList;
})();
</script>
<template>
  <div>
    <h1>{{ context }}</h1>
    <ul>
      <li v-for="(item, index) in childLocalList.data1" :key="index">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>


```

​	以上代码运行之后，即便刷新了页面，数据也不会丢失。且不仅仅是父子组件、兄弟组件，或者隔了好几层的组件之间，都可以在pinia的状态管理下，实现互相通信。

## 总结

- Vue3中组件之间的传值有Props、emit、v-model、refs、provide/inject。
- 其中单向传值的有props、emit、refs、provide/inject，他们分别用到了vue模块中的defineProps、defineEmits、defineExpose、provide、inject。
- 而v-model则是父组件defineProps+update:emit属性名固定vue语法，配合子组件defineEmits传值，从而共同完成的。
- pinia能更好地完成组件之间的通信。如果在有引入pinia-plugin-persist的情况下，还能实现数据持久化。



## Vuex、Pinia官文链接

-  [Vuex官网文档](https://vuex.vuejs.org/)
-  [Pinia官网文档](https://pinia.vuejs.org/introduction.html)