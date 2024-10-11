window.addEventListener('load', function() {
    if (window.location.href.indexOf('itra') > -1) {
        showHiddenInfo()
    } else if (window.location.href.indexOf('itra.run/api/RunnerSpace/GetRunnerSpace') > -1 && document.body.innerText.indexOf('') > -1) {
			  var url = '"https://itra.run/api/Race/GetRaceResultsData?runnerId=2051623&pageNumber=1&pageSize=10&raceYear=&categoryId="'
			  requestRaceResults(url);
		}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'modifyData') {
      console.log('Received requests details', request.details);
			requestRaceResults(request.details.url);
    }
});

function requestRaceResults(url) {
    if (url.indexOf('?') > -1) {
        url = url + '&__not_listen__'
    } else {
        url = url + '?__not_listen__'
    }
    fetch(url)
       .then(response => response.json())
       .then(data => {
           console.log('fetch data:', data);
				   var dictionary = Object.assign({}, ...data['raceResults'].map((x) => ({[x.date+x.name.replace('  ', ' ').trim()]: x})));
           showScore(dictionary);
       });
}

function loopSelectXpath(xpath, modifyFunc) {
    var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    var node = result.iterateNext()
    var nodesToModify = [];
    while (node) {
        console.log('node:', node, 'children:', node.children);
        nodesToModify.push({node: node});
        node = result.iterateNext();
    }
    nodesToModify.forEach(function(item, index, array) {
        modifyFunc(index, item.node);
    });
}

function showScore(raceResults) {
    console.log('showScore:', raceResults);
    // loopSelectXpath("//div[contains(@class, 'table-info text-700 race-score')]/div[@class='d-flex locked']", function(index, node) {
    loopSelectXpath("//div[@class='row table-body-row']", function(index, node) {
			  var ch = node.children[8].children[1].children[0];
			  if (!ch.classList.contains('locked')) {
					  return;
        }
			  var date = node.children[0].innerText.trim();
			  var race = node.children[2].children[0].children[0].innerText.trim();
				var score = 0;
			  if (raceResults[date+race]) { score = raceResults[date+race]['score']; }
				console.log('parsed:', date, race, score);

        ch.classList.remove('locked');
			  ch.innerText = score;
    });
}

const pTags = document.querySelectorAll('p');
const button = Array.from(pTags).find(p => p.textContent.trim() === 'Time Charts');
if (button) {
    button.addEventListener('click', function() {
        console.log('Time Charts clicked');
        showInter("//div[@role='row']//div[5]");
        showInter("//div[@role='row']//div[6]");
    });
}

function showInter(xpath){
    console.log('showInterGain');
    var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    var node = result.iterateNext()
    var lastGain = 0;
    var nodesToModify = [];
    while (node) {
        console.log('node:', node);
        var culGain = node.childNodes[0].innerText;
        console.log('culGain:', culGain);
        if (!Number.isInteger(Number(culGain))) {
            node = result.iterateNext();
            continue;
        }
        var interGain = Number(culGain) - lastGain;
        console.log('interGain:', interGain);
        lastGain = culGain;
        nodesToModify.push({node: node, interGain: interGain, culGain: culGain});
        node = result.iterateNext();
    }
    nodesToModify.forEach(function(item, index, array) {
        if (index === array.length - 1) {
            item.node.childNodes[0].innerText = item.interGain + ' (total:' + item.culGain+')';
        } else {
            item.node.childNodes[0].innerText = item.interGain;
        }
    });
}

function showHiddenInfo() {
    console.log('showHiddenInfo');
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
