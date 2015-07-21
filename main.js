(function() {
	var containersMap = {
		'medium.com' : '.postArticle-content',
		'nytimes.com': '#story-body',
		default : [
			'#article',
			'#article-content',
			'#content'
		]
	}

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
		el.style.right = '0';
		el.style.top = proportion + 'vh';
		el.style.background = '#000'
		el.style.width = '12px';
		el.style.height = '3px';

		document.body.appendChild(el);
	}

	var finish = getProportionalPosition(
		getArticleContainerTerminal(
			getSelectorForHost()
		)
	);

	addFinishLine(finish);
})();