var calendarID;
var googleAuth = new OAuth2('google', {
  client_id: '362290869863-ulvviphrumkl3fjpbusmvsm1ee3fm47r.apps.googleusercontent.com',
  client_secret: 'm5L80GC9_rOBAKhr3cy7s14j',
  api_scope: 'https://www.googleapis.com/auth/calendar'
});

function changeDefaultCal(){
    var opt=document.getElementById('list');
    var index=opt.selectedIndex;
    calendarID=opt.options[index].value;
    localStorage.defaultcal=calendarID;
    document.getElementById('alertsaved').hidden=false;
};

function checkAuthorized() {
    console.log('checkAuthorized');
    var button = document.querySelector('#' + "google");
      if (googleAuth.hasAccessToken()) {
        button.classList.add('authorized');
	button.disabled=true;
	  document.getElementById('divlist').hidden=false;
	  var opt=document.getElementById('list');
	  var len=opt.length;
	  for (var i=len-1;i>-1;i--){opt.remove(i)};
	  var tmp;
	  if (localStorage.calid !== undefined) {
	      var ttmpcalid=JSON.parse(localStorage.calid);
	      var ttmpcalname=JSON.parse(localStorage.calname);
	      for (i=0;i< ttmpcalid.length;i++){
		  tmp = document.createElement("option");
		  tmp.value=ttmpcalid[i];
		  tmp.innerHTML=ttmpcalname[i];
		  opt.appendChild(tmp);
		  calendarID=localStorage.defaultcal;
		  }
           };
      } else {
        button.classList.remove('authorized');
	button.disabled=false;
	document.getElementById('divlist').hidden=true;
      }
  };

function logout() {
    googleAuth.clearAccessToken();
    localStorage.removeItem('defaultcal');
    localStorage.removeItem('calid');
    localStorage.removeItem('calname');
    checkAuthorized();    
};

function googleAuthInit() {
    var uri="https://www.googleapis.com/calendar/v3/users/me/calendarList?minAccessRole=writer";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(event) {
      if (xhr.readyState == 4) {
        if(xhr.status == 200) {
          // Great success: parse response with JSON
          var calList = JSON.parse(xhr.responseText);
          var tmpcalid=new Array();var tmpcalname=new Array();
          for (var i=0;i< calList.items.length;i++){	      
	      tmpcalid[i]=calList.items[i].id;
	      tmpcalname[i]=calList.items[i].summary;
	  };
	  localStorage.defaultcal=tmpcalid[0];
	  localStorage.calid=JSON.stringify(tmpcalid);
	  localStorage.calname=JSON.stringify(tmpcalname);
	  checkAuthorized();
       }
      }
    };
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'OAuth ' + googleAuth.getAccessToken());
    xhr.send(null);
};


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button#google').addEventListener('click', function() { googleAuth.authorize(googleAuthInit); });
    document.querySelector('#clear').addEventListener('click', function() { logout() });
    document.querySelector('#calsubmit').addEventListener('click', function() { changeDefaultCal() });
    document.querySelector('#list').addEventListener('change', function() { document.getElementById('alertsaved').hidden=true; });
    checkAuthorized();
});
