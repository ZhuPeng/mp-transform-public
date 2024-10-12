copyToClipboard = str => {
    console.log("copyToClipboard");
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('复制内容到剪贴板：\n' + str);
};

copyAndRedirect = str => {
    copyToClipboard(window.location.href)
    var target = str;
    alert('重定向跳转到 ' + target + ' 开始下载')
    window.open(target)
};

function urlContains(str) {
  return window.location.href.indexOf(str) >= 0
}

function loopSelectXpath(xpath, modifyFunc) {
  var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
  var node = result.iterateNext()
  var nodesToModify = [];
  while (node) {
      console.log('node:', node, 'children:', node.children);
      nodesToModify.push({node: node});
      node = result.iterateNext();
  }
  nodesToModify.forEach(function(item, index, array) {
      modifyFunc(index, item.node);
  });
}

// getTextWithSelector('#activity-name')
function getTextWithSelector(selector) {
  const sel = document.querySelector(selector)
   var t = ''
  if (sel) {
      t = sel.innerText
  }
  console.log(selector, ' => ', t)
  return t
}
// var p = /项目地址：https:\/\/github.com\/(.*)/gi; getTextByPattern(p)
function getTextByPattern(p) {
	console.log('match p:', p)
  	var m = document.body.innerText.match(p)
	if (!m || m == null || m.length == 0) {
		return ''
	}
	return m[0]
}

function getElementByXpath(dom, path) {
	console.log('getElementByXpath', dom, path)
  return document.evaluate(path, dom, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function click(dom, path) {
	console.log('click xpath:', path)
	var element = getElementByXpath(dom, path);
	console.log(element)
  element.click();
}

function input(dom, path, info) {
	console.log('input xpath:', path, info)
	var element = getElementByXpath(dom, path);
	console.log(element)
	element.setAttribute("value", info);
	element.value = info
}
