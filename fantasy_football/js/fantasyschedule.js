if(fantasyScheduleClickToStart==undefined) var fantasyScheduleClickToStart = false;

//GLOBAL VARIABLES
var fantasyScheduleCount       = 0;
var thisFantasyWeek            = 0;
var lastFantasyWeek            = 0;
var nextFantasyWeek            = 0;
var dateFantasyWeek            = "";
var fantasyScheduleTimer;
var fantasyByeTeams        = new Array();
var fantasyScheduleIcons   = new Array();
var fantasyScheduleMaxLoops = 0;
var fantasyScheduleMondayNightCheck = false;

function getDateString(timestamp,mode) {
  var AMPM = "AM";

  var month = new Array();
  month[0]  =  ['January'];
  month[1]  =  ['February'];
  month[2]  =  ['March'];
  month[3]  =  ['April'];
  month[4]  =  ['May'];
  month[5]  =  ['June'];
  month[6]  =  ['July'];
  month[7]  =  ['August'];
  month[8]  =  ['September'];
  month[9]  =  ['October'];
  month[10] =  ['November'];
  month[11] =  ['December'];

  var day = new Array();
  day[0] = ['Sunday'];
  day[1] = ['Monday'];
  day[2] = ['Tuesday'];
  day[3] = ['Wednesday'];
  day[4] = ['Thursday'];
  day[5] = ['Friday'];
  day[6] = ['Saturday'];

  var thisObj   = new Date(timestamp*1000); // MUST CHANGE TO INCLUDE MILLISECONDS
  var thisDay   = thisObj.getDay();
  var thisMonth = thisObj.getMonth();
  var thisDate  = thisObj.getDate();
  var thisHour  = thisObj.getHours();
   if(thisHour>=12) { thisHour = thisHour - 12; AMPM = "PM"; }
   if(thisHour==0) { thisHour = 12; }
  var thisMin   = thisObj.getMinutes();
   if(thisMin<10) thisMin = "0"+thisMin;

  if(mode==0)
   var thisString = day[thisDay] + " " + month[thisMonth] + " " + thisDate;
  else
   var thisString = thisHour + ":" + thisMin + " " + AMPM;

  return thisString;
}

function parseFantasyScheduleNFLSchedule (resultsXML) {
  try { 
   var matchups = resultsXML.getElementsByTagName("matchup");
   var kickoff  = parseInt(matchups[0].getAttribute("kickoff"),10);
  } catch(er) {
   var kickoff = "";
  }
  var gameDate = getDateString(kickoff,0);
  var gameTime = getDateString(kickoff,1);
  dateFantasyWeek = gameDate + " " + gameTime;
}

function doWeeklyResultsFantasySchedule (matchups,weekNum) {
  if (weekNum==1)
   var arrowLeft = "";
  else
   { lastFantasyWeek = weekNum - 1; var arrowLeft = "<span style='cursor:pointer' onclick='getFantasySchedule(lastFantasyWeek);'><</span>"; }

  if (weekNum==17)
   var arrowRight = "";
  else
   { nextFantasyWeek = weekNum + 1; var arrowRight = "<span style='cursor:pointer' onclick='getFantasySchedule(nextFantasyWeek);'>></span>"; }

  var htmlCode = "<table align='center' cellspacing='0' class='homepagemodule report' id='fantasyschedule'>\n";
  htmlCode += " <tbody>\n";
  htmlCode += "   <tr class='oddtablerow'><td colspan='8' class='weekNav'><center>" + arrowLeft + " Week #" +weekNum + " " + arrowRight + "</center></td></tr>\n";
  htmlCode += "   <tr class='oddtablerow'><td colspan='8'><center><div id='fantasyscheduleinactivity'></div></center></td></tr>\n";
  htmlCode += "   <tr><th colspan='8'>" + dateFantasyWeek + "</th></tr>\n";
  
  var byeCode = "";

  for (var i = 0; i < matchups.length; i++) {
   var roadID = matchups[i]['road'][0];
   var homeID = matchups[i]['home'][0];
   if(roadID!="BYE"&&homeID!="BYE") {
    var remainSecRoad = matchups[i]['road'][2];
    var remainSecHome = matchups[i]['home'][2];
    var altRoadName = franchiseDatabase['fid_' + matchups[i]['road'][0]].name;
    var altHomeName = franchiseDatabase['fid_' + matchups[i]['home'][0]].name;
    if (altRoadName!=undefined) altRoadName = altRoadName.replace(/'/g,"’");
    if (altHomeName!=undefined) altHomeName = altHomeName.replace(/'/g,"’");
    var roadLink = "<a href='http://football.myfantasyleague.com/" + year + "/options?L=" + league_id + "&F=" + roadID + "&O=07' target='franchisepage' border='0' class='fantasyscheduleteam' title='" + altRoadName + "' style='text-decoration: none;'>";
    var homeLink = "<a href='http://football.myfantasyleague.com/" + year + "/options?L=" + league_id + "&F=" + homeID + "&O=07' target='franchisepage' border='0' class='fantasyscheduleteam' title='" + altHomeName + "' style='text-decoration: none;'>";
    var roadIcon = getHabTeamIcon(fantasyScheduleDefaultIcon,fantasyScheduleDefaultLogo,fantasyScheduleIconURL,fantasyScheduleIconExt,"fantasyscheduleicon",roadID,false);
    var homeIcon = getHabTeamIcon(fantasyScheduleDefaultIcon,fantasyScheduleDefaultLogo,fantasyScheduleIconURL,fantasyScheduleIconExt,"fantasyscheduleicon",homeID,false);
    var roadName = getHabTeamName(hideFantasyScheduleName,useFantasyScheduleNickNames,fantasyScheduleNickNames,roadID);
    var homeName = getHabTeamName(hideFantasyScheduleName,useFantasyScheduleNickNames,fantasyScheduleNickNames,homeID);
    if(weekNum<=completedWeek) {
     var roadScore = parseFloat(matchups[i]['road'][1],10).toFixed(fantasyScheduleDecimals);
     var homeScore = parseFloat(matchups[i]['home'][1],10).toFixed(fantasyScheduleDecimals);
    } else {
     var roadScore = parseFloat(matchups[i]['road'][3],10).toFixed(fantasyScheduleDecimals);
     var homeScore = parseFloat(matchups[i]['home'][3],10).toFixed(fantasyScheduleDecimals);
     if(roadScore=="NaN") roadScore="&nbsp;";
     if(homeScore=="NaN") homeScore="&nbsp;";
     if(hideFantasyScheduleSpread) {
      roadScore="&nbsp;";
      homeScore="&nbsp;";
     }
    }
    var roadWinIcon = "&nbsp;";
    var homeWinIcon = "&nbsp;";
    if(weekNum<=completedWeek) {
     var gameTime = "Final";
     var gameLink = "<a href='"+baseURLDynamic+"/"+year+"/weekly?L="+league_id+"&W="+weekNum+"' target='gamepage'>";
     if(parseFloat(roadScore,10)>parseFloat(homeScore,10)) {
      roadWinIcon = "<img src='http://www.habman.com/mfl/images/roadwin.gif'  style='vertical-align: middle; height: 15px; width: 9px;' />";
      homeWinIcon = "<img src='http://www.habman.com/mfl/images/blankwin.gif' style='vertical-align: middle; height: 15px; width: 9px;' />";
     }
     if(parseFloat(roadScore,10)<parseFloat(homeScore,10)) {
      roadWinIcon = "<img src='http://www.habman.com/mfl/images/blankwin.gif' style='vertical-align: middle; height: 15px; width: 9px;' />";
      homeWinIcon = "<img src='http://www.habman.com/mfl/images/homewin.gif'  style='vertical-align: middle; height: 15px; width: 9px;' />";
     }
    } else {
     var gameTime = "Preview";
     var gameLink = "<a href='"+baseURLDynamic+"/"+year+"/live_scoring?L="+league_id+"&W="+weekNum+"&FRANCHISES=" + roadID + "_" + homeID + "' target='gamepage'>";
    }
    
    if(i%2)
     htmlCode += "   <tr class='eventablerow' align='center'><td class='roadIcon'>" + roadLink + roadIcon + "&nbsp;" + roadName + "</a></td><td class='winIcon'> " + roadWinIcon + " </td><td class='roadScore'>" + roadScore + "</td><td style='white-space: nowrap;' class='atSymbol'>&nbsp; vs. </td><td class='homeScore'>" + homeScore + "</td><td class='winIcon'> " + homeWinIcon + " </td><td class='homeIcon'>" + homeLink + homeIcon + "&nbsp;" + homeName + "</a></td><td class='gameTime'>" + gameLink + gameTime + "</a></td></tr>\n";
    else
     htmlCode += "   <tr class='oddtablerow'  align='center'><td class='roadIcon'>" + roadLink + roadIcon + "&nbsp;" + roadName + "</a></td><td class='winIcon'> " + roadWinIcon + " </td><td class='roadScore'>" + roadScore + "</td><td style='white-space: nowrap;' class='atSymbol'>&nbsp; vs. </td><td class='homeScore'>" + homeScore + "</td><td class='winIcon'> " + homeWinIcon + " </td><td class='homeIcon'>" + homeLink + homeIcon + "&nbsp;" + homeName + "</a></td><td class='gameTime'>" + gameLink + gameTime + "</a></td></tr>\n";

   } else { // AT LEAST ONE OF THE TEAMS HAS A BYE GAME

    if (roadID!="BYE") {
     var altRoadName = franchiseDatabase['fid_' + matchups[i]['road'][0]].name;
     var roadLink    = "<a href='http://football.myfantasyleague.com/" + year + "/options?L=" + league_id + "&F=" + roadID + "&O=07' target='franchisepage' border='0' class='fantasyscheduleteam' title='" + altRoadName + "' style='text-decoration: none;'>";
     var roadName    = getHabTeamName(false,useFantasyScheduleNickNames,fantasyScheduleNickNames,roadID);
     byeCode += roadLink + roadName + "</a><br />";
    }
    if (homeID!="BYE") {
     var altHomeName = franchiseDatabase['fid_' + matchups[i]['home'][0]].name;
     var homeLink = "<a href='http://football.myfantasyleague.com/" + year + "/options?L=" + league_id + "&F=" + homeID + "&O=07' target='franchisepage' border='0' class='fantasyscheduleteam' title='" + altHomeName + "' style='text-decoration: none;'>";
     var homeName = getHabTeamName(false,useFantasyScheduleNickNames,fantasyScheduleNickNames,homeID);
     byeCode += homeLink + homeName + "</a><br />";
    }

   } //END IF NEITHER BYE
  }  //END LOOP

  if(byeCode!="") {
   if(i%2) {
    htmlCode += "   <tr class='eventablerow' align='center'><td colspan='8' style='text-align: left;'>Bye Teams:<br /><div style='padding-left: 4px;'>" + byeCode + "</div></td></tr>\n";
   } else {
    htmlCode += "   <tr class='oddtablerow' align='center'><td colspan='8' style='text-align: left;'>Bye Teams:<br /><div style='padding-left: 4px;'>" + byeCode + "</div></td></tr>\n";
   }
  } 

  htmlCode += " </tbody>\n";
  htmlCode += "</table>\n";
  document.getElementById("Fantasy_Schedule").innerHTML = htmlCode;
  doFantasyScheduleTimer(); // Start the timer until next reload
}

function doLiveFantasySchedule(matchups,weekNum) {
  if (weekNum==1)
   var arrowLeft = "";
  else
   { lastFantasyWeek = weekNum - 1; var arrowLeft = "<span style='cursor:pointer' onclick='getFantasySchedule(lastFantasyWeek);'><</span>"; }

  if (weekNum==17)
   var arrowRight = "";
  else
   { nextFantasyWeek = weekNum + 1; var arrowRight = "<span style='cursor:pointer' onclick='getFantasySchedule(nextFantasyWeek);'>></span>"; }

  var htmlCode = "<table cellspacing='0' align='center' class='homepagemodule report' id='fantasyschedule'>\n";
  htmlCode += " <tbody>\n";
  htmlCode += "   <tr class='oddtablerow'><td colspan='6' class='weekNav'><center>" + arrowLeft + " Week #" +weekNum + " " + arrowRight + "</center></td></tr>\n";
  htmlCode += "   <tr class='oddtablerow'><td colspan='6'><center><div id='fantasyscheduleinactivity'></div></center></td></tr>\n";
  htmlCode += "   <tr><th colspan='6'>" + dateFantasyWeek + "</th></tr>\n";
  
  for (var i = 0; i < matchups.length; i++) {
   var roadID        = matchups[i]['road'][0];
   var homeID        = matchups[i]['home'][0];
   if (roadID!="BYE"&&homeID!="BYE") {
    var remainSecRoad = matchups[i]['road'][2];
    var remainSecHome = matchups[i]['home'][2];
    var roadScore     = parseFloat(matchups[i]['road'][1],10).toFixed(fantasyScheduleDecimals);
    var homeScore     = parseFloat(matchups[i]['home'][1],10).toFixed(fantasyScheduleDecimals);
    if(roadID=="AVG") var altRoadName = "Average"; else var altRoadName = franchiseDatabase['fid_' + roadID].name;
    if(homeID=="AVG") var altHomeName = "Average"; else var altHomeName = franchiseDatabase['fid_' + homeID].name;
    altRoadName = altRoadName.replace(/'/g,"’");
    altHomeName = altHomeName.replace(/'/g,"’");
    var roadLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + roadID + "&O=07' target='franchisepage' border='0' class='fantasyscheduleteam' title='" + altRoadName + "' style='text-decoration: none;'>";
    var homeLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + homeID + "&O=07' target='franchisepage' border='0' class='fantasyscheduleteam' title='" + altHomeName + "' style='text-decoration: none;'>";
    var roadIcon = getHabTeamIcon(fantasyScheduleDefaultIcon,fantasyScheduleDefaultLogo,fantasyScheduleIconURL,fantasyScheduleIconExt,"fantasyscheduleicon",roadID,false);
    var homeIcon = getHabTeamIcon(fantasyScheduleDefaultIcon,fantasyScheduleDefaultLogo,fantasyScheduleIconURL,fantasyScheduleIconExt,"fantasyscheduleicon",homeID,false);
    var roadName = getHabTeamName(hideFantasyScheduleName,useFantasyScheduleNickNames,fantasyScheduleNickNames,roadID);
    var homeName = getHabTeamName(hideFantasyScheduleName,useFantasyScheduleNickNames,fantasyScheduleNickNames,homeID);
    var totalSecs = parseInt(remainSecRoad,10) + parseInt(remainSecHome,10);
    var clock     = getHabTime(roadScore,homeScore,totalSecs);
    var gameLink = "<a href='"+baseURLDynamic+"/"+year+"/live_scoring?L="+league_id+"&W="+weekNum+"&FRANCHISES=" + roadID + "_" + homeID + "' target='gamepage'>";

    if(i%2)
     htmlCode += "   <tr class='eventablerow' align='center'><td class='roadIcon'>" + roadLink + roadIcon + "&nbsp;" + roadName + "</a></td><td class='roadScore'>" + roadScore + "</td><td style='white-space: nowrap;' class='atSymbol'>&nbsp; vs. </td><td class='homeScore'>" + homeScore + "</td><td class='homeIcon'>" + homeLink + homeIcon + "&nbsp;" + homeName + "</a></td><td class='gameTime'>" + gameLink + clock + "</a></td></tr>\n";
    else
     htmlCode += "   <tr class='oddtablerow'  align='center'><td class='roadIcon'>" + roadLink + roadIcon + "&nbsp;" + roadName + "</a></td><td class='roadScore'>" + roadScore + "</td><td style='white-space: nowrap;' class='atSymbol'>&nbsp; vs. </td><td class='homeScore'>" + homeScore + "</td><td class='homeIcon'>" + homeLink + homeIcon + "&nbsp;" + homeName + "</a></td><td class='gameTime'>" + gameLink + clock + "</a></td></tr>\n";
   } //END IF
  }  //END LOOP

  htmlCode += " </tbody>\n";
  htmlCode += "</table>\n";
  document.getElementById("Fantasy_Schedule").innerHTML = htmlCode;
  doFantasyScheduleTimer(); // Start the timer until next reload
}

function getFantasySchedule(thisWeek) {
  var fantasyScheduleLiveScoring = new Array();
  var fantasyScheduleWeeklyResults = new Array();
  clearTimeout(fantasyScheduleTimer);
  fantasyScheduleMaxLoops++;
  if(fantasyScheduleMaxLoops<31) {
   if(thisWeek==0) {
    if(completedWeek==liveScoringWeek) {
     var thisObj   = new Date(); 
     var thisDay   = thisObj.getDay();
     if(thisDay<=2) thisFantasyWeek = completedWeek; else thisFantasyWeek = completedWeek + 1;
    } else
     thisFantasyWeek  = liveScoringWeek;
   } else thisFantasyWeek  = thisWeek;  
   if(thisFantasyWeek>17) thisFantasyWeek = 17;

   if(completedWeek==liveScoringWeek||thisFantasyWeek!=liveScoringWeek) var liveMode = false; else var liveMode = true;
   
   makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=nflSchedule&W="+thisFantasyWeek , 'parseFantasyScheduleNFLSchedule' , 'team', false );
   if(dateFantasyWeek=="undefined undefined NaN NaN:NaN AM") makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=nflSchedule&W="+thisFantasyWeek , 'parseFantasyScheduleNFLSchedule' , 'team', false );
   
   if(liveMode) {
    document.getElementById("fantasyScheduleIframe").innerHTML = "<iframe src='" + habBaseURL + "/" + year + "/live_scoring_summary?L=" + league_id +  "&App=fs' style='width: 0; height: 0; border: 0px;'></iframe>";
    document.getElementById("fantasyScheduleIframe").innerHTML = "";
    
    habXMLAttempt = 0;
    habXMLSuccess = false;
    //while (!habXMLSuccess&&habXMLAttempt<2) { // Two attempts at grabbing XML data
     fantasyScheduleLiveScoring   = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+thisFantasyWeek+"&rand=" + Math.random() , 'parseHabLiveScoringXML' , 'liveScoring',true );
    //} 
    
    doLiveFantasySchedule(fantasyScheduleLiveScoring,thisFantasyWeek);
   } else {
    
    habXMLAttempt = 0;
    habXMLSuccess = false;
    //while (!habXMLSuccess&&habXMLAttempt<2) { // Two attempts at grabbing XML data
     fantasyScheduleWeeklyResults = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+thisFantasyWeek+"&rand=" + Math.random() , 'parseHabWeeklyResultsXML' , 'weeklyResults',true );
    //}
    
    if(habGlobalScoreCheck==0&&thisFantasyWeek==liveScoringWeek) {
     fantasyScheduleMondayNightCheck = true;
     
     habXMLAttempt = 0;
     habXMLSuccess = false;
     //while (!habXMLSuccess&&habXMLAttempt<2) { // Two attempts at grabbing XML data
      fantasyScheduleLiveScoring = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+thisFantasyWeek+"&rand=" + Math.random() , 'parseHabLiveScoringXML' , 'liveScoring',true );
     //}
      
     doLiveFantasySchedule(fantasyScheduleLiveScoring,thisFantasyWeek);     
    } else {
     doWeeklyResultsFantasySchedule(fantasyScheduleWeeklyResults,thisFantasyWeek); 
    }
   }
  } else {
   var refreshData = "<div>Refreshing halted due to inactivity<br /><a href='#FantasyScheduleRestart' onclick='fantasyScheduleMaxLoops=0; getFantasySchedule(thisFantasyWeek);' style='text-decoration: underline;'>Click to Restart</a></div>";
   document.getElementById("fantasyscheduleinactivity").innerHTML = refreshData;
  }
}

function doFantasyScheduleTimer() {
  if(fantasyScheduleCount<120) { //Reload after 120 seconds
   fantasyScheduleCount++;
   fantasyScheduleTimer = setTimeout("doFantasyScheduleTimer()",1000);
  } else {
   fantasyScheduleCount=0;
   clearTimeout(fantasyScheduleTimer);
   getFantasySchedule(0);  //getfantasySchedule restarts everything
  }
}

if(!fantasyScheduleClickToStart) {
 document.write("<div id='Fantasy_Schedule'></div>");
 document.write("<div id='fantasyScheduleIframe' style='position: absolute; top: 2px; left: 2px;'></div>");
 setTimeout("getFantasySchedule(0);",500);
} else {
 document.write("<div id='Fantasy_Schedule'><center><a href='#1' onclick='getFantasySchedule(thisFantasyWeek);' id='fantasyScheduleClick'><span class='habClickToStart'>Click to display Fantasy Schedule</span></a></center><br /><br /></div>"); 
 document.write("<div id='fantasyScheduleIframe' style='position: absolute; top: 2px; left: 2px;'></div>");
}