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
}

ContentController.prototype.showPlugin = function() {
	if($('#bulletsplugin').length == 0)
	{
		$.get(pluginUrl + '/res/html/iframe.html', function(data){
			var data = $(data);
			$('body').append(data);

			$('#bulletsplugin').attr('src', pluginUrl + '/res/html/plugin.html'); 
			// $('.not_logged_in .logo img', $('#bulletsplugin').get(0).contentWindow).attr('src', pluginUrl + '/res/gfx/LogoLong.png'); 
			
			$('*', $('#bulletsplugin').get(0).contentWindow).remove();

			$('#bulletsplugin').load(function(){
				$('#bulletsplugin').animate({top: 0}, 250);
			});
		});
	}
	else {
		$('#bulletsplugin').animate({top: 0}, 250);
	}
}

ContentController.prototype.hidePlugin = function(){
	$('#bulletsplugin').animate({top: -50}, 250);
}

var contentController = new ContentController();