window.addEventListener('load', function() {
	  if (window.location.href.indexOf('autoclose') > -1) {
			crawelInfo()
		} 
});

var info = parseInfo()
copyToClipboard(info['title'] + '\n\n' + info['intro'] + '\n\n开源项目地址：https://github.com/' + info['repo'] + '\n\n更多介绍：' + info['url'])

function parseInfo() {
	console.log("获取json信息")
    var elem = {"website": "wechat", "type": "text"}
	elem['title'] = getTextWithSelector('#activity-name')
	var p = /项目地址：https:\/\/github.com\/(.*)/gi;
	elem['repo'] = (getTextByPattern(p).split('https://github.com/')[1] || '').split(' ')[0] || ''
	if (elem['repo'].length === 0) {
		elem['repo'] = getTextByPattern(/链接：https:\/\/github.com\/(.*)/gi).split('https://github.com/')[1].split(' ')[0]
	}
	elem['url'] = window.location.href.replace("?autoclose", '').replace('&autoclose', '')
	var intro = getElementByXpath(document, '//h4[2]/following-sibling::p[1]')
	if (intro == null) {
	    intro = getElementByXpath(document, '//h6[2]/following-sibling::p[1]')
	}
	elem['intro'] = intro.innerText
	console.log(elem)
	// alert(JSON.stringify(elem))
	return elem
}

function crawelInfo() {
    var elem = parseInfo()
	  fetch('http://127.0.0.1:8082/api/add_doc', {
             method: 'POST',
			 mode: 'no-cors',
             headers: {
                 'Accept': 'application/json',
							   'Access-Control-Allow-Origin': '*',
   							 'Access-Control-Allow-Credentials': false,
						   	 'mode': 'no-cors',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(elem)
         })
             .then(response => response)
             .catch(error => console.log('Error:', error));
	  
	  setTimeout(function() {
	    chrome.extension.sendMessage({greeting: "close_tab"});
		}, 500);
}
