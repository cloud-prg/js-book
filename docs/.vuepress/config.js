const sidebar = require("./config/sidebar.js"); // 侧边栏配置
module.exports = {
  title: "云上舟",
  description: "个人学习博客",
  lastUpdated: true, // 最后更新时间
  // 路径名为 "/<REPO>/"
  base: "/js-book/",
  // baseUrl:'https:/yunshangzhou.github.io/js-book/',
  markdown: {
    auchor: { permalink: true, permalinkBefore: true, permalinkSymbol: "#" },
  },
  toc: { includeLevel: [1, 2, 3] },
  locales: {
    "/": {
      label: "简体中文",
      selectText: "选择语言",
      lastUpdated: "上次更新",
      lang: "zh-CN",
    },
  },
  themeConfig: {
    sidebar: 'auto',
    displayAllHeaders: false, // 默认值：false
    activeHeaderLinks: false, // 默认值：true
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
    sidebar,
    // : [
    //   {
    //     title: "序言",
    //     path: "/home/home",
    //   }
    // ]
  },
};

console.log(this.markdown)
