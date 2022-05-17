module.exports = {
  title: "云上舟",
  description: "个人学习博客",
  toc:{ includeLevel: [1,2,3,4] },
  lastUpdated: true, // 最后更新时间
  // 路径名为 "/<REPO>/"
  base: "/js-book/",
  // baseUrl:'https:/yunshangzhou.github.io/js-book/',
  markdown: {
    auchor: { permalink: true, permalinkBefore: true, permalinkSymbol: "#" },
  },
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
    sidebar: [
      {
        title: "序言",
        path: "/home/home",
      },
      {
        title: "博客",
        path: "/book/Memorize",
        collapsable: false, //是否折叠
        children: [
          { title: "记忆函数", collapsable: true, path: "/book/Memorize" },
          { title: "事件循环", path: "/book/事件循环.md" },
          { title: "闭包", path: "/book/闭包.md" },
          { title: "柯里化", path: "/book/柯里化.md" },
          { title: "提高代码健壮性", path: "/book/提高代码健壮性.md" },
          {
            title: "回车url后，页面的变化过程",
            path: "/book/回车url后，页面的变化过程.md",
          },
          { title: "手写Promise", path: "/book/手写Promise.md" },

          { title: "Pinia用法", path: "/book/Pinia用法.md" },
          {
            title: "前端如何处理10万条数据",
            path: "/book/前端如何处理10万条数据.md",
          },
          { title: "BFC详解", path: "/book/BFC详解.md" },
          { title: "前端中的跨域", path: "/book/前端中的跨域.md" },
          { title: "JS原型与原型链", path: "/book/JS原型与原型链.md" },
          { title: "new操作符", path: "/book/new操作符.md" },
          { title: "实现bind、apply、call", path: "/book/实现bind、apply、call.md" },
          { title: "彻底了解this", path: "/book/彻底了解this.md" },
          { title: "CI&CD之自动部署", path: "/book/CI&CD之自动部署.md" },
          { title: "typeof及instanceof原理", path: "/book/typeof及instanceof原理.md" },
          { title: "JS继承", path: "/book/JS继承.md" },
          
        ],
      },
      {
        title: "想法/笔记",
        path: "/note/ES6之变量声明",
        collapsable: true, //是否折叠
        children: [
          // { title: "Typeof判断", path: "/note/Typeof" },
          { title: "ES6之变量声明", path: "/note/ES6之变量声明.md" },
          { title: "ES6之解构赋值", path: "/note/ES6之解构赋值.md" },
          { title: "typescript巩固", path: "/note/typescript巩固.md" },
          { title: "如何自定义vuepress首页风格", path: "/note/如何自定义vuepress首页风格.md" },
          { title: "图片懒加载", path: "/note/图片懒加载.md" },
          {
            title: "Vue",
            path: "/note/Vue/Vue3基本使用",
            collapsable: true, //是否折叠,
            children: [
              { title: "Vue3基本使用", path: "/note/Vue/Vue3基本使用.md" },
              { title: "vue中的防抖", path: "/note/Vue/vue中的防抖.md" },
              { title: "vue3的通信方式", path: "/note/Vue/vue3的通信方式.md" },
            ],
          },

          {
            title: "uniapp",
            path: "/note/Uniapp/uniapp问题记录与解决",
            collapsable: true, //是否折叠,
            children: [
              {
                title: "uniapp问题记录与解决",
                path: "/note/Uniapp/uniapp问题记录与解决.md",
              },
            ],
          },

          {
            title: "ts-react组件库手记",
            path: "/note/cloud-ship/组件库的准备工作/添加色彩体系",
            collapsable: true, //是否折叠,
            children: [
              {
                title: "添加色彩体系",
                path: "/note/cloud-ship/组件库的准备工作/添加色彩体系",
                collapsable: true, //是否折叠,
                children: [
                  {
                    title: "添加色彩体系",
                    path: "/note/cloud-ship/组件库的准备工作/添加色彩体系",
                  },
                  {
                    title: "组件库各部分结构",
                    path: "/note/cloud-ship/组件库的准备工作/组件库各部分结构",
                  },
                  {
                    title: "组件库通用样式体系",
                    path: "/note/cloud-ship/组件库的准备工作/组件库通用样式体系",
                  },
                  {
                    title: "button需求分析",
                    path: "/note/cloud-ship/组件库的准备工作/button需求分析",
                  },
                ],
              },

              {
                title: "StoryBook引入",
                path: "/note/cloud-ship/StoryBook引入/1.开篇介绍",
                collapsable: true, //是否折叠,
                children: [
                  {
                    title: "开篇介绍",
                    path: "/note/cloud-ship/StoryBook引入/1.开篇介绍",
                  },
                  {
                    title: "如何写详细文档",
                    path: "/note/cloud-ship/StoryBook引入/2.如何写详细文档",
                  },
                  {
                    title: "写文档需引入的库",
                    path: "/note/cloud-ship/StoryBook引入/3.写文档需引入的库",
                  },
                  {
                    title: "让info文档支持ts",
                    path: "/note/cloud-ship/StoryBook引入/4.让info文档支持ts",
                  },
                  {
                    title: "传统写法",
                    path: "/note/cloud-ship/StoryBook引入/5.传统写法",
                  },
                ],
              },

              {
                title: "svg引入",
                path: "/note/cloud-ship/svg引入/CSSTransition库方法再封装",
                collapsable: true, //是否折叠,
                children: [
                  {
                    title: "CSSTransition库方法再封装",
                    path: "/note/cloud-ship/svg引入/CSSTransition库方法再封装",
                  },
                  {
                    title: "fontawesome库方法再封装",
                    path: "/note/cloud-ship/svg引入/fontawesome库方法再封装",
                  },
                  {
                    title: "fortawesome的使用",
                    path: "/note/cloud-ship/svg引入/fortawesome的使用",
                  },
                ],
              },



              {
                title: "testing-library测试库",
                path: "/note/cloud-ship/testing-library测试库/测试库的扩展",
                collapsable: true, //是否折叠,
                children: [
                  {
                    title: "测试库的扩展",
                    path: "/note/cloud-ship/testing-library测试库/测试库的扩展",
                  },
                  {
                    title: "测试库官方文档",
                    path: "/note/cloud-ship/testing-library测试库/测试库官方文档",
                  },
                  {
                    title: "测试命令",
                    path: "/note/cloud-ship/testing-library测试库/测试命令",
                  },
                  {
                    title: "测试语法",
                    path: "/note/cloud-ship/testing-library测试库/测试语法",
                  },
                  {
                    title: "可以从哪些角度去测试",
                    path: "/note/cloud-ship/testing-library测试库/可以从哪些角度去测试",
                  },
                  {
                    title: "jest简单使用",
                    path: "/note/cloud-ship/testing-library测试库/jest简单使用",
                  },
                ],
              },

              {
                title: "ts-react项目的启动",
                path: "/note/cloud-ship/ts-react项目的启动/启动命令",
              },

              {
                title: "注意模块版本",
                path: "/note/cloud-ship/注意模块版本",
              },
              {
                title: "classnames模块",
                path: "/note/cloud-ship/classnames模块",
              },
              {
                title: "scss语法小记",
                path: "/note/cloud-ship/scss语法小记",
              },
            ],
          },
          {
            title: "Vite",
            path: "/note/Vite/Vite搭配Vue3全家桶的基本配置",
            collapsable: true, //是否折叠,
            children: [
              {
                title: "Vite搭配Vue3全家桶的基本配置",
                path: "/note/Vite/Vite搭配Vue3全家桶的基本配置.md",
              },
            ],
          },

          // {
          //   title: "微信开发",
          //   path: "/note/Wx/微信开发者平台使用",
          //   collapsable: true, //是否折叠,
          //   children: [
          //     {
          //       title: "微信开发者平台使用",
          //       path: "/note/Wx/微信开发者平台使用.md",
          //     },
          //   ],
          // },
        ],
      },
      {
        title: "手写API(日更)",
        path: "/dailyapi/手写一个ajax",
        collapsable: true, //是否折叠
        children: [
          { title: "手写一个ajax", path: "/dailyapi/手写一个ajax.md" },
          { title: "实现new操作符", path: "/dailyapi/实现new操作符.md" },
          { title: "实现maxRequest", path: "/dailyapi/实现maxRequest.md" },
          { title: "有效的括号", path: "/dailyapi/有效的括号.md" },
          { title: "手写promiseAll", path: "/dailyapi/手写promiseAll.md" },
          { title: "数组扁平化", path: "/dailyapi/数组扁平化.md" },
        ],
      },
      {
        title: "日常练习",
        path: "/homework/前言",
        collapsable: true, //是否折叠
        children: [
          { title: "前言", path: "/homework/前言" },
          { title: "Es6数组API练习", path: "/homework/Es6数组API练习" },
          { title: "数组过滤", path: "/homework/数组过滤" },
          { title: "ES6面试题", path: "/homework/ES6面试题" },
          { title: "事件委托", path: "/homework/事件委托" },
          { title: "解决嵌套if判断", path: "/homework/解决嵌套if判断" },
          { title: "处理若干个if判断", path: "/homework/处理若干个if判断" },
          { title: "Set与Map的区别", path: "/homework/Set与Map的区别" },
          { title: "样式修改", path: "/homework/样式修改" },
        ],
      },
    ],
  },
};
