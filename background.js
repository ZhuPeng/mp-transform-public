chrome.identity.getProfileUserInfo(function(userInfo) {
    console.log(userInfo);
    email = userInfo.email;

    var isPaid = localStorage.getItem('isPaid') || false;
    if (isPaid) {return}

    fetch('https://raw.githubusercontent.com/ZhuPeng/mp-transform-public/master/.user')
        .then(response => response.text())
        .then(data => {
            console.log(data)
            if (data.indexOf(email) > -1) {
                console.log('user is paied')
                localStorage.setItem('isPaid', true);
                alert("恭喜你成为尊贵的付费用户，付费用户享有多种权益，详情咨询管理员。\n")
                return false
            }
        })
        .catch(error => {
            console.log(error);
        });
});

function limitUsage() {
    var key = 'usageCount'
    var usageCount = localStorage.getItem(key) || 0;
    usageCount++;
    localStorage.setItem(key, usageCount);

    if (usageCount <= 10) {
        return false;
    }

    var isPaid = localStorage.getItem('isPaid') || false;
    if (isPaid) {return false}

    alert("超过使用限制，请联系管理员开通付费服务\n用户：" + email + "\n管理员（微信）：15652961268\n")
    return true
}

var Handlers = [{
    execScript: 'contentScript.js',
    urls: ['mp.weixin.qq.com'],
}, {
    execScript: 'instagram.js',
    urls: ['www.instagram.com/tv/'],
}, {
    execScript: 'video.js',
    urls: ['facebook.com', 'youtube.com', 'fb.watch', 'instagram.com'],
}, {
    execScript: 'savefrom.js',
    urls: ['en.savefrom.net'],
}, {
    execScript: 'getyarn.js',
    urls: ['getyarn.io/yarn-clip'],
}, {
    execScript: 'batch_getyarn.js',
    urls: ['getyarn.io/yarn-find?text='],
}, {
    execScript: 'savethevideo-com.js',
    urls: ['https://vimeo.com/'],
}, {
    execScript: 'snapany-com.js',
    urls: ['www.bilibili.com/video/'],
}, {
    execScript: 'tiqu-cc.js',
    urls: ['www.xiaohongshu.com/explore/'],
}, {
    execScript: 'cookie.js',
    urls: ['weibo.com'],
}]

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('browserAction Clicked: ' + tab.url);
    if (limitUsage() === true) {return}

    for (var i = 0; i < Handlers.length; i++) {
        var h = Handlers[i];
        for (var j = 0; j < h.urls.length; j++) {
            var url = h.urls[j];
            if (tab.url.indexOf(url) > -1) {
                chrome.tabs.executeScript(null, {file: "util.js"}, function() {
                    chrome.tabs.executeScript(null, {file: h.execScript});
                });
                return
            }
        }
    }

    var supportUrls = '';
    for (var i = 0; i < Handlers.length; i++) {
        var h = Handlers[i];
        for (var j = 0; j < h.urls.length; j++) {
            supportUrls += '\n' + h.urls[j];
        }
    }

    console.log("not support")
    alert("插件在不支持的页面运行\n\n\n支持的网站列表如下：" + supportUrls)
});
