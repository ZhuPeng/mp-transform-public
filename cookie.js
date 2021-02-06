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

alert("已复制 Cookie：" + document.cookie);

copyToClipboard(document.cookie)
