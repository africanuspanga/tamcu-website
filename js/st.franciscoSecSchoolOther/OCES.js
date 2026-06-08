var accname = "OCES";
var URL_noop = "http://www.ottawacarletone-school.ca/eSchoolContactOffline.asp";

var tempWinHandle;
var cookiepiece = document.cookie.split("; "); 
var time = new Date();
var expiry = new Date(time.getTime() + 5 * 24 * 60 * 60 * 1000); 

var ref = getCookie(accname+"ref");
if ( ref == null || ref == "" || ref == "null" ) {
	ref = document.referrer;
	setCookie(accname+"ref",ref);
}
setCookie(accname+"lasttime",time.toGMTString());
	
function popChatWin(groupint) {
	if (!groupint) 
	 groupint = 0;	
	// check what to 'pop'		
	
	
	tempWinHandle = window.open(URL_noop, '_blank','width=430,height=370,directories=no,location=no,menubar=no,scrollbars=no, status=no,toolbar=no,resizable=no');						 		
	if (tempWinHandle != null && tempWinHandle != "") {	
		tempWinHandle.focus();	
	}
	
}

function ccs_doAction(){
}

function getCookie(name) { 
    cookiepiece = document.cookie.split("; "); 
    for (var i=0; i < cookiepiece.length; i++) {
      next = cookiepiece[i].split("="); 
      if (next[0] == name) 
        return unescape(next[1]); 
    }
    return null;
}

function setCookie(name, value) { 
    if (value != null && value != "")
      document.cookie=name + "=" + escape(value) + "; expires=" + expiry.toGMTString()+"; path=/;";    
}

// for V5.9.2 script activate chat request
function ccs_requestchat(){}