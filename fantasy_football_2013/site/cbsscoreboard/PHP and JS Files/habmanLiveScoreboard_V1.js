//THIS SCRIPT WILL CREATE A LIVE SCORING SUMMARY SIMILAR TO CBS FOR MFL LEAGUES
//It should be a stand alone module meaning DO NOT place it on the home page (this includes home page tabs)
//To use simply place the script in a home page module (advanced editor turned off)
//Then use a second home page module to create a link to the scoreboard and place this module on the home page
//Example: place script in Home Page Module 20
//         using home page module 19 you can create a link by simply adding the following script:
//              <a href='%HOST%/%YEAR%/home/%LEAGUEID%?MODULE=MESSAGE20'>Live Scoring</a>
//         now place home page module 19 and set this module somewhere to your home page



//ONE LOOP = 1 minute therefore 30 LOOPS = 30 minutes; 
//1 LOOP MAKES 5 XML CALLS (1 to liveScoring, 2 to weeklyResults, 2 to nflSchedule); 
//Also there are 5 initial XML calls made when first entering script (1 to league; 1 to standings; 1 to players, 1 to injuries, 1 to liveScoring)
if(maxLoops==undefined) var maxLoops=30;
if(franchise_id==undefined) var franchise_id;

//the following vars are typically set by the user but if they are missing or corrupt then assign default values here
if(useStyleSheet==undefined) var useStyleSheet = 0;
if(scoreboardOnTop==undefined) var scoreboardOnTop=false;
if(matchupsPerRow==undefined) var matchupsPerRow=5;
if(includeWeeklyNavigation==undefined) var includeWeeklyNavigation=true;
if(includeProjections==undefined) var includeProjections=true;
if(includeSOS==undefined) var includeSOS=true;
if(includeNewsBreakers==undefined) var includeNewsBreakers=true;
if(includeStarterTotals==undefined) var includeStarterTotals=true;
if(includeBenchTotals==undefined) var includeBenchTotals=true;
if(useNicknamesInScoreboard==undefined) var useNicknamesInScoreboard=false;
if(allPlaySetup==undefined) var allPlaySetup=false;
if(scoreboardImage==undefined) var scoreboardImage = 1;
if(numberImageDir==undefined) var numberImageDir = "";
if(numberImageExt==undefined) var numberImageExt = "";
if(numberImageMinimumDigits==undefined) var numberImageMinimumDigits = 0;

//include selected style sheet
if(location.href.indexOf("MODULE=MESSAGE")>0||location.href.indexOf("/message")>0) { //GOOD TO GO
	if(useStyleSheet==1) document.write("<link rel='stylesheet' href='http://www.habman.com/css/habmanScoreboardDefault.css' type='text/css' />");	
	if(useStyleSheet==2) document.write("<link rel='stylesheet' href='http://nitrografixx.com/cbsscoreboard/css/yellow.css' type='text/css' />");
	if(useStyleSheet==3) document.write("<link rel='stylesheet' href='http://nitrografixx.com/cbsscoreboard/css/red.css' type='text/css' />");
	if(useStyleSheet==4) document.write("<link rel='stylesheet' href='http://nitrografixx.com/cbsscoreboard/css/blue.css' type='text/css' />");
	if(useStyleSheet==5) document.write("<link rel='stylesheet' href='http://nitrografixx.com/cbsscoreboard/css/cbs.css' type='text/css' />");
	if(includeNewsBreakers) document.write('<script type="text/javascript" src="http://nitrografixx.com/habman_js/habNewsBreakers.js"></script>');
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
				var franchises = liveScoring[0].getElementsByTagName("franchise");
				var matchupArray = new Array();
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
				var matchups = liveScoring[0].getElementsByTagName("matchup");
				var matchupArray = new Array();
				for(var i=0; i<matchups.length; i++) {
					var teamData = matchups[i].getElementsByTagName("franchise");
					var roadTeam = new Array(teamData[0].getAttribute("id"),teamData[0].getAttribute("score"),teamData[0].getAttribute("gameSecondsRemaining"),teamData[0].getAttribute("playersYetToPlay"),teamData[0].getAttribute("playersCurrentlyPlaying"));
					var homeTeam = new Array(teamData[1].getAttribute("id"),teamData[1].getAttribute("score"),teamData[1].getAttribute("gameSecondsRemaining"),teamData[1].getAttribute("playersYetToPlay"),teamData[1].getAttribute("playersCurrentlyPlaying"));
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
			return matchupArray;
		}
		function parseCBSLiveScoringResultsXML (resultsXML) { //SYNCHRONOUSLY CALLED
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
				// GET TEAM INFO FROM LIVE SCORING INCLUDING TEAM SCORE, SECONDS REMAINING, YTP, CURRENTLY PLAYING
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
					} catch(er) {
						var roadTeam = new Array(teamData[0].getAttribute("nonstarters"),teamData[0].getAttribute("starters"));
						var homeTeam = new Array(teamData[1].getAttribute("nonstarters"),teamData[1].getAttribute("starters"));
					}
					matchupArray[teamData[0].getAttribute("id")] = new Array();
					matchupArray[teamData[1].getAttribute("id")] = new Array();
					matchupArray[teamData[0].getAttribute("id")] = roadTeam;
					matchupArray[teamData[1].getAttribute("id")] = homeTeam;
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
					injuryDetail = injury[i].getAttribute("details");
					if(injuryStatus=="IR") var injuryCode = "IR"; else var injuryCode = injuryStatus.substring(0,1);
					injuryArray[playerID] = new Array(injuryCode, injuryStatus, injuryDetail);
				} catch(er) {
					// do nothing
				}
			}
			return injuryArray;
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
				if(parseInt(roadScore)==0&&parseInt(homeScore)==0&&parseInt(secondsRemaining)==0) secondsRemaining=3600;
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
				if(roadRedzone==1) roadImage="<img src='http://nitrografixx.com/cbsscoreboard/img/red_zone.png' alt='"+roadTeamID+" is in the Redzone' title='"+roadTeamID+" is in the Redzone' />";
				if(homeRedzone==1) homeImage="<img src='http://nitrografixx.com/cbsscoreboard/img/red_zone.png' alt='"+homeTeamID+" is in the Redzone' title='"+homeTeamID+" is in the Redzone' />";
				if(roadImage==""&&roadPossession==1) roadImage="<img src='http://nitrografixx.com/cbsscoreboard/img/has_ball.png' alt='"+roadTeamID+" has possession' title='"+roadTeamID+" has possession' />";
				if(homeImage==""&&homePossession==1) homeImage="<img src='http://nitrografixx.com/cbsscoreboard/img/has_ball.png' alt='"+homeTeamID+" has possession' title='"+homeTeamID+" has possession' />";
				var scoreClock = "";
				if (parseInt(secondsRemaining)==0) scoreClock = "Final";
				if (parseInt(secondsRemaining)==3600) scoreClock = formatDateTime(kickoffTime);
				if (parseInt(secondsRemaining)==1800) scoreClock = "Half";
				if (parseInt(secondsRemaining)>0&&parseInt(secondsRemaining)<900) scoreClock = "4Q " + formatAsMinutes(parseInt(secondsRemaining));
				if (parseInt(secondsRemaining)>=900&&parseInt(secondsRemaining)<1800) scoreClock = "3Q " + formatAsMinutes(parseInt(secondsRemaining)-900);
				if (parseInt(secondsRemaining)>1800&&parseInt(secondsRemaining)<2700) scoreClock = "2Q " + formatAsMinutes(parseInt(secondsRemaining)-1800);
				if (parseInt(secondsRemaining)>=2700&&parseInt(secondsRemaining)<3600) scoreClock = "1Q " + formatAsMinutes(parseInt(secondsRemaining)-2700);
				var roadStatus = " " + roadScore + " @ " + homeTeamID + " " + homeScore;
				var homeStatus = " " + homeScore + " v " + roadTeamID + " " + roadScore;
				matchupArray[roadTeamID] = new Array(roadStatus, secondsRemaining, kickoffTime, scoreClock, roadImage, roadPassOffRank, roadRushOffRank, roadAvgOffRank, roadPassDefRank, roadRushDefRank, roadAvgDefRank);
				matchupArray[homeTeamID] = new Array(homeStatus, secondsRemaining, kickoffTime, scoreClock, homeImage, homePassOffRank, homeRushOffRank, homeAvgOffRank, homePassDefRank, homeRushDefRank, homeAvgDefRank);
			}
			return matchupArray;
		}
	//====================================================================================
	//FUNCTIONS THAT CREATE HTML SCRIPT
	//====================================================================================
		//creating the individual scoreboards for the matchups in a given week (each call creates one scoreboard)
		function createWeeklyNavigation() {
			var htmlCode = ""
			htmlCode = htmlCode + "       <table class='cbsWeeklyNavigation'>\n";
			htmlCode = htmlCode + "        <tr>\n";
			htmlCode = htmlCode + "         <td>Live Scoring As Of Week:&nbsp;&nbsp;\n";
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
			htmlCode = htmlCode + "        </tr>\n";
			htmlCode = htmlCode + "       </table>\n";
			return htmlCode;
		}
		//creating the individual scoreboards for the matchups in a given week (each call creates one scoreboard)
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
					var roadName = franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].abbrev+"&nbsp;";
					var homeName = franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].abbrev+"&nbsp;";
					var roadTitle = " title='"+franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].name+"'";
					var homeTitle = " title='"+franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].name+"'";
				} else {
					var roadName = franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].name;
					var homeName = franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].name;
					var roadTitle="";
					var homeTitle="";
				}
				htmlCode = htmlCode + "       <table class='cbsGameTable'>\n";
				htmlCode = htmlCode + "        <tr><td rowspan='2' class='matchupLolite' title='View Game Score' id='matchup_" + which + "' onclick='setCBSMatchup(" + which + ")'>&nbsp;&nbsp;</td><td style='text-align:left; padding-left:3px;'"+roadTitle+">" + roadName + "</td><td style='text-align:right; padding-right:3px;' id='fid_" + matchupInfo[which]['road'][0] + doubleHeader[matchupInfo[which]['road'][0]]+"'"+roadTitle+"></td></tr>\n";
				htmlCode = htmlCode + "        <tr><td style='text-align:left; padding-left:3px;'"+homeTitle+">" + homeName + "</td><td style='text-align:right; padding-right:3px;' id='fid_" + matchupInfo[which]['home'][0] + doubleHeader[matchupInfo[which]['home'][0]]+"'"+homeTitle+"></td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
				return htmlCode;
			} else {
				htmlCode = htmlCode + "       <table class='cbsGameTableInactive'>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
				return htmlCode;
			}
		}
		//creating the boxscore tables main container
		function createBoxScoreTables() {
			//Set/Reset double header array
			setupDoubleHeaderArray();
			var boxHTML = "   <table class='cbsGameLinks'>\n";
			//cbsLiveScoringMatchups has been defined as a global var
			cbsLiveScoringMatchups = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+cbsCurrentWeek+"&rand=" + Math.random() , 'parseCBSLiveScoringMatchupResultsXML','liveScoring',true);
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
			return boxHTML;
		}
		//creating main scoreboard table
		function createMainScoreboardTable() {
			var scoreboardHTML = "   <table class='cbsMainScoreboard'>\n";
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			switch(scoreboardImage) {
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
			switch(scoreboardImage) {
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
			scoreboardHTML = scoreboardHTML + "     <td rowspan='3' id='cbsRoadScore'>&nbsp;</td>"; 	
			scoreboardHTML = scoreboardHTML + "     <td colspan='7' id='cbsScoreboardMessage'>XXXXXXX</td>"; 
			scoreboardHTML = scoreboardHTML + "     <td rowspan='3' id='cbsHomeScore'>&nbsp;</td>"; 	
			scoreboardHTML = scoreboardHTML + "    </tr>\n";
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Currently Playing'>P</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Yet to Play'>YTP</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Player Minutes Remaining'>PMR</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsBlank'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Player Minutes Remaining'>PMR</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Yet to Play'>YTP</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Currently Playing'>P</td>";
			scoreboardHTML = scoreboardHTML + "    </tr>\n";	
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadPlayers' title='Players Currently Playing'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadYTP' title='Players Yet to Play'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadPMR' title='Player Minutes Remaining'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsBlank2'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomePMR' title='Player Minutes Remaining'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomeYTP' title='Players Yet to Play'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomePlayers' title='Players Currently Playing'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "    </tr>\n";
	
			scoreboardHTML = scoreboardHTML + "   </table>\n";
			return scoreboardHTML;
		}
		//creating the table where the players for each team appear
		function cbsPopulateLineupTable(liveScoring,which) {
			var rosterData = new Array();
			var nflSchedule = new Array();
			var starterTotals = 0;
			var starterProjTotals = 0;
			var benchTotals = 0;
			var benchProjTotals = 0;
			rosterData = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+cbsCurrentWeek+"&rand=" + Math.random() , 'parseCBSRosterDataResultsXML','weeklyResults',true);
			nflSchedule = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=nflSchedule&W="+cbsCurrentWeek+"&rand=" + Math.random() , 'parseCBSNFLScheduleResultsXML','nflSchedule',true);
			myTable = "<table class='cbsTeamLineup'>\n";
			//create starters
				var starterRows = "";
				try {
					while (rosterData[which][1].indexOf(",")>0)	{
						var playerID = rosterData[which][1].substring(0,rosterData[which][1].indexOf(","));
						try {  // if player is not on the injury report then playerID fails
							var injury="&nbsp;(<span class='injuredPlayer' title='" + cbsInjuryInfo[playerID][1] + ": " + cbsInjuryInfo[playerID][2] + "'>" + cbsInjuryInfo[playerID][0] + "</span>)";
						} catch(er) {
							var injury = "";
						}
						try {  // if player is a free agent then NFL ID fails
							var nflGameDetail = nflSchedule[cbsPlayerInfo[playerID][1]][0];
							var nflHasBall = nflSchedule[cbsPlayerInfo[playerID][1]][4];
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
						starterTotals = starterTotals + parseFloat(pointsEarned);
						if (includeProjections) {
							if (fsProjections[playerID]==undefined) var projections = ""; else { var projections = "<td class='cbsPlayerProjections'>"+parseFloat(fsProjections[playerID]).toFixed(precision)+"&nbsp;</td>"; starterProjTotals = starterProjTotals + parseFloat(fsProjections[playerID]); }
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
							if(rankNumber>=1&&rankNumber<=6) SOS = "<td class='oppRankBadMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - BAD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							if(rankNumber>=7&&rankNumber<=12) SOS = "<td class='oppRankPoorMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - POOR Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							if(rankNumber>=13&&rankNumber<=20) SOS = "<td class='oppRankAvgMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - NEUTRAL Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							if(rankNumber>=21&&rankNumber<=26) SOS = "<td class='oppRankGoodMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - GOOD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							if(rankNumber>=27&&rankNumber<=32) SOS = "<td class='oppRankGreatMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - GREAT Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
						} else var SOS = "";
						if(includeNewsBreakers) {
							var newsIcon = "&nbsp;"+getNewsIconAddon(playerID.toString());
						} else var newsIcon = "";
						var rowStyle=" class='rowCurrentlyPlaying'";
						if (parseInt(nflSecondsRemaining)==0) rowStyle=" class='rowGameOver'";
						if (parseInt(nflSecondsRemaining)==3600) rowStyle=" class='rowYTP'";
						try {
							starterRows = starterRows + "<tr" + rowStyle + "><td class='cbsPlayerName' style='border-right:0px'>&nbsp;<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + playerID + "' target='mflpage'>" + cbsPlayerInfo[playerID][0] + " " + cbsPlayerInfo[playerID][2] + "</a>" + injury + newsIcon + "</td><td class='hasball' style='border-left:0px'>"+nflHasBall+"&nbsp;</td><td class='cbsPlayerGame' style='border-right:0px'>&nbsp;" + cbsPlayerInfo[playerID][1] + nflGameDetail + "</td>"+SOS+"<td class='cbsGameClock' style='border-left:0px'>&nbsp;" + nflGameStatus + "</td>"+projections+"<td class='cbsPlayerPoints' title='View Player Stats' onclick='openStatsWindow(\""+playerID+"\",\""+which+"\",\""+cbsCurrentWeek+"\");'>" + pointsEarned + "&nbsp;</td></tr>\n";
						} catch(er) {
							// do not update this starter row
						}
						rosterData[which][1] = rosterData[which][1].substring(rosterData[which][1].indexOf(",")+1,rosterData[which][1].length);
					}
				} catch(er) {
					// do nothing
				}
				if (starterRows!="") {
					if(includeProjections) {
						if(includeSOS) {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Starters</th><th colspan='3' class='lineupHeaderGames'>Games</th><th class='lineupHeaderProj'>Proj</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						} else {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Starters</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderProj'>Proj</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						}
					} else {
						if(includeSOS) {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Starters</th><th colspan='3' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						} else {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Starters</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						}
					}
					myTable = myTable + headerRow;
					myTable = myTable + starterRows;
					if (includeStarterTotals) {
						if(includeProjections) {
							if(includeSOS) {
								myTable = myTable + "<tr class='pointTotalRow'><th colspan='5' class='pointTotalTitle'>&nbsp;Starter Totals</th><th class='pointTotalProj'>"+starterProjTotals.toFixed(precision)+"&nbsp;</th><th class='pointTotalActual'>"+starterTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
							} else {
								myTable = myTable + "<tr class='pointTotalRow'><th colspan='4' class='pointTotalTitle'>&nbsp;Starter Totals</th><th class='pointTotalProj'>"+starterProjTotals.toFixed(precision)+"&nbsp;</th><th class='pointTotalActual'>"+starterTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
							}
						} else {
							if(includeSOS) {
								myTable = myTable + "<tr class='pointTotalRow'><th colspan='5' class='pointTotalTitle'>&nbsp;Starter Total</th><th class='pointTotalActual'>"+starterTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
							} else {
								myTable = myTable + "<tr class='pointTotalRow'><th colspan='4' class='pointTotalTitle'>&nbsp;Starter Total</th><th class='pointTotalActual'>"+starterTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
							}
						}
					}
				}
			//create tiebreak
				var tiebreakRows = "";
				var tiebreakPlayer="";
				try {
					if (rosterData[which][2].length>0) {
						var playerID = rosterData[which][2];
						tiebreakPlayer = playerID;
						try {  // if player is not on the injury report then playerID fails
							var injury="&nbsp;(<span class='injuredPlayer' title='" + cbsInjuryInfo[playerID][1] + ": " + cbsInjuryInfo[playerID][2] + "'>" + cbsInjuryInfo[playerID][0] + "</span>)";
						} catch(er) {
							var injury = "";
						}
						try {  // if player is a free agent then NFL ID fails
							var nflGameDetail = nflSchedule[cbsPlayerInfo[playerID][1]][0];
							var nflHasBall = nflSchedule[cbsPlayerInfo[playerID][1]][4];
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
						if (includeProjections) {
							if (fsProjections[playerID]==undefined) var projections = ""; else var projections = "<td class='cbsPlayerProjections'>"+parseFloat(fsProjections[playerID]).toFixed(precision)+"&nbsp;</td>";
						} else var projections = "";
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
							if(rankNumber>=1&&rankNumber<=6) SOS = "<td class='oppRankBadMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - BAD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							if(rankNumber>=7&&rankNumber<=12) SOS = "<td class='oppRankPoorMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - POOR Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							if(rankNumber>=13&&rankNumber<=20) SOS = "<td class='oppRankAvgMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - NEUTRAL Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							if(rankNumber>=21&&rankNumber<=26) SOS = "<td class='oppRankGoodMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - GOOD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							if(rankNumber>=27&&rankNumber<=32) SOS = "<td class='oppRankGreatMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - GREAT Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
						} else var SOS = "";
						if(includeNewsBreakers) {
							var newsIcon = "&nbsp;"+getNewsIconAddon(playerID.toString());
						} else var newsIcon = "";
						var rowStyle=" class='rowCurrentlyPlaying'";
						if (parseInt(nflSecondsRemaining)==0) rowStyle=" class='rowGameOver'";
						if (parseInt(nflSecondsRemaining)==3600) rowStyle=" class='rowYTP'";
						try {
							tiebreakRows = tiebreakRows + "<tr" + rowStyle + "><td class='cbsPlayerName' style='border-right:0px'>&nbsp;<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + playerID + "' target='mflpage'>" + cbsPlayerInfo[playerID][0] + " " + cbsPlayerInfo[playerID][2] + "</a>" + injury + newsIcon + "</td><td class='hasball' style='border-left:0px'>"+nflHasBall+"&nbsp;</td><td class='cbsPlayerGame' style='border-right:0px'>&nbsp;" + cbsPlayerInfo[playerID][1] + nflGameDetail + "</td>"+SOS+"<td class='cbsGameClock' style='border-left:0px'>&nbsp;" + nflGameStatus + "</td>"+projections+"<td class='cbsPlayerPoints' title='View Player Stats' onclick='openStatsWindow(\""+playerID+"\",\""+which+"\",\""+cbsCurrentWeek+"\");'>" + pointsEarned + "&nbsp;</td></tr>\n";
						} catch(er) {
							// do not update this tiebreak row
						}
					}
				} catch(er) {
					// do nothing
				}
				if (tiebreakRows!="") {
					if(includeProjections) {
						if(includeSOS) {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Tiebreaking Player</th><th colspan='3' class='lineupHeaderGames'>Games</th><th class='lineupHeaderProj'>Proj</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						} else {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Tiebreaking Player</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderProj'>Proj</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						}
					} else {
						if(includeSOS) {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Tiebreaking Player</th><th colspan='3' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						} else {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Tiebreaking Player</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						}
					}
					myTable = myTable + headerRow;
					myTable = myTable + tiebreakRows;
				}
			//create bench
				var benchRows = "";
				try {
					while (rosterData[which][0].indexOf(",")>0)	{
						var playerID = rosterData[which][0].substring(0,rosterData[which][0].indexOf(","));
						if(playerID!=tiebreakPlayer) {
							try { // if player is not on the injury report then playerID fails
								var injury="&nbsp;(<span class='injuredPlayer' title='" + cbsInjuryInfo[playerID][1] + ": " + cbsInjuryInfo[playerID][2] + "'>" + cbsInjuryInfo[playerID][0] + "</span>)";
							} catch(er) {
								var injury = "";
							}
							try {  // if player is a free agent then NFL ID fails
								var nflGameDetail = nflSchedule[cbsPlayerInfo[playerID][1]][0];
								var nflHasBall = nflSchedule[cbsPlayerInfo[playerID][1]][4];
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
							benchTotals = benchTotals + parseFloat(pointsEarned);
							if (includeProjections) {
								if (fsProjections[playerID]==undefined) var projections = ""; else { var projections = "<td class='cbsPlayerProjections'>"+parseFloat(fsProjections[playerID]).toFixed(precision)+"&nbsp;</td>"; benchProjTotals = benchProjTotals + parseFloat(fsProjections[playerID]); }
							} else var projections = "";
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
								if(rankNumber>=1&&rankNumber<=6) SOS = "<td class='oppRankBadMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - BAD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								if(rankNumber>=7&&rankNumber<=12) SOS = "<td class='oppRankPoorMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - POOR Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								if(rankNumber>=13&&rankNumber<=20) SOS = "<td class='oppRankAvgMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - NEUTRAL Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								if(rankNumber>=21&&rankNumber<=26) SOS = "<td class='oppRankGoodMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - GOOD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								if(rankNumber>=27&&rankNumber<=32) SOS = "<td class='oppRankGreatMatchup' style='border-left:0px; border-right:0px;' title='"+rankDescription+" - GREAT Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							} else var SOS = "";
							if(includeNewsBreakers) {
								var newsIcon = "&nbsp;"+getNewsIconAddon(playerID.toString());
							} else var newsIcon = "";
							var rowStyle=" class='rowCurrentlyPlaying'";
							if (parseInt(nflSecondsRemaining)==0) rowStyle=" class='rowGameOver'";
							if (parseInt(nflSecondsRemaining)==3600) rowStyle=" class='rowYTP'";
							try {
								benchRows = benchRows + "<tr" + rowStyle + "><td class='cbsPlayerName' style='border-right:0px'>&nbsp;<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + playerID + "' target='mflpage'>" + cbsPlayerInfo[playerID][0] + " " + cbsPlayerInfo[playerID][2] + "</a>" + injury + newsIcon + "</td><td class='hasball' style='border-left:0px'>"+nflHasBall+"&nbsp;</td><td class='cbsPlayerGame' style='border-right:0px'>&nbsp;" + cbsPlayerInfo[playerID][1] + nflGameDetail + "</td>"+SOS+"<td class='cbsGameClock' style='border-left:0px'>&nbsp;" + nflGameStatus + "</td>"+projections+"<td class='cbsPlayerPoints' title='View Player Stats' onclick='openStatsWindow(\""+playerID+"\",\""+which+"\",\""+cbsCurrentWeek+"\");'>" + pointsEarned + "&nbsp;</td></tr>\n";
							} catch(er) {
								// do not update this bench row
							}
						}
						rosterData[which][0] = rosterData[which][0].substring(rosterData[which][0].indexOf(",")+1,rosterData[which][0].length);
					}
				} catch(er) {
					// do nothing
				}
				if (benchRows!="") {
					if(includeProjections) {
						if(includeSOS) {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Bench</th><th colspan='3' class='lineupHeaderGames'>Games</th><th class='lineupHeaderProj'>Proj</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						} else {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Bench</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderProj'>Proj</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						}
					} else {
						if(includeSOS) {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Bench</th><th colspan='3' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						} else {
							var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Bench</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
						}
					}
					myTable = myTable + headerRow;
					myTable = myTable + benchRows;
					if (includeBenchTotals) {
						if(includeProjections) {
							if(includeSOS) {
								myTable = myTable + "<tr class='pointTotalRow'><th colspan='5' class='pointTotalTitle'>&nbsp;Bench Totals</th><th class='pointTotalProj'>"+benchProjTotals.toFixed(precision)+"&nbsp;</th><th class='pointTotalActual'>"+benchTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
							} else {
								myTable = myTable + "<tr class='pointTotalRow'><th colspan='4' class='pointTotalTitle'>&nbsp;Bench Totals</th><th class='pointTotalProj'>"+benchProjTotals.toFixed(precision)+"&nbsp;</th><th class='pointTotalActual'>"+benchTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
							}
						} else {
							if(includeSOS) {
								myTable = myTable + "<tr class='pointTotalRow'><th colspan='5' class='pointTotalTitle'>&nbsp;Bench Total</th><th class='pointTotalActual'>"+benchTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
							} else {
								myTable = myTable + "<tr class='pointTotalRow'><th colspan='4' class='pointTotalTitle'>&nbsp;Bench Total</th><th class='pointTotalActual'>"+benchTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
							}
						}
					}
				}

			myTable = myTable + "</table>\n";
			return myTable;
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
			clearTimeout(myMainScoreboardTimer);  //clear the timer
			myLoopCount=0; //reset loop count
			updateCBSMainScoreboard();
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
				
				//UPDATE MAIN SCOREBOARD
				document.getElementById("cbsCenterTop").innerHTML=cbsLeagueInfo[0];
				switch(scoreboardImage) {
					case 0: document.getElementById("cbsRoadTeamName").innerHTML=franchiseDatabase['fid_' + activeCBSRoadID].name;
							document.getElementById("cbsHomeTeamName").innerHTML=franchiseDatabase['fid_' + activeCBSHomeID].name;
							break;
					case 1: document.getElementById("cbsRoadLogo").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].icon + "' />";
							document.getElementById("cbsHomeLogo").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].icon + "' />";
							document.getElementById("cbsRoadTeamName").innerHTML=franchiseDatabase['fid_' + activeCBSRoadID].name;
							document.getElementById("cbsHomeTeamName").innerHTML=franchiseDatabase['fid_' + activeCBSHomeID].name;
							break;
					case 2: document.getElementById("cbsRoadLogo").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].logo + "' />";
							document.getElementById("cbsHomeLogo").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].logo + "' />";
							document.getElementById("cbsRoadTeamName").innerHTML=franchiseDatabase['fid_' + activeCBSRoadID].name;
							document.getElementById("cbsHomeTeamName").innerHTML=franchiseDatabase['fid_' + activeCBSHomeID].name;
							break;
					case 3: document.getElementById("cbsRoadTeamName").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].icon + "' />";
							document.getElementById("cbsHomeTeamName").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].icon + "' />";
							break;
					case 4: document.getElementById("cbsRoadTeamName").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].logo + "' />";
							document.getElementById("cbsHomeTeamName").innerHTML="<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].logo + "' />";
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
				if(allPlaySetup) document.getElementById("cbsBlank2").innerHTML="<a href='#1' onclick='swapAllPlayTeams();'><== Swap Teams ==></a>";

				document.getElementById("cbsRoadLineup").innerHTML = cbsPopulateLineupTable(liveScoring,activeCBSRoadID);
				document.getElementById("cbsHomeLineup").innerHTML = cbsPopulateLineupTable(liveScoring,activeCBSHomeID);
			}
			var d = new Date();
			var hour = d.getHours();
			var minutes = d.getMinutes();
			var seconds = d.getSeconds();
			if (hour>12) hour=hour-12;
			if (hour==0) hour=12;
			if (minutes<10) minutes="0" + minutes;
			if (seconds<10) seconds="0" + seconds;
			document.getElementById("cbsScoreboardMessage").innerHTML="Last Updated: "+hour+":"+minutes+":"+seconds;
			myLoopCount++;
			if(maxLoops!=0&&myLoopCount>maxLoops) { //stop the refreshes to conserve XML executions
				document.getElementById("cbsScoreboardMessage").innerHTML="<span id='cbsScoreboardMessageResetTimer' onclick='setCBSMatchup("+currentGameHilighted+")'>updates paused - click to restart</span>";
			} else {
				myMainScoreboardTimer = setTimeout("updateCBSMainScoreboard()", 60 * 1000);  // set timer to refresh the main scoreboard
			}
		}
		function updateCurrentWeek(newWeek) {
			//alert("my new week is " + newWeek);
			var prevWeek = cbsCurrentWeek;
			cbsCurrentWeek = parseInt(newWeek);
			//we need to reload projections (if used)
			if(includeProjections) fsProjections = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=projectedScores&L="+league_id+"&W="+cbsCurrentWeek , 'parseFSProjectionsResultsXML','projectedScores',true);
			//we need to update weekly matchups
			if(scoreboardOnTop) {
				document.getElementById("myMiddleTableHolder").innerHTML = createBoxScoreTables();
			} else {
				document.getElementById("myTopTableHolder").innerHTML = createBoxScoreTables();
			}
			//we need to update navigation (if used but obviously it is being used)
			if (includeWeeklyNavigation) document.getElementById("myNavigationHolder").innerHTML = createWeeklyNavigation();
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
		function openStatsWindow(pid,fid,week) {
			var width  = 450;
			var height = 200;
			var myURL = "http://nitrografixx.com/habman_js/PlayerGameStats.php?playerid="+pid+"&baseurl="+habBaseURL+"&leagueid="+league_id+"&year="+year+"&width="+width+"&week="+week+"&fid="+fid+"&which=PlayerGameStats";
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
			return false;
		}
		function openNewsWindow(pid) {
			var width  = 550;
			var height = 400;
			var myURL = "http://nitrografixx.com/habman_js/PlayerNews.php?playerid="+pid+"&baseurl="+habBaseURL+"&leagueid="+league_id+"&year="+year+"&width="+width+"&which=PlayerNews";
			var left   = (screen.width  - width)/2;
			var top    = (screen.height - height)/2;
			var params = 'width='+width+', height='+height;
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
			return false;
		}
		function getNewsIconAddon(pid) {
			var newsIcon = "";
			try {
				if(habNewsBreakers[pid]==undefined) {
					newsIcon = "http://nitrografixx.com/habman_js/note_1.gif";
					newsData = "<a href='#1' title='news' onclick='openNewsWindow(\""+pid+"\");'><img src='" + newsIcon + "' alt='news' border='0' /></a>";
				}
				if(habNewsBreakers[pid]=='new') {
					newsIcon = "http://nitrografixx.com/habman_js/note_new.gif";
					newsData = "<a href='#1' title='news update' onclick='openNewsWindow(\""+pid+"\");'><img src='" + newsIcon + "' alt='news update' border='0' /></a>";
				}
				if(habNewsBreakers[pid]=='old') {
					newsIcon = "http://nitrografixx.com/habman_js/note_2.gif";
					newsData = "<a href='#1' title='recent news' onclick='openNewsWindow(\""+pid+"\");'><img src='" + newsIcon + "' alt='recent news' border='0' /></a>";
				}
			} catch(er) {
				newsIcon = "http://nitrografixx.com/habman_js/note_1.gif";
				newsData = "<a href='#1' title='news' onclick='openNewsWindow(\""+pid+"\");'><img src='" + newsIcon + "' alt='news' border='0' /></a>";			
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
		}
		function swapAllPlayTeams() {
			currentAllPlayTeam = activeCBSHomeID;
			activeCBSHomeID = activeCBSRoadID;
			activeCBSRoadID = currentAllPlayTeam;
			updateCurrentWeek(cbsCurrentWeek);
		}
		

//IF THIS SCRIPT APPEARS ON THE HOME PAGE THEN ALERT USER AND REVERSE ANY ATTEMPT AT HIDING MENUS
if(location.href.indexOf("MODULE=MESSAGE")>0||location.href.indexOf("/message")>0) { //GOOD TO GO

	//SET GLOBAL VARS
		var cbsCurrentWeek = liveScoringWeek;
		var cbsLeagueInfo = new Array();
		var cbsLiveScoringMatchups = new Array();
		var cbsPlayerInfo = new Array();
		var cbsInjuryInfo = new Array();
		var fsProjections = new Array();
		var doubleHeader = new Array();
		var currentGameHilighted=0;
		var currentAllPlayTeam="0001";
		var myMainScoreboardTimer;
		var myLoopCount=0;
	//SET UP ONE-TIME CALLS TO THE XML DOCUMENTS
		cbsLeagueInfo = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=league&L="+league_id+"&rand=" + Math.random() , 'parseCBSLeagueInfoResultsXML','league',true);
		cbsTeamWLT = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=standings&L="+league_id+"&rand=" + Math.random() , 'parseCBSWLTResultsXML','standings',true);
		cbsPlayerInfo = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=players&L="+league_id+"&rand=" + Math.random() , 'parseCBSPlayerInfoResultsXML','players',true);
		cbsInjuryInfo = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=injuries&W="+liveScoringWeek+"&rand=" + Math.random() , 'parseCBSInjuryInfoResultsXML','injuries',true);
		//including &rand=Math.random() in fantasy projections causes my week parameter to fail
		if(includeProjections) fsProjections = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=projectedScores&L="+league_id+"&W="+cbsCurrentWeek , 'parseFSProjectionsResultsXML','projectedScores',true);
	//MORE GLOBAL VARS BASED ON VALUES RETURNED FROM XML DOCUMENTS	
		var precision = cbsLeagueInfo[1];
		var commishfranchise_id = cbsLeagueInfo[2];
		if(franchise_id==undefined||franchise_id==""||franchise_id=="0000") {
			if(commishfranchise_id==undefined||commishfranchise_id==""||commishfranchise_id=="0000") {
				currentAllPlayTeam="0001";
			} else currentAllPlayTeam = commishfranchise_id;
		} else currentAllPlayTeam = franchise_id;		

	//HTML CODING STARTS HERE	
	//==FIRST THING I WANT IS ONE TABLE TO HOLD ALL OF MY OTHER NESTED TABLES; CLASS NAME WILL BE cbsOuterTable	

		var myBoxScoreTables = createBoxScoreTables();
		var myMainScoreboardTable = createMainScoreboardTable();
		if(scoreboardOnTop) {
			var topTable = myMainScoreboardTable;
			var middleTable = myBoxScoreTables;
		} else {
			var topTable = myBoxScoreTables;
			var middleTable = myMainScoreboardTable;
		}

		var myHTML = "";
		myHTML = myHTML + "<center>\n";
		myHTML = myHTML + "<table class='cbsOuterTable'>\n";
	
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
		myHTML = myHTML + "  <td id='myTopTableHolder'>\n";
		myHTML = myHTML + topTable;
		myHTML = myHTML + "  </td>\n";
		myHTML = myHTML + " </tr>\n";
	
		// This table row contains all the current matchups or main scoreboard depending on user setting
		myHTML = myHTML + " <tr>\n";
		myHTML = myHTML + "  <td id='myMiddleTableHolder'>\n";
		myHTML = myHTML + middleTable;
		myHTML = myHTML + "  </td>\n";
		myHTML = myHTML + " </tr>\n";
	
		//This table row contains team lineups
		myHTML = myHTML + " <tr>\n";
		myHTML = myHTML + "  <td>\n";
		myHTML = myHTML + "   <table class='cbsLineups'>\n";
		myHTML = myHTML + "    <tr>\n";
		myHTML = myHTML + "     <td width='48%' valign='top' id='cbsRoadLineup'></td>\n";
		myHTML = myHTML + "     <td width='4%' valign='top' id='cbsBlankLineup'></td>\n";
		myHTML = myHTML + "     <td width='48%' valign='top' id='cbsHomeLineup'></td>\n";
		myHTML = myHTML + "    </tr>\n";
		myHTML = myHTML + "   </table>\n";
		myHTML = myHTML + "  </td>\n";
		myHTML = myHTML + " </tr>\n";
	
		myHTML = myHTML + "</table>\n";
	
		myHTML = myHTML + "<div id='homelink'><li><a href='"+baseURLDynamic+"/"+year+"/home/"+league_id+"'>LEAGUE HOME</a></li><li><a href='"+baseURLDynamic+"/"+year+"/standings?L="+league_id+"'>STANDINGS</a></li><li><a href='"+baseURLDynamic+"/"+year+"/options?L="+league_id+"&O=07'>ROSTERS</a></li><li><a href='"+baseURLDynamic+"/"+year+"/options?LEAGUE_ID="+league_id+"&O=02&"+franchise_id+"'>SUBMIT LINEUPS</a></li><li><a href='"+baseURLDynamic+"/"+year+"/options?L="+league_id+"&O=207'>PROJECTIONS</a></li><li><a href='"+baseURLDynamic+"/"+year+"/pro_matchup?L="+league_id+"'>BOX SCORES</a></li></div>";
	
		myHTML = myHTML + "</center>\n";

		//alert(myHTML);
		document.write(myHTML);
	
		//START THE UPDATE
		startMeUp = setTimeout("setCBSMatchup(currentGameHilighted)",250);
	
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