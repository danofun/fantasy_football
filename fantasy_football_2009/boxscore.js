if(boxRunning==undefined) var boxRunning = false; 
if(boxClickToStart==undefined) var boxClickToStart = false;

if(hideBoxTip==undefined) var hideBoxTip = false;

//==HOME PAGE ONLY SCRIPT=================================
var currentURL = unescape(location.href)
if (currentURL.indexOf("home")!=-1||currentURL.indexOf("message")!=-1) {
  var boxHomePageCheck = true;
} else {
  var boxHomePageCheck = false;
}
if(!boxHomeOnly) boxHomePageCheck = true;


if(boxHomePageCheck) { // ONLY RUN ENTIRE SCRIPT BELOW IF ON THE HOME PAGE

if(!boxRunning){ // ONLY HAVE ONE BOXSCORE OPERATIONAL AT A TIME


//DO NOT EDIT BELOW =======================================

var boxMode;
var boxCount = 0;
var boxScoreboard = new Array();
var boxTips = new Array();
var boxRunning = true;
var boxMondayNightCheck = false;
var boxMaxLoops = 0;
if(tickerDecimals == undefined) var tickerDecimals = 0;

//== STICKY NOTE SCRIPT FROM DYNAMIC DRIVE  =============================================
/***********************************************
* Fixed ToolTip script- © Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/
		
var tipwidth='250px' //default tooltip width
var disappeardelay=250  //tooltip disappear speed onMouseout (in miliseconds)
var vertical_offset="8px" //horizontal offset of tooltip from anchor link
var horizontal_offset="30px" //horizontal offset of tooltip from anchor link

/////No further editting needed

var ie4=document.all
var ns6=document.getElementById&&!document.all

if (ie4||ns6)
document.write('<div id="fixedtipdiv" class="tipbox" style="position:absolute; z-index:2000; visibility: hidden;width:' + tipwidth + '" ></div>')

function getposOffset(what, offsettype){
  var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
  var parentEl=what.offsetParent;
  while (parentEl!=null){
   totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
   parentEl=parentEl.offsetParent;
  }
  return totaloffset;
}

function showhide(obj, e, visible, hidden, tipwidth){
  if (ie4||ns6) dropmenuobj.style.left=dropmenuobj.style.top=-500
  if (tipwidth!=""){
   dropmenuobj.widthobj=dropmenuobj.style
   dropmenuobj.widthobj.width=tipwidth
  }
  if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover")
   obj.visibility=visible
  else if (e.type=="click")
        obj.visibility=hidden
}

function iecompattest(){
  return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
  var edgeoffset=(whichedge=="rightedge")? parseInt(horizontal_offset)*-1 : parseInt(vertical_offset)*-1
  if (whichedge=="rightedge"){
   var windowedge=ie4 && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
   dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
   if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
    edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
  } else {
   var windowedge=ie4 && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
   dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
   if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure)
    edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight
  }
  return edgeoffset
}

function fixedtooltip(ID, obj, e, tipwidth){
  var menucontents = "<b>" + boxTips[ID][0] + "</b><br />&nbsp<b>Game minutes remaining: </b>" + boxTips[ID][1] + "<table style=\"border-collapse: collapse; border: 0px;\"><tr><td><b>Players&nbsp;currently&nbsp;playing</b></td><td>&nbsp;&nbsp;&nbsp;</td><td><b>Players&nbsp;yet&nbsp;to&nbsp;play</b></td></tr><tr><td valign=\"top\">" + boxTips[ID][2] + "</td><td>&nbsp;</td><td valign=\"top\">" + boxTips[ID][3] + "</td></tr></table>";
  menucontents = menucontents.replace(/'/g,"’");
  if (window.event) 
   event.cancelBubble=true
  else if (e.stopPropagation) e.stopPropagation()
        clearhidetip()
  dropmenuobj=document.getElementById? document.getElementById("fixedtipdiv") : fixedtipdiv
  dropmenuobj.innerHTML=menucontents

  if (ie4||ns6){
   showhide(dropmenuobj.style, e, "visible", "hidden", tipwidth)
   dropmenuobj.x=getposOffset(obj, "left")
   dropmenuobj.y=getposOffset(obj, "top")
   dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+"px"
   dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
  }
}

function hidetip(e){
  if (typeof dropmenuobj!="undefined"){
   if (ie4||ns6)
    dropmenuobj.style.visibility="hidden"
  }
}

function delayhidetip(){
  if (ie4||ns6)
   delayhide=setTimeout("hidetip()",disappeardelay)
}

function clearhidetip(){
  if (typeof delayhide!="undefined")
   clearTimeout(delayhide)
}

//== END DYNAMIC DRIVE SCRIPT=====================


function getTipData(matchupArray) {
  for (var i=0; i<matchupArray.length; i++) {
   var roadID = matchupArray[i]['road'][0];
   var homeID = matchupArray[i]['home'][0];
   if(roadID!="BYE"&&homeID!="BYE") {
   
    if(roadID=="AVG") var roadName = "Average"; else roadName = franchiseDatabase['fid_' + roadID].name;
    if(homeID=="AVG") var homeName = "Average"; else homeName = franchiseDatabase['fid_' + homeID].name;
    boxTips[roadID] = [roadName,"","",""];
    boxTips[homeID] = [homeName,"","",""];
    var roadStarters = matchupArray[i]['road'][2];
    var homeStarters = matchupArray[i]['home'][2];
    var roadLength = parseInt((roadStarters.length)/5,10);
    var homeLength = parseInt((homeStarters.length)/5,10);
   
    var seconds = 0;
    for (var j=0; j<roadLength; j++) {
     try {
      var id = roadStarters.substr(j*5,4);
      var nflTeamSeconds = parseInt(habGlobalNFLGameSeconds[playerDatabase['pid_' + id].team],10);
      var name = formatName(playerDatabase['pid_' + id].name);
      var position = playerDatabase['pid_' + id].position;
      if (nflTeamSeconds==3600) 
       boxTips[roadID][3] += "&nbsp;&nbsp;" + position + "&nbsp;&nbsp;" + name + "<br />";
      else
       if (nflTeamSeconds>0)
        boxTips[roadID][2] += "&nbsp;&nbsp;" + position + "&nbsp;&nbsp;" + name + "<br />";
      seconds += nflTeamSeconds;  
     } catch(er) {
      // don't add anything
     }
    }
    boxTips[roadID][1] = parseInt(seconds/60,10);
    
    var seconds = 0;
    for (var j=0; j<homeLength; j++) {
     try {
      var id = homeStarters.substr(j*5,4);
      var nflTeamSeconds = parseInt(habGlobalNFLGameSeconds[playerDatabase['pid_' + id].team],10);
      var name = formatName(playerDatabase['pid_' + id].name);
      var position = playerDatabase['pid_' + id].position;
      if (nflTeamSeconds==3600) 
       boxTips[homeID][3] += "&nbsp;&nbsp;" + position + "&nbsp;&nbsp;" + name + "<br />";
      else
       if (nflTeamSeconds>0)
        boxTips[homeID][2] += "&nbsp;&nbsp;" + position + "&nbsp;&nbsp;" + name + "<br />";
      seconds += nflTeamSeconds;  
     } catch(er) {
      //don't add anything
     }
    }
    if(boxTips[roadID][2]=="") boxTips[roadID][2] = "&nbsp;&nbsp;none";
    if(boxTips[homeID][2]=="") boxTips[homeID][2] = "&nbsp;&nbsp;none";
    if(boxTips[roadID][3]=="") boxTips[roadID][3] = "&nbsp;&nbsp;none";
    if(boxTips[homeID][3]=="") boxTips[homeID][3] = "&nbsp;&nbsp;none";
    boxTips[homeID][1] = parseInt(seconds/60,10);
   } // END IF != BYE
  }  // END LOOP
}

function doBoxTables(matchupArray,weekNum,mode){
   switch (mode) {
    case 4: { // WEEKLY RESULTS GAMES NOT SCHEDULED HENCE matchupArray.length == 0 SO WE NEED TO ACCOUNT FOR TABLE
              boxScoreboard[0] =  "<table align='center' border='0' class='boxinnertable' style='border-collapse: collapse;'>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>No Games Scheduled</td></tr>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>&nbsp;</td></tr>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>&nbsp;</td></tr>";
              boxScoreboard[0] += "</table>";
              break; }
    case 5: { // NEXT WEEKS GAMES NOT SCHEDULED HENCE matchupArray.length == 0 SO WE NEED TO ACCOUNT FOR TABLE
              boxScoreboard[0] =  "<table align='center' border='0' class='boxinnertable' style='border-collapse: collapse;'>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>No Games Scheduled</td></tr>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>&nbsp;</td></tr>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>&nbsp;</td></tr>";
              boxScoreboard[0] += "</table>";
              break; }

    case 6: { // LIVE SCORING GAMES NOT SCHEDULED HENCE matchupArray.length == 0 SO WE NEED TO ACCOUNT FOR TABLE
              boxScoreboard[0] =  "<table  align='center' border='0' class='boxinnertable' style='border-collapse: collapse;'>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>No Games Scheduled</td></tr>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>&nbsp;</td></tr>";
              boxScoreboard[0] += "<tr class='boxtablerow'><td colspan='2' class='boxteam'>&nbsp;</td></tr>";
              boxScoreboard[0] += "</table>";
              break; }
    default:  break; 
   }
   var actualMatchups = 0;
   for (var i=0; i<matchupArray.length; i++) {
    var countMatchup = false;
    var roadID = matchupArray[i]['road'][0];
    var homeID = matchupArray[i]['home'][0];
    if(roadID!="BYE"&&homeID!="BYE") {
     countMatchup = true;
     if(roadID=="AVG") var altRoadName = "Average"; else var altRoadName = franchiseDatabase['fid_' + roadID].name;
     if(homeID=="AVG") var altHomeName = "Average"; else var altHomeName = franchiseDatabase['fid_' + homeID].name;
     altRoadName = altRoadName.replace(/'/g,"’");
     altHomeName = altHomeName.replace(/'/g,"’");
     if(altRoadName=="Average"||altHomeName=="Average") var averageScore = getHabAverageScore(matchupArray);
     var roadLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + roadID + "&O=07' target='franchisepage' border='0' class='boxteam' title='" + altRoadName + "' style='text-decoration: none;'>";
     var homeLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + homeID + "&O=07' target='franchisepage' border='0' class='boxteam' title='" + altHomeName + "' style='text-decoration: none;'>";
     var roadIcon = getHabTeamIcon(boxIconLeagueDefault,boxLogoLeagueDefault,boxIconURL,boxIconExt,"boxicon",roadID,useOldBoxIconMethod);
     var homeIcon = getHabTeamIcon(boxIconLeagueDefault,boxLogoLeagueDefault,boxIconURL,boxIconExt,"boxicon",homeID,useOldBoxIconMethod);
     switch (mode) {
      case 1: { // LIVESCORING
               var clock = getHabTime(parseInt(matchupArray[i]['road'][1],10),parseInt(matchupArray[i]['home'][1],10),matchupArray[i]['gameSecondsRemaining']);
               var footer = "<a href='" + baseURLDynamic + "/" + year + "/live_scoring?L=" + league_id + "&FRANCHISES=" + matchupArray[i]['road'][0] + "_" + matchupArray[i]['home'][0] + "' target='livescoring' class='boxclock'>" + clock + "</a>"; 
               var roadTip  = " onmouseover=\"fixedtooltip('" + roadID + "',this,event,'300px')\"; onmouseout=\"delayhidetip()\" ";
               var homeTip  = " onmouseover=\"fixedtooltip('" + homeID + "',this,event,'300px')\"; onmouseout=\"delayhidetip()\" ";
               if(hideBoxTip) {
                roadTip = "";
                homeTip = "";
               }
               var roadScore = (parseFloat(matchupArray[i]['road'][1],10));
               var homeScore = (parseFloat(matchupArray[i]['home'][1],10));
               roadScore =  roadScore.toFixed(boxDecimals);
               homeScore =  homeScore.toFixed(boxDecimals);
               if(altRoadName=="Average") roadScore =  averageScore.toFixed(boxDecimals);
               if(altHomeName=="Average") homeScore =  averageScore.toFixed(boxDecimals);
               var roadSpread = "";
               var homeSpread = "";
               break; }
      case 2: { // WEEKLY RESULTS
               var footer = "<a href='" + baseURLDynamic+ "/" + year + "/options?L=" + league_id + "&O=22' target='weeklyresults' class='boxclock'>Final</a>"; 
               var roadTip = "";
               var homeTip = "";
               var roadScore = (parseFloat(matchupArray[i]['road'][1],10));
               var homeScore = (parseFloat(matchupArray[i]['home'][1],10));
               roadScore =  roadScore.toFixed(boxDecimals);
               homeScore =  homeScore.toFixed(boxDecimals);
               if(altRoadName=="Average") roadScore =  averageScore.toFixed(boxDecimals);
               if(altHomeName=="Average") homeScore =  averageScore.toFixed(boxDecimals);
               var roadSpread = "";
               var homeSpread = "";
               break; }
      case 3: { // NEXT WEEKS GAMES
               var footer = "<a href='" + baseURLDynamic + "/" + year + "/live_scoring?L=" + league_id + "&W=" + weekNum + "&FRANCHISES=" + matchupArray[i]['road'][0] + "_" + matchupArray[i]['home'][0] + "' target='livescoring' class='boxclock'>Preview</a>"; 
               var roadTip = "";
               var homeTip = "";
               var roadScore = habGlobalFranchiseRecord[matchupArray[i]['road'][0]];
               var homeScore = habGlobalFranchiseRecord[matchupArray[i]['home'][0]];
               if(roadScore == undefined) roadScore = "n/a";
               if(homeScore == undefined) homeScore = "n/a";
               var roadSpread = matchupArray[i]['road'][3];
               var homeSpread = matchupArray[i]['home'][3];
               if(roadSpread==null) roadSpread = ""; else roadSpread = "<span class='boxspread'>" + parseFloat(roadSpread,10).toFixed(boxDecimals) + "</span>";
               if(homeSpread==null) homeSpread = ""; else homeSpread = "<span class='boxspread'>" + parseFloat(homeSpread,10).toFixed(boxDecimals) + "</span>";
               if(hideSpread) {roadSpread = ""; homeSpread = ""; }
               break; }
     } //END SWITCH
    } //END IF

    if(countMatchup) {
     var roadName = getHabTeamName(hideName,useNickNames,franchiseNickNames,roadID);
     var homeName = getHabTeamName(hideName,useNickNames,franchiseNickNames,homeID);
     if(i%2) {
      var rowclass = "boxevenrow";
     } else {
      var rowclass = "boxoddrow";
     }
     boxScoreboard[actualMatchups] =  "<table align='center' cellspacing='0' border='0' class='boxinnertable'>\n";
     boxScoreboard[actualMatchups] += " <tr " + roadTip + " class='boxtablerow " + rowclass + "'>\n  <td align='left' class='boxteam'>&nbsp;" + roadLink + roadIcon + "&nbsp;" + roadName + "</a>&nbsp;" + roadSpread + "</td>\n  <td align='right' class='boxscore'>" + roadScore + "&nbsp;</td>\n </tr>\n";
     boxScoreboard[actualMatchups] += " <tr " + homeTip + " class='boxtablerow " + rowclass + "'>\n  <td align='left' class='boxteam'>&nbsp;" + homeLink + homeIcon + "&nbsp;" + homeName + "</a>&nbsp;" + homeSpread + "</td>\n  <td align='right' class='boxscore'>" + homeScore + "&nbsp;</td>\n </tr>\n";
     boxScoreboard[actualMatchups] += " <tr class='boxtablerow " + rowclass + "'>\n  <td colspan='2' align='center' class='boxclock'>" + footer + "</td>\n </tr>\n";
     boxScoreboard[actualMatchups] += "</table>";
     actualMatchups++;
    }
   } //END LOOP
   displayBox();
}

function displayBox() {
  var int   = parseInt(boxScoreboard.length/boxRows,10);
  var float = parseFloat(boxScoreboard.length/boxRows,10);
  if(int==float) var boxColumns = int; else var boxColumns = int + 1;
  var htmlCode = "<table align='center' cellspacing='0' class='boxoutertable'>\n<tbody>\n";
  for (var i=0; i<boxRows; i++) {
   for (var j=0; j<boxColumns; j++) {
    var index = i*boxColumns + j;
    if(boxScoreboard[index]!=undefined) {
     htmlCode += "<td class='boxoutertd'>\n" + boxScoreboard[index] + "\n</td>\n";
    } else {
     htmlCode += "<td>&nbsp;</td>\n";
    }
   }
   htmlCode += "</tr>\n";
  }
  var boxColSpan = boxColumns;
  htmlCode += "<tr class='boxtablerow'>\n <td class='boxoutertd' colspan='10' id='tiprow' style='display: none;'>\n  <div align='left' id='tipdiv'></div>\n </td>\n</tr>\n";
  htmlCode += "</tbody>\n</table>";
//  document.getElementById("habboxscore").innerHTML = '<textarea height=500 width=700>' + htmlCode + '</textarea>';
  document.getElementById("habboxscore").innerHTML = htmlCode;

  doBoxTimer();
}

function doBoxTimer() {
  if(boxCount<120) {  // Reload after 120 seconds
   boxCount++; 
   setTimeout("doBoxTimer()",1000);
  } else {
   boxCount=0; 
   getBoxMode();  //getBoxMode restarts everything
  }
}

function getBoxMode() {
  boxCount = 0;
  boxMaxLoops++;
   if(boxMaxLoops<31) {
   if(completedWeek==liveScoringWeek) boxMode = 'betweenWeeks'; else boxMode = 'live';
   if(boxMode=='live') doLiveBoxFunctions(); else doBetweenGameBoxFunctions();
  } else {
   var refreshData = "<table align='center' cellspacing='0' class='boxoutertable' style='position: relative; z-index: 1000;'><tr><td class='boxoutertd'>Boxscores halted due to inactivity - <a href='#BoxRestart' onclick='boxMaxLoops=0; getBoxMode();' style='text-decoration: underline;'>Click to Restart</a></td></tr></table>";
   document.getElementById("habboxscore").innerHTML += refreshData;
  }
}

function doLiveBoxFunctions() {
  document.getElementById("boxscoreIframe").innerHTML = "<iframe src='" + habBaseURL + "/" + year + "/live_scoring_summary?L=" + league_id +  "&App=bs' style='width: 0; height: 0; border: 0px;'></iframe>";
  document.getElementById("boxscoreIframe").innerHTML = "";
  var thisWeek         = liveScoringWeek;
  var boxLiveScoring   = new Array();
  var boxWeeklyResults = new Array();
  makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=nflSchedule&L="+league_id+"&W="+thisWeek+"&prg=boxscore&rand=" + Math.random(), 'parseHabNFLScheduleXML','nflSchedule',false);

  boxWeeklyResults = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+thisWeek+"&prg=boxscore&rand=" + Math.random() , 'parseHabWeeklyResultsXML','weeklyResults',true);
  if(boxWeeklyResults.length==0) boxWeeklyResults = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+thisWeek+"&prg=boxscore&rand=" + Math.random() , 'parseHabWeeklyResultsXML','weeklyResults',true);

  getTipData(boxWeeklyResults);

  boxLiveScoring = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+thisWeek+"&prg=boxscore&rand=" + Math.random() , 'parseHabLiveScoringXML','liveScoring',true);
  if(boxLiveScoring.length==0) boxLiveScoring = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+thisWeek+"&prg=boxscore&rand=" + Math.random() , 'parseHabLiveScoringXML','liveScoring',true);

  if(boxLiveScoring.length==0) 
   doBoxTables(boxLiveScoring,thisWeek,6);  
  else
   doBoxTables(boxLiveScoring,thisWeek,1);     
}

function doBetweenGameBoxFunctions() {
  var d                = new Date();
  var dayOfWeek        = d.getDay();
  var thisWeek         = completedWeek;
  var boxWeeklyResults = new Array();
  if(dayOfWeek<boxSwitchDay) { // DO LAST WEEKS RESULTS

   boxWeeklyResults = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W=" +thisWeek+"&prg=boxscore&rand=" + Math.random(), 'parseHabWeeklyResultsXML','weeklyResults',true);
   if(boxWeeklyResults.length==0)  boxWeeklyResults = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W=" +thisWeek+"&prg=boxscore&rand=" + Math.random(), 'parseHabWeeklyResultsXML','weeklyResults',true);

   if(boxWeeklyResults.length==0) {
    doBoxTables(boxWeeklyResults,thisWeek,4);  
   } else {
    if(habGlobalScoreCheck!=0) {
     doBoxTables(boxWeeklyResults,thisWeek,2);     
    } else {
     boxMondayNightCheck = true;
     doLiveBoxFunctions(); 
    }
   } 
  } else {                    // DO NEXT WEEKS GAMES
   var nextWeek = thisWeek + 1;

   boxWeeklyResults = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+nextWeek+"&prg=boxscore&rand=" + Math.random() , 'parseHabWeeklyResultsXML','weeklyResults',true);
   if(boxWeeklyResults.length==0) {
    doBoxTables(boxWeeklyResults,nextWeek,5);  
   } else {
    doBoxTables(boxWeeklyResults,nextWeek,3); 
   }   
  }
}

if(boxClickToStart.length>0) {
 var habNow = new Date();
 var _boxClickToStart = boxClickToStart[habNow.getDay()];
} else {
 var _boxClickToStart = boxClickToStart;
}

if(!_boxClickToStart) {
 document.write("<div align='center' id='habboxscore'><table align='center' cellspacing='0' border='0' class='boxinnertable'><tr><td align='center'>&nbsp;<br />Boxscores are loading . . . . . . Please wait.<br />&nbsp;<br />&nbsp;</td></tr></table></div>"); 
 document.write("<div id='boxscoreIframe' style='position: absolute; top: 2px; left: 2px;'></div>");
 setTimeout("getBoxMode()",500);
} else {
 document.write("<div align='center' id='habboxscore'><table align='center' cellspacing='0' border='0' class='boxinnertable'><tr><td align='center'><a href='#1' onclick='getBoxMode();' id='boxClick'><span class='habClickToStart'>Click to activate Boxscore</span></a></td></tr></table></div>"); 
 document.write("<div id='boxscoreIframe' style='position: absolute; top: 2px; left: 2px;'></div>");
}
makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=standings&L="+league_id+"&prg=boxscore&rand=" + Math.random() , 'parseHabFranchiseRecordsXML','standings',false);


} else { 
document.write('Code Duplication Error<br />Only one boxscore per site');
}


}  // END IF BOXSCORE HOME PAGE CHECK