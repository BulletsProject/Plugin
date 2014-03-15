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

ContentController.prototype.showPlugin = function(){alert('show');}
ContentController.prototype.hidePlugin = function(){alert('hide');}

var contentController = new ContentController();