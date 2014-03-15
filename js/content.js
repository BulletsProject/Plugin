var pluginUrl = 'chrome-extension://' + chrome.i18n.getMessage("@@extension_id");

function ContentController()
{
	var that = this;

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		if(typeof that[request.method] == 'function')
		{
			that[request.method]();
		}
	});

	$.get(pluginUrl + '/res/html/plugin.html', function(data){
		data = $(data.replace(/PLUGIN_URL/g, pluginUrl));
		$('body').append(data);

		var host = window.location.host;
		var protocol = window.location.protocol;
		var iframe = '<iframe src="http://localhost/bullets_plugin/php?host=' + host + '&protocol=' + protocol + '" style=""></iframe>';

		$(window).on("message", function(e) {
			var data = e.originalEvent.data;
			if(!data['bullets_fb_response']) return false;
			console.log(data);
			that.showLogedPlugin(data['bullets_fb_me']);
		});

		$('#bulletsplugin .not_logged_in .fb_login').html(iframe);
	});
}

ContentController.prototype.showLogedPlugin = function(me) {
	$('#bulletsplugin .logged_in .profile').css('background-image', 'url(https://graph.facebook.com/' + me.id +'/picture)');
	$('#bulletsplugin .logged_in .name .first_name').text(me.first_name);
	$('#bulletsplugin .logged_in .name .last_name').text(me.last_name);

	$('#bulletsplugin .logged_in').show();
	$('#bulletsplugin .not_logged_in').fadeOut(500);
}

ContentController.prototype.showPlugin = function() {
	$('#bulletsplugin').animate({top: 0}, 250);
}

ContentController.prototype.hidePlugin = function(){
	$('#bulletsplugin').animate({top: -50}, 250);
}

// ContentController.prototype.getSelectionHtml = function() {
// 	var html = "";
// 	if (typeof window.getSelection != "undefined") {
// 		var sel = window.getSelection();
// 		if (sel.rangeCount) {
// 			var container = document.createElement("div");
// 			for (var i = 0, len = sel.rangeCount; i < len; ++i) {
// 				container.appendChild(sel.getRangeAt(i).cloneContents());
// 			}
// 			html = container.innerHTML;
// 		}
// 	} else if (typeof document.selection != "undefined") {
// 		if (document.selection.type == "Text") {
// 			html = document.selection.createRange().htmlText;
// 		}
// 	}
// 	alert(html);
// }

var contentController = new ContentController();