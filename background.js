function BackgroundController()
{
	chrome.browserAction.onClicked.addListener(this.browserAction);
}

BackgroundController.prototype.pluginEnabled = false;

BackgroundController.prototype.browserAction = function(tab)
{
	if(this.pluginEnabled)
	{
		chrome.tabs.sendMessage(tab.id, {
			method: "hidePlugin"
		});

		this.pluginEnabled = 0;
	}
	else
	{
		chrome.tabs.sendMessage(tab.id, {
			method: "showPlugin"
		});

		this.pluginEnabled = 1;
	}
}

var backgroundController = new BackgroundController();