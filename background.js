chrome.browserAction.onClicked.addListener(function(tab) {
    var scope = "https://mp.weixin.qq.com/"
    console.log('browserAction Clicked: ' + tab.url);
    if (tab.url.startsWith(scope)) {
        chrome.tabs.executeScript({file: 'contentScript.js'});
    } else if (tab.url.startsWith("https://www.instagram.com/tv/")) {
        chrome.tabs.executeScript({file: 'instagram.js'});
    } else if (tab.url.indexOf("facebook.com") > -1 || tab.url.indexOf("youtube.com") > -1 || tab.url.indexOf('fb.watch') > -1) {
        chrome.tabs.executeScript({file: 'video.js'});
    } else if (tab.url.indexOf("en.savefrom.net")) {
        chrome.tabs.executeScript({file: 'savefrom.js'});
    } else {
        alert("插件在不支持的页面（" + scope + "）运行")
    }
});
