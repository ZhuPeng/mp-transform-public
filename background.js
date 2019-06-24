chrome.browserAction.onClicked.addListener(function(tab) {
    var scope = "https://mp.weixin.qq.com/"
    if (tab.url.startsWith(scope)) {
        console.log('browserAction Clicked: ' + tab.url);
        chrome.tabs.executeScript({
            file: 'contentScript.js'
        });
    } else {
        alert("插件只在微信公众平台（" + scope + "）生效")
    }
});
