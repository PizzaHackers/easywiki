var _OnOff=1;

var onObje={text:"on"};
var onColorObje={color:"#0f0"};

var offObje={text:"off"};
var offColorObje={color:"#f00"};

chrome.browserAction.setBadgeText(onObje);
chrome.browserAction.setBadgeBackgroundColor(onColorObje);

chrome.extension.onRequest.addListener(

  function(request, sender, sendResponse) {
	if (request.msg === "getStatus")
	{	
		sendResponse({status:_OnOff});
		return true;
	}
    
  });

var reInject=function()
{
	chrome.tabs.query({url:"*://*/*"},function (tabs) {
		for(var i=0;i<tabs.length;i++){
			chrome.tabs.sendMessage(tabs[i].id, {status:_OnOff});
				var _OnOffbool;
				if(_OnOff)
					_OnOffbool=true;
				else _OnOffbool=false;
				chrome.tabs.executeScript(tabs[i].id,{code:"statusa ="+(_OnOffbool)+";"});
												}
	});
}
chrome.browserAction.onClicked.addListener(function(){
	if(_OnOff)
	{

		chrome.browserAction.setBadgeText(offObje);
		chrome.browserAction.setBadgeBackgroundColor(offColorObje);	
		reInject();
	}
	else{

		chrome.browserAction.setBadgeText(onObje);
		chrome.browserAction.setBadgeBackgroundColor(onColorObje);
		reInject();
	}
		_OnOff+=1;
		_OnOff%=2;
	
});