# 如何自定义vuepress首页风格



## 一、主题目录

在 `node_modules/@vuepress/`下，把`theme-default` 整个目录拷贝到`.vuepress`下，并重命名为 `theme`。删除原`theme-default` 目录文件。


<img alt="theme位置图" :src="$withBase('/theme-default位置图.jpg')">


## 二、配置首页

在`theme/components/home.vue`里，将以下代码复制粘贴

```vue
<template>
  <main
    class="home"
    :aria-labelledby="data.cloudText !== null ? 'main-title' : null"
  >
    <header class="cloud">
      <img
        v-if="data.cloudImage"
        :src="$withBase(data.cloudImage)"
        :alt="data.cloudAlt || 'cloud'"
      >

      <h1
        v-if="data.cloudText !== null"
        id="main-title"
      >
        {{ data.cloudText || $title || 'Hello' }}
      </h1>

      <p
        v-if="data.tagline !== null"
        class="description"
      >
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p>

      <p
        v-if="data.actionText && data.actionLink"
        class="action"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>
    </header>

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2 >{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
        <a :href="feature.url" target="blank">进入项目页</a>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }}
    </div>

    <Content
      v-else
      slot-key="footer"
      class="footer"
    />
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',

  components: { NavLink },
  methods:{
    clickToUrl(action){
      window.location.href = action;
    }
  },
  created(){
    console.log("node modules ______",this.data);
  },
   mounted(){
    console.log("node modules ______",this.data);
  },
  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .cloud
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .cloud
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>

```



## 三、配置README.md文件

将以下代码复制粘贴

```md
---
home: true
cloudText: 个人博客
cloudImage: /logo.jpg
tagline: 记录学习，分享知识
actionText: 点击进入
actionLink: https://yunshangzhou.github.io/js-book/
features:
  - title: ErpStorageSystem 
    details: 自开发的vue3+ts+pinia CRUD系统
    url: http://www.jiujiuwarehouse.com:8080
    img: /logo.jpg
  - title: cloudship 
    details: 自开发的ts+react组件库
    url: https://yunshangzhou.github.io/cloud-ship-react/sb-static/index.html
    img: /logo.jpg
footer: MIT Licensed | Copyright © 2022-present
---


```



:::tip

图片的根路径定位在`.vuepress/public/`目录下，搭配`$withBase(url)`实现相对路径导入。

:::


## 参考文章
1. [vuepress如何自定义首页的样式风格](https://blog.csdn.net/zwf193071/article/details/121821209?utm_term=vuepress%20%E4%B8%BB%E9%A2%98%E6%A0%B7%E5%BC%8F&utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~sobaiduweb~default-1-121821209-null-null&spm=3001.4430)
2. [ vuepress自定义主题开发-超简单模式](https://blog.csdn.net/weixin_40532650/article/details/116064378?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-2-116064378-null-null.pc_agg_new_rank&utm_term=vuepress+%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A6%96%E9%A1%B5&spm=1000.2123.3001.4430)