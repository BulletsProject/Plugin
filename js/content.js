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
		var data = $(data);
		$('body').append(data);
		$('#bulletsplugin .not_logged_in .logo img').attr('src', pluginUrl + '/res/gfx/LogoLong.png');
	});
}

ContentController.prototype.showPlugin = function() {
	if($('#bulletsplugin').length == 0)
	{
		$('#bulletsplugin').animate({top: 0}, 250);
	}
	else {
		$('#bulletsplugin').animate({top: 0}, 250);
	}
}

ContentController.prototype.hidePlugin = function(){
	$('#bulletsplugin').animate({top: -50}, 250);
}

var contentController = new ContentController();