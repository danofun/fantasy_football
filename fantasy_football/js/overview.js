if(habOverviewRan==undefined)                var habOverviewRan = false;
if(overviewDecimals==undefined)              var overviewDecimals = 1;
if(overviewEnableStatsDisclaimer==undefined) var overviewEnableStatsDisclaimer = true;
if(overviewStatsDisclaimer==undefined)       var overviewStatsDisclaimer =  "(3rd party stats add-on; not official MFL stats)";
if(overviewScheduleMax==undefined)           var overviewScheduleMax = 17;
if(overviewScheduleNext==undefined)          var overviewScheduleNext = 17;
if(overviewSchedulePrev==undefined)          var overviewSchedulePrev = 17;
if(overviewMinimize==undefined)              var overviewMinimize = false;
   
document.write('<div id="overviewDropDown"></div>\n');
document.write('<div id="overviewReinitialize"></div>\n');
document.write('<div id="habOverviewTabs"></div>\n');

document.write('<script type="text/javascript" src="http://www.habman.com/mfl/apps/js/habTeamRatings.js?rand=' + Math.random() +'"></script>');
document.write('<script type="text/javascript" src="http://www.habman.com/mfl/apps/js/stats/'+year+'/habPlayerStats.js?rand=' + Math.random() +'"></script>');
document.write('<script type="text/javascript" src="http://www.habman.com/mfl/apps/js/habNewsBreakers.js?rand=' + Math.random() +'"></script>');


if(!habOverviewRan) {

habOverviewRan = true;


 /***********************************************
 * Fixed ToolTip script- © Dynamic Drive (www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit http://www.dynamicdrive.com/ for full source code
 ***********************************************/
		
 var overviewTip_tipwidth='450px' //default tooltip width
 var overviewTip_tipbgcolor='lightyellow'  //tooltip bgcolor
 var overviewTip_disappeardelay=250  //tooltip disappear speed onMouseout (in miliseconds)
 var overviewTip_vertical_offset="0px" //vertical offset of tooltip from anchor link
 var overviewTip_horizontal_offset="-3px" //horizontal offset of tooltip from anchor link

 /////No further editting needed

 var overviewTip_ie4=document.all
 var overviewTip_ns6=document.getElementById&&!document.all

 if (overviewTip_ie4||overviewTip_ns6)

 document.write('<div id="overviewTip_fixedtipdiv" style="position:absolute; padding: 2px; border: 1px solid black; color: black; font-size: 12px; line-height: 18px; z-index: 100; visibility:hidden; width:'+overviewTip_tipwidth+';background-color:'+overviewTip_tipbgcolor+'" ></div>')

 function overviewTip_getposOffset(what, offsettype){
   var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
   var parentEl=what.offsetParent;
   while (parentEl!=null){
    totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
    parentEl=parentEl.offsetParent;
   }
   return totaloffset;
 }


 function overviewTip_showhide(obj, e, visible, hidden, overviewTip_tipwidth){
   if (overviewTip_ie4||overviewTip_ns6)
    dropmenuobj.style.left=dropmenuobj.style.top=-500
   if (overviewTip_tipwidth!=""){
    dropmenuobj.widthobj=dropmenuobj.style
    dropmenuobj.widthobj.width=overviewTip_tipwidth
   }
   if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover")
    obj.visibility=visible
   else if (e.type=="click")
    obj.visibility=hidden
 }

 function overviewTip_iecompattest(){
   return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
 }

 function overviewTip_clearbrowseredge(obj, whichedge){
   var edgeoffset=(whichedge=="rightedge")? parseInt(overviewTip_horizontal_offset)*-1 : parseInt(overviewTip_vertical_offset)*-1
   if (whichedge=="rightedge"){
    var windowedge=overviewTip_ie4 && !window.opera? overviewTip_iecompattest().scrollLeft+overviewTip_iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
    dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
    if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
     edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
   } else {
    var windowedge=overviewTip_ie4 && !window.opera? overviewTip_iecompattest().scrollTop+overviewTip_iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
    dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
    if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure)
     edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight
   }
   return edgeoffset
 }

 function overviewTip_fixedtooltip(tipscores, obj, e, overviewTip_tipwidth){
   menucontents = tipscores.replace(/'/g,"’");
   if (window.event) event.cancelBubble=true
    else if (e.stopPropagation) e.stopPropagation()
   overviewTip_clearhidetip()
   dropmenuobj=document.getElementById? document.getElementById("overviewTip_fixedtipdiv") : overviewTip_fixedtipdiv
   dropmenuobj.innerHTML=menucontents

   if (overviewTip_ie4||overviewTip_ns6){
    overviewTip_showhide(dropmenuobj.style, e, "visible", "hidden", overviewTip_tipwidth)
    dropmenuobj.x=overviewTip_getposOffset(obj, "left")
    dropmenuobj.y=overviewTip_getposOffset(obj, "top")
    dropmenuobj.style.left=dropmenuobj.x-overviewTip_clearbrowseredge(obj, "rightedge")+"px"
    dropmenuobj.style.top=dropmenuobj.y-overviewTip_clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
   }
 }

 function overviewTip_hidetip(e){
   if (typeof dropmenuobj!="undefined"){
    if (overviewTip_ie4||overviewTip_ns6)
     dropmenuobj.style.visibility="hidden"
   }
 }

 function overviewTip_delayhidetip(){
   if (overviewTip_ie4||overviewTip_ns6)
    overviewTip_delayhide=setTimeout("overviewTip_hidetip()",overviewTip_disappeardelay)
 }

 function overviewTip_clearhidetip(){
   if (typeof overviewTip_delayhide!="undefined")
   clearTimeout(overviewTip_delayhide)
 }

 //== END DYNAMIC DRIVE SCRIPT=====================


var playerStatsAdded        = false;
var starterStatsAdded       = false;
var habStarterStats         = new Array();
var habOverviewPlayerScores = new Array();
var habOverviewNFLData      = new Array();
var habOverviewTopStarters  = new Array();
var habOverviewStatus       = new Array();
var habOverviewBgColor      = new Array("FF0000","FF8000","FFFF00","01DF01","04B404");
var habOverviewFontColor    = new Array("FFFFFF","000000","000000","000000","FFFFFF");

var globalOverviewTeam;
var currentOverviewTeam    = ""; 
var currentOverviewTab     = "";

var overviewWeek = completedWeek + 1;

if(displayOverviewSalary) var overviewSalaryHeader = "<th style='text-align: center;'>&nbsp;</th>"; else var overviewSalaryHeader = "";




function parseOverviewPlayerScoresXML (resultsXML) {
   var scores = new Array();
   var players = resultsXML.getElementsByTagName("playerScore");
   for(var i=0; i<players.length; i++) {
    var pid = players[i].getAttribute("id");
    scores[pid] = parseFloat(players[i].getAttribute("score"),10);
   }
   return scores;
}

function getOverviewPlayerStatus(pid,count) {
  var imageLink = "";
  try {
   var playerStatus = "opp";
   if(habGlobalPlayersArray[pid] == undefined) playerStatus    = "fa";
   if(habGlobalPlayersArray[pid] == franchise_id) playerStatus = "own";
   if(playerStatus=="opp") var opponent = getHabTeamName(false,false,"",habGlobalPlayersArray[pid]);
   switch (playerStatus) {
    case "opp" : { imageLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&O=05&FRANCHISE=" + franchise_id + "&FRANCHISE=" + habGlobalPlayersArray[pid] + "' title='propose trade with " + opponent + "' target='" + getHabTarget() + "'><img src='http://www.habman.com/mfl/apps/js/images/right_arrow_yellow.gif' border='0' style='vertical-align: middle;' alt='propose trade with " + opponent + "' /></a>&nbsp;"; break; }
    case "fa"  : { imageLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&O=46&P=" + pid + "' title='add player' target='" + getHabTarget() + "'><img src='http://www.myfantasyleague.com/mflicons/up_arrow_green.gif' border='0' style='vertical-align: middle;' alt='add player' /></a>&nbsp;";   break; }
    case "own" : { imageLink = "<a href='" + baseURLDynamic + "/" + year + "/options?L=" + league_id + "&O=74' title='drop player' target='" + getHabTarget() + "'><img src='http://www.myfantasyleague.com/mflicons/down_arrow_red.gif' border='0' style='vertical-align: middle;' alt='drop player' /></a>&nbsp;";  break; }
   }
  } catch(er) {
   // do Nothing
  }
  if(franchise_id==undefined||franchise_id==null||franchise_id=="") imageLink = "";
  if(imageLink=="") {
   if(habGlobalPlayersArray[pid] == undefined)
    imageLink = "<img src='http://www.myfantasyleague.com/mflicons/up_arrow_green.gif' border='0' style='vertical-align: middle;' title='login to add player' alt='login to add player' />&nbsp;";
   else
    imageLink = "<img src='http://www.myfantasyleague.com/mflicons/down_arrow_red.gif' border='0' style='vertical-align: middle;' title='login to drop/trade player' alt='login to drop/trade player' />&nbsp;";
  }
  imageLink = count + ". " + imageLink;
  return imageLink;
}

function parseOverviewProjectedScores(resultsXML) {
   var players = resultsXML.getElementsByTagName("playerScore");
   for(var i=0; i<players.length; i++) {
    var pid = players[i].getAttribute("id");
    try {
     document.getElementById("projected_"+pid).innerHTML = parseFloat(players[i].getAttribute("score"),10).toFixed(3);
    } catch(er) {
     // do nothing
    }
   }
}

function getOverviewInjuryStatus(pid) {
   var status = "";
   try { 
    var temp = habGlobalInjuriesArray[pid].details;
    temp = temp.replace(/'/g,"’");
    status = " (<span class='warning' title='" + temp + "'>" + habGlobalInjuriesArray[pid].code + "</span>)";
   } catch(er) {
    // do Nothing
   }
   return status;
}

function getOverviewNewsIcon(pid) {
   var newsIcon = "";
   var newsData = "&nbsp;";
   if(habNewsBreakers[pid]==undefined) {
     newsIcon = "http://www.habman.com/mfl/apps/js/images/note_1.gif";
     newsData = "<a href='#1' title='news' onClick=\"ajaxwin=dhtmlwindow.open('playernewsbox', 'iframe', 'http://www.habman.com/mfl/apps/PlayerNews.php?leagueid=" + league_id + "&baseurl=" + baseURLDynamic + "&year=" + year + "&playerid=" + pid + "', '" + formatName(playerDatabase['pid_' + pid].name) + "', 'width=550px,height=400px,left=300px,top=100px,resize=1,scrolling=0'); return false\"><img src='" + newsIcon + "' alt='news' border='0' /></a>";
   }
   if(habNewsBreakers[pid]=='new') {
     newsIcon = "http://www.habman.com/mfl/apps/js/images/note_new.gif";
     newsData = "<a href='#1' title='news update' onClick=\"ajaxwin=dhtmlwindow.open('playernewsbox', 'iframe', 'http://www.habman.com/mfl/apps/PlayerNews.php?leagueid=" + league_id + "&baseurl=" + baseURLDynamic + "&year=" + year + "&playerid=" + pid + "', '" + formatName(playerDatabase['pid_' + pid].name) + "', 'width=550px,height=400px,left=300px,top=100px,resize=1,scrolling=0'); return false\"><img src='" + newsIcon + "' alt='news update' border='0' /></a>";
   }
   if(habNewsBreakers[pid]=='old') {
     newsIcon = "http://www.habman.com/mfl/apps/js/images/note_2.gif";
     newsData = "<a href='#1' title='recent news' onClick=\"ajaxwin=dhtmlwindow.open('playernewsbox', 'iframe', 'http://www.habman.com/mfl/apps/PlayerNews.php?leagueid=" + league_id + "&baseurl=" + baseURLDynamic + "&year=" + year + "&playerid=" + pid + "', '" + formatName(playerDatabase['pid_' + pid].name) + "', 'width=550px,height=400px,left=300px,top=100px,resize=1,scrolling=0'); return false\"><img src='" + newsIcon + "' alt='recent news' border='0' /></a>";
   }    
   return newsData;
}

function getOverviewMatchup(rating) {
   var code = "";
   if(rating>=1&&rating<=6)   code = 0;
   if(rating>=7&&rating<=12)  code = 1;
   if(rating>=13&&rating<=20) code = 2;
   if(rating>=21&&rating<=26) code = 3;
   if(rating>=27&&rating<=32) code = 4;
   return code;
}

function getOverviewSalary(teamid,pid) {
   var dataFound = false;
   var playerid = habGlobalRostersArray[teamid][pid];
   var playername = formatName(playerDatabase['pid_' + playerid].name);
   var c_title  = "<b>Contract details for " + playername + "</b><br />";
   if(habGlobalSalaryArray[teamid][pid]!=null&&habGlobalSalaryArray[teamid][pid]!="") {
    var salary   = "&nbsp;<b>Salary:</b> " + habGlobalSalaryArray[teamid][pid] + "<br />";
    dataFound = true;
   } else { var salary = ""; }
   if(habGlobalContractInfoArray[teamid][pid]!=null&&habGlobalContractInfoArray[teamid][pid]!="") {
    var c_info   = "&nbsp;<b>Info:</b> "   + habGlobalContractInfoArray[teamid][pid] + "<br />";
    dataFound = true;
   } else { var c_info = ""; }
   if(habGlobalContractStatusArray[teamid][pid]!=null&&habGlobalContractStatusArray[teamid][pid]!="") {
    var c_status = "&nbsp;<b>Status:</b> " + habGlobalContractStatusArray[teamid][pid] + "<br />";
    dataFound = true;
   } else { var c_status = ""; }
   if(habGlobalContractYearArray[teamid][pid]!=null&&habGlobalContractYearArray[teamid][pid]!="") {
    var c_year   = "&nbsp;<b>Year:</b> "   + habGlobalContractYearArray[teamid][pid] + "<br />";
    dataFound = true;
   } else { var c_year = ""; }

   if(dataFound) 
    var image = "<img src=\"http://www.habman.com/mfl/apps/js/images/con1.gif\" alt=\"\" onmouseover=\"overviewTip_fixedtooltip('" + c_title + salary + c_info + c_status + c_year + "',this,event,'325px');\" onmouseout=\"overviewTip_delayhidetip();\" />";
   else
    var image = "&nbsp;";

   return image;
}

function getOverviewKickoff(kickoffArray,pid,week) {
 try { var temp = kickoffArray[playerDatabase['pid_' + pid].team][week].kickoff; return temp; } catch(er) { return "---"; }
}

function getOverviewOpponent(oppArray,pid,week) {
 try { var temp = oppArray[playerDatabase['pid_' + pid].team][week].opp; return temp; } catch(er) { return "---"; }
}

function getOverviewStat(Stat,tdstyle) {
 if(Stat==undefined) var temp = "-"; else var temp = Stat;
 return  "  <td" + tdstyle + ">" + temp + "</td>"; 
}

function getOverviewProj(injury,opp,stat,gp,decimal) {
 if(decimal==0) var temp = parseInt(injury * opp * stat / gp); else var temp = parseFloat(injury * opp * stat / gp).toFixed(decimal);
 return temp; 
}

function getOverviewPctStart(pctArray,pid) {
 try {var temp = parseFloat(pctArray[pid].pct).toFixed(1); return temp; } catch(er) { return "<10.0"; }
}

function getOverviewInjuryDetail(injuryArray,pid) { 
 try {
  var temp = injuryArray[pid].details; 
  if(injuryArray[pid].code=="I") temp = "NFL IR";
  return temp;
 } catch(er) { return "&nbsp;"; }
}

function getOverviewStarter(starterArray,pid) {
 try {var temp = starterArray[pid]; return temp; } catch(er) { return "&nbsp;"; }
}



//======================================================================================================
//==
//==                                      OVERVIEW TAB CODE
//==
//======================================================================================================

function doOverviewMainTable(statsArray,team) {
   var br_tar    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;  border-right: 1px solid black;'";
   var br_tal    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;   border-right: 1px solid black;'";
   var br_tac    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center; border-right: 1px solid black;'";
   var tar       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;'";
   var tac       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center;'";
   var tal       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;'";
   var prl       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px;'";

   var teamCaption = " <caption style='text-align: left; padding-left: 15px;'><span>" + franchiseDatabase['fid_' + team].name + ": Week #" + overviewWeek +" Preview</span></caption>";

   var rosterArray = habGlobalRostersArray[team];

   var htmlTable1 = ""; var playerCount1 = 0; var rowCount1 = 1; var tempTable1 = ""; var tempRows1 = ""; var doTopLine1 = true;
   var htmlTable2 = ""; var playerCount2 = 0; var rowCount2 = 1; var tempTable2 = ""; var tempRows2 = ""; var doTopLine2 = true;
   var htmlTable3 = ""; var playerCount3 = 0; var rowCount3 = 1; var tempTable3 = ""; var tempRows3 = ""; var doTopLine3 = true;
   var htmlTable4 = ""; var playerCount4 = 0; var rowCount4 = 1; var tempTable4 = ""; var tempRows4 = ""; var doTopLine4 = true;

   tempTable1 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewMainTable'>" + teamCaption + "<tbody>";
   tempTable1 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th" + br_tac + ">&nbsp;</th><th" + br_tac + ">&nbsp;</th><th colspan='4'" + br_tac + ">Week #" + overviewWeek + "</th><th" + br_tac + ">Roster</th><th" + br_tac + ">% MFL</th><th" + br_tac + ">Injury</th><th" + tac + " colspan='2'>Fantasy Pts</th></tr>";
   tempTable1 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th><th" + br_tac + ">GP</th><th" + tac + ">Opp.</th><th" + tac + ">Game Time</th><th" + tac + ">Pass D</th><th" + br_tac + ">Run D</th><th" + br_tac + ">Status</th><th " + br_tac + ">Starts</th><th" + br_tac + ">Status</th><th" + tac + ">Total</th><th" + tac + ">Avg.</th></tr>";

   tempTable2 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewMainTable'><tbody>";
   tempTable2 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th colspan='4'" + br_tac + ">Week #" + overviewWeek + "</th><th" + br_tac + ">Roster</th><th" + br_tac + ">% MFL</th><th" + br_tac + ">Injury</th><th" + tac + " colspan='2'>Fantasy Pts</th></tr>";
   tempTable2 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th"+br_tac+">Bye</th><th"+br_tac+">GP</th><th" + tac + ">Opp.</th><th" + tac + ">Game Time</th><th" + tac + ">Pass O</th><th " + br_tac + ">Run O</th><th " + br_tac + ">Status</th><th " + br_tac + ">Starts</th><th" + br_tac + ">Status</th><th" + tac + ">Total</th><th" + tac + ">Avg.</th></tr>";

   tempTable3 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewMainTable'><tbody>";
   tempTable3 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th colspan='4'" + br_tac + ">Week #" + overviewWeek + "</th><th" + br_tac + ">Roster</th><th" + br_tac + ">% MFL</th><th" + br_tac + ">Injury</th><th" + tac + " colspan='2'>Fantasy Pts</th></tr>";
   tempTable3 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th"+br_tac+">Bye</th><th"+br_tac+">GP</th><th" + tac + ">Opp.</th><th" + tac + ">Game Time</th><th" + tac + ">Pass O</th><th " + br_tac + ">Run O</th><th " + br_tac + ">Status</th><th " + br_tac + ">Starts</th><th" + br_tac + ">Status</th><th" + tac + ">Total</th><th" + tac + ">Avg.</th></tr>";

   tempTable4 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewMainTable'><tbody>";
   tempTable4 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th" + br_tac + ">&nbsp;</th><th colspan='4'" + br_tac + ">Week #" + overviewWeek + "</th><th" + br_tac + ">Roster</th><th" + br_tac + ">% MFL</th><th" + br_tac + ">Injury</th><th" + tac + " colspan='2'>Fantasy Pts</th></tr>";
   tempTable4 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th><th" + br_tac + ">GP</th><th" + tac + ">Opp.</th><th" + tac + ">Game Time</th><th" + tac + ">Yds For</th><th " + br_tac + ">Allowed</th><th " + br_tac + ">Status</th><th " + br_tac + ">Starts</th><th" + br_tac + ">Status</th><th" + tac + ">Total</th><th" + tac + ">Avg.</th></tr>";

   for(var p=0; p<18; p++) {
    var doTopLine1 = true;
    var doTopLine2 = true;
    var doTopLine3 = true;
    var doTopLine4 = true;
    for(var i=0; i<rosterArray.length; i++) {
      var pid    = rosterArray[i];
      var doIt1 = false;
      var doIt2 = false;
      var doIt3 = false;
      var doIt4 = false;
      try { 
       var temp = playerDatabase['pid_' + pid].position;
      } catch(er) {
       playerDatabase['pid_' + pid] = new Player(pid, "n/a", "n/a", "n/a", 1, 0, "0");
      }
      switch(p) { 
       case 0 : { if(playerDatabase['pid_' + pid].position=="QB")   doIt1=true; break; }
       case 1 : { if(playerDatabase['pid_' + pid].position=="TMQB") doIt1=true; break; }
       case 2 : { if(playerDatabase['pid_' + pid].position=="RB")   doIt1=true; break; }
       case 3 : { if(playerDatabase['pid_' + pid].position=="WR")   doIt1=true; break; }
       case 4 : { if(playerDatabase['pid_' + pid].position=="TE")   doIt1=true; break; }
       case 5 : { if(playerDatabase['pid_' + pid].position=="TMTE") doIt1=true; break; }
       case 6 : { if(playerDatabase['pid_' + pid].position=="PK")   doIt1=true; break; }
       case 7 : { if(playerDatabase['pid_' + pid].position=="TMPK") doIt1=true; break; }
       case 8 : { if(playerDatabase['pid_' + pid].position=="Def")  doIt2=true; break; }
       case 9:  { if(playerDatabase['pid_' + pid].position=="DE")   doIt3=true; break; }
       case 10: { if(playerDatabase['pid_' + pid].position=="DT")   doIt3=true; break; }
       case 11: { if(playerDatabase['pid_' + pid].position=="TMDL") doIt3=true; break; }
       case 12: { if(playerDatabase['pid_' + pid].position=="LB")   doIt3=true; break; }
       case 13: { if(playerDatabase['pid_' + pid].position=="TMLB") doIt3=true; break; }
       case 14: { if(playerDatabase['pid_' + pid].position=="CB")   doIt3=true; break; }
       case 15: { if(playerDatabase['pid_' + pid].position=="S")    doIt3=true; break; }
       case 16: { if(playerDatabase['pid_' + pid].position=="TMDB") doIt3=true; break; }
       case 17: { if(playerDatabase['pid_' + pid].position=="ST")   doIt4=true; break; }
      }

      var salary       = getOverviewSalary(team,i);
      var opponent     = getOverviewOpponent(habOverviewNFLData,pid,overviewWeek);
      var kickoff      = getOverviewKickoff(habOverviewNFLData,pid,overviewWeek);
      var pctStart     = getOverviewPctStart(habOverviewTopStarters,pid);
      var injuryDetail = getOverviewInjuryDetail(habGlobalInjuriesArray,pid);
      var starter      = getOverviewStarter(habOverviewStatus,pid);
      if(starter==undefined) starter = "inactive";

      var injuryStatus = getOverviewInjuryStatus(pid);
      var newsIcon     = getOverviewNewsIcon(pid);
      var standardColumns = "";

      try { var GP = getOverviewStat(statsArray[pid].gp,br_tar); } catch(er) { var GP = getOverviewStat("-",br_tac); }

      //THIS IS MY STANDARD COLUMNS FOR EACH TABLE
      standardColumns += "  <td style='text-align: left; white-space: nowrap;'><a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + pid + "' target='" + getHabTarget() + "'>" + formatName(playerDatabase['pid_' + pid].name) + "</a>" + injuryStatus + "</td>"; //Name
      standardColumns += "  <td>" + newsIcon + "</td>";  //New icon
      if(displayOverviewSalary) { standardColumns += "  <td style='text-align: right;'>" + salary + "</td>"; }//Salary
      standardColumns += "  <td style='text-align: left;'>" + playerDatabase['pid_' + pid].position + "</td>"; //Pos
      standardColumns += "  <td style='text-align: left;'>" + playerDatabase['pid_' + pid].team     + "</td>"; //NFL
      standardColumns += "  <td" + br_tar + ">" + playerDatabase['pid_' + pid].bye_week + "</td>"; //Bye

    //===========================================================================================
    //======================================OFFENSIVE PLAYERS====================================
    //===========================================================================================  
      if(doIt1) {  
       if(opponent!="---") {
        var againstPass = parseInt(habDefPassRating[opponent]) + 1;
        var againstRun  = parseInt(habDefRunRating[opponent]) + 1;
        if(p==0||p==1||p==3||p==4||p==5||p==6||p==7) { var bgPassColor = " style='text-align: center; background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstPass)] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass)] + ";'";                                } else { var bgPassColor = " style='text-align: center;'"; }
        if(p==2||p==6||p==7)                         { var bgRunColor  = " style='text-align: center; background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstRun)]  + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun)]  + "; border-right: 1px solid black;'"; } else { var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'"; }
       } else {
        var againstPass = "n/a";
        var againstRun  = "n/a";
        var bgPassColor = " style='text-align: center;'";
        var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";
       }

       playerCount1++;
       if(doTopLine1) var topLine1 = " newposition"; else var topLine1 = "";
       if(rowCount1%2)
        tempRows1 += " <tr class='oddtablerow"  + topLine1 + "'" + tar + ">";
       else
        tempRows1 += " <tr class='eventablerow" + topLine1 + "'" + tar + ">";
       rowCount1++;
       
       tempRows1 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows1 += GP;
       tempRows1 += "  <td" + tac  + ">"   + opponent + "</td>   <td" + tac  + ">"   + kickoff + "</td>   <td" + bgPassColor + ">" + againstPass + "</td>   <td" + bgRunColor + ">" + againstRun + "</td>"; // Weekly Opponent
       tempRows1 += "  <td" + br_tac + ">" + starter      + "</td>"; // Starter
       tempRows1 += "  <td" + br_tar + ">" + pctStart     + "</td>"; // Percent Starters
       tempRows1 += "  <td" + br_tac + ">" + injuryDetail + "</td>"; // Injury
       
       try {
        tempRows1 += "  <td" + prl + ">" + habOverviewPlayerScores[0][pid].toFixed(overviewDecimals)    + "</td>   <td>" + parseFloat(habOverviewPlayerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; //Fantasy Pts;
       } catch(er) {
        tempRows1 += "  <td" + prl + ">n/a</td><td" + prl + ">n/a</td>";
       }        

       doTopLine1 = false;
       tempRows1 += " </tr>";
      } // END DOIT1

    //===========================================================================================
    //=========================================TEAM DEFENSE======================================
    //===========================================================================================  
      if(doIt2) { 
       if(opponent!="---") {
        var againstPass = parseInt(habOffPassRating[opponent]) + 1;
        var againstRun  = parseInt(habOffRunRating[opponent]) + 1;
        var bgPassColor = " style='text-align: center; background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstPass)] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass)] + ";'";
        var bgRunColor  = " style='text-align: center; background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstRun)]  + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun)]  + "; border-right: 1px solid black;'";
       } else {
        var againstPass = "n/a";
        var againstRun  = "n/a";
        var bgPassColor = " style='text-align: center;'";
        var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";
       }

       playerCount2++;
       if(doTopLine2) var topLine2 = " newposition"; else var topLine2 = "";
       if(rowCount2%2)
        tempRows2 += " <tr class='oddtablerow"  + topLine2 + "'" + tar + ">";
       else
        tempRows2 += " <tr class='eventablerow" + topLine2 + "'" + tar + ">";
       rowCount2++;

       tempRows2 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows2 += GP;
       tempRows2 += "  <td" + tac  + ">"   + opponent + "</td>   <td" + tac  + ">"   + kickoff + "</td>   <td" + bgPassColor + ">" + againstPass + "</td>   <td" + bgRunColor + ">" + againstRun + "</td>"; // Weekly Opponent
       tempRows2 += "  <td" + br_tac + ">" + starter      + "</td>"; // Starter
       tempRows2 += "  <td" + br_tar + ">" + pctStart     + "</td>"; // Percent Starters
       tempRows2 += "  <td" + br_tac + ">" + injuryDetail + "</td>"; // Injury

       try {
        tempRows2 += "  <td" + prl + ">" + habOverviewPlayerScores[0][pid].toFixed(overviewDecimals)    + "</td>   <td>" + parseFloat(habOverviewPlayerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; //Fantasy Pts;
       } catch(er) {
        tempRows2 += "  <td" + prl + ">n/a</td><td" + prl + ">n/a</td>";
       }  

       doTopLine2 = false;
       tempRows2 += " </tr>";
      } // END DOIT2

    //===========================================================================================
    //=============================================IDP===========================================
    //=========================================================================================== 
      if(doIt3) {
       if(opponent!="---") {
        var againstPass = parseInt(habOffPassRating[opponent]) + 1;
        var againstRun  = parseInt(habOffRunRating[opponent])  + 1;
        var bgPassColor = " style='text-align: center; background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstPass)] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass)] + ";'";                                
        var bgRunColor  = " style='text-align: center; background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstRun)]  + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun)]  + "; border-right: 1px solid black;'";
       } else {
        var againstPass = "n/a";
        var againstRun  = "n/a";
        var bgPassColor = " style='text-align: center;'";
        var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";
       }
       playerCount3++;
       if(doTopLine3) var topLine3 = " newposition"; else var topLine3 = "";
       if(rowCount3%2)
        tempRows3 += " <tr class='oddtablerow"  + topLine3 + "'" + tar + ">";
       else
        tempRows3 += " <tr class='eventablerow" + topLine3 + "'" + tar + ">";
       rowCount3++;
       
       tempRows3 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows3 += GP;
       tempRows3 += "  <td" + tac  + ">"   + opponent + "</td>   <td" + tac  + ">"   + kickoff + "</td>   <td" + bgPassColor + ">" + againstPass + "</td>   <td" + bgRunColor + ">" + againstRun + "</td>"; // Weekly Opponent
       tempRows3 += "  <td" + br_tac + ">" + starter      + "</td>"; // Starter
       tempRows3 += "  <td" + br_tar + ">" + pctStart     + "</td>"; // Percent Starters
       tempRows3 += "  <td" + br_tac + ">" + injuryDetail + "</td>"; // Injury

       try {
        tempRows3 += "  <td" + prl + ">" + habOverviewPlayerScores[0][pid].toFixed(overviewDecimals)    + "</td>   <td>" + parseFloat(habOverviewPlayerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; //Fantasy Pts;
       } catch(er) {
        tempRows3 += "  <td" + prl + ">n/a</td><td" + prl + ">n/a</td>";
       }  

       doTopLine3 = false;
       tempRows3 += " </tr>";
      } // END DOIT3

    //===========================================================================================
    //==========================================SPECIAL TEAM=====================================  
    //===========================================================================================
      if(doIt4) {
       if(opponent!="---") {
        var againstPass = parseInt(habSTReturnRating[opponent]) + 1;
        var againstRun  = parseInt(habSTAllowedRating[opponent]) + 1;
        var bgPassColor = " style='text-align: center; background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstPass)] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass)] + ";'";
        var bgRunColor  = " style='text-align: center; background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstRun)]  + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun)]  + "; border-right: 1px solid black;'";
       } else {
        var againstPass = "n/a";
        var againstRun  = "n/a";
        var bgPassColor = " style='text-align: center;'";
        var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";
       }

       playerCount4++;
       if(doTopLine4) var topLine4 = " newposition"; else var topLine4 = "";
       if(rowCount4%2)
        tempRows4 += " <tr class='oddtablerow"  + topLine4 + "'" + tar + ">";
       else
        tempRows4 += " <tr class='eventablerow" + topLine4 + "'" + tar + ">";
       rowCount4++;

       tempRows4 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows4 += GP;
       tempRows4 += "  <td" + tac  + ">"   + opponent + "</td>   <td" + tac  + ">"   + kickoff + "</td>   <td" + bgPassColor + ">" + againstPass + "</td>   <td" + bgRunColor + ">" + againstRun + "</td>"; // Weekly Opponent
       tempRows4 += "  <td" + br_tac + ">" + starter      + "</td>"; // Starter
       tempRows4 += "  <td" + br_tar + ">" + pctStart     + "</td>"; // Percent Starters
       tempRows4 += "  <td" + br_tac + ">" + injuryDetail + "</td>"; // Injury
 
       try {
        tempRows4 += "  <td" + prl + ">" + habOverviewPlayerScores[0][pid].toFixed(overviewDecimals)    + "</td>   <td>" + parseFloat(habOverviewPlayerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; //Fantasy Pts;
       } catch(er) {
        tempRows4 += "  <td" + prl + ">n/a</td><td" + prl + ">n/a</td>";
       }        

       doTopLine4 = false;
       tempRows4 += " </tr>";
      } // END DOIT4


    }  // END LOOP FOR I
   }   // END LOOP FOR P


    //===========================================================================================
    //====================================FINISH OFF THE TABLES==================================
    //=========================================================================================== 

   if(tempRows1!="") {
    htmlTable1 += tempTable1;
    htmlTable1 += tempRows1;
    htmlTable1 += "</tbody></table><br />\n";
   }

   if(tempRows2!="") {
    htmlTable2 += tempTable2;
    htmlTable2 += tempRows2;
    htmlTable2 += "</tbody></table><br />\n";
   } 

   if(tempRows3!="") {
    htmlTable3 += tempTable3;
    htmlTable3 += tempRows3;
    htmlTable3 += "</tbody></table><br />\n";
   } 

   if(tempRows4!="") {
    htmlTable4 += tempTable4;
    htmlTable4 += tempRows4;
    htmlTable4 += "</tbody></table><br />\n";
   } 

   var htmlTable5 = "";
   htmlTable5 += "<br /><table style='border: 1px solid black;'><tr><td style='background-image: none; border: 0px;'>Matchup Legend: </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[4] + "; background-color: #" + habOverviewBgColor[4] +";'> Great </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[3] + "; background-color: #" + habOverviewBgColor[3] +";'> Good </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[2] + "; background-color: #" + habOverviewBgColor[2] +";'> Avg. </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[1] + "; background-color: #" + habOverviewBgColor[1] +";'> Poor </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[0] + "; background-color: #" + habOverviewBgColor[0] +";'> Bad </td></tr></table>";

   document.getElementById("RosterOverviewMain").innerHTML = htmlTable1 + htmlTable2 + htmlTable3 + htmlTable4 + htmlTable5;
}

//======================================================================================================
//==
//==                                         STATS TAB CODE
//==
//======================================================================================================

function doOverviewStatsTable(statsArray,team) {
   var br_tar    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;  border-right: 1px solid black;'";
   var br_tal    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;   border-right: 1px solid black;'";
   var br_tac    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center; border-right: 1px solid black;'";
   var tar       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;'";
   var tac       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center;'";
   var tal       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;'";
   var prl       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px;'";

   if (overviewEnableStatsDisclaimer) var disclaimer = overviewStatsDisclaimer; else disclaimer = "";
   var teamCaption = " <caption style='text-align: left; padding-left: 15px;'><span>" + franchiseDatabase['fid_' + team].name + ": Team Statistics " + disclaimer + "</span></caption>";

   var rosterArray = habGlobalRostersArray[team];

   var htmlTable1 = ""; var playerCount1 = 0; var rowCount1 = 1; var tempTable1 = ""; var tempRows1 = ""; var doTopLine1 = true;
   var htmlTable2 = ""; var playerCount2 = 0; var rowCount2 = 1; var tempTable2 = ""; var tempRows2 = ""; var doTopLine2 = true;
   var htmlTable3 = ""; var playerCount3 = 0; var rowCount3 = 1; var tempTable3 = ""; var tempRows3 = ""; var doTopLine3 = true;
   var htmlTable4 = ""; var playerCount4 = 0; var rowCount4 = 1; var tempTable4 = ""; var tempRows4 = ""; var doTopLine4 = true;

   tempTable1 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewStatsTable'>" + teamCaption + "<tbody>";
   tempTable1 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th colspan='2'" + br_tac + ">Passing</th><th colspan='2'" + br_tac + ">&nbsp;</th><th colspan='2'" + br_tac + ">Rushing</th><th colspan='4'" + br_tac + ">Receiving</th><th" + br_tac + ">&nbsp;</th><th colspan='2'" + br_tac + ">Kicking</th><th colspan='2'" + tac + ">Fantasy Pts</th></tr>";
   tempTable1 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th><th" + br_tac + ">GP</th><th"+tac+">Yds</th><th" + br_tac + ">TD</th><th" + tac + ">Int</th><th" + br_tac + ">FL</th><th" + tac + ">Yds</th><th" + br_tac + ">TD</th><th" + tac + ">Rec</th><th" + tac + ">Trgt</th><th" + tac + ">Yds</th><th" + br_tac + ">TD</th><th" + br_tac + ">2-pt</th><th" + tac + ">FG</th><th" + br_tac + ">PAT</th><th" + tac + ">Total</th><th" + tac + ">Avg.</th></tr>";

   tempTable2 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewStatsTable'><tbody>";
   tempTable2 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th colspan='2'" + br_tac + ">Pts&nbsp;Allowed</th><th colspan='3'" + br_tac + ">Yds Allowed</th><th" + br_tac + ">Def</th><th" + br_tac + ">&nbsp;</th><th colspan='2'" + br_tac + ">Turnovers</th><th" + br_tac + ">&nbsp;</th><th colspan='2'" + tac + ">Fantasy Pts</th></tr>";
   tempTable2 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th"+br_tac+">Bye</th><th"+br_tac+">GP</th><th"+tac+">Def</th><th" + br_tac + ">Team</th><th"+tac+">Pass</th><th"+tac+">Run</th><th" + br_tac + ">Total</th><th" + br_tac + ">TD's</th><th" + br_tac + ">Safety</th><th"+tac+">Int</th><th" + br_tac + ">Fum</th><th" + br_tac + ">Sacks</th><th"+tac+">Total</th><th"+tac+">Avg.</th></tr>";

   tempTable3 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewStatsTable'><tbody>";
   tempTable3 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th colspan='2'" + br_tac + ">Tackles</th><th" + br_tac + ">&nbsp;</th><th colspan='3'" + br_tac + ">Turnovers</th><th colspan='2'" + br_tac + ">TD</th><th" + br_tac + ">&nbsp;</th><th colspan='2'" + tac + ">Fantasy Pts</th></tr>";
   tempTable3 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th"+br_tac+">Bye</th><th align='right'" + br_tac + ">GP</th><th" + tac + ">Solo</th><th" + br_tac + ">Ast</th><th" + br_tac + ">Sack</th><th" + tac + ">FF</th><th" + tac + ">FR</th><th" + br_tac + ">Int</th><th" + tac + ">Def</th><th" + br_tac + ">ST</th><th" + br_tac + ">Safety</th><th" + tac + ">Total</th><th" + tac + ">Avg.</th></tr>";

   tempTable4 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewStatsTable'><tbody>";
   tempTable4 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th"+br_tac+">&nbsp;</th><th colspan='2'" + br_tac + ">TD</th><th colspan='4'" + br_tac + ">Kick</th><th colspan='4'" + br_tac + ">Punt</th><th colspan='2'" + br_tac + ">Punt Block</th><th colspan='2'" + tac +">Fantasy Pts</th></tr>";
   tempTable4 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th"+br_tac+">Bye</th><th"+br_tac+">GP</th><th"+tac+">For</th><th" + br_tac + ">Allow</th><th"+tac+">Ret</th><th"+tac+">Yds</th><th"+tac+">Allow</th><th" + br_tac + ">Yds</th><th"+tac+">Ret</th><th"+tac+">Yds</th><th"+tac+">Allow</th><th" + br_tac + ">Yds</th><th"+tac+">For</th><th" + br_tac + ">Allow</th><th"+tac+">Total</th><th"+tac+">Avg.</th></tr>";

    for(var p=0; p<18; p++) {
     var doTopLine1 = true;
     var doTopLine2 = true;
     var doTopLine3 = true;
     var doTopLine4 = true;
     for(var i=0; i<rosterArray.length; i++) {
      var pid    = rosterArray[i];
      var doIt1 = false;
      var doIt2 = false;
      var doIt3 = false;
      var doIt4 = false;
      try { 
       var temp = playerDatabase['pid_' + pid].position;
      } catch(er) {
       playerDatabase['pid_' + pid] = new Player(pid, "n/a", "n/a", "n/a", 1, 0, "0");
      }
      switch(p) {
       case 0 : { if(playerDatabase['pid_' + pid].position=="QB")   doIt1=true; break; }
       case 1 : { if(playerDatabase['pid_' + pid].position=="TMQB") doIt1=true; break; }
       case 2 : { if(playerDatabase['pid_' + pid].position=="RB")   doIt1=true; break; }
       case 3 : { if(playerDatabase['pid_' + pid].position=="WR")   doIt1=true; break; }
       case 4 : { if(playerDatabase['pid_' + pid].position=="TE")   doIt1=true; break; }
       case 5 : { if(playerDatabase['pid_' + pid].position=="TMTE") doIt1=true; break; }
       case 6 : { if(playerDatabase['pid_' + pid].position=="PK")   doIt1=true; break; }
       case 7 : { if(playerDatabase['pid_' + pid].position=="TMPK") doIt1=true; break; }
       case 8 : { if(playerDatabase['pid_' + pid].position=="Def")  doIt2=true; break; }
       case 9:  { if(playerDatabase['pid_' + pid].position=="DE")   doIt3=true; break; }
       case 10: { if(playerDatabase['pid_' + pid].position=="DT")   doIt3=true; break; }
       case 11: { if(playerDatabase['pid_' + pid].position=="TMDL") doIt3=true; break; }
       case 12: { if(playerDatabase['pid_' + pid].position=="LB")   doIt3=true; break; }
       case 13: { if(playerDatabase['pid_' + pid].position=="TMLB") doIt3=true; break; }
       case 14: { if(playerDatabase['pid_' + pid].position=="CB")   doIt3=true; break; }
       case 15: { if(playerDatabase['pid_' + pid].position=="S")    doIt3=true; break; }
       case 16: { if(playerDatabase['pid_' + pid].position=="TMDB") doIt3=true; break; }
       case 17: { if(playerDatabase['pid_' + pid].position=="ST")   doIt4=true; break; }
      }

      var salary       = getOverviewSalary(team,i);
      var opponent     = getOverviewOpponent(habOverviewNFLData,pid,overviewWeek);
      var kickoff      = getOverviewKickoff(habOverviewNFLData,pid,overviewWeek);
      var pctStart     = getOverviewPctStart(habOverviewTopStarters,pid);
      var injuryDetail = getOverviewInjuryDetail(habGlobalInjuriesArray,pid);
      var starter      = getOverviewStarter(habOverviewStatus,pid);
      if(starter==undefined) starter = "inactive";

      var injuryStatus = getOverviewInjuryStatus(pid);
      var newsIcon     = getOverviewNewsIcon(pid);
      var standardColumns = "";

      try { var GP = getOverviewStat(statsArray[pid].gp,br_tar); } catch(er) { var GP = getOverviewStat("-",br_tar); }

      //THIS IS MY STANDARD COLUMNS FOR EACH TABLE
      standardColumns += "  <td style='text-align: left; white-space: nowrap;'><a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + pid + "' target='" + getHabTarget() + "'>" + formatName(playerDatabase['pid_' + pid].name) + "</a>" + injuryStatus + "</td>"; //Name
      standardColumns += "  <td>" + newsIcon + "</td>";  //New icon
      if(displayOverviewSalary) { standardColumns += "  <td style='text-align: right;'>" + salary + "</td>"; }//Salary
      standardColumns += "  <td style='text-align: left;'>" + playerDatabase['pid_' + pid].position + "</td>"; //Pos
      standardColumns += "  <td style='text-align: left;'>" + playerDatabase['pid_' + pid].team     + "</td>"; //NFL
      standardColumns += "  <td" + br_tar + ">" + playerDatabase['pid_' + pid].bye_week + "</td>"; //Bye


    //===========================================================================================
    //======================================OFFENSIVE PLAYERS====================================
    //=========================================================================================== 
      if(doIt1) {
       try { var GP    = getOverviewStat(statsArray[pid].gp,br_tar);      } catch(er) { var GP    = getOverviewStat("-",br_tar); }
       try { var PYDS  = getOverviewStat(statsArray[pid].p_yards,prl);    } catch(er) { var PYDS  = getOverviewStat("-",prl);    }
       try { var PTDS  = getOverviewStat(statsArray[pid].p_tds  ,br_tar); } catch(er) { var PTDS  = getOverviewStat("-",br_tar); }
       try { var PINTS = getOverviewStat(statsArray[pid].p_ints ,prl);    } catch(er) { var PINTS = getOverviewStat("-",prl);    }
       try { var FL    = getOverviewStat(statsArray[pid].fl     ,br_tar); } catch(er) { var FL    = getOverviewStat("-",br_tar); }
       try { var RYDS  = getOverviewStat(statsArray[pid].ru_yds ,prl);    } catch(er) { var RYDS  = getOverviewStat("-",prl);    }
       try { var RTDS  = getOverviewStat(statsArray[pid].ru_tds ,br_tar); } catch(er) { var RTDS  = getOverviewStat("-",br_tar); }
       try { var REC   = getOverviewStat(statsArray[pid].rec    ,prl);    } catch(er) { var REC   = getOverviewStat("-",prl);    }
       try { var TRGT  = getOverviewStat(statsArray[pid].trgt   ,prl);    } catch(er) { var TRGT  = getOverviewStat("-",prl);    }
       try { var REYDS = getOverviewStat(statsArray[pid].re_yds ,prl);    } catch(er) { var REYDS = getOverviewStat("-",prl);    }
       try { var RETDS = getOverviewStat(statsArray[pid].re_tds ,br_tar); } catch(er) { var RETDS = getOverviewStat("-",br_tar); }
       try { var TWOPT = getOverviewStat(statsArray[pid].two_pt ,br_tar); } catch(er) { var TWOPT = getOverviewStat("-",br_tar); }
       try { var FG    = getOverviewStat(statsArray[pid].fg     ,prl);    } catch(er) { var FG    = getOverviewStat("-",prl);    }
       try { var PA    = getOverviewStat(statsArray[pid].pat    ,br_tar); } catch(er) { var PA    = getOverviewStat("-",br_tar); }
     //OTHER POSSIBLE STATS
     //var PASS  = getOverviewStat(statsArray[pid].passes ,br_tar);
     //var CMP   = getOverviewStat(statsArray[pid].comp   ,br_tar);
     //var RUN   = getOverviewStat(statsArray[pid].runs   ,br_tar);
     //var TDS   = getOverviewStat(statsArray[pid].tds    ,br_tar);
     //var FGA   = getOverviewStat(statsArray[pid].fg_att ,prl);
     //var PAT   = getOverviewStat(statsArray[pid].pat_att,prl);

       playerCount1++;
       if(doTopLine1) var topLine1 = " newposition"; else var topLine1 = "";
       if(rowCount1%2)
        tempRows1 += " <tr class='oddtablerow"  + topLine1 + "'" + tar + ">";
       else
        tempRows1 += " <tr class='eventablerow" + topLine1 + "'" + tar + ">";
       rowCount1++;

       tempRows1 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows1 += GP + PYDS + PTDS + PINTS + FL + RYDS + RTDS + REC + TRGT + REYDS + RETDS + TWOPT + FG + PA;
 
       try {
        tempRows1 += "  <td" + prl + ">" + habOverviewPlayerScores[0][pid].toFixed(overviewDecimals)    + "</td>   <td>" + parseFloat(habOverviewPlayerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; //Fantasy Pts;
       } catch(er) {
        tempRows1 += "  <td" + prl + ">n/a</td><td" + prl + ">n/a</td>";
       }        

       doTopLine1 = false;
       tempRows1 += " </tr>";
      } // END DOIT1

    //===========================================================================================
    //=========================================TEAM DEFENSE======================================
    //=========================================================================================== 

      if(doIt2) {
       try { var GP     = getOverviewStat(statsArray[pid].gp     ,br_tar); } catch(er) { var GP     = getOverviewStat("-",br_tar); }
       try { var PTS_D  = getOverviewStat(statsArray[pid].pts_d  ,prl);    } catch(er) { var PTS_D  = getOverviewStat("-",prl);    }
       try { var PTS_T  = getOverviewStat(statsArray[pid].pts_tot,br_tar); } catch(er) { var PTS_T  = getOverviewStat("-",br_tar); }
       try { var PYDS   = getOverviewStat(statsArray[pid].p_yds  ,prl);    } catch(er) { var PYDS   = getOverviewStat("-",prl);    }
       try { var RYDS   = getOverviewStat(statsArray[pid].ru_yds ,prl);    } catch(er) { var RYDS   = getOverviewStat("-",prl);    }
       try { var TYDS   = getOverviewStat(statsArray[pid].yds    ,br_tar); } catch(er) { var TYDS   = getOverviewStat("-",br_tar); }
       try { var TDS    = getOverviewStat(statsArray[pid].tds    ,br_tar); } catch(er) { var TDS    = getOverviewStat("-",br_tar); }
       try { var SAFETY = getOverviewStat(statsArray[pid].safety ,br_tar); } catch(er) { var SAFETY = getOverviewStat("-",br_tar); }
       try { var IN     = getOverviewStat(statsArray[pid].int    ,prl);    } catch(er) { var IN     = getOverviewStat("-",prl);    }
       try { var FR     = getOverviewStat(statsArray[pid].fr     ,br_tar); } catch(er) { var FR     = getOverviewStat("-",br_tar); }
       try { var SACK   = getOverviewStat(statsArray[pid].sack   ,br_tar); } catch(er) { var SACK   = getOverviewStat("-",br_tar); }
     //OTHER POSSIBLE STATS
     //var FTDS   = getOverviewStat(statsArray[pid].f_tds  ,prl);
     //var INTDS  = getOverviewStat(statsArray[pid].int_tds,prl);

       playerCount2++;
       if(doTopLine2) var topLine2 = " newposition"; else var topLine2 = "";
       if(rowCount2%2)
        tempRows2 += " <tr class='oddtablerow"  + topLine2 + "'" + tar + ">";
       else
        tempRows2 += " <tr class='eventablerow" + topLine2 + "'" + tar + ">";
       rowCount2++;

       tempRows2 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows2 += GP + PTS_D + PTS_T + PYDS + RYDS + TYDS + TDS + SAFETY + IN + FR + SACK;
 
       try {
        tempRows2 += "  <td" + prl + ">" + habOverviewPlayerScores[0][pid].toFixed(overviewDecimals)    + "</td>   <td>" + parseFloat(habOverviewPlayerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; //Fantasy Pts;
       } catch(er) {
        tempRows2 += "  <td" + prl + ">n/a</td><td" + prl + ">n/a</td>";
       }

       doTopLine2 = false;
       tempRows2 += " </tr>";
      } // END DOIT2


    //===========================================================================================
    //==============================================IDP==========================================
    //=========================================================================================== 

      if(doIt3) {
       try { var GP     = getOverviewStat(statsArray[pid].gp     ,br_tar); } catch(er) { var GP     = getOverviewStat("-",br_tar); }
       try { var TKL_D  = getOverviewStat(statsArray[pid].tkl_d  ,prl);    } catch(er) { var TKL_D  = getOverviewStat("-",prl);    }
     //try { var TKL_ST = getOverviewStat(statsArray[pid].tkl_st ,br_tar); } catch(er) { var TKL_ST = getOverviewStat("-",br_tar); }
       try { var ASS_D  = getOverviewStat(statsArray[pid].ass_d  ,br_tar); } catch(er) { var ASS_D  = getOverviewStat("-",br_tar); }
     //try { var ASS_ST = getOverviewStat(statsArray[pid].ass_st ,br_tar); } catch(er) { var ASS_ST = getOverviewStat("-",br_tar); }
       try { var SACK   = getOverviewStat(statsArray[pid].sack   ,br_tar); } catch(er) { var SACK   = getOverviewStat("-",br_tar); }
       try { var FF     = getOverviewStat(statsArray[pid].ff     ,prl);    } catch(er) { var FF     = getOverviewStat("-",prl);    }
       try { var FR     = getOverviewStat(statsArray[pid].fr     ,prl);    } catch(er) { var FR     = getOverviewStat("-",prl);    }
       try { var IN     = getOverviewStat(statsArray[pid].int    ,br_tar); } catch(er) { var IN     = getOverviewStat("-",br_tar); }
       try { var TD_D   = getOverviewStat(statsArray[pid].td_d   ,prl);    } catch(er) { var TD_D   = getOverviewStat("-",prl);    }
       try { var TD_ST  = getOverviewStat(statsArray[pid].td_st  ,br_tar); } catch(er) { var TD_ST  = getOverviewStat("-",br_tar); }
       try { var TDS    = getOverviewStat(statsArray[pid].tds    ,br_tar); } catch(er) { var TDS    = getOverviewStat("-",br_tar); }
       try { var SAFETY = getOverviewStat(statsArray[pid].safety ,br_tar); } catch(er) { var SAFETY = getOverviewStat("-",br_tar); }

       playerCount3++;
       if(doTopLine3) var topLine3 = " newposition"; else var topLine3 = "";
       if(rowCount3%2)
        tempRows3 += " <tr class='oddtablerow"  + topLine3 + "'" + tar + ">";
       else
        tempRows3 += " <tr class='eventablerow" + topLine3 + "'" + tar + ">";
       rowCount3++;

       tempRows3 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows3 += GP + TKL_D + ASS_D + SACK + FF + FR + IN + TD_D + TD_ST + SAFETY;
 
       try {
        tempRows3 += "  <td" + prl + ">" + habOverviewPlayerScores[0][pid].toFixed(overviewDecimals)    + "</td>   <td>" + parseFloat(habOverviewPlayerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; //Fantasy Pts;
       } catch(er) {
        tempRows3 += "  <td" + prl + ">n/a</td><td" + prl + ">n/a</td>";
       }

       doTopLine3 = false;
       tempRows3 += " </tr>";
      } // END DOIT3

    //===========================================================================================
    //==========================================SPECIAL TEAM=====================================
    //=========================================================================================== 

      if(doIt4) {
       var salary      = getOverviewSalary(team,i);

       try { var GP     = getOverviewStat(statsArray[pid].gp     ,br_tar); } catch(er) { var GP     = getOverviewStat("-",br_tar); }
       try { var TDS_F  = getOverviewStat(statsArray[pid].tds_f  ,prl);    } catch(er) { var TDS_F  = getOverviewStat("-",prl);    }
       try { var TDS_A  = getOverviewStat(statsArray[pid].tds_a  ,br_tar); } catch(er) { var TDS_A  = getOverviewStat("-",br_tar); }
       try { var KR     = getOverviewStat(statsArray[pid].kr     ,prl);    } catch(er) { var KR     = getOverviewStat("-",prl);    }
       try { var KRYDS  = getOverviewStat(statsArray[pid].kr_yds ,prl);    } catch(er) { var KRYDS  = getOverviewStat("-",prl);    }
       try { var KRA    = getOverviewStat(statsArray[pid].kra    ,prl);    } catch(er) { var KRA    = getOverviewStat("-",prl);    }
       try { var KRAYDS = getOverviewStat(statsArray[pid].kra_yds,br_tar); } catch(er) { var KRAYDS = getOverviewStat("-",br_tar); }
       try { var PR     = getOverviewStat(statsArray[pid].pr     ,prl);    } catch(er) { var PR     = getOverviewStat("-",prl);    }
       try { var PRYDS  = getOverviewStat(statsArray[pid].pr_yds ,prl);    } catch(er) { var PRYDS  = getOverviewStat("-",prl);    }
       try { var PRA    = getOverviewStat(statsArray[pid].pra    ,prl);    } catch(er) { var PRA    = getOverviewStat("-",prl);    }
       try { var PRAYDS = getOverviewStat(statsArray[pid].pra_yds,br_tar); } catch(er) { var PRAYDS = getOverviewStat("-",br_tar); }
       try { var BLKP   = getOverviewStat(statsArray[pid].blk_p  ,prl);    } catch(er) { var BLKP   = getOverviewStat("-",prl);    }
       try { var BLKPA  = getOverviewStat(statsArray[pid].blk_pa ,br_tar); } catch(er) { var BLKPA  = getOverviewStat("-",br_tar); }

       playerCount4++;
       if(doTopLine4) var topLine4 = " newposition"; else var topLine4 = "";
       if(rowCount4%2)
        tempRows4 += " <tr class='oddtablerow"  + topLine4 + "'" + tar + ">";
       else
        tempRows4 += " <tr class='eventablerow" + topLine4 + "'" + tar + ">";
       rowCount4++;

       tempRows4 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows4 += GP + TDS_F + TDS_A + KR + KRYDS + KRA + KRAYDS + PR + PRYDS + PRA + PRAYDS + BLKP + BLKPA;
 
       try {
        tempRows4 += "  <td" + prl + ">" + habOverviewPlayerScores[0][pid].toFixed(overviewDecimals)    + "</td>   <td>" + parseFloat(habOverviewPlayerScores[0][pid]/statsArray[pid].gp).toFixed(1)    + "</td>"; //Fantasy Pts;
       } catch(er) {
        tempRows4 += "  <td" + prl + ">n/a</td><td" + prl + ">n/a</td>";
       }

       doTopLine4 = false;
       tempRows4 += " </tr>";
      } // END DOIT4

     }  // END LOOP FOR i
    }   // END LOOP FOR p

    //===========================================================================================
    //====================================FINISH OFF THE TABLES==================================
    //=========================================================================================== 

    if(tempRows1!="") {
     htmlTable1 += tempTable1;
     htmlTable1 += tempRows1;
     htmlTable1 += "</tbody></table><br />\n";
    }

    if(tempRows2!="") {
     htmlTable2 += tempTable2;
     htmlTable2 += tempRows2;
     htmlTable2 += "</tbody></table><br />\n";
    } 

    if(tempRows3!="") {
     htmlTable3 += tempTable3;
     htmlTable3 += tempRows3;
     htmlTable3 += "</tbody></table><br />\n";
    } 

    if(tempRows4!="") {
     htmlTable4 += tempTable4;
     htmlTable4 += tempRows4;
     htmlTable4 += "</tbody></table><br />\n";
    } 

   document.getElementById("RosterOverviewStats").innerHTML = htmlTable1 + htmlTable2 + htmlTable3 + htmlTable4;
}

//======================================================================================================
//==
//==                                            SCHEDULE TAB CODE
//==
//======================================================================================================

function doOverviewScheduleTable(team) {
   var br_tar    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;  border-right: 1px solid black;'";
   var br_tal    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;   border-right: 1px solid black;'";
   var br_tac    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center; border-right: 1px solid black;'";
   var tar       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;'";
   var tac       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center;'";
   var tal       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;'";
   var prl       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px;'";

   var opponent    = new Array();
   var againstPass = new Array();
   var againstRun  = new Array();
   var bgDefColor  = new Array();

   var teamCaption = " <caption style='text-align: left; padding-left: 15px;'><span>" + franchiseDatabase['fid_' + team].name + ": Player Strength of Schedule</span></caption>";
   var rosterArray = habGlobalRostersArray[team];

   var htmlTable1 = ""; var playerCount1 = 0; var rowCount1 = 1; var tempTable1 = ""; var tempRows1 = ""; var doTopLine1 = true;
   var htmlTable2 = ""; var playerCount2 = 0; var rowCount2 = 1; var tempTable2 = ""; var tempRows2 = ""; var doTopLine2 = true;
   var htmlTable3 = ""; var playerCount3 = 0; var rowCount3 = 1; var tempTable3 = ""; var tempRows3 = ""; var doTopLine3 = true;
   var htmlTable4 = ""; var playerCount4 = 0; var rowCount4 = 1; var tempTable4 = ""; var tempRows4 = ""; var doTopLine4 = true;

   var overviewScheduleStart = overviewWeek - overviewSchedulePrev;
   if(overviewScheduleStart<1) overviewScheduleStart=1;

   var overviewScheduleEnd = overviewWeek + overviewScheduleNext - 1;
   if(overviewScheduleEnd > overviewScheduleMax) overviewScheduleEnd = overviewScheduleMax;

   var columns = overviewScheduleEnd - overviewScheduleStart + 1;

   tempTable1 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewScheduleTable'>" + teamCaption + "<tbody>";
   tempTable1 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th" + br_tar + ">&nbsp;</th><th colspan='" + columns + "'" + br_tac + ">Week #</th></tr>";
   tempTable1 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th>";
   for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
    tempTable1 += "<th style='border-right: 1px solid black; text-align: center; border-top: 1px solid black;'>" + oppWeek + "</th>"; 
   }
   tempTable1 += "</tr>";

   tempTable2 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewScheduleTable'><tbody>";
   tempTable2 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th" + br_tar + ">&nbsp;</th><th colspan='" + columns + "'" + br_tac + ">Week #</th></tr>";
   tempTable2 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th>";
   for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
    tempTable2 += "<th style='border-right: 1px solid black; text-align: center; border-top: 1px solid black;'>" + oppWeek + "</th>"; 
   }
   tempTable2 += "</tr>";

   tempTable3 = tempTable2;
   tempTable4 = tempTable2;

    for(var p=0; p<18; p++) {
     var doTopLine1 = true;
     var doTopLine2 = true;
     var doTopLine3 = true;
     var doTopLine4 = true;
     for(var i=0; i<rosterArray.length; i++) {
      var pid    = rosterArray[i];
      var doIt1 = false;
      var doIt2 = false;
      var doIt3 = false;
      var doIt4 = false;
      try { 
       var temp = playerDatabase['pid_' + pid].position;
      } catch(er) {
       playerDatabase['pid_' + pid] = new Player(pid, "n/a", "n/a", "n/a", 1, 0, "0");
      }
      switch(p) {
       case 0 : { if(playerDatabase['pid_' + pid].position=="QB")   doIt1=true; break; }
       case 1 : { if(playerDatabase['pid_' + pid].position=="TMQB") doIt1=true; break; }
       case 2 : { if(playerDatabase['pid_' + pid].position=="RB")   doIt1=true; break; }
       case 3 : { if(playerDatabase['pid_' + pid].position=="WR")   doIt1=true; break; }
       case 4 : { if(playerDatabase['pid_' + pid].position=="TE")   doIt1=true; break; }
       case 5 : { if(playerDatabase['pid_' + pid].position=="TMTE") doIt1=true; break; }
       case 6 : { if(playerDatabase['pid_' + pid].position=="PK")   doIt1=true; break; }
       case 7 : { if(playerDatabase['pid_' + pid].position=="TMPK") doIt1=true; break; }
       case 8 : { if(playerDatabase['pid_' + pid].position=="Def")  doIt2=true; break; }
       case 9:  { if(playerDatabase['pid_' + pid].position=="DE")   doIt3=true; break; }
       case 10: { if(playerDatabase['pid_' + pid].position=="DT")   doIt3=true; break; }
       case 11: { if(playerDatabase['pid_' + pid].position=="TMDL") doIt3=true; break; }
       case 12: { if(playerDatabase['pid_' + pid].position=="LB")   doIt3=true; break; }
       case 13: { if(playerDatabase['pid_' + pid].position=="TMLB") doIt3=true; break; }
       case 14: { if(playerDatabase['pid_' + pid].position=="CB")   doIt3=true; break; }
       case 15: { if(playerDatabase['pid_' + pid].position=="S")    doIt3=true; break; }
       case 16: { if(playerDatabase['pid_' + pid].position=="TMDB") doIt3=true; break; }
       case 17: { if(playerDatabase['pid_' + pid].position=="ST")   doIt4=true; break; }
      }

      var salary       = getOverviewSalary(team,i);
      var kickoff      = getOverviewKickoff(habOverviewNFLData,pid,overviewWeek);
      var pctStart     = getOverviewPctStart(habOverviewTopStarters,pid);
      var injuryDetail = getOverviewInjuryDetail(habGlobalInjuriesArray,pid);
      var starter      = getOverviewStarter(habOverviewStatus,pid);
      if(starter==undefined) starter = "inactive";

      var injuryStatus = getOverviewInjuryStatus(pid);
      var newsIcon     = getOverviewNewsIcon(pid);
      var standardColumns = "";

      //THIS IS MY STANDARD COLUMNS FOR EACH TABLE
      standardColumns += "  <td style='text-align: left; white-space: nowrap;'><a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + pid + "' target='" + getHabTarget() + "'>" + formatName(playerDatabase['pid_' + pid].name) + "</a>" + injuryStatus + "</td>"; //Name
      standardColumns += "  <td>" + newsIcon + "</td>";  //New icon
      if(displayOverviewSalary) { standardColumns += "  <td style='text-align: right;'>" + salary + "</td>"; }//Salary
      standardColumns += "  <td style='text-align: left;'>" + playerDatabase['pid_' + pid].position + "</td>"; //Pos
      standardColumns += "  <td style='text-align: left;'>" + playerDatabase['pid_' + pid].team     + "</td>"; //NFL
      standardColumns += "  <td" + br_tar + ">" + playerDatabase['pid_' + pid].bye_week + "</td>"; //Bye

    //===========================================================================================
    //======================================OFFENSIVE PLAYERS====================================
    //=========================================================================================== 

      if(doIt1) {
       for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
        opponent[oppWeek] = getOverviewOpponent(habOverviewNFLData,pid,oppWeek);
        if(opponent[oppWeek]!="---") {
         againstPass[oppWeek] = parseInt(habDefPassRating[opponent[oppWeek]]) + 1;
         againstRun[oppWeek]  = parseInt(habDefRunRating[opponent[oppWeek]])  + 1;
         if(oppWeek<overviewWeek) var opacity = " opacity:0.6; filter: alpha(opacity=60);"; else var opacity = "";
         if(p==0||p==1||p==3||p==4||p==5) bgDefColor[oppWeek] = " style='text-align: center; background-image: none;" + opacity + " color: #" + habOverviewFontColor[getOverviewMatchup(againstPass[oppWeek])] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass[oppWeek])] + ";'";
         if(p==2)                         bgDefColor[oppWeek] = " style='text-align: center; background-image: none;" + opacity + " color: #" + habOverviewFontColor[getOverviewMatchup(againstRun[oppWeek])]  + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun[oppWeek])]  + ";'";
         if(p==6||p==7)                   bgDefColor[oppWeek] = " style='text-align: center; background-image: none;" + opacity + " color: #" + habOverviewFontColor[getOverviewMatchup(parseInt((againstPass[oppWeek] + againstRun[oppWeek])/2))] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(parseInt((againstPass[oppWeek] + againstRun[oppWeek])/2))]  + ";'";
        } else {
         opponent[oppWeek]    = "---";
         againstPass[oppWeek] = "n/a";
         againstRun[oppWeek]  = "n/a";
         bgDefColor[oppWeek]  = " style='text-align: center;'";
        }
       }

       playerCount1++;
       if(doTopLine1) var topLine1 = " newposition"; else var topLine1 = "";
       if(rowCount1%2)
        tempRows1 += " <tr class='oddtablerow"  + topLine1 + "'" + tar + ">";
       else
        tempRows1 += " <tr class='eventablerow" + topLine1 + "'" + tar + ">";
       rowCount1++;

       tempRows1 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
        var title = "";
        var dnp = "";
        if(oppWeek<overviewWeek) {
          title = " title='" +  opponent[oppWeek] + "'";
          try {
           tempRows1 += "  <td" + bgDefColor[oppWeek] + title + ">" + habOverviewPlayerScores[oppWeek][pid].toFixed(overviewDecimals) + "</td>"; 
          } catch(er) {
           if(opponent[oppWeek]=="---") { dnp = "---"; title = " title='bye'"; } else dnp = "dnp";
           tempRows1 += "  <td" + bgDefColor[oppWeek] + title + ">" + dnp + "</td>"; 
          }   
        } else {
         tempRows1 += "  <td" + bgDefColor[oppWeek] + title + ">" + opponent[oppWeek] + "</td>";
        }
       }
 
       doTopLine1 = false;
       tempRows1 += " </tr>";
      } // END DOIT1
      
    //===========================================================================================
    //=========================================TEAM DEFENSE======================================
    //=========================================================================================== 

      if(doIt2) {
       for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
        opponent[oppWeek] = getOverviewOpponent(habOverviewNFLData,pid,oppWeek);
        if(opponent[oppWeek]!="---") {
         againstPass[oppWeek] = parseInt(habOffPassRating[opponent[oppWeek]]) + 1;
         againstRun[oppWeek]  = parseInt(habOffRunRating[opponent[oppWeek]])  + 1;
         if(oppWeek<overviewWeek) var opacity = " opacity:0.6; filter: alpha(opacity=60);"; else var opacity = "";
         bgDefColor[oppWeek] = " style='text-align: center; background-image: none;" + opacity + " color: #" + habOverviewFontColor[getOverviewMatchup(parseInt((againstPass[oppWeek] + againstRun[oppWeek])/2))] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(parseInt((againstPass[oppWeek] + againstRun[oppWeek])/2))]  + ";'"; 
        } else {
         opponent[oppWeek]    = "---";
         againstPass[oppWeek] = "n/a";
         againstRun[oppWeek]  = "n/a";
         bgDefColor[oppWeek]  = " style='text-align: center;'";
        }
       }

       playerCount2++;
       if(doTopLine2) var topLine2 = " newposition"; else var topLine2 = "";
       if(rowCount2%2)
        tempRows2 += " <tr class='oddtablerow"  + topLine2 + "'" + tar + ">";
       else
        tempRows2 += " <tr class='eventablerow" + topLine2 + "'" + tar + ">";
       rowCount2++;

       tempRows2 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
        var title = "";
        var dnp = "";
        if(oppWeek<overviewWeek) {
          title = " title='" +  opponent[oppWeek] + "'";
          try {
           tempRows2 += "  <td" + bgDefColor[oppWeek] + title + ">" + habOverviewPlayerScores[oppWeek][pid].toFixed(overviewDecimals) + "</td>"; 
          } catch(er) {
           if(opponent[oppWeek]=="---") { dnp = "---"; title = " title='bye'"; } else dnp = "dnp";
           tempRows2 += "  <td" + bgDefColor[oppWeek] + title + ">" + dnp + "</td>"; 
          }   
        } else {
         tempRows2 += "  <td" + bgDefColor[oppWeek] + title + ">" + opponent[oppWeek] + "</td>";
        }
       }
       doTopLine2 = false;
       tempRows2 += " </tr>";
      } // END DOIT2

    //===========================================================================================
    //=============================================IDP===========================================
    //=========================================================================================== 

      if(doIt3) {
       for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
        opponent[oppWeek] = getOverviewOpponent(habOverviewNFLData,pid,oppWeek);
        if(opponent[oppWeek]!="---") {
         againstPass[oppWeek] = parseInt(habOffPassRating[opponent[oppWeek]]) + 1;
         againstRun[oppWeek]  = parseInt(habOffRunRating[opponent[oppWeek]])  + 1;
         if(oppWeek<overviewWeek) var opacity = " opacity:0.6; filter: alpha(opacity=60);"; else var opacity = "";
         bgDefColor[oppWeek] = " style='text-align: center; background-image: none;" + opacity + " color: #" + habOverviewFontColor[getOverviewMatchup(parseInt((againstPass[oppWeek] + againstRun[oppWeek])/2))] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(parseInt((againstPass[oppWeek] + againstRun[oppWeek])/2))]  + ";'";
        } else {
         opponent[oppWeek]    = "---";
         againstPass[oppWeek] = "n/a";
         againstRun[oppWeek]  = "n/a";
         bgDefColor[oppWeek]  = " style='text-align: center;'";
        }
       }

       playerCount3++;
       if(doTopLine3) var topLine3 = " newposition"; else var topLine3 = "";
       if(rowCount3%2)
        tempRows3 += " <tr class='oddtablerow"  + topLine3 + "'" + tar + ">";
       else
        tempRows3 += " <tr class='eventablerow" + topLine3 + "'" + tar + ">";
       rowCount3++;

       tempRows3 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
        var title = "";
        var dnp = "";
        if(oppWeek<overviewWeek) {
          title = " title='" +  opponent[oppWeek] + "'";
          try {
           tempRows3 += "  <td" + bgDefColor[oppWeek] + title + ">" + habOverviewPlayerScores[oppWeek][pid].toFixed(overviewDecimals) + "</td>"; 
          } catch(er) {
           if(opponent[oppWeek]=="---") { dnp = "---"; title = " title='bye'"; } else dnp = "dnp";
           tempRows3 += "  <td" + bgDefColor[oppWeek] + title + ">" + dnp + "</td>"; 
          }   
        } else {
         tempRows3 += "  <td" + bgDefColor[oppWeek] + title + ">" + opponent[oppWeek] + "</td>";
        }
       }
       doTopLine3 = false;
       tempRows3 += " </tr>";
      } // END DOIT3

    //===========================================================================================
    //=========================================SPECIAL TEAM======================================
    //=========================================================================================== 

      if(doIt4) {
       for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
        opponent[oppWeek] = getOverviewOpponent(habOverviewNFLData,pid,oppWeek);
        if(opponent[oppWeek]!="---") {
         againstPass[oppWeek] = parseInt(habSTReturnRating[opponent[oppWeek]]) + 1;
         againstRun[oppWeek]  = parseInt(habSTAllowedRating[opponent[oppWeek]])  + 1;
         if(oppWeek<overviewWeek) var opacity = " opacity:0.6; filter: alpha(opacity=60);"; else var opacity = "";
         bgDefColor[oppWeek] = " style='text-align: center; background-image: none;" + opacity + " color: #" + habOverviewFontColor[getOverviewMatchup(parseInt((againstPass[oppWeek] + againstRun[oppWeek])/2))] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(parseInt((againstPass[oppWeek] + againstRun[oppWeek])/2))]  + ";'"; 
        } else {
         opponent[oppWeek]    = "---";
         againstPass[oppWeek] = "n/a";
         againstRun[oppWeek]  = "n/a";
         bgDefColor[oppWeek]  = " style='text-align: center;'";
        }
       }

       playerCount4++;
       if(doTopLine4) var topLine4 = " newposition"; else var topLine4 = "";
       if(rowCount4%2)
        tempRows4 += " <tr class='oddtablerow"  + topLine4 + "'" + tar + ">";
       else
        tempRows4 += " <tr class='eventablerow" + topLine4 + "'" + tar + ">";
       rowCount4++;

       tempRows4 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       for (var oppWeek=overviewScheduleStart; oppWeek<=overviewScheduleEnd; oppWeek++) {
        var title = "";
        var dnp = "";
        if(oppWeek<overviewWeek) {
          title = " title='" +  opponent[oppWeek] + "'";
          try {
           tempRows4 += "  <td" + bgDefColor[oppWeek] + title + ">" + habOverviewPlayerScores[oppWeek][pid].toFixed(overviewDecimals) + "</td>"; 
          } catch(er) {
           if(opponent[oppWeek]=="---") { dnp = "---"; title = " title='bye'"; } else dnp = "dnp";
           tempRows4 += "  <td" + bgDefColor[oppWeek] + title + ">" + dnp + "</td>"; 
          }   
        } else {
         tempRows4 += "  <td" + bgDefColor[oppWeek] + title + ">" + opponent[oppWeek] + "</td>";
        }
       }
       doTopLine4 = false;
       tempRows4 += " </tr>";
      } // END DOIT4
     
     }  // END LOOP I
    }   // END LOOP P

    //===========================================================================================
    //====================================FINISH OFF THE TABLES==================================
    //=========================================================================================== 

    if(tempRows1!="") {
     htmlTable1 += tempTable1;
     htmlTable1 += tempRows1;
     htmlTable1 += "</tbody></table><br />\n";
    }

    if(tempRows2!="") {
     htmlTable2 += tempTable2;
     htmlTable2 += tempRows2;
     htmlTable2 += "</tbody></table><br />\n";
    } 

    if(tempRows3!="") {
     htmlTable3 += tempTable3;
     htmlTable3 += tempRows3;
     htmlTable3 += "</tbody></table><br />\n";
    } 

    if(tempRows4!="") {
     htmlTable4 += tempTable4;
     htmlTable4 += tempRows4;
     htmlTable4 += "</tbody></table><br />\n";
    } 

   var htmlTable5 = "";
   htmlTable5 += "<br /><table style='border: 1px solid black;'><tr><td style='background-image: none; border: 0px;'>Matchup Legend: </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[4] + "; background-color: #" + habOverviewBgColor[4] +";'> Great </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[3] + "; background-color: #" + habOverviewBgColor[3] +";'> Good </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[2] + "; background-color: #" + habOverviewBgColor[2] +";'> Avg. </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[1] + "; background-color: #" + habOverviewBgColor[1] +";'> Poor </td>";
   htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[0] + "; background-color: #" + habOverviewBgColor[0] +";'> Bad </td></tr></table>";

   document.getElementById("RosterOverviewSchedule").innerHTML = htmlTable1 + htmlTable2 + htmlTable3 + htmlTable4 + htmlTable5;
}

//======================================================================================================
//==
//==                                       PROJECTIONS TAB CODE
//==
//======================================================================================================

function doOverviewProjectionsTable(statsArray,team) {
   var br_tar    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;  border-right: 1px solid black;'";
   var br_tal    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;   border-right: 1px solid black;'";
   var br_tac    = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center; border-right: 1px solid black;'";
   var tar       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: right;'";
   var tac       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: center;'";
   var tal       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px; text-align: left;'";
   var prl       = " style='white-space: nowrap; padding-right: 5px; padding-left: 5px;'";

   var factorArray  = new Array(0.8,0.9,1.0,1.1,1.2);
   var invArray     = new Array(1.2,1.1,1.0,0.9,0.8);

   var injuryArray = new Object();
   injuryArray["P"]  = 0.90;
   injuryArray["Q"]  = 0.50;
   injuryArray["D"]  = 0.25;
   injuryArray["O"]  = 0.00;
   injuryArray["I"]  = 0.00;

   var teamCaption = " <caption style='text-align: left; padding-left: 15px;'><span>" + franchiseDatabase['fid_' + team].name + ": Team Projections</span></caption>";
   var rosterArray = habGlobalRostersArray[team];

   var htmlTable1 = ""; var playerCount1 = 0; var rowCount1 = 1; var tempTable1 = ""; var tempRows1 = ""; var doTopLine1 = true;
   var htmlTable2 = ""; var playerCount2 = 0; var rowCount2 = 1; var tempTable2 = ""; var tempRows2 = ""; var doTopLine2 = true;
   var htmlTable3 = ""; var playerCount3 = 0; var rowCount3 = 1; var tempTable3 = ""; var tempRows3 = ""; var doTopLine3 = true;
   var htmlTable4 = ""; var playerCount4 = 0; var rowCount4 = 1; var tempTable4 = ""; var tempRows4 = ""; var doTopLine4 = true;

   var projectionsArray = new Object();
   projectionsArray["PID1"] = "";  // Player Id's for offense

   projectionsArray["PY"]   = "";  // Pass Yards
   projectionsArray["RY"]   = "";  // Run Yards
   projectionsArray["CY"]   = "";  // Catch Yards
   projectionsArray["CC"]   = "";  // Catches Made
   projectionsArray["P"]    = "";  // #P  - Pass TD
   projectionsArray["R"]    = "";  // #R  - Run TD
   projectionsArray["C"]    = "";  // #C  - Catch TD
   projectionsArray["F"]    = "";  // #F  - # FG
   projectionsArray["M"]    = "";  // #M  - # MFG
   projectionsArray["TDS"]  = "";  // #TD - Total TD
   projectionsArray["FG"]   = "";  // Field Goal yards
   projectionsArray["EP"]   = "";  // Extra Points Made
   projectionsArray["FL"]   = "";  // Fumble Lost
   projectionsArray["IN"]   = "";  // Interceptions
  
   projectionsArray["PID2"] = "";  // Player Id's for team defense
   projectionsArray["OPA"]  = "";  // Offensive Points Against
   projectionsArray["TPA"]  = "";  // Total Points Against
   projectionsArray["TYP"]  = "";  // Total Yards Passing
   projectionsArray["TYR"]  = "";  // Total Yards Running
   projectionsArray["TYA"]  = "";  // Total Yards Allowed
   projectionsArray["D"]    = "";  // #D  - Defense TD
   projectionsArray["SF"]   = "";  // Safeties scored
   projectionsArray["IC"]   = "";  // Interceptions Made
   projectionsArray["FC"]   = "";  // Fumble Recoveries
   projectionsArray["SK"]   = "";  // Sacks

   projectionsArray["PID3"] = "";  // Player Id's for IDP
   projectionsArray["TKD"]  = "";  // Defense Tackles
   projectionsArray["TK"]   = "";  // Total Tackles
   projectionsArray["ASD"]  = "";  // Defense Assists
   projectionsArray["AS"]   = "";  // Total Assists
   projectionsArray["SKIDP"]= "";  // Sacks IDP
   projectionsArray["FFIDP"]= "";  // Forced Fumble IDP
   projectionsArray["FCIDP"]= "";  // Fumble Recoveries
   projectionsArray["ICIDP"]= "";  // Interceptions Made
   projectionsArray["DIDP"] = "";  // #D  - Defense TD
   projectionsArray["TIDP"] = "";  // #T  - Defense and Special Team TD
   projectionsArray["SFIDP"]= "";  // Safeties scored

   projectionsArray["PID4"] = "";  // Player Id's for Special Team
   projectionsArray["UT"]   = "";  // #UT - Punt Return TD
   projectionsArray["KT"]   = "";  // #KT - Kick Return TD
   projectionsArray["STTA"] = "";  // TD allowed by Special Team
   projectionsArray["K"]    = "";  // #K - Number of Kick Returns
   projectionsArray["KY"]   = "";  // Kick Return Yards
   projectionsArray["U"]    = "";  // #U - Number of Punt Returns
   projectionsArray["UY"]   = "";  // Punt Return Yards
   projectionsArray["BLP"]  = "";  // Blocked Punts

   tempTable1 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewProjectionsTable'>" + teamCaption + "<tbody>"; 
   tempTable1 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th" + br_tac + ">&nbsp;</th><th colspan='3'" + br_tac + ">Week #" + overviewWeek + "</th><th colspan='2'" + br_tac + ">Passing</th><th colspan='2'" + br_tac + ">&nbsp;</th><th colspan='2'" + br_tac + ">Rushing</th><th colspan='3'" + br_tac + ">Receiving</th><th colspan='2'" + br_tac + ">Kicking</th><th" + tac + ">Fantasy</th></tr>";
   tempTable1 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th><th"+tac+">Opp.</th><th"+tac+">Pass</th><th" + br_tac + ">Run</th><th"+tac+">Yds</th><th" + br_tac + ">TD</th><th"+tac+">Int</th><th" + br_tac + ">FL</th><th"+tac+">Yds</th><th" + br_tac + ">TD</th><th"+tac+">Rec</th><th"+tac+">Yds</th><th" + br_tac + ">TD</th><th"+tac+">FG</th><th" + br_tac + ">PAT</th><th" + tac + ">Pts</th></tr>";

   tempTable2 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewProjectionsTable'><tbody>";
   tempTable2 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th" + br_tac + ">&nbsp;</th><th colspan='3'" + br_tac + ">Week #" + overviewWeek + "</th><th colspan='2'" + br_tac + ">Pts&nbsp;Allowed</th><th colspan='3'" + br_tac + ">Yds Allowed</th><th" + br_tac + ">Def</th><th" + br_tac + ">&nbsp;</th><th colspan='2'" + br_tac + ">Turnovers</th><th" + br_tac + ">&nbsp;</th><th" + tac + ">Fantasy</th></tr>";
   tempTable2 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th><th"+tac+">Opp.</th><th"+tac+">Pass</th><th " + br_tac + ">Run</th><th"+tac+">Def</th><th" + br_tac + ">Team</th><th"+tac+">Pass</th><th"+tac+">Run</th><th" + br_tac + ">Total</th><th" + br_tac + ">TD's</th><th" + br_tac + ">Safety</th><th"+tac+">Fum</th><th" + br_tac + ">Int</th><th" + br_tac + ">Sacks</th><th" + tac + ">Pts</th></tr>";

   tempTable3 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewProjectionsTable'><tbody>";
   tempTable3 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th" + br_tac + ">&nbsp;</th><th colspan='3'" + br_tac + ">Week #" + overviewWeek + "</th><th colspan='2'" + br_tac + ">Tackles</th><th" + br_tac + ">&nbsp;</th><th colspan='3'" + br_tac + ">Turnovers</th><th colspan='2'" + br_tac + ">TD</th><th" + br_tac + ">&nbsp;</th><th" + tac +">Fantasy</th></tr>";
   tempTable3 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th><th"+tac+">Opp.</th><th"+tac+">Pass</th><th " + br_tac + ">Run</th><th"+tac+">Solo</th><th" + br_tac + ">Ast</th><th" + br_tac + ">Sack</th><th" + tac + ">FF</th><th" + tac + ">FR</th><th" + br_tac + ">Int</th><th" + tac + ">Def</th><th" + br_tac + ">ST</th><th" + br_tac + ">Safety</th><th"+ tac +">Pts</th></tr>";

   tempTable4 += "<table border='0' cellspacing='0' class='habOverviewTable' id='habOverviewProjectionsTable'><tbody>";
   tempTable4 += " <tr><th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">&nbsp;</th><th"+tac+">&nbsp;</th><th" + br_tac + ">&nbsp;</th><th colspan='3'" + br_tac + ">Week #" + overviewWeek + "</th><th colspan='2'" + br_tac + ">TD</th><th colspan='2'" + br_tac + ">Kick</th><th colspan='2'" + br_tac + ">Punt</th><th" + br_tac + ">Punt</th><th" + tac + ">Fantasy</th></tr>";
   tempTable4 += " <tr><th"+tal+">Player</th><th"+tac+">&nbsp;</th>" + overviewSalaryHeader + "<th"+tac+">Pos</th><th"+tac+">NFL</th><th" + br_tac + ">Bye</th><th"+tac+">Opp.</th><th"+tac+">Yds For</th><th" + br_tac + ">Allow</th><th"+tac+">For</th><th" + br_tac + ">Allow</th><th"+tac+">Ret</th><th" + br_tac + ">Yds</th><th"+tac+">Ret</th><th" + br_tac + ">Yds</th><th" + br_tac + ">Block</th><th" + tac + ">Pts</th></tr>";

    for(var p=0; p<18; p++) {
     var doTopLine1 = true;
     var doTopLine2 = true;
     var doTopLine3 = true;
     var doTopLine4 = true;
     for(var i=0; i<rosterArray.length; i++) {
      var pid    = rosterArray[i];
      var doIt1 = false;
      var doIt2 = false;
      var doIt3 = false;
      var doIt4 = false;
      try { 
       var temp = playerDatabase['pid_' + pid].position;
      } catch(er) {
       playerDatabase['pid_' + pid] = new Player(pid, "n/a", "n/a", "n/a", 1, 0, "0");
      }
      switch(p) {
       case 0 : { if(playerDatabase['pid_' + pid].position=="QB")   doIt1=true; break; }
       case 1 : { if(playerDatabase['pid_' + pid].position=="TMQB") doIt1=true; break; }
       case 2 : { if(playerDatabase['pid_' + pid].position=="RB")   doIt1=true; break; }
       case 3 : { if(playerDatabase['pid_' + pid].position=="WR")   doIt1=true; break; }
       case 4 : { if(playerDatabase['pid_' + pid].position=="TE")   doIt1=true; break; }
       case 5 : { if(playerDatabase['pid_' + pid].position=="TMTE") doIt1=true; break; }
       case 6 : { if(playerDatabase['pid_' + pid].position=="PK")   doIt1=true; break; }
       case 7 : { if(playerDatabase['pid_' + pid].position=="TMPK") doIt1=true; break; }
       case 8 : { if(playerDatabase['pid_' + pid].position=="Def")  doIt2=true; break; }
       case 9:  { if(playerDatabase['pid_' + pid].position=="DE")   doIt3=true; break; }
       case 10: { if(playerDatabase['pid_' + pid].position=="DT")   doIt3=true; break; }
       case 11: { if(playerDatabase['pid_' + pid].position=="TMDL") doIt3=true; break; }
       case 12: { if(playerDatabase['pid_' + pid].position=="LB")   doIt3=true; break; }
       case 13: { if(playerDatabase['pid_' + pid].position=="TMLB") doIt3=true; break; }
       case 14: { if(playerDatabase['pid_' + pid].position=="CB")   doIt3=true; break; }
       case 15: { if(playerDatabase['pid_' + pid].position=="S")    doIt3=true; break; }
       case 16: { if(playerDatabase['pid_' + pid].position=="TMDB") doIt3=true; break; }
       case 17: { if(playerDatabase['pid_' + pid].position=="ST")   doIt4=true; break; }
      }

      var salary       = getOverviewSalary(team,i);
      var opponent     = getOverviewOpponent(habOverviewNFLData,pid,overviewWeek);
      var kickoff      = getOverviewKickoff(habOverviewNFLData,pid,overviewWeek);
      var pctStart     = getOverviewPctStart(habOverviewTopStarters,pid);
      var injuryDetail = getOverviewInjuryDetail(habGlobalInjuriesArray,pid);
      var starter      = getOverviewStarter(habOverviewStatus,pid);
      if(starter==undefined) starter = "inactive";

      var injuryStatus = getOverviewInjuryStatus(pid);
      var newsIcon     = getOverviewNewsIcon(pid);
      var standardColumns = "";

      try { var GP = getOverviewStat(statsArray[pid].gp,br_tar); } catch(er) { var GP = getOverviewStat("-",br_tar); }

      //THIS IS MY STANDARD COLUMNS FOR EACH TABLE
      standardColumns += "  <td style='text-align: left; white-space: nowrap;'><a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + pid + "' target='" + getHabTarget() + "'>" + formatName(playerDatabase['pid_' + pid].name) + "</a>" + injuryStatus + "</td>"; //Name
      standardColumns += "  <td>" + newsIcon + "</td>";  //New icon
      if(displayOverviewSalary) { standardColumns += "  <td style='text-align: right;'>" + salary + "</td>"; }//Salary
      standardColumns += "  <td style='text-align: left;'>" + playerDatabase['pid_' + pid].position + "</td>"; //Pos
      standardColumns += "  <td style='text-align: left;'>" + playerDatabase['pid_' + pid].team     + "</td>"; //NFL
      standardColumns += "  <td" + br_tar + ">" + playerDatabase['pid_' + pid].bye_week + "</td>"; //Bye

    //===========================================================================================
    //======================================OFFENSIVE PLAYERS====================================
    //=========================================================================================== 

      if(doIt1) {
       var opponent    = "---";
       var againstPass = "n/a";
       var againstRun  = "n/a";
       var bgPassColor = " style='text-align: center;'";
       var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";

       var runFactor     = 0;
       var passFactor    = 0;
       var avgFactor     = 0;
       var invRunFactor  = 0;
       var invPassFactor = 0;
       var invAvgFactor  = 0;

       try {
        opponent    = habOverviewNFLData[playerDatabase['pid_' + pid].team][overviewWeek].opp;
        againstPass = parseInt(habDefPassRating[opponent]) + 1;
        againstRun  = parseInt(habDefRunRating[opponent]) + 1;
        if(p==0||p==1||p==3||p==4||p==5||p==6||p==7) bgPassColor = " style='background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstPass)] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass)] + ";'"; 
        if(p==2||p==6||p==7)                         bgRunColor  = " style='background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstRun)]  + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun)]  + "; border-right: 1px solid black;'"; 

        passFactor    = factorArray[getOverviewMatchup(againstPass)];
        runFactor     = factorArray[getOverviewMatchup(againstRun)]; 
        invPassFactor = invArray[getOverviewMatchup(againstPass)]; 
        invRunFactor  = invArray[getOverviewMatchup(againstRun)];
        avgFactor     = (passFactor + runFactor)/2;
        invAvgFactor  = (invPassFactor + invRunFactor)/2;
       } catch(er) {
        opponent    = "---";
        againstPass = "n/a";
        againstRun  = "n/a";
        bgPassColor = " style='text-align: center;'";
        bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";

        runFactor      = 0;
        passFactor     = 0;
        avgFactor      = 0;
        invRunFactor   = 0;
        invPassFactor  = 0;
        invAvgFactor   = 0;
       }

       try {
        var injuryCode = habGlobalInjuriesArray[pid].code;
        var injuryFactor = injuryArray[injuryCode];
       } catch(er) {
        var injuryFactor = 1;
       }

       try { // PASSING YARDS
        var temp = getOverviewProj(injuryFactor,passFactor,statsArray[pid].p_yards,statsArray[pid].gp,0);
        projectionsArray["PID1"] += pid+","; var tempPID = pid;
        projectionsArray["PY"]  += temp+","; var tempPY = temp;
        var PYDS = getOverviewStat(temp,prl);
       } catch(er) { var PYDS = getOverviewStat("-",prl); }

       try { //PASSING TDS
        var temp = getOverviewProj(injuryFactor,passFactor,statsArray[pid].p_tds,statsArray[pid].gp,1);
        projectionsArray["P"] += temp+",";  var tempP = temp;
        var totalTD = 0; // Set the Total TD Count
        totalTD += parseFloat(temp);
        var PTDS = getOverviewStat(temp,br_tar);
       } catch(er) { var PTDS = getOverviewStat("-",br_tar); }

       try { //INTERCEPTIONS
        var temp = getOverviewProj(injuryFactor,passFactor,statsArray[pid].p_ints,statsArray[pid].gp,1);
        projectionsArray["IN"] += temp+",";  var tempIN = temp;
        var PINTS = getOverviewStat(temp,prl);
       } catch(er) { var PINTS = getOverviewStat("-",prl); }

       try { //FUMBLES LOST
        var temp = getOverviewProj(injuryFactor,passFactor,statsArray[pid].fl,statsArray[pid].gp,1);
        projectionsArray["FL"] += temp+",";  var tempFL = temp;
        var FL = getOverviewStat(temp,br_tar);
       } catch(er) { var FL = getOverviewStat("-",br_tar); }

       try { //RUSHING YARDS
        var temp = getOverviewProj(injuryFactor,runFactor,statsArray[pid].ru_yds,statsArray[pid].gp,0);
        projectionsArray["RY"] += temp+",";  var tempRY = temp;
        var RYDS = getOverviewStat(temp,prl);
       } catch(er) { var RYDS = getOverviewStat("-",prl); }

       try { //RUSHING TDS
        var temp = getOverviewProj(injuryFactor,runFactor,statsArray[pid].ru_tds,statsArray[pid].gp,1);
        projectionsArray["R"] += temp+",";  var tempR = temp;
        totalTD += parseFloat(temp);
        var RTDS = getOverviewStat(temp,br_tar);
       } catch(er) { var RTDS = getOverviewStat("-",br_tar); }

       try { //RECEPTIONS
        var temp = getOverviewProj(injuryFactor,passFactor,statsArray[pid].rec,statsArray[pid].gp,0);
        projectionsArray["CC"] += temp+",";  var tempCC = temp;
        var REC = getOverviewStat(temp,prl);
       } catch(er) { var REC = getOverviewStat("-",prl); }

       try { //RECEIVING YARDS
        var temp = getOverviewProj(injuryFactor,passFactor,statsArray[pid].re_yds,statsArray[pid].gp,0);
        projectionsArray["CY"] += temp+",";  var tempCY = temp;
        var REYDS = getOverviewStat(temp,prl);
       } catch(er) { var REYDS = getOverviewStat("-",prl); }

       try { //RECEIVING TDS
        var temp = getOverviewProj(injuryFactor,passFactor,statsArray[pid].re_tds,statsArray[pid].gp,1);
        projectionsArray["C"] += temp+",";  var tempC = temp;
        totalTD += parseFloat(temp);
        var RETDS = getOverviewStat(temp,br_tar);
       } catch(er) { var RETDS = getOverviewStat("-",br_tar); }

       try { //TOTAL TDS not used in table but need value for some leagues
        var temp = totalTD;
        projectionsArray["TDS"] += temp+",";  var tempTDS = temp;
        var TDS = getOverviewStat(temp,br_tar);
       } catch(er) { var TDS = getOverviewStat("-",br_tar); }

       try { //FIELD GOALS MADE
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].fg,statsArray[pid].gp,1);
        var tempRound = parseInt(parseFloat(temp) + 0.5); //THIS IS USED BECAUSE projectedScores ONLY CALCULATES INTEGER VALUES
        projectionsArray["F"] += temp+",";  var tempF = temp;
        var FG = getOverviewStat(temp,prl);
       } catch(er) { var FG = getOverviewStat("-",prl); }

       try { //POINT AFTER MADE
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].pat,statsArray[pid].gp,1);
        projectionsArray["EP"] += temp+",";  var tempEP = temp;
        var PA = getOverviewStat(temp,br_tar);
       } catch(er) { var PA = getOverviewStat("-",br_tar); }  

       playerCount1++;
       if(doTopLine1) var topLine1 = " newposition"; else var topLine1 = "";
       if(rowCount1%2)
        tempRows1 += " <tr class='oddtablerow"  + topLine1 + "'" + tar + ">";
       else
        tempRows1 += " <tr class='eventablerow" + topLine1 + "'" + tar + ">";
       rowCount1++;

       tempRows1 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows1 += "  <td" + tac  + ">"   + opponent + "</td>   <td" + bgPassColor + ">" + againstPass + "</td>   <td" + bgRunColor + ">" + againstRun + "</td>"; // Weekly Opponent
       tempRows1 += PYDS + PTDS + PINTS + FL + RYDS + RTDS + REC + REYDS + RETDS + FG + PA;
       tempRows1 += "  <td" + prl + "><div id='projected_" + pid + "'>-</div></td>";

       doTopLine1 = false;
       tempRows1 += " </tr>";
      
       //if(pid == '7150') alert("PLAYERS="+tempPID+"&PY="+tempPY+"&%23P="+tempP+"&IN="+tempIN+"&FL="+tempFL+"&RY="+tempRY+"&%23R="+tempR+"&CC="+tempCC+"&CY="+tempCY+"&%23C="+tempC+"&EP="+tempEP+"&%23TD="+totalTD+"&%23F="+tempF);
      } // END DOIT1

    //===========================================================================================
    //=========================================TEAM DEFENSE======================================
    //=========================================================================================== 

      if(doIt2) {
       var opponent    = "---";
       var againstPass = "n/a";
       var againstRun  = "n/a";
       var bgPassColor = " style='text-align: center;'";
       var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";

       var runFactor     = 0;
       var passFactor    = 0;
       var avgFactor     = 0;
       var invRunFactor  = 0;
       var invPassFactor = 0;
       var invAvgFactor  = 0;

       try {
        opponent    = habOverviewNFLData[playerDatabase['pid_' + pid].team][overviewWeek].opp;
        againstPass = parseInt(habOffPassRating[opponent]) + 1;
        againstRun  = parseInt(habOffRunRating[opponent]) + 1;
        bgPassColor = " style='background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstPass)] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass)] + ";'"; 
        bgRunColor  = " style='background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstRun)]  + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun)]  + "; border-right: 1px solid black;'"; 

        passFactor    = factorArray[getOverviewMatchup(againstPass)];
        runFactor     = factorArray[getOverviewMatchup(againstRun)]; 
        invPassFactor = invArray[getOverviewMatchup(againstPass)]; 
        invRunFactor  = invArray[getOverviewMatchup(againstRun)];
        avgFactor     = (passFactor + runFactor)/2;
        invAvgFactor  = (invPassFactor + invRunFactor)/2;
       } catch(er) {
        opponent    = "---";
        againstPass = "n/a";
        againstRun  = "n/a";
        bgPassColor = " style='text-align: center;'";
        bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";

        runFactor      = 0;
        passFactor     = 0;
        avgFactor      = 0;
        invRunFactor   = 0;
        invPassFactor  = 0;
        invAvgFactor   = 0;
       }

       try {
        var injuryCode = habGlobalInjuriesArray[pid].code;
        var injuryFactor = injuryArray[injuryCode];
       } catch(er) {
        var injuryFactor = 1;
       }

       try { //PTS ALLOWED BY D IE OFFENSIVE POINTS ALLOWED
        var temp = getOverviewProj(injuryFactor,invAvgFactor,statsArray[pid].pts_d,statsArray[pid].gp,0);
        projectionsArray["PID2"] += pid+","; var tempPID = pid;
        projectionsArray["OPA"] += temp+","; var tempOPA = temp;
        var PTS_D = getOverviewStat(temp,prl);
       } catch(er) { var PTS_D = getOverviewStat("-",prl); }

       try { //PTS ALLOWED BY TEAM IE TOTAL POINTS ALLOWED
        var temp = getOverviewProj(injuryFactor,invAvgFactor,statsArray[pid].pts_tot,statsArray[pid].gp,0);
        projectionsArray["TPA"] += temp+",";  var tempTPA = temp;
        var PTS_T = getOverviewStat(temp,br_tar);
       } catch(er) { var PTS_T = getOverviewStat("-",br_tar); }

       try { //PASSING YARDS ALLOWED
        var temp = getOverviewProj(injuryFactor,invPassFactor,statsArray[pid].p_yds,statsArray[pid].gp,0);
        projectionsArray["TYP"] += temp+",";  var tempTYP = temp;
        var PYDA = getOverviewStat(temp,prl);
       } catch(er) { var PYDA = getOverviewStat("-",prl); }

       try { //RUN YARDS ALLOWED
        var temp = getOverviewProj(injuryFactor,invRunFactor,statsArray[pid].ru_yds,statsArray[pid].gp,0);
        projectionsArray["TYR"] += temp+",";  var tempTYR = temp;
        var RYDA = getOverviewStat(temp,prl);
       } catch(er) { var RYDA = getOverviewStat("-",prl); }

       try { //TOTAL YARDS ALLOWED
        var temp = getOverviewProj(injuryFactor,invAvgFactor,statsArray[pid].yds,statsArray[pid].gp,0);
        projectionsArray["TYA"] += temp+",";  var tempTYA = temp;
        var TYDA = getOverviewStat(temp,br_tar);
       } catch(er) { var TYDA = getOverviewStat("-",br_tar); }

       try { //DEFENSIVE TDS
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].tds,statsArray[pid].gp,1);
        projectionsArray["D"] += temp+",";  var tempD = temp;
        var TDS = getOverviewStat(temp,br_tar);
       } catch(er) { var TDS = getOverviewStat("-",br_tar); }

       try { //SAFETY
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].safety,statsArray[pid].gp,1);
        projectionsArray["SF"] += temp+",";  var tempSF = temp;
        var SAFETY = getOverviewStat(temp,br_tar);
       } catch(er) { var SAFETY = getOverviewStat("-",br_tar); }

       try { //INTERCEPTIONS BY D
        var temp = getOverviewProj(injuryFactor,passFactor,statsArray[pid].int,statsArray[pid].gp,1);
        projectionsArray["IC"] += temp+",";  var tempIC = temp;
        var INT_D = getOverviewStat(temp,prl);
       } catch(er) { var INT_D = getOverviewStat("-",prl); }

       try { //FUMBLE RECOVERY BY D
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].fr,statsArray[pid].gp,1);
        projectionsArray["FC"] += temp+",";  var tempFC = temp;
        var FR_D = getOverviewStat(temp,br_tar);
       } catch(er) { var FR_D = getOverviewStat("-",br_tar); }

       try { //SACKS
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].sack,statsArray[pid].gp,1);
        projectionsArray["SK"] += temp+",";  var tempSK = temp;
        var SACK = getOverviewStat(temp,br_tar);
       } catch(er) { var SACK = getOverviewStat("-",br_tar); }

       playerCount2++;
       if(doTopLine2) var topLine2 = " newposition"; else var topLine2 = "";
       if(rowCount2%2)
        tempRows2 += " <tr class='oddtablerow"  + topLine2 + "'" + tar + ">";
       else
        tempRows2 += " <tr class='eventablerow" + topLine2 + "'" + tar + ">";
       rowCount2++;
       
       tempRows2 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows2 += "  <td" + tac  + ">"   + opponent + "</td>   <td" + bgPassColor + ">" + againstPass + "</td>   <td" + bgRunColor + ">" + againstRun + "</td>"; // Weekly Opponent
       tempRows2 += PTS_D + PTS_T + PYDA + RYDA + TYDA + TDS + SAFETY + INT_D + FR_D + SACK;
       tempRows2 += "  <td" + prl + "><div id='projected_" + pid + "'>-</div></td>";

       doTopLine2 = false;
       tempRows2 += " </tr>";
      
       //if(pid == '7150') alert("PLAYERS="+tempPID+"&PY="+tempPY+"&%23P="+tempP+"&IN="+tempIN+"&FL="+tempFL+"&RY="+tempRY+"&%23R="+tempR+"&CC="+tempCC+"&CY="+tempCY+"&%23C="+tempC+"&EP="+tempEP+"&%23TD="+totalTD+"&%23F="+tempF);
      } // END DOIT2


    //===========================================================================================
    //=============================================IDP===========================================
    //=========================================================================================== 

      if(doIt3) {
       var opponent    = "---";
       var againstPass = "n/a";
       var againstRun  = "n/a";
       var bgPassColor = " style='text-align: center;'";
       var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";

       var runFactor     = 0;
       var passFactor    = 0;
       var avgFactor     = 0;
       var invRunFactor  = 0;
       var invPassFactor = 0;
       var invAvgFactor  = 0;

       try {
        opponent    = habOverviewNFLData[playerDatabase['pid_' + pid].team][overviewWeek].opp;
        againstPass = parseInt(habOffPassRating[opponent]) + 1;
        againstRun  = parseInt(habOffRunRating[opponent]) + 1;
        bgPassColor = " style='background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstPass)] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass)] + ";'"; 
        bgRunColor  = " style='background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstRun)]  + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun)]  + "; border-right: 1px solid black;'"; 

        passFactor    = factorArray[getOverviewMatchup(againstPass)];
        runFactor     = factorArray[getOverviewMatchup(againstRun)]; 
        invPassFactor = invArray[getOverviewMatchup(againstPass)]; 
        invRunFactor  = invArray[getOverviewMatchup(againstRun)];
        avgFactor     = (passFactor + runFactor)/2;
        invAvgFactor  = (invPassFactor + invRunFactor)/2;
       } catch(er) {
        opponent    = "---";
        againstPass = "n/a";
        againstRun  = "n/a";
        bgPassColor = " style='text-align: center;'";
        bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";

        runFactor      = 0;
        passFactor     = 0;
        avgFactor      = 0;
        invRunFactor   = 0;
        invPassFactor  = 0;
        invAvgFactor   = 0;
       }

       try {
        var injuryCode = habGlobalInjuriesArray[pid].code;
        var injuryFactor = injuryArray[injuryCode];
       } catch(er) {
        var injuryFactor = 1;
       }

       try { //TACKLES MADE ON D ie TKD
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].tkl_d,statsArray[pid].gp,1);
        var totalTackle = temp;
        projectionsArray["PID3"] += pid+",";         var tempPID = pid;
        projectionsArray["TKD"]  += totalTackle+","; var tempTKD = totalTackle;
        var TKD = getOverviewStat(temp,prl);
       } catch(er) { var TKD = getOverviewStat("-",prl); }

       try { //TOTAL TACKLES MADE ie TK
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].tkl_st,statsArray[pid].gp,1);
        totalTackle += temp;
        projectionsArray["TK"] += totalTackle+",";  var tempTK = totalTackle;
        var TKST = getOverviewStat(temp,br_tar);
       } catch(er) { var TKST = getOverviewStat("-",br_tar); }

       try { //ASSISTS MADE ON D ie ASD
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].ass_d,statsArray[pid].gp,1);
        var totalAssist = temp;
        projectionsArray["ASD"] += totalAssist+",";  var tempASD = totalAssist;
        var ASD = getOverviewStat(temp,br_tar);
       } catch(er) { var ASD = getOverviewStat("-",br_tar); }

       try { //TOTAL ASSISTS ie AS
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].ass_st,statsArray[pid].gp,1);
        totalAssist += temp;
        projectionsArray["AS"] += totalAssist+",";  var tempAS = temp;
        var ASST = getOverviewStat(temp,br_tar);
       } catch(er) { var ASST = getOverviewStat("-",br_tar); }

       try { //SACKS ie SK but mine is SKIDP
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].sack,statsArray[pid].gp,1);
        projectionsArray["SKIDP"] += temp+",";  var tempSK = temp;
        var SK = getOverviewStat(temp,br_tar);
       } catch(er) { var SK = getOverviewStat("-",br_tar); }

       try { //FORCED FUMBLE ie FF but mine is FFIDP
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].ff,statsArray[pid].gp,1);
        projectionsArray["FFIDP"] += temp+",";  var tempFF = temp;
        var FF = getOverviewStat(temp,prl);
       } catch(er) { var FF = getOverviewStat("-",prl); }

       try { //FUMBLE RECOVERY ie FC but mine is FCIDP
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].fr,statsArray[pid].gp,1);
        projectionsArray["FCIDP"] += temp+",";  var tempFC = temp;
        var FC = getOverviewStat(temp,prl);
       } catch(er) { var FC = getOverviewStat("-",prl); }

       try { //INTERCEPTIONS ie IC but mine is ICIDP
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].int,statsArray[pid].gp,1);
        projectionsArray["ICIDP"] += temp+",";  var tempIC = temp;
        var IC = getOverviewStat(temp,br_tar);
       } catch(er) { var IC = getOverviewStat("-",br_tar); }

       try { //DEFENSE TOUCHDOWNS ie #D but mine is DIDP
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].td_d,statsArray[pid].gp,1);
        var totalTD = temp;
        projectionsArray["DIDP"] += totalTD+",";  var tempD = totalTD;
        var TDD = getOverviewStat(temp,prl);
       } catch(er) { var TDD = getOverviewStat("-",prl); }

       try { //DEFENSE AND SPECIAL TEAM TOUCHDOWNS ie #T but mine is TIDP
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].td_st,statsArray[pid].gp,1);
        totalTD += temp;
        projectionsArray["TIDP"] += totalTD+",";  var tempT = totalTD;
        var TDST = getOverviewStat(temp,br_tar);
       } catch(er) { var TDST = getOverviewStat("-",br_tar); }

       try { //SAFETY ie SF but mine is SFIDP
        var temp = getOverviewProj(injuryFactor,avgFactor,statsArray[pid].safety,statsArray[pid].gp,1);
        projectionsArray["SFIDP"] += temp+",";  var tempSF = temp;
        var SF = getOverviewStat(temp,br_tar);
       } catch(er) { var SF = getOverviewStat("-",br_tar); }

       playerCount3++;
       if(doTopLine3) var topLine3 = " newposition"; else var topLine3 = "";
       if(rowCount3%2)
        tempRows3 += " <tr class='oddtablerow"  + topLine3 + "'" + tar + ">";
       else
        tempRows3 += " <tr class='eventablerow" + topLine3 + "'" + tar + ">";
       rowCount3++;

       tempRows3 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows3 += "  <td" + tac  + ">"   + opponent + "</td>   <td" + bgPassColor + ">" + againstPass + "</td>   <td" + bgRunColor + ">" + againstRun + "</td>"; // Weekly Opponent
       tempRows3 += TKD + ASD + SK + FF + FC + IC + TDD + TDST + SF;
       tempRows3 += "  <td" + prl + "><div id='projected_" + pid + "'>-</div></td>";

       doTopLine3 = false;
       tempRows3 += " </tr>";
      } // END DOIT3
 
    //===========================================================================================
    //=========================================SPECIAL TEAM======================================
    //=========================================================================================== 

      if(doIt4) {
       var opponent    = "---";
       var againstPass = "n/a";
       var againstRun  = "n/a";
       var bgPassColor = " style='text-align: center;'";
       var bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";

       var runFactor     = 0;
       var passFactor    = 0;
       var avgFactor     = 0;
       var invRunFactor  = 0;
       var invPassFactor = 0;
       var invAvgFactor  = 0;

       try {
        opponent    = habOverviewNFLData[playerDatabase['pid_' + pid].team][overviewWeek].opp;
        againstPass = parseInt(habSTReturnRating[opponent]) + 1;
        againstRun  = parseInt(habSTAllowedRating[opponent]) + 1;
        bgPassColor = " style='background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstPass)] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstPass)] + ";'"; 
        bgRunColor  = " style='background-image: none; color: #" + habOverviewFontColor[getOverviewMatchup(againstRun )] + "; background-color: #" + habOverviewBgColor[getOverviewMatchup(againstRun)]  + "; border-right: 1px solid black;'"; 

        passFactor    = factorArray[getOverviewMatchup(againstPass)];
        runFactor     = factorArray[getOverviewMatchup(againstRun)]; 
        invPassFactor = invArray[getOverviewMatchup(againstPass)]; 
        invRunFactor  = invArray[getOverviewMatchup(againstRun)];
        avgFactor     = (passFactor + runFactor)/2;
        invAvgFactor  = (invPassFactor + invRunFactor)/2;
       } catch(er) {
        opponent    = "---";
        againstPass = "n/a";
        againstRun  = "n/a";
        bgPassColor = " style='text-align: center;'";
        bgRunColor  = " style='text-align: center; border-right: 1px solid black;'";

        runFactor      = 0;
        passFactor     = 0;
        avgFactor      = 0;
        invRunFactor   = 0;
        invPassFactor  = 0;
        invAvgFactor   = 0;
       }

       try {
        var injuryCode = habGlobalInjuriesArray[pid].code;
        var injuryFactor = injuryArray[injuryCode];
       } catch(er) {
        var injuryFactor = 1;
       }

       try { //TDS SCORED BY ST IE #UT & #KT
        var temp = getOverviewProj(injuryFactor,runFactor,statsArray[pid].tds_f,statsArray[pid].gp,1);
        projectionsArray["PID4"] += pid+","; var tempPID = pid;
        var halfTemp = 0.5 * temp;  // NO ST TD CATEGORY SO WE NEED TO DIVIDE BY TWO FOR PUNT TD & KICKOFF TD
        projectionsArray["UT"]  += halfTemp+","; var tempUT = halfTemp;
        projectionsArray["KT"]  += halfTemp+","; var tempKT = halfTemp;
        var ST_TD = getOverviewStat(temp,prl);
       } catch(er) { var ST_TD = getOverviewStat("-",prl); }

       try { //TDS ALLOWED BY ST IE STTA
        var temp = getOverviewProj(injuryFactor,invRunFactor,statsArray[pid].tds_a,statsArray[pid].gp,1);
        projectionsArray["STTA"] += temp+","; var tempSTTA = temp;
        var ST_TA = getOverviewStat(temp,br_tar);
       } catch(er) { var ST_TA = getOverviewStat("-",br_tar); }

       try { //KICKOFF RETURNS IE #K
        var temp = getOverviewProj(injuryFactor,runFactor,statsArray[pid].kr,statsArray[pid].gp,0);
        projectionsArray["K"] += temp+","; var tempK = temp;
        var KR = getOverviewStat(temp,prl);
       } catch(er) { var KR = getOverviewStat("-",prl); }

       try { //KICKOFF RETURN YARDS IE KY
        var temp = getOverviewProj(injuryFactor,runFactor,statsArray[pid].kr_yds,statsArray[pid].gp,0);
        projectionsArray["KY"] += temp+","; var tempKY = temp;
        var KRYD = getOverviewStat(temp,br_tar);
       } catch(er) { var KRYD = getOverviewStat("-",br_tar); }

       try { //PUNT RETURNS IE #U
        var temp = getOverviewProj(injuryFactor,runFactor,statsArray[pid].pr,statsArray[pid].gp,0);
        projectionsArray["U"] += temp+","; var tempU = temp;
        var PR = getOverviewStat(temp,prl);
       } catch(er) { var PR = getOverviewStat("-",prl); }

       try { //PUNT RETURN YARDS IE UY
        var temp = getOverviewProj(injuryFactor,runFactor,statsArray[pid].pr_yds,statsArray[pid].gp,0);
        projectionsArray["UY"] += temp+","; var tempUY = temp;
        var PRYD = getOverviewStat(temp,br_tar);
       } catch(er) { var PRYD = getOverviewStat("-",br_tar); }

       try { //BLOCKED PUNT IE BLP
        var temp = getOverviewProj(injuryFactor,runFactor,statsArray[pid].blk_p,statsArray[pid].gp,1);
        projectionsArray["BLP"] += temp+","; var tempBLP = temp;
        var BLP = getOverviewStat(temp,br_tar);
       } catch(er) { var BLP = getOverviewStat("-",br_tar); }

       playerCount4++;
       if(doTopLine4) var topLine4 = " newposition"; else var topLine4 = "";
       if(rowCount4%2)
        tempRows4 += " <tr class='oddtablerow"  + topLine4 + "'" + tar + ">";
       else
        tempRows4 += " <tr class='eventablerow" + topLine4 + "'" + tar + ">";
       rowCount4++;

       tempRows4 += standardColumns;

       //THIS IS MY CUSTOM COLUMNS FOR EACH TABLE
       tempRows4 += "  <td" + tac  + ">"   + opponent + "</td>   <td" + bgPassColor + ">" + againstPass + "</td>   <td" + bgRunColor + ">" + againstRun + "</td>"; // Weekly Opponent
       tempRows4 += ST_TD + ST_TA + KR + KRYD + PR + PRYD + BLP;
       tempRows4 += "  <td" + prl + "><div id='projected_" + pid + "'>-</div></td>";

       doTopLine4 = false;
       tempRows4 += " </tr>";
      
       //if(pid == '7150') alert("PLAYERS="+tempPID+"&PY="+tempPY+"&%23P="+tempP+"&IN="+tempIN+"&FL="+tempFL+"&RY="+tempRY+"&%23R="+tempR+"&CC="+tempCC+"&CY="+tempCY+"&%23C="+tempC+"&EP="+tempEP+"&%23TD="+totalTD+"&%23F="+tempF);
      } // END DOIT4

     }  // END LOOP I
    }   // END LOOP P

    //===========================================================================================
    //====================================FINISH OFF THE TABLES==================================
    //=========================================================================================== 

    if(tempRows1!="") {
     htmlTable1 += tempTable1;
     htmlTable1 += tempRows1;
     htmlTable1 += "</tbody></table><br />\n";
     var playerScoresOffense = "PLAYERS="+projectionsArray["PID1"]+"&PY="+projectionsArray["PY"]+"&%23P="+projectionsArray["P"]+"&IN="+projectionsArray["IN"]+"&FL="+projectionsArray["FL"]+"&RY="+projectionsArray["RY"]+"&%23R="+projectionsArray["R"]+"&CC="+projectionsArray["CC"]+"&CY="+projectionsArray["CY"]+"&%23C="+projectionsArray["C"]+"&EP="+projectionsArray["EP"]+"&%23TD="+projectionsArray["TDS"]+"&%23F="+projectionsArray["F"];
    } else {
     var playerScoresOffense = "";
    }

    if(tempRows2!="") {
     htmlTable2 += tempTable2;
     htmlTable2 += tempRows2;
     htmlTable2 += "</tbody></table><br />\n";
     var playerScoresTeamD = "PLAYERS="+projectionsArray["PID2"]+"&OPA="+projectionsArray["OPA"]+"&TPA="+projectionsArray["TPA"]+"&TYP="+projectionsArray["TYP"]+"&TYR="+projectionsArray["TYR"]+"&TYA="+projectionsArray["TYA"]+"&%23D="+projectionsArray["D"]+"&SF="+projectionsArray["SF"]+"&IC="+projectionsArray["IC"]+"&FC="+projectionsArray["FC"]+"&SK="+projectionsArray["SK"];
    } else {
     var playerScoresTeamD = "";
    }
 
    if(tempRows3!="") {
     htmlTable3 += tempTable3;
     htmlTable3 += tempRows3;
     htmlTable3 += "</tbody></table><br />\n";
     var playerScoresIDP = "PLAYERS="+projectionsArray["PID3"]+"&TKD="+projectionsArray["TKD"]+"&TK="+projectionsArray["TK"]+"&ASD="+projectionsArray["ASD"]+"&AS="+projectionsArray["AS"]+"&SK="+projectionsArray["SKIDP"]+"&FF="+projectionsArray["FFIDP"]+"&FC="+projectionsArray["FCIDP"]+"&IC="+projectionsArray["ICIDP"]+"&%23D="+projectionsArray["DIDP"]+"&%23T="+projectionsArray["TIDP"]+"&SF="+projectionsArray["SFIDP"];
    } else {
     var playerScoresIDP = "";
    }

    if(tempRows4!="") {
     htmlTable4 += tempTable4;
     htmlTable4 += tempRows4;
     htmlTable4 += "</tbody></table><br />\n";
     var playerScoresTeamST = "PLAYERS="+projectionsArray["PID4"]+"&%23UT="+projectionsArray["UT"]+"&%23KT="+projectionsArray["KT"]+"&STTA="+projectionsArray["STTA"]+"&%23K="+projectionsArray["K"]+"&KY="+projectionsArray["KY"]+"&%23U="+projectionsArray["U"]+"&UY="+projectionsArray["UY"]+"&BLP="+projectionsArray["BLP"];
    } else {
     var playerScoresTeamST = "";
    }
    
    var htmlTable5 = "";
    htmlTable5 += "<br /><table style='border: 1px solid black;'><tr><td style='background-image: none; border: 0px;'>Matchup Legend: </td>";
    htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[4] + "; background-color: #" + habOverviewBgColor[4] +";'> Great </td>";
    htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[3] + "; background-color: #" + habOverviewBgColor[3] +";'> Good </td>";
    htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[2] + "; background-color: #" + habOverviewBgColor[2] +";'> Avg. </td>";
    htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[1] + "; background-color: #" + habOverviewBgColor[1] +";'> Poor </td>";
    htmlTable5 += "<td style='background-image: none; border: 1px solid black; color: #" + habOverviewFontColor[0] + "; background-color: #" + habOverviewBgColor[0] +";'> Bad </td></tr></table>";

    document.getElementById("RosterOverviewProjections").innerHTML = htmlTable1 + htmlTable2 + htmlTable3 + htmlTable4 + htmlTable5;

    if(playerScoresOffense!="") makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=projectedScores&L=" + league_id + "&" + playerScoresOffense, 'parseOverviewProjectedScores',1);
    if(playerScoresTeamD!="")   makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=projectedScores&L=" + league_id + "&" + playerScoresTeamD,   'parseOverviewProjectedScores',1);
    if(playerScoresIDP!="")     makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=projectedScores&L=" + league_id + "&" + playerScoresIDP,     'parseOverviewProjectedScores',1);
    if(playerScoresTeamST!="")  makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=projectedScores&L=" + league_id + "&" + playerScoresTeamST,  'parseOverviewProjectedScores',1);

}


function doOverviewMain(thisTeam) {
  currentOverviewTab = "Main";
  if(thisTeam==undefined) globalOverviewTeam = currentOverviewTeam; else globalOverviewTeam = thisTeam;
  currentOverviewTeam = globalOverviewTeam;
  document.getElementById("RosterOverviewMain").innerHTML = "<center>Loading Data . . . Please wait.</center>";
  var waitTime = 0;
  setTimeout("doOverviewMainTable(habPlayerStats,globalOverviewTeam)",waitTime);
}

function doOverviewStats(thisTeam) {
  currentOverviewTab = "Stats";
  if(thisTeam==undefined) globalOverviewTeam = currentOverviewTeam; else globalOverviewTeam = thisTeam;
  currentOverviewTeam = globalOverviewTeam;
  document.getElementById("RosterOverviewStats").innerHTML = "<center>Loading Data . . . Please wait.</center>";
  var waitTime = 0;
  setTimeout("doOverviewStatsTable(habPlayerStats,globalOverviewTeam)",waitTime);
}

function doOverviewSchedule(thisTeam) {
  currentOverviewTab = "Schedule";
  if(thisTeam==undefined) globalOverviewTeam = currentOverviewTeam; else globalOverviewTeam = thisTeam;
  currentOverviewTeam = globalOverviewTeam;
  document.getElementById("RosterOverviewSchedule").innerHTML = "<center>Loading Data . . . Please wait.</center>";
  var waitTime = 0;
  setTimeout("doOverviewScheduleTable(globalOverviewTeam)",waitTime);
}

function doOverviewProjections(thisTeam) {
  currentOverviewTab = "Projections";
  if(thisTeam==undefined) globalOverviewTeam = currentOverviewTeam; else globalOverviewTeam = thisTeam;
  currentOverviewTeam = globalOverviewTeam;
  document.getElementById("RosterOverviewProjections").innerHTML = "<center>Loading Data . . . Please wait.</center>";
  var waitTime = 0; 
  setTimeout("doOverviewProjectionsTable(habPlayerStats,globalOverviewTeam)",waitTime);
}

function doOverviewSelection(thisTeam) {
  if(thisTeam==undefined) globalOverviewTeam = currentOverviewTeam; else globalOverviewTeam = thisTeam;
  currentOverviewTeam = globalOverviewTeam;
  switch(currentOverviewTab) {
    case "Main"        : { doOverviewMain(globalOverviewTeam); break; }
    case "Stats"       : { doOverviewStats(globalOverviewTeam); break; }
    case "Schedule"    : { doOverviewSchedule(globalOverviewTeam); break; }
    case "Projections" : { doOverviewProjections(globalOverviewTeam); break; }
  }
}

function overviewDropDown(loggedInAs) {
 var htmlCode = "<b>Select a Franchise:</b>&nbsp;<select onchange='doOverviewSelection(this.options[this.selectedIndex].value)' id='habOverviewSelect'>";
 htmlCode+="<option>&nbsp;</option>";
 for(var i=1; i<habGlobalFranchiseKey.length; i++) {
  htmlCode+="<option value='" + habGlobalFranchiseKey[i] + "'>" + franchiseDatabase['fid_' + habGlobalFranchiseKey[i]].name + "</option>";
 }
 htmlCode+= "</select>";
 if(overviewMinimize) htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;( <a href='#1' onclick='overviewMinimizeApp();'><span class='habOverviewMinimize'>Minimize App</span></a> )";
 htmlCode+= "<br /><br />";

 document.getElementById("overviewDropDown").innerHTML = htmlCode;

 if(loggedInAs==undefined||loggedInAs=='0000') {
  doOverviewMain(overviewDefaultTeam); 
 } else {
  currentOverviewTeam = loggedInAs;
  doOverviewMain(loggedInAs);
 }
}

function overviewMinimizeApp() {
 document.getElementById("overviewDropDown").innerHTML = "";
 document.getElementById("habOverviewTabs").innerHTML = "<a href='#1' onclick='overviewLoading();'><span class='habClickToStart'>Click to activate Overview Application</span></a>";
}

function overviewInitializeTab() {
  try {
   habInitializeTabContent("ROSTER_OVERVIEW");
  } catch(er) {
   document.getElementById("overviewReinitialize").innerHTML = "<a href='#1' onClick='habInitializeTabContent(\"ROSTER_OVERVIEW\");'>Click here to initialize app</a><br /><br />";
  }
}

function overviewTabs() {
  var htmlCode = "";
  htmlCode += '<ul id="ROSTER_OVERVIEW" class="habOverviewTabs">';
  htmlCode += '<li onClick="doOverviewMain();" class="selected"><a href="#1" rel="OverviewContent0">Overview</a> </li>';
  htmlCode += '<li onClick="doOverviewStats();"><a href="#1" rel="OverviewContent1">Stats</a> </li>';
  htmlCode += '<li onClick="doOverviewSchedule();"><a href="#1" rel="OverviewContent2">Schedule</a> </li>';
  htmlCode += '<li onClick="doOverviewProjections();"><a href="#1" rel="OverviewContent3">Projections</a> </li>';
  htmlCode += '</ul>';
  htmlCode += '<div class="habOverviewTabContentStyle">';
  htmlCode += '<div id="OverviewContent0" class="habOverviewTabContent"><div id="RosterOverviewMain"></div></div>';
  htmlCode += '<div id="OverviewContent1" class="habOverviewTabContent"><div id="RosterOverviewStats"></div></div>';
  htmlCode += '<div id="OverviewContent2" class="habOverviewTabContent"><div id="RosterOverviewSchedule"></div></div>';
  htmlCode += '<div id="OverviewContent3" class="habOverviewTabContent"><div id="RosterOverviewProjections"></div></div>';
  htmlCode += '</div><br /><br />';
  document.getElementById("habOverviewTabs").innerHTML = htmlCode;
  try {  // IN IE THERE SOMETIMES IS AN ERROR WHEN THIS FUNCTION IS CALLED IMMEDIATELY THEREFORE DELAY IT ON ERROR
   habInitializeTabContent("ROSTER_OVERVIEW");
  } catch(er) {
   setTimeout("overviewInitializeTab()",3000);  
  }
}

function getOverviewDateString(timestamp) {
  var AMPM = "am";

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
  day[0] = ['Sun'];
  day[1] = ['Mon'];
  day[2] = ['Tue'];
  day[3] = ['Wed'];
  day[4] = ['Thu'];
  day[5] = ['Fri'];
  day[6] = ['Sat'];

  var thisObj   = new Date(timestamp*1000); // MUST CHANGE TO INCLUDE MILLISECONDS
  var thisDay   = thisObj.getDay();
  var thisMonth = thisObj.getMonth();
  var thisDate  = thisObj.getDate();
  var thisHour  = thisObj.getHours();
   if(thisHour>=12) { thisHour = thisHour - 12; AMPM = "pm"; }
   if(thisHour==0) { thisHour = 12; }
  var thisMin   = thisObj.getMinutes();
   if(thisMin<10) thisMin = "0"+thisMin;

  var thisString = day[thisDay] + " " + thisHour + ":" + thisMin + " " + AMPM;

  return thisString;
}

function parseOverviewNFLSchedule (resultsXML) {
  var schedule = resultsXML.getElementsByTagName("nflSchedule");
  var weekNum  = parseInt(schedule[0].getAttribute("week"),10);
  var matchups = resultsXML.getElementsByTagName("matchup");

  for (var i = 0; i < matchups.length; i++) {

   var kickoff          = parseInt(matchups[i].getAttribute("kickoff"),10);
   var secondsRemaining = parseInt(matchups[i].getAttribute("gameSecondsRemaining"),10);

   var matchup   = matchups[i].getElementsByTagName("team");
   var roadName  = matchup[0].getAttribute("id");
   var homeName  = matchup[1].getAttribute("id");
   var gameDate  = getOverviewDateString(kickoff);
   
   if(habOverviewNFLData[roadName]==undefined) habOverviewNFLData[roadName] = new Array();
   if(habOverviewNFLData[homeName]==undefined) habOverviewNFLData[homeName] = new Array();

   habOverviewNFLData[roadName][weekNum] = new Object();
   habOverviewNFLData[homeName][weekNum] = new Object();

   habOverviewNFLData[roadName][weekNum].kickoff = gameDate;
   habOverviewNFLData[homeName][weekNum].kickoff = gameDate;
   habOverviewNFLData[homeName][weekNum].opp = roadName;
   habOverviewNFLData[roadName][weekNum].opp = homeName;
  }
}


function parseOverviewTopStarters (resultsXML) {
  var player = resultsXML.getElementsByTagName("player");
  for (var i = 0; i < player.length; i++) {
   var id   = player[i].getAttribute("id");
   var pct  = player[i].getAttribute("percent");
   habOverviewTopStarters[id] = new Object();
   habOverviewTopStarters[id].pct = pct;
  }
}

function parseOverviewStarters (resultsXML) {
  var weeklyResults = resultsXML.getElementsByTagName("weeklyResults");
  var weekNum = weeklyResults[0].getAttribute("week");

  var franchise = resultsXML.getElementsByTagName("franchise");
  try {
    var fName = franchise[0].getAttribute("id");
    habXMLSuccess = true;
  } catch(er) {
    //Did not successfully grab XML data so return and re-try
    habXMLAttempt += 1;
    habXMLSuccess = false;
    return -1;
  }
  for (var i=0; i<franchise.length; i++) {
   var starters    = franchise[i].getAttribute("starters");
   var nonstarters = franchise[i].getAttribute("nonstarters");
   var tiebreaker  = franchise[i].getAttribute("tiebreaker");
   var fid    = franchise[i].getAttribute("id");
   var player = franchise[i].getElementsByTagName("player");
   for (var j=0; j<player.length; j++) {
    var pid = player[j].getAttribute("id");
    var status = "?";
    if(starters.indexOf(pid)!=-1)    status = "<b><i>Start</i></b>";
    if(nonstarters.indexOf(pid)!=-1) status = "bench";
    if(tiebreaker.indexOf(pid)!=-1)  status = "t/b";
    try {
     habOverviewStatus[pid] = status;
    } catch(er) {
     // Do Nothing
    }
   }
  }
}

function getOneTimeOverviewModules() {
  makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=injuries&L="+league_id+"&rand=" + Math.random(), 'parseHabInjuryXML',1);
  for (var tempWeek=1; tempWeek<=17; tempWeek++) makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=nflSchedule&W=" + tempWeek + "&rand=" + Math.random(), 'parseOverviewNFLSchedule',1);
  makeHttpRequest(habBaseURL+"/"+year+"/export?TYPE=topStarters&rand=" + Math.random(), 'parseOverviewTopStarters',1);
  makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id, 'parseHabRosterXML','rosters',false);

  habXMLAttempt = 0;
  habXMLSuccess = false;
  while (!habXMLSuccess&&habXMLAttempt<2) { // Two attempts at grabbing XML data
   makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+overviewWeek+"&rand=" + Math.random(), 'parseOverviewStarters','weeklyResults',false);
  }

  var weeklyScores = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=playerScores&L="+league_id+"&W=YTD", 'parseOverviewPlayerScoresXML','playerScores',true);
  habOverviewPlayerScores[0] = new Array();
  habOverviewPlayerScores[0] = weeklyScores;
  for(var i=1;i<overviewWeek;i++) {
   var weeklyScores = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=playerScores&L="+league_id+"&W="+i, 'parseOverviewPlayerScoresXML','playerScores',true);
   if(weeklyScores.length == 0) weeklyScores = makeSyncHttpRequest(habBaseURL+"/"+year+"/export?TYPE=playerScores&L="+league_id+"&W="+i, 'parseOverviewPlayerScoresXML','playerScores',true);
   habOverviewPlayerScores[i] = new Array();
   habOverviewPlayerScores[i] = weeklyScores;
  }

  overviewTabs();
  if(franchise_id==undefined) franchise_id;
  overviewDropDown(franchise_id);
}

function overviewLoading() {
  document.getElementById("habOverviewTabs").innerHTML = '<b>Loading . . . . Please Wait</b>';
  setTimeout("getOneTimeOverviewModules()",50);
}

if(!overviewClickToStart) {
 //To give the js files an opportunity to load we will delay the call by 500 milliseconds
 setTimeout("getOneTimeOverviewModules()",500);
} else {
 document.getElementById("habOverviewTabs").innerHTML = "<a href='#1' onclick='overviewLoading();'><span class='habClickToStart'>Click to activate Overview Application</span></a>";
}

} // end if habOverviewRan Check

