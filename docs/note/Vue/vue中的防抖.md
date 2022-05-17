
# Vue中的防抖
[[toc]]
## 问题萌生

  近日在项目中，在测试环境中，某个页面列表里，提交表单的按钮被测试多次点击，报出接口请求多次导致数据记录错误的问题。



## 解决方案

  使用最熟悉的防抖或者节流来做。一开始考虑用节流，设置2秒延迟，但考虑到测试会一直点击，怕2秒后调用接口的期间会点击出第二次调用。所以选择了防抖来做。

## 重温防抖

```js
// 防抖函数
function debounce(callback, delay) {
  let timeout;
  return function (args) {
    let that = this; // 保存this指向
    let _args = args; // 保存argumens参数组
    clearTimeout(timeout); // 每次触发防抖都将清除旧命令
    
    timeout = setTimeout(() => {
      callback.call(that, _args);
    }, delay);
  };
}

```



## 注意事项

  在vue中如果直接将目标函数放入防抖函数内，则会报错。

```Vue
<template>
	<!-- 显示内容 -->
</template>

<script>
import debounce from '@/utils/debounce';
    export default {
        methods:{
            async getData(){
                let res = await fetch("xxx");
                const {data} = res;
                console.log(data);
            },
            debounceGetData:debounce(getData,2000), //error: getData is not defined
            debounce(this.getData,2000), //同样error: getData is not defined
        }
    }
</script>
```

###   报错原因

  debounce参数里的作用域中，this指向不是Vue.component全局。因此会报错该getData方法未定义。



## 解决方法

  让debounce中调用传入函数时，this指向全局。

```js
// Vue使用的防抖函数
function debounce(fnName, delay) {
 let timeout=null;
  return function () {
    timeout && clearTimeout(timeout); // 每次触发防抖都将清除旧命令
    timeout = setTimeout(() => {
      this[fnName](); // 此时箭头函数指向调用它的最近一层的普通函数，若没有外层普通函数。则指向全局对象(Vue.component)
    }, delay);
  };
}
export default debounce;

```

```vue
<template>
	<!-- 显示内容 -->
</template>

<script>
import debounce from '@/utils/debounce';
    export default {
        methods:{
            async getData(){
                let res = await fetch("xxx");
                const {data} = res;
                console.log(data);
            },
            debounceGetData:debounce("getData",2000), //运行成功
        }
    }
</script>
```



## 总结

  在Vue中使用这类函数时，注意传入函数后，看看函数内部是否有调用Vue中methods的函数。若有，则需要注意this箭头指向，除了上述那样写到，也可把全局this作为参数传入debounce,也可解决未定义问题，否则将引起报错。
