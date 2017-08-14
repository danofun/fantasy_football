if(habStatsRan==undefined) var habStatsRan = false;

if(!habStatsRan) {

	habStatsRan = true;

	var playerStatsAdded  = false;
	var starterStatsAdded = false;
	var habStarterStats   = new Array();
	var playerScores      = new Array();
	var playerStatsTeam;
	var playerStatsDiv    = "";
	var startersMode      = false;

	if(habStatsActivePositions==undefined) {
		var habStatsActivePositions = new Array();
		if(habStatsActivePositions['ALLO']==undefined) habStatsActivePositions['ALLO'] = true;
		if(habStatsActivePositions['ALLD']==undefined) habStatsActivePositions['ALLD'] = true;
		habStatsActivePositions['QB'] = true;
		habStatsActivePositions['RB'] = true;
		habStatsActivePositions['WR'] = true;
		habStatsActivePositions['TE'] = true;
		habStatsActivePositions['WR+TE'] = false;
		habStatsActivePositions['RB+WR+TE'] = false;
		habStatsActivePositions['PK'] = true;		
		habStatsActivePositions['Team D'] = true;
		habStatsActivePositions['DE'] = true;
		habStatsActivePositions['DT'] = true; 
		habStatsActivePositions['DE+DT'] = false;
		habStatsActivePositions['LB'] = true;
		habStatsActivePositions['CB'] = true;
		habStatsActivePositions['S'] = true;
		habStatsActivePositions['CB+S'] = false;
		habStatsActivePositions['Special'] = false;
		habStatsActivePositions['Team QB'] = false;
		habStatsActivePositions['Team TE'] = false;
		habStatsActivePositions['Team PK'] = false;
		habStatsActivePositions['Team DL'] = false;
		habStatsActivePositions['Team LB'] = false;
		habStatsActivePositions['Team DB'] = false;
	}

	globalStatusSort          = "All";
	globalPosSort             = "QB";
	globalColSort             = "fan_pts";
	globalRangeSort           = 20;
	globalHeaderClickStatsApp = true;

	document.write("<div id='teamStatsApp'></div>");

	document.write('<script type="text/javascript" src="http://www.habman.com/mfl/apps/js/habNewsBreakers.js?rand=' + Math.random() +'"></script>');
	document.write('<script type="text/javascript" src="http://www.habman.com/mfl/apps/js/dhtmlwindow/dhtmlwindow.js"></script>');

	// ***********************************************
	// * DHTML Window Widget- &copy; Dynamic Drive (www.dynamicdrive.com)
	// * This notice must stay intact for legal use.
	// * Visit http://www.dynamicdrive.com/ for full source code
	// ***********************************************


	//================== POPUP CSS CODE FROM DYNAMIC DRIVE FOR DHTML WINDOW WIDGET========================
	document.write("<style type='text/css'>");

	document.write(".dhtmlwindow{");
	document.write("  position: absolute;");
	document.write("  border: 2px solid black;");
	document.write("  visibility: hidden;");
	document.write("  background-color: white;");
	document.write("}");

	document.write(".drag-handle{ /*CSS for Drag Handle*/");
	document.write("  padding: 1px;");
	document.write("  text-indent: 3px;");
	document.write("  font: bold 14px Arial;");
	document.write("  background-color: #CA0000;");
	document.write("  color: white;");
	document.write("  cursor: move;");
	document.write("  overflow: hidden;");
	document.write("  width: auto;");
	document.write("  filter:progid:DXImageTransform.Microsoft.alpha(opacity=100);");
	document.write("  -moz-opacity: 1;");
	document.write("  opacity: 1;");
	document.write("}");

	document.write(".drag-handle .drag-controls{ /*CSS for controls (min, close etc) within Drag Handle*/");
	document.write("  position: absolute;");
	document.write("  right: 1px;");
	document.write("  top: 2px;");
	document.write("  cursor: hand;");
	document.write("  cursor: pointer;");
	document.write("}");

	document.write("* html .drag-handle{ /*IE6 and below CSS hack. Width must be set to 100% in order for opaque title bar to render*/");
	document.write("  width: 100%;");
	document.write("}");

	document.write(".drag-contentarea{ /*CSS for Content Display Area div*/");
	document.write("  border-top: 1px solid brown;");
	document.write("  background-color: white;");
	document.write("  color: black;");
	document.write("  height: 150px;");
	document.write("  padding: 2px;");
	document.write("  overflow: auto;");
	document.write("}");

	document.write(".drag-statusarea{ /*CSS for Status Bar div (includes resizearea)*/");
	document.write("  border-top: 1px solid gray;");
	document.write("  background-color: #F8F8F8;");
	document.write("  height: 13px; /*height of resize image*/");
	document.write("}");

	document.write(".drag-resizearea{ /*CSS for Resize Area itself*/");
	document.write("  float: right;");
	document.write("  width: 13px; /*width of resize image*/");
	document.write("  height: 13px; /*height of resize image*/");
	document.write("  cursor: nw-resize;");
	document.write("  font-size: 0;");
	document.write("}");

	document.write("</style>");

	//================== END POPUP CSS CODE FROM DYNAMIC DRIVE========================


	//========MODIFICATIONS TO RE-POSITION WINDOW FOR DHTML WINDOW WIDGET FROM DYNAMIC DRIVE===========

	function habStatsAppPositionOffset(what, offsettype){
		var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
		var parentEl=what.offsetParent;
		while (parentEl!=null){
			totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
			parentEl=parentEl.offsetParent;
			if(offsettype=="left") totaloffset += 7; else total
		}
		return totaloffset;
	}

	function habStatsApp_loadwindow(thisevent,plink,pname,pwidth,pheight,popname,poptype){
		ajaxwin=dhtmlwindow.open(popname, poptype, plink, pname, 'width='+pwidth+'px,height='+pheight+'px,left=300px,top=100px');
		var thisevent=window.event || thisevent
		//we need to determine if pop fits at the desired location
		var screenHeight = habStatsApp_screenHeightWidth("height");
		var screenWidth  = habStatsApp_screenHeightWidth("width");
		var currentHPos  = thisevent.clientX;
		var currentVPos  = thisevent.clientY;
		var moveToPosX   = currentHPos + 10;
		var moveToPosY   = currentVPos - 20;

		if((moveToPosX+pwidth)>screenWidth) moveToPosX = screenWidth-pWidth;
		if(moveToPosX<=0) moveToPosX = 1;

		if((moveToPosY+pheight+27)>screenHeight) moveToPosY = screenHeight-pheight-27;
		if(moveToPosY<=0) moveToPosY = 1;

		ajaxwin.moveTo(moveToPosX, moveToPosY)
	}

	function habStatsApp_screenHeightWidth(which) {
		if (window.innerWidth)
			var theWidth=window.innerWidth;
		else if (document.documentElement && document.documentElement.clientWidth)
				var theWidth=document.documentElement.clientWidth;
		else if (document.body)
				var theWidth=document.body.clientWidth;

		if (window.innerHeight)
			var theHeight=window.innerHeight;
		else if (document.documentElement && document.documentElement.clientHeight)
				var theHeight=document.documentElement.clientHeight;
		else if (document.body)
				var theHeight=document.body.clientHeight;

		if(which=="width") return theWidth; else return theHeight;
	}

	//== END MODIFICATION FOR DYNAMIC DRIVE SCRIPT=====================================================

	function parseWeeklyResultsStartersXML (resultsXML) {
		var startersArray = new Array();
		var franchises = resultsXML.getElementsByTagName("franchise");
		for(var i=0; i<franchises.length; i++) {
			var fid = franchises[i].getAttribute("id");
			startersArray[fid] = franchises[i].getAttribute("starters");
		}
		return startersArray;
	}

	function parsePlayerScoresStatsXML (resultsXML) {
		var scores = new Array();
		var players = resultsXML.getElementsByTagName("playerScore");
		for(var i=0; i<players.length; i++) {
			var pid = players[i].getAttribute("id");
			scores[pid] = parseFloat(players[i].getAttribute("score"),10);
		}
		return scores;
	}

	function getPlayerStatus(pid,count) {
		var imageLink = "";
		try {
			var playerStatus = "opp";
			if(habGlobalPlayersArray[pid] == undefined) playerStatus    = "fa";
			if(habGlobalPlayersArray[pid] == franchise_id) playerStatus = "own";
			if(playerStatus=="opp") var opponent = getHabTeamName(false,false,"",habGlobalPlayersArray[pid]);
			switch (playerStatus) {
				case "opp" : { imageLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&O=05&FRANCHISE=" + franchise_id + "&FRANCHISE=" + habGlobalPlayersArray[pid] + "' title='propose trade with " + opponent + "' target='" + getHabTarget() + "'><img src='http://www.habman.com/mfl/apps/js/images/right_arrow_yellow.gif' border='0' style='vertical-align: middle;' alt='propose trade with " + opponent + "' /></a>&nbsp;"; break; }
				case "fa"  : { imageLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&O=130&P=" + pid + "' title='add player' target='" + getHabTarget() + "'><img src='http://www.myfantasyleague.com/mflicons/up_arrow_green.gif' border='0' style='vertical-align: middle;' alt='add player' /></a>&nbsp;";   break; }
				case "own" : { imageLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&O=74' title='drop player' target='" + getHabTarget() + "'><img src='http://www.myfantasyleague.com/mflicons/down_arrow_red.gif' border='0' style='vertical-align: middle;' alt='drop player' /></a>&nbsp;";  break; }
			}
		} catch(er) {
			// do Nothing
		}
		try { if(franchise_id==undefined||franchise_id==null||franchise_id=="") imageLink = ""; } catch(er) { imageLink = ""; }
		if(imageLink=="") {
			if(habGlobalPlayersArray[pid] == undefined)
				imageLink = "<img src='http://www.myfantasyleague.com/mflicons/up_arrow_green.gif' border='0' style='vertical-align: middle;' title='login to add player' alt='login to add player' />&nbsp;";
			else
				imageLink = "<img src='http://www.myfantasyleague.com/mflicons/down_arrow_red.gif' border='0' style='vertical-align: middle;' title='login to drop/trade player' alt='login to drop/trade player' />&nbsp;";
		}
		imageLink = count + ". " + imageLink;
		return imageLink;
	}

	function getInjuryStatus(pid) {
		var status = "";
		try { 
			status = " (<span class='warning' title='" + habGlobalInjuriesArray[pid].details + "'>" + habGlobalInjuriesArray[pid].code + "</span>)";
		} catch(er) {
			// do Nothing
		}
		return status;
	}

	function getHabStatsAppContract(pid) {
		var dataFound = false;
		var playername = formatName(playerDatabase['pid_' + pid].name);
		var c_title  = "<b>Contract details for " + playername + "</b><br />";
		try {
			if(habGlobalPlayerContractArray['pid_'+pid].salary!=null&&habGlobalPlayerContractArray['pid_'+pid].salary!="") {
				var salary   = "&nbsp;<b>Salary:</b> " + habGlobalPlayerContractArray['pid_'+pid].salary + "<br />";
				dataFound = true;
			} else { var salary = ""; }
			if(habGlobalPlayerContractArray['pid_'+pid].info!=null&&habGlobalPlayerContractArray['pid_'+pid].info!="") {
				var c_info   = "&nbsp;<b>Info:</b> "   + habGlobalPlayerContractArray['pid_'+pid].info + "<br />";
				dataFound = true;
			} else { var c_info = ""; }
			if(habGlobalPlayerContractArray['pid_'+pid].status!=null&&habGlobalPlayerContractArray['pid_'+pid].status!="") {
				var c_status = "&nbsp;<b>Status:</b> " + habGlobalPlayerContractArray['pid_'+pid].status + "<br />";
				dataFound = true;
			} else { var c_status = ""; }
			if(habGlobalPlayerContractArray['pid_'+pid].year!=null&&habGlobalPlayerContractArray['pid_'+pid].year!="") {
				var c_year   = "&nbsp;<b>Year:</b> "   + habGlobalPlayerContractArray['pid_'+pid].year + "<br />";
				dataFound = true;
			} else { var c_year = ""; }
		} catch(er) {
			dataFound = false;
		}

		if(dataFound) {
			var inlineText = c_title + salary + c_info + c_status + c_year;
			var image = "<a href=\"#0\" onclick=\"habStatsApp_loadwindow(event,'" + inlineText + "','" + formatName(playerDatabase['pid_' + pid].name) + "',300,150,'contractbox','inline'); return false\"><img src=\"http://www.habman.com/mfl/images/contract.gif\" alt=\"click for contract details\" border=\"0\" /></a>";
		} else var image = "&nbsp;";

		return image;
	}

	function getHabStatsAppNewsIcon(pid) {
		var newsIcon = "";
		var newsData = "&nbsp;";
		if(habNewsBreakers[pid]==undefined) {
			newsIcon = "http://www.habman.com/mfl/apps/js/images/note_1.gif";
			newsData = "<a href='#1' title='news' onClick=\"habStatsApp_loadwindow(event,'http://www.habman.com/mfl/apps/PlayerNews.php?leagueid=" + league_id + "&baseurl=" + baseURLDynamic + "&year=" + year + "&playerid=" + pid + "','" + formatName(playerDatabase['pid_' + pid].name) + "',550,400,'playernewsbox','iframe'); return false\"><img src='" + newsIcon + "' alt='news' border='0' /></a>";
		}
		if(habNewsBreakers[pid]=='new') {
			newsIcon = "http://www.habman.com/mfl/apps/js/images/note_new.gif";
			newsData = "<a href='#1' title='news update' onClick=\"habStatsApp_loadwindow(event,'http://www.habman.com/mfl/apps/PlayerNews.php?leagueid=" + league_id + "&baseurl=" + baseURLDynamic + "&year=" + year + "&playerid=" + pid + "','" + formatName(playerDatabase['pid_' + pid].name) + "',550,400,'playernewsbox','iframe'); return false\"><img src='" + newsIcon + "' alt='news update' border='0' /></a>";
		}
		if(habNewsBreakers[pid]=='old') {
			newsIcon = "http://www.habman.com/mfl/apps/js/images/note_2.gif";
			newsData = "<a href='#1' title='recent news' onClick=\"habStatsApp_loadwindow(event,'http://www.habman.com/mfl/apps/PlayerNews.php?leagueid=" + league_id + "&baseurl=" + baseURLDynamic + "&year=" + year + "&playerid=" + pid + "','" + formatName(playerDatabase['pid_' + pid].name) + "',550,400,'playernewsbox','iframe'); return false\"><img src='" + newsIcon + "' alt='recent news' border='0' /></a>";
		}    
		return newsData;
	}
	
	function getHabStatsAppLocked(pid) {
		var lockedIcon = "";
		if(habGlobalLockedPlayersArray[pid]!=undefined) {
			lockedIcon = "<img src='http://www.habman.com/mfl/images/locked.png' style='vertical-align: middle' alt='locked' title='locked' />&nbsp;";
		}
		return lockedIcon;
	}
	    
	var habGlobalTopStartersArray = new Array();
	function parseHabTopStartersXML (resultsXML) {
		var players = resultsXML.getElementsByTagName("player");
		for(var i=0; i<players.length; i++) {
			var pid = players[i].getAttribute("id"); 
			var pct = players[i].getAttribute("percent"); 
			//1 decimal place
			pct = pct.substr(0,pct.length-1);
			habGlobalTopStartersArray[pid] = {pct:pct}
		}
	}
	var habGlobalTopOwnsArray = new Array();
	function parseHabTopOwnsXML (resultsXML) {
		var players = resultsXML.getElementsByTagName("player");
		for(var i=0; i<players.length; i++) {
			var pid = players[i].getAttribute("id");
			var pct = players[i].getAttribute("percent");
			//1 decimal place
			pct = pct.substr(0,pct.length-1);
			habGlobalTopOwnsArray[pid] = {pct:pct}
		}
	}	
	var habGlobalLockedPlayersArray = new Array();
	function parseHabLockedPlayersXML (resultsXML) {
		var players = resultsXML.getElementsByTagName("player");
		for(var i=0; i<players.length; i++) {
			var pid = players[i].getAttribute("id");
			var status = players[i].getAttribute("status");
			if (status=="locked") {
				habGlobalLockedPlayersArray[pid] = {status:"locked"}
			}
		}
	}
	
	function doStatsTable(rosterArray,statsArray,team,mode,divToDisplay,rangeToDisplay) {
		var b0_tac = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center'";   
		var b0_tal = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left'";   
		var b0_tar = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right'";
		var bl_tac = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center; border-left: 1px solid black'";
		var bl_tal = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;   border-left: 1px solid black'";
		var bl_tar = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;  border-left: 1px solid black'";

		var htmlTable = "<table style='border-collapse:collapse; border:0px; text-align:center'><tr><td style='border:0px'>";
		switch(mode) {
			case 1 : { var teamCaption = " <caption><span>" + franchiseDatabase['fid_' + team].name + ": Current Roster Totals</span></caption>";   break; }
			case 2 : { var teamCaption = " <caption><span>" + franchiseDatabase['fid_' + team].name + ": Starting Players Totals</span></caption>"; break; }
			case 3 : { var teamCaption = " <caption><span>" + franchiseDatabase['fid_' + team].name + ": Current Roster Totals</span></caption>";   break; }
			case 4 : { var teamCaption = " <caption><span>" + franchiseDatabase['fid_' + team].name + ": Starting Players Totals</span></caption>"; break; }
			case 5 : { var teamCaption = " "; break; }
		}
		var totals = new Array();

		//INDIVIDUAL OFFENSIVE PLAYERS INCLUDING PLACEKICKERS
		var positionCount = 0;
		var playerCount   = 0;
		totals['O'] = new PlayerOffense(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var tempTable="";
		tempTable += "<table width='100%' border='0' cellspacing='0' class='report' id='habStatsTable'>" + teamCaption;
		tempTable += " <tr><th colspan='6'" + b0_tal + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Percent</th><th" + bl_tac + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Passing</th><th colspan='2'" + bl_tac + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Rushing</th><th colspan='4'" + bl_tac + ">Receiving</th><th" + bl_tac + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Kicking</th><th colspan='2'" + bl_tac + ">Fantasy Pts</th></tr>";
		tempTable += " <tr><th colspan='3'" + b0_tal +" >Player</th><th" + b0_tal + ">Pos</th><th" + b0_tal + ">NFL</th><th" + b0_tar + ">Bye</th>";
		if(globalHeaderClickStatsApp) {
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"own\")'>Own</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"start\")'>Start</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"gp\")'>GP</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"p_yards\")'>Yds</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"p_tds\")'>TD</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"p_ints\")'>Int</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"fl\")'>FL</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"ru_yds\")'>Yds</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"ru_tds\")'>TD</a></th>";
			tempTable += "<th" + bl_tar +" ><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"rec\")'>Rec</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"trgt\")'>Trgt</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"re_yds\")'>Yds</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"re_tds\")'>TD</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"two_pt\")'>2-pt</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"fg\")'>FG</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"pat\")'>PAT</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"fan_pts\")'>Total</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"avg_pts\")'>Avg.</a></th>";
		} else {
			tempTable += "<th" + bl_tar + ">Own</th>";
			tempTable += "<th" + b0_tar + ">Start</th>";
			tempTable += "<th" + bl_tar + ">GP</th>";
			tempTable += "<th" + bl_tar + ">Yds</th>";
			tempTable += "<th" + b0_tar + ">TD</th>";
			tempTable += "<th" + bl_tar + ">Int</th>";
			tempTable += "<th" + b0_tar + ">FL</th>";
			tempTable += "<th" + bl_tar + ">Yds</th>";
			tempTable += "<th" + b0_tar + ">TD</th>";
			tempTable += "<th" + bl_tar + ">Rec</th>";
			tempTable += "<th" + b0_tar + ">Trgt</th>";
			tempTable += "<th" + b0_tar + ">Yds</th>";
			tempTable += "<th" + b0_tar + ">TD</th>";
			tempTable += "<th" + bl_tar + ">2-pt</th>";
			tempTable += "<th" + bl_tar + ">FG</th>";
			tempTable += "<th" + b0_tar + ">PAT</th>";
			tempTable += "<th" + bl_tar + ">Total</th>";
			tempTable += "<th" + b0_tar + ">Avg.</th>";
		}
		tempTable += " </tr>";
		var tempRows = "";
		var rowCount = 1;
		for(var p=0; p<11; p++) {
			var doTopLine = true;
			for(var i=0; i<rosterArray.length; i++) {
				var pid = rosterArray[i];
				var doIt=false;
				if(globalHeaderClickStatsApp) {
					switch(p) {
						case 0 : { if(globalPosSort=="QB"&&playerDatabase['pid_' + pid].position=="QB")   doIt=true; break; }
						case 1 : { if(globalPosSort=="QB"&&playerDatabase['pid_' + pid].position=="TMQB") doIt=true; break; }
						case 2 : { if(globalPosSort=="RB"&&playerDatabase['pid_' + pid].position=="RB")   doIt=true; break; }
						case 3 : { if(globalPosSort=="WR"&&playerDatabase['pid_' + pid].position=="WR")   doIt=true; break; }
						case 4 : { if(globalPosSort=="TE"&&playerDatabase['pid_' + pid].position=="TE")   doIt=true; break; }
						case 5 : { if(globalPosSort=="TE"&&playerDatabase['pid_' + pid].position=="TMTE") doIt=true; break; }
						case 6 : { if(globalPosSort=="PK"&&playerDatabase['pid_' + pid].position=="PK")   doIt=true; break; }
						case 7 : { if(globalPosSort=="RB"&&playerDatabase['pid_' + pid].position=="TMPK") doIt=true; break; }
						case 8 : { if(globalPosSort=="WRTE"&&(playerDatabase['pid_' + pid].position=="WR"||playerDatabase['pid_' + pid].position=="TE")) doIt=true; break; }
						case 9 : { if(globalPosSort=="RBWRTE"&&(playerDatabase['pid_' + pid].position=="RB"||playerDatabase['pid_' + pid].position=="WR"||playerDatabase['pid_' + pid].position=="TE")) doIt=true; break; }
						case 10: { if(globalPosSort=="ALLO"&&(playerDatabase['pid_' + pid].position=="QB"||playerDatabase['pid_' + pid].position=="RB"||playerDatabase['pid_' + pid].position=="WR"||playerDatabase['pid_' + pid].position=="WR"||playerDatabase['pid_' + pid].position=="TE"||playerDatabase['pid_' + pid].position=="PK")) doIt=true; break; }
					}
				} else {
					switch(p) {
						case 0 : { if(playerDatabase['pid_' + pid].position=="QB")   doIt=true; break; }
						case 1 : { if(playerDatabase['pid_' + pid].position=="TMQB") doIt=true; break; }
						case 2 : { if(playerDatabase['pid_' + pid].position=="RB")   doIt=true; break; }
						case 3 : { if(playerDatabase['pid_' + pid].position=="WR")   doIt=true; break; }
						case 4 : { if(playerDatabase['pid_' + pid].position=="TE")   doIt=true; break; }
						case 5 : { if(playerDatabase['pid_' + pid].position=="TMTE") doIt=true; break; }
						case 6 : { if(playerDatabase['pid_' + pid].position=="PK")   doIt=true; break; }
						case 7 : { if(playerDatabase['pid_' + pid].position=="TMPK") doIt=true; break; }
					}
				}
				//THIS IF DOIT CONDITION BELOW ONLY SORTS VARIOUS RANGE . . . NEW WAY IS TO SORT TOP 20, 40, 60 etc.
				//if(doIt && mode==5 && rangeToDisplay!=1000 && ((playerCount<(rangeToDisplay-20)) || playerCount>(rangeToDisplay-1)) ) { doIt = false; playerCount++; }
				if(doIt && mode==5 && rangeToDisplay!=1000 && playerCount>(rangeToDisplay-1) ) { doIt = false; playerCount++; }
				if(doIt) {
					playerCount++;
					if(doTopLine&&!globalHeaderClickStatsApp) var topLine = " newposition"; else var topLine = "";
					if(rowCount%2)
						tempRows += " <tr class='oddtablerow"  + topLine + "'" + b0_tar + ">";
					else
						tempRows += " <tr class='eventablerow" + topLine + "'" + b0_tar + ">";
					rowCount++;
					if(mode==5) var playerStatus = getPlayerStatus(pid,playerCount); else var playerStatus = "";
					var injuryStatus = getInjuryStatus(pid);
					var newsIcon     = getHabStatsAppNewsIcon(pid);
					var contract     = getHabStatsAppContract(pid);
					var locked       = getHabStatsAppLocked(pid);
					try { var pctOwns      = habGlobalTopOwnsArray[pid].pct;     } catch(er) { var pctOwns = "0.0"; }
					try { var pctStarters  = habGlobalTopStartersArray[pid].pct; } catch(er) { var pctStarters = "0.0"; }
					tempRows += "  <td" + b0_tal + ">" + playerStatus + locked + "<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + pid + "' target='" + getHabTarget() + "'>" + formatName(playerDatabase['pid_' + pid].name) + "</a>" + injuryStatus + "</td>"; //Name 
					tempRows += "  <td" + b0_tac + ">" + newsIcon + "</td>";                              // News
					tempRows += "  <td" + b0_tac + ">" + contract + "</td>";                              // Contract
					tempRows += "  <td" + b0_tal + ">" + playerDatabase['pid_' + pid].position + "</td>"; //Pos
					tempRows += "  <td" + b0_tal + ">" + playerDatabase['pid_' + pid].team     + "</td>"; //NFL
					tempRows += "  <td" + b0_tar + ">" + playerDatabase['pid_' + pid].bye_week + "</td>"; //Bye
					tempRows += "  <td" + bl_tar + ">" + pctOwns + "</td>";                               //Percent Owns
					tempRows += "  <td" + b0_tar + ">" + pctStarters + "</td>";                           //Percent Starters
					var tempHtmlTable = tempRows;
					try {
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].gp      + "</td>";  //GP
						// tempRows += "  <td" + b0_tar + ">" + statsArray[pid].comp    + "</td>";  //Comp
						// tempRows += "  <td" + b0_tar + ">" + statsArray[pid].passes  + "</td>";  //Attempts
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].p_yards + "</td>";  //Yards
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].p_tds   + "</td>";  //TD
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].p_ints  + "</td>";  //Int
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].fl      + "</td>";  //FL
						// tempRows += "  <td" + b0_tar + ">" + statsArray[pid].runs    + "</td>";  //Rush
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].ru_yds  + "</td>";  //Yds
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].ru_tds  + "</td>";  //TD
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].rec     + "</td>";  //Rec
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].trgt    + "</td>";  //Trgt
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].re_yds  + "</td>";  //Yds
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].re_tds  + "</td>";  //TD
						// tempRows += "  <td" + b0_tar + ">" + statsArray[pid].tds     + "</td>";  //Total TD
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].two_pt  + "</td>";  //2-pt
						// tempRows += "  <td" + b0_tar + ">" + statsArray[pid].fg_att  + "</td>";  //Attempts
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fg      + "</td>";  //FG
						// tempRows += "  <td" + b0_tar + ">" + statsArray[pid].pat_att + "</td>";  //Attempts
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].pat     + "</td>";  //PAT
						try {
							switch(mode) {
								case 1 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
								case 2 : { tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fan_pts.toFixed(statsDecimals) + "</td>   <td" + b0_tar + ">" + parseFloat(statsArray[pid].fan_pts/statsArray[pid].gp).toFixed(1) + "</td>"; break; }    //Fantasy Pts;
								case 3 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
								case 4 : { tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fan_pts.toFixed(statsDecimals) + "</td>   <td" + b0_tar + ">" + parseFloat(statsArray[pid].fan_pts/statsArray[pid].gp).toFixed(1) + "</td>"; break; }    //Fantasy Pts;
								case 5 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
							}
						} catch(er) {
							tempRows += "  <td" + bl_tar + ">n/a</td><td" + b0_tar + ">n/a</td>";
						}        
						totals['O'].gp      += statsArray[pid].gp,10;
						totals['O'].comp    += statsArray[pid].comp;
						totals['O'].passes  += statsArray[pid].passes;
						totals['O'].p_yards += statsArray[pid].p_yards;
						totals['O'].p_tds   += statsArray[pid].p_tds;
						totals['O'].p_ints  += statsArray[pid].p_ints;
						totals['O'].fl      += statsArray[pid].fl;
						totals['O'].runs    += statsArray[pid].runs;
						totals['O'].ru_yds  += statsArray[pid].ru_yds;
						totals['O'].ru_tds  += statsArray[pid].ru_tds;
						totals['O'].rec     += statsArray[pid].rec;
						totals['O'].trgt    += statsArray[pid].trgt;
						totals['O'].re_yds  += statsArray[pid].re_yds;
        				totals['O'].re_tds  += statsArray[pid].re_tds;
						totals['O'].tds     += statsArray[pid].tds;
						totals['O'].two_pt  += statsArray[pid].two_pt;
						totals['O'].fg_att  += statsArray[pid].fg_att;
						totals['O'].fg      += statsArray[pid].fg;
						totals['O'].pat_att += statsArray[pid].pat_att;
						totals['O'].pat     += statsArray[pid].pat;
						if(mode==1||mode==3) 
							totals['O'].fan_pts += playerScores[0][pid];
						else
							totals['O'].fan_pts += statsArray[pid].fan_pts; 
						positionCount++;
					} catch(er) {
						tempRows = tempHtmlTable;
						tempRows += "  <td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td>";
					}
					doTopLine = false;
					tempRows += " </tr>";
				}
			}
		}
		if(tempRows!="") {
			htmlTable += tempTable;
			htmlTable += tempRows;
			if(mode!=5) htmlTable += " <tr class='newposition'><th colspan='8'" + b0_tal + ">Totals</th><th" + bl_tar + ">" + totals['O'].gp + "</th><th" + bl_tar + ">" + totals['O'].p_yards + "</th><th" + b0_tar + ">" + totals['O'].p_tds + "</th><th" + bl_tar + ">" + totals['O'].p_ints + "</th><th" + b0_tar + ">" + totals['O'].fl + "</th><th" + bl_tar + ">" + totals['O'].ru_yds + "</th><th" + b0_tar + ">" + totals['O'].ru_tds + "</th><th" + bl_tar + ">" + totals['O'].rec + "</th><th" + b0_tar + ">" + totals['O'].trgt + "</th><th" + b0_tar + ">" + totals['O'].re_yds + "</th><th" + b0_tar + ">" + totals['O'].re_tds + "</th><th" + bl_tar + ">" + totals['O'].two_pt + "</th><th" + bl_tar + ">" + totals['O'].fg + "</th><th" + b0_tar + ">" + totals['O'].pat + "</th><th" + bl_tar + ">" + totals['O'].fan_pts.toFixed(statsDecimals) + "</th><th" + b0_tar + ">" + parseFloat(totals['O'].fan_pts/(totals['O'].gp/positionCount)/positionCount).toFixed(1) + "</th></tr>";
			htmlTable += "</table>\n";
		}

		// TEAM DEFENSE
		var positionCount = 0;
		var playerCount   = 0;
		totals['TD'] = new PlayerTeamDefense(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var tempTable="";
		tempTable += "<table width='100%' border='0' cellspacing='0' class='report' id='habStatsTable'>";
		tempTable += " <tr><th colspan='3'" + b0_tal + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Percent</th><th" + bl_tar + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Pts&nbsp;Allowed</th><th colspan='3'" + bl_tac + ">Yds Allowed</th><th" + bl_tac + ">Def</th><th" + bl_tac + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Turnovers</th><th" + bl_tac + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Fantasy Pts</th></tr>";
		tempTable += " <tr><th colspan='2'" + b0_tal + ">Team</th><th" + b0_tar + ">Bye</th>";
		if(globalHeaderClickStatsApp) {
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"own\")'>Own</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"start\")'>Start</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"gp\")'>GP</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"pts_d\")'>Def</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"pts_tot\")'>Team</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"p_yds\")'>Pass</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"ru_yds\")'>Run</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"yds\")'>Total</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"tds\")'>TD's</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"safety\")'>Safety</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"fr\")'>Fum</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"int\")'>Int</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"sack\")'>Sacks</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"fan_pts\")'>Total</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"avg_pts\")'>Avg.</a></th>";
		} else {
			tempTable += "<th" + bl_tar + ">Own</th>";
			tempTable += "<th" + b0_tar + ">Start</th>";
			tempTable += "<th" + bl_tar + ">GP</th>";
			tempTable += "<th" + bl_tar + ">Def</th>";
			tempTable += "<th" + b0_tar + ">Team</th>";
			tempTable += "<th" + bl_tar + ">Pass</th>";
			tempTable += "<th" + b0_tar + ">Run</th>";
			tempTable += "<th" + b0_tar + ">Total</th>";
			tempTable += "<th" + bl_tar + ">TD's</th>";
			tempTable += "<th" + bl_tar + ">Safety</th>";
			tempTable += "<th" + bl_tar + ">Fum</th>";
			tempTable += "<th" + b0_tar + ">Int</th>";
			tempTable += "<th" + bl_tar + ">Sacks</th>";
			tempTable += "<th" + bl_tar + ">Total</th>";
			tempTable += "<th" + b0_tar + ">Avg.</th>";
		}
		tempTable += " </tr>";
		var tempRows = "";
		var rowCount = 1;
		for(var p=0; p<1; p++) {
			var doTopLine = true;
			for(var i=0; i<rosterArray.length; i++) {
				var pid = rosterArray[i];
				var doIt=false;
				switch(p) {
					case 0 : { if(playerDatabase['pid_' + pid].position=="Def") doIt=true; break; }
				}
				if(doIt && mode==5 && rangeToDisplay!=1000 && ((playerCount<(rangeToDisplay-20)) || playerCount>(rangeToDisplay-1)) ) { doIt = false; playerCount++; }
				if(doIt) {
					playerCount++;
					if(doTopLine) var topLine = " newposition"; else var topLine = "";
					if(rowCount%2)
						tempRows += " <tr class='oddtablerow"  + topLine + "'" + b0_tar + ">";
					else
						tempRows += " <tr class='eventablerow" + topLine + "'" + b0_tar + ">";
					rowCount++;
					if(mode==5) var playerStatus = getPlayerStatus(pid,playerCount); else var playerStatus = "";
					var contract = getHabStatsAppContract(pid);
					var locked       = getHabStatsAppLocked(pid);
					try { var pctOwns      = habGlobalTopOwnsArray[pid].pct;     } catch(er) { var pctOwns = "0.0"; }
					try { var pctStarters  = habGlobalTopStartersArray[pid].pct; } catch(er) { var pctStarters = "0.0"; }
					tempRows += "  <td" + b0_tal + ">" + playerStatus + locked + "<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + pid + "' target='" + getHabTarget() + "'>" + formatName(playerDatabase['pid_' + pid].name) + "</a></td>"; //Name 
					tempRows += "  <td" + b0_tal + ">" + contract + "</td>";                              // Contract
					tempRows += "  <td" + b0_tar + ">" + playerDatabase['pid_' + pid].bye_week + "</td>"; //Bye
					tempRows += "  <td" + bl_tar + ">" + pctOwns + "</td>";                               //Percent Owns
					tempRows += "  <td" + b0_tar + ">" + pctStarters + "</td>";                           //Percent Starters
					var tempHtmlTable = tempRows;
					try {
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].gp      + "</td>"; //GP
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].pts_d   + "</td>"; //Pts by Def
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].pts_tot + "</td>"; //Pts by Team
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].p_yds   + "</td>"; //Pass Yds
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].ru_yds  + "</td>"; //Run Yds
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].yds     + "</td>"; //Total Yds
						// tempRows += "  <td" + b0_tar + ">" + statsArray[pid].f_tds   + "</td>"; //Fumble TDs
						// tempRows += "  <td" + b0_tar + ">" + statsArray[pid].int_tds + "</td>"; //Int TDs
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].tds     + "</td>"; //Total TDs
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].safety  + "</td>"; //Safety
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fr      + "</td>"; //Fumble Rec.
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].int     + "</td>"; //Int.
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].sack    + "</td>"; //Sack
						try {
							switch(mode) {
								case 1 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
								case 2 : { tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fan_pts.toFixed(statsDecimals) + "</td>   <td" + b0_tar + ">" + parseFloat(statsArray[pid].fan_pts/statsArray[pid].gp).toFixed(1) + "</td>"; break; }    //Fantasy Pts;
								case 3 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
								case 4 : { tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fan_pts.toFixed(statsDecimals) + "</td>   <td" + b0_tar + ">" + parseFloat(statsArray[pid].fan_pts/statsArray[pid].gp).toFixed(1) + "</td>"; break; }    //Fantasy Pts;
								case 5 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
							}
						} catch(er) {
							tempRows += "  <td" + bl_tar + ">n/a</td><td" + b0_tar + ">n/a</td>";
						}
						totals['TD'].gp      += statsArray[pid].gp;
						totals['TD'].pts_d   += statsArray[pid].pts_d;
						totals['TD'].pts_tot += statsArray[pid].pts_tot;
						totals['TD'].p_yds   += statsArray[pid].p_yds;
						totals['TD'].ru_yds  += statsArray[pid].ru_yds;
						totals['TD'].yds     += statsArray[pid].yds;
						totals['TD'].f_tds   += statsArray[pid].f_tds;
						totals['TD'].int_tds += statsArray[pid].int_tds;
        				totals['TD'].tds     += statsArray[pid].tds;
						totals['TD'].safety  += statsArray[pid].safety;
						totals['TD'].fr      += statsArray[pid].fr;
						totals['TD'].int     += statsArray[pid].int;
						totals['TD'].sack    += statsArray[pid].sack;
						if(mode==1||mode==3) 
							totals['TD'].fan_pts += playerScores[0][pid];
						else
							totals['TD'].fan_pts += statsArray[pid].fan_pts; 
						positionCount++;
					} catch(er) {
						tempRows = tempHtmlTable;
						tempRows += "  <td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td>";
					}
					doTopLine = false;
					tempRows += " </tr>";
				}
			}
		}
		if(tempRows!="") {
			htmlTable += tempTable;
			htmlTable += tempRows;
			if(mode!=5) htmlTable += " <tr class='newposition'><th colspan='5'" + b0_tal + ">Totals</th><th" + bl_tar + ">" + totals['TD'].gp + "</th><th" + bl_tar + ">" + totals['TD'].pts_d + "</th><th" + b0_tar + ">" + totals['TD'].pts_tot + "</th><th" + bl_tar + ">" + totals['TD'].p_yds + "</th><th" + b0_tar + ">" + totals['TD'].ru_yds + "</th><th" + b0_tar + ">" + totals['TD'].yds + "</th><th" + bl_tar + ">" + totals['TD'].tds + "</th><th" + bl_tar + ">" + totals['TD'].safety + "</th><th" + bl_tar + ">" + totals['TD'].fr + "</th><th" + b0_tar + ">" + totals['TD'].int + "</th><th" + bl_tar + ">" + totals['TD'].sack + "</th><th" + bl_tar + ">" + totals['TD'].fan_pts.toFixed(statsDecimals) + "</th><th" + b0_tar + ">" + parseFloat(totals['TD'].fan_pts/(totals['TD'].gp/positionCount)/positionCount).toFixed(1) + "</th></tr>";
			htmlTable += "</table>\n";
		} 


		// IDP's
		var positionCount = 0;
		var playerCount   = 0;
		totals['D'] = new PlayerDefense(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var tempTable="";
		tempTable += "<table width='100%' border='0' cellspacing='0' class='report' id='habStatsTable'>";
		tempTable += " <tr><th colspan='6'" + b0_tal + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Percent</th><th" + bl_tac + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Tackles</th><th colspan='2'" + bl_tac + ">Assists</th><th" + bl_tac + ">&nbsp;</th><th colspan='3'" + bl_tac + ">Turnovers</th><th colspan='3'" + bl_tac + ">TD</th><th" + bl_tac + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Fantasy Pts</th></tr>";
		tempTable += " <tr><th colspan='3'" + b0_tal + ">Player</th><th" + b0_tal + ">Pos</th><th" + b0_tal + ">NFL</th><th" + b0_tar + ">Bye</th>";
		if(globalHeaderClickStatsApp) {
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"own\")'>Own</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"start\")'>Start</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"gp\")'>GP</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"tkl_d\")'>Def</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"tkl_st\")'>ST</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"ass_d\")'>Def</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"ass_st\")'>ST</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"sack\")'>Sack</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"ff\")'>FF</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"fr\")'>FR</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"int\")'>Int</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"td_d\")'>Def</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"td_st\")'>ST</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"tds\")'>Total</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"safety\")'>Safety</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"fan_pts\")'>Total</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"avg_pts\")'>Avg.</a></th>";
		} else {
			tempTable += "<th" + bl_tar + ">Own</th>";
			tempTable += "<th" + b0_tar + ">Start</th>";
			tempTable += "<th" + bl_tar + ">GP</th>";
			tempTable += "<th" + bl_tar + ">Def</th>";
			tempTable += "<th" + b0_tar + ">ST</th>";
			tempTable += "<th" + bl_tar + ">Def</th>";
			tempTable += "<th" + b0_tar + ">ST</th>";
			tempTable += "<th" + bl_tar + ">Sack</th>";
			tempTable += "<th" + bl_tar + ">FF</th>";
			tempTable += "<th" + b0_tar + ">FR</th>";
			tempTable += "<th" + b0_tar + ">Int</th>";
			tempTable += "<th" + bl_tar + ">Def</th>";
			tempTable += "<th" + b0_tar + ">ST</th>";
			tempTable += "<th" + b0_tar + ">Total</th>";
			tempTable += "<th" + bl_tar + ">Safety</th>";
			tempTable += "<th" + bl_tar + ">Total</th>";
			tempTable += "<th" + b0_tar + ">Avg.</th>";
		}
		tempTable += "</tr>";
		var tempRows = "";
		var rowCount = 1;
		for(var p=0; p<11; p++) {
			var doTopLine = true;
			for(var i=0; i<rosterArray.length; i++) {
				var pid = rosterArray[i];
				var doIt=false;
				var doIt=false;
				if(globalHeaderClickStatsApp) {
					switch(p) {
						case 0 : { if(globalPosSort=="DE"&&playerDatabase['pid_' + pid].position=="DE")     doIt=true; break; }
						case 1 : { if(globalPosSort=="DT"&&playerDatabase['pid_' + pid].position=="DT")     doIt=true; break; }
						case 2 : { if(globalPosSort=="TMDL"&&playerDatabase['pid_' + pid].position=="TMDL") doIt=true; break; }
						case 3 : { if(globalPosSort=="LB"&&playerDatabase['pid_' + pid].position=="LB")     doIt=true; break; }
						case 4 : { if(globalPosSort=="TMLB"&&playerDatabase['pid_' + pid].position=="TMLB") doIt=true; break; }
						case 5 : { if(globalPosSort=="CB"&&playerDatabase['pid_' + pid].position=="CB")     doIt=true; break; }
						case 6 : { if(globalPosSort=="S"&&playerDatabase['pid_' + pid].position=="S")       doIt=true; break; }
						case 7 : { if(globalPosSort=="TMDB"&&playerDatabase['pid_' + pid].position=="TMDB") doIt=true; break; }
						case 8 : { if(globalPosSort=="DEDT"&&(playerDatabase['pid_' + pid].position=="DE"||playerDatabase['pid_' + pid].position=="DT")) doIt=true; break; }
						case 9 : { if(globalPosSort=="CBS"&&(playerDatabase['pid_' + pid].position=="CB"||playerDatabase['pid_' + pid].position=="S")) doIt=true; break; }
						case 10: { if(globalPosSort=="ALLD"&&(playerDatabase['pid_' + pid].position=="DE"||playerDatabase['pid_' + pid].position=="DT"||playerDatabase['pid_' + pid].position=="LB"||playerDatabase['pid_' + pid].position=="CB"||playerDatabase['pid_' + pid].position=="S")) doIt=true; break; }
					}
				} else {
					switch(p) {
						case 0 : { if(playerDatabase['pid_' + pid].position=="DE")   doIt=true; break; }
						case 1 : { if(playerDatabase['pid_' + pid].position=="DT")   doIt=true; break; }
						case 2 : { if(playerDatabase['pid_' + pid].position=="TMDL") doIt=true; break; }
						case 3 : { if(playerDatabase['pid_' + pid].position=="LB")   doIt=true; break; }
						case 4 : { if(playerDatabase['pid_' + pid].position=="TMLB") doIt=true; break; }
						case 5 : { if(playerDatabase['pid_' + pid].position=="CB")   doIt=true; break; }
						case 6 : { if(playerDatabase['pid_' + pid].position=="S")    doIt=true; break; }
						case 7 : { if(playerDatabase['pid_' + pid].position=="TMDB") doIt=true; break; }
					}
				}
				if(doIt && mode==5 && rangeToDisplay!=1000 && ((playerCount<(rangeToDisplay-20)) || playerCount>(rangeToDisplay-1)) ) { doIt = false; playerCount++; }
				if(doIt) {
					playerCount++;
					if(doTopLine&&!globalHeaderClickStatsApp) var topLine = " newposition"; else var topLine = "";
					if(rowCount%2)
						tempRows += " <tr class='oddtablerow"  + topLine + "'" + b0_tar + ">";
					else
						tempRows += " <tr class='eventablerow" + topLine + "'" + b0_tar + ">";
					rowCount++;
					if(mode==5) var playerStatus = getPlayerStatus(pid,playerCount); else var playerStatus = "";
					var injuryStatus = getInjuryStatus(pid);
					var newsIcon     = getHabStatsAppNewsIcon(pid);
					var contract     = getHabStatsAppContract(pid);
					var locked       = getHabStatsAppLocked(pid);
					try { var pctOwns      = habGlobalTopOwnsArray[pid].pct;     } catch(er) { var pctOwns = "0.0"; }
					try { var pctStarters  = habGlobalTopStartersArray[pid].pct; } catch(er) { var pctStarters = "0.0"; }
					tempRows += "  <td" + b0_tal + ">" + playerStatus + locked + "<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + pid + "' target='" + getHabTarget() + "'>" + formatName(playerDatabase['pid_' + pid].name) + "</a>" + injuryStatus + "</td>"; //Name
					tempRows += "  <td" + b0_tac + ">" + newsIcon + "</td>";                              // News
					tempRows += "  <td" + b0_tac + ">" + contract + "</td>";                              // Contract
					tempRows += "  <td" + b0_tal + ">" + playerDatabase['pid_' + pid].position + "</td>"; //Pos
					tempRows += "  <td" + b0_tal + ">" + playerDatabase['pid_' + pid].team     + "</td>"; //NFL
					tempRows += "  <td" + b0_tar + ">" + playerDatabase['pid_' + pid].bye_week + "</td>"; //Bye
					tempRows += "  <td" + bl_tar + ">" + pctOwns + "</td>";                               //Percent Owns
					tempRows += "  <td" + b0_tar + ">" + pctStarters + "</td>";                           //Percent Starters
					var tempHtmlTable = tempRows;
					try {
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].gp     + "</td>"; //GP
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].tkl_d  + "</td>"; //Tackles Def
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].tkl_st + "</td>"; //Tackles ST
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].ass_d  + "</td>"; //Assist Def
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].ass_st + "</td>"; //Assist ST
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].sack   + "</td>"; //Sack
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].ff     + "</td>"; //FF
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].fr     + "</td>"; //FR
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].int    + "</td>"; //Int
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].td_d   + "</td>"; //TD Def
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].td_st  + "</td>"; //TD ST
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].tds    + "</td>"; //TD Total
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].safety + "</td>"; //Safety
						try {
							switch(mode) {
								case 1 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
								case 2 : { tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fan_pts.toFixed(statsDecimals) + "</td>   <td" + b0_tar + ">" + parseFloat(statsArray[pid].fan_pts/statsArray[pid].gp).toFixed(1) + "</td>"; break; }    //Fantasy Pts;
								case 3 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
								case 4 : { tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fan_pts.toFixed(statsDecimals) + "</td>   <td" + b0_tar + ">" + parseFloat(statsArray[pid].fan_pts/statsArray[pid].gp).toFixed(1) + "</td>"; break; }    //Fantasy Pts;
								case 5 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
							}
						} catch(er) {
							tempRows += "  <td" + bl_tar + ">n/a</td><td" + b0_tar + ">n/a</td>";
						}
						totals['D'].gp     += statsArray[pid].gp;
						totals['D'].tkl_d  += statsArray[pid].tkl_d;
						totals['D'].tkl_st += statsArray[pid].tkl_st;
						totals['D'].ass_d  += statsArray[pid].ass_d;
						totals['D'].ass_st += statsArray[pid].ass_st;
						totals['D'].sack   += statsArray[pid].sack;
						totals['D'].ff     += statsArray[pid].ff;
						totals['D'].fr     += statsArray[pid].fr;
						totals['D'].int    += statsArray[pid].int;
						totals['D'].td_d   += statsArray[pid].td_d;
						totals['D'].td_st  += statsArray[pid].td_st;
						totals['D'].tds    += statsArray[pid].tds;
						totals['D'].safety += statsArray[pid].safety;
						if(mode==1||mode==3) 
							totals['D'].fan_pts += playerScores[0][pid];
						else
							totals['D'].fan_pts += statsArray[pid].fan_pts; 
						positionCount++;
					} catch(er) {
						tempRows = tempHtmlTable;
						tempRows += "  <td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td>";
					}
					doTopLine = false;
					tempRows += " </tr>";
				}
			}
		}
		if(tempRows!="") {
			htmlTable += tempTable;
			htmlTable += tempRows;
			if(mode!=5) htmlTable += " <tr class='newposition'><th colspan='8'" + b0_tal + ">Totals</th><th" + bl_tar + ">" + totals['D'].gp + "</th><th" + bl_tar + ">" + totals['D'].tkl_d + "</th><th" + b0_tar + ">" + totals['D'].tkl_st + "</th><th" + bl_tar + ">" + totals['D'].ass_d + "</th><th" + b0_tar + ">" + totals['D'].ass_st + "</th><th" + bl_tar + ">" + totals['D'].sack + "</th><th" + bl_tar + ">" + totals['D'].ff + "</th><th" + b0_tar + ">" + totals['D'].fr + "</th><th" + b0_tar + ">" + totals['D'].int + "</th><th" + bl_tar + ">" + totals['D'].tds_d + "</th><th" + b0_tar + ">" + totals['D'].tds_st + "</th><th" + b0_tar + ">" + totals['D'].tds + "</th><th" + bl_tar + ">" + totals['D'].safety + "</th><th" + bl_tar + ">" + totals['D'].fan_pts.toFixed(statsDecimals) + "</th><th" + b0_tar + ">" + parseFloat(totals['D'].fan_pts/(totals['D'].gp/positionCount)/positionCount).toFixed(1) + "</th></tr>";
			htmlTable += "</table>\n";
		} 

		// TEAM SPECIAL TEAM
		var positionCount = 0;
		var playerCount   = 0;
		totals['ST'] = new PlayerSpecialTeam(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var tempTable="";
		tempTable += "<table width='100%' border='0' cellspacing='0' class='report' id='habStatsTable'>";
		tempTable += " <tr><th colspan='3'" + b0_tal + ">&nbsp;</th><th" + bl_tac + ">&nbsp;</th><th colspan='2'" + bl_tac + ">Percent</th><th colspan='2'" + bl_tac + ">TD</th><th colspan='4'" + bl_tac + ">Kick</th><th colspan='4'" + bl_tac + ">Punt</th><th colspan='2'" + bl_tac + ">Punt Block</th><th colspan='2'" + bl_tac + ">Fantasy Pts</th></tr>";
		tempTable += " <tr><th colspan='2'" + b0_tal + ">Team</th><th" + b0_tar + ">Bye</th>";
		if(globalHeaderClickStatsApp) {
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"own\")'>Own</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"start\")'>Start</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"gp\")'>GP</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"tds_f\")'>For</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"tds_a\")'>Allow</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"kr\")'>Ret</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"kr_yds\")'>Yds</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"kra\")'>Allow</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"kra_yds\")'>Yds</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"pr\")'>Ret</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"pr_yds\")'>Yds</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"pra\")'>Allow</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"pra_yds\")'>Yds</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"blk_p\")'>For</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"blk_pa\")'>Allow</a></th>";
			tempTable += "<th" + bl_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"fan_pts\")'>Total</a></th>";
			tempTable += "<th" + b0_tar + "><a href='#1' onclick='loopStatsAllPlayers(\"" + globalPosSort + "\"," + globalRangeSort + ",\"" + globalStatusSort + "\",\"avg_pts\")'>Avg.</a></th>";
		} else {
			tempTable += "<th" + bl_tar + ">Own</th>";
			tempTable += "<th" + b0_tar + ">Start</th>";
			tempTable += "<th" + bl_tar + ">GP</th>";
			tempTable += "<th" + bl_tar + ">For</th>";
			tempTable += "<th" + b0_tar + ">Allow</th>";
			tempTable += "<th" + bl_tar + ">Ret</th>";
			tempTable += "<th" + b0_tar + ">Yds</th>";
			tempTable += "<th" + b0_tar + ">Allow</th>";
			tempTable += "<th" + b0_tar + ">Yds</th>";
			tempTable += "<th" + bl_tar + ">Ret</th>";
			tempTable += "<th" + b0_tar + ">Yds</th>";
			tempTable += "<th" + b0_tar + ">Allow</th>";
			tempTable += "<th" + b0_tar + ">Yds</th>";
			tempTable += "<th" + bl_tar + ">For</th>";
			tempTable += "<th" + b0_tar + ">Allow</th>";
			tempTable += "<th" + bl_tar + ">Total</th>";
			tempTable += "<th" + b0_tar + ">Avg.</th>";
		}
		tempTable += "</tr>";
		var tempRows = "";
		var rowCount = 1;
		for(var p=0; p<1; p++) {
			var doTopLine = true;
			for(var i=0; i<rosterArray.length; i++) {
				var pid = rosterArray[i];
				var doIt=false;
				switch(p) {
					case 0 : { if(playerDatabase['pid_' + pid].position=="ST") doIt=true; break; }
				}
				if(doIt && mode==5 && rangeToDisplay!=1000 && ((playerCount<(rangeToDisplay-20)) || playerCount>(rangeToDisplay-1)) ) { doIt = false; playerCount++; }
				if(doIt) {
					playerCount++;
					if(doTopLine) var topLine = " newposition"; else var topLine = "";
					if(rowCount%2)
						tempRows += " <tr class='oddtablerow"  + topLine + "'" + b0_tar + ">";
					else
						tempRows += " <tr class='eventablerow" + topLine + "'" + b0_tar + ">";
					rowCount++;
					if(mode==5) var playerStatus = getPlayerStatus(pid,playerCount); else var playerStatus = "";
					var contract = getHabStatsAppContract(pid);
					var locked       = getHabStatsAppLocked(pid);
					try { var pctOwns      = habGlobalTopOwnsArray[pid].pct;     } catch(er) { var pctOwns = "0.0"; }
					try { var pctStarters  = habGlobalTopStartersArray[pid].pct; } catch(er) { var pctStarters = "0.0"; }
					tempRows += "  <td" + b0_tal + ">" + playerStatus + locked + "<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + pid + "' target='" + getHabTarget() + "'>" + formatName(playerDatabase['pid_' + pid].name) + "</a></td>"; //Name 
					tempRows += "  <td" + b0_tal + ">" + contract + "</td>";                              // Contract
					tempRows += "  <td" + b0_tar + ">" + playerDatabase['pid_' + pid].bye_week + "</td>"; //Bye
					tempRows += "  <td" + bl_tar + ">" + pctOwns + "</td>";                               //Percent Owns
					tempRows += "  <td" + b0_tar + ">" + pctStarters + "</td>";                           //Percent Starters
					var tempHtmlTable = tempRows;
					try {
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].gp      + "</td>"; //GP
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].tds_f   + "</td>"; //TD's Scored
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].tds_a   + "</td>"; //TD's Allowed
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].kr      + "</td>"; //Kick Returns
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].kr_yds  + "</td>"; //Yards
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].kra     + "</td>"; //Kick Returns Allowed
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].kra_yds + "</td>"; //Yards
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].pr      + "</td>"; //Punt Returns
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].pr_yds  + "</td>"; //Yards
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].pra     + "</td>"; //Punt Returns Allowed
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].pra_yds + "</td>"; //Yds
						tempRows += "  <td" + bl_tar + ">" + statsArray[pid].blk_p   + "</td>"; //Blocked Punts
						tempRows += "  <td" + b0_tar + ">" + statsArray[pid].blk_pa  + "</td>"; //Block Punts Allowed
						try {
							switch(mode) {
								case 1 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
								case 2 : { tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fan_pts.toFixed(statsDecimals) + "</td>   <td" + b0_tar + ">" + parseFloat(statsArray[pid].fan_pts/statsArray[pid].gp).toFixed(1) + "</td>"; break; }    //Fantasy Pts;
								case 3 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
								case 4 : { tempRows += "  <td" + bl_tar + ">" + statsArray[pid].fan_pts.toFixed(statsDecimals) + "</td>   <td" + b0_tar + ">" + parseFloat(statsArray[pid].fan_pts/statsArray[pid].gp).toFixed(1) + "</td>"; break; }    //Fantasy Pts;
								case 5 : { tempRows += "  <td" + bl_tar + ">" + playerScores[0][pid].toFixed(statsDecimals)    + "</td>   <td" + b0_tar + ">" + parseFloat(playerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; break; }    //Fantasy Pts;
							}
						} catch(er) {
							tempRows += "  <td" + bl_tar + ">n/a</td><td" + b0_tar + ">n/a</td>";
						}
						totals['ST'].gp      += statsArray[pid].gp;
						totals['ST'].tds_f   += statsArray[pid].tds_f;
						totals['ST'].tds_a   += statsArray[pid].tds_a;
						totals['ST'].kr      += statsArray[pid].kr;
						totals['ST'].kr_yds  += statsArray[pid].kr_yds;
						totals['ST'].kra     += statsArray[pid].kra;
						totals['ST'].kra_yds += statsArray[pid].kra_yds;
						totals['ST'].pr      += statsArray[pid].pr;
						totals['ST'].pr_yds  += statsArray[pid].pr_yds;
						totals['ST'].pra     += statsArray[pid].pra;
						totals['ST'].pra_yds += statsArray[pid].pra_yds;
						totals['ST'].blk_p   += statsArray[pid].blk_p;
						totals['ST'].blk_pa  += statsArray[pid].blk_pa;
						if(mode==1||mode==3) 
							totals['ST'].fan_pts += playerScores[0][pid];
						else
							totals['ST'].fan_pts += statsArray[pid].fan_pts; 
						positionCount++; 
					} catch(er) {
						tempRows = tempHtmlTable;
						tempRows += "  <td" + bl_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td><td" + bl_tar + ">-</td><td" + b0_tar + ">-</td>";
					}
					doTopLine = false;
					tempRows += " </tr>";
				}
			}
		}
		if(tempRows!="") {
			htmlTable += tempTable;
			htmlTable += tempRows;
			if(mode!=5) htmlTable += " <tr class='newposition'><th colspan='5'" + b0_tal + ">Totals</th><th" + bl_tar + ">" + totals['ST'].gp + "</th><th" + bl_tar + ">" + totals['ST'].tds_f + "</th><th" + b0_tar + ">" + totals['ST'].tds_a + "</th><th" + bl_tar + ">" + totals['ST'].kr + "</th><th" + b0_tar + ">" + totals['ST'].kr_yds + "</th><th" + b0_tar + ">" + totals['ST'].kra + "</th><th" + b0_tar + ">" + totals['ST'].kra_yds + "</th><th" + bl_tar + ">" + totals['ST'].pr + "</th><th" + b0_tar + ">" + totals['ST'].pr_yds + "</th><th" + b0_tar + ">" + totals['ST'].pra + "</th><th" + b0_tar + ">" + totals['ST'].pra_yds + "</th><th" + bl_tar + ">" + totals['ST'].blk_p + "</th><th" + b0_tar + ">" + totals['ST'].blk_pa + "</th><th" + bl_tar + ">" + totals['ST'].fan_pts.toFixed(statsDecimals) + "</th><th" + b0_tar + ">" + parseFloat(totals['ST'].fan_pts/(totals['ST'].gp/positionCount)/positionCount).toFixed(1) + "</th></tr>";
			htmlTable += "</table>\n";
		} 

		switch(mode) {
			case 1 : { htmlTable += " <a href=\"#1\" onClick=\"startersMode=true; doStarterStats('" + team + "','" + divToDisplay + "');\">Click here</a> to display starter totals only."; break; }
			case 2 : { htmlTable += " <a href=\"#1\" onClick=\"startersMode=false; doRosterStats('" + team + "','" + divToDisplay + "');\">Click here</a> to display current roster totals."; break; }
		}
		if(mode==1||mode==2) htmlTable += statsFooter;
		htmlTable += "</td></tr></table>";

		if(mode==1||mode==2) { 
			try {
				document.getElementById(divToDisplay).innerHTML = htmlTable;
			} catch(er) {
				try {
					document.getElementById("rosterstats").innerHTML = htmlTable;
				} catch(er) {
					document.getElementById("teamStatsApp").innerHTML = htmlTable;
				}
			}
		} else {
			return htmlTable;
		}
	}

	function getStarterStats(team,divToDisplay,setReturn) {
		var rosterArray   = new Array();
		var statsArray    = new Array();
		var playerFound   = new Array();
		var playerCount   = 0;
		for(var i=1; i<=completedWeek; i++) {
			var weeklyArray =  makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+i, 'parseWeeklyResultsStartersXML','weeklyResults',true);
			var starterString = weeklyArray[team];
			var length = parseInt((starterString.length)/5,10);
			for (var j=0; j<length; j++) {
				var pid   = starterString.substr(j*5,4);
				var p = playerDatabase['pid_' + pid].position;
				var mode = "";
				if(p=="QB"||p=="RB"||p=="WR"||p=="TE"||p=="PK"||p=="TMQB"||p=="TMTE"||p=="TMPK")
					mode = "O"
				else if(p=="Def")
						mode = "TD"
				else if(p=="ST") 
					mode = "ST"
				else mode = "D";
				if(playerFound[pid]==undefined) {
					playerFound[pid] = true;
					rosterArray[playerCount] = pid;
					try {
						statsArray[pid] = habStarterStats[i][pid];
						statsArray[pid].gp = 1;
					} catch(er) {
						switch(mode) {
							case "O"  : { statsArray[pid] = new PlayerOffense(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); break; }
							case "TD" : { statsArray[pid] = new PlayerTeamDefense(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); break; }
							case "D"  : { statsArray[pid] = new PlayerDefense(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); break; }
							case "ST" : { statsArray[pid] = new PlayerSpecialTeam(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); break; }
						}
					}
					if(playerScores[i][pid]==undefined) {
						statsArray[pid].fan_pts = 0;
					} else {
						statsArray[pid].fan_pts = playerScores[i][pid];
					}
					playerCount++;
				} else {
					statsArray[pid].gp += 1;  // Player was starter therefore must add Game Played even if 0 in stats file
					try {
						switch(mode) {
							case "O"  : {
								statsArray[pid].comp    += habStarterStats[i][pid].comp;
								statsArray[pid].passes  += habStarterStats[i][pid].passes;
								statsArray[pid].p_yards += habStarterStats[i][pid].p_yards;
								statsArray[pid].p_tds   += habStarterStats[i][pid].p_tds;
								statsArray[pid].p_ints  += habStarterStats[i][pid].p_ints;
								statsArray[pid].fl      += habStarterStats[i][pid].fl;
								statsArray[pid].runs    += habStarterStats[i][pid].runs;
								statsArray[pid].ru_yds  += habStarterStats[i][pid].ru_yds;
								statsArray[pid].ru_tds  += habStarterStats[i][pid].ru_tds;
								statsArray[pid].rec     += habStarterStats[i][pid].rec;
								statsArray[pid].trgt    += habStarterStats[i][pid].trgt;
								statsArray[pid].re_yds  += habStarterStats[i][pid].re_yds;
								statsArray[pid].re_tds  += habStarterStats[i][pid].re_tds;
								statsArray[pid].tds     += habStarterStats[i][pid].tds;
								statsArray[pid].two_pt  += habStarterStats[i][pid].two_pt;
								statsArray[pid].fg_att  += habStarterStats[i][pid].fg_att;
								statsArray[pid].fg      += habStarterStats[i][pid].fg;
								statsArray[pid].pat_att += habStarterStats[i][pid].pat_att;
								statsArray[pid].pat     += habStarterStats[i][pid].pat;
								break;
							}
							case "TD" : {
								statsArray[pid].pts_d   += habStarterStats[i][pid].pts_d;
								statsArray[pid].pts_tot += habStarterStats[i][pid].pts_tot;
								statsArray[pid].p_yds   += habStarterStats[i][pid].p_yds;
								statsArray[pid].ru_yds  += habStarterStats[i][pid].ru_yds;
								statsArray[pid].yds     += habStarterStats[i][pid].yds;
								statsArray[pid].f_tds   += habStarterStats[i][pid].f_tds;
								statsArray[pid].int_tds += habStarterStats[i][pid].int_tds;
								statsArray[pid].tds     += habStarterStats[i][pid].tds;
								statsArray[pid].safety  += habStarterStats[i][pid].safety;
								statsArray[pid].fr      += habStarterStats[i][pid].fr;
								statsArray[pid].int     += habStarterStats[i][pid].int;
								statsArray[pid].sack    += habStarterStats[i][pid].sack;
								break;
							}
							case "D"  : {
								statsArray[pid].tkl_d  += habStarterStats[i][pid].tkl_d;
								statsArray[pid].tkl_st += habStarterStats[i][pid].tkl_st;
								statsArray[pid].ass_d  += habStarterStats[i][pid].ass_d;
								statsArray[pid].ass_st += habStarterStats[i][pid].ass_st;
								statsArray[pid].sack   += habStarterStats[i][pid].sack;
								statsArray[pid].ff     += habStarterStats[i][pid].ff;
								statsArray[pid].fr     += habStarterStats[i][pid].fr;
								statsArray[pid].int    += habStarterStats[i][pid].int;
								statsArray[pid].td_d   += habStarterStats[i][pid].td_d;
								statsArray[pid].td_st  += habStarterStats[i][pid].td_st;
								statsArray[pid].tds    += habStarterStats[i][pid].tds;
								statsArray[pid].safety += habStarterStats[i][pid].safety;
								break;
							}
							case "ST" : {
								statsArray[pid].tds_f   += habStarterStats[i][pid].tds_f;
								statsArray[pid].safety  += habStarterStats[i][pid].safety;
								statsArray[pid].tds_a   += habStarterStats[i][pid].tds_a;
								statsArray[pid].kr      += habStarterStats[i][pid].kr;
								statsArray[pid].kr_yds  += habStarterStats[i][pid].kr_yds;
								statsArray[pid].kra     += habStarterStats[i][pid].kra;
								statsArray[pid].kra_yds += habStarterStats[i][pid].kra_yds;
								statsArray[pid].pr      += habStarterStats[i][pid].pr;
								statsArray[pid].pr_yds  += habStarterStats[i][pid].pr_yds;
								statsArray[pid].pra     += habStarterStats[i][pid].pra;
								statsArray[pid].pra_yds += habStarterStats[i][pid].pra_yds;
								statsArray[pid].blk_p   += habStarterStats[i][pid].blk_p;
								statsArray[pid].blk_pa  += habStarterStats[i][pid].blk_pa;
								break;
							}
						}
					} catch(er) {
						// no Nothing statsArray[pid][k] += 0;
					}
					if(playerScores[i][pid]==undefined) {
						statsArray[pid].fan_pts += 0;
					} else {
						statsArray[pid].fan_pts += playerScores[i][pid];
					}
				} 
			}
		}
		if(setReturn) {
			var mergedArray = new Array();
			mergedArray[0] = rosterArray;
			mergedArray[1] = statsArray;
			return mergedArray;
		} else {
			doStatsTable(rosterArray,statsArray,team,2,divToDisplay,0);
		}
	}

	function doRosterStatsIntro() {
		var intro = statsFrameContent;
		document.getElementById("rosterstats").innerHTML = intro;
	}

	function doStarterStats(thisTeam,divToDisplay) {
		globalHeaderClickStatsApp = false;
		if(divToDisplay==undefined) playerStatsDiv=""; else playerStatsDiv = divToDisplay;
		if(startersMode) { 
			playerStatsTeam = thisTeam;
			var waitTime = 0;
			if(!starterStatsAdded) {
				playerStatsDiv = divToDisplay;
				try {
					document.getElementById(playerStatsDiv).innerHTML = "<center>Loading Data Arrays . . . Please wait.</center>";
				} catch(er) {
					try {
						document.getElementById("rosterstats").innerHTML = "<center>Loading Weekly Data Arrays . . . Please wait.</center>";
					} catch(er) {
						document.getElementById("teamStatsApp").innerHTML = "<center>Loading Weekly Data Arrays . . . Please wait.</center>";
					}
				}
				makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id, 'parseHabRosterXML','rosters',false);
				for(var i=1; i<=completedWeek; i++) {
					var statFile = 'http://www.habman.com/mfl/apps/js/stats/' + year + '/habPlayerStats' + i + '.js';
					habAddJavascript(statFile); 
					var weeklyScores = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=playerScores&L="+league_id+"&W=" + i, 'parsePlayerScoresStatsXML','playerScores',true);
					playerScores[i] = new Array();
					playerScores[i] = weeklyScores;
				}
				starterStatsAdded = true;
				waitTime = 2000;
			}
			setTimeout("getStarterStats(playerStatsTeam,playerStatsDiv,false)",waitTime);
		} else {
			doRosterStats(thisTeam,playerStatsDiv);
		}
	}

	function doRosterStats(thisTeam,divToDisplay) {
		globalHeaderClickStatsApp = false;
		if(divToDisplay==undefined) playerStatsDiv=""; else playerStatsDiv = divToDisplay;
		if(divToDisplay==101) playerStatsDiv = "rosterstats101";
		if(divToDisplay==102) playerStatsDiv = "rosterstats102";
		if(!startersMode) {
			playerStatsTeam = thisTeam;
			var waitTime = 0;
			if(!playerStatsAdded) {
				try {
					document.getElementById(playerStatsDiv).innerHTML = "<center>Loading Data Arrays . . . Please wait.</center>";
				} catch(er) {
					try {
						document.getElementById("rosterstats").innerHTML = "<center>Loading Data Array . . . Please wait.</center>";
					} catch(er) {
						document.getElementById("teamStatsApp").innerHTML = "<center>Loading Data Array . . . Please wait.</center>";
					}
				}
				habAddJavascript('http://www.habman.com/mfl/apps/js/stats/' + year + '/habPlayerStats.js'); 
				makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id, 'parseHabRosterXML','rosters',false);
				var weeklyScores = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=playerScores&L="+league_id+"&W=YTD", 'parsePlayerScoresStatsXML','playerScores',true);
				playerScores[0] = new Array;
				playerScores[0] = weeklyScores;
				playerStatsAdded = true;
				waitTime = 2000;
			} 
			setTimeout("doStatsTable(habGlobalRostersArray[playerStatsTeam],habPlayerStats,playerStatsTeam,1,playerStatsDiv,0)",waitTime);
		} else {
			doStarterStats(thisTeam,playerStatsDiv);
		}
	}

	function statsSetupByDivision(thisDiv) {
		habAddCss('http://www.habman.com/mfl/tabcontentdefault.css');
		var htmlCode = "";
		htmlCode += '<ul id="ROSTER_DIVISIONS" class="habdefaulttabs">\n';
		for(var i=0; i<habGlobalNumDivisions; i++) {
			if(i==0) var select=' class="selected"'; else var select="";
			htmlCode += '<li onClick="doRosterStatsIntro();"'+ select +'><a href="#1" rel="tcontent' + i + '">' + leagueAttributes['Divisions'][i] + '</a> </li>\n';
		}
		htmlCode+= '</ul>\n\n';
		htmlCode+= '<div class="habdefaulttabcontentstyle">\n';
		htmlCode+= '<table border="0">\n';
		htmlCode+= ' <tr>\n';
		htmlCode+= '  <td valign="top">\n\n';
		for(var i=0; i<habGlobalNumDivisions; i++) {
			htmlCode+= '    <div id="tcontent' + i + '" class="habdefaulttabcontent">\n';
			for(var j=0; j<habGlobalFranchiseKey.length; j++) {
				var fid = habGlobalFranchiseKey[j];
				var icon = getHabTeamIcon(statsIconLeagueDefault,statsLogoLeagueDefault,statsIconURL,statsIconExt,"statsicon",fid,false);
				var name = getHabTeamName(hideStatsName,useStatsNickNames,statsNickNames,fid);
				if(i==habGlobalTeamInfo[fid]['division']) 
					htmlCode+= '    <a href="#1" title="' + franchiseDatabase['fid_' + fid].name + '" onClick="doRosterStats(\'' + fid + '\',\'rosterstats\');">' + icon + name + '</a><br />\n';
			}
			htmlCode+= '    </div>\n\n';
		}
		htmlCode+= '  </td>\n';
		htmlCode+= '  <td valign="top" width="100%">\n\n';
		htmlCode+= '   <div id="rosterstats"></div>\n\n';
		htmlCode+= '  </td>\n';
		htmlCode+= ' </tr>\n';
		htmlCode+= '</table>\n\n';
		htmlCode+= '</div>\n';
		document.getElementById(thisDiv).innerHTML = htmlCode;
	}

	function statsSetupDropDown() {
		var htmlCode = "<b>TEAM STATISTICS</b><br /><br />";
		htmlCode+= "<b>Select a Franchise:</b>&nbsp;<select onchange='doRosterStats(this.options[this.selectedIndex].value)' id='habStatsSelect'>";
		htmlCode+="<option>&nbsp;</option>";
		for(var i=1; i<habGlobalFranchiseKey.length; i++) {
			htmlCode+="<option value='" + habGlobalFranchiseKey[i] + "'>" + franchiseDatabase['fid_' + habGlobalFranchiseKey[i]].name + "</option>";
		}
		htmlCode+= "</select>";
		htmlCode+= "<br /><br /><div id='rosterstats'></div>";
		document.getElementById("teamStatsApp").innerHTML = htmlCode;
	}

	function statsSetupDropDown2() {
		var htmlCode = "<b>TWO TEAM STATISTICS COMPARISON</b><br /><br />";
		htmlCode+= "<table id='habTwoTeamComparison'>";

		htmlCode+= "<tr id='habTeamAComparison'><td valign='top'><b>Select a Franchise A:</b>&nbsp;<select onchange='doRosterStats(this.options[this.selectedIndex].value,101)' id='habStatsSelect'>";
		htmlCode+="<option>&nbsp;</option>";
		for(var i=1; i<habGlobalFranchiseKey.length; i++) {
			htmlCode+="<option value='" + habGlobalFranchiseKey[i] + "'>" + franchiseDatabase['fid_' + habGlobalFranchiseKey[i]].name + "</option>";
		}
		htmlCode+= "</select><br /><br /><div id='rosterstats101'></div></td></tr>";

		htmlCode+= "<tr id='habTeamBComparison'><td valign='top'><b>Select a Franchise B:</b>&nbsp;<select onchange='doRosterStats(this.options[this.selectedIndex].value,102)' id='habStatsSelect'>";
		htmlCode+="<option>&nbsp;</option>";
		for(var i=1; i<habGlobalFranchiseKey.length; i++) {
			htmlCode+="<option value='" + habGlobalFranchiseKey[i] + "'>" + franchiseDatabase['fid_' + habGlobalFranchiseKey[i]].name + "</option>";
		}
		htmlCode+= "</select><br /><br /><div id='rosterstats102'></div></td></tr>";

		htmlCode+= "</table>";
		document.getElementById("teamStatsApp").innerHTML = htmlCode;
	}

	function doHabStatsSetup(which) {
		switch (which) {
			case 1 : { statsSetupByDivision("teamStatsApp");  break; }
			case 2 : { statsSetupDropDown();                  break; }
			case 3 : { statsSetupByDivision("teamStatsApp2"); break; }
			case 4 : { statsSetupDropDown2();                 break; }
		}
	}

	function loopStatsAllTeams(mode) {
		var htmlTable = "<br /><br /><h2>Team Statistics</h2><br />";
		if(mode==1) {
			htmlTable += "<center><a href='#1' onClick='doStartersAllTeams();'>Click here</a> to display starter totals only.</center><br /><br />";
			for(var i=0; i<habGlobalFranchiseKey.length; i++) {
				var fid = habGlobalFranchiseKey[i];
				var newTeam = doStatsTable(habGlobalRostersArray[fid],habPlayerStats,fid,3,"",0);
				htmlTable += newTeam + "<br /><br /><br />";
			}
		} else {
			htmlTable += "<center><a href='#1' onClick='doStatsAllTeams();'>Click here</a> to display current roster totals.</center><br /><br />";
			for(var i=0; i<habGlobalFranchiseKey.length; i++) {
				var fid = habGlobalFranchiseKey[i];
				var mergedArray  = getStarterStats(fid,"",true);
				var starterArray = mergedArray[0];
				var statsArray   = mergedArray[1];
				var newTeam = doStatsTable(starterArray,statsArray,fid,4,"",0);
				htmlTable += newTeam + "<br /><br /><br />";
			}   
		}
		htmlTable += statsFooter + "<br /><br />";
		document.getElementById("teamStatsApp").innerHTML = "<center>" + htmlTable + "</center>"; 
	}

	function doStatsAllTeams() {
		document.getElementById("teamStatsApp").innerHTML = "<br /><br /><h2>Processing Data . . . . Please Wait</h2>"; 
		var waitTime = 0;
		if(!playerStatsAdded) {
			habAddJavascript('http://www.habman.com/mfl/apps/js/stats/' + year + '/habPlayerStats.js'); 
			makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id, 'parseHabRosterXML','rosters',false);
			var weeklyScores = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=playerScores&L="+league_id+"&W=YTD", 'parsePlayerScoresStatsXML','playerScores',true);
			playerScores[0] = new Array;
			playerScores[0] = weeklyScores;
			playerStatsAdded = true;
			waitTime = 2000;
		}
		setTimeout("loopStatsAllTeams(1)",waitTime);
	}

	function doStartersAllTeams() {
		document.getElementById("teamStatsApp").innerHTML = "<br /><br /><h2>Processing Data . . . . Please Wait</h2><center>(click continue for unresponsive script warning message)</center>"; 
		var waitTime = 0;
		if(!starterStatsAdded) {
			habAddJavascript('http://www.habman.com/mfl/apps/js/stats/' + year + '/habPlayerStats.js'); 
			makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id, 'parseHabRosterXML','rosters',false);
			for(var i=1; i<=completedWeek; i++) {
				var statFile = 'http://www.habman.com/mfl/apps/js/stats/' + year + '/habPlayerStats' + i + '.js';
				habAddJavascript(statFile); 
				var weeklyScores = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=playerScores&L="+league_id+"&W=" + i, 'parsePlayerScoresStatsXML','playerScores',true);
				playerScores[i] = new Array();
				playerScores[i] = weeklyScores;
			}
			starterStatsAdded = true;
			waitTime = 2000;
		}
		setTimeout("loopStatsAllTeams(2)",waitTime);
	}

	function loopStatsAllPlayers(thisPosition,thisRange,thisStatus,thisSort) {
		// document.getElementById("teamStatsApp").innerHTML = "";
		var currentURL = unescape(location.href);
		var position  = "QB";
		var position1 = "";
		var position2 = "";
		var position3 = "";
		var position4 = "";
		var position5 = "";
		var rangeToDisplay = 20;
		var playerStatus = "All";
		var playerSort = "fan_pts";
		var grouping   = "O";

		var htmlTable = "<br /><br /><table border='0' style='width: 400px; border:0px; border-collapse: collapse' class='report'><tr><td style='border:0px; text-align:center'>";

		if(thisPosition!=undefined) position = thisPosition;    else position = "QB";
		if(thisRange!=undefined)    rangeToDisplay = thisRange; else rangeToDisplay = 20;
		if(thisStatus!=undefined)   playerStatus = thisStatus;  else playerStatus = "All";
		if(thisSort!=undefined)     playerSort = thisSort;      else playerSort = "fan_pts";

		globalStatusSort = playerStatus;
		globalPosSort = position;
		globalRangeSort = rangeToDisplay;

		if(position=="QB")   { var selQB="selected ";   grouping = "O"; }  else var selQB="";
		if(position=="RB")   { var selRB="selected ";   grouping = "O"; }  else var selRB="";
		if(position=="WR")   { var selWR="selected ";   grouping = "O"; }  else var selWR="";
		if(position=="TE")   { var selTE="selected ";   grouping = "O"; }  else var selTE="";
		if(position=="PK")   { var selPK="selected ";   grouping = "O"; }  else var selPK="";
		if(position=="Def")  { var selDef="selected ";  grouping = "TD"; } else var selDef="";
		if(position=="ST")   { var selST="selected ";   grouping = "ST"; } else var selST="";
		if(position=="DE")   { var selDE="selected ";   grouping = "D"; }  else var selDE="";
		if(position=="DT")   { var selDT="selected ";   grouping = "D"; }  else var selDT="";
		if(position=="LB")   { var selLB="selected ";   grouping = "D"; }  else var selLB="";
		if(position=="CB")   { var selCB="selected ";   grouping = "D"; }  else var selCB="";
		if(position=="S")    { var selS="selected ";    grouping = "D"; }  else var selS="";
		if(position=="TMQB") { var selTMQB="selected "; grouping = "O"; }  else var selTMQB="";
		if(position=="TMTE") { var selTMTE="selected "; grouping = "O"; }  else var selTMTE="";
		if(position=="TMPK") { var selTMPK="selected "; grouping = "O"; }  else var selTMPK="";
		if(position=="TMDL") { var selTMDL="selected "; grouping = "D"; }  else var selTMDL="";
		if(position=="TMLB") { var selTMLB="selected "; grouping = "D"; }  else var selTMLB="";
		if(position=="TMDB") { var selTMDB="selected "; grouping = "D"; }  else var selTMDB="";

		if(position=="ALLO")   { var selALLO="selected ";   grouping = "O"; position1="QB"; position2="RB"; position3="WR"; position4="TE"; position5="PK"; }  else var selALLO="";
		if(position=="ALLD")   { var selALLD="selected ";   grouping = "D"; position1="DE"; position2="DT"; position3="LB"; position4="CB"; position5="S";  }  else var selALLD="";
		if(position=="WRTE")   { var selWRTE="selected ";   grouping = "O"; position1="WR"; position2="TE"; }  else var selWRTE="";
		if(position=="RBWRTE") { var selRBWRTE="selected "; grouping = "O"; position1="RB"; position2="WR"; position3="TE"; }  else var selRBWRTE="";
		if(position=="DEDT")   { var selDEDT="selected ";   grouping = "D"; position1="DE"; position2="DT"; }  else var selDEDT="";
		if(position=="CBS")    { var selCBS="selected ";    grouping = "D"; position1="CB"; position2="S";  }  else var selCBS="";

		var idCount = 0;
		var allPlayerIDs = new Array();
		var sortArray    = new Array();
		for(i=0;i<habPlayerKey.length;i++) {
			try {
				var pid = habPlayerKey[i];
				if(habGlobalPlayersArray[pid]==undefined) var freeAgent = true; else var freeAgent = false;
				if((playerDatabase['pid_' + pid].position==position||playerDatabase['pid_' + pid].position==position1||playerDatabase['pid_' + pid].position==position2||playerDatabase['pid_' + pid].position==position3||playerDatabase['pid_' + pid].position==position4||playerDatabase['pid_' + pid].position==position5)&&(playerStatus=="All"||(playerStatus=="FA"&&freeAgent))) {
					allPlayerIDs[idCount] = playerDatabase['pid_' + pid].id;
					switch (grouping) {
						case "O" : { 
							switch(playerSort) {
								case "own"     : { try { var score = parseFloat(habGlobalTopOwnsArray[pid].pct,10); } catch(er) { var score = 0; } break; }
								case "start"   : { try { var score = parseFloat(habGlobalTopStartersArray[pid].pct,10); } catch(er) { var score = 0; } break; }
								case "gp"      : { var score = parseFloat(habPlayerStats[pid].gp,10); break; }
								case "comp"    : { var score = parseFloat(habPlayerStats[pid].comp,10); break; }
								case "passes"  : { var score = parseFloat(habPlayerStats[pid].passes,10); break; }
								case "p_yards" : { var score = parseFloat(habPlayerStats[pid].p_yards,10); break; }
								case "p_tds"   : { var score = parseFloat(habPlayerStats[pid].p_tds,10); break; }
								case "p_ints"  : { var score = parseFloat(habPlayerStats[pid].p_ints,10); break; }
								case "fl"      : { var score = parseFloat(habPlayerStats[pid].fl,10); break; }
								case "runs"    : { var score = parseFloat(habPlayerStats[pid].runs,10); break; }
								case "ru_yds"  : { var score = parseFloat(habPlayerStats[pid].ru_yds,10); break; }
								case "ru_tds"  : { var score = parseFloat(habPlayerStats[pid].ru_tds,10); break; }
								case "rec"     : { var score = parseFloat(habPlayerStats[pid].rec,10); break; }
								case "trgt"    : { var score = parseFloat(habPlayerStats[pid].trgt,10); break; }
								case "re_yds"  : { var score = parseFloat(habPlayerStats[pid].re_yds,10); break; }
								case "re_tds"  : { var score = parseFloat(habPlayerStats[pid].re_tds,10); break; }
								case "two_pt"  : { var score = parseFloat(habPlayerStats[pid].two_pt,10); break; }
								case "fg_att"  : { var score = parseFloat(habPlayerStats[pid].fg_att,10); break; }
								case "fg"      : { var score = parseFloat(habPlayerStats[pid].fg,10); break; }
								case "pat_att" : { var score = parseFloat(habPlayerStats[pid].pat_att,10); break; }
								case "pat"     : { var score = parseFloat(habPlayerStats[pid].pat,10); break; }
								case "fan_pts" : { if(playerScores[0][pid]==undefined) var score = -999; else var score = parseFloat(playerScores[0][pid],10); break; }
								case "avg_pts" : { if(playerScores[0][pid]==undefined) var score = -999; else var score = parseFloat(playerScores[0][pid]/habPlayerStats[pid].gp,10); break; }
							}
							break;
						} 
						case "D" : {
							switch(playerSort) {
								case "own"     : { try { var score = parseFloat(habGlobalTopOwnsArray[pid].pct,10); } catch(er) { var score = 0; } break; }
								case "start"   : { try { var score = parseFloat(habGlobalTopStartersArray[pid].pct,10); } catch(er) { var score = 0; } break; }
								case "gp"      : { var score = parseFloat(habPlayerStats[pid].gp,10); break; }
								case "tkl_d"   : { var score = parseFloat(habPlayerStats[pid].tkl_d,10); break; }
								case "tkl_st"  : { var score = parseFloat(habPlayerStats[pid].tkl_st,10); break; }
								case "ass_d"   : { var score = parseFloat(habPlayerStats[pid].ass_d,10); break; }
								case "ass_st"  : { var score = parseFloat(habPlayerStats[pid].ass_st,10); break; }
								case "sack"    : { var score = parseFloat(habPlayerStats[pid].sack,10); break; }
								case "ff"      : { var score = parseFloat(habPlayerStats[pid].ff,10); break; }
								case "fr"      : { var score = parseFloat(habPlayerStats[pid].fr,10); break; }
								case "int"     : { var score = parseFloat(habPlayerStats[pid].int,10); break; }
								case "td_d"    : { var score = parseFloat(habPlayerStats[pid].td_d,10); break; }
								case "td_st"   : { var score = parseFloat(habPlayerStats[pid].td_st,10); break; }
								case "tds"     : { var score = parseFloat(habPlayerStats[pid].tds,10); break; }
								case "safety"  : { var score = parseFloat(habPlayerStats[pid].safety,10); break; }
								case "fan_pts" : { if(playerScores[0][pid]==undefined) var score = -999; else var score = parseFloat(playerScores[0][pid],10); break; }
								case "avg_pts" : { if(playerScores[0][pid]==undefined) var score = -999; else var score = parseFloat(playerScores[0][pid]/habPlayerStats[pid].gp,10); break; }
							}
							break;
						} 
						case "TD" : {
							switch(playerSort) {
								case "own"     : { try { var score = parseFloat(habGlobalTopOwnsArray[pid].pct,10); } catch(er) { var score = 0; } break; }
								case "start"   : { try { var score = parseFloat(habGlobalTopStartersArray[pid].pct,10); } catch(er) { var score = 0; } break; }
								case "gp"      : { var score = parseFloat(habPlayerStats[pid].gp,10); break; }
								case "pts_d"   : { var score = parseFloat(habPlayerStats[pid].pts_d,10); break; }
								case "pts_tot" : { var score = parseFloat(habPlayerStats[pid].pts_tot,10); break; }
								case "p_yds"   : { var score = parseFloat(habPlayerStats[pid].p_yds,10); break; }
								case "ru_yds"  : { var score = parseFloat(habPlayerStats[pid].ru_yds,10); break; }
								case "yds"     : { var score = parseFloat(habPlayerStats[pid].yds,10); break; }
								case "f_tds"   : { var score = parseFloat(habPlayerStats[pid].f_tds,10); break; }
								case "int_tds" : { var score = parseFloat(habPlayerStats[pid].int_tds,10); break; }
								case "tds"     : { var score = parseFloat(habPlayerStats[pid].tds,10); break; }
								case "safety"  : { var score = parseFloat(habPlayerStats[pid].safety,10); break; }
								case "fr"      : { var score = parseFloat(habPlayerStats[pid].fr,10); break; }
								case "int"     : { var score = parseFloat(habPlayerStats[pid].int,10); break; }
								case "sack"    : { var score = parseFloat(habPlayerStats[pid].sack,10); break; }
								case "fan_pts" : { if(playerScores[0][pid]==undefined) var score = -999; else var score = parseFloat(playerScores[0][pid],10); break; }
								case "avg_pts" : { if(playerScores[0][pid]==undefined) var score = -999; else var score = parseFloat(playerScores[0][pid]/habPlayerStats[pid].gp,10); break; }
							}
							break;
						} 
						case "ST" : {
							switch(playerSort) {
								case "own"     : { try { var score = parseFloat(habGlobalTopOwnsArray[pid].pct,10); } catch(er) { var score = 0; } break; }
								case "start"   : { try { var score = parseFloat(habGlobalTopStartersArray[pid].pct,10); } catch(er) { var score = 0; } break; }
								case "gp"      : { var score = parseFloat(habPlayerStats[pid].gp,10); break; }
								case "tds_f"   : { var score = parseFloat(habPlayerStats[pid].tds_f,10); break; }
								case "safety"  : { var score = parseFloat(habPlayerStats[pid].safety,10); break; }
								case "tds_a"   : { var score = parseFloat(habPlayerStats[pid].tds_a,10); break; }
								case "kr"      : { var score = parseFloat(habPlayerStats[pid].kr,10); break; }
								case "kr_yds"  : { var score = parseFloat(habPlayerStats[pid].kr_yds,10); break; }
								case "kra"     : { var score = parseFloat(habPlayerStats[pid].kra,10); break; }
								case "kra_yds" : { var score = parseFloat(habPlayerStats[pid].kra_yds,10); break; }
								case "pr"      : { var score = parseFloat(habPlayerStats[pid].pr,10); break; }
								case "pr_yds"  : { var score = parseFloat(habPlayerStats[pid].pr_yds,10); break; }
								case "pra"     : { var score = parseFloat(habPlayerStats[pid].pra,10); break; }
								case "pra_yds" : { var score = parseFloat(habPlayerStats[pid].pra_yds,10); break; }
								case "blk_p"   : { var score = parseFloat(habPlayerStats[pid].blk_p,10); break; }
								case "blk_pa"  : { var score = parseFloat(habPlayerStats[pid].blk_pa,10); break; }
								case "fan_pts" : { if(playerScores[0][pid]==undefined) var score = -999; else var score = parseFloat(playerScores[0][pid],10); break; }
								case "avg_pts" : { if(playerScores[0][pid]==undefined) var score = -999; else var score = parseFloat(playerScores[0][pid]/habPlayerStats[pid].gp,10); break; }
							}
							break;
						} 
					}
					sortArray[idCount]   = { score:score,key:idCount };
					idCount++;
				}
			} catch(er) {
				// Do Nothing
			}
		}

		var selectPos = "<b>Position:</b>&nbsp;<select onchange='loopStatsAllPlayers(this.options[this.selectedIndex].value," + globalRangeSort + ",\"" + playerStatus + "\",\"" + playerSort + "\")' id='habStatsSelect'>";
		if(habStatsActivePositions['ALLO'])    selectPos+="<option " + selALLO   + "value='ALLO'>All Offense</option>";
		if(habStatsActivePositions['ALLD'])    selectPos+="<option " + selALLD   + "value='ALLD'>All Defense</option>";
		if(habStatsActivePositions['QB'])      selectPos+="<option " + selQB     + "value='QB'>QB</option>";
		if(habStatsActivePositions['RB'])      selectPos+="<option " + selRB     + "value='RB'>RB</option>";
		if(habStatsActivePositions['WR'])      selectPos+="<option " + selWR     + "value='WR'>WR</option>";
		if(habStatsActivePositions['TE'])      selectPos+="<option " + selTE     + "value='TE'>TE</option>";
		if(habStatsActivePositions['WR+TE'])   selectPos+="<option " + selWRTE   + "value='WRTE'>WR+TE</option>";
		if(habStatsActivePositions['RB+WR+TE'])selectPos+="<option " + selRBWRTE + "value='RBWRTE'>RB+WR+TE</option>";
		if(habStatsActivePositions['PK'])      selectPos+="<option " + selPK     + "value='PK'>PK</option>";
		if(habStatsActivePositions['Team D'])  selectPos+="<option " + selDef    + "value='Def'>Team D</option>";
		if(habStatsActivePositions['DE'])      selectPos+="<option " + selDE     + "value='DE'>DE</option>";
		if(habStatsActivePositions['DT'])      selectPos+="<option " + selDT     + "value='DT'>DT</option>";
		if(habStatsActivePositions['LB'])      selectPos+="<option " + selLB     + "value='LB'>LB</option>";
		if(habStatsActivePositions['CB'])      selectPos+="<option " + selCB     + "value='CB'>CB</option>";
		if(habStatsActivePositions['S'])       selectPos+="<option " + selS      + "value='S'>S</option>";
		if(habStatsActivePositions['DE+DT'])   selectPos+="<option " + selDEDT   + "value='DEDT'>DE+DT</option>";
		if(habStatsActivePositions['CB+S'])    selectPos+="<option " + selCBS    + "value='CBS'>CB+S</option>";
		if(habStatsActivePositions['Special']) selectPos+="<option " + selST     + "value='ST'>Special</option>";
		if(habStatsActivePositions['TMQB'])    selectPos+="<option " + selTMQB   + "value='TMQB'>Team QB</option>";
		if(habStatsActivePositions['TMTE'])    selectPos+="<option " + selTMTE   + "value='TMTE'>Team TE</option>";
		if(habStatsActivePositions['TMPK'])    selectPos+="<option " + selTMPK   + "value='TMPK'>Team PK</option>";
		if(habStatsActivePositions['TMDL'])    selectPos+="<option " + selTMDL   + "value='TMDL'>Team DL</option>";
		if(habStatsActivePositions['TMLB'])    selectPos+="<option " + selTMLB   + "value='TMLB'>Team LB</option>";
		if(habStatsActivePositions['TMDB'])    selectPos+="<option " + selTMDB   + "value='TMDB'>Team DB</option>";
		selectPos+= "</select>";
		htmlTable+= selectPos;// + "</td><td>";

		var selectRange = "&nbsp;&nbsp;&nbsp;<b>Top:</b>&nbsp;<select onchange='loopStatsAllPlayers(\"" + position + "\",this.options[this.selectedIndex].value,\"" + playerStatus + "\",\"" + playerSort + "\")' id='habStatsSelect'>";
		selectRange+="<option value='1000'>All</option>";
		for(var i=0; i<(parseInt((sortArray.length-1)/20)+1); i++) {
			if((i+1)==parseInt(rangeToDisplay/20)) var selected = "selected "; else var selected = "";
			selectRange+="<option " + selected + "value='" + (20*i+20) + "'>" + (i*20+20) + "</option>";
		}
		selectRange+= "</select>";
		htmlTable+= selectRange;// + "</td><td>";

		if(playerStatus=="All") var selAll="selected "; else var selAll="";
		if(playerStatus=="FA")  var selFA="selected ";  else var selFA="";

		var selectStatus = "&nbsp;&nbsp;&nbsp;<b>Players:</b>&nbsp;<select onchange='loopStatsAllPlayers(\"" + position + "\"," + rangeToDisplay + ",this.options[this.selectedIndex].value,\"" + playerSort + "\")' id='habStatsSelect'>";
		selectStatus+="<option " + selAll + "value='All'>All</option>";
		selectStatus+="<option " + selFA  + "value='FA'>Free Agents</option>";
		selectStatus+= "</select>";
		htmlTable+= selectStatus; //+"</td><td>";

		if(playerSort=="own")     var sel_own="selected ";     else var sel_own="";
		if(playerSort=="start")   var sel_start="selected ";   else var sel_start="";
		if(playerSort=="gp")      var sel_gp="selected ";      else var sel_gp="";
		if(playerSort=="p_yards") var sel_p_yards="selected "; else var sel_p_yards="";
		if(playerSort=="p_tds")   var sel_p_tds="selected ";   else var sel_p_tds="";
		if(playerSort=="p_ints")  var sel_p_ints="selected ";  else var sel_p_ints="";
		if(playerSort=="fl")      var sel_fl="selected ";      else var sel_fl="";
		if(playerSort=="ru_yds")  var sel_ru_yds="selected ";  else var sel_ru_yds="";
		if(playerSort=="ru_tds")  var sel_ru_tds="selected ";  else var sel_ru_tds="";
		if(playerSort=="rec")     var sel_rec="selected ";     else var sel_rec="";
		if(playerSort=="trgt")    var sel_trgt="selected ";    else var sel_trgt="";
		if(playerSort=="re_yds")  var sel_re_yds="selected ";  else var sel_re_yds="";
		if(playerSort=="re_tds")  var sel_re_tds="selected ";  else var sel_re_tds="";
		if(playerSort=="two_pt")  var sel_two_pt="selected ";  else var sel_two_pt="";
		if(playerSort=="fg_att")  var sel_fg_att="selected ";  else var sel_fg_att="";
		if(playerSort=="fg")      var sel_fg="selected ";      else var sel_fg="";
		if(playerSort=="pat_att") var sel_pat_att="selected "; else var sel_pat_att="";
		if(playerSort=="pat")     var sel_pat="selected ";     else var sel_pat="";
		if(playerSort=="fan_pts") var sel_fan_pts="selected "; else var sel_fan_pts="";
		if(playerSort=="avg_pts") var sel_avg_pts="selected "; else var sel_avg_pts="";
		if(playerSort=="tkl_d")   var sel_tkl_d="selected ";   else var sel_tkl_d="";
		if(playerSort=="tkl_st")  var sel_tkl_st="selected ";  else var sel_tkl_st="";
		if(playerSort=="ass_d")   var sel_ass_d="selected ";   else var sel_ass_d="";
		if(playerSort=="ass_st")  var sel_ass_st="selected ";  else var sel_ass_st="";
		if(playerSort=="sack")    var sel_sack="selected ";    else var sel_sack="";
		if(playerSort=="ff")      var sel_ff="selected ";      else var sel_ff="";
		if(playerSort=="fr")      var sel_fr="selected ";      else var sel_fr="";
		if(playerSort=="int")     var sel_int="selected ";     else var sel_int="";
		if(playerSort=="td_d")    var sel_td_d="selected ";    else var sel_td_d="";
		if(playerSort=="td_st")   var sel_td_st="selected ";   else var sel_td_st="";
		if(playerSort=="tds")     var sel_tds="selected ";     else var sel_tds="";
		if(playerSort=="safety")  var sel_safety="selected ";  else var sel_safety="";
		if(playerSort=="pts_d")   var sel_pts_d="selected ";   else var sel_pts_d="";
		if(playerSort=="pts_tot") var sel_pts_tot="selected "; else var sel_pts_tot="";
		if(playerSort=="p_yds")   var sel_p_yds="selected ";   else var sel_p_yds="";
		if(playerSort=="yds")     var sel_yds="selected ";     else var sel_yds="";
		if(playerSort=="f_tds")   var sel_f_tds="selected ";   else var sel_f_tds="";
		if(playerSort=="int_tds") var sel_int_tds="selected "; else var sel_int_tds="";
		if(playerSort=="tds_f")   var sel_tds_f="selected ";   else var sel_tds_f="";
		if(playerSort=="tds_a")   var sel_tds_a="selected ";   else var sel_tds_a="";
		if(playerSort=="kr")      var sel_kr="selected ";      else var sel_kr="";
		if(playerSort=="kr_yds")  var sel_kr_yds="selected ";  else var sel_kr_yds="";
		if(playerSort=="kra")     var sel_kra="selected ";     else var sel_kra="";
		if(playerSort=="kra_yds") var sel_kra_yds="selected "; else var sel_kra_yds="";
		if(playerSort=="pr")      var sel_pr="selected ";      else var sel_pr="";
		if(playerSort=="pr_yds")  var sel_pr_yds="selected ";  else var sel_pr_yds="";
		if(playerSort=="pra")     var sel_pra="selected ";     else var sel_pra="";
		if(playerSort=="pra_yds") var sel_pra_yds="selected "; else var sel_pra_yds="";
		if(playerSort=="blk_p")   var sel_blk_p="selected ";   else var sel_blk_p="";
		if(playerSort=="blk_pa")  var sel_blk_pa="selected ";  else var sel_blk_pa="";

		var selectCriteria = "&nbsp;&nbsp;&nbsp;<b>Criteria:</b>&nbsp;<select onchange='loopStatsAllPlayers(\"" + position + "\"," + globalRangeSort + ",\"" + playerStatus + "\",this.options[this.selectedIndex].value)' id='habStatsSelect'>";
		switch (grouping) {
			case "O" : {
				selectCriteria+="<option " + sel_own     + "value='own'>Pct Owned</option>";
				selectCriteria+="<option " + sel_start   + "value='start'>Pct Started</option>";
				selectCriteria+="<option " + sel_gp      + "value='gp'>Games Played</option>";
				selectCriteria+="<option " + sel_p_yards + "value='p_yards'>Passing Yds</option>";
				selectCriteria+="<option " + sel_p_tds   + "value='p_tds'>Passing TD's</option>";
				selectCriteria+="<option " + sel_p_ints  + "value='p_ints'>Interceptions</option>";
				selectCriteria+="<option " + sel_fl      + "value='fl'>Fumbles Lost</option>";
				selectCriteria+="<option " + sel_ru_yds  + "value='ru_yds'>Rushing Yds</option>";
				selectCriteria+="<option " + sel_ru_tds  + "value='ru_tds'>Rushing Tds</option>";
				selectCriteria+="<option " + sel_rec     + "value='rec'>Receptions</option>";
				selectCriteria+="<option " + sel_trgt    + "value='trgt'>Targets</option>";
				selectCriteria+="<option " + sel_re_yds  + "value='re_yds'>Rec. Yds</option>";
				selectCriteria+="<option " + sel_re_tds  + "value='re_tds'>Rec. Tds</option>";
				selectCriteria+="<option " + sel_two_pt  + "value='two_pt'>All 2-Pts</option>";
				selectCriteria+="<option " + sel_fg      + "value='fg'>FG Made</option>";
				selectCriteria+="<option " + sel_pat     + "value='pat'>PAT Made</option>";
				selectCriteria+="<option " + sel_fan_pts + "value='fan_pts'>Fantasy Pts</option>";
				selectCriteria+="<option " + sel_avg_pts + "value='avg_pts'>Avg. Fantasy Pts</option>";
				break; 
			}
			case "D" : {
				selectCriteria+="<option " + sel_own     + "value='own'>Pct Owned</option>";
				selectCriteria+="<option " + sel_start   + "value='start'>Pct Started</option>";
				selectCriteria+="<option " + sel_gp      + "value='gp'>Games Played</option>";
				selectCriteria+="<option " + sel_tkl_d   + "value='tkl_d'>Tackles on D</option>";
				selectCriteria+="<option " + sel_tkl_st  + "value='tkl_st'>Tackles on ST</option>";
				selectCriteria+="<option " + sel_ass_d   + "value='ass_d'>Assists on D</option>";
				selectCriteria+="<option " + sel_ass_st  + "value='ass_st'>Assists on ST</option>";
				selectCriteria+="<option " + sel_sack    + "value='sack'>Sacks</option>";
				selectCriteria+="<option " + sel_ff      + "value='ff'>Forced Fumble</option>";
				selectCriteria+="<option " + sel_fr      + "value='fr'>Fumble Recovery</option>";
				selectCriteria+="<option " + sel_int     + "value='int'>Interception</option>";
				selectCriteria+="<option " + sel_td_d    + "value='td_d'>TD's on D</option>";
				selectCriteria+="<option " + sel_td_st   + "value='td_st'>TD's on ST</option>";
				selectCriteria+="<option " + sel_tds     + "value='tds'>Total TD's</option>";
				selectCriteria+="<option " + sel_safety  + "value='safety'>Safety</option>";
				selectCriteria+="<option " + sel_fan_pts + "value='fan_pts'>Fantasy Pts</option>";
				selectCriteria+="<option " + sel_avg_pts + "value='avg_pts'>Avg. Fantasy Pts</option>";
				break; 
			}
			case "TD" : {
				selectCriteria+="<option " + sel_own     + "value='own'>Pct Owned</option>";
				selectCriteria+="<option " + sel_start   + "value='start'>Pct Started</option>";
				selectCriteria+="<option " + sel_gp      + "value='gp'>Games Played</option>";
				selectCriteria+="<option " + sel_pts_d   + "value='pts_d'>Pts Allowed by Def.</option>";
				selectCriteria+="<option " + sel_pts_tot + "value='pts_tot'>Pts Allowed by Team</option>";
				selectCriteria+="<option " + sel_p_yds   + "value='p_yds'>Pass Yds Allowed</option>";
				selectCriteria+="<option " + sel_ru_yds  + "value='ru_yds'>Rush Yds Allowed</option>";
				selectCriteria+="<option " + sel_yds     + "value='yds'>Total Yds Allowed</option>";
				selectCriteria+="<option " + sel_tds     + "value='tds'>TD's</option>";
				selectCriteria+="<option " + sel_safety  + "value='safety'>Safety</option>";
				selectCriteria+="<option " + sel_fr      + "value='fr'>Fumble Recovery</option>";
				selectCriteria+="<option " + sel_int     + "value='int'>Interceptions</option>";
				selectCriteria+="<option " + sel_sack    + "value='sack'>Sacks</option>";
				selectCriteria+="<option " + sel_fan_pts + "value='fan_pts'>Fantasy Pts</option>";
				selectCriteria+="<option " + sel_avg_pts + "value='avg_pts'>Avg. Fantasy Pts</option>";
				break; 
			}
			case "ST" : {
				selectCriteria+="<option " + sel_own     + "value='own'>Pct Owned</option>";
				selectCriteria+="<option " + sel_start   + "value='start'>Pct Started</option>";
				selectCriteria+="<option " + sel_gp      + "value='gp'>Games Played</option>";
				selectCriteria+="<option " + sel_tds_f   + "value='tds_f'>TD's Scored</option>";
				selectCriteria+="<option " + sel_tds_a   + "value='tds_a'>TD's Allowed</option>";
				selectCriteria+="<option " + sel_kr      + "value='kr'>Kick Returns</option>";
				selectCriteria+="<option " + sel_kr_yds  + "value='kr_yds'>Kick Ret. Yards</option>";
				selectCriteria+="<option " + sel_kra     + "value='kra'>Kick Ret. Allowed</option>";
				selectCriteria+="<option " + sel_kra_yds + "value='kra_yds'>Kick Ret. Yds Allowed</option>";
				selectCriteria+="<option " + sel_pr      + "value='pr'>Punt Returns</option>";
				selectCriteria+="<option " + sel_pr_yds  + "value='pr_yds'>Punt Ret. Yards</option>";
				selectCriteria+="<option " + sel_pra     + "value='pra'>Punt Ret. Allowed</option>";
				selectCriteria+="<option " + sel_pra_yds + "value='pra_yds'>Punt Ret. Yds Allowed</option>";
				selectCriteria+="<option " + sel_blk_p   + "value='blk_p'>Blocked Punts</option>";
				selectCriteria+="<option " + sel_blk_pa  + "value='blk_pa'>Blocked Punts Allowed</option>";
				selectCriteria+="<option " + sel_fan_pts + "value='fan_pts'>Fantasy Pts</option>";
				selectCriteria+="<option " + sel_avg_pts + "value='avg_pts'>Avg. Fantasy Pts</option>";
				break; 
			}
		}
		selectCriteria+= "</select>";
		htmlTable+= selectCriteria + "</td></tr>";

		sortArray.sort(function (a, b) {return a.score == b.score ? 0 : (a.score > b.score ? -1 : 1)});
  
		var sortedIDs = new Array();
		for(i=0; i<sortArray.length;i++) {
			sortedIDs[i] = allPlayerIDs[sortArray[i].key];
		}

		try {
			var allPlayers = doStatsTable(sortedIDs,habPlayerStats,"",5,"",rangeToDisplay);
		} catch(er) {
			var allPlayers = "ERROR";
		}

		if(allPlayers=="ERROR") {
			htmlTable = "<tr><td style='border:0px; text-align:center'><br /><br />There was an error retrieving the data!<br /><br /><input type='button' value='Try Again' onClick='history.go(0)'>&nbsp;<input type='button' value='Give Up' onClick='history.go(-1)'><br /><br /><br /></td></tr></table>";
		} else { 
			htmlTable += "<tr><td style='border:0px; text-align:center'>&nbsp;</td></tr>";
			var checked = getHabCookie("habTarget");
			if(checked=="false") checked=""; else checked="checked";
			htmlTable += "<tr><td style='border: 0px; text-align: center'><form name='habcheckbox' style='white-space: nowrap; display: inline'><input type='checkbox' id='habCheck' " + checked + " onclick='saveHabCookie(\"habTarget\",1000*60*60*24*7,document.habcheckbox.habCheck.checked); loopStatsAllPlayers(\"" + position + "\"," + rangeToDisplay + ",\"" + playerStatus + "\")' style='white-space: nowrap; display: inline' />&nbsp;Open links in new window.</form>&nbsp;&nbsp;";
			htmlTable += "&nbsp;&nbsp;<a href='http://www.mozilla.com/en-US/' title='Get Firefox now!' target='_blank'><img src='http://www.habman.com/mfl/apps/js/images/getfirefox_16x16.gif' border='0' style='vertical-align: middle;' title='Get Firefox now!' alt='Get Firefox now!' />&nbsp;Firefox</a> recommended for faster sorting</td></tr>";
			htmlTable += "<tr><td style='border:0px; text-align:center'>&nbsp;</td></tr>";
			htmlTable += "<tr><td style='border:0px; text-align:center'><img src='http://www.myfantasyleague.com/mflicons/up_arrow_green.gif' border='0' style='vertical-align: middle;' title='add player' alt='add player' />&nbsp;Add Player&nbsp;&nbsp;&nbsp;&nbsp;";
			htmlTable += "<img src='http://www.myfantasyleague.com/mflicons/down_arrow_red.gif' border='0' style='vertical-align: middle;' title='drop player' alt='drop player' />&nbsp;Drop Player&nbsp;&nbsp;&nbsp;&nbsp;";
			htmlTable += "<img src='http://www.habman.com/mfl/apps/js/images/right_arrow_yellow.gif' border='0' style='vertical-align: middle;' title='propose trade' alt='propose trade' />&nbsp;Propose Trade</td></tr>";
			htmlTable += "<tr><td style='border:0px; text-align:center'>" + allPlayers + "</td></tr>";
			htmlTable += "<tr><td style='border:0px; text-align:center'>&nbsp;</td></tr>";
			htmlTable += "<tr><td style='border:0px; text-align:center'>" + statsFooter + "</td></tr></table>";
		}
		document.getElementById("teamStatsApp").innerHTML = "<center>" + htmlTable + "</center>"; 
	}

	function doStatsAllPlayers(position) {
		document.getElementById("teamStatsApp").innerHTML = "<br /><br /><h2>Processing Data . . . . Please Wait</h2><br /><br /><br />"; 
		var waitTime = 0;
		if(!playerStatsAdded) {
			habAddJavascript('http://www.habman.com/mfl/apps/js/stats/' + year + '/habPlayerStats.js'); 
			makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id, 'parseHabRosterXML','rosters',false);
			var weeklyScores = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=playerScores&L="+league_id+"&W=YTD", 'parsePlayerScoresStatsXML','playerScores',true);
			playerScores[0] = new Array;
			playerScores[0] = weeklyScores;
			playerStatsAdded = true;
			waitTime = 2000;
		}
		setTimeout("loopStatsAllPlayers()",waitTime);
	}

	makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=injuries&L="+league_id+"&rand=" + Math.random(), 'parseHabInjuryXML',1);
	makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=topStarters&rand=" + Math.random(), 'parseHabTopStartersXML',1);
	makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=topOwns&rand=" + Math.random(), 'parseHabTopOwnsXML',1);
	makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=freeAgents&L="+league_id+"&rand=" + Math.random(), 'parseHabLockedPlayersXML',1);

} // end if habStatsRan Check