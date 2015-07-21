(function() {
	var req = new XMLHttpRequest(),
			containersMap,
			fl;

	function getArticleContainerTerminal(selector) {
		// If no selector passed, loop through default selectors
		if (!selector) {
			for (var i = 0; i < containersMap.default.length; ++i) {
				var h = getArticleContainerHeight(containersMap.default[i]);
				if (h !== undefined) {
					return h;
				}
			}
		}

		var container = document.querySelector(selector);
		return container.clientHeight + container.offsetTop;
	}

	function getSelectorForHost() {
		for (var key in containersMap) {
			if (window.location.hostname.indexOf(key) > -1) {
				return containersMap[key];
			}
		}

		return false;
	}

	function getProportionalPosition(point) {
		return (point / document.body.clientHeight) * 100;
	}

	function addFinishLine(proportion) {
		var el = document.createElement('div');
		el.style.position = 'fixed';
		el.style.right = '3px';
		el.style.top = proportion + 'vh';
		el.style.background = '#000'
		el.style.width = '6px';
		el.style.height = '6px';
		el.style.borderRadius = '4px';
		el.style.zIndex = 10000;
		el.style.transition = 'top .15s ease';
		el.style.webkitTransition = 'top .15s ease';

		document.body.appendChild(el);

		return el;
	}

	function getFinish() {
		return getProportionalPosition(
			getArticleContainerTerminal(
				getSelectorForHost()
			)
		);
	}

	function updateFinishLine() {
		var finish = getFinish();

		if (!fl) {
			fl = addFinishLine(finish);
		}
		
		if (fl) {
			fl.style.top = finish + 'vh';
		}

		console.log(fl);

		return fl;
	}

	req.open('GET', 'https://raw.githubusercontent.com/kevinzweerink/finishline/master/map.js', true);

	req.onload = function() {
		console.log(req.responseText);
		containersMap = JSON.parse(req.responseText);
		console.log(containersMap);
		fl = updateFinishLine();
		window.setInterval(updateFinishLine, 700);
	}

	req.onerror = function() {
		console.log('failure');
	}

	req.send();
})();