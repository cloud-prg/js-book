module.exports = {
  title: "JS个人博客",
  description: "JS个人学习博客",
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
      { text: "首页", link: "/" },
      {
        text: "云上的 JavaScript 博客",
        items: [
          { text: "Github", link: "https://github.com/YunShangZhou" },
          // { text: '掘金', link: 'https://juejin.cn/user/712139234359182/posts' }
        ],
      },
    ],
    sidebar: [
      {
        title: "欢迎学习",
        path: "/",
        collapsable: false, // 不折叠
        children: [{ title: "学前必读", path: "/" }],
      },
      {
        title: "基础学习",
        path: "/handbook/Typeof",
        collapsable: false, // 不折叠
        children: [
          { title: "Typeof判断", path: "/handbook/Typeof" },
          { title: "暂无", path: "/handbook/Template" },
        ],
      },
    ],
  },
};
