"use strict";

function fbSetStatusText(s)
{
	document.getElementById('fbstatus').innerHTML = s;
}

function fbFetchCallback(response)
{
	console.log(response);
	
	if (!response.name)
	{
		fbDisconnected();
		return;
	}
	
	fbSetStatusText('Hello <b>' + response.name + '</b>! <a href="#" onclick="fbLogout(); return false;">Log out.</a>');
	document.getElementById("profile").src = "https://graph.facebook.com/v3.0/" + response.id + "/picture";
}

function fbFetch()
{
	FB.api('/me', fbFetchCallback);
}

function fbDisconnected()
{
	fbSetStatusText('Please log in.');
	document.getElementById('fblogin').style.display = "block";
	document.getElementById("profile").src = "none.png";
}

function fbConnected()
{
	fbSetStatusText('Loading...');
	document.getElementById('fblogin').style.display = "none";
	fbFetch();
}

function fbStatusChangeCallback(response)
{
	console.log(response);
	
	if (response.status === 'connected')
	{
		fbConnected();
	}
	else
	{
		fbDisconnected();
	}
}

function fbLogout()
{
	FB.logout(fbStatusChangeCallback);
}

function fbCheckLogin()
{
	FB.getLoginStatus(fbStatusChangeCallback);
}

window.fbAsyncInit = function()
{
	FB.init({
		appId: '000000000000000',
		cookie: true,
		xfbml: true,
		version: 'v2.8'
	});
	
	fbCheckLogin();
};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
