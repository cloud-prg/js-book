module.exports = {
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
        //     title: "uniapp",
        //     path: "/note/Uniapp/uniapp问题记录与解决",
        //     collapsable: true, //是否折叠,
        //     children: [
        //         {
        //             title: "uniapp问题记录与解决",
        //             path: "/note/Uniapp/uniapp问题记录与解决.md",
        //         },
        //     ],
        // },

        // {
        //     title: "ts-react组件库手记",
        //     path: "/note/cloud-ship/组件库的准备工作/添加色彩体系",
        //     collapsable: true, //是否折叠,
        //     children: [
        //         {
        //             title: "添加色彩体系",
        //             path: "/note/cloud-ship/组件库的准备工作/添加色彩体系",
        //             collapsable: true, //是否折叠,
        //             children: [
        //                 {
        //                     title: "添加色彩体系",
        //                     path: "/note/cloud-ship/组件库的准备工作/添加色彩体系",
        //                 },
        //                 {
        //                     title: "组件库各部分结构",
        //                     path: "/note/cloud-ship/组件库的准备工作/组件库各部分结构",
        //                 },
        //                 {
        //                     title: "组件库通用样式体系",
        //                     path: "/note/cloud-ship/组件库的准备工作/组件库通用样式体系",
        //                 },
        //                 {
        //                     title: "button需求分析",
        //                     path: "/note/cloud-ship/组件库的准备工作/button需求分析",
        //                 },
        //             ],
        //         },

        //         {
        //             title: "StoryBook引入",
        //             path: "/note/cloud-ship/StoryBook引入/1.开篇介绍",
        //             collapsable: true, //是否折叠,
        //             children: [
        //                 {
        //                     title: "开篇介绍",
        //                     path: "/note/cloud-ship/StoryBook引入/1.开篇介绍",
        //                 },
        //                 {
        //                     title: "如何写详细文档",
        //                     path: "/note/cloud-ship/StoryBook引入/2.如何写详细文档",
        //                 },
        //                 {
        //                     title: "写文档需引入的库",
        //                     path: "/note/cloud-ship/StoryBook引入/3.写文档需引入的库",
        //                 },
        //                 {
        //                     title: "让info文档支持ts",
        //                     path: "/note/cloud-ship/StoryBook引入/4.让info文档支持ts",
        //                 },
        //                 {
        //                     title: "传统写法",
        //                     path: "/note/cloud-ship/StoryBook引入/5.传统写法",
        //                 },
        //             ],
        //         },

        //         {
        //             title: "svg引入",
        //             path: "/note/cloud-ship/svg引入/CSSTransition库方法再封装",
        //             collapsable: true, //是否折叠,
        //             children: [
        //                 {
        //                     title: "CSSTransition库方法再封装",
        //                     path: "/note/cloud-ship/svg引入/CSSTransition库方法再封装",
        //                 },
        //                 {
        //                     title: "fontawesome库方法再封装",
        //                     path: "/note/cloud-ship/svg引入/fontawesome库方法再封装",
        //                 },
        //                 {
        //                     title: "fortawesome的使用",
        //                     path: "/note/cloud-ship/svg引入/fortawesome的使用",
        //                 },
        //             ],
        //         },



        //         {
        //             title: "testing-library测试库",
        //             path: "/note/cloud-ship/testing-library测试库/测试库的扩展",
        //             collapsable: true, //是否折叠,
        //             children: [
        //                 {
        //                     title: "测试库的扩展",
        //                     path: "/note/cloud-ship/testing-library测试库/测试库的扩展",
        //                 },
        //                 {
        //                     title: "测试库官方文档",
        //                     path: "/note/cloud-ship/testing-library测试库/测试库官方文档",
        //                 },
        //                 {
        //                     title: "测试命令",
        //                     path: "/note/cloud-ship/testing-library测试库/测试命令",
        //                 },
        //                 {
        //                     title: "测试语法",
        //                     path: "/note/cloud-ship/testing-library测试库/测试语法",
        //                 },
        //                 {
        //                     title: "可以从哪些角度去测试",
        //                     path: "/note/cloud-ship/testing-library测试库/可以从哪些角度去测试",
        //                 },
        //                 {
        //                     title: "jest简单使用",
        //                     path: "/note/cloud-ship/testing-library测试库/jest简单使用",
        //                 },
        //             ],
        //         },

        //         {
        //             title: "ts-react项目的启动",
        //             path: "/note/cloud-ship/ts-react项目的启动/启动命令",
        //         },

        //         {
        //             title: "注意模块版本",
        //             path: "/note/cloud-ship/注意模块版本",
        //         },
        //         {
        //             title: "classnames模块",
        //             path: "/note/cloud-ship/classnames模块",
        //         },
        //         {
        //             title: "scss语法小记",
        //             path: "/note/cloud-ship/scss语法小记",
        //         },
        //     ],
        // },


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
}