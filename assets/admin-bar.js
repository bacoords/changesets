(function () {
	'use strict';

	var search = document.getElementById('cs-admin-bar-search');
	var searchItem = document.getElementById('wp-admin-bar-cs-search');
	if (!search || !searchItem || !window.csAdminBar) {
		return;
	}

	var timer;
	var requestNumber = 0;

	function clearResults() {
		var result = searchItem.parentNode.querySelector('.cs-admin-bar-result');
		while (result) {
			result.remove();
			result = searchItem.parentNode.querySelector('.cs-admin-bar-result');
		}
	}

	function addResult(title, url) {
		var item = document.createElement('li');
		var child = url ? document.createElement('a') : document.createElement('div');
		item.className = 'cs-admin-bar-result';
		child.className = 'ab-item';
		child.textContent = title;
		if (url) {
			child.href = url;
		}
		item.appendChild(child);
		searchItem.parentNode.insertBefore(item, document.getElementById('wp-admin-bar-cs-all'));
	}

	function loadResults() {
		var currentRequest = ++requestNumber;
		var url = new URL(window.csAdminBar.ajaxUrl);
		url.searchParams.set('action', 'cs_admin_bar_search');
		url.searchParams.set('_ajax_nonce', window.csAdminBar.nonce);
		url.searchParams.set('term', search.value);
		clearResults();
		addResult(window.csAdminBar.loading);
		fetch(url.toString(), { credentials: 'same-origin' })
			.then(function (response) { return response.json(); })
			.then(function (response) {
				if (currentRequest !== requestNumber) {
					return;
				}
				clearResults();
				if (!response.success) {
					addResult(window.csAdminBar.error);
					return;
				}
				var items = response.data.items;
				if (!items.length) {
					addResult(window.csAdminBar.empty);
					return;
				}
				items.forEach(function (item) {
					addResult(item.title + ' (' + item.status + ')', item.preview_url);
				});
			})
			.catch(function () {
				if (currentRequest === requestNumber) {
					clearResults();
					addResult(window.csAdminBar.error);
				}
			});
	}

	search.addEventListener('focus', function () {
		if (!searchItem.parentNode.querySelector('.cs-admin-bar-result')) {
			loadResults();
		}
	});
	search.addEventListener('input', function () {
		clearTimeout(timer);
		timer = setTimeout(loadResults, 200);
	});
})();
