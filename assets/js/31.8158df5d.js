(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{427:function(e,t,s){"use strict";s.r(t);var o=s(55),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"目录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#目录"}},[e._v("#")]),e._v(" 目录")]),e._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#存储方案"}},[e._v("存储方案")])]),s("li",[s("a",{attrs:{href:"#cookie存储"}},[e._v("Cookie存储")]),s("ul",[s("li",[s("a",{attrs:{href:"#配置-domain-path"}},[e._v("配置: Domain/Path")])]),s("li",[s("a",{attrs:{href:"#配置-exipres-max-age"}},[e._v("配置: Exipres/ Max-Age")])]),s("li",[s("a",{attrs:{href:"#配置-secure-httponly"}},[e._v("配置： Secure / HttpOnly")])]),s("li",[s("a",{attrs:{href:"#http-头对-cookie-的读写"}},[e._v("HTTP 头对 cookie 的读写")])]),s("li",[s("a",{attrs:{href:"#前端对-cookie的读写"}},[e._v("前端对 cookie的读写")])])])]),s("li",[s("a",{attrs:{href:"#服务端session"}},[e._v("服务端session")]),s("ul",[s("li",[s("a",{attrs:{href:"#示例图"}},[e._v("示例图")])]),s("li",[s("a",{attrs:{href:"#session的存储方式"}},[e._v("Session的存储方式")])]),s("li",[s("a",{attrs:{href:"#session-的过期和销毁"}},[e._v("Session 的过期和销毁")])]),s("li",[s("a",{attrs:{href:"#session-的分布式问题"}},[e._v("Session 的分布式问题")])]),s("li",[s("a",{attrs:{href:"#node-js下的session处理"}},[e._v("node.js下的session处理")])]),s("li",[s("a",{attrs:{href:"#问题的萌生"}},[e._v("问题的萌生")])]),s("li",[s("a",{attrs:{href:"#问题的解决"}},[e._v("问题的解决")])])])]),s("li",[s("a",{attrs:{href:"#应用方案-token"}},[e._v("应用方案: token")]),s("ul",[s("li",[s("a",{attrs:{href:"#token流程图"}},[e._v("token流程图")])]),s("li",[s("a",{attrs:{href:"#token流程"}},[e._v("token流程")])]),s("li",[s("a",{attrs:{href:"#客户端token的存储方式"}},[e._v("客户端token的存储方式")])]),s("li",[s("a",{attrs:{href:"#token的编码"}},[e._v("token的编码")])]),s("li",[s("a",{attrs:{href:"#防篡改"}},[e._v("防篡改")])]),s("li",[s("a",{attrs:{href:"#示例图"}},[e._v("示例图")])])])]),s("li",[s("a",{attrs:{href:"#应用方案-jwt"}},[e._v("应用方案 JWT")]),s("ul",[s("li",[s("a",{attrs:{href:"#示例图"}},[e._v("示例图")])]),s("li",[s("a",{attrs:{href:"#refresh-token"}},[e._v("refresh token")])]),s("li",[s("a",{attrs:{href:"#示例图"}},[e._v("示例图")])])])]),s("li",[s("a",{attrs:{href:"#session和token"}},[e._v("session和token")])]),s("li",[s("a",{attrs:{href:"#总结"}},[e._v("总结")])])])]),s("p"),e._v(" "),s("h1",{attrs:{id:"前端鉴权由来"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前端鉴权由来"}},[e._v("#")]),e._v(" 前端鉴权由来")]),e._v(" "),s("p",[e._v("HTTP是无状态的，在HTTP请求方和响应方之前并不能做 "),s("strong",[e._v("状态维护")]),e._v(" ，在 "),s("strong",[e._v("三次握手")]),e._v(" "),s("strong",[e._v("四次挥手")]),e._v(" 之后，他们的状态都无法直接获取。比如 各类网站，都要求用户 "),s("strong",[e._v("登陆注册")]),e._v(" ，这个时候HTTP该如何知道用户的 "),s("strong",[e._v("登录/等出状态")]),e._v(" 呢？ 下文将例举利用 "),s("strong",[e._v("不同存储")]),e._v("  作为一种 "),s("strong",[e._v("标记")]),e._v(" 来保存状态 ，实现 "),s("strong",[e._v("前端鉴权")]),e._v("。")]),e._v(" "),s("h2",{attrs:{id:"存储方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#存储方案"}},[e._v("#")]),e._v(" 存储方案")]),e._v(" "),s("ul",[s("li",[e._v("挂载在全局变量上，但缺点是： 一刷新页面，数据就没了")]),e._v(" "),s("li",[e._v("挂载在 cookie、sessionStorage、localStorage等，不用担心刷新丢失的问题，开发者可以自由选择其中一种方式。")])]),e._v(" "),s("p",[e._v("只要有地方存储，请求的时候 "),s("strong",[e._v("携参")]),e._v(" 给接口即可。")]),e._v(" "),s("h2",{attrs:{id:"cookie存储"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cookie存储"}},[e._v("#")]),e._v(" Cookie存储")]),e._v(" "),s("p",[e._v("cookie 也是前端存储的一种，相比于 localStorage 等其他方式，借助 HTTP 头、浏览器能力，cookie 可以做到前端无感知。")]),e._v(" "),s("p",[e._v("一般过程是这样的：")]),e._v(" "),s("ul",[s("li",[e._v("在提供标记的接口，通过 HTTP 返回头的 Set-Cookie 字段，直接"),s("strong",[e._v("种")]),e._v("到浏览器上")]),e._v(" "),s("li",[e._v("浏览器发起请求时，会自动把 cookie 通过 HTTP 请求头的 Cookie 字段，带给接口")])]),e._v(" "),s("h3",{attrs:{id:"配置-domain-path"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-domain-path"}},[e._v("#")]),e._v(" 配置: Domain/Path")]),e._v(" "),s("p",[e._v("可以通过 "),s("code",[e._v("Domian")]),e._v("/"),s("code",[e._v("Path")]),e._v("两级 去限制 "),s("strong",[e._v("空间范围")])]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("Domain属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 Cookie。如果没有指定该属性，浏览器会默认将其设为当前 URL 的一级域名，比如 "),s("a",{attrs:{href:"https://link.juejin.cn?target=http%3A%2F%2Fwww.example.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("www.example.com"),s("OutboundLink")],1),e._v(" 会设为 example.com，而且以后如果访问example.com的任何子域名，HTTP 请求也会带上这个 Cookie。如果服务器在Set-Cookie字段指定的域名，不属于当前域名，浏览器会拒绝这个 Cookie。")]),e._v(" "),s("p",[e._v("Path属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。只要浏览器发现，Path属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 Cookie。比如，PATH属性是/，那么请求/docs路径也会包含该 Cookie。当然，前提是域名必须一致。")]),e._v(" "),s("p",[s("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fjavascript.ruanyifeng.com%2Fbom%2Fcookie.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cookie — JavaScript 标准参考教程（alpha）"),s("OutboundLink")],1)])]),e._v(" "),s("h3",{attrs:{id:"配置-exipres-max-age"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-exipres-max-age"}},[e._v("#")]),e._v(" 配置: Exipres/ Max-Age")]),e._v(" "),s("p",[e._v("可以通过 "),s("code",[e._v("Expires")]),e._v("和"),s("code",[e._v("Max-Age")]),e._v(" 中的一种，来限制"),s("code",[e._v("cookie")]),e._v("的 "),s("strong",[e._v("时间范围")])]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("Expires属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 UTC 格式。如果不设置该属性，或者设为null，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除。另外，浏览器根据本地时间，决定 Cookie 是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间过期。")]),e._v(" "),s("p",[e._v("Max-Age属性指定从现在开始 Cookie 存在的秒数，比如60 * 60 * 24 * 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie。")]),e._v(" "),s("p",[e._v("如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效。")]),e._v(" "),s("p",[e._v("如果Set-Cookie字段没有指定Expires或Max-Age属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。")]),e._v(" "),s("p",[s("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fjavascript.ruanyifeng.com%2Fbom%2Fcookie.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cookie — JavaScript 标准参考教程（alpha）"),s("OutboundLink")],1)])]),e._v(" "),s("h3",{attrs:{id:"配置-secure-httponly"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-secure-httponly"}},[e._v("#")]),e._v(" 配置： Secure / HttpOnly")]),e._v(" "),s("p",[e._v("用于配置"),s("code",[e._v("cookie")]),e._v("的使用方式。")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("Secure属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的Secure属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。")]),e._v(" "),s("p",[e._v("HttpOnly属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是Document.cookie属性、XMLHttpRequest对象和 Request API 都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。\n—— Cookie — JavaScript 标准参考教程（alpha）")])]),e._v(" "),s("h3",{attrs:{id:"http-头对-cookie-的读写"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-头对-cookie-的读写"}},[e._v("#")]),e._v(" HTTP 头对 cookie 的读写")]),e._v(" "),s("p",[e._v("HTTP 返回的一个"),s("code",[e._v("Set-Cookie")]),e._v("头用于向浏览器写入 "),s("strong",[e._v("一条")]),e._v(" cookie,格式为 cookie 键值+配置键值。例如:")]),e._v(" "),s("p",[s("code",[e._v("Set-Cookie: username=jimu; domain=jimu.com; path=/blog; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly")])]),e._v(" "),s("br"),e._v(" "),s("p",[e._v("若想多次"),s("code",[e._v("set-cookie")]),e._v(",则多给几个即可（一次HTTP请求允许重复)")]),e._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[e._v("Set"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),e._v("Cookie"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" username"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("jimu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" domain"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("jimu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("com\nSet"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),e._v("Cookie"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" height"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("180")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" domain"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("me"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("jimu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("com\nSet"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),e._v("Cookie"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" weight"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("80")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" domain"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("me"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("jimu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("com\n")])])]),s("p",[e._v("HTTP请求的"),s("code",[e._v("Cookie")]),e._v("头用于浏览器把符合当前 空间、时间、使用方式 配置的所有cookie一并发给服务端。因为由浏览器做了"),s("strong",[e._v("筛选判断")]),e._v("，就不需要归还配置内容了，只要"),s("strong",[e._v("发送键值")]),e._v("就可以。")]),e._v(" "),s("p",[s("code",[e._v("Cookie: username=jimu; height=180; weight=80")])]),e._v(" "),s("h3",{attrs:{id:"前端对-cookie的读写"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前端对-cookie的读写"}},[e._v("#")]),e._v(" 前端对 cookie的读写")]),e._v(" "),s("p",[e._v("前端可以自己创建 "),s("code",[e._v("cookie")]),e._v(", 如果服务端创建的"),s("code",[e._v("cookie")]),e._v(" 没有加上"),s("code",[e._v("HttpOnly")]),e._v("， 那么前端也可以"),s("strong",[e._v("也可以修改")]),e._v("他给的 "),s("code",[e._v("cookie")]),e._v("。")]),e._v(" "),s("p",[e._v("调用"),s("code",[e._v("document.cookie")]),e._v("可以创建、修改"),s("code",[e._v("cookie")]),e._v("。和 "),s("code",[e._v("HTTP")]),e._v(" 一样，能读到所有的 非"),s("code",[e._v("HttpOnly")]),e._v(" 的 "),s("code",[e._v("cookie")]),e._v("。")]),e._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[e._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("cookie"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// username=jimu; height=180; weight=80")]),e._v("\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("在了解了 "),s("code",[e._v("cookie")]),e._v("后，便知道"),s("code",[e._v("cookie")]),e._v("是最便捷的维持HTTP请求状态的方式，大多数前端鉴权问题都是靠cookie解决的。当然也可以选用别的存储方式...")])]),e._v(" "),s("h1",{attrs:{id:"应用方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#应用方案"}},[e._v("#")]),e._v(" 应用方案")]),e._v(" "),s("h2",{attrs:{id:"服务端session"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#服务端session"}},[e._v("#")]),e._v(" 服务端session")]),e._v(" "),s("h3",{attrs:{id:"示例图"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例图"}},[e._v("#")]),e._v(" 示例图")]),e._v(" "),s("img",{attrs:{src:e.$withBase("/token/session_liuchengtu.png")}}),e._v(" "),s("ul",[s("li",[s("p",[e._v("浏览器登录发送账号密码，服务端查用户库，校验用户")])]),e._v(" "),s("li",[s("p",[e._v("服务端把用户登录状态存为 "),s("code",[e._v("Session")]),e._v("，生成一个 "),s("code",[e._v("sessionId")])])]),e._v(" "),s("li",[s("p",[e._v("通过登录接口返回，把 "),s("code",[e._v("sessionId")]),e._v(" "),s("code",[e._v("set")]),e._v(" 到 "),s("code",[e._v("cookie")]),e._v(" 上")])]),e._v(" "),s("li",[s("p",[e._v("此后浏览器再请求业务接口，"),s("code",[e._v("sessionId")]),e._v(" 随 "),s("code",[e._v("cookie")]),e._v(" 带上")])]),e._v(" "),s("li",[s("p",[e._v("服务端查 "),s("code",[e._v("sessionId")]),e._v(" 校验 "),s("code",[e._v("session")])])]),e._v(" "),s("li",[s("p",[e._v("成功后正常做业务处理，返回结果")])])]),e._v(" "),s("h3",{attrs:{id:"session的存储方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#session的存储方式"}},[e._v("#")]),e._v(" Session的存储方式")]),e._v(" "),s("p",[e._v("显然，服务端只是给"),s("code",[e._v("cookie")]),e._v("一个"),s("code",[e._v("sessionId")]),e._v(",而 "),s("code",[e._v("session")]),e._v("的具体内容(可能包含用户信息、session 状态等)。存储的方式有几种:")]),e._v(" "),s("ul",[s("li",[e._v("Redis（推荐）：内存型数据库，"),s("a",{attrs:{href:"https://link.juejin.cn/?target=http%3A%2F%2Fwww.redis.cn%2F",target:"_blank",rel:"noopener noreferrer"}},[e._v("redis中文官方网站"),s("OutboundLink")],1),e._v("。以 key-value 的形式存，正合 sessionId-sessionData 的场景；且访问快。")]),e._v(" "),s("li",[e._v("内存：直接放到变量里。一旦服务重启就没了")]),e._v(" "),s("li",[e._v("数据库：普通数据库。性能不高。")])]),e._v(" "),s("h3",{attrs:{id:"session-的过期和销毁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#session-的过期和销毁"}},[e._v("#")]),e._v(" "),s("strong",[e._v("Session 的过期和销毁")])]),e._v(" "),s("p",[e._v("只要把存储的 session 数据销毁就可以。")]),e._v(" "),s("h3",{attrs:{id:"session-的分布式问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#session-的分布式问题"}},[e._v("#")]),e._v(" "),s("strong",[e._v("Session 的分布式问题")])]),e._v(" "),s("p",[e._v("通常服务端是集群，而用户请求过来会走一次负载均衡，不一定打到哪台机器上。那一旦用户后续接口请求到的机器和他登录请求的机器不一致，或者登录请求的机器宕机了，session 不就失效了吗？")]),e._v(" "),s("p",[e._v("这个问题现在有几种解决方式。")]),e._v(" "),s("ul",[s("li",[e._v("一是从存储角度，把 session 集中存储。如果我们用独立的 Redis 或普通数据库，就可以把 session 都存到一个库里。")]),e._v(" "),s("li",[e._v("二是从分布角度，让相同 IP 的请求在负载均衡时都打到同一台机器上。以 nginx 为例，可以配置 "),s("code",[e._v("ip_hash")]),e._v(" 来实现。")])]),e._v(" "),s("p",[e._v("但通常还是采用第一种方式，因为第二种相当于阉割了负载均衡，且仍没有解决用户请求的机器宕机的问题。")]),e._v(" "),s("h3",{attrs:{id:"node-js下的session处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-js下的session处理"}},[e._v("#")]),e._v(" node.js下的session处理")]),e._v(" "),s("p",[e._v("前面的图很清楚了，服务端要实现对"),s("code",[e._v("cookie")]),e._v("和"),s("code",[e._v("session")]),e._v("的存取，实现起来要做的事还是很多的。在"),s("code",[e._v("npm")]),e._v("中，已经有封装好的中间件，比如"),s("code",[e._v("express-session-npm")]),e._v("。")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[s("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fexpress-session",target:"_blank",rel:"noopener noreferrer"}},[e._v("express-session  -  npm"),s("OutboundLink")],1),e._v(" 主要实现了：")]),e._v(" "),s("ul",[s("li",[e._v("封装了对"),s("code",[e._v("cookie")]),e._v("的读写操作，并提供配置项配置字段、加密方式、过期时间等。")]),e._v(" "),s("li",[e._v("封装了对"),s("code",[e._v("session")]),e._v("的存取操作，并提供配置项配置"),s("code",[e._v("session")]),e._v("存储方式（内存/redis）、存储规则等。")]),e._v(" "),s("li",[e._v("给req提供了"),s("code",[e._v("session")]),e._v("属性，控制属性的"),s("code",[e._v("set/get")]),e._v("并响应到"),s("code",[e._v("cookie")]),e._v("和"),s("code",[e._v("session")]),e._v("存取上，并给"),s("code",[e._v("req.session")]),e._v("提供了一些方法.")])])]),e._v(" "),s("h3",{attrs:{id:"问题的萌生"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题的萌生"}},[e._v("#")]),e._v(" 问题的萌生")]),e._v(" "),s("p",[e._v("session的维护给服务端造成很大困扰，我们必须找地方存放它，又要考虑分布式的问题，这似乎有些麻烦。")]),e._v(" "),s("br"),e._v(" "),s("p",[e._v("一个登录场景，要做的事情仅仅是:")]),e._v(" "),s("ol",[s("li",[e._v("登录，post 账号密码")]),e._v(" "),s("li",[e._v("校验成功，返回一个标记")]),e._v(" "),s("li",[e._v("请求接口携带标记")]),e._v(" "),s("li",[e._v("标记的校验")]),e._v(" "),s("li",[e._v("校验成功/失败，结果处理。")])]),e._v(" "),s("h3",{attrs:{id:"问题的解决"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题的解决"}},[e._v("#")]),e._v(" 问题的解决")]),e._v(" "),s("p",[e._v("使用"),s("code",[e._v("token")]),e._v("来做前端鉴权")]),e._v(" "),s("h2",{attrs:{id:"应用方案-token"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#应用方案-token"}},[e._v("#")]),e._v(" 应用方案: token")]),e._v(" "),s("p",[e._v("一个登录场景，也不必往 session 存太多东西，那为什么不直接打包到 cookie 中呢？这样服务端不用存了，每次只要核验 cookie 带的证件有效性就可以了，也可以携带一些轻量的信息。这种方式通常被叫做 token。")]),e._v(" "),s("h3",{attrs:{id:"token流程图"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#token流程图"}},[e._v("#")]),e._v(" token流程图")]),e._v(" "),s("img",{attrs:{src:e.$withBase("/token/token_liuchengtu.png")}}),e._v(" "),s("h3",{attrs:{id:"token流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#token流程"}},[e._v("#")]),e._v(" token流程")]),e._v(" "),s("p",[e._v("token 的流程是这样的：")]),e._v(" "),s("ul",[s("li",[e._v("用户登录，服务端校验账号密码，获得用户信息")]),e._v(" "),s("li",[e._v("把 "),s("strong",[e._v("用户信息、token")]),e._v(" 配置编码成 "),s("code",[e._v("token")]),e._v("，通过 "),s("code",[e._v("cookie")]),e._v(" "),s("code",[e._v("set")]),e._v(" 到浏览器")]),e._v(" "),s("li",[e._v("此后用户请求业务接口，通过 cookie 携带 token")]),e._v(" "),s("li",[e._v("接口校验 token 有效性，进行正常业务接口处理")])]),e._v(" "),s("h3",{attrs:{id:"客户端token的存储方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#客户端token的存储方式"}},[e._v("#")]),e._v(" 客户端token的存储方式")]),e._v(" "),s("p",[e._v("cookie并不是客户端存储凭证的唯一方式。token 因为它的无状态性，有效期、使用限制都包在 token 内容里，对 cookie 的管理能力依赖较小，客户端存起来就显得更自由。但 web 应用的主流方式仍是放在 cookie 里。")]),e._v(" "),s("h3",{attrs:{id:"token的编码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#token的编码"}},[e._v("#")]),e._v(" token的编码")]),e._v(" "),s("p",[e._v("通常都是采用"),s("code",[e._v("base64")]),e._v("，比如 "),s("code",[e._v("eyJ1c2VyaWQiOiJhIn0=")]),e._v("就是 "),s("code",[e._v('{"userid":"abb”}')]),e._v("的转码结果。")]),e._v(" "),s("h3",{attrs:{id:"防篡改"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#防篡改"}},[e._v("#")]),e._v(" 防篡改")]),e._v(" "),s("p",[e._v("如果用户 cdd 拿"),s("code",[e._v('{"userid":"abb”}')]),e._v("转了个 base64，再手动修改了自己的 token 为 "),s("code",[e._v("eyJ1c2VyaWQiOiJhIn0=")]),e._v("，便能能直接发送请求访问到 abb 的数据。")]),e._v(" "),s("h4",{attrs:{id:"解决方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案"}},[e._v("#")]),e._v(" 解决方案")]),e._v(" "),s("p",[e._v("给token加密作为 "),s("strong",[e._v("签名")]),e._v(" ，用来识别token是否被篡改过。例如在 "),s("code",[e._v("cookie-session-npm")]),e._v("库中，增加了两项配置:")]),e._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("secret")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'iAmSecret'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("signed")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n")])])]),s("p",[e._v("这样会多种一个 .sig cookie, 里面的值就是 "),s("code",[e._v('{"userid":"abb”}')]),e._v(" 和 "),s("code",[e._v("iAmSecret")]),e._v("通过加密算法计算出来的。常见加密的链接: ("),s("a",{attrs:{href:"https://link.juejin.cn/?target=https%3A%2F%2Fdocs.microsoft.com%2Fzh-cn%2Fdotnet%2Fapi%2Fsystem.security.cryptography.hmacsha256%3Fredirectedfrom%3DMSDN%26view%3Dnetframework-4.8",target:"_blank",rel:"noopener noreferrer"}},[e._v("HMACSHA256 类 (System.Security.Cryptography) | Microsoft Docs"),s("OutboundLink")],1)]),e._v(" "),s("h3",{attrs:{id:"示例图-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例图-2"}},[e._v("#")]),e._v(" 示例图")]),e._v(" "),s("img",{attrs:{src:e.$withBase("/token/token_secret.png")}}),e._v(" "),s("br"),e._v(" "),s("p",[e._v("现在cdd虽然造得出 "),s("code",[e._v("abb")]),e._v("的token，但他无法造出加密后的签名，因此解决了 "),s("strong",[e._v("篡改")]),e._v(" 盗用他人"),s("code",[e._v("token")]),e._v("的问题。")]),e._v(" "),s("h2",{attrs:{id:"应用方案-jwt"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#应用方案-jwt"}},[e._v("#")]),e._v(" 应用方案 JWT")]),e._v(" "),s("p",[e._v("上述token做法额外增加了 cookie 数量，数据本身也没有规范的格式，所以 "),s("a",{attrs:{href:"https://link.juejin.cn/?target=https%3A%2F%2Fjwt.io%2Fintroduction%2F",target:"_blank",rel:"noopener noreferrer"}},[e._v("JSON Web Token Introduction - jwt.io"),s("OutboundLink")],1),e._v(" 横空出世了。")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("JSON Web Token (JWT) 是一个开放标准，定义了一种传递 JSON 信息的方式。这些信息通过数字签名确保可信。")])]),e._v(" "),s("p",[e._v("它是一种成熟的 token 字符串生成方案，包含了我们前面提到的数据、签名。代码示例：")]),e._v(" "),s("p",[s("code",[e._v("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJhIiwiaWF0IjoxNTUxOTUxOTk4fQ.2jf3kl_uKWRkwjOP6uQRJFqMlwSABcgqqcJofFH5XCo")])]),e._v(" "),s("h3",{attrs:{id:"示例图-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例图-3"}},[e._v("#")]),e._v(" 示例图")]),e._v(" "),s("img",{attrs:{src:e.$withBase("/token/jwt_liuchengtu.png")}}),e._v(" "),s("p",[e._v("类型、加密算法的选项，以及 JWT 标准数据字段，可以参考 "),s("a",{attrs:{href:"https://link.juejin.cn/?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc7519%23section-4.1",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC 7519 - JSON Web Token (JWT)"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("node 上同样有相关的库实现："),s("a",{attrs:{href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fexpress-jwt",target:"_blank",rel:"noopener noreferrer"}},[e._v("express-jwt - npm"),s("OutboundLink")],1),e._v(" "),s("a",{attrs:{href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fkoa-jwt",target:"_blank",rel:"noopener noreferrer"}},[e._v("koa-jwt - npm"),s("OutboundLink")],1)]),e._v(" "),s("h3",{attrs:{id:"refresh-token"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#refresh-token"}},[e._v("#")]),e._v(" refresh token")]),e._v(" "),s("p",[e._v("业务接口用来鉴权的 token，我们称之为 access token。越是权限敏感的业务，我们越希望 access token 有效期足够短，以避免被盗用。但过短的有效期会造成 access token 经常过期，过期后怎么办呢？")]),e._v(" "),s("p",[e._v("一种办法是，让用户重新登录获取新 token，显然不够友好，要知道有的 access token 过期时间可能只有几分钟。")]),e._v(" "),s("p",[e._v("另外一种办法是，再来一个 token，一个专门生成 access token 的 token，我们称为 refresh token。")]),e._v(" "),s("ul",[s("li",[e._v("access token 用来访问业务接口，由于有效期足够短，盗用风险小，也可以使请求方式更宽松灵活")]),e._v(" "),s("li",[e._v("refresh token 用来获取 access token，有效期可以长一些，通过独立服务和严格的请求方式增加安全性；由于不常验证，也可以如前面的 session 一样处理")])]),e._v(" "),s("p",[e._v("有了 refresh token 后，几种情况的请求流程变成这样：")]),e._v(" "),s("h3",{attrs:{id:"示例图-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例图-4"}},[e._v("#")]),e._v(" 示例图")]),e._v(" "),s("img",{attrs:{src:e.$withBase("/token/refresh_token_liuchengtu.png")}}),e._v(" "),s("h2",{attrs:{id:"session和token"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#session和token"}},[e._v("#")]),e._v(" session和token")]),e._v(" "),s("p",[e._v("session 和 token 都是边界很模糊的概念，就像前面说的，refresh token 也可能以 session 的形式组织维护。")]),e._v(" "),s("p",[e._v("狭义上，我们通常认为 session 是"),s("strong",[e._v("种在 cookie 上、数据存在服务端")]),e._v("的认证方案，token 是"),s("strong",[e._v("客户端存哪都行、数据存在 token 里")]),e._v("的认证方案。对 session 和 token 的对比本质上是"),s("strong",[e._v("客户端存 cookie / 存别地儿")]),e._v("、"),s("strong",[e._v("服务端存数据 / 不存数据")]),e._v("的对比。")]),e._v(" "),s("p",[s("strong",[e._v("客户端存 cookie / 存别地儿")])]),e._v(" "),s("p",[e._v("存 cookie 固然方便不操心，但问题也很明显：")]),e._v(" "),s("ul",[s("li",[e._v("在浏览器端，可以用 cookie（实际上 token 就常用 cookie），但出了浏览器端，没有 cookie 怎么办？")]),e._v(" "),s("li",[e._v("cookie 是浏览器在域下自动携带的，这就容易引发 CSRF 攻击（"),s("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Ftech.meituan.com%2F2018%2F10%2F11%2Ffe-security-csrf.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("前端安全系列（二）：如何防止CSRF攻击？ - 美团技术团队"),s("OutboundLink")],1),e._v("）")])]),e._v(" "),s("p",[e._v("存别的地方(例如http头部"),s("code",[e._v("Authorization: Bearer <token>")]),e._v("等)，可以解决没有 cookie 的场景；通过参数等方式手动带，可以避免 "),s("code",[e._v("CSRF")]),e._v(" 攻击。")]),e._v(" "),s("p",[s("strong",[e._v("服务端存数据 / 不存数据")])]),e._v(" "),s("ul",[s("li",[e._v("存数据：请求只需携带 id，可以大幅缩短认证字符串长度，减小请求体积")]),e._v(" "),s("li",[e._v("不存数据：1. 不需要服务端整套的解决方案和分布式处理，降低硬件成本 2. 避免查库带来的"),s("strong",[e._v("验证延迟")])])]),e._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),s("ul",[s("li",[e._v("HTTP 是无状态的，为了维持前后请求，需要前端存储标记")]),e._v(" "),s("li",[e._v("cookie 是一种完善的标记方式，通过 HTTP 头或 js 操作，有对应的安全策略，是大多数状态管理方案的基石")]),e._v(" "),s("li",[e._v("session 是一种状态管理方案，前端通过 cookie 存储 id，后端存储数据，但后端要处理分布式问题")]),e._v(" "),s("li",[e._v("token 是另一种状态管理方案，相比于 session 不需要后端存储，数据全部存在前端，解放后端，释放灵活性")]),e._v(" "),s("li",[e._v("token 的编码技术，通常基于 base64，或增加加密算法防篡改，jwt 是一种成熟的编码方案")]),e._v(" "),s("li",[e._v("在复杂系统中，token 可通过 service token、refresh token 的分权，同时满足安全性和用户体验")]),e._v(" "),s("li",[e._v("session 和 token 的对比就是用不用cookie和后端存不存的对比")])]),e._v(" "),s("h1",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[e._v("#")]),e._v(" 参考文章")]),e._v(" "),s("ol",[s("li",[s("a",{attrs:{href:"https://juejin.cn/post/6898630134530752520#comment",target:"_blank",rel:"noopener noreferrer"}},[e._v("前端鉴权的兄弟们：cookie、session、token、jwt、单点登录 - 掘金 (juejin.cn)"),s("OutboundLink")],1)]),e._v(" "),s("li",[s("a",{attrs:{href:"https://juejin.cn/post/6977280069437751310",target:"_blank",rel:"noopener noreferrer"}},[e._v("JWT 前端应该把它存在哪儿？"),s("OutboundLink")],1)]),e._v(" "),s("li",[s("a",{attrs:{href:"https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Json Web Token 阮一峰"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=a.exports}}]);