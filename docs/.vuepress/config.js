module.exports = {
  title: "云上舟",
  description: "个人学习博客",
  theme: "reco",
  // 路径名为 "/<REPO>/"
  base: "/learn-javascript/",
  markdown:{
    auchor:{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' },
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
        title: "想法/笔记",
        path: "/bookCatagory/Memorize",
        collapsable: false, //是否折叠
        children: [
          // { title: "Typeof判断", path: "/bookCatagory/Typeof" },
          { title: "记忆函数", path: "/bookCatagory/Memorize" },

          { title: "ES6之变量声明", path: "/bookCatagory/ES6之变量声明.md" },
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
        ],
      },
    ],
  },
};
