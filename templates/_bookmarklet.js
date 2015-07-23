javascript:%28function%28%29%7B%0A/*%20js_only%20*/%0Avar%20map%20%3D%20%0A/*%20end_js_only%20*/%0A%7B%0A%09%22nytimes%22%20%3A%20%22%23story%22%2C%0A%09%22cnn%22%20%3A%20%22%23body-text%22%2C%0A%09%22huffingtonpost%22%20%3A%20%22.component.entry-component%22%2C%0A%09%22medium%22%20%3A%20%22.postArticle-content%22%2C%0A%09%22slate%22%20%3A%20%22.main%20.content%22%2C%0A%09%22washingtonpost%22%20%3A%20%22%23article-body%22%2C%0A%09%22propublica%22%20%3A%20%22article%20.bodytext%22%2C%0A%09%22npr%22%20%3A%20%22%23storytext%22%2C%0A%09%22newyorker%22%20%3A%20%22%23articleBody%22%2C%0A%09%22theatlantic%22%20%3A%20%22%23article%22%2C%0A%09%22nymag%22%20%3A%20%22.story%22%2C%0A%09%22buzzfeed%22%20%3A%20%22%23buzz_sub_buzz%22%2C%0A%09%22bostonglobe%22%20%3A%20%22.article-text%22%2C%0A%09%22latimes%22%20%3A%20%22trb_mainContent%22%2C%0A%09%22theverge%22%20%3A%20%22m-entry__content%22%2C%0A%09%22theguardian%22%20%3A%20%22content__main%22%2C%09%0A%0A%09%22default%22%20%3A%20%5B%0A%09%09%22%23article%22%2C%0A%09%09%22%23story%22%2C%0A%09%09%22%23articleBody%22%2C%0A%09%09%22%23storyBody%22%2C%0A%09%09%22.story%22%2C%0A%09%09%22.article%22%2C%0A%09%09%22.body%22%0A%09%5D%0A%7D%0Afunction%20FinishLine%28%29%20%7B%0A%09this.selector%20%3D%20%27%27%3B%0A%09this.remoteURL%20%3D%20%27https%3A//raw.githubusercontent.com/kevinzweerink/finishline/master/map.json%27%3B%0A%09this.clean%28%29%3B%0A%0A%09//%20Init%0A%09this.getMap%28%29%3B%0A%7D%0A%0AFinishLine.prototype.clean%20%3D%20function%20%28%29%20%7B%0A%09var%20preexisting%20%3D%20document.querySelector%28%27.finish-line%27%29%3B%0A%0A%09if%20%28preexisting%29%20%7B%0A%09%09preexisting.parentNode.removeChild%28preexisting%29%3B%0A%09%7D%0A%7D%0A%0AFinishLine.prototype.getMap%20%3D%20function%20%28%29%20%7B%0A%09var%20connection%20%3D%20navigator.onLine%2C%0A%09%09localVersion%20%3D%20%27finish-line-map-data%27%3B%0A%0A%09if%20%28connection%29%20%7B%0A%09%09var%20fl%20%3D%20this%2C%0A%09%09%09req%20%3D%20new%20XMLHttpRequest%28%29%3B%0A%0A%09%09try%20%7B%09%0A%09%09%09req.open%28%27GET%27%2C%20this.remoteURL%2C%20true%29%3B%0A%0A%09%09%09req.onload%20%3D%20function%20%28%29%20%7B%0A%09%09%09%09if%20%28req.status%20%3E%3D%20200%20%26%26%20req.status%20%3C%20400%29%20%7B%0A%09%09%09%09%09console.log%28%27Successfully%20retrieved%20remote%20map%27%29%0A%09%09%09%09%09fl.map%20%3D%20JSON.parse%28req.responseText%29%3B%0A%09%09%09%09%7D%20else%20%7B%0A%09%09%09%09%09console.log%28%27Connection%20error%2C%20falling%20back%20to%20default%20data%27%29%0A%09%09%09%09%09fl.map%20%3D%20map%3B%0A%09%09%09%09%7D%0A%0A%09%09%09%09fl.start%28%29%3B%0A%09%09%09%7D%0A%0A%09%09%09req.onerror%20%3D%20function%20%28%29%20%7B%0A%09%09%09%09console.log%28%27Could%20not%20connect%2C%20falling%20back%20to%20default%20data%27%29%3B%0A%0A%09%09%09%09fl.map%20%3D%20map%3B%0A%09%09%09%09fl.start%28%29%3B%0A%09%09%09%7D%0A%0A%09%09%09req.send%28%29%3B%0A%09%09%7D%0A%0A%09%09catch%28err%29%20%7B%0A%09%09%09console.log%28%22CSP%20restriction%20prevented%20remote%20map%20access%2C%20falling%20back%20now%22%29%0A%09%09%09fl.map%20%3D%20map%3B%0A%09%09%09fl.start%28%29%3B%0A%09%09%7D%0A%09%7D%20else%20%7B%0A%09%09console.log%28%27No%20internet%20connection%2C%20falling%20back%20to%20default%20data%27%29%0A%09%09this.map%20%3D%20map%3B%0A%09%09this.start%28%29%3B%0A%09%7D%0A%7D%0A%0AFinishLine.prototype.findSelector%20%3D%20function%20%28%29%20%7B%0A%09var%20host%20%3D%20window.location.hostname%2C%0A%09%09recognized%20%3D%20false%2C%0A%09%09fl%20%3D%20this%3B%0A%0A%09for%20%28var%20key%20in%20this.map%29%20%7B%0A%09%09if%20%28host.indexOf%28key%29%20%3E%20-1%29%20%7B%0A%09%09%09this.selector%20%3D%20this.map%5Bkey%5D%3B%0A%09%09%09recognized%20%3D%20true%3B%0A%09%09%09break%3B%0A%09%09%7D%0A%09%7D%0A%0A%09if%20%28recognized%29%20%7B%0A%09%09return%3B%0A%09%7D%20else%20%7B%0A%09%09this.map.default.some%28function%28selector%29%20%7B%0A%09%09%09fl.selector%20%3D%20document.querySelector%28selector%29%3B%0A%09%09%09return%20fl.selector%20%21%3D%3D%20null%3B%0A%09%09%7D%29%3B%0A%09%7D%0A%7D%0A%0AFinishLine.prototype.findArticle%20%3D%20function%20%28%29%20%7B%0A%09this.article%20%3D%20document.querySelector%28this.selector%29%3B%0A%7D%0A%0AFinishLine.prototype.measure%20%3D%20function%20%28%29%20%7B%0A%09var%20articleHeight%20%3D%20this.article.clientHeight%2C%0A%09%09documentHeight%20%3D%20document.body.clientHeight%2C%0A%09%09articleOffset%20%3D%20this.article.offsetTop%3B%0A%0A%09this.proportion%20%3D%20%28articleHeight%20+%20articleOffset%29%20/%20documentHeight%3B%0A%7D%0A%0AFinishLine.prototype.flash%20%3D%20function%20%28%29%20%7B%0A%09var%20el%20%3D%20this.el%3B%0A%0A%09el.style.opacity%20%3D%20%271%27%3B%0A%09window.setTimeout%28function%28%29%20%7B%0A%09%09el.style.opacity%20%3D%20%270.3%27%3B%0A%09%7D%2C%20500%29%3B%0A%7D%0A%0AFinishLine.prototype.animateIn%20%3D%20function%20%28%29%20%7B%0A%09var%20el%20%3D%20this.el%3B%0A%09this.flash%28%29%3B%0A%09el.style.webkitTransform%20%3D%20this.transformString%28this.proportion%29%3B%0A%09el.style.transform%20%3D%20this.transformString%28this.proportion%29%3B%0A%7D%0A%0AFinishLine.prototype.transformString%20%3D%20function%20%28proportion%29%20%7B%0A%09return%20%27translate%280%2C%27%20+%20%28proportion%20*%20100%29%20+%20%27vh%29%27%3B%0A%7D%0A%0AFinishLine.prototype.update%20%3D%20function%20%28%29%20%7B%0A%09var%20cachedProportion%20%3D%20this.proportion%3B%0A%09this.measure%28%29%3B%0A%0A%09//%20If%20the%20page%20height%20has%20changed%20resulting%20in%20an%20end%20position%20change%20greater%20than%202%25%2C%20move%20the%20dot%0A%09if%20%28cachedProportion%20%21%3D%3D%20this.proportion%20%26%26%20Math.abs%28cachedProportion%20-%20this.proportion%29%20%3E%20.02%29%20%7B%0A%09%09this.el.style.webkitTransform%20%3D%20this.transformString%28this.proportion%29%3B%0A%09%09this.el.style.transform%20%3D%20this.transformString%28this.proportion%29%3B%0A%09%09this.flash%28%29%3B%0A%09%7D%0A%7D%0A%0AFinishLine.prototype.placeFinish%20%3D%20function%20%28%29%20%7B%0A%09var%20el%20%3D%20document.createElement%28%27div%27%29%3B%0A%09%09el.classList.add%28%27finish-line%27%29%3B%0A%09%09el.style.height%20%3D%20%276px%27%3B%0A%09%09el.style.width%20%3D%20%276px%27%3B%0A%09%09el.style.borderRadius%20%3D%20%273px%27%3B%0A%09%09el.style.backgroundColor%20%3D%20%27%23000%27%3B%0A%09%09el.style.position%20%3D%20%27fixed%27%3B%0A%09%09el.style.right%20%3D%20%273px%27%3B%0A%09%09el.style.top%20%3D%20%270%27%3B%0A%09%09el.style.webkitTransform%20%3D%20this.transformString%28-0.1%29%3B%0A%09%09el.style.transform%20%3D%20this.transformString%28-0.1%29%3B%0A%09%09el.style.opacity%20%3D%20%270.3%27%3B%0A%09%09el.style.webkitTransition%20%3D%20%27transform%20.5s%20cubic-bezier%28.42%2C-0.11%2C.13%2C1.29%29%20.15s%2C%20opacity%20.15s%20ease%27%3B%0A%09%09el.style.transition%20%3D%20%27transform%20.5s%20cubic-bezier%28.42%2C-0.11%2C.13%2C1.29%29%20.15s%2C%20opacity%20.15s%20ease%27%3B%0A%0A%09document.body.appendChild%28el%29%3B%0A%0A%09this.el%20%3D%20el%3B%0A%09window.setTimeout%28this.animateIn.bind%28this%29%2C%2010%29%3B%0A%7D%0A%0AFinishLine.prototype.listen%20%3D%20function%20%28%29%20%7B%0A%09window.setInterval%28this.update.bind%28this%29%2C%20400%29%3B%0A%7D%0A%0AFinishLine.prototype.start%20%3D%20function%20%28%29%20%7B%0A%09this.findSelector%28%29%3B%0A%09this.findArticle%28%29%3B%0A%09this.measure%28%29%3B%0A%09this.placeFinish%28%29%3B%0A%09this.listen%28%29%3B%0A%7D%0A%0Avar%20finishLine%20%3D%20new%20FinishLine%28%29%3B%0A%7D%29%28%29%3B