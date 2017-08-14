//Hooked82 Player News Pop Up JS
//version 1.0.5

jQuery.fn.center = function (parent, verticalOnly) {
	if (parent) {
		parent = this.parent();
	} else {
		parent = window;
	}

	if (!verticalOnly) {
		this.css({
			"position": "absolute",
			"top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
			"left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
		});
	} else {
		this.css({
			"position": "absolute",
			"top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px")
		});
	}
	return this;
}

var _playerPopupIds = new Array();

$(document).keydown(function (e) {
	// ESCAPE key pressed
	if (e.keyCode == 27) {
		PlayerPopup.hidePopup();
	}
});

var PlayerPopup = function () {
	var _popupOpen = false;
	var _settings = {
		width: '500px',
		height: '500px',
		playerClickShowsPopup: false,
		openPopupLinksInNewWindow: true,
		dismissOnExternalClick: true,
		showOverlay: true,
		useDetailedNews: false,
		detailedNewsDays: 7,
		fadePopup: false,
		fadeTime: 700,
		sections: [
            { id: 'body_options_02' },
            { id: 'body_options_05' },
            { id: 'body_options_06' },
            { id: 'body_options_07' },
            { id: 'body_options_08' },
            { id: 'body_options_17' },
            { id: 'body_options_117' },
            { id: 'body_options_133' },
            { id: 'body_options_236' },
            { id: 'body_home' },
            { id: 'body_top' },
            { id: 'body_player_search' }
		],
		newNewsIcon: {
			display: true,
			icon: 'http://nitrografixx.com/player_news/img/new_news.gif',
			text: 'NEW Update'
		},
		oldNewsIcon: {
			display: true,
			icon: 'http://nitrografixx.com/player_news/img/recent_news.gif',
			text: 'Recent News'
		},
		noNewsIcon: {
			display: true,
			icon: 'http://nitrografixx.com/player_news/img/no_news.gif',
			text: 'No News'
		}
	};

	function getNewsIconType(profile) {
		var newsIcon;

		if (profile.news.article === undefined) {
			newsIcon = _settings.noNewsIcon;
		} else {
			var article;
			if (jQuery.isArray(profile.news.article))
				article = profile.news.article[0];
			else
				article = profile.news.article;

			if (article.published.match('minutes$') || article.published.match('hours$') || article.published.match('day$')) {
				newsIcon = _settings.newNewsIcon;
			} else {
				newsIcon = _settings.oldNewsIcon;
			}
		}

		return newsIcon;
	}

	renderIcons = function (options) {
		if (options !== undefined)
			$.extend(_settings, options);

		$(window).resize(function () {
			if (_popupOpen)
				setPopupPosition();
		});

		$(window).scroll(function () {
			if (_popupOpen)
				setPopupPosition();
		});

		if (shouldAddPopupIcon()) {
			var bodyId = $('body').attr('id');

			if (bodyId === 'body_options_02' || bodyId === 'body_home' || bodyId === 'body_options_05' || bodyId === 'body_options_133'|| bodyId === 'body_options_247') {
				$.each($('a[class^="position_"], td.cbsPlayerName a ,td.playertd a'), function (index, value) {
					var id = getPlayerIdFromHref($(this).attr('href'));
					_playerPopupIds.push(id);
				});

				_playerPopupIds = getUniqueArray(_playerPopupIds);

				$.ajax({
					type: 'GET',
					url: getPlayerProfileApiUrl()
				}).done(function (data) {
					
					$.each($('a[class^="position_"], td.cbsPlayerName a, td.playertd a'), function (index, value) {
						try 
							{
								var isNewsIconPresent = false;
								// .hasClass('playerPopupNewsIcon')
								$(this).nextAll('a').each(function()
								{

										if($(this).hasClass('playerPopupNewsIcon'))
										isNewsIconPresent = true;
										
										return false;

								});
								if(!isNewsIconPresent)	
								{								
										var id = getPlayerIdFromHref($(this).attr('href'));

										var profile = $.grep(data.playerProfiles.playerProfile, function (p) {
											return p.id === id;
										})[0];

										var newsIcon = getNewsIconType(profile);
										var playerName = $(this).text();
										var link = getPlayerPopupLink(id, playerName, newsIcon);

									//	$(this).parent().append(link);
										link.insertAfter($(this));
										if (_settings.playerClickShowsPopup) 
										{
											$(this).unbind().click(function () 
											{
												renderPopup(id, playerName);
												return false;
											});
										}
									}
							} 
						catch (err) { }
					});
				});
			} else {
				$.each($('td.player'), function (index, value) {
					var id = getPlayerIdFromHref($(this).children().first().attr('href'));
					_playerPopupIds.push(id);
				});

				_playerPopupIds = getUniqueArray(_playerPopupIds);

				$.ajax({
					type: 'GET',
					url: getPlayerProfileApiUrl()
				}).done(function (data) {
					$.each($('td.player'), function (index, value) {
						try {
							var id = getPlayerIdFromHref($(this).children().first().attr('href'));

							var profile = $.grep(data.playerProfiles.playerProfile, function (p) {
								return p.id === id;
							})[0];

							var newsIcon = getNewsIconType(profile);
							var playerName = $(this).children().first().text();
							var link = getPlayerPopupLink(id, playerName, newsIcon);

							$(this).append(link);

							if (_settings.playerClickShowsPopup) {
								$(this).unbind().click(function () {
									renderPopup(id, playerName);
									return false;
								});
							}
						} catch (err) { }
					});
				});
			}
		}
	}

	function getPlayerProfileApiUrl() {
		return location.protocol + '//' + window.location.hostname + '/' + year + '/export?TYPE=playerProfile&L=' + league_id + '&JSON=1&P=' + _playerPopupIds.join(',');
	}

	function getPlayerDetailsUrl(playerId) {
		return baseURLDynamic + '/' + year + '/player?L=' + league_id + '&P=' + playerId;
	}

	function getDetailedNewsUrl(playerId) {
		return baseURLDynamic + '/' + year + '/news_articles?L=' + league_id + '&PLAYERS=' + playerId + '&DAYS=' + _settings.detailedNewsDays;
	}

	function hidePopupLoading() {
		if (_settings.fadePopup)
			$('#playerPopupLoading').fadeOut();
		else
			$('#playerPopupLoading').css('display', 'none');
	}

	function showPopupLoading() {
		$('#playerPopupLoading').css('display', 'block');
	}

	function getUniqueArray(a) {
		return a.reduce(function (p, c) {
			if (p.indexOf(c) < 0)
				p.push(c);
			return p;
		}, []);
	}

	function shouldAddPopupIcon() {
		var bodyId = $('body').attr('id');

		var bodyIds = $.grep(_settings.sections, function (e) {
			return e.id.match(bodyId);
		});

		if (bodyIds.length > 0)
			return true;

		return false;
	}

	function getPlayerIdFromHref(href) {
		return href.substring(href.indexOf('P=') + 2, href.length);
	}

	function getPlayerPopupLink(id, playerName, icon) {
		if (icon.display) {
			var link = $('<a>', { href: '#', title: icon.text ,class: 'playerPopupNewsIcon'}).html(
                    $('<img>', {
                    	src: icon.icon,
                    	alt: icon.text,
                    	border: '0',
                    	class: 'playerPopupNewsIcon'
                    })
                ).unbind().click(function () {
                	renderPopup(id, playerName);
                	return false;
                });

			return link;
		} else {
			return null;
		}
	}

	function getAbsoluteUrl(relativeHref) {
		return baseURLDynamic + '/' + year + '/' + relativeHref;
	}

	function bindPopupClose() {
		$('#playerPopupClose ').unbind().click(function () {
			hidePopup();
		});

		if (_settings.dismissOnExternalClick) {
			var external;
			if (_settings.showOverlay) {
				external = $('#playerPopupOverlay');
			} else {
				external = $('body');
			}

			$(external).unbind().click(function () {
				hidePopup();
			});
		}
	}

	function setPopupSize() {
		$('.newsContent div, #playerPopupContent, #playerPopupLoading').css('width', _settings.width);
		$('.newsContent div, #playerPopupContent, #playerPopupLoading').css('height', _settings.height);

		$('#playerPopupLoading p').css({
			'top': $(this).parent().height() / 2
		});
		$('#playerPopupLoading span').css({
			'width': _settings.width
		});

		//Left Popup margins so it stays centered when zoomed on mobile
		var wrapperHeight = $('#playerPopupWrapper').height();
		var wrapperWidth = $('#playerPopupWrapper').width();
		$('#playerPopupWrapper').css({
			'margin-left': '-' + wrapperWidth / 2 + 'px',
			'margin-top': '-' + wrapperHeight / 2 + 'px'
		});
	}

	function setPopupTitle(playerName) {
		$('#playerPopupName').text(playerName);
	}

	function setPopupPosition() {
		$('#playerPopupWrapper').center(false);
	}

	function setupPopupTabs() {
		$("#playerPopupContent").tabs();

		var tabHeight = $('#playerPopupContent ul.content_tabs li a').outerHeight(true);

		$('.newsContent div').css('height', $('.newsContent div').height() - tabHeight + 'px');

		//Bind the tabs changed event to update the scrollbar
		$('.newsContent div').perfectScrollbar({
			wheelSpeed: 30
		});
		$('.newsContent div').bind('tabsactivate', function (event, ui) {
			$('.newsContent div').perfectScrollbar('update');
		});

		var tabCount = $('#playerPopupContent ul.content_tabs li').length;
		var width = $('#playerPopupContent').width();
		var equalWidth = Math.floor(width / tabCount);

		$('#playerPopupContent ul.content_tabs li a').width(equalWidth);

		if (tabCount === 3)
			$('#playerPopupContent ul.content_tabs li:last-child a').width(width - (equalWidth * 2) - 2);
	}

	function getCookie(name) {
		name = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0)
				return c.substring(name.length, c.length);
		}
		return "";
	}

	function showPopup() {
		////Add meta tag to disallow zoom on Mobile
		//$('head').append($('<meta>', {
		//	id: 'mobileNoZoom',
		//	name: 'viewport',
		//	content: 'width=device-width, user-scalable=no'
		//}));

		if (_settings.showOverlay) {
			if (_settings.fadePopup) {
				$('#playerPopupOverlay').fadeIn(_settings.fadeTime);
			} else {
				$('#playerPopupOverlay').show();
			}
		}

		if (_settings.fadePopup) {
			$('#playerPopupWrapper').fadeIn(_settings.fadeTime);
		} else {
			$('#playerPopupWrapper').show();
		}

		_popupOpen = true;
	}

	function hidePopup() {
		if (_popupOpen === true) {
			if (_settings.showOverlay) {
				if (_settings.fadePopup) {
					$('#playerPopupOverlay').fadeOut(_settings.fadeTime);
				} else {
					$('#playerPopupOverlay').hide();
				}
			}

			if (_settings.fadePopup) {
				$('#playerPopupWrapper').fadeOut(_settings.fadeTime, function () {
					$(this).html('');
				});
			} else {
				$('#playerPopupWrapper').html('').hide();
			}

			_popupOpen = false;
		}

		////Update Mobile Zoom Meta Tag
		//$('meta#mobileNoZoom').attr('content', 'width=device-width, user-scalable=yes');
	}

	function getPlayerData(playerDetailsUrl, detailedNewsUrl) {

	}

	function findWatchListLink(data) {
		//Find Add/Remove to Watch List link to add to Popup
		var links = $(data).find('h3 a');
		var watchLink;
		if (links.length > 0) {
			var watchListLinks = $.grep(links, function (e) {
				var href = $(e).attr('href');
				return href.match('ACTION=delete') || href.match('ACTION=add');
			});

			if (watchListLinks.length > 0)
				watchLink = watchListLinks[0];
		}

		return watchLink;
	}

	function populatePlayerData(data, id, playerName) {
		var bio = data[0];
		var news = data[1];
		var careerStats = data[2];
		var stats = data[3];
		var watchLink = data[4];

		//Hide tabs that aren't needed.  Team Defenses only have current year stats, etc.
		if (bio.length === 0) {
			$('.popup_playernews').remove();
		} else {
			$('#player_news').html(bio).find('caption').remove();
			//Add a table to contain the Watch & Full Profile Links
			$('#player_news').append($('<table>', {
				id: 'playerNewsLinks',
				align: 'center',
				cellspacing: '1',
				class: 'report'
			}));

			if (_settings.useDetailedNews) {
				var detailedNews = $('<div>').html(news);
				$(detailedNews).find('caption, tr:first-child th:last-child, tr:nth-child(2) td:last-child').remove();
				$('#player_news').append(detailedNews.html());

				//Fix broken detailed player news links
				$.each($('#player_news td.headline a'), function () {
					$(this).attr('href', getAbsoluteUrl($(this).attr('href')));
				});

				$.each($('#player_news td:nth-child(3) a'), function () {
					$(this).attr('href', getAbsoluteUrl($(this).attr('href')));
				});
			} else {
				$('#player_news').append(news).find('caption').remove();
			}
		}
		if (careerStats.length === 0) {
			$('.popup_playerstathistory').remove();
		} else {
			$('#player_stathistory').html(careerStats).find('caption').remove();
		}

		//Remove unneeded caption from player stats table
		$('#player_stats').html(stats).find('caption, .reportfooter, tr:first').remove();

		//Setup Tabs (jQuery UI Tabs, widths, etc.)
		setupPopupTabs();

		//Fix Stat History broken links
		$.each($('#player_stathistory td.year a'), function () {
			$(this).attr('href', getAbsoluteUrl($(this).attr('href')));
		});

		//Fix Game Stats broken links
		$.each($('#player_stats td.points a'), function () {
			$(this).attr('href', getAbsoluteUrl($(this).attr('href')));
		});

		var rowClass = 'oddtablerow';
		//Add Watch Link to new link table
		if (watchLink !== undefined) {
			var watchLinkURL = baseURLDynamic + '/' + year + '/' + $(watchLink).attr('href');
			$(watchLink).attr('href', watchLinkURL);
			$('#playerNewsLinks').append($('<tr class="' + rowClass + '">').html($('<td>').html($(watchLink).clone())));
			rowClass = 'eventablerow';
		}

		//Add Player Profile Link to new link table
		$('#playerNewsLinks').append($('<tr class="' + rowClass + '">').html($('<td>').html($('<a>', {
			href: getPlayerDetailsUrl(id),
			text: 'View Full Player Profile'
		}))));

		//Set all links in popup to open according to settings
		if (_settings.openPopupLinksInNewWindow) {
			$('#playerPopupWrapper a').attr('target', '_blank');
		}

		hidePopupLoading();
	}

	function renderPopup(id, playerName) {
		var template = $('#playerPopupTemplate').html();
		$('#playerPopupWrapper').html(template);

		showPopupLoading();
		setPopupTitle(playerName);
		setPopupSize();
		bindPopupClose();
		setPopupPosition();
		showPopup();

		var playerDetailsUrl = getPlayerDetailsUrl(id);
		var detailedNewsUrl = getDetailedNewsUrl(id);
		var bio, news, careerStats, stats, watchLink;

		var userCookieValue = getCookie('USER_ID');

		if (_settings.useDetailedNews) {
			$.when($.ajax({ type: 'GET', url: playerDetailsUrl, data: { 'USER_ID': userCookieValue } }), $.ajax({ type: 'GET', url: detailedNewsUrl, data: { 'USER_ID': userCookieValue } })).done(function (a1, a2) {
				var playerData = a1[0];
				var newsData = a2[0];
				bio = $(playerData).find('.biography');
				news = $(newsData).find('form.reportform + table.report, form.reportform + table.report + h3');
				careerStats = $(playerData).find('.biography + table.report + table.report');
				stats = $(playerData).find('table#player_stats_table');
				watchLink = findWatchListLink(playerData);

				populatePlayerData([bio, news, careerStats, stats, watchLink], id, playerName);
			});
		} else {
			$.ajax({
				type: 'GET',
				url: playerDetailsUrl,
				data: {
					'USER_ID': userCookieValue
				}
			}).done(function (data) {
				bio = $(data).find('.biography')
				news = $(data).find('.biography + table.report');
				careerStats = $(data).find('.biography + table.report + table.report');
				stats = $(data).find('table#player_stats_table');
				watchLink = findWatchListLink(data);

				populatePlayerData([bio, news, careerStats, stats, watchLink], id, playerName);
			});
		}
	}

	return {
		renderIcons: renderIcons,
		hidePopup: hidePopup
	};
}();