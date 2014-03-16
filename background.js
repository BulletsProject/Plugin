function BackgroundController()
{
	chrome.browserAction.onClicked.addListener(this.browserAction);
}

BackgroundController.prototype.browserAction = function(tab)
{
	chrome.tabs.sendMessage(tab.id, {
		method: "showHidePlugin"
	});
}

var backgroundController = new BackgroundController();