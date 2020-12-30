[![HitCount](http://hits.dwyl.io/ZhuPeng/mp-transform-public.svg)](http://hits.dwyl.io/ZhuPeng/mp-transform-public)

你们是不是在使用浏览器的时候，会在某些页面有些例行的操作，而这些操作如果能够一键执行，那肯定能够极大的提升你的效率。我们通过 Chrome 插件提供的能力，开发了*链接小助手*，以下就是目前 *链接小助手* 支持的功能：

1. 公众号小程序链接自动转换功能

   微信公众号后台编辑文章的过程中可以添加小程序，我数了一下至少需要经过 6 步才能添加完成，有时候都不知道小程序的访问路径而不知道怎么操作。

   链接小助手帮助大家更方便的在公众号文章中添加小程序，借助 Chrome 插件提供一键轻松添加和排版小程序链接。你只需要在文章中填写浏览器上的链接，小助手将自动转化为小程序可以识别的链接，比如：`https://github.com/ZhuPeng/mp-githubtrending`

2. 一键下载视频

   目前支持 Instagram、YouTube 等。使用方式非常的简单，在浏览器访问你要下载的视频，点击 Chrome 右上角的插件图标即可。

更多其他使用场景欢迎提供建议或直接 Pull Requests。扫码关注如下微信公众号，获取工具定期更新推送。

![wechat](https://7465-test-3c9b5e-1258459492.tcb.qcloud.la/common/ultrabot-qrcode.png)



## 安装和使用方式

Chrome 应用商店安装：[链接](https://chrome.google.com/webstore/detail/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%8E%92%E7%89%88%E5%B0%8F%E5%8A%A9%E6%89%8B/aigggkimjmfijjfbhonlblgajnoilbbb)

安装完成后，浏览器右上角将出现如下 Logo。

![](https://7465-test-3c9b5e-1258459492.tcb.qcloud.la/common/link-128.png)

安装完成之后，进入微信公众号文章编辑页面，操作效果如下：

![](https://7465-test-3c9b5e-1258459492.tcb.qcloud.la/common/wechat-editor.PNG)
![](https://7465-test-3c9b5e-1258459492.tcb.qcloud.la/common/wechat-xiaoguo.PNG)


## 已支持的小程序列表

* [GitHub Trending Hub](<https://github.com/ZhuPeng/mp-githubtrending>)
* [Readhub](https://readhub.cn/topics)
* [哔哩哔哩](https://www.bilibili.com/)
* [腾讯视频](https://v.qq.com/)
* [CSDN](https://blog.csdn.net/)
* [简书](https://www.jianshu.com/)
* [知乎热榜](https://www.zhihu.com)、[知乎专栏](https://zhuanlan.zhihu.com)
* [什么值得买](https://www.smzdm.com)
* [百度网盘](https://pan.baidu.com): 分享链接为 https://pan.baidu.com/s/<随机字符串>，需要在末尾添加 #提取码#0#0，例如：https://pan.baidu.com/s/1EuJiHB-q2Lggrt28cjQISA#3tb7#0#0 
* [36氪Lite](https://36kr.com)
* [掘金第三方版](https://juejin.im)
* [V2EX For You](https://www.v2ex.com)
* [豆瓣电影](https://movie.douban.com/)、[豆瓣读书](https://book.douban.com/)、[豆瓣音乐](https://music.douban.com/)
* [腾讯新闻](https://new.qq.com/)
* [文章助手](https://linux.cn/article-10838-1.html)：未匹配的链接默认转换为文章助手小程序链接

其他小程序的支持正在开发中，如果你的小程序希望接入，欢迎扫描如下二维码联系作者。

![](https://7465-test-3c9b5e-1258459492.tcb.qcloud.la/mp-githubtrending/wechat_xiaopeng.jpeg)



##  小程序跳转

如果你是小程序开发人员，希望自己的小程序也能跳转如上小程序，可以复制仓库中的 [multimp.js](multimp.js) 到你的小程序源码中，具体使用方式可以参考：[链接代码](https://github.com/ZhuPeng/mp-githubtrending/blob/master/pages/component/md/md.js#L94)，同时你需要在小程序的 `app.json` 中添加允许跳转的小程序列表参数 `navigateToMiniProgramAppIdList`，[参考链接代码](https://github.com/ZhuPeng/mp-githubtrending/blob/master/app.json#L60)。




## FAQ

有任何问题欢迎提交 Issue 和 PR，详情：[https://github.com/ZhuPeng/mp-transform-public](https://github.com/ZhuPeng/mp-transform-public)




## 赞赏是一种力量

| 微信 | 支付宝 |
| :---: | :----: |
| ![](https://7465-test-3c9b5e-1258459492.tcb.qcloud.la/common/Wechat-zanshang.jpeg) | ![](https://7465-test-3c9b5e-1258459492.tcb.qcloud.la/common/alipay-qrcode.jpeg) |
