window.addEventListener('load', function() {
	  if (window.location.href.indexOf('autoclose') > -1) {
			crawelInfo()
		}
});

function getTextWithSelector(selector) {
    const sel = document.querySelector(selector)
   	var t = ''
    if (sel) {
			  t = sel.innerText
    }
	  console.log(selector, ' => ', t)
	  return t
}

function getTextByPattern(p) {
	  console.log('match p:', p)
  	var m = document.body.innerText.match(p)
	  if (!m || m == null || m.length == 0) {
			return ''
		}
	  return m[0]
}

function crawelInfo() {
	  console.log("获取json信息")
	  var elem = {"website": "wechat", "type": "text"}
	  elem['title'] = getTextWithSelector('#activity-name')
	 	var p = /项目地址：https:\/\/github.com\/(.*)/gi;
	  elem['repo'] = (getTextByPattern(p).split('https://github.com/')[1] || '').split(' ')[0] || ''
	  if (elem['repo'].length === 0) {
			elem['repo'] = getTextByPattern(/链接：https:\/\/github.com\/(.*)/gi).split('https://github.com/')[1].split(' ')[0]
		}
	  elem['url'] = window.location.href.replace("&autoclose", '')
	  console.log(elem)
	  // alert(JSON.stringify(elem))

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
