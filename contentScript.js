var frame = document.getElementById("ueditor_0")
var allSpans = frame && frame.contentWindow ? frame.contentWindow.document.getElementsByTagName("span") : []
// config
var MPTag = 'data-miniprogram-appid='
var Count = []

var directTransform = [{
    nickname: 'GitHub精选',
    appid: 'wxe60c5750c87916e0',
    indexPage: 'pages/bloglist/bloglist',
    urlPrefix: 'https://githubxxxx.com',
    genMPUrl: function(meta, url) {
        var [owner, repo, filepath] = parseGitHub(url)
        console.log("parseGitHub url:", owner, repo, filepath)
        if (owner == "") { return 'pages/github/index'}
        else if (repo == "") { return 'pages/account/account?owner=' + owner }
        else if (filepath == "") { return 'pages/readme/readme?repo=' + owner + '/' + repo }
        else if (filepath.startsWith('issues/') || filepath.startsWith('pull/')) {
            var issue = 'https://api.github.com/repos/' + owner + '/' + repo + '/' + filepath.replace('pull/', 'issues/')
            return '/pages/issue/issue?issue='+issue
        }
        else { return 'pages/gitfile/gitfile?file=' + filepath + '&owner=' + owner + '&repo=' + repo }
    },
}, {
    nickname: 'GitHub精选',
    appid: 'wxe60c5750c87916e0',
    indexPage: 'pages/bloglist/bloglist',
    urlPrefix: 'https://mp.weixin.qq.com/pages/gitdir/gitdir',
    genMPUrl: function(meta, url) {
        return url.slice('https://mp.weixin.qq.com/'.length, url.length)
    }
}, {
    nickname: 'iDayDayUP',
    appid: 'wx482958efb057c5a7',
    indexPage: 'pages/daily/daily',
    urlPrefix: 'https://idaydayup.com',
    genMPUrl: DefaultIndexMPWithPara,
}, {
    nickname: 'Readhub',
    appid: 'wxd83c7f07a0b00f1b',
    urlPrefix: 'https://readhub.cn/topic',
    indexPage: 'pages/index',
    genMPUrl: function(meta, url) {
        var idx = url.indexOf(meta.urlPrefix)
        if (idx == -1) { return meta.indexPage }
        // Topic URL: https://readhub.cn/topic/7NgjG2U66fX
        // Index Page: https://readhub.cn/topics
        var topicID = url.slice(meta.urlPrefix.length+idx+1, url.length)
        if (topicID == "" || topicID == "/") { return meta.indexPage }
        return 'pages/detail?id=' + topicID
    },
}, {
    nickname: '哔哩哔哩',
    appid: 'wx7564fd5313d24844',
    urlPrefix: 'https://www.bilibili.com/video/av',
    indexPage: 'pages/index/index',
    genMPUrl: function(meta, url) {
        var idx = url.indexOf(meta.urlPrefix)
        if (idx == -1) {return meta.indexPage }
        // pages/video/video?avid=54809781
        // https://www.bilibili.com/video/av54809781?spm_id_from=333.334.b_62696c695f67756f636875616e67.51
        var qmark = url.indexOf('?')
        var start = meta.urlPrefix.length+idx
        var id = url.slice(start, qmark!=-1&&qmark>start ? qmark : url.length)
        if (id == "" || id == "/") { return meta.indexPage }
        return 'pages/video/video?avid=' + id
    },
}, {
    nickname: '哔哩哔哩',
    appid: 'wx7564fd5313d24844',
    urlPrefix: 'https://www.bilibili.com/BV',
    indexPage: 'pages/index/index',
    genMPUrl: GenBilibiliURL,
}, {
    nickname: '哔哩哔哩',
    appid: 'wx7564fd5313d24844',
    urlPrefix: 'https://www.bilibili.com/video/BV',
    indexPage: 'pages/index/index',
    genMPUrl: GenBilibiliURL,
}, {
    nickname: '腾讯视频',
    appid: 'wxa75efa648b60994b',
    urlPrefix: 'https://v.qq.com/x/cover/',
    indexPage: 'pages/index/index',
    genMPUrl: function(meta, url) {
        var idx = url.indexOf(meta.urlPrefix)
        if (idx == -1) {return meta.indexPage }
        // pages/play/index.html?cid=jeds18ea11rrnbg&parentParams=
        // https://v.qq.com/x/cover/jeds18ea11rrnbg.html
        // https://v.qq.com/x/cover/5vgz1duinuar746/r00314e3n1i.html
        var arr = url.split('/')
        var id = arr[arr.length-1]
        if (id.indexOf('.html') != -1) {
            id = id.slice(0, id.indexOf('.html'))
        }
        if (id == "" || id == "/") { return meta.indexPage }
        return 'pages/play/index?parentParams=&cid=' + id
    },
}, {
    nickname: 'CSDN',
    appid: 'wx2115aba2ed1f96b9',
    urlPrefix: 'https://blog.csdn.net',
    indexPage: 'pages/index/index',
    genMPUrl: function(meta, url) {
        var idx = url.indexOf(meta.urlPrefix)
        if (idx == -1 || url.indexOf('/article/details/') == -1) {return meta.indexPage }
        // pages/blog/article-detail?userName=qq_41753040&articleId=90633737&__key_=15599641012541
        // https://blog.csdn.net/qq_41753040/article/details/90633737
        var arr = url.slice(meta.urlPrefix.length, url.length).split('/')
        if (arr.length < 4) { return meta.indexPage }
        var username = arr[0]
        var id = arr[3]
        if (username == 0 || id == "" || id == "/") { return meta.indexPage }
        return 'pages/blog/article-detail?userName=' + username + '&articleId=' + id
    },
}, {
    nickname: '简书',
    appid: 'wx646159264d261dab',
    urlPrefix: 'https://www.jianshu.com',
    indexPage: 'pages/index',
    // https://www.jianshu.com/p/24d22539d45a
    genMPUrl: GenFormatOneMPUrl('p', 'pages/note?slug='),
}, {
    nickname: '知乎热榜',
    appid: 'wxeb39b10e39bf6b54',
    urlPrefix: 'https://www.zhihu.com',
    indexPage: 'pages/index/index',
    // https://www.zhihu.com/question/329765131
    genMPUrl: GenFormatOneMPUrl('question', 'zhihu/question?id='),
}, {
    nickname: '知乎热榜',
    appid: 'wxeb39b10e39bf6b54',
    urlPrefix: 'https://zhuanlan.zhihu.com',
    indexPage: 'pages/index/index',
    // https://zhuanlan.zhihu.com/p/63501230
    genMPUrl: GenFormatOneMPUrl('p', 'zhihu/article?id='),
}, {
    nickname: '什么值得买',
    appid: 'wxeb5d1f826d7998df',
    urlPrefix: 'https://www.smzdm.com',
    indexPage: 'pages/index/index',
    // https://www.smzdm.com/p/14483467/
    genMPUrl: GenFormatOneMPUrl('p', 'pages/haojia_details/haojia_details?id='),
}, {
    nickname: '什么值得买',
    appid: 'wxeb5d1f826d7998df',
    urlPrefix: 'https://post.smzdm.com',
    indexPage: 'pages/index/index',
    // https://post.smzdm.com/p/ax08nrm2/
    genMPUrl: GenFormatOneMPUrl('p', 'pages/haowen_details/haowen_details?type=11&id='),
}, {
    nickname: '百度网盘',
    appid: 'wxdcd3d073e47d1742',
    urlPrefix: 'https://pan.baidu.com',
    indexPage: 'pages/netdisk_index/index',
    //  https://pan.baidu.com/s/10v3OUqXpkBnpurKFLI40jQ
    genMPUrl: GenFormatOneMPUrl('s', 'pages/netdisk_share/share?scene='),
}, {
    nickname: '36氪Lite',
    appid: 'wx23551bed0b72cd7f',
    urlPrefix: 'https://36kr.com',
    indexPage: 'pages/list/list',
    // https://36kr.com/p/5220102
    genMPUrl: GenFormatOneMPUrl('p', 'pages/detail/detail?id='),
}, {
    nickname: '掘金第三方版',
    appid: 'wx0f72a9f832b78889',
    urlPrefix: 'https://juejin.im',
    indexPage: 'pages/launch/launch',
    // https://juejin.im/post/5d147765f265da1bb003d0dc
    genMPUrl: GenFormatOneMPUrl('post', 'pages/post/post?type=post&id='),
}, {
    nickname: 'V2EX For You',
    appid: 'wx1b979cda6b085993',
    urlPrefix: 'https://www.v2ex.com',
    indexPage: 'pages/index/index',
    // https://www.v2ex.com/t/578260#reply22
    genMPUrl: function (meta, url) {
        var p = GenFormatOneMPUrl('t', 'pages/topic/index?topicId=')(meta, url)
        if (p.indexOf('#') != -1 ){
            p = p.slice(0, p.indexOf('#'))
        }
        return p
    }
}, {
    nickname: '豆瓣评分',
    appid: 'wx2f9b06c1de1ccfca',
    urlPrefix: 'https://movie.douban.com',
    indexPage: 'pages/index/index',
    // https://movie.douban.com/subject/26794435/?from=showing
    genMPUrl: GenFormatOneMPUrl('subject', 'pages/subject/subject?type=movie&id='),
}, {
    nickname: '豆瓣评分',
    appid: 'wx2f9b06c1de1ccfca',
    urlPrefix: 'https://book.douban.com',
    indexPage: 'pages/index/index',
    // https://book.douban.com/subject/33442274/?icn=index-latestbook-subject
    genMPUrl: GenFormatOneMPUrl('subject', 'pages/subject/subject?type=book&id='),
}, {
    nickname: '豆瓣评分',
    appid: 'wx2f9b06c1de1ccfca',
    urlPrefix: 'https://music.douban.com',
    indexPage: 'pages/index/index',
    // https://music.douban.com/subject/34780472/
    genMPUrl: GenFormatOneMPUrl('subject', 'pages/subject/subject?type=music&id='),
}, {
    nickname: '腾讯新闻',
    appid: 'wxb10c47503e8c8e01',
    urlPrefix: 'https://new.qq.com',
    indexPage: 'pages/main_page/main_page',
    // https://new.qq.com/omn/TWF20190/TWF2019081200847600.html
    genMPUrl: GenFormatLastPathMPUrl('pages/normal/index?atype=0&id='),
}]
directTransform.push({
    nickname: 'GitHub精选',
    appid: 'wxe60c5750c87916e0',
    indexPage: 'pages/bloglist/bloglist',
    urlPrefix: 'https://',
    genMPUrl: function(meta, url, text) {
        return 'pages/copy/copy?url=' + url
    },
})
// directTransform.push({
//     nickname: 'GitHub精选',
//     appid: 'wxe60c5750c87916e0',
//     indexPage: 'pages/bloglist/bloglist',
//     urlPrefix: 'http://',
//     genMPUrl: function(meta, url, text) {
//         return 'pages/copy/copy?url=' + url
//     },
// })

function DefaultGenMPUrl(meta, url) {
    if (url == meta.urlPrefix) {return meta.indexPage}
    return url
}

function isGitHubPage(url) {
      return url.startsWith("https://github.com/") || url.startsWith("http://github.com/")
}

function DefaultIndexMPWithPara(meta, url) {
    var p = url.slice(meta.urlPrefix.length, url.length)
    return meta.indexPage + p
}

function GenBilibiliURL(meta, url) {
    var idx = url.indexOf(meta.urlPrefix)
    if (idx == -1) {return meta.indexPage }
    // pages/video/video?avid=54809781
    // https://www.bilibili.com/video/BV1dq4y127TF
    var qmark = url.indexOf('?')
    var start = meta.urlPrefix.length+idx
    var id = url.slice(start, qmark!=-1&&qmark>start ? qmark : url.length)
    if (id == "" || id == "/") { return meta.indexPage }
    var bvid = "BV" + id.replace(/\//, '')
    console.log('bvid:', bvid)

    // quote: https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/bvid_desc.md
    const XOR_CODE = 23442827791579n;
    const MASK_CODE = 2251799813685247n;
    const MAX_AID = 1n << 51n;
    const BASE = 58n;
    
    const data = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf';

    const bvidArr = Array.from(bvid);
    [bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]];
    [bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]];
    bvidArr.splice(0, 3);
    const tmp = bvidArr.reduce((pre, bvidChar) => pre * BASE + BigInt(data.indexOf(bvidChar)), 0n);
    var avid = Number((tmp & MASK_CODE) ^ XOR_CODE);

    return 'pages/video/video?avid=' + avid
}

function parseGitHub(url) {
    if (!isGitHubPage(url)) {
        return ["", "", ""]
    }
    var arr = url.split('/')
    if (arr.length == 4){
        return [arr[3], "", ""]
    } else if (arr.length == 5) {
        var repo = arr[4]
        if (repo.indexOf('#')) {
            repo = arr[4].split('#')[0]
        }
        return [arr[3], repo, ""]
    } else if (arr.length > 5) {
        var file = url.slice(("https://github.com/" + arr[3] + "/" + arr[4] + "/").length)
        return [arr[3], arr[4], file]
    }
    return ["", "", ""]
}

// url like: <prefix>/xxx/yyy/zzz/<last>.<sufix>
function GenFormatLastPathMPUrl(path) {
    function genMPUrl(meta, url) {
        var idx = url.indexOf(meta.urlPrefix)
        if (idx == -1) {return meta.indexPage }
        var arr = url.split('/')
        var lastpath = arr[arr.length-1].split('.')[0]
        if (lastpath == "") {return meta.indexPage} 
        return path + lastpath
    }
    return genMPUrl
}

// url like: <prefix>/<gap>/<id>, such as: https://zhuanlan.zhihu.com/p/63501230
function GenFormatOneMPUrl(gap, path) {
    function genMPUrl(meta, url) {
        var idx = url.indexOf(meta.urlPrefix)
        if (idx == -1 || url.indexOf('/'+gap+'/') == -1) {return meta.indexPage }
        var arr = url.split('/')
        if (arr.length < 5) { return meta.indexPage }
        var id = arr[4]
        if (id == "") { return meta.indexPage }
        return path + id
    }
    return genMPUrl
}

function genFilterFunc(urlPrefix) {
    return function(item) {
        var wechat = 'https://mp.weixin.qq.com'
        if (!item.innerHTML || item.innerHTML.indexOf(urlPrefix)==-1 || item.innerHTML.indexOf(MPTag)!=-1 || item.innerHTML.indexOf(wechat) != -1) {return false}
        return true 
    }
}

function filterArr(arr, func) {
    var newArr = []
    if (arr.length == 0) {return newArr}
    for (j=0; j<arr.length; j++) {
        if (func(arr[j])) {
            newArr.push(arr[j])
        }
    }
    return newArr
}

function mpLink(transItem, url, text) {
    Count.push(transItem.nickname + ': ' + url)
    url = transItem.genMPUrl(transItem, url, text)
    return '<span style="color: rgb(93, 94, 93);font-family: TeXGyreAdventor, &quot;Century Gothic&quot;, &quot;Yu Gothic&quot;, Raleway, STHeiti, sans-serif;font-size: 16px;orphans: 4;white-space: pre-wrap;background-color: rgb(255, 255, 255);"><a class="weapp_text_link" style="font-size:16px;" data-miniprogram-appid="' + transItem.appid + '" data-miniprogram-path="' + url + '" data-miniprogram-nickname="' + transItem.nickname + '" href="" data-miniprogram-type="text" data-miniprogram-servicetype="">' + text + '</a></span>'
}

console.log('allSpans:', allSpans)
for (i=0; i<directTransform.length; i++) {
    var trans = directTransform[i]
    var urlPrefix = trans.urlPrefix
    var nickname = trans.nickname

    var allLinks = filterArr(allSpans, genFilterFunc(urlPrefix))
    console.log(nickname + ' => allLinks:', allLinks)

    filterArr(allLinks, function(item) {
        // TODO: 判断是不是 md-inline="autolink" class="md-link"
        console.log(nickname, ' => detail:', item)
        var inH = item.innerHTML
        if (inH.startsWith(urlPrefix)) {
            item.innerHTML = mpLink(trans, inH, inH)
        } else if (item.firstChild) {
            var fch = item.firstChild
            if (fch.href && fch.href.startsWith(urlPrefix)) {
                item.innerHTML = mpLink(trans, fch.href, fch.innerText)
            }
            if (fch.innerText && fch.innerText.startsWith(urlPrefix)) {
                item.innerHTML = mpLink(trans, fch.innerText, fch.innerText)
            }
        }
    })
}
if (Count.length == 0) {alert('无可转换为小程序的链接')}
else {
    alert('转换小程序链接成功：\n'+Count.join('\n')); 
    if (Count.length > 50) {
        alert('转换小程序链接超过50个，微信平台限制了最多50个')
    }
}
