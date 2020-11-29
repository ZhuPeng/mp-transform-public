// var scripts = document.getElementsByTagName('script')
// console.log("scripts:", scripts)
// 
// for (i=0; i<scripts.length; i++) {
//     console.log("script:", scripts[i])
//     var html = scripts[i].innerHTML
// 
//     var tag = '"url":"'
//     var re = /"url":"([^"]+?.mp4[^"]+?)"/g;
//     var myArray = html.match(re);
//     if (!myArray) {continue}
//     console.log(myArray);
//     var str = myArray[0]
//     var url = str.slice(tag.length, str.length-1).replace(/\\u0026/g, "&")
//     alert("下载视频链接：" + url)
//     window.open(url)
// }
//         
// function alertText(t) {
//     alert(t)
//     alert(t.slice(t.length-10, t.length))
// }

window.open("https://savefrom.net/" + window.location.href)
