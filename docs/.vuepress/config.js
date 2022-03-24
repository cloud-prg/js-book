module.exports = {
  title: "云上舟",
  description: "个人学习博客",
  theme: "reco",
  // 路径名为 "/<REPO>/"
  base: "/learn-javascript/",
  markdown: {
    auchor: { permalink: true, permalinkBefore: true, permalinkSymbol: "#" },
  },
  locales: {
    "/": {
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
        { title: "事件循环", path: "/book/事件循环.md" }
      
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
        ],
      },
      {
        title: "日常练习",
        path: "/homework/Notice",
        collapsable: false, //是否折叠
        children: [
          { title: "前言", path: "/homework/Notice" },
          { title: "ES6数组测试", path: "/homework/Es6ArrayTest" },
          { title: "数组过滤", path: "/homework/DataFilter" },
          { title: "数组过滤(解法二)", path: "/homework/DataFilterV2" },
          { title: "数组过滤(解法三)", path: "/homework/DataFilterV3" },
          { title: "数组过滤(末版)", path: "/homework/DataFilterV4" },
          { title: "ES6面试题", path: "/homework/ES6面试题" },
          { title: "事件委托", path: "/homework/事件委托" },
        ],
      },
    ],
  },
};
