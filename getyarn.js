var elems = document.getElementsByClassName('realsource')
console.log("elems:", elems)

if (elems.length != 1) {
    alert('没有找到下载链接')
} else {
    var ele = elems[0]
    console.log('attributes:', ele.attributes)
    var src = ele.attributes['src'].value
    console.log('src:', src)
    alert("下载视频链接：" + src)
    window.open(src)
}
