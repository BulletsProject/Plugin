ContentController.prototype.pluginUrl = 'chrome-extension://' + chrome.i18n.getMessage("@@extension_id");
ContentController.prototype.pluginEnabled = false;
ContentController.prototype.fbData = false;

function ContentController()
{
	var that = this;

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		if(typeof that[request.method] == 'function')
		{
			that[request.method]();
		}
	});

	$.get(this.pluginUrl + '/res/html/plugin.html', function(data){
		data = $(data.replace(/PLUGIN_URL/g, that.pluginUrl));
		$('body').append(data);

		var host = window.location.host;
		var protocol = window.location.protocol;
		var iframe = '<iframe src="//apps.socializer.pl/bullets/?host=' + host + '&protocol=' + protocol + '" style=""></iframe>';

		$(window).on("message", function(e) {
			var data = e.originalEvent.data;
			if(!data['bullets_fb_response']) return false;
			that.fbData = data;
			that.showLogedPlugin(data['bullets_fb_me']);
		});

		$('#bulletsplugin .not_logged_in .fb_login').html(iframe);
	});
}

ContentController.prototype.submit = function() {
	console.log(this);
	var data = {
		shortElement: JSON.stringify({
				article_url: window.location.href,
				category_id: $('#bulletsplugin .logged_in .category .selected').attr('data-value'),
				title: $('#bulletsplugin .logged_in .bullets .bullet-t').data('text'),
				bullets: [
					$('#bulletsplugin .logged_in .bullets .bullet-1').data('text'),
					$('#bulletsplugin .logged_in .bullets .bullet-2').data('text'),
					$('#bulletsplugin .logged_in .bullets .bullet-3').data('text'),
					$('#bulletsplugin .logged_in .bullets .bullet-4').data('text'),
					$('#bulletsplugin .logged_in .bullets .bullet-5').data('text')
				],
		}),
		signedRequest: this.fbData.bullets_fb_response.authResponse.signedRequest
	};

	$.ajax({
		url: 'http://ip-193-187-64-122.e24cloud.com/short/post',
		type: 'POST',
		data: data,
		success: function(response) {
			alert(response);
		},
		error: function(response) {
			alert('error: ' + response);
		},
	});
}

ContentController.prototype.showLogedPlugin = function(me) {
	var that = this; 

	$('#bulletsplugin .logged_in .profile').css('background-image', 'url(https://graph.facebook.com/' + me.id +'/picture)');

	$('#bulletsplugin .logged_in .name .first_name').text(me.first_name);
	$('#bulletsplugin .logged_in .name .last_name').text(me.last_name);

	$('#bulletsplugin .logged_in .profile').click(function(e){
		console.log(that);
		var selectionHtml = that.getSelectionHtml();
		var selectionText = that.prepareSelectionHtml(selectionHtml);

		if(selectionText.length > 0)
		{
			$(this).data('text', selectionText);
		}

		e.stopPropagation();
		e.preventDefault();

		if(selectionText)
		{
			$('#bulletsplugin .logged_in .bullets .bullet.active').data('text', selectionText);
			$('#bulletsplugin .logged_in .input input').val($(this).data('text'));
			$('#bulletsplugin .logged_in .input input').keyup();
		}
		return false;
	});

	$('#bulletsplugin .logged_in .bullets .bullet').click(function(e){

		// if($(this).hasClass('active'))
		// {
		// }

		$('#bulletsplugin .logged_in .bullets .bullet').removeClass('active');

		$(this).addClass('active');

		$('#bulletsplugin .logged_in .input input').val($(this).data('text'));
		$('#bulletsplugin .logged_in .input input').keyup();

		e.stopPropagation();
		e.preventDefault();
		return false;
	});

	$('#bulletsplugin .logged_in .submit').click($.proxy(this.submit, this));

	$('#bulletsplugin .logged_in').show();
	$('#bulletsplugin .not_logged_in').animate({top: -50}, 250);
}

ContentController.prototype.showHidePlugin = function() {
	var that = this;
	if(this.pluginEnabled)
	{
		$('#bulletsplugin').animate({top: -50}, 250, function(){
			that.pluginEnabled = false;
		});
	}
	else
	{
		$('#bulletsplugin').animate({top: 0}, 250, function(){
			that.pluginEnabled = true;
		});
	}
}

ContentController.prototype.prepareSelectionHtml = function(html) {
	html = html.replace(/(<([^>]+)>)/ig, '').replace(/\s+/ig, ' ').slice(0, 138);
	text = $("<div/>").html(html).text();

	if(text.length > 0)
	{
		return '"' + text + '"';
	}
	else
	{
		return false;
	}
}

ContentController.prototype.getSelectionHtml = function() {
	var html = "";
	if (typeof window.getSelection != "undefined") {
		var sel = window.getSelection();
		if (sel.rangeCount) {
			var container = document.createElement("div");
			for (var i = 0, len = sel.rangeCount; i < len; ++i) {
				container.appendChild(sel.getRangeAt(i).cloneContents());
			}
			html = container.innerHTML;
		}
	} else if (typeof document.selection != "undefined") {
		if (document.selection.type == "Text") {
			html = document.selection.createRange().htmlText;
		}
	}

	return html;
}

var contentController = new ContentController();