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
    alert('已复制视频地址到剪贴板，跳转到 ' + target + ' 开始下载')
    window.open(target)
};

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
