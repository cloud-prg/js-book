---
title: Vue3基本使用
author: 云上舟
date: "2022-03-22"
---





## 部分用法记录

### 组合式组件

在这个组件里，将不再区分data,methods,mounted,created等等，他们将按以往的js写法走。不过挂载、监听、计算属性还是需要从vue模块中取出使用的。

```vue
<script setup>
import { ref, computed,watch} from 'vue'

/**
  * 声明变量
  * 修改变量值应取value，例：count.value = newValue
  */ 
let count = ref(0);

/**
 * 计算变量属性
 * 参数是一个回调，返回逻辑变更后的变量。
 * */
let coumputedCount = computed(()=>{
	return count+1;
})

/**
 * 监听属性
 * 内部有2个参数，第一个参数是 目标属性，第二个参数是回调函数(内部有2个参数，newValue,oldValue))
 * */
watch(count,(newValue)=>{
    console.log("newVlaue",newVlaue);
})

</script>
```

## 父子组件传值

### 父传子

父组件

```vue
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const greeting = ref('Hello from parent')
</script>

<template>
  <ChildComp :msg="greeting" />
</template>
```

<br />

子组件, 在defineProps中定义属性的类型

```vue
<script setup>
const props = defineProps({
  msg: String
})
</script>

<template>
  <h2>{{ msg || 'No props passed yet' }}</h2>
  <!-- Hello from parent -->
</template>
```



## 子传父

子组件，用到defineEmits,参数为数组，第一个元素为emit的变量名。
emit中传2个参，第一个为emit变量名，第二个参数为data内容。

```vue
<script setup>
const emit = defineEmits(['response'])

emit('response', 'hello from child')
</script>

<template>
  <h2>Child component</h2>
</template>
```

<br />

父组件,子组件接收 emit变量名，并在回调中第一个参数默认为emit的数据值。

```vue
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const childMsg = ref('No child msg yet')
</script>

<template>
  <ChildComp @response="(msg) => childMsg = msg" />
  <p>{{ childMsg }}</p>
</template>
```



## 插槽用法

  子组件本是单闭合标签，如果写成开闭合标签，则在标签内添加的内容，将在子组件的<slot></slot>表示出来

父组件

```vue
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const msg = ref('from parent')
</script>

<template>
  <ChildComp>Message: {{ msg }}</ChildComp>
</template>
```

子组件

```vue
<template>
  <slot>Fallback content</slot>
</template>
```

