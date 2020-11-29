var link = document.getElementsByClassName('def-btn-box')
console.log(link)

for (i=0; i<link.length; i++) {
    for (j=0; j<link[i].children.length; j++) {
        var url = link[i].children[j].href
        console.log('open:', url)
        alert("打开链接：" + url)
        // copy link 不支持
        // window.clipboardData.setData('text', "你的内容");
        window.open(url)
    }
}
