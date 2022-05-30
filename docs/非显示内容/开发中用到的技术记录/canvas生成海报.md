# 参考文章入口
1. [html2Canvas的代替方案](https://juejin.cn/post/7044178791878361118#comment)



# 高信息的评论
1. 最新版html2canvas 并放弃对iOS13的支持
2. 我们公司选择方案就是再画一个独立的页面 然后用 puppeteer 直接截图，这样在 nodejs 上就完美解决了，坑就是 CentOS6 不支持 puppeter 还得升级服务器。。。不过总的来说比 html2canvas 爽多了