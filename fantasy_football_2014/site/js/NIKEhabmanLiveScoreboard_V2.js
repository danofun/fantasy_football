//THIS SCRIPT WILL CREATE A LIVE SCORING SUMMARY SIMILAR TO CBS FOR MFL LEAGUES
//It should be a stand alone module meaning DO NOT place it on the home page (this includes home page tabs)
//To use simply place the script in a home page module (advanced editor turned off)
//Then use a second home page module to create a link to the scoreboard and place this module on the home page
//Example: place script in Home Page Module 20
//         using home page module 19 you can create a link by simply adding the following script:
//              <a href='%HOST%/%YEAR%/home/%LEAGUEID%?MODULE=MESSAGE20'>Live Scoring</a>
//         now place home page module 19 and set this module somewhere to your home page
// UPDATE 2.0x included fancy tabs which required the inclusion of MY_NEWS, SUBMIT_LINEUP and WELCOME Home Page Modules to be place in the home page message
//        version 2.0x expects those home page messages to exist or the script may fail.


//If you want to host your own files copy these files and re-link to your hosting site
	var styleSheet0 = "http://nitrografixx.com/cbsscoreboard/css/default.css";
	var styleSheet1 = "http://nitrografixx.com/cbsscoreboard/css/habmanScoreboardDefault.css";
	var styleSheet2 = "http://nitrografixx.com/cbsscoreboard/css/yellow.css";
	var styleSheet3 = "http://nitrografixx.com/cbsscoreboard/css/red.css";
	var styleSheet4 = "http://nitrografixx.com/cbsscoreboard/css/blue.css";
	var styleSheet5 = "http://nitrografixx.com/cbsscoreboard/css/cbs.css";
	var styleSheet6 = "http://nitrografixx.com/cbsscoreboard/css/habman.css";
	var styleSheet7 = "http://nitrografixx.com/cbsscoreboard/css/mfladdon.css";
	var styleSheet8 = "http://nitrografixx.com/cbsscoreboard/css/nitro.css";
	var styleSheet9 = "http://nitrografixx.com/cbsscoreboard/css/tmlnike.css";
	var styleSheet10 = "http://nitrografixx.com/cbsscoreboard/css/nikelight.css";
	var styleSheet11 = "http://nitrografixx.com/cbsscoreboard/css/empirenike.css";
	var styleSheet12 = "http://www.faithworkcamps.com/fantasy_football_2014/site/css/12AMscoreboard.css";
	var styleSheet13 = "http://nitrografixx.com/cbsscoreboard/css/NikeLight2014Scoreboard.css";
	var styleSheet14 = "http://nitrografixx.com/cbsscoreboard/css/NikeDark2014.css";
	var styleSheet15 = "http://nitrografixx.com/cbsscoreboard/css/frosted.css";

	var redZoneImage = "http://nitrografixx.com/cbsscoreboard/img/red_zone.png";
	var hasBallImage = "http://nitrografixx.com/cbsscoreboard/img/has_ball.png";
	var recentUpdateImage = "http://nitrografixx.com/cbsscoreboard/img/new_stats.png";
	var recentNegativeUpdateImage = "http://nitrografixx.com/cbsscoreboard/img/new_stats_down.png";
	var chatIconImage = "http://nitrografixx.com/cbsscoreboard/img/chat_icon.png";
	var habChatIconOnline = "http://nitrografixx.com/habman_js/chatonline.png";
	var habChatIconOffline = "http://nitrografixx.com/habman_js/chatoffline.png";
	var mobileImage = "http://nitrografixx.com/cbsscoreboard/img/go_mobile.png";
	var nflIconImage = "http://nitrografixx.com/cbsscoreboard/img/nfl_logo.png";
	var nflIconImage2 = "http://nitrografixx.com/cbsscoreboard/img/nfl_spin.gif";	                            // TOS your nfl spin doesn't spin completely around, please upload mine
	var mflIconImage = "http://nitrografixx.com/cbsscoreboard/img/mfl_logo.png";
	var mflIconImage2 = "http://nitrografixx.com/cbsscoreboard/img/mfl_spin.gif";
	var lineupIcon = "http://nitrografixx.com/cbsscoreboard/fancytab/lineup_icon.png";
	var loginIcon = "http://nitrografixx.com/cbsscoreboard/fancytab/login_icon.png";
	var wsisIcon = "http://nitrografixx.com/cbsscoreboard/fancytab/wdis_icon.png";
	var myNewsIcon = "http://nitrografixx.com/cbsscoreboard/fancytab/playernews_icon.png";
	var nflVideoIcon = "http://nitrografixx.com/cbsscoreboard/img/video.png";
	
	var newNoteImage = "http://nitrografixx.com/habman_js/note_new.gif";
	var recentNoteImage = "http://nitrografixx.com/habman_js/note_2.gif";
	var oldNoteImage = "http://nitrografixx.com/habman_js/note_1.gif";
	
	var nflIconBase = "http://nitrografixx.com/cbsscoreboard/nfl_icons/";  // png images for nfl icons arizona ==> arizona_cardinals.png

	var habChatJSFile = "http://nitrografixx.com/habman_js/habchat_mini2.js";
	
	//You can host the following file but it will not update since a php script creates the file every hour and can only write to the localhost
	var habNewsBreakerJSFile = "http://nitrografixx.com/habman_js/habNewsBreakers.js";
	//The following file contains the borderless window popup script along with default CSS
	var habBorderlessWindowJSFile = "http://nitrografixx.com/habman_js/habmanBorderlessWindow.js";
	//PHP Files that you wouldn't normally host yourself
	var playerGameStatsPHP = "http://nitrografixx.com/habman_js/NIKEPlayerGameStats.php";
	var playerNewsPHP = "http://nitrografixx.com/habman_js/NIKEPlayerNews.php";
	var playerLoadingPHP = "http://nitrografixx.com/habman_js/NIKEPlayerLoading.php";



///////////////////////////////////////////////////////////////
//NO NEED TO EDIT BELOW THIS LINE
///////////////////////////////////////////////////////////////

//AMOUNT OF XML CALLS EXPLAINED
	//INITIAL CALLS
		//8 initial XML calls made when first entering script (1 to league; 1 to standings; 1 to players, 1 to injuries, 1 to liveScoring, 1 to roster, 1 to weeklyResults, 1 to liveScoring)
		//+1 If includePlayerUpdates=true

	//UPDATING
		//ONE LOOP = 1 minute therefore 30 LOOPS = 30 minutes; 
		//1 LOOP MAKES 1 XML CALL THAT COUNTS AGAINST A LEAGUE (1 to liveScoring); there is also 1 to nflSchedule which is a freebie so long as your league_id isn't included as a parameter; 
		//Change from one matchup to another resets loopCount and triggers a call to liveScoring immediately
		//Change for one week to another triggers a one time call to weeklyMatchups and then resets the loopCount with one call to liveScoring
		
	//One person actively resetting every half hour will trigger 9 initial calls + 1 call per minute * 60 minutes * 24 hours = 1449 calls in a 24 hour period
//===========================================

var versionNumber = "V2.02";

var myBorderlessDiv = "dhtmlwindowholder_CBS"; 	// borderless window var
var newsIconWidth = 550;	                   	// borderless window var
var newsIconHeight = 400;						// borderless window var
var newsIconHandleBgColor = '#175499';			// borderless window var
var newsIconHandleFontColor = 'white';			// borderless window var
var newsIconCenter = true;						// borderless window var

var liveScoringEmpty = false;

if(maxLoops==undefined) var maxLoops=180;
if(refreshSeconds==undefined) var refreshSeconds=41;
if(franchise_id==undefined) var franchise_id;

try { 
	var myPlatform = navigator.platform; 
} catch(er) { 
	var myPlatform = "unknown";
}
if(myPlatform=="iPad"||myPlatform=="iPhone") {
	var myAdjWidthOuter = " style='width:100%; max-width:1024px;'"; 
	var myAdjWidthHomeLink = " style='width:100%; max-width:1024px;'"; 
} else { 
	var myAdjWidthOuter = "";
	var myAdjWidthHomeLink = ""; 
}

//the following vars are typically set by the user but if they are missing or corrupt then assign default values here
if(useStyleSheet==undefined) var useStyleSheet = 0;
if(scoreboardOnTop==undefined) var scoreboardOnTop=false;
if(scoreboardLeagueName==undefined) var scoreboardLeagueName="";
if(matchupsPerRow==undefined) var matchupsPerRow=5;
if(includeWeeklyNavigation==undefined) var includeWeeklyNavigation=true;
if(includeProjections==undefined) var includeProjections=true;
if(includeSOS==undefined) var includeSOS=true;
if(includeNewsBreakers==undefined) var includeNewsBreakers=true;
if(includePlayerUpdates==undefined) var includePlayerUpdates=true;
if(includeStarterTotals==undefined) var includeStarterTotals=true;
if(includeBenchTotals==undefined) var includeBenchTotals=true;
if(includeCustomPlayers==undefined) var includeCustomPlayers=false;
if(includeHabChat==undefined) var includeHabChat=1;
if(includeBorderlessWindow==undefined) var includeBorderlessWindow=true;
if(includeCSSInPopups==undefined) var includeCSSInPopups=2;
if(includeNFLVideo==undefined) var includeNFLVideo=true;
if(useNicknamesInScoreboard==undefined) var useNicknamesInScoreboard=false;
if(useNFLIcons==undefined) var useNFLIcons=false;
if(allPlaySetup==undefined) var allPlaySetup=false;
if(scoreboardImage==undefined) var scoreboardImage = 1;
if(scoreboardLayout==undefined) var scoreboardLayout = scoreboardImage;        // changed var from scoreboardImage to scoreboardLayout because it makes more sense
if(numberImageDir==undefined) var numberImageDir = "";
if(numberImageExt==undefined) var numberImageExt = "";
if(numberImageMinimumDigits==undefined) var numberImageMinimumDigits = 0;
if(hideTiebreakingPlayer==undefined) var hideTiebreakingPlayer = false;
if(chatLinkStyle==undefined) var chatLinkStyle="";
if(mobileLinkStyle==undefined) var mobileLinkStyle="";


//include selected style sheet
if(location.href.indexOf("MODULE=MESSAGE")>0||location.href.indexOf("/message")>0) { //GOOD TO GO
	if(location.href.indexOf("c=0")>0||location.href.indexOf("c=0")>0) chatLinkStyle = " style='display:none'";
	
	if(location.href.indexOf("o=1")>0||location.href.indexOf("O=1")>0) includeSOS=true;
	if(location.href.indexOf("o=0")>0||location.href.indexOf("O=0")>0) includeSOS=false;
	
	if(location.href.indexOf("n=1")>0||location.href.indexOf("N=1")>0) includeNewsBreakers=true;
	if(location.href.indexOf("n=0")>0||location.href.indexOf("N=0")>0) includeNewsBreakers=false;
	
	if(location.href.indexOf("u=1")>0||location.href.indexOf("U=1")>0) includePlayerUpdates=true;
	if(location.href.indexOf("u=0")>0||location.href.indexOf("U=0")>0) includePlayerUpdates=false;
	
	if(location.href.indexOf("p=1")>0||location.href.indexOf("P=1")>0) includeProjections=true;
	if(location.href.indexOf("p=0")>0||location.href.indexOf("P=0")>0) includeProjections=false;

	if(location.href.indexOf("s=0")>0||location.href.indexOf("S=0")>0) useStyleSheet=0;
	if(location.href.indexOf("s=1")>0||location.href.indexOf("S=1")>0) useStyleSheet=1;
	if(location.href.indexOf("s=2")>0||location.href.indexOf("S=2")>0) useStyleSheet=2;
	if(location.href.indexOf("s=3")>0||location.href.indexOf("S=3")>0) useStyleSheet=3;
	if(location.href.indexOf("s=4")>0||location.href.indexOf("S=4")>0) useStyleSheet=4;
	if(location.href.indexOf("s=5")>0||location.href.indexOf("S=5")>0) useStyleSheet=5;
	if(location.href.indexOf("s=6")>0||location.href.indexOf("S=6")>0) useStyleSheet=6;
	if(location.href.indexOf("s=7")>0||location.href.indexOf("S=7")>0) useStyleSheet=7;
	if(location.href.indexOf("s=8")>0||location.href.indexOf("S=8")>0) useStyleSheet=8;
	
	if(location.href.indexOf("d=1")>0||location.href.indexOf("D=1")>0) numberImageMinimumDigits=1;
	if(location.href.indexOf("d=2")>0||location.href.indexOf("D=2")>0) numberImageMinimumDigits=2;
	if(location.href.indexOf("d=3")>0||location.href.indexOf("D=3")>0) numberImageMinimumDigits=3;
	if(location.href.indexOf("d=4")>0||location.href.indexOf("D=4")>0) numberImageMinimumDigits=4;
	if(location.href.indexOf("d=5")>0||location.href.indexOf("D=5")>0) numberImageMinimumDigits=5;
	if(location.href.indexOf("d=6")>0||location.href.indexOf("D=6")>0) numberImageMinimumDigits=6;
	if(location.href.indexOf("d=7")>0||location.href.indexOf("D=7")>0) numberImageMinimumDigits=7;
	if(location.href.indexOf("d=8")>0||location.href.indexOf("D=8")>0) numberImageMinimumDigits=8;
	
	if(location.href.indexOf("l=0")>0||location.href.indexOf("L=0")>0) scoreboardLayout=0;
	if(location.href.indexOf("l=1")>0||location.href.indexOf("L=1")>0) scoreboardLayout=1;
	if(location.href.indexOf("l=2")>0||location.href.indexOf("L=2")>0) scoreboardLayout=2;
	if(location.href.indexOf("l=3")>0||location.href.indexOf("L=3")>0) scoreboardLayout=3;
	if(location.href.indexOf("l=4")>0||location.href.indexOf("L=4")>0) scoreboardLayout=4;
	
	if(location.href.indexOf("i=0")>0||location.href.indexOf("I=0")>0) numberImageDir="";
	if(location.href.indexOf("i=cbs")>0||location.href.indexOf("I=cbs")>0) numberImageDir="http://nitrografixx.com/cbsscoreboard/numerals/cbs/";
	if(location.href.indexOf("i=red")>0||location.href.indexOf("I=red")>0) numberImageDir="http://nitrografixx.com/cbsscoreboard/numerals/red/";
	if(location.href.indexOf("i=blue")>0||location.href.indexOf("I=blue")>0) numberImageDir="http://nitrografixx.com/cbsscoreboard/numerals/blue/";
	if(location.href.indexOf("i=yellow")>0||location.href.indexOf("I=yellow")>0) numberImageDir="http://nitrografixx.com/cbsscoreboard/numerals/yellow/";
	if(location.href.indexOf("i=lights")>0||location.href.indexOf("I=lights")>0) numberImageDir="http://nitrografixx.com/cbsscoreboard/numerals/lights/";
	if(location.href.indexOf("i=white")>0||location.href.indexOf("I=white")>0) numberImageDir="http://nitrografixx.com/cbsscoreboard/numerals/white/";
	if(location.href.indexOf("i=wb")>0||location.href.indexOf("I=wb")>0) numberImageDir="http://nitrografixx.com/cbsscoreboard/numerals/whitebg_black/";
	
	if(location.href.indexOf("mobile=0")>0||location.href.indexOf("MOBILE=0")>0) {
		chatLinkStyle = " style='display:none'";
		mobileLinkStyle = " style='display:none'";
		includeSOS=false;
		includeNewsBreakers=false;
		includePlayerUpdates=false;
		includeNFLVideo=false;
		useStyleSheet=0;
		scoreboardLayout=0;
		numberImageDir="";
	}
	if(location.href.indexOf("mobile=1")>0||location.href.indexOf("MOBILE=1")>0) {
		chatLinkStyle = " style='display:none'";
		mobileLinkStyle = " style='display:none'";
		includeSOS=false;
		includeNewsBreakers=false;
		includePlayerUpdates=false;
		includeNFLVideo=false;
		useStyleSheet=1;
		scoreboardLayout=0;
		numberImageDir="";
	}
	
	if(includeBorderlessWindow) document.write('<script type="text/javascript" src="'+habBorderlessWindowJSFile+'"></script>');
	if(includeHabChat>0) document.write('<script type="text/javascript" src="'+habChatJSFile+'"></script>');
	if(includeNewsBreakers) document.write('<script type="text/javascript" src="'+habNewsBreakerJSFile+'"></script>');

	var myStyleSheet = "";
	if(useStyleSheet==0) { document.write("<link rel='stylesheet' href='"+styleSheet0+"' type='text/css' />"); myStyleSheet = styleSheet0; }
	if(useStyleSheet==1) { document.write("<link rel='stylesheet' href='"+styleSheet1+"' type='text/css' />"); myStyleSheet = styleSheet1; }
	if(useStyleSheet==2) { document.write("<link rel='stylesheet' href='"+styleSheet2+"' type='text/css' />"); myStyleSheet = styleSheet2; }
	if(useStyleSheet==3) { document.write("<link rel='stylesheet' href='"+styleSheet3+"' type='text/css' />"); myStyleSheet = styleSheet3; }
	if(useStyleSheet==4) { document.write("<link rel='stylesheet' href='"+styleSheet4+"' type='text/css' />"); myStyleSheet = styleSheet4; }
	if(useStyleSheet==5) { document.write("<link rel='stylesheet' href='"+styleSheet5+"' type='text/css' />"); myStyleSheet = styleSheet5; }
	if(useStyleSheet==6) { document.write("<link rel='stylesheet' href='"+styleSheet6+"' type='text/css' />"); myStyleSheet = styleSheet6; }
	if(useStyleSheet==7) { document.write("<link rel='stylesheet' href='"+styleSheet7+"' type='text/css' />"); myStyleSheet = styleSheet7; }
	if(useStyleSheet==8) { document.write("<link rel='stylesheet' href='"+styleSheet8+"' type='text/css' />"); myStyleSheet = styleSheet8; }
	if(useStyleSheet==9) { document.write("<link rel='stylesheet' href='"+styleSheet9+"' type='text/css' />"); myStyleSheet = styleSheet9; }
	if(useStyleSheet==10) { document.write("<link rel='stylesheet' href='"+styleSheet10+"' type='text/css' />"); myStyleSheet = styleSheet10; }
	if(useStyleSheet==11) { document.write("<link rel='stylesheet' href='"+styleSheet11+"' type='text/css' />"); myStyleSheet = styleSheet11; }
	if(useStyleSheet==12) { document.write("<link rel='stylesheet' href='"+styleSheet12+"' type='text/css' />"); myStyleSheet = styleSheet12; }
	if(useStyleSheet==13) { document.write("<link rel='stylesheet' href='"+styleSheet13+"' type='text/css' />"); myStyleSheet = styleSheet13; }
	if(useStyleSheet==14) { document.write("<link rel='stylesheet' href='"+styleSheet14+"' type='text/css' />"); myStyleSheet = styleSheet14; }
	if(useStyleSheet==15) { document.write("<link rel='stylesheet' href='"+styleSheet15+"' type='text/css' />"); myStyleSheet = styleSheet15; }
	
	document.write('<div id="'+myBorderlessDiv+'"><span style="display:none">.</span></div>'); //container that holds all dhtml window divs on page	
	//if(includeNFLVideo) document.write('<div id="myFancyNFLVideo" style="display:none;"><iframe frameborder="0" height="457" marginheight="0" marginwidth="0" scrolling="no" src="http://nfl.cpa.delvenetworks.com/delve/player/carousel/embed_code.html?channelId=de89a8aeb3e422bac4eb48567f10ebd0&mediaId=b47cb8fdeaf340209137894fec1c8c25" width="480"></iframe></div>');
	if(includeNFLVideo) document.write('<div id="myFancyNFLVideo" style="display:none;"><iframe frameborder="0" height="457" marginheight="0" marginwidth="0" scrolling="no" src="http://nfl.cpa.delvenetworks.com/delve/player/carousel/embed_code.html?channelId=de89a8aeb3e422bac4eb48567f10ebd0&mediaId=" width="480"></iframe></div>');
}


//==A FEW ISSUES NEED TO BE ADDRESSED WITH REGARDS TO THE XML DOCUMENTS
//  First only 5000 calls within a 24 hour period are allowed, if exceeded then the script will fail
//    To work around this limit I have set the script up that after approximately a half hour you will have to manually restart the script.
//    Although this limit is frustrating I understand the need for it.  Why use the extra resources that XML calls create when the end user
//    may have just started a session and then walked away from the computer
//  Second if the Live Scoring Page does not get visited then the live scoring XML files will not update so we somehow need to force a visit.
//    To work around this I have created a call to Live Scoring File using a hidden iframe that refreshes itself
//  Third issue is HTTP Requests to the XML documents that do not make sense Asynchronously.  For example I need to know the number of matchups
//    in a given week so that a table of matchups can be created.  Using Asynchronous calls I would make the call and continue on with my code while the
//    script is still making the call.  The trouble is that I need to know the value from the call before I can continue on.  Therefore a Synchrounous
//    call is required.  This is slower than Asynchronous calls because the script must wait until the call is complete.  Furthermore this wouldn't
//    be an issue for one league (normally it is known how many matchups there are in a given week so a constant can be used) however to make the
//    script universal for many leagues where matchups vary greatly it has to be a Synchronous call.
//  Fourth issue pertains to making calls from the football/ip server versus the www server.  If you are on the football/ip server (dynamic server) then
//    calls to baseURLStatic fail.  Likewise if you are on the www server then you will not be able to make calls to baseURLDynamic.
	
	
	
	//ISSUE 2: If no one visits the live scoring summary page then XML will not update.  Therefore begrudgingly we need to force the XML update.
	//         The following two functions and javascript handle this issue
		document.write("<div id='boxscoreHframe' style='position: absolute; top: 2px; left: 2px;'></div>");
		var forceXMLUpdateCount = 0;
		function forceXMLUpdate() {  
			try {
				document.getElementById("boxscoreHframe").innerHTML = "<ifr" + "ame src='" + habBaseURL + "/" + year + "/live_scoring_summary?L=" + league_id +  "&App=bs' style='width: 0; height: 0; border: 0px;'></ifr" + "ame>";
				document.getElementById("boxscoreHframe").innerHTML = "";
			} catch(er) {
				// try again in 60 seconds
			}
			forceXMLUpdateTimer();  //restart the timer
		}
		function forceXMLUpdateTimer() {
			if(forceXMLUpdateCount<60) {  // Reload after 60 seconds
				forceXMLUpdateCount++; 
				setTimeout("forceXMLUpdateTimer()",1000);
			} else {
				forceXMLUpdateCount=0; 
				forceXMLUpdate();  //force the update
			}
		}
		forceXMLUpdate(); //initiate the first call to update
	//ISSUE 2 HANDLED
	
	//ISSUE 3 Synchronous Function Required
		function makeSyncHttpRequest(url,callback_function,fieldTag,setReturn) {  // SJax Function
			var returnArray = new Array();
			sync_http_request = false;
			if (window.XMLHttpRequest) { // Mozilla, Safari,...
				sync_http_request = new XMLHttpRequest();
				if (sync_http_request.overrideMimeType) {
					sync_http_request.overrideMimeType('text/xml');
				}
			} else if (window.ActiveXObject) { // IE
				try {
					sync_http_request = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						sync_http_request = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {}
				}
			}
			if (!sync_http_request) {
				// alert('Giving up - Cannot create an XMLHTTP instance');
				return false;
			}
			sync_http_request.open('GET', url, false);
			sync_http_request.send(null);
			if(sync_http_request.status == 200) {
				var xmldoc = sync_http_request.responseXML;
				if(setReturn) {
					returnArray = eval(callback_function + '(sync_http_request.responseXML)');   
				} else eval(callback_function + '(sync_http_request.responseXML)');   
			}
			if(setReturn) return returnArray;
		}
	// ISSUE 3 HANDLED
		
	//ISSUE 4 Making calls to the XML documents from the football/ip server differ from the www server so I set up my base call here
		if (unescape(location.href).indexOf("http://football")!=-1||unescape(location.href).indexOf("http://6")!=-1)  { 
			var habBaseURL = baseURLDynamic; 
			// update MFL's xmlBaseURL to match the current server
			var xmlBaseURL = baseURLDynamic + '/fflnetdynamic' + year + '/';
		} else {
			var habBaseURL = baseURLStatic;
		}	
	//ISSUE 4 HANDLED
	
	//====================================================================================
	// FUNCTIONS THAT PARSE SYNCHRONOUS CALL TO XML DOCUMENTS
	//====================================================================================
		function parseCBSLeagueInfoResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var league = resultsXML.getElementsByTagName("league");
			try {
				var leagueName = league[0].getAttribute("name");
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			var infoArray = new Array();
			infoArray[0] = league[0].getAttribute("name");
			if(scoreboardLeagueName!="") infoArray[0] = scoreboardLeagueName;
			infoArray[1] = league[0].getAttribute("precision");
			infoArray[2] = "";
			infoArray[3] = league[0].getAttribute("startWeek");
			infoArray[4] = league[0].getAttribute("endWeek");
			infoArray[5] = league[0].getAttribute("lastRegularSeasonWeek");
			var franchises = resultsXML.getElementsByTagName("franchise");
			for(var i=0; i<franchises.length; i++) {
				try {
					var fid  = franchises[i].getAttribute("id");
					var isCommish = franchises[i].getAttribute("iscommish");
					if(isCommish==1) infoArray[2] = fid;
				} catch(er) {
					// do nothing
				}
			}
			infoArray[6] = franchises.length;
			return infoArray;
		}
		function parseCBSWLTResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var franchises = resultsXML.getElementsByTagName("franchise");
			var recordArray = new Array();
			for(var i=0; i<franchises.length; i++) {
				try {
					var fid  = franchises[i].getAttribute("id");
					var wins = franchises[i].getElementsByTagName("h2hw")[0].firstChild.nodeValue;
					var loss = franchises[i].getElementsByTagName("h2hl")[0].firstChild.nodeValue;
					var ties = franchises[i].getElementsByTagName("h2ht")[0].firstChild.nodeValue;
				} catch(er) {
					var wins = 0;
					var loss = 0;
					var ties = 0;
				}
				recordArray[fid] = "("+wins+"-"+loss+"-"+ties+")";  
			}
			return recordArray;
		}		
		function parseCBSLiveScoringMatchupResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			//INITIAL CALL TO LIVE SCORING GRABS INFORMATION FOR WEEKLY MATCHUPS
			//THIS IS ONLY CALLED ON INITIAL SETUP OR FLIPPING FROM ONE WEEK TO ANOTHER
			//RETURNS A SINGLE ARRAY OF WEEKLY MATCHUPS
			var liveScoring = resultsXML.getElementsByTagName("liveScoring");
			try {
				var weekNum = liveScoring[0].getAttribute("week");
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			if(allPlaySetup) { // pick one team and set all the other teams to play against it
				var matchupArray = new Array();
				var franchises = liveScoring[0].getElementsByTagName("franchise");
				for(var i=0; i<franchises.length; i++) { // find my initial franchise and set it as the road team
					if(franchises[i].getAttribute("id")==currentAllPlayTeam) {
						var roadTeam = new Array(franchises[i].getAttribute("id"),franchises[i].getAttribute("score"),franchises[i].getAttribute("gameSecondsRemaining"),franchises[i].getAttribute("playersYetToPlay"),franchises[i].getAttribute("playersCurrentlyPlaying"));
						if(roadTeam[2] == "") roadTeam[2] = "0";
						if(parseInt(roadTeam[3],10)==0&&parseInt(roadTeam[4],10)==0) roadTeam[2] = "0";  // Sometimes there are stray seconds
					}
				}
				var matchupCount=0;
				for(var i=0; i<franchises.length; i++) {
					if(franchises[i].getAttribute("id")!=currentAllPlayTeam) { // start setting up matches
						var homeTeam = new Array(franchises[i].getAttribute("id"),franchises[i].getAttribute("score"),franchises[i].getAttribute("gameSecondsRemaining"),franchises[i].getAttribute("playersYetToPlay"),franchises[i].getAttribute("playersCurrentlyPlaying"));
						if(homeTeam[2] == "") homeTeam[2] = "0";
						if(parseInt(homeTeam[3],10)==0&&parseInt(homeTeam[4],10)==0) homeTeam[2] = "0";  // without anyone left to play
						matchupArray[matchupCount] = new Array();
						matchupArray[matchupCount]['road'] = roadTeam;
						matchupArray[matchupCount]['home'] = homeTeam;
						matchupArray[matchupCount]['gameSecondsRemaining'] = parseInt(roadTeam[2],10) + parseInt(homeTeam[2],10);
						matchupCount++;
					}
				}
			} else { // do regular head to head
				var matchupArray = new Array();
				var matchups = liveScoring[0].getElementsByTagName("matchup");
				for(var i=0; i<matchups.length; i++) {
					var teamData = matchups[i].getElementsByTagName("franchise");
					var roadTeam = new Array(teamData[0].getAttribute("id"),teamData[0].getAttribute("score"),teamData[0].getAttribute("gameSecondsRemaining"),teamData[0].getAttribute("playersYetToPlay"),teamData[0].getAttribute("playersCurrentlyPlaying"));
					var homeTeam = new Array(teamData[1].getAttribute("id"),teamData[1].getAttribute("score"),teamData[1].getAttribute("gameSecondsRemaining"),teamData[1].getAttribute("playersYetToPlay"),teamData[1].getAttribute("playersCurrentlyPlaying"));
					if(roadTeam[0]==myUpdateTeam) myOppUpdateTeam = homeTeam[0];  // used in player update filter
					if(homeTeam[0]==myUpdateTeam) myOppUpdateTeam = roadTeam[0];  // used in player update filter
					if(roadTeam[2] == "") roadTeam[2] = "0";
					if(homeTeam[2] == "") homeTeam[2] = "0";
					if(parseInt(roadTeam[3],10)==0&&parseInt(roadTeam[4],10)==0) roadTeam[2] = "0";  // Sometimes there are stray seconds
					if(parseInt(homeTeam[3],10)==0&&parseInt(homeTeam[4],10)==0) homeTeam[2] = "0";  // without anyone left to play
					matchupArray[i] = new Array();
					matchupArray[i]['road'] = roadTeam;
					matchupArray[i]['home'] = homeTeam;
					matchupArray[i]['gameSecondsRemaining'] = parseInt(roadTeam[2],10) + parseInt(homeTeam[2],10);
				}
			}
			if(matchupArray.length==0) liveScoringEmpty = true;
			return matchupArray;
		}
		function parseCBSLiveScoringResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			//THIS LIVE SCORING CALL IS UPDATED EVERY MINUTE
			//RETURNS A MULTI-DIMENSIONAL ARRAY WITH WEEKLY MATCHUPS AND PLAYER SCORING
			var liveScoring = resultsXML.getElementsByTagName("liveScoring");
			try {
				var weekNum = liveScoring[0].getAttribute("week");
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			// GET TEAM INFO FROM LIVE SCORING INCLUDING TEAM SCORE, SECONDS REMAINING, YTP, CURRENTLY PLAYING
			if(allPlaySetup) { // pick one team and set all the other teams to play against it
				// GET TEAM INFO FROM LIVE SCORING INCLUDING TEAM SCORE, SECONDS REMAINING, YTP, CURRENTLY PLAYING
				var franchises = liveScoring[0].getElementsByTagName("franchise");
				var teamInfo = new Array();
				for(var i=0; i<franchises.length; i++) {
					if(franchises[i].getAttribute("id")==currentAllPlayTeam) {
						var roadTeam = new Array(franchises[i].getAttribute("score"),franchises[i].getAttribute("gameSecondsRemaining"),franchises[i].getAttribute("playersYetToPlay"),franchises[i].getAttribute("playersCurrentlyPlaying"));
						if(roadTeam[1] == "") roadTeam[1] = "0";
						if(parseInt(roadTeam[2],10)==0&&parseInt(roadTeam[3],10)==0) roadTeam[1] = "0";  // Sometimes there are stray seconds
						teamInfo[franchises[i].getAttribute("id")] = new Array();
						teamInfo[franchises[i].getAttribute("id")] = roadTeam;
					}
				}
				for(var i=0; i<franchises.length; i++) {
					if(franchises[i].getAttribute("id")!=currentAllPlayTeam) {
						var homeTeam = new Array(franchises[i].getAttribute("score"),franchises[i].getAttribute("gameSecondsRemaining"),franchises[i].getAttribute("playersYetToPlay"),franchises[i].getAttribute("playersCurrentlyPlaying"));
						if(homeTeam[1] == "") homeTeam[1] = "0";
						if(parseInt(homeTeam[2],10)==0&&parseInt(homeTeam[3],10)==0) homeTeam[1] = "0";  // without anyone left to play
						teamInfo[franchises[i].getAttribute("id")] = new Array();
						teamInfo[franchises[i].getAttribute("id")] = homeTeam;
					}
				}
			} else { // do regular head to head
				var matchups = liveScoring[0].getElementsByTagName("matchup");
				var teamInfo = new Array();
				for(var i=0; i<matchups.length; i++) {
					var teamData = matchups[i].getElementsByTagName("franchise");
					var roadTeam = new Array(teamData[0].getAttribute("score"),teamData[0].getAttribute("gameSecondsRemaining"),teamData[0].getAttribute("playersYetToPlay"),teamData[0].getAttribute("playersCurrentlyPlaying"));
					var homeTeam = new Array(teamData[1].getAttribute("score"),teamData[1].getAttribute("gameSecondsRemaining"),teamData[1].getAttribute("playersYetToPlay"),teamData[1].getAttribute("playersCurrentlyPlaying"));
					if(roadTeam[1] == "") roadTeam[1] = "0";
					if(homeTeam[1] == "") homeTeam[1] = "0";
					if(parseInt(roadTeam[2],10)==0&&parseInt(roadTeam[3],10)==0) roadTeam[1] = "0";  // Sometimes there are stray seconds
					if(parseInt(homeTeam[2],10)==0&&parseInt(homeTeam[3],10)==0) homeTeam[1] = "0";  // without anyone left to play
					teamInfo[teamData[0].getAttribute("id")] = new Array();
					teamInfo[teamData[1].getAttribute("id")] = new Array();
					teamInfo[teamData[0].getAttribute("id")] = roadTeam;
					teamInfo[teamData[1].getAttribute("id")] = homeTeam;
				}
			}
			// GET INDIVIDUAL PLAYER SCORES FROM LIVE SCORING
			var playerScore = resultsXML.getElementsByTagName("player");
			var playerInfo = new Array();
			for(var i=0; i<playerScore.length; i++) {
				var playerID = playerScore[i].getAttribute("id");
				var score = playerScore[i].getAttribute("score");
				playerInfo[playerID] = score;
			}
			var myLiveScoringArray = new Array(teamInfo, playerInfo);
			return myLiveScoringArray;
		}
		function parseCBSRosterDataResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var weeklyResults = resultsXML.getElementsByTagName("weeklyResults");
			try {
				var weekNum = weeklyResults[0].getAttribute("week");
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			if(allPlaySetup) { // pick one team and set all the other teams to play against it
				var franchises = weeklyResults[0].getElementsByTagName("franchise");
				var matchupArray = new Array();
				for(var i=0; i<franchises.length; i++) {
					if(franchises[i].getAttribute("id")==currentAllPlayTeam) {
						try {
							var roadTeam = new Array(franchises[i].getAttribute("nonstarters"),franchises[i].getAttribute("starters"),franchises[i].getAttribute("tiebreaker"));
						} catch(er) {
							var roadTeam = new Array(franchises[i].getAttribute("nonstarters"),franchises[i].getAttribute("starters"));
						}
						matchupArray[franchises[i].getAttribute("id")] = new Array();
						matchupArray[franchises[i].getAttribute("id")] = roadTeam;
						if(futureLineup[franchises[i].getAttribute("id")]==undefined) {
							futureLineup[franchises[i].getAttribute("id")] = new Array();
							futureLineup[franchises[i].getAttribute("id")] = roadTeam;
						}
					}
				}
				for(var i=0; i<franchises.length; i++) {
					if(franchises[i].getAttribute("id")!=currentAllPlayTeam) {
						try {
							var homeTeam = new Array(franchises[i].getAttribute("nonstarters"),franchises[i].getAttribute("starters"),franchises[i].getAttribute("tiebreaker"));
						} catch(er) {
							var homeTeam = new Array(franchises[i].getAttribute("nonstarters"),franchises[i].getAttribute("starters"));
						}
						matchupArray[franchises[i].getAttribute("id")] = new Array();
						matchupArray[franchises[i].getAttribute("id")] = homeTeam;						
						if(futureLineup[franchises[i].getAttribute("id")]==undefined) {
							futureLineup[franchises[i].getAttribute("id")] = new Array();
							futureLineup[franchises[i].getAttribute("id")] = homeTeam;
						}
					}
				}
			} else { // do regular head to head
				var matchups = weeklyResults[0].getElementsByTagName("matchup");
				var matchupArray = new Array();
				for(var i=0; i<matchups.length; i++) {
					var teamData = matchups[i].getElementsByTagName("franchise");
					try {
						var roadTeam = new Array(teamData[0].getAttribute("nonstarters"),teamData[0].getAttribute("starters"),teamData[0].getAttribute("tiebreaker"));
						var homeTeam = new Array(teamData[1].getAttribute("nonstarters"),teamData[1].getAttribute("starters"),teamData[1].getAttribute("tiebreaker"));
						if(hideTiebreakingPlayer||roadTeam[2].length>6||homeTeam[2].length>6) { roadTeam[2]=""; homeTeam[2]=""; }  
					} catch(er) {
						var roadTeam = new Array(teamData[0].getAttribute("nonstarters"),teamData[0].getAttribute("starters"));
						var homeTeam = new Array(teamData[1].getAttribute("nonstarters"),teamData[1].getAttribute("starters"));
					}
					matchupArray[teamData[0].getAttribute("id")] = new Array();
					matchupArray[teamData[1].getAttribute("id")] = new Array();
					matchupArray[teamData[0].getAttribute("id")] = roadTeam;
					matchupArray[teamData[1].getAttribute("id")] = homeTeam;
					if(futureLineup[teamData[0].getAttribute("id")]==undefined) {
						futureLineup[teamData[0].getAttribute("id")] = new Array();
						futureLineup[teamData[0].getAttribute("id")] = roadTeam;
					}
					if(futureLineup[teamData[1].getAttribute("id")]==undefined) {
						futureLineup[teamData[1].getAttribute("id")] = new Array();
						futureLineup[teamData[1].getAttribute("id")] = homeTeam;
					}
				}
			}
			//need to parse the weekly results to update player playing status for the week and also set up future unsubmitted lineups
			for(var fid in matchupArray) {
				if(parseFloat(fid)>0) {
					var playerList=matchupArray[fid][1];
					//STARTERS
					try {
						while (playerList.indexOf(",")>0) {
							var playerID = playerList.substring(0,playerList.indexOf(","));
							if(parseFloat(playerID)>0) {
								if(cbsRosterInfo[playerID]==undefined) {
									cbsRosterInfo[playerID] = new Array();
									cbsRosterInfo[playerID][0] = new Array(fid,"Roster","Starter",fid,"Roster"); 
								} else { //since player may be on more than one roster we need to find which one
									var playerFound = false;
									for(var x=0;x<cbsRosterInfo[playerID].length;x++) {
										if(cbsRosterInfo[playerID][x][0]==fid) {
											cbsRosterInfo[playerID][x][2]="Starter";
											playerFound = true;
										}
									}
									if(playerFound==false) { // add player
										cbsRosterInfo[playerID][cbsRosterInfo[playerID].length] = new Array(fid,"Roster","Starter",fid,"Roster"); 
									}
								}
							}
							playerList = playerList.substring(playerList.indexOf(",")+1,playerList.length);
						}
					} catch(er) {
						// do nothing
					}
					//BENCH
					var playerList=matchupArray[fid][0];
					try {
						while (playerList.indexOf(",")>0)	{
							var playerID = playerList.substring(0,playerList.indexOf(","));
							if(parseFloat(playerID)>0) {
								if(cbsRosterInfo[playerID]==undefined) {
									cbsRosterInfo[playerID] = new Array();
									cbsRosterInfo[playerID][0] = new Array(fid,"Roster","Bench",fid,"Roster"); 
								} else { //since player may be on more than one roster we need to find which one
									var playerFound = false;
									for(var x=0;x<cbsRosterInfo[playerID].length;x++) {
										if(cbsRosterInfo[playerID][x][0]==fid) {
											cbsRosterInfo[playerID][x][2]="Bench";
											playerFound = true;
										}
									}
									if(playerFound==false) { // add player
										cbsRosterInfo[playerID][cbsRosterInfo[playerID].length] = new Array(fid,"Roster","Bench",fid,"Roster"); 
									}
								}
							}
							playerList = playerList.substring(playerList.indexOf(",")+1,playerList.length);
						}
					} catch(er) {
						// do nothing
					}
					//TIEBREAKERS
					var playerID=matchupArray[fid][2];
					try {
						if(parseFloat(playerID)>0) {
							if(cbsRosterInfo[playerID]==undefined) {
								cbsRosterInfo[player] = new Array();
								cbsRosterInfo[playerID][0] = new Array(fid,"Roster","Tiebreaker",fid,"Roster"); 
							} else {  //since player may be on more than one roster we need to find which one
								var playerFound = false;
								for(var x=0;x<cbsRosterInfo[playerID].length;x++) {
									if(cbsRosterInfo[playerID][x][0]==fid) {
										cbsRosterInfo[playerID][x][2]="Tiebreaker";
										playerFound = true;
									}
								}
								if(playerFound==false) { // add player
									cbsRosterInfo[playerID][cbsRosterInfo[playerID].length] = new Array(fid,"Roster","Tiebreaker",fid,"Roster"); 
								}
							}
						}
					} catch(er) {
						// do nothing
					}
				}
			}	
			return matchupArray;
		}
		function parseCBSPlayerInfoResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var players = resultsXML.getElementsByTagName("players");
			try {
				var playertimestamp = players[0].getAttribute("timestamp");
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			var player = resultsXML.getElementsByTagName("player");
			var playerArray = new Array();
			for(var i=0; i<player.length; i++) {
				var playerID = player[i].getAttribute("id");
				playerArray[playerID] = new Array(formatName(player[i].getAttribute("name")), player[i].getAttribute("team"), player[i].getAttribute("position"));
			}
			return playerArray;
		}
		function parseCBSInjuryInfoResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var injuries = resultsXML.getElementsByTagName("injuries");
			try {
				var week = injuries[0].getAttribute("week");
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			var injury = resultsXML.getElementsByTagName("injury");
			var injuryArray = new Array();
			for(var i=0; i<injury.length; i++) {
				var playerID = injury[i].getAttribute("id");
				try {
					injuryStatus = injury[i].getAttribute("status");
					injuryDetail = formatEscapeCharacter(injury[i].getAttribute("details"));
					if(injuryStatus=="IR") var injuryCode = "IR"; else var injuryCode = injuryStatus.substring(0,1);
					injuryArray[playerID] = new Array(injuryCode, injuryStatus, injuryDetail);
				} catch(er) {
					// do nothing
				}
			}
			return injuryArray;
		}
		function parseCBSRosterResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var franchise = resultsXML.getElementsByTagName("franchise");
			try {
				var franchises = franchise.length;
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			var playerArray = new Array();
			for(var i=0; i<franchise.length; i++) {
				var fid = franchise[i].getAttribute("id");
				var player = franchise[i].getElementsByTagName("player");
				for(var j=0;j<player.length; j++) {
					var playerID = player[j].getAttribute("id");
					var statusID = player[j].getAttribute("status")
					try {
						var status = statusID;
						if(statusID=="ROSTER") status="Roster";
						if(statusID=="TAXI_SQUAD") status="Taxi Squad";
						if(statusID=="INJURED_RESERVE") status="IR";
						if(status=="Roster") var playingStatus="Bench"; else var playingStatus=status;
						try {
							var newPlayerCount = playerArray[playerID].length;
						} catch(er) {
							playerArray[playerID] = new Array();
							var newPlayerCount = 0;
						}
						playerArray[playerID][newPlayerCount] = new Array(fid,status,playingStatus,fid,status);  // the 2nd fid & status are needed to record original value of a player since it may change when weeks are flipped
					} catch(er) {
						// do nothing
					}
				}
			}
			return playerArray;
		}
		function parseFSProjectionsResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var projectedScores = resultsXML.getElementsByTagName("playerScore");
			try {
				var players = projectedScores.length;
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			var scoreArray = new Array();
			for(var i=0; i<projectedScores.length; i++) {
				var playerID = projectedScores[i].getAttribute("id");
				var	playerScore = projectedScores[i].getAttribute("score");
                                if(playerScore.length==0) playerScore=0;
				scoreArray[playerID]=playerScore;
			}
			return scoreArray;
		}
		function parseCBSNFLScheduleResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var nflSchedule = resultsXML.getElementsByTagName("nflSchedule");
			try {
				var weekNum = nflSchedule[0].getAttribute("week");
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			var matchups = nflSchedule[0].getElementsByTagName("matchup");
			var matchupArray = new Array();
			for(var i=0; i<matchups.length; i++) {
				var secondsRemaining = matchups[i].getAttribute("gameSecondsRemaining");
				var kickoffTime = matchups[i].getAttribute("kickoff");
				var teamData = matchups[i].getElementsByTagName("team");
				var roadTeamID = teamData[0].getAttribute("id");
				var homeTeamID = teamData[1].getAttribute("id");
				var roadScore = teamData[0].getAttribute("score");
				var homeScore = teamData[1].getAttribute("score");
				//problem at kickoff where secondsRemaining = 0; will correct by checking game score
				if((parseInt(roadScore)==0||roadScore=="")&&(parseInt(homeScore)==0||homeScore=="")&&(parseInt(secondsRemaining)==0||secondsRemaining=="")) secondsRemaining=3600;
				var roadPossession = teamData[0].getAttribute("hasPossession");
				var homePossession = teamData[1].getAttribute("hasPossession");
				var roadRedzone = teamData[0].getAttribute("inRedZone");
				var homeRedzone = teamData[1].getAttribute("inRedZone");
				//need to marry home to road and vice versa
				var roadPassOffRank = teamData[1].getAttribute("passOffenseRank");
				var homePassOffRank = teamData[0].getAttribute("passOffenseRank");
				var roadRushOffRank = teamData[1].getAttribute("rushOffenseRank");
				var homeRushOffRank = teamData[0].getAttribute("rushOffenseRank");			
				var roadPassDefRank = teamData[1].getAttribute("passDefenseRank");
				var homePassDefRank = teamData[0].getAttribute("passDefenseRank");
				var roadRushDefRank = teamData[1].getAttribute("rushDefenseRank");
				var homeRushDefRank = teamData[0].getAttribute("rushDefenseRank");
				var roadAvgOffRank = parseInt((parseInt(roadPassOffRank)+parseInt(roadRushOffRank))/2);
				var homeAvgOffRank = parseInt((parseInt(homePassOffRank)+parseInt(homeRushOffRank))/2);
				var roadAvgDefRank = parseInt((parseInt(roadPassDefRank)+parseInt(roadRushDefRank))/2);
				var homeAvgDefRank = parseInt((parseInt(homePassDefRank)+parseInt(homeRushDefRank))/2);
				var roadImage = "";
				var homeImage = "";
				if(roadRedzone==1) roadImage="<img src='"+redZoneImage+"' alt='"+roadTeamID+" is in the Redzone' title='"+roadTeamID+" is in the Redzone' />";
				if(homeRedzone==1) homeImage="<img src='"+redZoneImage+"' alt='"+homeTeamID+" is in the Redzone' title='"+homeTeamID+" is in the Redzone' />";
				if(roadImage==""&&roadPossession==1) roadImage="<img src='"+hasBallImage+"' alt='"+roadTeamID+" has possession' title='"+roadTeamID+" has possession' />";
				if(homeImage==""&&homePossession==1) homeImage="<img src='"+hasBallImage+"' alt='"+homeTeamID+" has possession' title='"+homeTeamID+" has possession' />";
				var scoreClock = "";
				if (parseInt(secondsRemaining)==0) scoreClock = "Final";
				if (parseInt(secondsRemaining)==3600) scoreClock = formatDateTime(kickoffTime);
				if (parseInt(secondsRemaining)==1800) scoreClock = "Half";
				if (parseInt(secondsRemaining)>0&&parseInt(secondsRemaining)<900) scoreClock = "4Q " + formatAsMinutes(parseInt(secondsRemaining));
				if (parseInt(secondsRemaining)>=900&&parseInt(secondsRemaining)<1800) scoreClock = "3Q " + formatAsMinutes(parseInt(secondsRemaining)-900);
				if (parseInt(secondsRemaining)>1800&&parseInt(secondsRemaining)<2700) scoreClock = "2Q " + formatAsMinutes(parseInt(secondsRemaining)-1800);
				if (parseInt(secondsRemaining)>=2700&&parseInt(secondsRemaining)<3600) scoreClock = "1Q " + formatAsMinutes(parseInt(secondsRemaining)-2700);
				if (useNFLIcons) {
					var roadNFLIcon = getNFLBoxscoreIcon(roadTeamID);
					var homeNFLIcon = getNFLBoxscoreIcon(homeTeamID);
					var roadStatus = " " + roadScore + "&nbsp;@&nbsp;<img src='" + homeNFLIcon[0] + "' title='"+homeNFLIcon[1]+"' />&nbsp;" + homeScore;
					var homeStatus = " " + homeScore + "&nbsp;vs&nbsp;<img src='" + roadNFLIcon[0] + "' title='"+roadNFLIcon[1]+"' />&nbsp;" + roadScore;
				} else {
					var roadStatus = " " + roadScore + "&nbsp;@&nbsp;" + homeTeamID + "&nbsp;" + homeScore;
					var homeStatus = " " + homeScore + "&nbsp;v&nbsp;" + roadTeamID + "&nbsp;" + roadScore;
				}
				if(secondsRemaining==3600) {
					var gameLink = getGameLink(roadTeamID,homeTeamID,kickoffTime,0);
				} else {
					var gameLink = getGameLink(roadTeamID,homeTeamID,kickoffTime,1);
				}
				matchupArray[roadTeamID] = new Array(roadStatus, secondsRemaining, kickoffTime, scoreClock, roadImage, roadPassOffRank, roadRushOffRank, roadAvgOffRank, roadPassDefRank, roadRushDefRank, roadAvgDefRank, gameLink);
				matchupArray[homeTeamID] = new Array(homeStatus, secondsRemaining, kickoffTime, scoreClock, homeImage, homePassOffRank, homeRushOffRank, homeAvgOffRank, homePassDefRank, homeRushDefRank, homeAvgDefRank, gameLink);
			}
			return matchupArray;
		}
		function parseCBSNFLBoxScheduleResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
			var nflSchedule = resultsXML.getElementsByTagName("nflSchedule");
			try {
				var weekNum = nflSchedule[0].getAttribute("week");
				habXMLSuccess = true;
			} catch(er) {
				//Did not successfully grab XML data so return and re-try
				habXMLAttempt += 1;
				habXMLSuccess = false;
				return -1;
			}
			var matchups = nflSchedule[0].getElementsByTagName("matchup");
			var matchupArray = new Array();
			for(var i=0; i<matchups.length; i++) {
				var secondsRemaining = matchups[i].getAttribute("gameSecondsRemaining");
				var kickoffTime = matchups[i].getAttribute("kickoff");
				var teamData = matchups[i].getElementsByTagName("team");
				var roadTeamID = teamData[0].getAttribute("id");
				var homeTeamID = teamData[1].getAttribute("id");
				var roadScore = teamData[0].getAttribute("score");
				var homeScore = teamData[1].getAttribute("score");
				//problem at kickoff where secondsRemaining = 0; will correct by checking game score
				if((parseInt(roadScore)==0||roadScore=="")&&(parseInt(homeScore)==0||homeScore=="")&&(parseInt(secondsRemaining)==0||secondsRemaining=="")) secondsRemaining=3600;
				var roadPossession = teamData[0].getAttribute("hasPossession");
				var homePossession = teamData[1].getAttribute("hasPossession");
				var roadRedzone = teamData[0].getAttribute("inRedZone");
				var homeRedzone = teamData[1].getAttribute("inRedZone");
				var roadInfo = getNFLBoxscoreIcon(roadTeamID);
				var homeInfo = getNFLBoxscoreIcon(homeTeamID);
				var roadImage = "";
				var homeImage = "";
				if(roadRedzone==1) roadImage="<img src='"+redZoneImage+"' alt='"+roadTeamID+" is in the Redzone' title='"+roadTeamID+" is in the Redzone' />";
				if(homeRedzone==1) homeImage="<img src='"+redZoneImage+"' alt='"+homeTeamID+" is in the Redzone' title='"+homeTeamID+" is in the Redzone' />";
				if(roadImage==""&&roadPossession==1) roadImage="<img src='"+hasBallImage+"' alt='"+roadTeamID+" has possession' title='"+roadTeamID+" has possession' />";
				if(homeImage==""&&homePossession==1) homeImage="<img src='"+hasBallImage+"' alt='"+homeTeamID+" has possession' title='"+homeTeamID+" has possession' />";
				var scoreClock = "";
				if (parseInt(secondsRemaining)==0) scoreClock = "Final";
				if (parseInt(secondsRemaining)==3600) scoreClock = formatDateTime(kickoffTime);
				if (parseInt(secondsRemaining)==1800) scoreClock = "Half";
				if (parseInt(secondsRemaining)>0&&parseInt(secondsRemaining)<900) scoreClock = "4Q " + formatAsMinutes(parseInt(secondsRemaining));
				if (parseInt(secondsRemaining)>=900&&parseInt(secondsRemaining)<1800) scoreClock = "3Q " + formatAsMinutes(parseInt(secondsRemaining)-900);
				if (parseInt(secondsRemaining)>1800&&parseInt(secondsRemaining)<2700) scoreClock = "2Q " + formatAsMinutes(parseInt(secondsRemaining)-1800);
				if (parseInt(secondsRemaining)>=2700&&parseInt(secondsRemaining)<3600) scoreClock = "1Q " + formatAsMinutes(parseInt(secondsRemaining)-2700);
				matchupArray[i] = new Array();
				matchupArray[i]['road'] = new Array(roadTeamID, roadScore, secondsRemaining, kickoffTime, scoreClock, roadImage, roadInfo[0], roadInfo[1]);
				matchupArray[i]['home'] = new Array(homeTeamID, homeScore, secondsRemaining, kickoffTime, scoreClock, homeImage, homeInfo[0], homeInfo[1]);
			}
			fullyLoaded=true;
			return matchupArray;
		}

	//====================================================================================
	//FUNCTIONS THAT CREATE HTML SCRIPT
	//====================================================================================
		//creating the individual scoreboards for the matchups in a given week (each call creates one scoreboard)
		function createWeeklyNavigation() {
			var htmlCode = "";
			
			if(includeHabChat) var habChatLink = "&nbsp;&nbsp;&nbsp;<a href='#' onclick='startChat_CBS()'><span id='habChatImage_CBS'><img src='"+habChatIconOnline+"' border='0' title='Open Chatroom' /></span></a>"; else var habChatLink = "";
			if(franchise_id==undefined||franchise_id=="") {
				var loginLink = '&nbsp;&nbsp;&nbsp;<span id="logintab" title="Login"><a id="various1" href="#inline1"><img src="'+loginIcon+'" border="0" style="vertical-align:top;" /></a></span>';;
				var lineupLink = '';
			} else {
				var loginLink = '';
				var lineupLink = '&nbsp;&nbsp;&nbsp;<span id="lineuptab" title="Submit Lineup"><a id="various2" href="#inline2"><img src="'+lineupIcon+'" border="0" style="vertical-align:top;" /></a></span>';
			}
			var wsisLink = ''; //'&nbsp;&nbsp;&nbsp;<span id="wsistab" title="Who Should I Start"><a id="various3" href="#inline3"><img src="'+wsisIcon+'" border="0" style="vertical-align:top;" /></a></span>';
			var myNewsLink = '&nbsp;&nbsp;&nbsp;<span id="mynewstab" title="My Player News"><a id="various3" href="#inline3"><img src="'+myNewsIcon+'" border="0" style="vertical-align:top;" /></a></span>';
			var myNFLVideoLink = '&nbsp;&nbsp;&nbsp;<span id="mynewstab" title="Current NFL Video Hilites"><a id="various4" href="#inline4"><img src="'+nflVideoIcon+'" border="0" style="vertical-align:top;" /></a></span>';
			
			htmlCode = htmlCode + "       <table class='cbsWeeklyNavigation'>\n";
			htmlCode = htmlCode + "        <tr>\n";
			htmlCode = htmlCode + "         <td width='1%' style='border-right:0px;'>\n";
			htmlCode = htmlCode + "          <div id='mobilelink'"+mobileLinkStyle+"><a href='#' onclick='goMobile()'><img src='"+mobileImage+"' border='0' title='Go Mobile' /></a>"+habChatLink+loginLink+lineupLink+wsisLink+myNewsLink+myNFLVideoLink+"</div>";
			htmlCode = htmlCode + "         </td>\n";
			htmlCode = htmlCode + "         <td style='border-left:0px; border-right:0px;'>Live Scoring Week:&nbsp;&nbsp;\n";
			for (var i=parseInt(cbsLeagueInfo[3]);i<=parseInt(cbsLeagueInfo[4]); i++) {
				if(i==cbsCurrentWeek) {
					htmlCode = htmlCode + "<span class='navWeekCurr'>&nbsp;" + i + "&nbsp;</span>";
				} else {
					if(i>parseInt(cbsLeagueInfo[5])&&liveScoringWeek<parseInt(cbsLeagueInfo[5])) { // if week > lastRegularSeasonWeek and MFL's liveWeek < lastRegularSeasonWeek then create inactive link to playoff game
						htmlCode = htmlCode + "<span class='navWeekInactive'>&nbsp;P" + i + "&nbsp;</span>";
					} else {
						htmlCode = htmlCode + "<span class='navWeekLink'><a href='#' onclick=\"updateCurrentWeek('"+i+"')\">&nbsp;" + i + "&nbsp;</a></span>";
					}
				}
				if(i!=parseInt(cbsLeagueInfo[4])) htmlCode = htmlCode + " | ";
			}
			htmlCode = htmlCode + "         </td>\n";
			htmlCode = htmlCode + "         <td width='1%' style='border-left:0px; font-weight:bold'>"+versionNumber+"&nbsp;\n";
			htmlCode = htmlCode + "         </td>\n";
			htmlCode = htmlCode + "        </tr>\n";
			htmlCode = htmlCode + "       </table>\n";
			return htmlCode;
		}
		//creating the individual scoreboards for the fantasy matchups in a given week (each call creates one scoreboard)
		function createCBSMatchupTable(matchupInfo,which) {
			try {
				doubleHeader[matchupInfo[which]['road'][0]]++;
				doubleHeader[matchupInfo[which]['home'][0]]++;
			} catch(er) {
				// must be an empty boxscore
			}
			var htmlCode = "";
			if(which<matchupInfo.length) {
				//the following code will attempt to set the intial game to hilight to the current active users game
				if(matchupInfo[which]['road'][0]==franchise_id||matchupInfo[which]['road'][0]==commishfranchise_id||matchupInfo[which]['home'][0]==franchise_id||matchupInfo[which]['home'][0]==commishfranchise_id) currentGameHilighted=which;
				if(useNicknamesInScoreboard) {
					if(matchupInfo[which]['road'][0]=="BYE") {
						var roadName = "BYE&nbsp;";
						var roadTitle = " title='BYE WEEK TEAM'";
					} else {
						if(matchupInfo[which]['road'][0]=="AVG") {
							var roadName = "AVG&nbsp;";
							var roadTitle = " title='LEAGUE AVG TEAM'";
						} else {
							var roadName = franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].abbrev+"&nbsp;";
							var roadTitle = " title='"+formatEscapeCharacter(franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].name)+"'";
						}
					}
					if(matchupInfo[which]['home'][0]=="BYE") {
						var homeName = "BYE&nbsp;";
						var homeTitle = " title='BYE WEEK TEAM'";
					} else {
						if(matchupInfo[which]['home'][0]=="AVG") {
							var homeName = "AVG&nbsp;";
							var homeTitle = " title='LEAGUE AVG TEAM'";
						} else {
							var homeName = franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].abbrev+"&nbsp;";
							var homeTitle = " title='"+formatEscapeCharacter(franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].name)+"'";
						}
					}
				} else {
					if(matchupInfo[which]['road'][0]=="BYE") {
						var roadName = "BYE";
					} else {
						if(matchupInfo[which]['road'][0]=="AVG") {
							var roadName = "AVG";
						} else {
							var roadName = formatEscapeCharacter(franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].name);
						}
					}
					if(matchupInfo[which]['home'][0]=="BYE") {
						var homeName = "BYE";
					} else {
						if(matchupInfo[which]['home'][0]=="AVG") {
							var homeName = "AVG";
						} else {
							var homeName = formatEscapeCharacter(franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].name);
						}
					}
					var roadTitle="";
					var homeTitle="";
				}
				htmlCode = htmlCode + "       <table class='cbsGameTable'>\n";
				htmlCode = htmlCode + "        <tr><td rowspan='2' class='matchupLolite' title='View Game Score' id='matchup_" + which + "' onclick='setCBSMatchup(" + which + ")'>&nbsp;&nbsp;</td><td style='text-align:left; padding-left:3px;'"+roadTitle+">" + roadName + "</td><td style='text-align:right; padding-right:3px;' id='fid_" + matchupInfo[which]['road'][0] + doubleHeader[matchupInfo[which]['road'][0]]+"'"+roadTitle+"></td></tr>\n";
				htmlCode = htmlCode + "        <tr><td style='text-align:left; padding-left:3px;'"+homeTitle+">" + homeName + "</td><td style='text-align:right; padding-right:3px;' id='fid_" + matchupInfo[which]['home'][0] + doubleHeader[matchupInfo[which]['home'][0]]+"'"+homeTitle+"></td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
			} else {
				htmlCode = htmlCode + "       <table class='cbsGameTableInactive'>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
			}
			return htmlCode;
		}
		//creating the individual scoreboards for the NFL matchups in a given week (each call creates one scoreboard)
		function createNFLCBSMatchupTable(matchupInfo,which) {
			var htmlCode = "";
			if(which<matchupInfo.length) {
				htmlCode = htmlCode + "       <table class='cbsNFLGameTable' style='border:1px solid silver; width:100%'>\n";
				htmlCode = htmlCode + "        <tr><td style='text-align:left;' title='"+matchupInfo[which]['road'][7]+"'>&nbsp;<img src='" + matchupInfo[which]['road'][6] + "' /></td><td style='text-align:center' id='ballfid_" + matchupInfo[which]['road'][0] +"'>&nbsp;</td><td style='text-align:right' id='fid_" + matchupInfo[which]['road'][0] +"'>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td style='text-align:left;' title='"+matchupInfo[which]['home'][7]+"'>&nbsp;<img src='" + matchupInfo[which]['home'][6] + "' /></td><td style='text-align:center' id='ballfid_" + matchupInfo[which]['home'][0] +"'>&nbsp;</td><td style='text-align:right' id='fid_" + matchupInfo[which]['home'][0] +"'>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td colspan='3' style='text-align:center;' id='nfl_"+matchupInfo[which]['home'][0]+"'>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
			} else {
				htmlCode = htmlCode + "       <table class='cbsNFLGameTableInactive'>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td colspan='3'>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
			}
			return htmlCode;
		}
		//creating the boxscore tables main container
		function createBoxScoreTables() {
			//Set/Reset double header array
			setupDoubleHeaderArray();
			//cbsLiveScoringMatchups has been defined as a global var
			cbsLiveScoringMatchups = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+cbsCurrentWeek+"&rand=" + Math.random() , 'parseCBSLiveScoringMatchupResultsXML','liveScoring',true);
			var boxHTML = "   <table class='cbsGameLinks'>\n";
			if(liveScoringEmpty) { //MFL must have cleared out the XML document
				boxHTML = boxHTML + "    <tr>\n";
				boxHTML = boxHTML + "     <td style='font-size:15px'>\n";
				boxHTML = boxHTML + "     <center><br /><br />MFL LiveScoring is temporarily suspended as all server resources are being used to accept late lineup submissions.<br /><br />The scoreboard is not broken as this is typical before early kickoff times.<br /><br />Please refresh this page closer to kickoff to view the scoreboard in its entirety.<br /><br /></center>\n";
				boxHTML = boxHTML + "     </td>\n";
				boxHTML = boxHTML + "    </tr>\n";
				boxHTML = boxHTML + "   </table>\n";
			} else {
				if(matchupsPerRow>cbsLiveScoringMatchups.length) matchupsPerRow=cbsLiveScoringMatchups.length;
				var tableRows = parseInt((cbsLiveScoringMatchups.length+(matchupsPerRow-0.5))/matchupsPerRow);  //calculate the number of table rows required for this league
				for(var x=0; x<tableRows;x++) {
					boxHTML = boxHTML + "    <tr>\n";
					for(var y=0; y<matchupsPerRow;y++) {
						boxHTML = boxHTML + "     <td>\n";
						var currentMatchup = parseInt(x*matchupsPerRow+y);
						var matchupTable = createCBSMatchupTable(cbsLiveScoringMatchups,currentMatchup);
						boxHTML = boxHTML + matchupTable;
						boxHTML = boxHTML + "     </td>\n";
					}
					boxHTML = boxHTML + "    </tr>\n";
				}
				boxHTML = boxHTML + "   </table>\n";
			}
			return boxHTML;
		}
		function createNFLBoxScoreTables() {
			var boxHTML = "   <table class='cbsGameLinks'>\n";
			//cbsNFLLiveScoringMatchups has been defined as a global var
			cbsNFLLiveScoringMatchups = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=nflSchedule&L="+league_id+"&W="+cbsCurrentWeek+"&rand=" + Math.random() , 'parseCBSNFLBoxScheduleResultsXML','nflSchedule',true);
			boxHTML = boxHTML + "    <tr>\n";
			for(var x=0; x<cbsNFLLiveScoringMatchups.length;x++) {
				boxHTML = boxHTML + "     <td>\n";
				var matchupTable = createNFLCBSMatchupTable(cbsNFLLiveScoringMatchups,x);
				boxHTML = boxHTML + matchupTable;
				boxHTML = boxHTML + "     </td>\n";
			}
			boxHTML = boxHTML + "    </tr>\n";
			boxHTML = boxHTML + "   </table>\n";
			return boxHTML;
		}		
		//creating main scoreboard table
		function createMainScoreboardTable() {
			var scoreboardHTML = "   <table class='cbsMainScoreboard'>\n";
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			switch(scoreboardLayout) {
				case 0:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' style='display:none'></td>"; break;
				case 1:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' id='cbsRoadLogo'></td>"; break;
				case 2:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' id='cbsRoadLogo'></td>"; break;
				case 3: scoreboardHTML = scoreboardHTML + "     <td rowspan='5' style='display:none'></td>"; break;
				case 4:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' style='display:none'></td>"; break;
				default: // do nothing
			}
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadTeamName'></td>";
			scoreboardHTML = scoreboardHTML + "     <td colspan='7' rowspan='2' id='cbsCenterTop'></td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomeTeamName'></td>";
			switch(scoreboardLayout) {
				case 0:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' style='display:none'></td>"; break;
				case 1:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' id='cbsHomeLogo'></td>"; break;
				case 2:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' id='cbsHomeLogo'></td>"; break;
				case 3:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' style='display:none'></td>"; break;
				case 4:	scoreboardHTML = scoreboardHTML + "     <td rowspan='5' style='display:none'></td>"; break;
				default: // do nothing
			}
			scoreboardHTML = scoreboardHTML + "    </tr>\n";
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadTeamRecord'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomeTeamRecord'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "    </tr>\n";			
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td rowspan='3' id='cbsRoadScore' style='white-space:nowrap'>&nbsp;</td>"; 	
			scoreboardHTML = scoreboardHTML + "     <td colspan='7' id='cbsScoreboardMessage'><span id='cbsScoreboardMessageResetTimer' onclick='setCBSMatchup("+currentGameHilighted+")' style='background-color:red; color:white;'>&nbsp;CLICK HERE TO START&nbsp;</span></td>"; 
			scoreboardHTML = scoreboardHTML + "     <td rowspan='3' id='cbsHomeScore' style='white-space:nowrap'>&nbsp;</td>"; 	
			scoreboardHTML = scoreboardHTML + "    </tr>\n";
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Currently Playing'>P</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Yet to Play'>YTP</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Player Minutes Remaining'>PMR</td>";
			scoreboardHTML = scoreboardHTML + "     <td rowspan='2' id='cbsBlank' onclick='setMatchupsToDisplay(true);' style='cursor:pointer; text-align:center;' title='Flip Matchups'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Player Minutes Remaining'>PMR</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Yet to Play'>YTP</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Currently Playing'>P</td>";
			scoreboardHTML = scoreboardHTML + "    </tr>\n";	
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadPlayers' title='Players Currently Playing'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadYTP' title='Players Yet to Play'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadPMR' title='Player Minutes Remaining'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomePMR' title='Player Minutes Remaining'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomeYTP' title='Players Yet to Play'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomePlayers' title='Players Currently Playing'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "    </tr>\n";
	
			scoreboardHTML = scoreboardHTML + "   </table>\n";
			return scoreboardHTML;
		}
		//creating the table where the players for each team appear
		function cbsPopulateLineupTable(liveScoring,which,nflSchedule) {
			var tiebreakingPlayer = "";
			myTable = "<table class='cbsTeamLineup'>\n";
				for(var i=0;i<3;i++) {
					switch(i) {
						case 0 : var playerList=rosterData[which][1];  // starter
								 var headerTitle="Starters";
								 //if (playerList==""||playerList==null) alert(playerList + " " + cbsCurrentWeek + " " + liveScoringWeek);
								 if((playerList==""||playerList==null)&&cbsCurrentWeek>liveScoringWeek) { 
									playerList = futureLineup[which][1];
									headerTitle="Starters based on last Submission";
								 }
								 var playingStatus="Starter";
								 var doTotals = includeStarterTotals;
								 break;
						case 1 : var playerList=rosterData[which][2]; // tiebreaker
								 var headerTitle="Tiebreaker";
								 if(playerList!="") playerList = playerList + ","; 
								 if((playerList==""||playerList==null)&&cbsCurrentWeek>liveScoringWeek) { 
									playerList = futureLineup[which][2];
									if(playerList!="") playerList = playerList + ",";
									headerTitle="Tiebreaker based on last Submission";
								 }
								 var playingStatus="Tiebreaker";
								 var doTotals = false;
								 break;
						case 2 : var playerList=rosterData[which][0];  // bench
								 var headerTitle="Bench";
								 if((playerList==""||playerList==null)&&cbsCurrentWeek>liveScoringWeek) { 
									playerList = futureLineup[which][0];
									headerTitle="Bench based on last Submission";
								 }
								 var playingStatus="Bench";
								 var doTotals = includeBenchTotals;
								 break;
						default: break;
					}
					var tableRows = new Array();
					var rowCount = 0;
					var tableTotals = 0;
					var tableProjTotals = 0;
					try {
						while (playerList.indexOf(",")>0)	{
							var playerID = playerList.substring(0,playerList.indexOf(","));
							if(i==1) tiebreakingPlayer=playerID;
							if(i!=2||(i==2&&playerID!=tiebreakingPlayer)) { // tiebreaking player also in bench list
								if(cbsRosterInfo[playerID]==undefined) {
									cbsRosterInfo[playerID] = new Array();
									cbsRosterInfo[playerID][0] = new Array(which,"Roster",playingStatus,which,"Roster");
								} else { //since player may be on more than one roster we need to find which one
									var playerFound = false;
									for(var x=0;x<cbsRosterInfo[playerID].length;x++) {
										if(cbsRosterInfo[playerID][x][0]==which) {
											cbsRosterInfo[playerID][x][2]=playingStatus;
											playerFound = true;
										}
									}
									if(playerFound==false) { // add player
										cbsRosterInfo[playerID][cbsRosterInfo[playerID].length] = new Array(which,"Roster",playingStatus,fid,"Roster"); 
									}
								}
								try {  // if player is not on the injury report then playerID fails
									var injury="&nbsp;(<span class='injuredPlayer' title='" + cbsInjuryInfo[playerID][1] + ": " + cbsInjuryInfo[playerID][2] + "'>" + cbsInjuryInfo[playerID][0] + "</span>)";
								} catch(er) {
									var injury = "";
								}
								try {  // if player is a free agent then NFL ID fails
									var nflGameDetail = nflSchedule[cbsPlayerInfo[playerID][1]][0];
									var	nflHasBall = nflSchedule[cbsPlayerInfo[playerID][1]][4];
									var nflGameStatus = nflSchedule[cbsPlayerInfo[playerID][1]][3];
									var nflSecondsRemaining = nflSchedule[cbsPlayerInfo[playerID][1]][1];
									var nflPassOffRank = nflSchedule[cbsPlayerInfo[playerID][1]][5];
									var nflRushOffRank = nflSchedule[cbsPlayerInfo[playerID][1]][6];
									var nflAvgOffRank = nflSchedule[cbsPlayerInfo[playerID][1]][7];
									var nflPassDefRank = nflSchedule[cbsPlayerInfo[playerID][1]][8];
									var nflRushDefRank = nflSchedule[cbsPlayerInfo[playerID][1]][9];
									var nflAvgDefRank = nflSchedule[cbsPlayerInfo[playerID][1]][10];
								} catch(er) {
									var nflGameDetail = "";
									var nflHasBall = "";
									var nflGameStatus = "";
									var nflSecondsRemaining = 0;
									var nflPassOffRank = 0;
									var nflRushOffRank = 0;
									var nflAvgOffRank = 0;
									var nflPassDefRank = 0;	
									var nflRushDefRank = 0;
									var nflAvgDefRank = 0;
								}
								if (liveScoring[1][playerID]!=undefined) var pointsEarned = parseFloat(liveScoring[1][playerID]).toFixed(precision); else var pointsEarned = 0;
								tableTotals = tableTotals + parseFloat(pointsEarned);
								if (includeProjections) {
									if (fsProjections[playerID]==undefined) var projections = "<td class='cbsPlayerProjections'>"+parseFloat(0).toFixed(precision)+"&nbsp;</td>"; else { var projections = "<td class='cbsPlayerProjections'>"+parseFloat(fsProjections[playerID]).toFixed(precision)+"&nbsp;</td>"; tableProjTotals = tableProjTotals + parseFloat(fsProjections[playerID]); }
								} else var projections="";
								if (includeSOS) {
									var rankNumber = 0;
									var rankDescription = "";
									var SOS = "<td class='oppRankNA'>&nbsp;</td>";
							
									if(playerPosType(playerID)=="OffPass") { rankNumber = nflPassDefRank; rankDescription = "Opponent Rank Against the Pass"; }
									if(playerPosType(playerID)=="OffRush") { rankNumber = nflRushDefRank; rankDescription = "Opponent Rank Against the Run"; }
									if(playerPosType(playerID)=="OffAvg")  { rankNumber = nflAvgDefRank;  rankDescription = "Opponent Defense Rank"; }
									if(playerPosType(playerID)=="DefPass") { rankNumber = nflPassOffRank; rankDescription = "Opponent Rank Passing"; }
									if(playerPosType(playerID)=="DefRush") { rankNumber = nflRushOffRank; rankDescription = "Opponent Rank Rushing"; }
									if(playerPosType(playerID)=="DefAvg")  { rankNumber = nflAvgOffRank;  rankDescription = "Opponent Offense Rank"; }
							
									if(rankNumber==0) SOS = "<td class='oppRankNA'>&nbsp;</td>";
									if(rankNumber>=1&&rankNumber<=6) SOS = "<td class='oppRankBadMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;' title='"+rankDescription+" - BAD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
									if(rankNumber>=7&&rankNumber<=12) SOS = "<td class='oppRankPoorMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;' title='"+rankDescription+" - POOR Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
									if(rankNumber>=13&&rankNumber<=20) SOS = "<td class='oppRankAvgMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;' title='"+rankDescription+" - NEUTRAL Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
									if(rankNumber>=21&&rankNumber<=26) SOS = "<td class='oppRankGoodMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;' title='"+rankDescription+" - GOOD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
									if(rankNumber>=27&&rankNumber<=32) SOS = "<td class='oppRankGreatMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;' title='"+rankDescription+" - GREAT Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								} else var SOS = "";
								if(includeNewsBreakers) {
									var newsIcon = "&nbsp;"+getNewsIconAddon(playerID.toString());
								} else var newsIcon = "";
								if(parseFloat(playerUpdates[0][playerID])!=parseFloat(playerUpdates[1][playerID])) { 
									if(parseFloat(playerUpdates[0][playerID])>parseFloat(playerUpdates[1][playerID])) { 
										var thisPlayerUpdate = "<img src='"+recentUpdateImage+"' alt='player has a recent point gain'  title='player has a recent point gain' />";
									} else {
										var thisPlayerUpdate = "<img src='"+recentNegativeUpdateImage+"' alt='player has a recent point loss'  title='player has a recent point loss' />";
									}
								} else var thisPlayerUpdate = "";
								var rowStyle=" class='rowCurrentlyPlaying'";
								if (parseInt(nflSecondsRemaining)==0) rowStyle=" class='rowGameOver'";
								if (parseInt(nflSecondsRemaining)==3600) rowStyle=" class='rowYTP'";
								try {
									if(useNFLIcons) {
										var NFLIcon = getNFLBoxscoreIcon(cbsPlayerInfo[playerID][1]);
										var nflTeamDisplay = "<img src='" + NFLIcon[0] + "' title='"+NFLIcon[1]+"' />";
									} else {
										var nflTeamDisplay = cbsPlayerInfo[playerID][1];
									}
									tableRows[rowCount] = new Array(getPositionSortNumber(cbsPlayerInfo[playerID][2]),"<tr" + rowStyle + "><td class='cbsPlayerName' style='border-right:0px; white-space:nowrap;'>&nbsp;<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + playerID + "' target='mflpage'>" + cbsPlayerInfo[playerID][0] + "&nbsp;" + cbsPlayerInfo[playerID][2] + "</a>" + injury + newsIcon + "</td><td class='hasball' style='border-left:0px; white-space:nowrap;'>"+thisPlayerUpdate+nflHasBall+"&nbsp;</td><td class='cbsPlayerGame' style='border-right:0px; white-space:nowrap; vertical-align:middle;'>&nbsp;" + nflTeamDisplay + nflGameDetail + "</td>"+SOS+"<td class='cbsGameClock' style='border-left:0px; white-space:nowrap;'>&nbsp;" + nflGameStatus + "</td>"+projections+"<td class='cbsPlayerPoints' title='View Player Stats' onclick='openStatsWindow(event,\""+playerID+"\",\""+which+"\",\""+cbsCurrentWeek+"\");'>" + pointsEarned + "&nbsp;</td></tr>\n");
									rowCount++;
								} catch(er) {
									// do not update this starter row
								}
							}
							playerList = playerList.substring(playerList.indexOf(",")+1,playerList.length);
						}
					} catch(er) {
						// do nothing
					}
					
					if (tableRows.length>0) {
						tableRows.sort(sortby(0));
						if(includeProjections) {
							if(includeSOS) {
								var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>"+headerTitle+"</th><th colspan='3' class='lineupHeaderGames'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Games &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp S.O.S &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Time</th><th class='lineupHeaderProj'>Proj</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
							} else {
								var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>"+headerTitle+"</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderProj'>Proj</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
							}
						} else {
							if(includeSOS) {
								var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>"+headerTitle+"</th><th colspan='3' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
							} else {
								var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>"+headerTitle+"</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
							}
						}
						myTable = myTable + headerRow;
						for(var j=0;j<tableRows.length;j++) {
							myTable = myTable + tableRows[j][1];
						}
						if (doTotals) {
							if(includeProjections) {
								if(includeSOS) {
									myTable = myTable + "<tr class='pointTotalRow'><th colspan='5' class='pointTotalTitle'>&nbsp;"+headerTitle+" Totals</th><th class='pointTotalProj'>"+tableProjTotals.toFixed(precision)+"&nbsp;</th><th class='pointTotalActual'>"+tableTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
								} else {
									myTable = myTable + "<tr class='pointTotalRow'><th colspan='4' class='pointTotalTitle'>&nbsp;"+headerTitle+" Totals</th><th class='pointTotalProj'>"+tableProjTotals.toFixed(precision)+"&nbsp;</th><th class='pointTotalActual'>"+tableTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
								}
							} else {
								if(includeSOS) {
									myTable = myTable + "<tr class='pointTotalRow'><th colspan='5' class='pointTotalTitle'>&nbsp;"+headerTitle+" Total</th><th class='pointTotalActual'>"+tableTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
								} else {
									myTable = myTable + "<tr class='pointTotalRow'><th colspan='4' class='pointTotalTitle'>&nbsp;"+headerTitle+" Total</th><th class='pointTotalActual'>"+tableTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
								}
							}
						}
					}
				}
			myTable = myTable + "</table>\n";
			return myTable;
		}
		function updatePlayerUpdates() {
			var tempHTML = "<table class='updateHistoryPlayer'><tbody>\n";
			tempHTML = tempHTML + "  <tr><th>&nbsp;Time&nbsp;</th><th>&nbsp;Player&nbsp;</th><th>&nbsp;Pos&nbsp;</th><th>&nbsp;NFL&nbsp;</th><th>&nbsp;Fantasy Team&nbsp;</th><th>&nbsp;Status&nbsp;</th><th>&nbsp;Update Pts&nbsp;</th><th>&nbsp;Previous Pts&nbsp;</th><th>&nbsp;Total Pts&nbsp;</th></tr>\n";
			for(var i=(playerUpdateHistory.length)-1;i>=0;i--) {
				//loop through each potential team player may be on
				for(var x=0;x<cbsRosterInfo[playerUpdateHistory[i][8]].length;x++) {
					var xFid = cbsRosterInfo[playerUpdateHistory[i][8]][x][0];
					if(radioButtonValue==-1 || ((radioButtonValue==1||radioButtonValue==3)&&xFid==myUpdateTeam) || ((radioButtonValue==2||radioButtonValue==3)&&playerUpdateHistory[i][9]==myOppUpdateTeam) ) {					
						if(selectBoxValue==""||selectBoxValue=="All"||selectBoxValue==xFid) {
							if(radioButtonValue2==-1 || radioButtonValue2==1 || (radioButtonValue2==2&&cbsRosterInfo[playerUpdateHistory[i][8]][x][2]==radioButtonValue2Str) ) {
								if(selectBoxValue2==""||selectBoxValue2=="All"||selectBoxValue2==playerUpdateHistory[i][8]) {
									tempHTML = tempHTML + "  <tr>\n";
									tempHTML = tempHTML + "   <td style='text-align:center;'>&nbsp;" + playerUpdateHistory[i][0] + "&nbsp;</td>\n";
									tempHTML = tempHTML + "   <td style='text-align:left;'>&nbsp;" + playerUpdateHistory[i][1] + "&nbsp;&nbsp;&nbsp;</td>\n";
									tempHTML = tempHTML + "   <td style='text-align:left;'>&nbsp;" + playerUpdateHistory[i][2] + "&nbsp;</td>\n";
									tempHTML = tempHTML + "   <td style='text-align:left;'>&nbsp;" + playerUpdateHistory[i][3] + "&nbsp;</td>\n";
									//tempHTML = tempHTML + "   <td style='text-align:left;'>&nbsp;" + playerUpdateHistory[i][4] + "&nbsp;</td>\n";
									tempHTML = tempHTML + "   <td style='text-align:left;'>&nbsp;" + franchiseDatabase['fid_'+xFid].name  + "&nbsp;</td>\n";
									tempHTML = tempHTML + "   <td style='text-align:left;'>&nbsp;" + cbsRosterInfo[playerUpdateHistory[i][8]][x][2] + "&nbsp;</td>\n";
									tempHTML = tempHTML + "   <td style='text-align:right;'>&nbsp;" + playerUpdateHistory[i][5] + "&nbsp;&nbsp;</td>\n";
									tempHTML = tempHTML + "   <td style='text-align:right;'>&nbsp;" + playerUpdateHistory[i][6] + "&nbsp;&nbsp;</td>\n";
									tempHTML = tempHTML + "   <td style='text-align:right;'>&nbsp;<a href='#1' title='View Player Stats' onclick='openStatsWindow(event,\""+playerUpdateHistory[i][8]+"\",\""+playerUpdateHistory[i][9]+"\",\""+cbsCurrentWeek+"\")'>" + playerUpdateHistory[i][7] + "</a>&nbsp;&nbsp;</td>\n";
									tempHTML = tempHTML + "  </tr>\n";
								}
							}
						}
					}
				}
			}
			tempHTML = tempHTML + " </tbody>\n";
			tempHTML = tempHTML + "</table>\n";
			document.getElementById("playerUpdates").innerHTML = tempHTML;
			
			var myTeamChecked = "";
			var oppTeamChecked = "";
			var bothChecked = "";
			switch(radioButtonValue) {
				case -1: break; // do nothing
				case 1:	myTeamChecked=" checked='checked'"; break;
				case 2: oppTeamChecked=" checked='checked'"; break;
				case 3:	bothChecked=" checked='checked'"; break;
				default: break; // do nothing
			}
			var allPlayersChecked = "";
			var startersChecked = "";
			switch(radioButtonValue2) {
				case -1: break; // do nothing
				case 1:	allPlayersChecked=" checked='checked'"; break;
				case 2: startersChecked=" checked='checked'"; break;
				default: break; // do nothing
			}
			
			tempHTML = "<table class='updateHistoryHeader'>\n";
			tempHTML = tempHTML + " <tr>\n";
			tempHTML = tempHTML + "  <td style='border-bottom:0px; text-align:left;'>\n";
			tempHTML = tempHTML + "   <form name='teamform'>\n";

			tempHTML = tempHTML + "    <select id='fantasyteamselect' onchange='teamSelectFilter();'>\n";
			if(selectBoxValue=="") {
				tempHTML = tempHTML + "     <option value='' selected='selected'>Select Team</option>\n";
			} else {
				tempHTML = tempHTML + "     <option value=''>Select Team</option>\n";
			}
			if(selectBoxValue=="All") {
				tempHTML = tempHTML + "     <option value='All' selected='selected'>All Teams</option>\n";
			} else {
				tempHTML = tempHTML + "     <option value='All'>All Teams</option>\n";
			}
			for (var fid in franchiseDatabase) {
				if(franchiseDatabase[fid].id!="0000"&&franchiseDatabase[fid].id!=undefined) {
					try {
						if(selectBoxValue==franchiseDatabase[fid].id) var selected = " selected='selected'";  else var selected="";
						tempHTML = tempHTML + "<option value='"+franchiseDatabase[fid].id+"'"+selected+">"+franchiseDatabase[fid].name+"</option>\n";
					} catch(er) {
						// list nothing
					}
				}
			}
			tempHTML = tempHTML + "    </select>\n";			
			
			tempHTML = tempHTML + "    <input type='radio' name='teamFilter'"+myTeamChecked+" onclick='teamRadioFilter(1);'>My Team Only&nbsp;&nbsp;\n";
			tempHTML = tempHTML + "    <input type='radio' name='teamFilter'"+oppTeamChecked+" onclick='teamRadioFilter(2);'>My Opp Only&nbsp;&nbsp;\n";
			tempHTML = tempHTML + "    <input type='radio' name='teamFilter'"+bothChecked+" onclick='teamRadioFilter(3);'>My Team and Opp Only&nbsp;&nbsp;\n";
		
			tempHTML = tempHTML + "   </form>\n";
			tempHTML = tempHTML + "  </td>\n";
			tempHTML = tempHTML + " </tr>\n";
			
			tempHTML = tempHTML + " <tr>\n";
			tempHTML = tempHTML + "  <td style='border-top:0px; text-align:left;'>\n";
			tempHTML = tempHTML + "   <form name='playerform'>\n";

			tempHTML = tempHTML + "    <select id='fantasyplayerselect' onchange='playerSelectFilter();'>\n";
			if(selectBoxValue2=="") {
				tempHTML = tempHTML + "     <option value='' selected='selected'>Select Player</option>\n";
			} else {
				tempHTML = tempHTML + "     <option value=''>Select Player</option>\n";
			}
			if(selectBoxValue2=="All") {
				tempHTML = tempHTML + "     <option value='All' selected='selected'>All Players</option>\n";
			} else {
				tempHTML = tempHTML + "     <option value='All'>All Players</option>\n";
			}
			
			var tempArray = new Array();
			for(var i=0;i<playerUpdateHistory.length;i++) {
				var tempID = "'"+playerUpdateHistory[i][8]+"'";
				if(tempArray[tempID]==undefined) tempArray[tempID]= new Array(tempID,playerUpdateHistory[i][1]);
			}
			//bubble sort
			for(var pid in tempArray) {
				if(parseFloat(pid.substr(1,pid.length))>0) {
					for(var pid2 in tempArray) {
						if(parseFloat(pid2.substr(1,pid2.length))>0) {
							if(tempArray[pid][1]<tempArray[pid2][1]) {
								var tempValue = tempArray[pid][0];
								var tempValue1 = tempArray[pid][1];
								tempArray[pid][0] = tempArray[pid2][0];
								tempArray[pid][1] = tempArray[pid2][1];
								tempArray[pid2][0] = tempValue;
								tempArray[pid2][1] = tempValue1;
							}
						}
					}
				}
			}
     		for(var pid in tempArray) {
				if(parseFloat(pid.substr(1,pid.length))>0) {
					try {
						if(selectBoxValue2==parseFloat(tempArray[pid][0].substr(1,tempArray[pid][0].length-1))) var selected = " selected='selected'";  else var selected="";
						tempHTML = tempHTML + "<option value="+tempArray[pid][0]+selected+">"+tempArray[pid][1]+"</option>\n";
					} catch(er) {
						// list nothing
					}
				}
			}
			tempHTML = tempHTML + "    </select>\n";			
			
			tempHTML = tempHTML + "    <input type='radio' name='playerFilter'"+allPlayersChecked+" onclick='playerRadioFilter(1);'>All Players&nbsp;&nbsp;\n";
			tempHTML = tempHTML + "    <input type='radio' name='playerFilter'"+startersChecked+" onclick='playerRadioFilter(2);'>Starters Only&nbsp;&nbsp;\n";
		
			tempHTML = tempHTML + "   </form>\n";
			tempHTML = tempHTML + "  </td>\n";
			tempHTML = tempHTML + " </tr>\n";			
			
			tempHTML = tempHTML + "</table>\n";

			document.getElementById("playerFilter").innerHTML = tempHTML;
		}
		
	//====================================================================================
	// FUNCTIONS THAT CONTROL UPDATES/LOOPS
	//====================================================================================
		function setCBSMatchup(which) {
			currentGameHilighted = which;
			for(var x=0;x<cbsLiveScoringMatchups.length;x++) { //reset all my links game hilights to original colour
				document.getElementById("matchup_" + x).innerHTML = "V<br />i<br />e<br />w";
				document.getElementById("matchup_" + x).setAttribute("class", "matchupLolite");
			}
			document.getElementById("matchup_" + which).innerHTML = "L<br />i<br />v<br />e";
			document.getElementById("matchup_" + which).setAttribute("class", "matchupHilite");
			activeCBSRoadID = cbsLiveScoringMatchups[which]['road'][0];
			activeCBSHomeID = cbsLiveScoringMatchups[which]['home'][0];
			lastPlayerUpdate = 0;  // reset my last player update time 
			clearTimeout(myMainScoreboardTimer);  //clear the timer
			myLoopCount=0;    //reset loop count
			mySecondsCount=0; //
			updateCBSMainScoreboard();
		}
		function startTheTimer() {
			mySecondsCount++;
			if(maxLoops!=0&&myLoopCount>maxLoops) { //stop the refreshes to conserve XML executions
				document.getElementById("cbsScoreboardMessage").innerHTML="<span id='cbsScoreboardMessageResetTimer' onclick='setCBSMatchup("+currentGameHilighted+")'>updates paused - click to restart</span>";
			} else {
				if (mySecondsCount>refreshSeconds) {
					clearTimeout(myMainScoreboardTimer);  //clear the timer
					mySecondsCount=0;
					//document.getElementById("cbsScoreboardMessage").innerHTML="Updating . . . ";
					updateCBSMainScoreboard();
					myLoopCount++;
				} else {
					var myCountdownSeconds = refreshSeconds-mySecondsCount;
					if(myCountdownSeconds<10) myCountdownSeconds="00:0"+myCountdownSeconds; else myCountdownSeconds="00:"+myCountdownSeconds;
					if((refreshSeconds-mySecondsCount)==0) { 
						document.getElementById("cbsScoreboardMessage").innerHTML="Updating . . . ";
					} else {
						document.getElementById("cbsScoreboardMessage").innerHTML="Next Update: "+myCountdownSeconds;
					}
					myMainScoreboardTimer = setTimeout("startTheTimer()", 1000);  // set timer to refresh the main scoreboard
				}
			}
		}
		function updateCBSMainScoreboard () {
			if (document.getElementById) {

				// MY LIVE SCORING ARRAY IS A MULTI-DIMENSIONAL ARRAY
				// liveScoring[0] contains an array that has team info
				// liveScoring[1] contains an array that has player info
				
				// liveScoring[0][fid][0] ==> team score
				// liveScoring[0][fid][1] ==> gameSecondsRemaining
				// liveScoring[0][fid][2] ==> players yet to play
				// liveScoring[0][fid][3] ==> players currently playing
				// liveScoring[1][pid] ==> player score
				
				var liveScoring = new Array();
				var liveScoring = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+cbsCurrentWeek+"&DETAILS=1&rand=" + Math.random() , 'parseCBSLiveScoringResultsXML','liveScoring',true);
				var nflSchedule = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=nflSchedule&W="+cbsCurrentWeek+"&rand=" + Math.random() , 'parseCBSNFLScheduleResultsXML','nflSchedule',true);

				if(lastPlayerUpdate==0) { //set both arrays to the current live scoring
					playerUpdates[0] = liveScoring[1];
					playerUpdates[1] = liveScoring[1];
					lastPlayerUpdate = myTimestamp();
//SOME TEST DATA					
//var tpid = '9064'; var tscore = 12.5; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '10261'; var tscore = 9.7; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '10273'; var tscore = 5.2; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '10302'; var tscore = 3.9; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '1600'; var tscore = 2.95; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '8667'; var tscore = 3; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '8252'; var tscore = 5.5; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '7260'; var tscore = 6; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '8301'; var tscore = 9.5; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
				} else {
					if(parseFloat(myTimestamp()/60000)-parseFloat(lastPlayerUpdate/60000) > 0.5) { //it has been one minute since our last update so re-update
						playerUpdates[1] = playerUpdates[0];
						playerUpdates[0] = liveScoring[1];
						lastPlayerUpdate = myTimestamp();
						if(includePlayerUpdates) {
							var thisPlayerUpdated = new Array();
							for(var pid in liveScoring[1]) {
								if(parseInt(pid)>0) {
									try {
										if(thisPlayerUpdated[pid]==undefined) {
											if(parseFloat(playerUpdates[0][pid])!=parseFloat(playerUpdates[1][pid])) addToPlayerUpdate(pid, parseFloat(playerUpdates[1][pid]).toFixed(precision), parseFloat(parseFloat(playerUpdates[0][pid])-parseFloat(playerUpdates[1][pid])).toFixed(precision),parseFloat(playerUpdates[0][pid]).toFixed(precision));
											thisPlayerUpdated[pid]=1; // mark this player as being updated to avoid duplicate calls.
										}
									} catch(er) {
										// bad data
									}
								}
							}
						}
					}
				}				

				//UDPATE GAME MATCHUPS TEAM SCORES
				for (var i=1;i<=10;i++) { //need to loop more than one id for double header, triple header etc.
					for(var j=1;j<=cbsLeagueInfo[6];j++) {
						try {
							if(j<10) var fid = "000"+j; else var fid = "00"+j;
							var fidUnique = "fid_" + fid + i;
							document.getElementById(fidUnique).innerHTML = parseFloat(liveScoring[0][fid][0]).toFixed(precision);
						} catch(er) {
							// do nothing
						}
					}
				}
				for (var i=1;i<=10;i++) { // update league avg
					try {
						var fid="AVG";
						var fidUnique = "fid_AVG" + i;
						document.getElementById(fidUnique).innerHTML = parseFloat(liveScoring[0][fid][0]).toFixed(precision);
					} catch(er) {
						// do nothing
					}
				}
				
				//UPDATE NFL MATCHUPS TEAM SCORE AND TIME REMAINING
				var nflIDArray = new Array('ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN','DET','GBP','HOU','IND','JAC','KCC','MIA','MIN','NEP','NOS','NYG','NYJ','OAK','PHI','PIT','SDC','SEA','SFO','STL','TBB','TEN','WAS');
				for(var i=0;i<nflIDArray.length;i++) {
					try { // update nfl team score
						if(isNaN(parseInt(nflSchedule[nflIDArray[i]][0]))) document.getElementById("fid_"+nflIDArray[i]).innerHTML="&nbsp;"; else document.getElementById("fid_"+nflIDArray[i]).innerHTML=parseInt(nflSchedule[nflIDArray[i]][0])+"&nbsp;";
						try { // update clock using home team id
							document.getElementById("nfl_"+nflIDArray[i]).innerHTML = nflSchedule[nflIDArray[i]][11] + nflSchedule[nflIDArray[i]][3] + "</a>";
						} catch(er) {
							// road team
						}
					} catch(er) {
						// do nothing
					}
				}

				//UPDATE MAIN SCOREBOARD
				document.getElementById("cbsCenterTop").innerHTML=cbsLeagueInfo[0];
				if(activeCBSRoadID=="BYE")  var roadName="BYE";
				else if(activeCBSRoadID=="AVG") var roadName="AVG";
					else var roadName = franchiseDatabase['fid_' + activeCBSRoadID].name;
				if(activeCBSHomeID=="BYE") var homeName="BYE"; 
				else if(activeCBSHomeID=="AVG") var homeName="AVG"; 
					else var homeName = franchiseDatabase['fid_' + activeCBSHomeID].name;
				if(allPlaySetup) var makeClickable = " onclick='swapAllPlayTeams();' style='cursor:pointer;' title='Swap Fantasy Teams'"; else var makeClickable="";
				switch(scoreboardLayout) {
					case 0: document.getElementById("cbsRoadTeamName").innerHTML="<div"+makeClickable+">"+roadName+"</div>";
							document.getElementById("cbsHomeTeamName").innerHTML="<div"+makeClickable+">"+homeName+"</div>";
							break;
					case 1: if(activeCBSRoadID=="AVG") document.getElementById("cbsRoadLogo").innerHTML="League Avg"; else document.getElementById("cbsRoadLogo").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].icon + "'"+makeClickable+" />";
							if(activeCBSHomeID=="AVG") document.getElementById("cbsHomeLogo").innerHTML="League Avg"; else document.getElementById("cbsHomeLogo").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].icon + "'"+makeClickable+" />";
							document.getElementById("cbsRoadTeamName").innerHTML="<div"+makeClickable+">"+roadName+"</div>";
							document.getElementById("cbsHomeTeamName").innerHTML="<div"+makeClickable+">"+homeName+"</div>";
							break;
					case 2: if(activeCBSRoadID=="AVG") document.getElementById("cbsRoadLogo").innerHTML="League Avg"; else document.getElementById("cbsRoadLogo").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].logo + "'"+makeClickable+" />";
							if(activeCBSHomeID=="AVG") document.getElementById("cbsHomeLogo").innerHTML="League Avg"; else document.getElementById("cbsHomeLogo").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].logo + "'"+makeClickable+" />";
							document.getElementById("cbsRoadTeamName").innerHTML="<div"+makeClickable+">"+roadName+"</div>";
							document.getElementById("cbsHomeTeamName").innerHTML="<div"+makeClickable+">"+homeName+"</div>";
							break;
					case 3: if(activeCBSRoadID=="AVG") document.getElementById("cbsRoadTeamName").innerHTML="League Avg"; else document.getElementById("cbsRoadTeamName").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].icon + "'"+makeClickable+" />";
							if(activeCBSHomeID=="AVG") document.getElementById("cbsHomeTeamName").innerHTML="League Avg"; else document.getElementById("cbsHomeTeamName").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].icon + "'"+makeClickable+" />";
							break;
					case 4: if(activeCBSRoadID=="AVG") document.getElementById("cbsRoadTeamName").innerHTML="League Avg"; else document.getElementById("cbsRoadTeamName").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].logo + "'"+makeClickable+" />";
							if(activeCBSHomeID=="AVG") document.getElementById("cbsHomeTeamName").innerHTML="League Avg"; else document.getElementById("cbsHomeTeamName").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].logo + "'"+makeClickable+" />";
							break;							
					default: // do nothing
				}
				if(numberImageDir!=""&&(numberImageExt=="gif"||numberImageExt=="GIF"||numberImageExt=="png"||numberImageExt=="PNG"||numberImageExt=="jpg"||numberImageExt=="JPG"||numberImageExt=="bmp"||numberImageExt=="bmp")) {
					var myRoadScore = convertToImage(parseFloat(liveScoring[0][activeCBSRoadID][0]).toFixed(precision));
					var myHomeScore = convertToImage(parseFloat(liveScoring[0][activeCBSHomeID][0]).toFixed(precision));
				} else {
					var myRoadScore = parseFloat(liveScoring[0][activeCBSRoadID][0]).toFixed(precision);
					var myHomeScore = parseFloat(liveScoring[0][activeCBSHomeID][0]).toFixed(precision);
				}
				document.getElementById("cbsRoadScore").innerHTML=myRoadScore;
				document.getElementById("cbsHomeScore").innerHTML=myHomeScore;
				document.getElementById("cbsRoadTeamRecord").innerHTML=cbsTeamWLT[activeCBSRoadID];
				document.getElementById("cbsHomeTeamRecord").innerHTML=cbsTeamWLT[activeCBSHomeID];
				document.getElementById("cbsRoadPlayers").innerHTML=liveScoring[0][activeCBSRoadID][3];
				document.getElementById("cbsHomePlayers").innerHTML=liveScoring[0][activeCBSHomeID][3];
				document.getElementById("cbsRoadPMR").innerHTML=parseInt(liveScoring[0][activeCBSRoadID][1]/60);
				document.getElementById("cbsHomePMR").innerHTML=parseInt(liveScoring[0][activeCBSHomeID][1]/60);
				document.getElementById("cbsRoadYTP").innerHTML=liveScoring[0][activeCBSRoadID][2];
				document.getElementById("cbsHomeYTP").innerHTML=liveScoring[0][activeCBSHomeID][2];
				
				document.getElementById("cbsRoadLineup").innerHTML = cbsPopulateLineupTable(liveScoring,activeCBSRoadID,nflSchedule);
				document.getElementById("cbsHomeLineup").innerHTML = cbsPopulateLineupTable(liveScoring,activeCBSHomeID,nflSchedule);
				
				setMatchupsToDisplay(false);  // hide/show fantasy matchups or NFL Matchups (false = do not flip)
			}
			startTheTimer();
                        PlayerPopup.renderIcons();
		}
		function updateCurrentWeek(newWeek) {
			//alert("my new week is " + newWeek);
			var prevWeek = cbsCurrentWeek;
			cbsCurrentWeek = parseInt(newWeek);
			//we need to reload projections (if used)
			if(includeProjections) fsProjections = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=projectedScores&L="+league_id+"&W="+cbsCurrentWeek , 'parseFSProjectionsResultsXML','projectedScores',true);
			//we need to update weekly fantasy matchups and nfl matchups
			var myBoxScoreTables = createBoxScoreTables();
			var myNFLBoxScoreTables = createNFLBoxScoreTables();
			if(scoreboardOnTop) {
				if(matchupsDisplayedIsFantasy) {
					document.getElementById("myMiddleTableHolder").innerHTML = "<div id='cbsFantasyMatchups'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups' style='display:none'>" + myNFLBoxScoreTables + "</div>";
				} else {
					document.getElementById("myMiddleTableHolder").innerHTML = "<div id='cbsFantasyMatchups' style='display:none'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups'>" + myNFLBoxScoreTables + "</div>";
				}
			} else {
				if(matchupsDisplayedIsFantasy) {
					document.getElementById("myMiddleTableHolder").innerHTML = "<div id='cbsFantasyMatchups'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups' style='display:none'>" + myNFLBoxScoreTables + "</div>";
				} else {
					document.getElementById("myMiddleTableHolder").innerHTML = "<div id='cbsFantasyMatchups' style='display:none'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups'>" + myNFLBoxScoreTables + "</div>";
				}
			}
			//we need to update navigation (if used but obviously it is being used)
			if (includeWeeklyNavigation) document.getElementById("myNavigationHolder").innerHTML = createWeeklyNavigation();
			//update our global rosterData
			rosterData = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+cbsCurrentWeek+"&rand=" + Math.random() , 'parseCBSRosterDataResultsXML','weeklyResults',true);
			//update the scoreboard
			setCBSMatchup(currentGameHilighted);
		}
	//====================================================================================
	// OTHER FUNCTIONS
	//====================================================================================
		function formatName(name) {
			var tempname = name;
			var tempname = tempname.replace(/'/g,"&rsquo;");
			var commapos = tempname.search(",");
			var len  = tempname.length;
			tempname = tempname.substr(commapos+2,len)+ " " + tempname.substr(0,commapos);
			tempname = tempname.replace(/ /g,"&nbsp;");
			return tempname;
		}
		function formatEscapeCharacter(name) {
			var tempname = name;
			var tempname = tempname.replace(/'/g,"&rsquo;");
			return tempname;
		}
		function formatDateTime(timestamp) {
			var dt = new Date(parseInt(timestamp)*1000);
			var dtMonth = (dt.getMonth()+1);
			var dtHour = dt.getHours();
			var dtMinutes = dt.getMinutes();
			if (dtHour>12) dtHour = dtHour - 12;
			if (dtHour==0) dtHour = 12;
			if (dtMinutes.toString().length == 1) {
				dtMinutes = "0" + dtMinutes.toString();
			}
			return dtMonth + "/"  + dt.getDate() + " " + dtHour + ":" + dtMinutes;
		} 
		function openStatsWindow(thisevent,pid,fid,week) {
			var myURL = playerGameStatsPHP+"?playerid="+pid+"&baseurl="+habBaseURL+"&leagueid="+league_id+"&year="+year+"&width="+width+"&week="+week+"&fid="+fid+"&skin="+includeCSSInPopups+"&skinlink="+myStyleSheet+"&which=PlayerGameStats";
			var width  = 450;
			var height = 200;
			if(includeBorderlessWindow) {
				var pname = "News & Stats";
				var pAttributes = "'width="+width+"px,height="+height+"px,left=300px,top=100px,resize=0,scrolling=1,center=1'";
				ajaxwin=dhtmlwindow.open('playerstatsbox', 'iframe', myURL, pname, pAttributes);		
			} else {
				var left   = (screen.width  - width)/2;
				var top    = (screen.height - height)/2;
				var params = 'width='+width+', height='+height;
				params += ', top='+top+', left='+left;
				params += ', directories=no';
				params += ', location=no';
				params += ', menubar=no';
				params += ', resizable=no';
				params += ', scrollbars=no';
				params += ', status=no';
				params += ', toolbar=no';
				newwin=window.open(myURL,'statswindow', params);
				if (window.focus) {newwin.focus()}
			}
			return false;
		}
		function openNewsWindow(thisevent,pid) {
			var myURL = playerNewsPHP+"?playerid="+pid+"&baseurl="+habBaseURL+"&leagueid="+league_id+"&year="+year+"&width="+newsIconWidth+"&skin="+includeCSSInPopups+"&skinlink="+myStyleSheet+"&which=PlayerNews&skin="+includeCSSInPopups;
			if(includeBorderlessWindow) {
				var pname = "News & Stats";
				var pAttributes = "'width="+newsIconWidth+"px,height="+newsIconHeight+"px,left=300px,top=100px,resize=0,scrolling=1,center=1'";
				ajaxwin=dhtmlwindow.open('playernewsbox', 'iframe', myURL, pname, pAttributes);		
			} else {
				var left   = (screen.width  - newsIconWidth)/2;
				var top    = (screen.height - newsIconHeight)/2;
				var params = 'width='+newsIconWidth+', height='+newsIconHeight;
				params += ', top='+top+', left='+left;
				params += ', directories=no';
				params += ', location=no';
				params += ', menubar=no';
				params += ', resizable=no';
				params += ', scrollbars=yes';
				params += ', status=no';
				params += ', toolbar=no';
				newwin1=window.open(myURL,'newswindow', params);
				if (window.focus) {newwin1.focus()}
			}
			return false;
		}
		function openLoginWindow(thisevent,thisForm) {
			$.fancybox.close();
			var width  = 300;
			var height = 300;
			if(includeBorderlessWindow) {
				var pname = "Login Results";
				var pAttributes = "'width="+width+"px,height="+height+"px,left=300px,top=100px,resize=1,scrolling=1,center=1'";
				ajaxwin=dhtmlwindow.open('loginbox', 'iframe', playerLoadingPHP, pname, pAttributes);
			} else {
				var left   = (screen.width  - width)/2;
				var top    = (screen.height - height)/2;
				var params = 'width='+width+', height='+height;
				params += ', top='+top+', left='+left;
				params += ', directories=no';
				params += ', location=no';
				params += ', menubar=no';
				params += ', resizable=yes';
				params += ', scrollbars=yes';
				params += ', status=no';
				params += ', toolbar=no';
				newwin1=window.open("",'loginbox', params);
				if (window.focus) {newwin1.focus()}
			}
			document.forms["myLoginForm"].submit();
			reloadThisPage();
			return false;
		}
		function reloadThisPage() {
			setTimeout("window.location.reload()",1000);
		}
		function openSubmissionWindow(thisevent,thisForm) {
			$.fancybox.close();
			var width  = 600;
			var height = 300;
			if(includeBorderlessWindow) {
				var pname = "Lineup Submission Results";
				var pAttributes = "'width="+width+"px,height="+height+"px,left=300px,top=100px,resize=1,scrolling=1,center=1'";
				ajaxwin=dhtmlwindow.open('submissionbox', 'iframe', playerLoadingPHP, pname, pAttributes);
			} else {
				var left   = (screen.width  - width)/2;
				var top    = (screen.height - height)/2;
				var params = 'width='+width+', height='+height;
				params += ', top='+top+', left='+left;
				params += ', directories=no';
				params += ', location=no';
				params += ', menubar=no';
				params += ', resizable=yes';
				params += ', scrollbars=yes';
				params += ', status=no';
				params += ', toolbar=no';
				newwin1=window.open("",'submissionbox', params);
				if (window.focus) {newwin1.focus()}
			}
			document.forms["myLineupForm"].submit();
			updateCurrentWeek(cbsCurrentWeek);
			if(includeBorderlessWindow) {
				setTimeout("checkIframeContents()",1000);
			} else {
				// do nothing for now
			}
			return false;
		}
		function checkIframeContents() {
			if(myIframeInnerHTML.indexOf("Lineup Not Accepted!")>0) alert("Uh Oh! Your submission appears to not have been valid.\n\nTry Again.\n\nIf you continue to have problems use the normal lineup submission form!");
		}
		function setMatchupsToDisplay(flip) {
			try {
				if(flip)matchupsDisplayedIsFantasy=!matchupsDisplayedIsFantasy;
				if(matchupsDisplayedIsFantasy) {
					document.getElementById("cbsFantasyMatchups").style.display = "inline";
					document.getElementById("cbsNFLMatchups").style.display = "none";
					document.getElementById("cbsBlank").innerHTML = "<div onmouseover=\"document.mfl_icon.src='"+mflIconImage2+"'\" onmouseout=\"document.mfl_icon.src='"+mflIconImage+"'\"><img src='"+mflIconImage+"' name='mfl_icon' /></div>";
				} else {
					document.getElementById("cbsFantasyMatchups").style.display = "none";
					document.getElementById("cbsNFLMatchups").style.display = "inline";
					document.getElementById("cbsBlank").innerHTML = "<div onmouseover=\"document.nfl_icon.src='"+nflIconImage2+"'\" onmouseout=\"document.nfl_icon.src='"+nflIconImage+"'\"><img src='"+nflIconImage+"' name='nfl_icon' /></div>";
				}
			} catch(er) {
				//do nothing
			}
		}
		function getGameLink(road,home,timestamp,mode) { // GAME LINK TO STATS.COM
			switch (mode) {
				case 0 : {  var link = "<a href='http://hosted.stats.com/fb/preview.asp?g="; break; }
				case 1 : {  var link = "<a href='http://hosted.stats.com/fb/boxscore.asp?gamecode="; break; }
			}
			switch (road) {
				case 'ARI' : { var roadID='22'; break; }
				case 'ATL' : { var roadID='01'; break; }
				case 'BAL' : { var roadID='33'; break; }
				case 'BUF' : { var roadID='02'; break; }
				case 'CAR' : { var roadID='29'; break; }
				case 'CHI' : { var roadID='03'; break; }
				case 'CIN' : { var roadID='04'; break; }
				case 'CLE' : { var roadID='05'; break; }
				case 'DAL' : { var roadID='06'; break; }
				case 'DEN' : { var roadID='07'; break; }
				case 'DET' : { var roadID='08'; break; }
				case 'GBP' : { var roadID='09'; break; }
				case 'HOU' : { var roadID='34'; break; }
				case 'IND' : { var roadID='11'; break; }
				case 'JAC' : { var roadID='30'; break; }
				case 'KCC' : { var roadID='12'; break; }
				case 'MIA' : { var roadID='15'; break; }
				case 'MIN' : { var roadID='16'; break; }
				case 'NEP' : { var roadID='17'; break; }
				case 'NOS' : { var roadID='18'; break; }
				case 'NYG' : { var roadID='19'; break; }
				case 'NYJ' : { var roadID='20'; break; }
				case 'OAK' : { var roadID='13'; break; }
				case 'PHI' : { var roadID='21'; break; }
				case 'PIT' : { var roadID='23'; break; }
				case 'SDC' : { var roadID='24'; break; }
				case 'SEA' : { var roadID='26'; break; }
				case 'SFO' : { var roadID='25'; break; }
				case 'STL' : { var roadID='14'; break; }
				case 'TBB' : { var roadID='27'; break; }
				case 'TEN' : { var roadID='10'; break; }
				case 'WAS' : { var roadID='28'; break; }
			}

			switch (home) {
				case 'ARI' : { var homeID='22'; break; }
				case 'ATL' : { var homeID='01'; break; }
				case 'BAL' : { var homeID='33'; break; }
				case 'BUF' : { var homeID='02'; break; }
				case 'CAR' : { var homeID='29'; break; }
				case 'CHI' : { var homeID='03'; break; }
				case 'CIN' : { var homeID='04'; break; }
				case 'CLE' : { var homeID='05'; break; }
				case 'DAL' : { var homeID='06'; break; }
				case 'DEN' : { var homeID='07'; break; }
				case 'DET' : { var homeID='08'; break; }
				case 'GBP' : { var homeID='09'; break; }
				case 'HOU' : { var homeID='34'; break; }
				case 'IND' : { var homeID='11'; break; }
				case 'JAC' : { var homeID='30'; break; }
				case 'KCC' : { var homeID='12'; break; }
				case 'MIA' : { var homeID='15'; break; }
				case 'MIN' : { var homeID='16'; break; }
				case 'NEP' : { var homeID='17'; break; }
				case 'NOS' : { var homeID='18'; break; }
				case 'NYG' : { var homeID='19'; break; }
				case 'NYJ' : { var homeID='20'; break; }
				case 'OAK' : { var homeID='13'; break; }
				case 'PHI' : { var homeID='21'; break; }
				case 'PIT' : { var homeID='23'; break; }
				case 'SDC' : { var homeID='24'; break; }
				case 'SEA' : { var homeID='26'; break; }
				case 'SFO' : { var homeID='25'; break; }
				case 'STL' : { var homeID='14'; break; }
				case 'TBB' : { var homeID='27'; break; }
				case 'TEN' : { var homeID='10'; break; }
				case 'WAS' : { var homeID='28'; break; }
			}

			var thisObj   = new Date(timestamp*1000); // MUST CHANGE TO INCLUDE MILLISECONDS
			var thisDate  = thisObj.getDate();
			var thisMonth = thisObj.getMonth();
			if(thisDate<10) thisDate = "0" + thisDate;
			thisMonth = thisMonth + 1;
			if(thisMonth<10) thisMonth = "0" + thisMonth;
			link += year+""+thisMonth+""+thisDate+"0"+homeID+"&home="+homeID+"&vis="+roadID+"' target='statsinc'>";
			return link;
		}
		function getNFLBoxscoreIcon(id) {
			//var imagebase = "http://64.73.54.91/fflnetdynamic2007/71809_franchise_icon";
			var imagebase = nflIconBase;
			switch (id) {
				case 'ARI' : { var link = imagebase + "arizona_cardinals.png"; var imagetitle="Arizona Cardinals"; break; }
				case 'ATL' : { var link = imagebase + "atlanta_falcons.png"; var imagetitle="Atlanta Falcons"; break; }
				case 'BAL' : { var link = imagebase + "baltimore_ravens.png"; var imagetitle="Baltimore Ravens"; break; }
				case 'BUF' : { var link = imagebase + "buffalo_bills.png"; var imagetitle="Buffalo Bills"; break; }
				case 'CAR' : { var link = imagebase + "carolina_panthers.png"; var imagetitle="Carolina Panthers"; break; }
				case 'CHI' : { var link = imagebase + "chicago_bears.png"; var imagetitle="Chicago Bears"; break; }
				case 'CIN' : { var link = imagebase + "cincinnati_bengals.png"; var imagetitle="Cincinnati Bengals"; break; }
				case 'CLE' : { var link = imagebase + "cleveland_browns.png"; var imagetitle="Cleveland Browns"; break; }
				case 'DAL' : { var link = imagebase + "dallas_cowboys.png"; var imagetitle="Dallas Cowboys"; break; }
				case 'DEN' : { var link = imagebase + "denver_broncos.png"; var imagetitle="Denver Broncos"; break; }
				case 'DET' : { var link = imagebase + "detroit_lions.png"; var imagetitle="Detroit Lions"; break; }
				case 'GBP' : { var link = imagebase + "greenbay_packers.png"; var imagetitle="Green Bay Packers"; break; }
				case 'HOU' : { var link = imagebase + "houston_texans.png"; var imagetitle="Houston Texans"; break; }
				case 'IND' : { var link = imagebase + "indianapolis_colts.png"; var imagetitle="Indianapolis Colts"; break; }
				case 'JAC' : { var link = imagebase + "jacksonville_jaguars.png"; var imagetitle="Jacksonville Jaguars"; break; }
				case 'KCC' : { var link = imagebase + "kansascity_chiefs.png"; var imagetitle="Kansas City Chiefs"; break; }
				case 'MIA' : { var link = imagebase + "miami_dolphins.png"; var imagetitle="Miami Dolphins"; break; }
				case 'MIN' : { var link = imagebase + "minnesota_vikings.png"; var imagetitle="Minnesota Vikings"; break; }
				case 'NEP' : { var link = imagebase + "newengland_patriots.png"; var imagetitle="New England Patriots"; break; }
				case 'NOS' : { var link = imagebase + "neworleans_saints.png"; var imagetitle="New Orleans Saints"; break; }
				case 'NYG' : { var link = imagebase + "newyork_giants.png"; var imagetitle="New York Giants"; break; }
				case 'NYJ' : { var link = imagebase + "newyork_jets.png"; var imagetitle="New York Jets"; break; }
				case 'OAK' : { var link = imagebase + "oakland_raiders.png"; var imagetitle="Oakland Raiders"; break; }
				case 'PHI' : { var link = imagebase + "philadelphia_eagles.png"; var imagetitle="Philadelphia Eagles"; break; }
				case 'PIT' : { var link = imagebase + "pittsburgh_steelers.png"; var imagetitle="Pittsburgh Steelers"; break; }
				case 'SDC' : { var link = imagebase + "sandiego_chargers.png"; var imagetitle="San Diego Chargers"; break; }
				case 'SEA' : { var link = imagebase + "seattle_seahawks.png"; var imagetitle="Seattle Seahawks"; break; }
				case 'SFO' : { var link = imagebase + "sanfrancisco_49ers.png"; var imagetitle="San Francisco 49ers"; break; }
				case 'STL' : { var link = imagebase + "stlouis_rams.png"; var imagetitle="St. Louis Rams"; break; }
				case 'TBB' : { var link = imagebase + "tampabay_buccaneers.png"; var imagetitle="Tampa Bay Buccaneers"; break; }
				case 'TEN' : { var link = imagebase + "tennessee_titans.png"; var imagetitle="Tennessee Titans"; break; }
				case 'WAS' : { var link = imagebase + "washington_redskins.png"; var imagetitle="Washington Redskins"; break; }
				default    : { var link = ''; break; }
			}
			var myNFLIconArray = new Array(link,imagetitle);
			return myNFLIconArray;
		}
		function getNFLTeamIdFromNickname(nickname) {
			switch (nickname) {
				case 'Cardinals'  : { var teamID = "ARI"; break; }
				case 'Falcons'    : { var teamID = "ATL"; break; }
				case 'Ravens'     : { var teamID = "BAL"; break; }
				case 'Bills'      : { var teamID = "BUF"; break; }
				case 'Panthers'   : { var teamID = "CAR"; break; }
				case 'Bears'      : { var teamID = "CHI"; break; }
				case 'Bengals'    : { var teamID = "CIN"; break; }
				case 'Browns'     : { var teamID = "CLE"; break; }
				case 'Cowboys'    : { var teamID = "DAL"; break; }
				case 'Broncos'    : { var teamID = "DEN"; break; }
				case 'Lions'      : { var teamID = "DET"; break; }
				case 'Packers'    : { var teamID = "GBP"; break; }
				case 'Texans'     : { var teamID = "HOU"; break; }
				case 'Colts'      : { var teamID = "IND"; break; }
				case 'Jaguars'    : { var teamID = "JAC"; break; }
				case 'Chiefs'     : { var teamID = "KCC"; break; }
				case 'Dolphins'   : { var teamID = "MIA"; break; }
				case 'Vikings'    : { var teamID = "MIN"; break; }
				case 'Patriots'   : { var teamID = "NEP"; break; }
				case 'Saints'     : { var teamID = "NOS"; break; }
				case 'Giants'     : { var teamID = "NYG"; break; }
				case 'Jets'       : { var teamID = "NYJ"; break; }
				case 'Raiders'    : { var teamID = "OAK"; break; }
				case 'Eagles'     : { var teamID = "PHI"; break; }
				case 'Steelers'   : { var teamID = "PIT"; break; }
				case 'Chargers'   : { var teamID = "SDC"; break; }
				case 'Seahawks'   : { var teamID = "SEA"; break; }
				case '49ers'      : { var teamID = "SFO"; break; }
				case 'Rams'       : { var teamID = "STL"; break; }
				case 'Buccaneers' : { var teamID = "TBB"; break; }
				case 'Titans'     : { var teamID = "TEN"; break; }
				case 'Redskins'   : { var teamID = "WAS"; break; }
				default           : { var teamID = nickname; break; }
			}
			return teamID;
		}
		function getPositionSortNumber(pos) {
			switch(pos) {
				case 'Coach': var sortNum=1; break;
				case 'QB'   : var sortNum=2; break;
				case 'TMQB' : var sortNum=3; break;
				case 'RB'   : var sortNum=4; break;
				case 'FB'   : var sortNum=5; break;
				case 'WR'   : var sortNum=6; break;
				case 'TE'   : var sortNum=7; break;
				case 'TMTE' : var sortNum=8; break;
				case 'KR'   : var sortNum=9; break;
				case 'PK'   : var sortNum=10; break;
				case 'TMPK' : var sortNum=11; break;
				case 'PN'   : var sortNum=12; break;
				case 'TMPN' : var sortNum=13; break;
				case 'DE'   : var sortNum=14; break;
				case 'DT'   : var sortNum=15; break;
				case 'TMDL' : var sortNum=16; break;
				case 'LB'   : var sortNum=17; break;
				case 'TMLB' : var sortNum=18; break;
				case 'CB'   : var sortNum=19; break;
				case 'S'    : var sortNum=20; break;
				case 'TMDB' : var sortNum=21; break;
				case 'Off'  : var sortNum=22; break;
				case 'Def'  : var sortNum=23; break;
				case 'ST'   : var sortNum=24; break;
				default     : var sortNum=99; break;
			}
			//if(sortNum==99) alert(pos);
			return sortNum;
		}
		function sortby(i) {
			return function (a, b) {
				a = parseInt(a[i]);
				b = parseInt(b[i]);
				if (typeof a == 'number') {
					return a - b;
				}
				else {
					return a == b ? 0 : (a < b ? -1 : 1);
				}
			}
		}
		function getNewsIconAddon(pid) {
			var newsIcon = "";
			try {
				if(habNewsBreakers[pid]==undefined) {
					newsIcon = oldNoteImage;
					newsData = "<a href='#1' title='news' onclick='openNewsWindow(event,\""+pid+"\");'><img src='" + newsIcon + "' alt='news' border='0' /></a>";
				}
				if(habNewsBreakers[pid]=='new') {
					newsIcon = newNoteImage;
					newsData = "<a href='#1' title='news update' onclick='openNewsWindow(event,\""+pid+"\");'><img src='" + newsIcon + "' alt='news update' border='0' /></a>";
				}
				if(habNewsBreakers[pid]=='old') {
					newsIcon = recentNoteImage;
					newsData = "<a href='#1' title='recent news' onclick='openNewsWindow(event,\""+pid+"\");'><img src='" + newsIcon + "' alt='recent news' border='0' /></a>";
				}
			} catch(er) {
				newsIcon = oldNoteImage;
				newsData = "<a href='#1' title='news' onclick='openNewsWindow(event,\""+pid+"\");'><img src='" + newsIcon + "' alt='news' border='0' /></a>";			
			}				
			return newsData;
		}
		function convertToImage(myScore) {
			//replace all letters to letter equivalents
			var str = myScore;
			while (str.indexOf("1")>=0||str.indexOf("2")>=0||str.indexOf("3")>=0||str.indexOf("4")>=0||str.indexOf("5")>=0||str.indexOf("6")>=0||str.indexOf("7")>=0||str.indexOf("8")>=0||str.indexOf("9")>=0||str.indexOf("0")>=0||str.indexOf(".")>=0) {
				str=str.replace("1","aaa");
				str=str.replace("2","bbb");
				str=str.replace("3","ccc");
				str=str.replace("4","ddd");
				str=str.replace("5","eee");
				str=str.replace("6","fff");
				str=str.replace("7","ggg");
				str=str.replace("8","hhh");
				str=str.replace("9","iii");
				str=str.replace("0","jjj");
				str=str.replace(".","kkk");
			}
			while (str.indexOf("aaa")>=0||str.indexOf("bbb")>=0||str.indexOf("ccc")>=0||str.indexOf("ddd")>=0||str.indexOf("eee")>=0||str.indexOf("fff")>=0||str.indexOf("ggg")>=0||str.indexOf("hhh")>=0||str.indexOf("iii")>=0||str.indexOf("jjj")>=0||str.indexOf("kkk")>=0) {
				str=str.replace("aaa","<img src='"+numberImageDir+"1."+numberImageExt+"' />");
				str=str.replace("bbb","<img src='"+numberImageDir+"2."+numberImageExt+"' />");
				str=str.replace("ccc","<img src='"+numberImageDir+"3."+numberImageExt+"' />");
				str=str.replace("ddd","<img src='"+numberImageDir+"4."+numberImageExt+"' />");
				str=str.replace("eee","<img src='"+numberImageDir+"5."+numberImageExt+"' />");
				str=str.replace("fff","<img src='"+numberImageDir+"6."+numberImageExt+"' />");
				str=str.replace("ggg","<img src='"+numberImageDir+"7."+numberImageExt+"' />");
				str=str.replace("hhh","<img src='"+numberImageDir+"8."+numberImageExt+"' />");
				str=str.replace("iii","<img src='"+numberImageDir+"9."+numberImageExt+"' />");
				str=str.replace("jjj","<img src='"+numberImageDir+"0."+numberImageExt+"' />");
				str=str.replace("kkk","<img src='"+numberImageDir+"dot."+numberImageExt+"' />");
			}
			for (var i=0;i<(parseInt(numberImageMinimumDigits)-myScore.length);i++) {
				str = "<img src='"+numberImageDir+"blank."+numberImageExt+"' />"+str;
			}
			return str;
		}
		function playerPosType(pid) {
			var posType = "na";
			try {
				if (cbsPlayerInfo[pid][2]=="QB"||cbsPlayerInfo[pid][2]=="WR"||cbsPlayerInfo[pid][2]=="TE"||cbsPlayerInfo[pid][2]=="TMQB"||cbsPlayerInfo[pid][2]=="TMTE") posType = "OffPass";
				if (cbsPlayerInfo[pid][2]=="RB") posType = "OffRush";
				if (cbsPlayerInfo[pid][2]=="PK"||cbsPlayerInfo[pid][2]=="PN"||cbsPlayerInfo[pid][2]=="TMPK"||cbsPlayerInfo[pid][2]=="TMPN"||cbsPlayerInfo[pid][2]=="Coach"||cbsPlayerInfo[pid][2]=="ST"||cbsPlayerInfo[pid][2]=="Off") posType = "OffAvg";
				if (cbsPlayerInfo[pid][2]=="DE"||cbsPlayerInfo[pid][2]=="DT"||cbsPlayerInfo[pid][2]=="TMDL"||cbsPlayerInfo[pid][2]=="LB"||cbsPlayerInfo[pid][2]=="TMLB"||cbsPlayerInfo[pid][2]=="CB"||cbsPlayerInfo[pid][2]=="S"||cbsPlayerInfo[pid][2]=="TMDB"||cbsPlayerInfo[pid][2]=="Def") posType = "DefAvg";
			} catch(er) {
				// player not in database
			}
			return posType;
		}
		function setupDoubleHeaderArray() {
			//need to count the number of games a fantasy team plays in a week so that we can
			//set up different id's to appear in the fantasy week scoreboard
			for(var i=1;i<=cbsLeagueInfo[6];i++) {
				if(i<10) var fid = "000"+i; else var fid = "00"+i;
				doubleHeader[fid]=0;
			}
			doubleHeader['AVG']=0;
		}
		function swapAllPlayTeams() {
			currentAllPlayTeam = activeCBSHomeID;
			activeCBSHomeID = activeCBSRoadID;
			activeCBSRoadID = currentAllPlayTeam;
			updateCurrentWeek(cbsCurrentWeek);
		}
		function myTimestamp() {
			//time stamp is in milliseconds
			//there are 60,000 milliseconds in one minute
			var d = new Date();
			var x = d.getTime();
			return x;
		}
		function teamRadioFilter(which) {
			radioButtonValue=which;
			selectBoxValue="";
			updatePlayerUpdates();
		}
		function playerRadioFilter(which) {
			radioButtonValue2=which;
			selectBoxValue2="";
			switch(which) {
				case 1: radioButtonValue2Str = 'All'; selectBoxValue2='All'; break;
				case 2: radioButtonValue2Str = 'Starter'; break;
				default: radioButtonValue2Str = ''; break;
			}
			updatePlayerUpdates();
		}
		function teamSelectFilter() {
			var x=document.getElementById("fantasyteamselect").selectedIndex;
			selectBoxValue = document.teamform.getElementsByTagName("option")[x].value;
			radioButtonValue=-1;
			updatePlayerUpdates();
		}
		function playerSelectFilter() {
			var x=document.getElementById("fantasyplayerselect").selectedIndex;
			selectBoxValue2 = document.playerform.getElementsByTagName("option")[x].value;
			radioButtonValue2=-1;
			radioButtonVaule2Str = "";
			updatePlayerUpdates();
		}
		function addToPlayerUpdate(pid,ptOriginal,ptChange,ptCumulative) { // remove fid and fname
			var d = new Date();
			var hour = d.getHours();
			var minutes = d.getMinutes();
			var seconds = d.getSeconds();
			if (hour>12) hour=hour-12;
			if (hour==0) hour=12;
			if (minutes<10) minutes="0" + minutes;
			if (seconds<10) seconds="0" + seconds;
			for(var x=0;x<cbsRosterInfo[pid].length;x++) {  // player may be on more than one team so we need to loop
				var fid = cbsRosterInfo[pid][x][0];
				var fname = franchiseDatabase['fid_'+fid].name;
				//playerUpdateHistory = (time, player name pos team, fantasy team, pt change, pt cumulative, pid, fid); 
				playerUpdateHistory[playerUpdateHistory.length] = new Array(hour+":"+minutes+":"+seconds, cbsPlayerInfo[pid][0], cbsPlayerInfo[pid][2], cbsPlayerInfo[pid][1], fname, ptChange, ptOriginal, ptCumulative, pid, fid);
			}
			updatePlayerUpdates();
		}
		function goMobile() {
			if(location.href.indexOf("=MESSAGE10")>0||location.href.indexOf("=MESSAGE11")>0||location.href.indexOf("=MESSAGE12")>0||location.href.indexOf("=MESSAGE13")>0||location.href.indexOf("=MESSAGE14")>0||location.href.indexOf("=MESSAGE15")>0||location.href.indexOf("=MESSAGE16")>0||location.href.indexOf("=MESSAGE17")>0||location.href.indexOf("=MESSAGE18")>0||location.href.indexOf("=MESSAGE19")>0||location.href.indexOf("=MESSAGE20")>0||location.href.indexOf("MESSAGE10")>0) {
				var urlLength = location.href.indexOf("=MESSAGE") + 10;
			} else {
				var urlLength = location.href.indexOf("=MESSAGE") + 9;
			}
			var newURL=location.href.substr(0,urlLength) + ",mobile=1";
			window.location.href = newURL;
		}

	//IF THIS SCRIPT APPEARS ON THE HOME PAGE THEN ALERT USER AND REVERSE ANY ATTEMPT AT HIDING MENUS
	if(location.href.indexOf("MODULE=MESSAGE")>0||location.href.indexOf("/message")>0) { //GOOD TO GO

	//SET GLOBAL VARS
		var cbsCurrentWeek = liveScoringWeek;
		var cbsLeagueInfo = new Array();
		var cbsLiveScoringMatchups = new Array();
		var cbsNFLLiveScoringMatchups = new Array();
		var cbsPlayerInfo = new Array();
		var cbsInjuryInfo = new Array();
		var cbsRosterInfo = new Array();
		var rosterData = new Array();          // contains my weeklyResults information
		var fsProjections = new Array();
		var doubleHeader = new Array();
		var playerUpdates = new Array();
		var playerUpdateHistory = new Array();
		var futureLineup = new Array();        // used to simulate future lineup if no submission given
		var matchupsDisplayedIsFantasy = true; // used to track which matchups are currently displayed; 0=fantasy or 1=nfl
		var radioButtonValue = -1;             // used for player update form team filter
		var radioButtonValue2 = -1;            // used for player update form player filter
		var radioButtonValue2Str = "";         // used for player update form player filter holds actual search string of radio
		var selectBoxValue = "";               // used for player update form team filter
		var selectBoxValue2 = "";              // used for player update form player filter
		playerUpdates[0] = new Array();        // will hold current player score
		playerUpdates[1] = new Array();        // will hold previous player score
		var fullyLoaded = false;               // include this in the last parsing call done from the initial setup and set to true
		
		var currentGameHilighted=0;
		var lastPlayerUpdate = 0;
		var currentAllPlayTeam="0001";
		var myMainScoreboardTimer;  // counts 30 minutes then pauses unless reset by user sooner
		var mySecondsTimer;         // countdown by seconds until next refresh
		var myLoopCount=0;
		var mySecondsCount=0;
	//SET UP ONE-TIME CALLS TO THE XML DOCUMENTS
		cbsLeagueInfo = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=league&L="+league_id+"&rand=" + Math.random() , 'parseCBSLeagueInfoResultsXML','league',true);
		cbsTeamWLT = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=standings&L="+league_id+"&rand=" + Math.random() , 'parseCBSWLTResultsXML','standings',true);
		if(includeCustomPlayers) {
			cbsPlayerInfo = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=players&L="+league_id+"&rand=" + Math.random() , 'parseCBSPlayerInfoResultsXML','players',true);
		} else {
			cbsPlayerInfo = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=players&rand=" + Math.random() , 'parseCBSPlayerInfoResultsXML','players',true);
		}
		cbsInjuryInfo = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=injuries&W="+liveScoringWeek+"&rand=" + Math.random() , 'parseCBSInjuryInfoResultsXML','injuries',true);
		cbsRosterInfo = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id+"&rand=" + Math.random() , 'parseCBSRosterResultsXML','rosters',true);
		//including &rand=Math.random() in fantasy projections causes my week parameter to fail
		if(includeProjections) fsProjections = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=projectedScores&L="+league_id+"&W="+cbsCurrentWeek , 'parseFSProjectionsResultsXML','projectedScores',true);
		rosterData = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+cbsCurrentWeek+"&rand=" + Math.random() , 'parseCBSRosterDataResultsXML','weeklyResults',true);
	//MORE GLOBAL VARS BASED ON VALUES RETURNED FROM XML DOCUMENTS	
		var precision = cbsLeagueInfo[1];
		var commishfranchise_id = cbsLeagueInfo[2];
		if(franchise_id==undefined||franchise_id==""||franchise_id=="0000") {
			if(commishfranchise_id==undefined||commishfranchise_id==""||commishfranchise_id=="0000") {
				currentAllPlayTeam="0001";
			} else currentAllPlayTeam = commishfranchise_id;
		} else currentAllPlayTeam = franchise_id;
		var myUpdateTeam = currentAllPlayTeam;
		var myOppUpdateTeam = "";

	//HTML CODING STARTS HERE	
	//==FIRST THING I WANT IS ONE TABLE TO HOLD ALL OF MY OTHER NESTED TABLES; CLASS NAME WILL BE cbsOuterTable	

		var myBoxScoreTables = createBoxScoreTables();
		var myNFLBoxScoreTables = createNFLBoxScoreTables();
		var myMainScoreboardTable = createMainScoreboardTable();
		if(scoreboardOnTop) {
			var topTable = myMainScoreboardTable;
			var middleTable = "<div id='cbsFantasyMatchups'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups' style='display:none'>" + myNFLBoxScoreTables + "</div>";
			var topTableHolder = "myTopTableHolder";
			var middleTableHolder = "myMiddleTableHolder";
		} else {
			var topTable = "<div id='cbsFantasyMatchups'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups'>" + myNFLBoxScoreTables + "</div>";
			var middleTable = myMainScoreboardTable;
			var topTableHolder = "myMiddleTableHolder";
			var middleTableHolder = "myTopTableHolder";
		}

		var myHTML = "";
		myHTML = myHTML + "<center>\n";
		myHTML = myHTML + "<div style='max-width:1024px'>\n";
		myHTML = myHTML + "<table class='cbsOuterTable'"+myAdjWidthOuter+">\n";
	
		// This table row contains my weekly nav (if desired)
		if(includeWeeklyNavigation) {
			myHTML = myHTML + " <tr>\n";
			myHTML = myHTML + "  <td id='myNavigationHolder'>\n";
			myHTML = myHTML + createWeeklyNavigation();
			myHTML = myHTML + "  </td>\n";
			myHTML = myHTML + " </tr>\n";
		}
	
		// This table row contains all the current matchups or main scoreboard depending on user setting
		myHTML = myHTML + " <tr>\n";
		myHTML = myHTML + "  <td id='"+topTableHolder+"'>\n";
		myHTML = myHTML + topTable;
		myHTML = myHTML + "  </td>\n";
		myHTML = myHTML + " </tr>\n";
	
		// This table row contains all the current matchups or main scoreboard depending on user setting
		myHTML = myHTML + " <tr>\n";
		myHTML = myHTML + "  <td id='"+middleTableHolder+"'>\n";
		myHTML = myHTML + middleTable;
		myHTML = myHTML + "  </td>\n";
		myHTML = myHTML + " </tr>\n";
	
		//This table row contains team lineups
		if(liveScoringEmpty==false) {
			myHTML = myHTML + " <tr>\n";
			myHTML = myHTML + "  <td>\n";
			myHTML = myHTML + "   <table class='cbsLineups'>\n";
			myHTML = myHTML + "    <tr>\n";
			myHTML = myHTML + "     <td valign='top' id='cbsRoadLineup' style='vertical-align:top; text-align:left;'></td>\n";
			myHTML = myHTML + "     <td valign='top' id='cbsBlankLineup'></td>\n";
			myHTML = myHTML + "     <td valign='top' id='cbsHomeLineup' style='vertical-align:top; text-align:right;'></td>\n";
			myHTML = myHTML + "    </tr>\n";
			myHTML = myHTML + "   </table>\n";
			myHTML = myHTML + "  </td>\n";
			myHTML = myHTML + " </tr>\n";
		}
		
		myHTML = myHTML + "</table>\n";
	
		if(includeHabChat>0) 
			var myRegularChatLink = "";
		else 
			var myRegularChatLink = "<a href='javascript:chat_window(\""+baseURLStatic+"/"+year+"/chat?L="+league_id+"\")'><img src='"+chatIconImage+"' border='0' title='LEAGUE CHAT' /></a>";

		myHTML = myHTML + "<div id='homelink'"+myAdjWidthHomeLink+"><li><a href='"+baseURLStatic+"/"+year+"/home/"+league_id+"' target='_parent'>LEAGUE HOME</a></li><li><a href='"+baseURLDynamic+"/"+year+"/standings?L="+league_id+"' target='scoreboard_child'>STANDINGS</a></li><li><a href='"+baseURLDynamic+"/"+year+"/options?L="+league_id+"&O=07' target='scoreboard_child'>ROSTERS</a></li><li><a href='"+baseURLDynamic+"/"+year+"/options?LEAGUE_ID="+league_id+"&O=03&"+franchise_id+"' target='scoreboard_child'>TRANSACTIONS</a></li><li><a href='"+baseURLDynamic+"/"+year+"/options?L="+league_id+"&O=207' target='scoreboard_child'>PROJECTIONS</a></li><li><a href='"+baseURLDynamic+"/"+year+"/pro_matchup?L="+league_id+"' target='scoreboard_child'>BOX SCORES</a></li><div id='chatlink'"+chatLinkStyle+">"+myRegularChatLink+"</div></div>";
		if(includePlayerUpdates) myHTML = myHTML + "<table class='playerUpdateContainer'><tr class='playerUpdateHeaderRow'><td id='playerUpdateHeader' style='text-align:left;'>&nbsp;Latest Player Updates:&nbsp;</td><td id='playerFilter'><table class='updateHistoryHeader'><tr><td><i>fantasy points by player will update below</i></td></tr></table></td></tr><tr class='playerUpdateUpdateRow'><td colspan='2' id='playerUpdates'><table class='updateHistoryPlayer'><tbody><tr><th>&nbsp;Time&nbsp;</th><th>&nbsp;Player&nbsp;</th><th>&nbsp;Pos&nbsp;</th><th>&nbsp;NFL&nbsp;</th><th>&nbsp;Fantasy Team&nbsp;</th><th>&nbsp;Status&nbsp;</th><th>&nbsp;Update Pts&nbsp;</th><th>&nbsp;Previous Pts&nbsp;</th><th>&nbsp;Total Pts&nbsp;</th></tr></tbody></table></td></tr></table>";
		
		myHTML = myHTML + "</div>\n";
		myHTML = myHTML + "</center>\n";

		//alert(myHTML);
		document.write(myHTML);
		
		if(liveScoringEmpty) document.getElementById("cbsScoreboardMessage").innerHTML = "<span id='cbsScoreboardMessageResetTimer' onclick='reloadThisPage();' style='background-color:red; color:white;'>&nbsp;CLICK HERE TO REFRESH&nbsp;</span>";
		
/////////////////////////////////////////////////////////////////////
//FANCY TABS SCRIPT
/////////////////////////////////////////////////////////////////////
		try {
			$(document).ready(function() {
				$("#various1").fancybox({
					'titlePosition'		: 'inside',
					'transitionIn'		: 'fade',
					'transitionOut'		: 'fade'
				});
				$("#various2").fancybox({
					'titlePosition'		: 'inside',
					'transitionIn'		: 'fade',
					'transitionOut'		: 'fade'
				});
				$("#various3").fancybox({
					'titlePosition'		: 'inside',
					'transitionIn'		: 'fade',
					'transitionOut'		: 'fade'
				});
				$("#various4").fancybox({
					'titlePosition'		: 'inside',
					'transitionIn'		: 'fade',
					'transitionOut'		: 'fade'
				});
			});
		} catch(er) {
			// missing fancy tabs javascript file or call to function in that file failed
		}

		document.write('<div style="display: none;"><div id="inline1" style="width:500px;height:auto;overflow:hidden;"></div></div>');
		document.write('<div style="display: none;"><div id="inline2" style="width:500px;height:auto;overflow:hidden;"></div></div>');
		document.write('<div style="display: none;"><div id="inline3" style="width:500px;height:auto;overflow:hidden;"></div></div>');
		document.write('<div style="display: none;"><div id="inline4" style="width:500px;height:auto;overflow:hidden;"></div></div>');

		function disableEnterKey(e) {
			var key;      
			if(window.event)
				key = window.event.keyCode; //IE
			else
				key = e.which; //firefox      
			return (key != 13);
		}
		function updateFancyTabs() {
			try {
				document.getElementById("inline1").innerHTML = document.getElementById("myFancyLogin").innerHTML;
			} catch(er) {
				document.getElementById("inline1").innerHTML = "Missing 'myFancyLogin' id in home page message";
			}
			try {
				document.getElementById("inline2").innerHTML = document.getElementById("myFancySubmitLineup").innerHTML;
			} catch(er) {
				document.getElementById("inline2").innerHTML = "Missing 'myFancySubmitLineup' id in home page message";
			}
			try {
				document.getElementById("inline3").innerHTML = document.getElementById("myFancyMyNews").innerHTML;
			} catch(er) {
				document.getElementById("inline3").innerHTML = "Missing 'myFancyMyNew' id in home page message";
			}
			try {
				document.getElementById("inline4").innerHTML = document.getElementById("myFancyNFLVideo").innerHTML;
			} catch(er) {
				document.getElementById("inline4").innerHTML = "Missing 'myFancyNFLVideo' id";
			}			
			var tempHTML = document.getElementById("inline1").innerHTML;
			tempHTML = tempHTML.replace(new RegExp("<form ","gi"),"<form name='myLoginForm' target='_iframe-loginbox'");
			tempHTML = tempHTML.replace(new RegExp('type="submit"', "gi"),"type='button' name='myLoginSubmit' onclick='openLoginWindow(event,this);'");
			tempHTML = tempHTML.replace(new RegExp('homepagemodule report', "gi"),"cbsTeamLineup");
			tempHTML = tempHTML.replace(new RegExp('<th>', "gi"),"<th class='pointTotalTitle'>");
			tempHTML = tempHTML.replace(new RegExp('<td>', "gi"),"<td class='cbsPlayerName'>");
			tempHTML = tempHTML.replace(new RegExp('oddtablerow', "gi"),"rowYTP");
			tempHTML = tempHTML.replace(new RegExp('eventablerow', "gi"),"rowYTP");
			tempHTML = tempHTML.replace(new RegExp('cellspacing="1"', "gi"),"style='border-collapse:collapse;'");
			tempHTML = tempHTML.replace(new RegExp('name="PASSWORD"', "gi"),'onKeyPress="return disableEnterKey(event)" name="PASSWORD"');
			document.getElementById("inline1").innerHTML = tempHTML;
			
			var tempHTML = document.getElementById("inline2").innerHTML;
			var submitWeekText = "";
			var submitWeekNumber = 0;
			var submitWeekNumberPos = tempHTML.indexOf(' name="WEEK" value="') + 20;
			if(submitWeekNumberPos>20) {
				var submitWeekNumber = parseInt(tempHTML.substring(submitWeekNumberPos,tempHTML.length));
				if(submitWeekNumber>0) submitWeekText = " for Week #"+submitWeekNumber;
				tempHTML = tempHTML.replace(new RegExp('</p>', "gi"),submitWeekText+'</p>');
			} else { // check chrome since it doesn't use quotes around numbers
				var submitWeekNumberPos = tempHTML.indexOf(' name="WEEK" value=') + 19;
				if(submitWeekNumberPos>19) {
					var submitWeekNumber = parseInt(tempHTML.substring(submitWeekNumberPos,tempHTML.length));
					if(submitWeekNumber>0) submitWeekText = " for Week #"+submitWeekNumber;
					alert(tempHTML);
					tempHTML = tempHTML.replace(new RegExp('</p>', "gi"),submitWeekText+'</p>');
				}
			}
			//we want to emphasize players on bye
			var startPos = 0;
			while(tempHTML.substring(startPos,tempHTML.length).indexOf(' Bye"')>0) {
				//replace after first occurrence of "</td>" following bye with "<td class="cbsPlayerName"><span class="injuredPlayer">BYE</span></td>"
				var byeFoundPos = tempHTML.substring(startPos,tempHTML.length).indexOf(' Bye"');
				byeFoundPos = byeFoundPos + tempHTML.substring(0,startPos).length;
				var endPos = tempHTML.substring(byeFoundPos,tempHTML.length).indexOf('</td>')+byeFoundPos+5;
				var searchString = tempHTML.substring(endPos-25,endPos);
				tempHTML = tempHTML.replace(new RegExp(searchString,"gi"),searchString+'<td class="cbsPlayerName"><span class="injuredPlayer">BYE</span></td>');	
				//advance startPos
				startPos = byeFoundPos+5;
			}
			//we want to add weekly vs opp
			var startPos = 0;
			var dataString='Week '+submitWeekNumber+': vs ';
			while(tempHTML.substring(startPos,tempHTML.length).indexOf(dataString)>0) {
				//replace first occurrence of "</td>" following matchup with "<td class="cbsPlayerName"><span class="injuredPlayer">vs opponent</span></td>"
				var oppFoundPos = tempHTML.substring(startPos,tempHTML.length).indexOf(dataString);
				oppFoundPos = oppFoundPos + tempHTML.substring(0,startPos).length;
				var endTeamPos =tempHTML.substring(oppFoundPos+dataString.length,tempHTML.length).indexOf(' ')+oppFoundPos+dataString.length;
				var oppTeam = getNFLTeamIdFromNickname(tempHTML.substring(oppFoundPos+dataString.length,endTeamPos));
				var endPos = tempHTML.substring(oppFoundPos,tempHTML.length).indexOf('</td>')+oppFoundPos+5;
				var searchString = tempHTML.substring(endPos-25,endPos);
				tempHTML = tempHTML.replace(new RegExp(searchString,"gi"),searchString+'<td class="cbsPlayerName">vs '+oppTeam+'</td>');	
				//advance startPos
				startPos = oppFoundPos+5;
			}
			//we want to add weekly at opp
			var startPos = 0;
			var dataString='Week '+submitWeekNumber+': at ';
			while(tempHTML.substring(startPos,tempHTML.length).indexOf(dataString)>0) {
				//replace first occurrence of "</td>" following matchup with "<td class="cbsPlayerName"><span class="injuredPlayer">at opponent</span></td>"
				var oppFoundPos = tempHTML.substring(startPos,tempHTML.length).indexOf(dataString);
				oppFoundPos = oppFoundPos + tempHTML.substring(0,startPos).length;
				var endTeamPos =tempHTML.substring(oppFoundPos+dataString.length,tempHTML.length).indexOf(' ')+oppFoundPos+dataString.length;
				var oppTeam = getNFLTeamIdFromNickname(tempHTML.substring(oppFoundPos+dataString.length,endTeamPos));
				var endPos = tempHTML.substring(oppFoundPos,tempHTML.length).indexOf('</td>')+oppFoundPos+5;
				var searchString = tempHTML.substring(endPos-25,endPos);
				tempHTML = tempHTML.replace(new RegExp(searchString,"gi"),searchString+'<td class="cbsPlayerName">at '+oppTeam+'</td>');	
				//advance startPos
				startPos = oppFoundPos+5;
			}
			tempHTML = tempHTML.replace(new RegExp("Player</th>","gi"),'Player</th><th></th>');
			tempHTML = tempHTML.replace(new RegExp("<form ","gi"),"<form name='myLineupForm' target='_iframe-submissionbox'");
			tempHTML = tempHTML.replace(new RegExp('type="submit"', "gi"),"type='button' name='myLineupSubmit' onclick='openSubmissionWindow(event,this);'");
			tempHTML = tempHTML.replace(new RegExp('homepagemodule report', "gi"),"cbsTeamLineup");
			tempHTML = tempHTML.replace(new RegExp('<th>', "gi"),"<th class='pointTotalTitle'>");
			tempHTML = tempHTML.replace(new RegExp('<td>', "gi"),"<td class='cbsPlayerName'>");
			tempHTML = tempHTML.replace(new RegExp('oddtablerow', "gi"),"rowYTP");
			tempHTML = tempHTML.replace(new RegExp('eventablerow', "gi"),"rowYTP");
			tempHTML = tempHTML.replace(new RegExp('cellspacing="1"', "gi"),"style='border-collapse:collapse;'");
			tempHTML = tempHTML.replace(new RegExp('href="options', "gi"),'href="'+baseURLDynamic+'/'+year+'/options');
			tempHTML = tempHTML.replace(new RegExp('class="position', "gi"),'target="playerpage" class="position');
			tempHTML = tempHTML.replace(new RegExp('a title="Owner:', "gi"),'a target="playerpage" title="Owner:');
			tempHTML = tempHTML.replace(new RegExp('_blank', "gi"),'playerpage');
			document.getElementById("inline2").innerHTML = tempHTML;
			
			var tempHTML = document.getElementById("inline3").innerHTML;
			tempHTML = tempHTML.replace(new RegExp('homepagemodule report', "gi"),"cbsTeamLineup");
			tempHTML = tempHTML.replace(new RegExp('<th>', "gi"),"<th class='pointTotalTitle'>");
			tempHTML = tempHTML.replace(new RegExp('<td>', "gi"),"<td class='cbsPlayerName'>");
			tempHTML = tempHTML.replace(new RegExp('oddtablerow', "gi"),"rowYTP");
			tempHTML = tempHTML.replace(new RegExp('eventablerow', "gi"),"rowYTP");
			tempHTML = tempHTML.replace(new RegExp('cellspacing="1"', "gi"),"style='border-collapse:collapse;'");
			tempHTML = tempHTML.replace(new RegExp('a href', "gi"),'a target="playerpage" href');
			document.getElementById("inline3").innerHTML = tempHTML;
		}


		
		//START THE UPDATE
		if(fullyLoaded) {
			if(liveScoringEmpty==false) startMeUp = setTimeout("setCBSMatchup(currentGameHilighted)",500);  // most browsers
			startMeUp2 = setTimeout("updateFancyTabs()",500);
		} else {
			try {  // chrome and safari typically
				if(liveScoringEmpty==false) startMeUp = setTimeout("setCBSMatchup(currentGameHilighted)",2000);
				startMeUp2 = setTimeout("updateFancyTabs()",2000);
			} catch(er) {
				try { // iPad and iPhone
					if(liveScoringEmpty==false) startMeUp = setTimeout("setCBSMatchup(currentGameHilighted)",2000); // chrome and safari typically
				} catch(er) {
					if(liveScoringEmpty==false) startMeUp = setTimeout("setCBSMatchup(currentGameHilighted)",4000); // chrome and safari typically
				}
				try { // iPad and iPhone
					startMeUp2 = setTimeout("updateFancyTabs()",2000);
				} catch(er) {
					startMeUp2 = setTimeout("updateFancyTabs()",4000);
				}
			}
		}
	
	} else { // NOT ON HOME PAGE OR MESSAGE PREVIEW
		//try to reverse attempts at hiding menu items
		document.write("<style type='text/css'>");
		document.write("#menu0 { display: block; }");         // redisplay milonic menu   
		document.write("#vsubmenu { display: block; }");      // redisplay vertical menu 
		document.write("#hsubmenu { display: block; }");      // redisplay horizonal menu
		document.write("#myCustomHeader { display: block; }") // redisplay custom header
		document.write("</style>");
		document.write("<div style='border: 2px solid red; background-color:yellow; color:black; padding: 5px'>");
		document.write("<p>This is where the Live Scoreboard should appear however the scoreboard was not<br />");
		document.write("designed to be placed on the Home Page and therefore has been blocked from<br />");
		document.write("appearing here.</p>");
		document.write("<p>Placing it on the home page can cause several problems including exceeding the<br />");
		document.write("amount of calls any one league can make to the export progam in a 24 hour period, <br />");
		document.write("slowing down the initial load time of the home page, and hiding several key menu<br />");
		document.write("items that are crucial to navigate the website</p>");
		document.write("<p>To view the scoreboard create a link to the Home Page Module where the scoreboard<br />");
		document.write("is placed and use that link to access the live scoreboard.</p>");
		document.write("<p>Habman</p>");
		document.write("</div>");
	}
	// borderless window from dynamic drive
	try { 
		window.onunload=dhtmlwindow.cleanup; 
	} catch(er) {
		// do nothing
	}