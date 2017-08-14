if(habman_common==undefined) var habman_common = false;

if(!habman_common) {

	document.write('<script type="text/javascript" src="http://football.myfantasyleague.com/fflnet'+year+'/mfl_player_database.js"></script>');
	document.write('<script type="text/javascript" src="http://www.nitrografixx.com/habman_js/habPlayerKey.js"></script>');

	var currentURL = unescape(location.href)
	if (currentURL.indexOf("http://football")!=-1||currentURL.indexOf("http://6")!=-1)  { 
		var habBaseURL = baseURLDynamic; 
		// update MFL's xmlBaseURL to match the current server
		var xmlBaseURL = baseURLDynamic + '/fflnetdynamic' + year + '/';
	} else {
		var habBaseURL = baseURLStatic;
	}

	var habGlobalPlayersArray        = new Array();  // This array holds the Franchise ID for each claimed Player and is filled in the rosters array function
	var habGlobalInjuriesArray       = new Array();
	var habGlobalRostersArray        = new Array();
	var habGlobalSalaryArray         = new Array();
	var habGlobalContractStatusArray = new Array();
	var habGlobalContractYearArray   = new Array();
	var habGlobalContractInfoArray   = new Array();
	var habGlobalPlayerContractArray = new Array();
	var habGlobalIcons               = new Array();
	var habGlobalLogos               = new Array();
	var habGlobalFranchiseKey        = new Array();
	var habGlobalNFLGameSeconds      = new Array();
	var habGlobalFranchiseRecord     = new Array();
	var habGlobalTeamInfo            = new Array();
	var habXMLAttempt                = 0;
	var habXMLSuccess                = false;

	var habGlobalRostersRan      = false;
	var habGlobalFreeAgentsRan   = false;
	var habGlobalLeagueRan       = false;

	var habGlobalScoreCheck     = 0;
	try {var habGlobalNumDivisions   = leagueAttributes['Divisions'].length;   } catch(er) { var habGlobalNumDivisions = 0;   }
	try {var habGlobalNumConferences = leagueAttributes['Conferences'].length; } catch(er) { var habGlobalNumConferences = 0; } 

	var habByeTeams = new Object;
	habByeTeams['ARI'] = 8;
	habByeTeams['ATL'] = 8;
	habByeTeams['BAL'] = 8;
	habByeTeams['BUF'] = 6;
	habByeTeams['CAR'] = 7;
	habByeTeams['CHI'] = 9;
	habByeTeams['CIN'] = 5;
	habByeTeams['CLE'] = 7;
	habByeTeams['DAL'] = 8;
	habByeTeams['DEN'] = 6;
	habByeTeams['DET'] = 6;
	habByeTeams['GBP'] = 7;
	habByeTeams['HOU'] = 10;
	habByeTeams['IND'] = 6;
	habByeTeams['JAC'] = 4;
	habByeTeams['KCC'] = 8;
	habByeTeams['MIA'] = 9;
	habByeTeams['MIN'] = 5;
	habByeTeams['NEP'] = 10;
	habByeTeams['NOS'] = 4;
	habByeTeams['NYG'] = 9;
	habByeTeams['NYJ'] = 10;
	habByeTeams['OAK'] = 5;
	habByeTeams['PHI'] = 5;
	habByeTeams['PIT'] = 6;
	habByeTeams['SDC'] = 7;
	habByeTeams['SEA'] = 8;
	habByeTeams['SFO'] = 6;
	habByeTeams['STL'] = 9;
	habByeTeams['TBB'] = 10;
	habByeTeams['TEN'] = 4;
	habByeTeams['WAS'] = 4;


	function makeSyncHttpRequest(url,callback_function,fieldTag,setReturn) {  // My SJAX Function
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
			//   var ajaxValue = xmldoc.getElementsByTagName(fieldTag)[0].childNodes[0].nodeValue;
			//   if (ajaxValue == "0") {
			//    alert("DCL " + validatingDCL + " is invalid.");
			//    setTimeout("originalField.select()", 5); 
			//   }
			if(setReturn) {
				returnArray = eval(callback_function + '(sync_http_request.responseXML)');   
			} else eval(callback_function + '(sync_http_request.responseXML)');   
		}
		if(setReturn) return returnArray;
	}

	function habAddJavascript(jsname) {
		var th = document.getElementsByTagName('head')[0];
		var s = document.createElement('script');
		s.setAttribute('type','text/javascript');
		s.setAttribute('src',jsname);
		th.appendChild(s);
	} 

	function habAddCss(cssname) {
		var th = document.getElementsByTagName('head')[0];
		var l = document.createElement('link');
		l.setAttribute('rel','stylesheet');
		l.setAttribute('type','text/css');
		l.setAttribute('href',cssname);
		th.appendChild(l);
	}

	function habPlayerContract (salary, status, info, year) {
		this.salary = salary;
		this.status = status;
		this.info = info;
		this.year = year;
	}

	function parseHabRosterXML (resultsXML) {
		if(!habGlobalRostersRan) {
			var franchises = resultsXML.getElementsByTagName("franchise");
			for(var i=0; i<franchises.length; i++) {
				var fid = franchises[i].getAttribute("id");
				var players = franchises[i].getElementsByTagName("player");
				habGlobalRostersArray[fid]         = new Array();
				habGlobalSalaryArray[fid]          = new Array();
				habGlobalContractStatusArray[fid]  = new Array();
				habGlobalContractYearArray[fid]    = new Array();
				habGlobalContractInfoArray[fid]    = new Array();
				for(var j=0; j<players.length; j++) {
					var pid = players[j].getAttribute("id");
					try { var salary   = players[j].getAttribute("salary"); } catch(er) { var salary   = ""; }
					try { var c_status = players[j].getAttribute("contractStatus"); } catch(er) { var c_status = ""; }
					try { var c_info   = players[j].getAttribute("contractInfo"); } catch(er) { var c_info   = ""; }
					try { var c_year   = players[j].getAttribute("contractYear"); } catch(er) { var c_year   = ""; }
					habGlobalRostersArray[fid][j] = pid;
					habGlobalSalaryArray[fid][j] = salary;
					habGlobalContractStatusArray[fid][j] = c_status;
					habGlobalContractInfoArray[fid][j] = c_info;
					habGlobalContractYearArray[fid][j] = c_year;
					habGlobalPlayerContractArray['pid_'+pid] = new habPlayerContract(salary,c_status,c_info,c_year);
					habGlobalPlayersArray[pid] = fid;
				}
			}
		}
		habGlobalRostersRan = true;
	}

	function parseHabFreeAgentsXML (resultsXML) {
		if(!habGlobalFreeAgentsRan) {
			var leagueunit = resultsXML.getElementsByTagName("leagueUnit");
			for(var i=0; i<leagueunit.length; i++) {
				var unit = leagueunit[i].getAttribute("unit");
				var players = leagueunit[i].getElementsByTagName("player");
				for(var j=0; j<players.length; j++) {
					var pid = players[j].getAttribute("id");
					try { var salary   = players[j].getAttribute("salary"); } catch(er) { var salary   = ""; }
					try { var c_status = players[j].getAttribute("contractStatus"); } catch(er) { var c_status = ""; }
					try { var c_info   = players[j].getAttribute("contractInfo"); } catch(er) { var c_info   = ""; }
					try { var c_year   = players[j].getAttribute("contractYear"); } catch(er) { var c_year   = ""; }
					habGlobalPlayerContractArray['pid_'+pid] = new habPlayerContract(salary,c_status,c_info,c_year);
				}
			}
		}
		habGlobalFreeAgentsRan = true;
	}

	function parseHabLeagueXML (resultsXML) {
		if(!habGlobalLeagueRan) {
			var franchises = resultsXML.getElementsByTagName("franchise");
			for (var i=0; i < franchises.length; i++) {
				var fid = franchises[i].getAttribute("id");
				habGlobalTeamInfo[fid] = new Array();
				if(habGlobalNumDivisions>0) habGlobalTeamInfo[fid]['division'] = parseInt(franchises[i].getAttribute("division"),10);
				if(franchises[i].getAttribute("logo") == null) 
					habGlobalLogos[fid] = "http://www.nitrografixx.com/habman_js/notfound.gif"; 
				else 
					habGlobalLogos[fid] = franchises[i].getAttribute("logo");
				if(franchises[i].getAttribute("icon") == null) 
					habGlobalIcons[fid] = "http://www.nitrografixx.com/habman_js/notfound.gif"; 
				else 
					habGlobalIcons[fid] = franchises[i].getAttribute("icon");
				habGlobalFranchiseKey[i] = fid;
			}
		} 
		habGlobalLeagueRan = true;
	}

	function parseHabInjuryXML (resultsXML) {
		var injury = resultsXML.getElementsByTagName("injury");
		for(var i=0; i<injury.length; i++) {
			var pid     = injury[i].getAttribute("id"); 
			var status  = injury[i].getAttribute("status");  
			var details = injury[i].getAttribute("details");  
			var code = "";
			switch (status) {
				case "Suspended"    : { code = "S"; break; }
				case "Probable"     : { code = "P"; break; }
				case "Questionable" : { code = "Q"; break; }
				case "Doubtful"     : { code = "D"; break; }
				case "Out"          : { code = "O"; break; }
				case "IR"           : { code = "I"; break; }
			}
			habGlobalInjuriesArray[pid] = {status:status, code:code, details:details}
		}
	}

	function parseHabWeeklyResultsXML (resultsXML) {
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
		var matchups      = weeklyResults[0].getElementsByTagName("matchup");
		var matchupArray  = new Array();
		habGlobalScoreCheck = 0;
		for(var i=0; i<matchups.length; i++) {
			var teamData = matchups[i].getElementsByTagName("franchise");
			var roadTeam = new Array(teamData[0].getAttribute("id"),teamData[0].getAttribute("score"),teamData[0].getAttribute("starters"),teamData[0].getAttribute("spread"));
			var homeTeam = new Array(teamData[1].getAttribute("id"),teamData[1].getAttribute("score"),teamData[1].getAttribute("starters"),teamData[1].getAttribute("spread"));
			habGlobalScoreCheck += parseInt(roadTeam[1],10)+parseInt(homeTeam[1],10);
			matchupArray[i] = new Array();
			matchupArray[i]['road'] = roadTeam;
			matchupArray[i]['home'] = homeTeam;
		}
		return matchupArray;
	}

	function parseHabLiveScoringXML (resultsXML) {
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
		return matchupArray;
	}

	function parseHabNFLScheduleXML (resultsXML) {
		var matchups = resultsXML.getElementsByTagName("matchup");
		var teams = resultsXML.getElementsByTagName("team");
		for (var i=0; i < matchups.length; i++) {
			var secondsRemaining = matchups[i].getAttribute("gameSecondsRemaining");
			var fid0 = teams[2*i].getAttribute("id");
			var fid1 = teams[2*i+1].getAttribute("id");
			habGlobalNFLGameSeconds[fid0] = secondsRemaining;
			habGlobalNFLGameSeconds[fid1] = secondsRemaining;
		}
	}

	function parseHabFranchiseRecordsXML (resultsXML) {
		var franchises = resultsXML.getElementsByTagName("franchise");
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
			if(hideTiesInRecord)
				habGlobalFranchiseRecord[fid] = "("+wins+"-"+loss+")";
			else
				habGlobalFranchiseRecord[fid] = "("+wins+"-"+loss+"-"+ties+")";  
		}
	}

	function habTeamID(ID) {
		if (ID < 10) return '000' + ID; else if (ID < 100 && ID > 9) return '00' + ID; else return '0' + ID;
	}

	function getHabTeamName(hideName,useNickNames,nickNames,id) {
		var teamName = "";
		if(!hideName)
			try {
				if(useNickNames) 
					var teamName = nickNames[id];
				else      
					var teamName = franchiseDatabase['fid_' + id].name;
				teamName = teamName.replace(/'/g,"&rsquo;");
				teamName = teamName.replace(/-/g,"&#45;");  // The second hyphen is actually &#150
				teamName = teamName.replace(/ /g,"&nbsp;");
			} catch(er) {
				teamName = "Average"; 
			}
		return teamName; 
	}

	function getHabAverageScore(matchupArray) {
		var numTeamsInAverage = 0;
		var totalScore        = 0;
		for (var i=0; i<matchupArray.length; i++) {
			try {
				if(franchiseDatabase['fid_' + matchupArray[i]['road'][0]].name!=undefined) { totalScore += (parseFloat(matchupArray[i]['road'][1],10)); numTeamsInAverage++; }
			} catch(er) {
				// Do nothing
			} 
			try {
				if(franchiseDatabase['fid_' + matchupArray[i]['home'][0]].name!=undefined) { totalScore += (parseFloat(matchupArray[i]['home'][1],10)); numTeamsInAverage++; }
			} catch(er) {
				// Do nothing
			}
		}
		if(numTeamsInAverage!=0) var averageScore = totalScore/numTeamsInAverage; else var averageScore = 0;
		return averageScore
	}

	function getHabTeamIcon(checkIcon,checkLogo,iconURL,iconExt,iconClass,id,oldMethod) {
		var teamIcon;
		var teamName = getHabTeamName(false,false,"",id);
		if(checkLogo) { teamIcon = "<img src='" + habGlobalLogos[id] + "' border='0' style='vertical-align: middle;' class='" + iconClass + "' alt='" + teamName + "' />"; return teamIcon; }
		if(checkIcon) { teamIcon = "<img src='" + habGlobalIcons[id] + "' border='0' style='vertical-align: middle;' class='" + iconClass + "' alt='" + teamName + "' />"; return teamIcon; }
		if(iconURL=='') { teamIcon = ""; return teamIcon; }
		if(oldMethod) { var newID = parseInt(id,10) - 1; teamIcon = "<img src='" + iconURL + newID + "." + iconExt + "' border='0' style='vertical-align: middle;' class='" + iconClass + "' alt='" + teamName + "' /> "; return teamIcon; }
		teamIcon = "<img src='" + iconURL + id + "." + iconExt + "' border='0' style='vertical-align: middle;' class='" + iconClass + "' alt='" + teamName + "' /> ";
		return teamIcon;
	}

	function formatName(name) {
		var tempname = name;
		var tempname = tempname.replace(/'/g,"&rsquo;");
		var commapos = tempname.search(",");
		var len  = tempname.length;
		tempname = tempname.substr(commapos+2,len)+ " " + tempname.substr(0,commapos);
		tempname = tempname.replace(/ /g,"&nbsp;");
		return tempname;
	}

	function getHabTime(roadScore,homeScore,secondsRemaining) {
		if(((roadScore + homeScore) == 0)&&(secondsRemaining==0)) {
			var clock="Pre-Game";
		} else {
			if(secondsRemaining==0) {
				var clock="Final";
			} else {
				var percentRemaining = parseInt(100*secondsRemaining/leagueAttributes['MaxStarters']/3600/2,10);
				switch (true) {
					case (percentRemaining > 75) : { clock = "1st&nbsp;-&nbsp;"; percentRemaining = percentRemaining - 75; break; }
					case (percentRemaining > 50) : { clock = "2nd&nbsp;-&nbsp;"; percentRemaining = percentRemaining - 50; break; }
					case (percentRemaining > 25) : { clock = "3rd&nbsp;-&nbsp;"; percentRemaining = percentRemaining - 25; break; }
					default                      : { clock = "4th&nbsp;-&nbsp;"; break; }
				}
				switch (percentRemaining) {
					case  25: { clock+="15:00"; break;}
					case  24: { clock+="14:24"; break;}
					case  23: { clock+="13:48"; break;}
					case  22: { clock+="13:12"; break;}
					case  21: { clock+="12:36"; break;}
					case  20: { clock+="12:00"; break;}
					case  19: { clock+="11:24"; break;}
					case  18: { clock+="10:48"; break;}
					case  17: { clock+="10:12"; break;}
					case  16: { clock+="9:36";  break;}
					case  15: { clock+="9:00";  break;}
					case  14: { clock+="8:24";  break;}
					case  13: { clock+="7:48";  break;}
					case  12: { clock+="7:12";  break;}
					case  11: { clock+="6:36";  break;}
					case  10: { clock+="6:00";  break;}
					case   9: { clock+="5:24";  break;}
					case   8: { clock+="4:48";  break;}
					case   7: { clock+="4:12";  break;}
					case   6: { clock+="3:36";  break;}
					case   5: { clock+="3:00";  break;}
					case   4: { clock+="2:24";  break;}
					case   3: { clock+="1:48";  break;}
					case   2: { clock+="1:12";  break;}
					case   1: { clock+="0:36";  break;}
					case   0: { clock+="0:05";  break;}
					default : { clock="Error"; break;}
				}
			}
		}
		return clock;
	}

	function getHabCookie(Name) {
		var search = Name + "="
		var returnvalue = "";
		if (document.cookie.length > 0) {
			offset = document.cookie.indexOf(search)
			if (offset != -1) { // if cookie exists
				offset += search.length
				// set index of beginning of value
				end = document.cookie.indexOf(";", offset);
				// set index of end of cookie value
				if (end == -1)
					end = document.cookie.length;
				returnvalue=unescape(document.cookie.substring(offset, end))
			}
		}
		return returnvalue;
	}

	function saveHabCookie(Name,Expiration,Value) {
		var today = new Date();
		var expire = new Date();
		var cookieName = Name;
		expire.setTime(today.getTime() + parseInt(Expiration,10)); 
		document.cookie=cookieName+"="+Value+";expires="+expire.toGMTString();
	}

	function getHabTarget() {
		var checked = getHabCookie("habTarget");
		if(checked=="false") var target="_top"; else target="habPage";
		return target;
	}

	function PlayerOffense (gp, comp, passes, p_yards, p_tds, p_ints, fl, runs, ru_yds, ru_tds, rec, re_yds, re_tds, tds, two_pt, fg_att, fg, pat_att, pat, trgt) {
		this.gp      = gp;
		this.comp    = comp;
		this.passes  = passes;
		this.p_yards = p_yards;
		this.p_tds   = p_tds;
		this.p_ints  = p_ints;
		this.fl      = fl;
		this.runs    = runs;
		this.ru_yds  = ru_yds;
		this.ru_tds  = ru_tds;
		this.rec     = rec;
		this.trgt    = trgt;
		this.re_yds  = re_yds;
		this.re_tds  = re_tds;
		this.tds     = tds;
		this.two_pt  = two_pt;
		this.fg_att  = fg_att;
		this.fg      = fg;
		this.pat_att = pat_att;
		this.pat     = pat;
		this.fan_pts = 0;
		this.avg_pts = 0;
	}

	function PlayerDefense (gp, tkl_d, tkl_st, ass_d, ass_st, sack, ff, fr, int, td_d, td_st, tds, safety, null_13, null_14, null_15, null_16, null_17, null_18) {
		this.gp      = gp;
		this.tkl_d   = tkl_d;
		this.tkl_st  = tkl_st;
		this.ass_d   = ass_d;
		this.ass_st  = ass_st;
		this.sack    = sack;
		this.ff      = ff;
		this.fr      = fr;
		this.int     = int;
		this.td_d    = td_d;
		this.td_st   = td_st;
		this.tds     = tds;
		this.safety  = safety;
		this.null_13 = 0;
		this.null_14 = 0;
		this.null_15 = 0;
		this.null_16 = 0;
		this.null_17 = 0;
		this.null_18 = 0;
		this.fan_pts = 0;
		this.avg_pts = 0;
	}

	function PlayerTeamDefense (gp, pts_d, pts_tot, p_yds, ru_yds, yds, f_tds, int_tds, tds, safety, fr, int, sack, null_13, null_14, null_15, null_16, null_17, null_18) {
		this.gp      = gp;
		this.pts_d   = pts_d;
		this.pts_tot = pts_tot;
		this.p_yds   = p_yds;
		this.ru_yds  = ru_yds;
		this.yds     = yds;
		this.f_tds   = f_tds;
		this.int_tds = int_tds;
		this.tds     = tds;
		this.safety  = safety;
		this.fr      = fr;
		this.int     = int;
		this.sack    = sack;
		this.null_13 = 0;
		this.null_14 = 0;
		this.null_15 = 0;
		this.null_16 = 0;
		this.null_17 = 0;
		this.null_18 = 0;
		this.fan_pts = 0;
		this.avg_pts = 0;
	}

	function PlayerSpecialTeam (gp, tds_f, safety, tds_a, kr, kr_yds, kra, kra_yds, pr, pr_yds, pra, pra_yds, blk_p, blk_pa, null_14, null_15, null_16, null_17, null_18) {
		this.gp      = gp;
		this.tds_f   = tds_f;
		this.safety  = safety;
		this.tds_a   = tds_a;
		this.kr      = kr;
		this.kr_yds  = kr_yds;
		this.kra     = kra;
		this.kra_yds = kra_yds;
		this.pr      = pr;
		this.pr_yds  = pr_yds;
		this.pra     = pra;
		this.pra_yds = pra_yds;
		this.blk_p   = blk_p;
		this.blk_pa  = blk_pa;
		this.null_14 = 0;
		this.null_15 = 0;
		this.null_16 = 0;
		this.null_17 = 0;
		this.null_18 = 0;
		this.fan_pts = 0;
		this.avg_pts = 0;
	}

	function setupHabLeagueInfo() {
		if(!habGlobalLeagueRan) {
			for (team in franchiseDatabase) {
				if (team.search(/fid_/) == 0) { //fid_ is found therefore valid franchise ID tag
					i = parseFloat(team.replace('fid_', ''));
      				var fid = 'fid_' + franchiseDatabase['fid_' + habTeamID(i)].id;
					habGlobalTeamInfo[habTeamID(i)] = new Array();
					if(habGlobalNumDivisions>0) habGlobalTeamInfo[habTeamID(i)]['division'] = parseInt(franchiseDatabase[fid].division,10);
					if(franchiseDatabase[fid].logo == null) 
						habGlobalLogos[habTeamID(i)] = "http://www.nitrografixx.com/habman_js/notfound.gif"; 
					else 
						habGlobalLogos[habTeamID(i)] = franchiseDatabase[fid].logo;
					if(franchiseDatabase[fid].icon == null) 
						habGlobalIcons[habTeamID(i)] = "http://www.nitrografixx.com/habman_js/notfound.gif"; 
					else 
						habGlobalIcons[habTeamID(i)] = franchiseDatabase[fid].icon;
					habGlobalFranchiseKey[i] = habTeamID(i);
				}
			}
		}
		habGlobalLeagueRan = true; 
	}


	//makeSyncHttpRequest(baseURLDynamic+"/"+year+"/export?TYPE=players&L="+league_id+"&rand=" + Math.random(), 'parseHabPlayersXML','players');
	//makeHttpRequest(baseURLDynamic+"/"+year+"/export?TYPE=players&L="+league_id+"&rand=" + Math.random(), 'parseHabPlayersXML',1);

	//var url = habBaseURL+"/"+year+"/export?TYPE=league&L="+league_id+"&rand=" + Math.random()
	//makeSyncHttpRequest(url, 'parseHabLeagueXML','league');

	makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id+"&prg=habman_common&rand="+Math.random(), 'parseHabRosterXML',1);
	makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=freeAgents&L="+league_id+"&rand="+Math.random(), 'parseHabFreeAgentsXML',1);

	setupHabLeagueInfo();

}

var habman_common = true;