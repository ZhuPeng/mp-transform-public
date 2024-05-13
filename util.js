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
};

copyAndRedirect = str => {
    copyToClipboard(window.location.href)
    var target = str;
    alert('已复制视频地址到剪贴板，跳转到 ' + target + ' 开始下载')
    window.open(target)
};
