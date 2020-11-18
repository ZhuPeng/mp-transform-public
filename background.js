chrome.browserAction.onClicked.addListener(function(tab) {
    var scope = "https://mp.weixin.qq.com/"
    console.log('browserAction Clicked: ' + tab.url);
    if (tab.url.startsWith(scope)) {
        chrome.tabs.executeScript({
            file: 'contentScript.js'
        });
    } if (tab.url.startsWith("https://www.instagram.com/")) {
        chrome.tabs.executeScript({
            file: 'instagram.js'
        });
    } else {
        alert("插件只在微信公众平台（" + scope + "）生效")
    }
});
