var elems = document.getElementsByClassName('video-match')
console.log("elems:", elems)

if (elems.length == 0) {
    alert('没有找到下载链接')
} else {
  for (var i=0; i<elems.length&&i<8; i++) {
      var ele = elems[i]
      var src = ele.currentSrc.replace('_thumb', '')
      console.log('src:', src)
      alert("下载视频链接：" + src)
      window.open(src)
  }
}
