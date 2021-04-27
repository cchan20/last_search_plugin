var language = "zh_hk";
var lastSearchAnalyticFramework;

window.onload = function () {
	lastSearchAnalyticFramework = window.WDPRO && window.WDPRO.Analytics && window.WDPRO.Analytics.Framework;

	var translator = new Language(getCurrentLanguage());

	// document.getElementById("continueSearch").innerHTML = '<img id="continueSearchImg"><button id="continueButton" title="Go to top">Continue Search</button><div class="scroll-nav nav-close" id="scroll-nav"><ul id="carousellist">	</ul></div>';

	document.getElementById("continueSearch").innerHTML = '<div id="continueSearchImg"></div><button id="continueButton" title="Go to top">' + translator.getStr("ContinueSearch") + '</button><div class="scroll-nav nav-close" id="scroll-nav"><ul id="carousellist">	</ul></div>';

	removeArrivalExpiryCookies();
	checkAnyCookies();
	document.getElementById("continueSearchImg").addEventListener("click", toggleScrollBar);
	document.getElementById("continueButton").addEventListener("click", showScroll);

	document.addEventListener('click', function (e) {
		if (e.target && e.target.id == 'closeIcon') {
			closeScroll();
		}
	});
}

function toggleScrollBar() {
	var scrollNav = document.getElementById('scroll-nav');
	if (scrollNav.classList.contains('nav-close')) {
		showScroll();
	} else {
		closeScroll();
	}
}

function showScroll() {
	console.log('showScroll');
	showCookie();
	var scrollNav = document.getElementById('scroll-nav');
	scrollNav.style.display = 'block';
	if (scrollNav.classList.contains('nav-close')) {
		scrollNav.classList.remove('nav-close');
		scrollNav.classList.add('nav-open');
	}

	var continue_btn = document.getElementById('continueButton');
	continue_btn.classList.remove('continue-btn-show');
	continue_btn.classList.add('continue-btn-hide');
	setTimeout(function () {
		continue_btn.style.display = 'none';
	}, 200);

	if (!lastSearchAnalyticFramework) {
		lastSearchAnalyticFramework = window.WDPRO && window.WDPRO.Analytics && window.WDPRO.Analytics.Framework;
	}
	if (lastSearchAnalyticFramework) {
		console.log('Last Search Expend');
		var model = {
			trackingType: 'customLink', // Should be "customLink" for link tracking, "customPage" for page tracking
			linkId: 'last_search_expend'
		};
		lastSearchAnalyticFramework.trackElement(model);
	}
};

function closeScroll() {
	console.log('closeScroll');
	var scrollNav = document.getElementById('scroll-nav');
	if (scrollNav.classList.contains('nav-open')) {
		scrollNav.classList.remove('nav-open');
		scrollNav.classList.add('nav-close');
	}
	setTimeout(function () {
		scrollNav.style.display = 'none';
	}, 200);

	var continue_btn = document.getElementById('continueButton');
	continue_btn.style.display = 'block';
	if (continue_btn.classList.contains('continue-btn-hide')) {
		continue_btn.classList.remove('continue-btn-hide');
		continue_btn.classList.add('continue-btn-show');
	}

	if (!lastSearchAnalyticFramework) {
		lastSearchAnalyticFramework = window.WDPRO && window.WDPRO.Analytics && window.WDPRO.Analytics.Framework;
	}
	if (lastSearchAnalyticFramework) {
		console.log('Last Search Collapse');
		var model = {
			trackingType: 'customLink', // Should be "customLink" for link tracking, "customPage" for page tracking
			linkId: 'last_search_collapse'
		};
		lastSearchAnalyticFramework.trackElement(model);
	}
};

function getCurrentLanguage() {
	current_url = window.location.href
	if (current_url.indexOf("zh-hk/resort") != -1) {
		return "zh_hk";
	} else if (current_url.indexOf("zh-cn/resort") != -1) {
		return "zh_cn";
	} else if (current_url.indexOf("ja/resort") != -1) {
		return "ja";
	} else if (current_url.indexOf("ko/resort") != -1) {
		return "ko";
	} else if (current_url.indexOf("th/resort") != -1) {
		return "th";
	} else if (current_url.indexOf("ms/resort") != -1) {
		return "ms";
	} else if (current_url.indexOf("id/resort") != -1) {
		return "id";
	} else {
		return "en";
	}
}

function Language(lang) {
	var en = {
		ContinueSearch: "Continue Search"
	};

	var id = {
		ContinueSearch: "Lanjutkan Pencarian"
	};

	var zh_hk = {
		ContinueSearch: "繼續搜尋"
	};

	var zh_cn = {
		ContinueSearch: "继续搜寻"
	};

	var ja = {
		ContinueSearch: "検索を続ける"
	};

	var ko = {
		ContinueSearch: "계속 검색"
	};

	var th = {
		ContinueSearch: "ค้นหาต่อ"
	};

	var ms = {
		ContinueSearch: "Terus Cari"
	};

	var __construct = function () {
		if (eval('typeof ' + lang) == 'undefined') {
			lang = "en";
		}
		return;
	}()

	this.getStr = function (str, defaultStr) {
		var retStr = eval('eval(lang).' + str);
		if (typeof retStr != 'undefined') {
			return retStr;
		} else {
			if (typeof defaultStr != 'undefined') {
				return defaultStr;
			} else {
				return eval('en.' + str);
			}
		}
	}
}

function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function save(occupancy, aDate, dDate, hotelDisplayName, offerDisplayName, url) {
	var expirydate = new Date();
	expirydate.setDate(expirydate.getDate() + 30);
	var cookieJson = '{"occupancy": "' + encodeURIComponent(occupancy) + '", "aDate": "' + aDate + '", "dDate": "' + dDate + '", "hotelDisplayName": "' + encodeURIComponent(hotelDisplayName) + '", "offerDisplayName": "' + encodeURIComponent(offerDisplayName) + '","expirydate":"' + expirydate + '","url":"' + url + '"}';
	const indexOfCookie = checkAvaliableCookies();
	// console.log('indexOfCookie: ' + indexOfCookie);

	if (indexOfCookie != null) {
		setCookie('d' + i, cookieJson, 30);
	} else {
		//all cookies used
		var oldestCookiesIndex = checkOldestCookies();
		// console.log("Replace: d" + oldestCookiesIndex);
		setCookie('d' + oldestCookiesIndex, cookieJson, 30);
	}
}

function checkAvaliableCookies() {
	//Check avaliable cookies
	for (i = 0; i < 3; i++) {
		//console.log(getCookie("d"+i));
		if (getCookie("d" + i) == null) {
			// console.log(i + " is avaliable");
			// console.log(getCookie("d" + i));
			return i;
		}
	}
	return null;
}

function removeArrivalExpiryCookies() {
	var expirydate = new Date();
	expirydate.setHours(0, 0, 0, 0);
	for (i = 0; i < 3; i++) {
		cookiesName = "d" + i
		// console.log('Check today date: ' + expirydate);
		// console.log('Check cookies: ' + cookiesName);
		if (getCookie(cookiesName) != null) {
			// console.log('removeArrivalExpiryCookies: ' + getCookie(cookiesName));
			var dateobj = JSON.parse(getCookie(cookiesName));
			var date1 = new Date(dateobj.aDate);
			// console.log('Check date: ' + date1);
			if (date1 < expirydate) {
				console.log('Remove cookies: ' + cookiesName);
				document.cookie = cookiesName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			}
		}
	}
}

function checkOldestCookies() {
	var expirydate = new Date();
	var oldestIndex = 0;
	var datearr = [];
	for (i = 0; i < 3; i++) {
		if (getCookie("d" + (i + 1)) != null) {
			// console.log('checkOldestCookies: ' + getCookie("d" + (i + 1)));
			var dateobj = JSON.parse(getCookie("d" + oldestIndex));
			var dateobj2 = JSON.parse(getCookie("d" + (i + 1)));
			var date1 = new Date(dateobj.expirydate);
			// console.log("d" + oldestIndex + "=" + date1);
			var date2 = new Date(dateobj2.expirydate);
			// console.log("d" + (i + 1) + "=" + date2);
			if (date1 < date2) {
				oldestIndex = oldestIndex;
			} else {
				oldestIndex = i + 1;
			}
		}
	}
	console.log('Remove cookies: d' + oldestIndex);
	return oldestIndex;
}

function checkAnyCookies() {
	if (getCookie("d0") != null || getCookie("d1") != null || getCookie("d2") != null) {
		//If cookies are avaliable then show continue search button.
		document.getElementById('continueButton').style.display = 'block';
		document.getElementById('continueSearchImg').style.display = 'block';
	}
}

function lastSearchCookiesSorting() {
	var cookiesOrder = [];
	for (i = 0; i < 3; i++) {
		if (getCookie("d" + (i)) != null) {
			if (cookiesOrder.length == 0) {
				cookiesOrder.push("d" + (i))
			} else {
				var cookiesOrderLength = cookiesOrder.length;
				for (j = 0; j < cookiesOrderLength; j++) {
					var dateobj = JSON.parse(getCookie(cookiesOrder[j]));
					var date1 = new Date(dateobj.expirydate);
					// console.log("Compare Cookie:" + cookiesOrder[j] + "=" + date1);
					var date2obj = JSON.parse(getCookie("d" + (i)));
					var date2 = new Date(date2obj.expirydate);
					// console.log("Current Cookie:" + "d" + (i) + "=" + date2);
					if (date1 > date2) {
						cookiesOrder.splice(j, 0, "d" + (i));
						break;
					}
					if ((j + 1) == cookiesOrderLength) {
						cookiesOrder.push("d" + (i))
						break;
					}
				}
			}
			// console.log("Ordering: " + cookiesOrder);
		}
	}
	// console.log("Ordering: " + cookiesOrder);
	return cookiesOrder
}

function showCookie() {
	// var translator = new Language(getCurrentLanguage());
	var html = "";
	cookiesOrder = lastSearchCookiesSorting();
	var cookiesOrderLength = cookiesOrder.length;

	html = html + '<li class="closebuttonli"><div class="closeIcon" id="closeIcon"></div></li>';
	for (i = 0; i < cookiesOrderLength; i++) {
		if (getCookie(cookiesOrder[i]) != null) {
			var dObject = JSON.parse(getCookie(cookiesOrder[i]));
			var occupancy = dObject.occupancy;
			var aDate = dObject.aDate;
			var dDate = dObject.dDate;
			var hotelDisplayName = dObject.hotelDisplayName;
			var offerDisplayName = dObject.offerDisplayName;
			var url = dObject.url;


			// html = html + '<li class="carousel"><div class="item-split-line"></div><div class="iconhotel"><img class="hotelIcon" src="img/App/icon_hotel.png"></div><div class="carouseltext">';
			html = html + '<li class="carousel"><div class="item-split-line"></div><a href="' + url + '"><div class="iconhotel"><div class="hotelIcon"></div></div><div class="carouseltext">';
			html = html + checkDisplayConentLength(decodeURIComponent(hotelDisplayName)) + '</br>';
			html = html + checkDisplayConentLength(decodeURIComponent(offerDisplayName)) + '</br>';
			html = html + checkDisplayConentLength(aDate.replace(/[-=]/g, "/") + ' - ' + dDate.replace(/[-=]/g, "/")) + '</br>';
			// html = html + checkDisplayConentLength(occupancy);
			html = html + decodeURIComponent(occupancy);
			// html = html + adultNo + ' ' + translator.getStr("Adults") + ', ' + childNo + ' ' + translator.getStr("Children");
			html = html + '</div></a></li>';
			// html = html + '</div></li>';
		}
	}
	document.getElementById('carousellist').innerHTML = html;

	document.addEventListener("click", function (e) {
		console.log('EventListener click');
		if (e.target && e.target.matches("div.carouseltext")) {

			if (!lastSearchAnalyticFramework) {
				lastSearchAnalyticFramework = window.WDPRO && window.WDPRO.Analytics && window.WDPRO.Analytics.Framework;
			}
			if (lastSearchAnalyticFramework) {
				console.log('Send History Click Track');
				var model = {
					trackingType: 'customLink', // Should be "customLink" for link tracking, "customPage" for page tracking
					linkId: 'last_search_history_click'
				};
				lastSearchAnalyticFramework.trackElement(model);
			}
		}
	});
	//$('#carousellist').html(html);
}

function checkDisplayConentLength(input_string) {
	var dots = "...";
	if (input_string.length > 24) {
		// you can also use substr instead of substring
		input_string = input_string.substring(0, 20) + dots;
	}
	return input_string;
}
