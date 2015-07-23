function FinishLine() {
	this.selector = '';
	this.remoteURL = 'https://raw.githubusercontent.com/kevinzweerink/finishline/master/map.json';
	this.clean();

	// Init
	this.getMap();
}

FinishLine.prototype.clean = function () {
	var preexisting = document.querySelector('.finish-line');

	if (preexisting) {
		preexisting.parentNode.removeChild(preexisting);
	}
}

FinishLine.prototype.getMap = function () {
	var connection = navigator.onLine,
		localVersion = 'finish-line-map-data';

	if (connection) {
		var fl = this,
			req = new XMLHttpRequest();

		try {
		
			req.open('GET', this.remoteURL, true);

			req.onload = function () {
				if (req.status >= 200 && req.status < 400) {
					console.log('Successfully retrieved remote map')
					fl.map = JSON.parse(req.responseText);
				} else {
					console.log('Connection error, falling back to default data')
					fl.map = map;
				}

				fl.start();
			}

			req.onerror = function () {
				console.log('Could not connect, falling back to default data');

				fl.map = map;
				fl.start();
			}

			req.send();
		}

		catch(err) {
			console.log("CSP restriction prevented remote map access, falling back now")
			fl.map = map;
			fl.start();
		}
	} else {
		console.log('No internet connection, falling back to default data')
		this.map = map;
		this.start();
	}
}

FinishLine.prototype.findSelector = function () {
	var host = window.location.hostname,
		recognized = false,
		fl = this;

	for (var key in this.map) {
		if (host.indexOf(key) > -1) {
			this.selector = this.map[key];
			recognized = true;
			break;
		}
	}

	if (recognized) {
		return;
	} else {
		this.map.default.some(function(selector) {
			fl.selector = document.querySelector(selector);
			return fl.selector !== null;
		});
	}
}

FinishLine.prototype.findArticle = function () {
	this.article = document.querySelector(this.selector);
}

FinishLine.prototype.measure = function () {
	var articleHeight = this.article.clientHeight,
		documentHeight = document.body.clientHeight,
		articleOffset = this.article.offsetTop;

	this.proportion = (articleHeight + articleOffset) / documentHeight;
}

FinishLine.prototype.flash = function () {
	var el = this.el;

	el.style.opacity = '1';
	window.setTimeout(function() {
		el.style.opacity = '0.3';
	}, 500);
}

FinishLine.prototype.animateIn = function () {
	var el = this.el;
	this.flash();
	el.style.webkitTransform = this.transformString(this.proportion);
	el.style.transform = this.transformString(this.proportion);
}

FinishLine.prototype.transformString = function (proportion) {
	return 'translate(0,' + (proportion * 100) + 'vh)';
}

FinishLine.prototype.update = function () {
	var cachedProportion = this.proportion;
	this.measure();

	// If the page height has changed resulting in an end position change greater than 2%, move the dot
	if (cachedProportion !== this.proportion && Math.abs(cachedProportion - this.proportion) > .02) {
		this.el.style.webkitTransform = this.transformString(this.proportion);
		this.el.style.transform = this.transformString(this.proportion);
		this.flash();
	}
}

FinishLine.prototype.placeFinish = function () {
	var el = document.createElement('div');
		el.classList.add('finish-line');
		el.style.height = '6px';
		el.style.width = '6px';
		el.style.borderRadius = '3px';
		el.style.backgroundColor = '#000';
		el.style.position = 'fixed';
		el.style.right = '3px';
		el.style.top = '0';
		el.style.webkitTransform = this.transformString(-0.1);
		el.style.transform = this.transformString(-0.1);
		el.style.opacity = '0.3';
		el.style.webkitTransition = 'transform .5s cubic-bezier(.42,-0.11,.13,1.29) .15s, opacity .15s ease';
		el.style.transition = 'transform .5s cubic-bezier(.42,-0.11,.13,1.29) .15s, opacity .15s ease';

	document.body.appendChild(el);

	this.el = el;
	window.setTimeout(this.animateIn.bind(this), 10);
}

FinishLine.prototype.listen = function () {
	window.setInterval(this.update.bind(this), 400);
}

FinishLine.prototype.start = function () {
	this.findSelector();
	this.findArticle();
	this.measure();
	this.placeFinish();
	this.listen();
}

var finishLine = new FinishLine();