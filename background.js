chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
      console.log("Request comes from content script " + sender.tab.id);
      if (request.greeting === "close_tab"){
          chrome.tabs.remove(sender.tab.id);
      }
});

function getRemoteConfig() {
    return getWithCache(newDayKey('config'), 'https://raw.githubusercontent.com/ZhuPeng/mp-transform-public/master/.config.json');
}

function checkIsPaid(email) {
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
}

chrome.identity.getProfileUserInfo(function(userInfo) {
    console.log(userInfo);
    email = userInfo.email;

    var isPaid = localStorage.getItem('isPaid') || false;
    if (isPaid) {return}
    checkIsPaid(email)
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

    checkIsPaid(email);
    alert("超过使用限制，请联系管理员开通付费服务\n用户名：" + email + "\n管理员（微信）：15652961268\n")
    return true
}

var Handlers = [{
    execScript: 'handlers/contentScript.js',
    urls: ['mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit'],
}, {
    execScript: 'handlers/instagram.js',
    urls: ['instagram.com/tv/'],
}, {
    execScript: 'handlers/savefrom.js',
    urls: ['en.savefrom.net'],
}, {
    execScript: 'handlers/getyarn.js',
    urls: ['getyarn.io/yarn-clip'],
}, {
    execScript: 'handlers/batch_getyarn.js',
    urls: ['getyarn.io/yarn-find?text='],
}, {
    execScript: 'handlers/batch_open_gzh.js',
    urls: ['mp.weixin.qq.com/cgi-bin/appmsgpublish?sub=list'],
}, {
    execScript: 'handlers/gongzhonghao.js',
    urls: ['https://mp.weixin.qq.com/s?__biz='],
}]

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('browserAction Clicked: ' + tab.url);
    if (limitUsage() === true) {return}

    var remoteConfig = getRemoteConfig();
    if (remoteConfig['handlers'].length > 0) {
        Handlers.push(...remoteConfig['handlers']);
    }
    for (var i = 0; i < Handlers.length; i++) {
        var h = Handlers[i];
        for (var j = 0; j < h.urls.length; j++) {
            var url = h.urls[j];
            if (tab.url.indexOf(url) > -1) {
				console.log('hit:', h);
                chrome.tabs.executeScript(null, {file: "util.js"}, function() {
                    if (h.execScript !== undefined) {
                        chrome.tabs.executeScript(null, {file: h.execScript});
                    } else if (h.execCode !== undefined) {
                        chrome.tabs.executeScript(null, {code: h.execCode}, function() {});
                    }
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
