module.exports = {
  title: "云上舟",
  description: "个人学习博客",
  theme: "reco",
  // 路径名为 "/<REPO>/"
  base: "/learn-javascript/",
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
        title: "学习记录",
        path: "/bookCatagory/Typeof",
        children: [
          { title: "Typeof判断", path: "/bookCatagory/Typeof" },
          { title: "暂无", path: "/bookCatagory/Template" },
        ],
      },
      {
        title: "个人小练习",
        path: "/homework/Notice",
        children: [
          { title: "阅读前言" , path: "/homework/Notice"},
          { title: "ES6数组测试", path: "/homework/Es6ArrayTest" },
          { title: "数组过滤", path: "/homework/DataFilter" },
          { title: "数组过滤(第二版)", path: "/homework/DataFilterV2" },
          { title: "数组过滤(第三版)", path: "/homework/DataFilterV3" },
        ],
      },
    ],
  },
};
