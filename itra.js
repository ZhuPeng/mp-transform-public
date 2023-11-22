window.addEventListener('load', function() {
    showHiddenInfo()
});

function showHiddenInfo() {
    var xpath = "//table/tbody/tr"; // 选择所有 <p> 元素下的 <div> 元素
    var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    var node = result.iterateNext();

    var modify_nodes = []
    var modify_text = []

    while (node) {
        // console.log(node); // 处理或输出节点
        var itra = document.evaluate("td[@class='runner-results-course'][1]", node, null, XPathResult.ANY_TYPE, null).iterateNext();
        var jifen = document.evaluate("td[@class='runner-results-course'][2]", node, null, XPathResult.ANY_TYPE, null).iterateNext();
        var index = document.evaluate("td[@class='runner-results-course'][3]", node, null, XPathResult.ANY_TYPE, null).iterateNext();
        // console.log(itra)
        // console.log(jifen)
        // console.log(index)

        var modify = document.evaluate("td[@class='runner-results-general'][5]", node, null, XPathResult.ANY_TYPE, null).iterateNext();
        modify_nodes.push(modify)
        modify_text.push(itra.innerHTML.trim() + "/ " + jifen.innerText.trim() + " / " + index.innerText.trim())
        node = result.iterateNext();
    }

    for (var i = 0; i < modify_nodes.length; i++) {
        modify_nodes[i].innerHTML = modify_text[i]
    }
}