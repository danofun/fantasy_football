if(mondayReportAlwaysOn == undefined)   var mondayReportAlwaysOn = false;
if(mondayReportClickToStart==undefined) var mondayReportClickToStart = false;
if(mondayReportDecimals==undefined)     var mondayReportDecimals = 0;
if(useOldMondayIconMethod==undefined)   var useOldMondayIconMethod = false;

var mondayReportWeeklyResults = new Array();
var mondayReportLiveScoring   = new Array();


function getMondayNightYTP(starterString) {
   var starters = starterString;
   var seconds = 0;
   var yetToPlay = "";
   while(starters.indexOf(",")>0) {
    var comma = starters.indexOf(",");
    var id = starters.substr(0,comma);
    starters = starters.substr(comma+1,starters.length);
    try {
     var nflTeamSeconds = parseInt(habGlobalNFLGameSeconds[playerDatabase['pid_' + id].team],10);
    } catch(er) {
     var nflTeamSeconds = 0;
    }
    if (nflTeamSeconds>0) {
     var name = formatName(playerDatabase['pid_' + id].name);
     var team = playerDatabase['pid_' + id].team;
     var pos  = playerDatabase['pid_' + id].position;
     yetToPlay +=  name + "<br />" + "(" + team  + "-" + pos + ")<br />";
    }
   }
   if(yetToPlay=="") yetToPlay = "&nbsp;";
   return yetToPlay;
}

function doMondayReportTables() {
   var htmlCode = "<table align='center' cellspacing='0' class='homepagemodule report' id='mondayOuterTable'><caption><span>" + mondayReportTitle + "</span></caption><tr>";
   var gameOverCheck = new Array();
   for(var i=0; i<mondayReportLiveScoring.length; i++) {
    var roadYTP     = getMondayNightYTP(mondayReportWeeklyResults[i]['road'][2]);
    var homeYTP     = getMondayNightYTP(mondayReportWeeklyResults[i]['home'][2]);
    if(roadYTP=="&nbsp;"&&homeYTP=="&nbsp;") gameOverCheck[i]=true; else gameOverCheck[i]=false;
   }

   //DO "IN THE BOOKS"
   var htmlTable = "";
   var rowCount = 0;
   for(var i=0; i< mondayReportLiveScoring.length; i++) {
    var roadFID = mondayReportLiveScoring[i]['road'][0];
    var homeFID = mondayReportLiveScoring[i]['home'][0];
    if(roadFID!="BYE"&&homeFID!="BYE") {
     if((mondayReportLiveScoring[i]['road'][2]=="0"&&mondayReportLiveScoring[i]['home'][2]=="0")||gameOverCheck[i]) { 
      var roadScore = parseFloat(mondayReportLiveScoring[i]['road'][1],10); 
      var homeScore = parseFloat(mondayReportLiveScoring[i]['home'][1],10); 
      var roadName    = getHabTeamName(hideMondayTeamName,useMondayNickNames,franchiseNickNames,roadFID);
      var homeName    = getHabTeamName(hideMondayTeamName,useMondayNickNames,franchiseNickNames,homeFID);
      var altRoadName = getHabTeamName(false,false,franchiseNickNames,roadFID);
      var altHomeName = getHabTeamName(false,false,franchiseNickNames,homeFID);
      var roadIcon    = getHabTeamIcon(mondayReportDefaultIcon,mondayReportDefaultLogo,mondayReportIconURL,mondayReportIconExt,"mondayIcon",roadFID,useOldMondayIconMethod);
      var homeIcon    = getHabTeamIcon(mondayReportDefaultIcon,mondayReportDefaultLogo,mondayReportIconURL,mondayReportIconExt,"mondayIcon",homeFID,useOldMondayIconMethod);
      var roadLink    = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + roadFID + "&O=07' target='franchisepage' border='0' title='" + altRoadName + "' style='text-decoration: none;'>";
      var homeLink    = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + homeFID + "&O=07' target='franchisepage' border='0' title='" + altHomeName + "' style='text-decoration: none;'>";
      if(parseFloat(mondayReportLiveScoring[i]['road'][1],10)>parseFloat(mondayReportLiveScoring[i]['home'][1],10))
       { var roadClass = "mondayWinner"; var homeClass = "mondayLoser"; }
      else if(parseFloat(mondayReportLiveScoring[i]['road'][1],10)<parseFloat(mondayReportLiveScoring[i]['home'][1],10))
            { var roadClass = "mondayLoser"; var homeClass = "mondayWinner"; }
           else { var roadClass = "mondayTied"; var homeClass = "mondayTied"; }
      if(rowCount%2) 
       htmlTable += "<tr class='oddtablerow'><td class='mondayTeam " + roadClass + "'> "  + roadLink + roadIcon + roadName + "</a></td><td class='mondayScore " + roadClass + "'> " + roadScore.toFixed(mondayReportDecimals) + " </td><td class='mondayAtSymbol'>&nbsp; vs. </td><td class='mondayScore " + homeClass + "'> " + homeScore.toFixed(mondayReportDecimals) + "</td><td class='mondayTeam " + homeClass + "'> " + homeLink + homeIcon + homeName + "</a></td></tr>\n";
      else
       htmlTable += "<tr class='eventablerow'><td class='mondayTeam " + roadClass + "'> " + roadLink + roadIcon + roadName + "</a></td><td class='mondayScore " + roadClass + "'> " + roadScore.toFixed(mondayReportDecimals) + " </td><td class='mondayAtSymbol'>&nbsp; vs. </td><td class='mondayScore " + homeClass + "'> " + homeScore.toFixed(mondayReportDecimals) + "</td><td class='mondayTeam " + homeClass + "'> " + homeLink + homeIcon + homeName + "</a></td></tr>\n";
      rowCount++;     
     } //END IF
    }  //END IF
   }   //END LOOP
   if(htmlTable!="") htmlCode += "<th colspan='5' id='inTheBooks'>" + mondayReportTitle1 + "</th>\n" + htmlTable + "\n";

   //DO "RUBBING IT IN"   
   htmlTable = "";
   rowCount = 0;
   for(var i=0; i< mondayReportLiveScoring.length; i++) {
    var roadFID = mondayReportLiveScoring[i]['road'][0];
    var homeFID = mondayReportLiveScoring[i]['home'][0];
    if(roadFID!="BYE"&&homeFID!="BYE") {
     var roadScore = parseFloat(mondayReportLiveScoring[i]['road'][1],10); 
     var homeScore = parseFloat(mondayReportLiveScoring[i]['home'][1],10); 
     var roadTime  = parseInt(mondayReportLiveScoring[i]['road'][2],10); 
     var homeTime  = parseInt(mondayReportLiveScoring[i]['home'][2],10); 
     if(((roadScore>homeScore&&homeTime==0&&roadTime>0)||(homeScore>roadScore&&roadTime==0&&homeTime>0))&&!gameOverCheck[i]) {
      var roadName    = getHabTeamName(hideMondayTeamName,useMondayNickNames,franchiseNickNames,roadFID);
      var homeName    = getHabTeamName(hideMondayTeamName,useMondayNickNames,franchiseNickNames,homeFID);
      var altRoadName = getHabTeamName(false,false,franchiseNickNames,roadFID);
      var altHomeName = getHabTeamName(false,false,franchiseNickNames,homeFID);
      var roadIcon    = getHabTeamIcon(mondayReportDefaultIcon,mondayReportDefaultLogo,mondayReportIconURL,mondayReportIconExt,"mondayIcon",roadFID,useOldMondayIconMethod);
      var homeIcon    = getHabTeamIcon(mondayReportDefaultIcon,mondayReportDefaultLogo,mondayReportIconURL,mondayReportIconExt,"mondayIcon",homeFID,useOldMondayIconMethod);
      var roadLink    = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + roadFID + "&O=07' target='franchisepage' border='0' title='" + altRoadName + "' style='text-decoration: none;'>";
      var homeLink    = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + homeFID + "&O=07' target='franchisepage' border='0' title='" + altHomeName + "' style='text-decoration: none;'>";
      var roadYTP     = getMondayNightYTP(mondayReportWeeklyResults[i]['road'][2]);
      var homeYTP     = getMondayNightYTP(mondayReportWeeklyResults[i]['home'][2]);
      if(parseFloat(mondayReportLiveScoring[i]['road'][1],10)>parseFloat(mondayReportLiveScoring[i]['home'][1],10))
       { var roadClass = "mondayWinner"; var homeClass = "mondayLoser"; }
      else if(parseFloat(mondayReportLiveScoring[i]['road'][1],10)<parseFloat(mondayReportLiveScoring[i]['home'][1],10))
            { var roadClass = "mondayLoser"; var homeClass = "mondayWinner"; }
           else { var roadClass = "mondayTied"; var homeClass = "mondayTied"; }
      if(rowCount%2) {
       htmlTable += "<tr class='oddtablerow'><td class='mondayTeam " + roadClass + "'> "  + roadLink + roadIcon + roadName + "</a></td><td class='mondayScore " + roadClass + "'> " + roadScore.toFixed(mondayReportDecimals) + " </td><td class='mondayAtSymbol'>&nbsp; vs. </td><td class='mondayScore " + homeClass + "'> " + homeScore.toFixed(mondayReportDecimals) + "</td><td class='mondayTeam " + homeClass + "'> " + homeLink + homeIcon + homeName + "</a></td></tr>\n";
       htmlTable += "<tr class='oddtablerow'><td class='mondayYTP'>"   + roadYTP + "</a><td colspan='3'>&nbsp;</td><td class='mondayYTP'>" + homeYTP + "</td></tr>\n";
      } else {
       htmlTable += "<tr class='eventablerow'><td class='mondayTeam " + roadClass + "'> " + roadLink + roadIcon + roadName + "</a></td><td class='mondayScore " + roadClass + "'> " + roadScore.toFixed(mondayReportDecimals) + " </td><td class='mondayAtSymbol'>&nbsp; vs. </td><td class='mondayScore " + homeClass + "'> " + homeScore.toFixed(mondayReportDecimals) + "</td><td class='mondayTeam " + homeClass + "'> " + homeLink + homeIcon + homeName + "</a></td></tr>\n";
       htmlTable += "<tr class='eventablerow'><td class='mondayYTP'>"   + roadYTP + "</a><td colspan='3'>&nbsp;</td><td class='mondayYTP'>" + homeYTP + "</td></tr>\n";
      }
      rowCount++;     
     } //END IF
    }  //END IF
   }   //END LOOP
   if(htmlTable!="") htmlCode += "<th colspan='5' id='rubbingItIn'>" + mondayReportTitle2 + "</th>\n" + htmlTable + "\n";
   
   //DO "AIN'T OVER YET"
   htmlTable = "";
   rowCount = 0;
   for(var i=0; i< mondayReportLiveScoring.length; i++) {
    var roadFID = mondayReportLiveScoring[i]['road'][0];
    var homeFID = mondayReportLiveScoring[i]['home'][0];
    if(roadFID!="BYE"&&homeFID!="BYE") {
     var roadScore = parseFloat(mondayReportLiveScoring[i]['road'][1],10); 
     var homeScore = parseFloat(mondayReportLiveScoring[i]['home'][1],10); 
     var roadTime  = parseInt(mondayReportLiveScoring[i]['road'][2],10); 
     var homeTime  = parseInt(mondayReportLiveScoring[i]['home'][2],10); 
     if(((roadScore>=homeScore&&homeTime>0)||(homeScore>=roadScore&&roadTime>0))&&!gameOverCheck[i]) {
      var roadName    = getHabTeamName(hideMondayTeamName,useMondayNickNames,franchiseNickNames,roadFID);
      var homeName    = getHabTeamName(hideMondayTeamName,useMondayNickNames,franchiseNickNames,homeFID);
      var altRoadName = getHabTeamName(false,false,franchiseNickNames,roadFID);
      var altHomeName = getHabTeamName(false,false,franchiseNickNames,homeFID);
      var roadIcon    = getHabTeamIcon(mondayReportDefaultIcon,mondayReportDefaultLogo,mondayReportIconURL,mondayReportIconExt,"mondayIcon",roadFID,useOldMondayIconMethod);  // Trailing false is old icon method
      var homeIcon    = getHabTeamIcon(mondayReportDefaultIcon,mondayReportDefaultLogo,mondayReportIconURL,mondayReportIconExt,"mondayIcon",homeFID,useOldMondayIconMethod);  // Trailing false is old icon method
      var roadLink    = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + roadFID + "&O=07' target='franchisepage' border='0' title='" + altRoadName + "' style='text-decoration: none;'>";
      var homeLink    = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + homeFID + "&O=07' target='franchisepage' border='0'  title='" + altHomeName + "' style='text-decoration: none;'>";
      var roadYTP     = getMondayNightYTP(mondayReportWeeklyResults[i]['road'][2]);
      var homeYTP     = getMondayNightYTP(mondayReportWeeklyResults[i]['home'][2]);
      if(rowCount%2) {
       htmlTable += "<tr class='oddtablerow'><td class='mondayTeam'> " + roadLink + roadIcon + roadName + "</a></td><td class='mondayScore'> " + roadScore.toFixed(mondayReportDecimals) + " </td><td>&nbsp; vs. </td><td class='mondayScore'> " + homeScore.toFixed(mondayReportDecimals) + "</td><td class='mondayTeam'> " + homeLink + homeIcon + homeName + "</a></td></tr>\n";
       htmlTable += "<tr class='oddtablerow'><td class='mondayYTP'>"   + roadYTP + "</a><td colspan='3'>&nbsp;</td><td class='mondayYTP'>" + homeYTP + "</td></tr>\n";
      } else {
       htmlTable += "<tr class='eventablerow'><td class='mondayTeam'> " + roadLink + roadIcon + roadName + "</a></td><td class='mondayScore'> " + roadScore.toFixed(mondayReportDecimals) + " </td><td>&nbsp; vs. </td><td class='mondayScore'> " + homeScore.toFixed(mondayReportDecimals) + "</td><td class='mondayTeam'> " + homeLink + homeIcon + homeName + "</a></td></tr>\n";
       htmlTable += "<tr class='eventablerow'><td class='mondayYTP'>"   + roadYTP + "</a><td colspan='3'>&nbsp;</td><td class='mondayYTP'>" + homeYTP + "</td></tr>\n";
      }
      rowCount++;
     } //END IF     
    }  //END IF
   }   //END LOOP
   if(htmlTable!="") htmlCode += "<th colspan='5' id='aintOverYet'>" + mondayReportTitle3 + "</th>\n" + htmlTable + "\n";
   
   htmlCode += "</tr></table>\n";
   document.getElementById("mondayReport").innerHTML = htmlCode;
}


function doMondayNightReport() {
  document.getElementById("mondayReportIframe").innerHTML = "<iframe src='" + habBaseURL + "/" + year + "/live_scoring_summary?L=" + league_id +  "&App=mon' style='width: 0; height: 0; border: 0px;'></iframe>";
  document.getElementById("mondayReportIframe").innerHTML = "";

  habXMLAttempt = 0;
  habXMLSuccess = false;
  while (!habXMLSuccess&&habXMLAttempt<2) { // Two attempts at grabbing XML data
   mondayReportWeeklyResults = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+liveScoringWeek+"&rand=" + Math.random(), 'parseHabWeeklyResultsXML','weeklyResults',true);
  }

  habXMLAttempt = 0;
  habXMLSuccess = false;
  while (!habXMLSuccess&&habXMLAttempt<2) { // Two attempts at grabbing XML data
   mondayReportLiveScoring   = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+liveScoringWeek+"&rand=" + Math.random(), 'parseHabLiveScoringXML','liveScoring',true);
  }

  makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=nflSchedule&W="+liveScoringWeek+"&rand=" + Math.random(), 'parseHabNFLScheduleXML','nflSchedule',false);
  doMondayReportTables();

}


function doMondayCheck() { 
  var rightNow = new Date(currentServerTime*1000);
  var today = rightNow.getDay();
  if(today==1) return true; else return false;
}

var isMonday = doMondayCheck();

if(isMonday||mondayReportAlwaysOn) {
 if(!mondayReportClickToStart) {
  document.write("<div id='mondayReport'></div>");
  document.write("<div id='mondayReportIframe'></div>");
  setTimeout("doMondayNightReport()",500); 
 } else {
  document.write("<div id='mondayReport'><center><a href='#1' onclick='doMondayNightReport();' id='mondayNightClick'><span class='habClickToStart'>Click to Display Monday Night Report</span></a><br /><br /></center></div>");
  document.write("<div id='mondayReportIframe'></div>");
 }
}