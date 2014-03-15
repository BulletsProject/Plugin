<style type="text/css">body{padding:0px;margin:0px;}</style>
<img src="../res/gfx/FbLogin.png" onclick="login()" style="cursor:pointer;">
<div id="fb-root"></div>

<script>
	function login() {
		FB.getLoginStatus(function (response) {
			if(response.status == 'connected')
			{
				FB.api('/me', function(data){
					parent.postMessage({
						bullets_fb_response: response,
						bullets_fb_me: data
					}, "<?php echo $_GET['protocol']; ?>//<?php echo $_GET['host']; ?>/");
				});
			}
			else
			{
				FB.login(function (response) {
					FB.api('/me', function(data){
						parent.postMessage({
							bullets_fb_response: response,
							bullets_fb_me: data
						}, "<?php echo $_GET['protocol']; ?>//<?php echo $_GET['host']; ?>/");
					});
				});
			}
		});
	}

	window.fbAsyncInit = function () {
		FB.init({
			appId:'221667328027556',
			status:true,
			cookie:true,
			xfbml:true
		});
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/all.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
</script>