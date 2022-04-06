module.exports = {
  title: "云上舟",
  description: "个人学习博客",
  theme: "reco",
  lastUpdated: true, // 最后更新时间
  // 路径名为 "/<REPO>/"
  base: "/learn-javascript/",
  markdown: {
    auchor: { permalink: true, permalinkBefore: true, permalinkSymbol: "#" },
  },
  locales: {
    "/": {
      label: '简体中文',
      selectText: '选择语言',
      lastUpdated: '上次更新',
      lang: "zh-CN",
    },
  },
  themeConfig: {
    nav: [
      { text: "首页", link: "/home/home" },
      {
        text: "其他博客",
        items: [
          { text: "Github", link: "https://github.com/YunShangZhou" },
          // { text: '掘金', link: 'https://juejin.cn/user/712139234359182/posts' }
        ],
      },
    ],
    sidebar: [
      {
        title: "序言",
        path: "/home/home",
      },
      {
        title: "博客",
        path: "/book/Memorize",
        collapsable: false, //是否折叠
        children: [{ title: "记忆函数", path: "/book/Memorize" },
        { title: "事件循环", path: "/book/事件循环.md" },
        { title: "闭包", path: "/book/闭包.md" },
        { title: "柯里化", path: "/book/柯里化.md" },
        { title: "提高代码健壮性", path: "/book/提高代码健壮性.md" },
        { title: "回车url后，页面的变化过程", path: "/book/回车url后，页面的变化过程.md" },
        { title: "手写Promise", path: "/book/手写Promise.md" },
        
        { title: "Pinia用法", path: "/book/Pinia用法.md" },
     
      ],
      },
      {
        title: "想法/笔记",
        path: "/note/ES6之变量声明",
        collapsable: false, //是否折叠
        children: [
          // { title: "Typeof判断", path: "/note/Typeof" },
          { title: "ES6之变量声明", path: "/note/ES6之变量声明.md" },
          { title: "ES6之解构赋值", path: "/note/ES6之解构赋值.md" },
          { title: "Vue3基本使用", path: "/note/Vue3基本使用.md" },
          { title: "vue中的防抖", path: "/note/vue中的防抖.md" },
          { title: "vue3的通信方式", path: "/note/vue3的通信方式.md" },
          { title: "typescript巩固", path: "/note/typescript巩固.md" },
        ],
      },
      {
        title: "手写API(日更)",
        path: "/dailyapi/手写一个ajax",
        collapsable: false, //是否折叠
        children: [
          { title: "手写一个ajax", path: "/dailyapi/手写一个ajax.md" },
          { title: "实现new操作符", path: "/dailyapi/实现new操作符.md" },
          { title: "实现maxRequest", path: "/dailyapi/实现maxRequest.md" },        
        ],
      },
      {
        title: "日常练习",
        path: "/homework/前言",
        collapsable: false, //是否折叠
        children: [
          { title: "前言", path: "/homework/前言" },
          { title: "Es6数组API练习", path: "/homework/Es6数组API练习" },
          { title: "数组过滤", path: "/homework/数组过滤" },
          { title: "ES6面试题", path: "/homework/ES6面试题" },
          { title: "事件委托", path: "/homework/事件委托" },
          { title: "解决嵌套if判断", path: "/homework/解决嵌套if判断" },
          { title: "处理若干个if判断", path: "/homework/处理若干个if判断" },
        ],
      },
    ],
  },
};
