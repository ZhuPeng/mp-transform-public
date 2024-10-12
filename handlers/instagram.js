var scripts = document.getElementsByTagName('script')
console.log("scripts:", scripts)

for (i=0; i<scripts.length; i++) {
    console.log("script:", scripts[i])
    var html = scripts[i].innerHTML
    var tag = "window.__additionalDataLoaded("
    if (html.indexOf(tag) == -1) {
        continue
    }

    var tag = 'video_url":"'
    var re = /video_url":"([^"]+?)"/g;
    var myArray = html.match(re);
    if (!myArray) {continue}
    console.log(myArray);
    var str = myArray[0]
    var url = str.slice(tag.length, str.length-1).replace(/\\u0026/g, "&")
    var domain = (new URL(url)).hostname;
    console.log('domain url', domain)
    if (domain.indexOf('scontent-frx5-1.cdninstagram.com') > -1) {
        url = url.replace(domain, 'scontent.cdninstagram.com')
    }
    alert("下载视频链接：" + url)
    window.open(url)
}
        
function alertText(t) {
    alert(t)
    alert(t.slice(t.length-10, t.length))
}
