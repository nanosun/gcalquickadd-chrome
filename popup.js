// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var calendarID=localStorage.defaultcal;
var googleAuth = new OAuth2('google', {
  client_id: '362290869863-ulvviphrumkl3fjpbusmvsm1ee3fm47r.apps.googleusercontent.com',
  client_secret: 'm5L80GC9_rOBAKhr3cy7s14j',
  api_scope: 'https://www.googleapis.com/auth/calendar'
});

var newevent;
var createEvent={
    apiRequest:function (){ 
	var texts="text=" + encodeURIComponent(document.getElementById("eventinput").value).replace('%20','+');
	var uri="https://www.googleapis.com/calendar/v3/calendars/"
	+ encodeURIComponent(calendarID)
	+"/events/quickAdd";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(event) {
	    if (xhr.readyState == 4) {
		if(xhr.status == 200) {
		    newevent = JSON.parse(xhr.responseText);
		    createEvent.changeTextArea();
		} else {
		}
	    };
	};
	xhr.open('POST', uri, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Authorization', 'OAuth ' + googleAuth.getAccessToken());
	xhr.send(texts);
    },
    changeTextArea:function (){
	document.getElementById("form").hidden=true;   
	document.getElementById("result").hidden=false;
	var eventlink=document.getElementById("elink");
	eventlink.innerHTML=newevent.summary;
	eventlink.href=newevent.htmlLink;
	var bedate; var eedate;
	if (newevent.start.date !== undefined) {
	   bedate=newevent.start.date;
	   eedate=newevent.end.date; document.getElementById("edate").innerHTML=bedate + " <br> to " + eedate;
	    document.getElementById("etime").innerHTML='All Day';
	}else if (newevent.start.dateTime !== undefined){
	    bedate=newevent.start.dateTime.substr(0,10);
	    eedate=newevent.end.dateTime.substr(0,10);
	    if (bedate === eedate) {
		document.getElementById("edate").innerHTML=bedate;
		}else{document.getElementById("edate").innerHTML=bedate + ' <br> to ' + eedate}
	    bedate=newevent.start.dateTime.substr(11,5);
	    eedate=newevent.end.dateTime.substr(11,5);
	    document.getElementById("etime").innerHTML=bedate + ' to ' + eedate;
	    }

	if (newevent.location !== undefined){
	document.getElementById("eloc").innerHTML=newevent.location;
	    };
    },

};

document.addEventListener('DOMContentLoaded', function () {
   if (googleAuth.hasAccessToken()){ googleAuth.authorize( function(){
       document.getElementById("submitButt").addEventListener('click',function(){createEvent.apiRequest()},false);
       document.getElementById("openGC").addEventListener('click',function(){
	   chrome.tabs.create({'url':'https://www.google.com/calendar'});},false);
       document.getElementById("refreshButt").addEventListener('click',function(){location.reload(true)},false);
       document.getElementById("elink").addEventListener('click',function(){
	   var url=document.getElementById("elink").href;
	   chrome.tabs.create({'url':url});
	   },false);
       });
       	
		}
    else {
chrome.tabs.create({'url':chrome.extension.getURL('options.html')});
	
	window.close();
    }
});



