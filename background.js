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
    const date = new Date().toLocaleDateString();
    var key = date + 'usageCount'
    var usageCount = localStorage.getItem(key) || 0;
    usageCount++;
    localStorage.setItem(key, usageCount);

    if (usageCount <= 2) {
        return false;
    }

    var isPaid = localStorage.getItem('isPaid') || false;
    if (isPaid) {return false}

    alert("超过使用限制，请联系管理员开通付费服务\n用户：" + email + "\n管理员（微信）：15652961268\n")
    return true
}

chrome.browserAction.onClicked.addListener(function(tab) {
    var scope = "https://mp.weixin.qq.com/"
    console.log('browserAction Clicked: ' + tab.url);
    if (limitUsage() === true) {return}

    if (tab.url.startsWith(scope)) {
        chrome.tabs.executeScript({file: 'contentScript.js'});
    } else if (tab.url.startsWith("https://www.instagram.com/tv/")) {
        chrome.tabs.executeScript({file: 'instagram.js'});
    } else if (tab.url.indexOf("facebook.com") > -1 || tab.url.indexOf("youtube.com") > -1 || tab.url.indexOf('fb.watch') > -1 || tab.url.indexOf('instagram.com') > -1) {
        chrome.tabs.executeScript({file: 'video.js'});
    } else if (tab.url.indexOf("en.savefrom.net") > -1) {
        chrome.tabs.executeScript({file: 'savefrom.js'});
    } else if (tab.url.indexOf("getyarn.io/yarn-clip") > -1) {
        chrome.tabs.executeScript({file: 'getyarn.js'});
    } else if (tab.url.indexOf("getyarn.io/yarn-find?text=") > -1) {
        chrome.tabs.executeScript({file: 'batch_getyarn.js'});
    } else if (tab.url.indexOf("https://vimeo.com/") > -1) {
        chrome.tabs.executeScript({file: 'savethevideo-com.js'});
    } else if (tab.url.indexOf("weibo.com") > -1) {
        chrome.tabs.executeScript({file: 'cookie.js'});
    } else {
        console.log("not support")
        alert("插件在不支持的页面（" + scope + "）运行")
    }
});
