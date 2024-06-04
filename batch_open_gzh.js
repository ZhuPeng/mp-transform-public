var elems = document.querySelectorAll('#app > div > div.publish_content.publish_record_history > div:nth-child(1) > div:nth-child(1) > div')
console.log("elems:", elems)

if (elems.length == 0) {
    alert('没有找到下载链接')
} else {
  for (var i=0; i<elems.length&&i<8; i++) {
      var ele = elems[i]
      var src = ele.querySelector('a.weui-desktop-mass-appmsg__title').href
      console.log('src:', src)
      window.open(src + '&autoclose')
		  setTimeout(function(){ 
				console.log('sleep 100ms'); }, 500);
  }
}
