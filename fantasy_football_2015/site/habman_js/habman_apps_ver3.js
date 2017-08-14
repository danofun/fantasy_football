// SET GLOBAL VARIABLES FOR MY APPS  
if(globalsSet==undefined) { // SET THESE GLOBAL VARIABLES ONE TIME REGARDLESS THE NUMBER OF TIME FILE IS CALLED

 if (unescape(location.href).indexOf("http://football")!=-1||unescape(location.href).indexOf("http://6")!=-1) var currentBaseURL = baseURLDynamic; else var currentBaseURL = baseURLStatic;

 var standingsFile     = currentBaseURL+"/"+year+"/export?L="+league_id+"&TYPE=standings&rand=" + Math.random();
 var leagueFile        = currentBaseURL+"/"+year+"/export?L="+league_id+"&TYPE=league&rand=" + Math.random();
 var weeklyResultsFile = currentBaseURL+"/"+year+"/export?L="+league_id+"&TYPE=weeklyResults&rand=" + Math.random() + "&W=";

 var sync_http_request       = false;
 var headToHeadArraySet      = false;
 var franchiseArray          = new Array();
 var divisionArray           = new Array();
 var conferenceArray         = new Array();
 var standingsArray          = new Array();
 var playoffArray            = new Array();
 var leagueName              = '';
 var lastRegularSeasonWeek   = 0;
 var activeWeek              = 0;
 var numTeams                = 0;
 var numDivisions            = 0;
 var numConferences          = 0;
 var seedCount               = 0;
 var leagueAverage           = false;
 var didShowScores           = false;
 var habmanModCount          = 0;
 var separateHTHByDivision   = false;
 var separateHTHByConference = false;
 var headToHeadTeamDisplay   = "";
 var leagueAttemptXML        = 0;
 var standingsAttemptXML     = 0;
 var hthAttemptXML           = 0;

 var tieBreakerTitles = ['by default','Overall Win %','Div. Win %','Div. PF','Overall PF','Victory Points','Power Rank','Play-All Win %','Head-to-Head','Coin Flip','Non-Div. Win %','Non-Div. PF','Reverse PA','Conf. Win %','Conf. PF','Non-Conf. Win%','Non-Conf. PF','Common Games Win%','Head-to-Head','Strength of Schedule','Strength of Victory'];
                     //      0              1             2           3          4                5             6             7                 8            9           10               11            12           13           14            15             16               17          ,        18              19                      20
 var standingsTitles  = ['','','','W','L','T','Record','Win %','PF','PA','Div-W','Div-L','Div-T','Div-Record','Div-Win %','Div-PF','Power','VP','PlayAll-W','PlayAll-L','PlayAll-T','PlayAll-Record','PlayAll-Win %','NonDiv-W','NonDiv-L','NonDiv-T','NonDiv-Record','NonDiv-Win %','NonDiv-PF','Conf-W','Conf-L','Conf-T','Conf-Record','Conf-Win %','Conf-PF','NonConf-W','NonConf-L','NonConf-T','NonConf-Record','NonConf-Win %','NonConf-PF','Head-to-Head Win %','SOS-Record','SOS-Win %','SOV-Record','SOV-Win %',custom1Title,custom2Title,custom3Title];
                     //   0  1  2  3   4   5     6       7       8    9     10      11      12        13          14          15      16    17       18          19          20          21               22             23         24         25         26              27             28          29       30       31        32           33           34         35          36         37             38             39              40             41                42            43         44           45     ,    46    ,    47    ,    48
 var standingsDecimals= [-2,-2,-2, 0 , 0 , 0 ,  -2    ,  3    , -1 , -1 ,    0  ,    0  ,    0  ,     -2     ,     3     ,    -1  ,    2  ,  0 ,      0    ,      0    ,      0    ,     -2         ,      3        ,     0    ,     0    ,     0    ,    -2         ,     3        ,    -1     ,     0  ,     0  ,     0  ,     -2      ,     3      ,     -1  ,      0    ,      0    ,     0     ,        -2      ,      3        ,     -1     ,        3           ,    -2      ,      3    ,    -2      ,     3     ,    -1         -1         -1          ]; // Where -2 is N/A and -1 default

 /***********************************************
 * Fixed ToolTip script- © Dynamic Drive (www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit http://www.dynamicdrive.com/ for full source code
 ***********************************************/
		
 var app3_tipwidth='450px' //default tooltip width
 var app3_tipbgcolor='lightyellow'  //tooltip bgcolor
 var app3_disappeardelay=250  //tooltip disappear speed onMouseout (in miliseconds)
 var app3_vertical_offset="0px" //vertical offset of tooltip from anchor link
 var app3_horizontal_offset="-3px" //horizontal offset of tooltip from anchor link

 /////No further editting needed

 var app3_ie4=document.all
 var app3_ns6=document.getElementById&&!document.all

 if (app3_ie4||app3_ns6)

 document.write('<div id="app3_fixedtipdiv" style="position:absolute; padding: 2px; border: 1px solid black; color: black; font-size: 12px; line-height: 18px; z-index: 100; visibility:hidden; width:'+app3_tipwidth+';background-color:'+app3_tipbgcolor+'" ></div>')

 function app3_getposOffset(what, offsettype){
   var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
   var parentEl=what.offsetParent;
   while (parentEl!=null){
    totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
    parentEl=parentEl.offsetParent;
   }
   return totaloffset;
 }


 function app3_showhide(obj, e, visible, hidden, app3_tipwidth){
   if (app3_ie4||app3_ns6)
    dropmenuobj.style.left=dropmenuobj.style.top=-500
   if (app3_tipwidth!=""){
    dropmenuobj.widthobj=dropmenuobj.style
    dropmenuobj.widthobj.width=app3_tipwidth
   }
   if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover")
    obj.visibility=visible
   else if (e.type=="click")
    obj.visibility=hidden
 }

 function app3_iecompattest(){
   return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
 }

 function app3_clearbrowseredge(obj, whichedge){
   var edgeoffset=(whichedge=="rightedge")? parseInt(app3_horizontal_offset)*-1 : parseInt(app3_vertical_offset)*-1
   if (whichedge=="rightedge"){
    var windowedge=app3_ie4 && !window.opera? app3_iecompattest().scrollLeft+app3_iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
    dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
    if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
     edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
   } else {
    var windowedge=app3_ie4 && !window.opera? app3_iecompattest().scrollTop+app3_iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
    dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
    if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure)
     edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight
   }
   return edgeoffset
 }

 function app3_fixedtooltip(tipscores, obj, e, app3_tipwidth){
   menucontents = tipscores.replace(/'/g,"’");
   if (window.event) event.cancelBubble=true
    else if (e.stopPropagation) e.stopPropagation()
   app3_clearhidetip()
   dropmenuobj=document.getElementById? document.getElementById("app3_fixedtipdiv") : app3_fixedtipdiv
   dropmenuobj.innerHTML=menucontents

   if (app3_ie4||app3_ns6){
    app3_showhide(dropmenuobj.style, e, "visible", "hidden", app3_tipwidth)
    dropmenuobj.x=app3_getposOffset(obj, "left")
    dropmenuobj.y=app3_getposOffset(obj, "top")
    dropmenuobj.style.left=dropmenuobj.x-app3_clearbrowseredge(obj, "rightedge")+"px"
    dropmenuobj.style.top=dropmenuobj.y-app3_clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
   }
 }

 function app3_hidetip(e){
   if (typeof dropmenuobj!="undefined"){
    if (app3_ie4||app3_ns6)
     dropmenuobj.style.visibility="hidden"
   }
 }

 function app3_delayhidetip(){
   if (app3_ie4||app3_ns6)
    app3_delayhide=setTimeout("app3_hidetip()",app3_disappeardelay)
 }

 function app3_clearhidetip(){
   if (typeof app3_delayhide!="undefined")
   clearTimeout(app3_delayhide)
 }


 //== END DYNAMIC DRIVE SCRIPT=====================



 var globalsSet = true;
} // END IF globalsSet==undefined

//RESET THESE GLOBALS EACH TIME THIS FILE IS CALLED
habmanModCount++;          // Used as a table-identifier in case some one is using more than one app.

var headToHeadWinPctTeams      = 0;  // This is a countdown and works in conjunction with !useStartOverRule.  When zero or less need to rerun head to head win percentage tiebreaker otherwise count down to zero
var hthPointsScoredTeams       = 0;
var leagueAverageCreated       = false;

var headToHeadBrokeTie         = false;
var headToHeadSweep            = false;
var headToHeadSwept            = false;
var commonGameBrokeTie         = false;
var hthPointsScoredBrokeTie    = false;
var numDivisionTeams           = 1;         // Set to 1 for only one division winner per division
var numWildCardTeams           = 0;
var numDivisionTeamsTwo        = 1;
var hideDivision               = false;
var hideDivisionTwo            = false;
var hideWildCard               = false;
var hidePlayoff                = false;
var hideNonPlayoff             = false;
var useSweepRule               = false;
var useStartOverRule           = false;
var useDivisionBestRule        = false;
var useDivisionIcon            = false;
var useToolTip1                = false;
var useToolTip2                = true;
var useWinPctRule              = 1;         // 0 - only for 2 teams tied; 1 - MFL Default; 2 - 1 game minimum req'd; 3 - Must have played all the tied teams at least once
var currentWinPctGrouping      = "";
var currentCommonGameGrouping  = "";
var disableHilite              = false;
var doingDivision              = false;
var teamsCurrentlyTied         = 0;
var stepsCount                 = 0;
var stepsText                  = "";
var stepsTitle                 = "";
var genericTable               = false;
var showScores                 = false;
var showSteps                  = false;
var setFixedToolTip            = false;
var bypassSameDivisionRule     = false;
var bypassConferenceRule       = false;
var iconURL                    = "";
var truncName                  = 0;
var specialSeed                = new Array();
var divisionTieBreakerTwo      = new Array();
var outOfPlayoffsTiebreaker    = new Array();
var outOfPlayoffsReverseSort   = false;
var teamNickNames              = new Array();
var custom1                    = new Array();
var custom2                    = new Array();
var custom3                    = new Array();
var custom1Title               = "";
var custom2Title               = "";
var custom3Title               = "";
var conferenceLikeDivision     = false;
var titleHeader                = "<h4>If the playoffs were to start today</h4>";
var hideTitleHeader            = false;
var titleDivisionWinner        = "Division Winners";
var titleDivisionWinnerTwo     = "Division Winners 2";
var titleWildCardWinner        = "Wild Card Winners";
var titleNonPlayoffTeam        = "Out of the Playoffs";
var titlePlayoffTeam           = "Playoff Teams";
var reverseTheOrder            = false;
var numDivisionWinners         = -1;
var numDivisionWinnersTwo      = -1;
var outerPlayoffStyle          = "border: 0px; margin: 0px;";
var divisionTieBreaker         = [1,4,9,0];
var wildCardTieBreaker         = [1,4,9,0];
var displayColumns             = [6,8];  // Use Standings Titles above
var iconColors                 = ['FF0000','0000FF','008000','FFFF00','FF00FF','00FF00','00FFFF','C0C0C0']
var commonGameMinGP            = 4;
var scoringDecimals            = 2;
var enableCodeWriter           = false;
var habColBg                   = new Array();  //Used in my setColColor function for column hiliting

// THE FOLLOWING FUNCTIONS ARE COMMONLY USED WITHIN MANY OF THE APPS

  function habmanBubbleSort(arrayName, length, field, reverse) { // BUBBLE SORTING OF ARRAYS
   for (var i=0; i<(length-1); i++)
    for (var j=i+1; j<length; j++)
     if(!reverse) {
      if (arrayName[j][field] > arrayName[i][field]) {
       var dummy = arrayName[i];  
       arrayName[i] = arrayName[j]; 
       arrayName[j] = dummy; 
      }
     } else {
      if (arrayName[j][field] < arrayName[i][field]) {
       var dummy = arrayName[i];  
       arrayName[i] = arrayName[j]; 
       arrayName[j] = dummy; 
      }
     }
   return arrayName;
  }

  function moveRow(arrayName, thisRow, whereTo) {
   if(thisRow<whereTo) { 
    var tempRow = arrayName[thisRow];
    for (var i=thisRow; i<whereTo; i++) { 
     arrayName[i] = arrayName[i+1];
    }
    arrayName[whereTo]=tempRow;
   } else {
    var tempRow = arrayName[thisRow];
    for (var i=thisRow; i>whereTo; i--) {
     arrayName[i] = arrayName[i-1];
    }
    arrayName[whereTo]=tempRow;
   }
   return arrayName;
  }

  function synchronousXMLRequest(url,callback_function,fieldTag,setReturn) {  // Uses SJAX ie Synchronous therefore it will wait before moving on to other requests
   var alreadySet=false;
   if(fieldTag=="league"&&franchiseArray.length>0) alreadySet=true;
   if(fieldTag=="standings"&&standingsArray.length>0) alreadySet=true;
   if(!alreadySet) {   
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
            }
            catch (e) {
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
     }
     else
      eval(callback_function + '(sync_http_request.responseXML)');   
    }
    if(setReturn) return returnArray;

   } //END IF !alreadySet
  }

  function getLeagueData(xmldoc) { // THIS FUNCTION GETS DATA FROM THE LEAGUE XML FILE AND THEN FILLS THE DIFFERENT ARRAYS
    // Find league name
    var league = xmldoc.getElementsByTagName( "league" );
    try {
     leagueName = league[0].getAttribute( "name" );
    } catch(er) {
     leagueAttemptXML++;
     if(leagueAttemptXML < 2) { //Try one extra time to get league data as it sometimes fails in Firefox
       synchronousXMLRequest(leagueFile, 'getLeagueData', 'league');
     }
     return false;
    }
    lastRegularSeasonWeek = parseInt(league[0].getAttribute( "lastRegularSeasonWeek" ),10);

    // Create franchise array
    var franchises = xmldoc.getElementsByTagName( "franchises" );
    numTeams = franchises[0].getAttribute( "count" );
    var franchise  = xmldoc.getElementsByTagName( "franchise" );
    for( n = 0; n < numTeams; n++ ) {
     var teamName = franchise[n].getAttribute( "name" );
     teamName=teamName.replace(/'/g,"´");
     teamName=teamName.replace(/"/g,"");
     teamName=teamName.replace(/<\S[^><]*>/g,"");
     franchiseArray[n] = [franchise[n].getAttribute( "id" ),teamName,franchise[n].getAttribute( "division" )];      
    }
    // Create conference array
    var conferences = new Array();
    conferences = xmldoc.getElementsByTagName( "conferences" );
    if(conferences.length==0||bypassConferenceRule)  
     numConferences = 0;
    else
     numConferences = conferences[0].getAttribute( "count" );
    var conference  = xmldoc.getElementsByTagName( "conference" );
    for( n = 0; n < numConferences; n++ ) {
     conferenceArray[n] = [conference[n].getAttribute( "id" ),conference[n].getAttribute( "name" )];      
    }
    // Create division array
    var divisions = new Array();
    divisions = xmldoc.getElementsByTagName( "divisions" );
    if(divisions.length==0)
     numDivisions = 0;
    else
     numDivisions = divisions[0].getAttribute( "count" );
    var division  = xmldoc.getElementsByTagName( "division" );
    for( n = 0; n < numDivisions; n++ ) {
     if(numConferences==0)
      divisionArray[n] = [division[n].getAttribute( "id" ),division[n].getAttribute( "name" )];      
     else
      divisionArray[n] = [division[n].getAttribute( "id" ),division[n].getAttribute( "name" ),division[n].getAttribute( "conference" )];      
    }
  }

  function doStandingsArray (xmldoc) {
   var standings = xmldoc.getElementsByTagName( "standings" );
   try {
    var franchise = standings[0].getElementsByTagName( "franchise" );
   } catch(er) {
    standingsAttemptXML++;
    if(standingsAttemptXML < 2) { //Try one extra time to get standings data as it sometimes fails in Firefox
     synchronousXMLRequest(standingsFile,'doStandingsArray','standings');
    }
    return false;
   }
   for ( var n = 0; n < numTeams; n++ ) {
    var fid        = franchise[n].getAttribute( "id" );
    var index      = parseInt(fid,10);
    try { var wins    = parseInt(franchise[n].getElementsByTagName("h2hw")[0].firstChild.nodeValue); } catch(er) { var wins   = 0; }
    try { var losses  = parseInt(franchise[n].getElementsByTagName("h2hl")[0].firstChild.nodeValue); } catch(er) { var losses = 0; }
    try { var ties    = parseInt(franchise[n].getElementsByTagName("h2ht")[0].firstChild.nodeValue); } catch(er) { var ties   = 0; }
    try { var pf      = parseFloat(franchise[n].getElementsByTagName("pf")[0].firstChild.nodeValue); } catch(er) { var pf     = 0; }
    try { var pa      = parseFloat(franchise[n].getElementsByTagName("pa")[0].firstChild.nodeValue); } catch(er) { var pa     = 0; }
    if(numDivisions>0){
     try { var div_wins   = parseInt(franchise[n].getElementsByTagName("divw")[0].firstChild.nodeValue);    } catch(er) { var div_wins   = 0; }
     try { var div_losses = parseInt(franchise[n].getElementsByTagName("divl")[0].firstChild.nodeValue);    } catch(er) { var div_losses = 0; }
     try { var div_ties   = parseInt(franchise[n].getElementsByTagName("divt")[0].firstChild.nodeValue);    } catch(er) { var div_ties   = 0; }
     try { var div_pf     = parseFloat(franchise[n].getElementsByTagName("divpf")[0].firstChild.nodeValue); } catch(er) { var div_pf     = 0; }
     var non_div_wins     = wins - div_wins;
     var non_div_losses   = losses - div_losses;
     var non_div_ties     = ties - div_ties;
     var non_div_pf       = pf - div_pf; 
    }

    try { var conf_wins   = parseInt(franchise[n].getElementsByTagName("confw")[0].firstChild.nodeValue);    } catch(er) { var conf_wins   = 0; }
    try { var conf_losses = parseInt(franchise[n].getElementsByTagName("confl")[0].firstChild.nodeValue);    } catch(er) { var conf_losses = 0; }
    try { var conf_ties   = parseInt(franchise[n].getElementsByTagName("conft")[0].firstChild.nodeValue);    } catch(er) { var conf_ties   = 0; }
    try { var conf_pf     = parseFloat(franchise[n].getElementsByTagName("confpf")[0].firstChild.nodeValue); } catch(er) { var conf_pf     = 0; }
    var non_conf_wins   = wins - conf_wins;
    var non_conf_losses = losses - conf_losses;
    var non_conf_ties   = ties - conf_ties;
    var non_conf_pf     = pf - conf_pf; 

    try { var power     = parseFloat(franchise[n].getElementsByTagName("power_rank")[0].firstChild.nodeValue); } catch(er) { var power     = 0; }
    try { var vp        = parseInt(franchise[n].getElementsByTagName("vp")[0].firstChild.nodeValue);           } catch(er) { var vp        = 0; }
    try { var pa_wins   = parseInt(franchise[n].getElementsByTagName("all_play_w")[0].firstChild.nodeValue);   } catch(er) { var pa_wins   = 0; }
    try { var pa_losses = parseInt(franchise[n].getElementsByTagName("all_play_l")[0].firstChild.nodeValue);   } catch(er) { var pa_losses = 0; }
    try { var pa_ties   = parseInt(franchise[n].getElementsByTagName("all_play_t")[0].firstChild.nodeValue);   } catch(er) { var pa_ties   = 0; }
    var hth_win_pct = 0;
    if((wins + losses + ties)!=0) 
     var pct = parseInt((wins + (ties*0.5))*1000 / (wins + losses + ties))/1000; else var pct = 0; 
     var record = wins + '-' + losses + '-' + ties;
    if((div_wins + div_losses + div_ties)!=0) 
     var div_pct = parseInt((div_wins + (div_ties*0.5))*1000 / (div_wins + div_losses + div_ties))/1000; else var div_pct = 0; 
     var div_record = div_wins + '-' + div_losses + '-' + div_ties;
    if((non_div_wins + non_div_losses + non_div_ties)!=0) 
     var non_div_pct = parseInt((non_div_wins + (non_div_ties*0.5))*1000 / (non_div_wins + non_div_losses + non_div_ties))/1000; else var non_div_pct = 0; 
     var non_div_record = non_div_wins + '-' + non_div_losses + '-' + non_div_ties;
    if((conf_wins + conf_losses + conf_ties)!=0) 
     var conf_pct = parseInt((conf_wins + (conf_ties*0.5))*1000 / (conf_wins + conf_losses + conf_ties))/1000; else var conf_pct = 0; 
     var conf_record = conf_wins + '-' + conf_losses + '-' + conf_ties;
    if((non_conf_wins + non_conf_losses + non_conf_ties)!=0) 
     var non_conf_pct = parseInt((non_conf_wins + (non_conf_ties*0.5))*1000 / (non_conf_wins + non_conf_losses + non_conf_ties))/1000; else var non_conf_pct = 0; 
     var non_conf_record = non_conf_wins + '-' + non_conf_losses + '-' + non_conf_ties;
    if((pa_wins + pa_losses + pa_ties)!=0) 
     var pa_pct = parseInt((pa_wins + (pa_ties*0.5))*1000 / (pa_wins + pa_losses + pa_ties))/1000; else var pa_pct = 0; 
     var pa_record = pa_wins + '-' + pa_losses + '-' + pa_ties;
    var sos_record  = 0;  // strength of schedule and strength of victory are set up here but assigned once head to head matches are run 
    var sos_win_pct = 0;
    var sov_record  = 0;
    var sov_win_pct = 0;
    standingsArray[n] = [index, fid, franchiseDatabase['fid_' + fid].name, wins, losses, ties, record, pct, pf, pa, div_wins, div_losses, div_ties, div_record, div_pct, div_pf, power, vp, pa_wins, pa_losses, pa_ties, pa_record, pa_pct, non_div_wins, non_div_losses, non_div_ties, non_div_record, non_div_pct, non_div_pf, conf_wins, conf_losses, conf_ties, conf_record, conf_pct, conf_pf, non_conf_wins, non_conf_losses, non_conf_ties, non_conf_record, non_conf_pct, non_conf_pf, hth_win_pct, sos_record, sos_win_pct, sov_record, sov_win_pct, custom1[n], custom2[n], custom3[n]];
                // code   0      1          2              3       4      5      6     7    8   9     10        11          12        13          14       15     16   17     18      19         20        21        22         23            24              25             26             27          28         29          30          31          32          33        34         35              36               37             38               39           40           41         42          43           44            45         46          47          48
   }
  }

  function setColColor(e,table,Color) {
   var browserName=navigator.appName;
   var q;
   if(browserName=="Netscape")
    var obj = e.target;
     else if(browserName=="Microsoft Internet Explorer")
           var obj = e.srcElement;
   if(obj.nodeName=='TD'){
    // Get the index of TBODY (this may differ when there are headers etc)
    for(var i=0;i<4;i++){
     if(table.childNodes[i].nodeName=="TBODY"){
      q=i;
      break;
     }
    }
    // alert(obj.cellIndex);
    // Walk through the rows
    for (var i=0; i<table.childNodes[q].childNodes.length; i++) {
     // Walk through the cells, starting (and if html is correctly coded also ending)
     // at obj.cellIndex: the col to be hilited
     for (var n=obj.cellIndex; n<table.childNodes[q].childNodes[i].childNodes.length; n++) {
      if(table.childNodes[q].childNodes[i].childNodes[n].cellIndex==obj.cellIndex){
       table.childNodes[q].childNodes[i].childNodes[n].style.backgroundColor=Color;
       if(Color!='') {
        habColBg[i] = table.childNodes[q].childNodes[i].childNodes[n].style.backgroundImage;
        table.childNodes[q].childNodes[i].childNodes[n].style.backgroundImage='none';
       } else {
        table.childNodes[q].childNodes[i].childNodes[n].style.backgroundImage=habColBg[i];
       }
       break;
      }
     }
    }
   }
  }

  function doAlert(rank,teamName,text) {
   var str;
   str = teamName + "~" + "Seed #" + rank + "~" + text;
   str = str.replace(/~ Sweep/g," Sweep");
   str = str.replace(/~ Winning/g," Winning");
   str = str.replace(/~ Points/g," Points");
   str = str.replace(/~ broke/g," broke");
   if(useToolTip1) {
    str = str.replace(/~/g,"<br />");
    str += "<br /><br />[<a href=\"javascript:hideH2HTip();\">close</a>]";
    h2hTip(str,'#FFFFE1','450',true);
   } else{ 
    str = str.replace(/~/g,"\n");
    alert(str);
   }
  }

  function addTeamsStillTied(currentText,arrayName,length) {
   var newText = "    Still tied (";
   for (var x = 0; x < length; x++) {
    newText += franchiseArray[arrayName[x][0]][1] + ", ";
   }
   newText = newText.substr(0,newText.length-2);
   newText += ")~";
   newText = currentText + newText;
   return newText;
  }

  function arrayAlert(arrayName) {
   if(franchiseDatabase['fid_' + franchise_id].name=="Commissioner") {
    var temp = '';
    for (var x = 0; x < arrayName.length; x++) {
     var y = x+1;
     temp += ' ' + y + ' ' + franchiseArray[arrayName[x][0]][1] + '\n';
    }
    alert(temp)
   }
  }

  function alertThis(arrayName) {
   var temp = '';
   for (var x = 0; x < arrayName.length; x++) {
    var y = x+1;
    temp += ' ' + y + ' ' + franchiseArray[arrayName[x][0]][1] + '\n';
   }
   alert(temp)
  }

  function variableAlert(x) {
   if(franchiseDatabase['fid_' + franchise_id].name=="Commissioner") {
    alert(x);
   }
  }

  function decimalFormat(thisNum,places){
   if(thisNum.toString()=="NaN") thisNum = 0; 
   if(thisNum==-0.0001) {
    thisNum = "-.---";
   } else {  
    thisNum = parseInt(thisNum*Math.pow(10,places))/ (Math.pow(10,places));
    if(thisNum==parseInt(thisNum)) {
     if(places>0) thisNum += "."; 
    }
    for (var x = 0; x < places; x++) { 
     if( ( parseFloat(thisNum)*(Math.pow(10,x)) )==parseInt(thisNum*(Math.pow(10,x)) ) ) thisNum += "0";
    }
   }
   return thisNum;
  }

  function decimalCheck (thisNum,category) {
   // Sets up Win % decimals
   if(category==7||category==14||category==22||category==27||category==33||category==39||category==43||category==45) {
    thisNum=decimalFormat(thisNum,3);
   }
   // Sets up Power Rank decimals
   if(category==16) {
    thisNum=decimalFormat(thisNum,2);
   }
   // Sets up Scoring decimals
   if(category==8||category==9||category==15||category==28||category==34||category==40) {
    thisNum=decimalFormat(thisNum,scoringDecimals);
   }
   return thisNum;
  }

  function setupGlobal() {
   tieBreakerTitles[17]='Common Games Win% ('+commonGameMinGP+' game minimum requirement)';
   standingsArray = habmanBubbleSort(standingsArray,numTeams,0,1);  // Re-sort Standings Array to get it back to original stats (probably needs to be looked at)
   if(custom1.length>0) {
    for (var x = 0; x < numTeams; x++) { 
     standingsArray[x][46] = custom1[x];
    }
    standingsTitles[46] = custom1Title;
   }
   if(custom2.length>0) {
    for (var x = 0; x < numTeams; x++) { 
     standingsArray[x][47] = custom2[x];
    }
    standingsTitles[47] = custom2Title;
   }
   if(custom3.length>0) {
    for (var x = 0; x < numTeams; x++) { 
     standingsArray[x][48] = custom3[x];
    }
    standingsTitles[48] = custom3Title;
   }
   if(useSweepRule == true) useStartOverRule=true;
   if(useWinPctRule==2||useWinPctRule==3) useStartOverRule=true;
  }

  function setupOther(which,teams) {
   setupGlobal();
   if(which=="draft") {
    reverseTheOrder  = true;
    numWildCardTeams = numTeams;
//    numDivisionWinners=0;
    hideNonPlayoff=true;
   }
   if(which=="toilet") {
    reverseTheOrder    = true;
    numDivisionWinners = -1;
    if(teams==undefined) {
     numWildCardTeams = 2;
    } else {
     numWildCardTeams = teams;
    }
    hideNonPlayoff=true;
   }
   if(which=="generic") {
    numDivisionWinners = 0;
    genericTable = true;
   }
  }

  function setupNormal() {
   setupGlobal();
   reverseTheOrder=false;
   numDivisionWinners=-1;
  }


// THE FOLLOWING FUNCTIONS ARE USED FOR MY ALL PLAY APP


  function createAllPlayTable(divID,thisArray,mode) {
//   if(which == undefined) { var which; var mode = "all"; } else var mode = which;
   var oddRow       = "";
   var evenRow      = "";
   var columnHilite = "";
//   var thisArray    = standingsArray;
//   thisArray = habmanBubbleSort(thisArray,numTeams,'winpct',0); 
   var key = new Array;
   for ( var i = 0; i < numTeams; i++ ) { 
    key[i] = new Array(i,franchiseArray[i][0],thisArray[franchiseArray[i][0]]['winpct']);
   }
   key = habmanBubbleSort(key,numTeams,2,0);    
   if(!disableHilite) {
    oddRow        = " onmouseover=\"this.className='hilitetablerow'\" onmouseout=\"this.className='oddtablerow'\"";
    evenRow       = " onmouseover=\"this.className='hilitetablerow'\" onmouseout=\"this.className='eventablerow'\"";
    columnHilite  = " onmouseover='setColColor(event,this,\"tan\")' onmouseout='setColColor(event,this,\"\")'";
   }
   var tempXML = "";
   var loops = 1;
   var title = "";
   if(mode=="byDivision")   loops = numDivisions;
   if(mode=="byConference") loops = numConferences;
   for (var i = 0; i < loops; i++) {
    if(mode=="byDivision")   title = "<br />" + divisionArray[i][1];;
    if(mode=="byConference") title = "<br />" + conferenceArray[i][1];
    tempXML += "<table border='0' cellspacing='1' align='center' class='homepagemodule report' id='allplaytable'" + columnHilite + ">\n<caption><span>All Play Results" + title + "</span></caption>\n<tbody>\n";
    tempXML += " <tr class='eventablerow'>\n  <th style='border-bottom: 1px solid black; border-right: 1px solid black;'>&nbsp;</th>\n";
    for ( var m = 0; m < numTeams; m++ ) {  
     var doIt=true;
//     if(mode=="all") doIt = true; 
//     if(mode.indexOf(franchiseArray[parseInt(thisArray[m][0]-1)][0])!=-1) var doIt = true;
//     if(mode=="byDivision"&&franchiseArray[parseInt(thisArray[m][0]-1)][2]==i) var doIt=true;
//     if(mode=="byConference"&&parseInt(divisionArray[parseInt(franchiseArray[parseInt(thisArray[m][0]-1)][2],10)][2],10)==i) var doIt=true;
     if(doIt) {
      var temp                        = "  <th align='center' style='border-bottom: 1px solid black;' title='" + franchiseArray[key[m][0]][1] + "'>" + (key[m][0]+1) + "</th>\n"; 
      if(truncName>0)            temp = "  <th align='center' style='border-bottom: 1px solid black;' title='" + franchiseArray[key[m][0]][1] + "'>" + franchiseArray[key[m][0]][1].substr(0,truncName) + "</th>\n";
      if(teamNickNames.length>0) temp = "  <th align='center' style='border-bottom: 1px solid black;' title='" + franchiseArray[key[m][0]][1] + "'>" + teamNickNames[parseInt(franchiseArray[key[m][0]][0],10)-1] + "</th>\n"; 
      if(iconURL!="")            temp = "  <th align='center' style='border-bottom: 1px solid black;'><img src='" + iconURL + key[m][0] + ".gif' alt='" + franchiseArray[key[m][0]][1] + "' /></th>\n"; 
      tempXML += temp;
     }
    }
    tempXML += "  <th align='center' style='border-bottom: 1px solid black; border-left: 1px solid black;'>Overall</th><th align='center' style='border-bottom: 1px solid black; border-left: 1px solid black;'>Win %</th>\n </tr>\n";
    for ( var m = 0; m < numTeams; m++ ) {
     var doIt=true;
//     if(mode=="all") doIt = true; 
//     if(mode.indexOf(franchiseArray[parseInt(thisArray[m][0]-1)][0])!=-1) var doIt = true;
//     if(mode=="byDivision"&&franchiseArray[parseInt(thisArray[m][0]-1)][2]==i) var doIt=true;
//     if(mode=="byConference"&&parseInt(divisionArray[parseInt(franchiseArray[parseInt(thisArray[m][0]-1)][2],10)][2],10)==i) var doIt=true;
     if(doIt) {
      if(m % 2 == 0) {
       if(iconURL=="")
        tempXML += " <tr class='oddtablerow'"  + oddRow +  ">\n  <td align='center' style='border-right: 1px solid black;'>"  +  franchiseArray[key[m][0]][1] + "</td>\n";
       else
        tempXML += " <tr class='oddtablerow'"  + oddRow +  ">\n  <td align='center' style='border-right: 1px solid black;'><img src='"  +  iconURL + key[m][0] + ".gif' alt='" + franchiseArray[key[m][0]][1] + "' /></td>\n";
      } else {
       if(iconURL=="")
        tempXML += " <tr class='eventablerow'" + evenRow + ">\n  <td align='center' style='border-right: 1px solid black;'>" + franchiseArray[key[m][0]][1] + "</td>\n";
       else
        tempXML += " <tr class='eventablerow'" + evenRow + ">\n  <td align='center' style='border-right: 1px solid black;'><img src='" + iconURL + key[m][0] + ".gif' alt='" + franchiseArray[key[m][0]][1] + "' /></td>\n";
      }
      for ( var n = 0; n < numTeams; n++ ) {
       var doIt=true;
//       if(mode=="all") doIt = true; 
//       if(mode.indexOf(franchiseArray[n][0])!=-1) var doIt = true;
//       if(mode=="byDivision"&&franchiseArray[parseInt(thisArray[n][0]-1)][2]==i) var doIt=true;
//       if(mode=="byConference"&&parseInt(divisionArray[parseInt(franchiseArray[parseInt(thisArray[n][0]-1)][2],10)][2],10)==i) var doIt=true;
       if(doIt) {
        if(key[m][0]==key[n][0]) { 
         tempXML += "  <td align='center'>¤</td>\n" 
        } else {
         var fid  = franchiseArray[key[m][0]][0];
         var fid2 = franchiseArray[key[n][0]][0];
         tempXML += "  <td align='center' style='white-space: nowrap;'>(" + thisArray[fid][fid2][0] + "-" + thisArray[fid][fid2][1] + "-" + thisArray[fid][fid2][2] + ")</td>\n";
        }
       } // END DO IT
      }
      tempXML += "  <td align='center' style='border-left: 1px solid black; white-space: nowrap;'>(" + thisArray[fid]['total'][0] + "-" + thisArray[fid]['total'][1] + "-" + thisArray[fid]['total'][2] + ")</td> <td align='center' style='border-left: 1px solid black; white-space: nowrap;'>" + thisArray[fid]['winpct'].toFixed(3) + "</td>\n </tr>\n";
     }
    }
    tempXML += "</tbody>\n</table>\n";
   } // FOR DIVISION OR CONFERENCE LOOPS
   if(enableCodeWriter) {
    tempXML = "<script language=\"JavaScript\" type=\"text/javascript\" src=\"http://nitrografixx.com/habman_js/habman_apps_ver3.js\"></script>\n\n" + tempXML;
    document.write('<br /><br /><br />Copy and paste the following HTML code to a home page message to create a play-all results table<br />')
    document.write('<textarea cols="130" rows="25" style="font-size: 12px;">' + tempXML + '</textarea>');
   } else {
    document.getElementById(divID).innerHTML = tempXML;
   }
  }

  function weeklyAllPlayTable(xmldoc) {
    var returnArray = new Array();
    var results = xmldoc.getElementsByTagName( "weeklyResults" );
    var week    = results[0].getAttribute( "week" );
    var results = xmldoc.getElementsByTagName( "franchise" );
    var scores  = new Array();
    for ( var i = 0; i < results.length; i++ ) {
     var fid = results[i].getAttribute( "id" );
     scores[fid] = parseFloat(results[i].getAttribute( "score" ),10);
     try {
      if(scoreAdjustments[week][fid]!=undefined) scores[fid] = scores[fid] + scoreAdjustments[week][fid];
     } catch (er) {
      // do Nothing
     }
    }
    for ( var i = 0; i < results.length; i++) {
     var fid = franchiseArray[i][0];
     returnArray[fid] = new Array;
     for ( var j = 0; j < results.length; j++) {
      var fid2 = franchiseArray[j][0];
      if(scores[fid]>scores[fid2]) returnArray[fid][fid2] = [1,0,0]; 
       else if (scores[fid]<scores[fid2]) returnArray[fid][fid2] = [0,1,0]; 
             else returnArray[fid][fid2] = [0,0,1]; 
     }
    }
    return returnArray;
  }

  function doAllPlayTable(divID) {
    var allPlayArray = new Array(); 
    for ( var i = 0; i < numTeams; i++ ) { 
     var fid = franchiseArray[i][0];
     allPlayArray[fid] = new Array();        // This for-next loop creates all the multi-dimensional arrays required
     allPlayArray[fid]['total'] = [0,0,0]; 
     allPlayArray[fid]['winpct'] =  0;
     for ( var j = 0; j < numTeams; j++ ) {  
      var fid2 = franchiseArray[j][0];
      allPlayArray[fid][fid2] = [0,0,0];     // [W,L,T]
     }
    }
    for (var i = 1; i <= completedWeek; i++) {
     var currentFile = currentBaseURL+"/"+year+"/export?L="+league_id+"&TYPE=weeklyResults&rand=" + Math.random() + "&W=" + i;
     var thisWeekArray = new Array();
     thisWeekArray = synchronousXMLRequest(currentFile, 'weeklyAllPlayTable', 'weeklyResults',true);
     for(var j=0; j<numTeams; j++) {
      var fid = franchiseArray[j][0];
      for(var k=0; k<numTeams; k++) {
       var fid2 = franchiseArray[k][0];
       allPlayArray[fid][fid2][0]    += thisWeekArray[fid][fid2][0];
       allPlayArray[fid][fid2][1]    += thisWeekArray[fid][fid2][1];
       allPlayArray[fid][fid2][2]    += thisWeekArray[fid][fid2][2];
       if(j!=k) {
        allPlayArray[fid]['total'][0] += thisWeekArray[fid][fid2][0];
        allPlayArray[fid]['total'][1] += thisWeekArray[fid][fid2][1];
        allPlayArray[fid]['total'][2] += thisWeekArray[fid][fid2][2];
       }
      }
      if((allPlayArray[fid]['total'][0] + allPlayArray[fid]['total'][1] + allPlayArray[fid]['total'][2]) > 0) 
       allPlayArray[fid]['winpct']    = ( allPlayArray[fid]['total'][0] + 0.5 * allPlayArray[fid]['total'][2] ) / ( allPlayArray[fid]['total'][0] + allPlayArray[fid]['total'][1] + allPlayArray[fid]['total'][2] );
      else 
       allPlayArray[fid]['winpct']    =  0;
     } 
    } 
    createAllPlayTable(divID,allPlayArray)
  }


// THE FOLLOWING FUNCTIONS ARE USED FOR MY SCORING SUMMARY APP
  function createScoringSummaryTable(divID,thisArray,weeksToCount,weeksTotal) {
   var key = new Array();
   var adjustments = "* Weeks are not included in final points totals<br /><b>Note:</b> Overtime points have been removed from all team scores for this table.<br />\n";
   var weeklyAdjustments = new Array();
   for ( var i = 0; i < numTeams; i++ ) { 
    key[i] = new Array(i,franchiseArray[i][0],thisArray[franchiseArray[i][0]]['total']);
   }
   for ( var i = 1; i <= weeksTotal; i++ ) { 
     weeklyAdjustments[i] = "";
   }
   key = habmanBubbleSort(key,numTeams,2,0);    
   var tempXML = "";
   tempXML += "<table border='0' cellspacing='1' align='center' class='homepagemodule report' id='summarytable'>\n<caption><span>Weekly Scoring Summary</span></caption>\n<tbody>\n";
   tempXML += " <tr class='eventablerow'>\n  <th style='border-bottom: 1px solid black; border-right: 1px solid black;'>&nbsp;</th>\n";
   for ( var m = 1; m <= weeksTotal; m++ ) {  
    if(m>weeksToCount) var asterisk = "*"; else var asterisk = "";
    tempXML += "  <th align='center' style='border-bottom: 1px solid black;'>" + m + asterisk + "</th>\n"; 
   }
   tempXML += "  <th align='center' style='border-bottom: 1px solid black; border-left: 1px solid black;'>Total</th><th align='center' style='border-bottom: 1px solid black; border-left: 1px solid black;'>Avg.</th>\n </tr>\n";
   for ( var m = 0; m <= numTeams; m++ ) {
    try { var fid  = franchiseArray[key[m][0]][0]; } catch(er) { var fid = '0000'; }
    if(m % 2 == 0) {
     if(m==numTeams) {
      tempXML += " <tr class='oddtablerow'>\n  <th align='center' style='border-right: 1px solid black; border-top: 1px solid black;'>Avg.</th>\n";
     } else {
      if(iconURL=="")
       tempXML += " <tr class='oddtablerow'>\n  <td align='center' style='border-right: 1px solid black;'>"  +  franchiseArray[key[m][0]][1] + "</td>\n";
      else
       tempXML += " <tr class='oddtablerow'>\n  <td align='center' style='border-right: 1px solid black;'><img src='"  +  iconURL + key[m][0] + ".gif' alt='" + franchiseArray[key[m][0]][1] + "' /></td>\n";
     } 
    } else {
     if(m==numTeams) {
      tempXML += " <tr class='eventablerow'>\n  <th align='center' style='border-right: 1px solid black; border-top: 1px solid black;'>Avg.</th>\n";
     } else {
      if(iconURL=="")
       tempXML += " <tr class='eventablerow'>\n  <td align='center' style='border-right: 1px solid black;'>" + franchiseArray[key[m][0]][1] + "</td>\n";
      else
       tempXML += " <tr class='eventablerow'>\n  <td align='center' style='border-right: 1px solid black;'><img src='" + iconURL + key[m][0] + ".gif' alt='" + franchiseArray[key[m][0]][1] + "' /></td>\n";
     }
    }
    for ( var n = 1; n <= weeksTotal; n++ ) {
     if(n>completedWeek) {
      if(m==numTeams)
       tempXML += "  <th align='center' style='border-top: 1px solid black;'>-</th>\n" ;
      else
       tempXML += "  <td align='center'>-</td>\n" ;
     } else {
      if(m==numTeams)
       tempXML += "  <th align='center' style='white-space: nowrap; border-top: 1px solid black;'>" + thisArray['0000'][n].toFixed(1) + "</th>\n";
      else
       tempXML += "  <td align='center' style='white-space: nowrap;'>" + thisArray[fid][n] + "</td>\n";
     }
     try {
      if(scoreAdjustments[n][fid]!=undefined) weeklyAdjustments[n] += " " + franchiseArray[key[m][0]][1] + " (" + scoreAdjustments[n][fid] + ")&nbsp;&nbsp;&nbsp;";
     } catch (er) {
      // do Nothing
     }
    }
    if(m==numTeams) {
     tempXML += "  <th align='center' style='border-left: 1px solid black; border-top: 1px solid black; white-space: nowrap;'>" + thisArray['0000']['total'].toFixed(1) + "</th> <th align='center' style='border-left: 1px solid black; border-top: 1px solid black; white-space: nowrap;'>" + thisArray['0000']['avg'].toFixed(1) + "</th>\n </tr>\n";
    } else {
     var average = thisArray[fid]['total']/completedWeek;
     tempXML += "  <td align='center' style='border-left: 1px solid black; white-space: nowrap;'>" + thisArray[fid]['total'] + "</td> <td align='center' style='border-left: 1px solid black; white-space: nowrap;'>" + average.toFixed(1) + "</td>\n </tr>\n";
    }
   }
   for ( var n = 1; n <= weeksTotal; n++ ) {
    if(weeklyAdjustments[n] != "") adjustments += "&nbsp;<b>Week " + n + ":</b> &nbsp;&nbsp;" + weeklyAdjustments[n] + "<br />";
   }
   tempXML += " <tr class='oddtablerow'>\n  <td align='left' colspan='" + (weeksTotal+3) + "' style='border-top: 1px solid black;'>" + adjustments + "</td>\n </tr>\n";
   tempXML += "</tbody>\n</table>\n";
   if(enableCodeWriter) {
    tempXML = "<script language=\"JavaScript\" type=\"text/javascript\" src=\"http://nitrografixx.com/habman_js/habman_apps_ver3.js\"></script>\n\n" + tempXML;
    document.write('<br /><br /><br />Copy and paste the following HTML code to a home page message to create a play-all results table<br />')
    document.write('<textarea cols="130" rows="25" style="font-size: 12px;">' + tempXML + '</textarea>');
   } else {
    document.getElementById(divID).innerHTML = tempXML;
   }
  }

  function weeklyScores(xmldoc) {
    var results = xmldoc.getElementsByTagName( "weeklyResults" );
    var week    = results[0].getAttribute( "week" );
    var results = xmldoc.getElementsByTagName( "franchise" );
    var scores  = new Array();
    for ( var i = 0; i < results.length; i++ ) {
     var fid = results[i].getAttribute( "id" );
     scores[fid] = parseFloat(results[i].getAttribute( "score" ),10);
     try {
      if(scoreAdjustments[week][fid]!=undefined) scores[fid] = scores[fid] + scoreAdjustments[week][fid];
     } catch (er) {
      // do Nothing
     }
    }
    return scores;
  }

  function doScoringSummaryTable(divID,weeksToCount,weeksTotal) {
    var summaryArray = new Array(); 
    for ( var i = 0; i < numTeams; i++ ) { 
     var fid = franchiseArray[i][0];
     summaryArray[fid] = new Array();        // This for-next loop creates all the multi-dimensional arrays required
     summaryArray[fid]['total'] = 0; 
    }
    summaryArray['0000'] = new Array;
    summaryArray['0000']['total'] = 0;
    for (var i = 1; i <= weeksTotal; i++) {
     var currentFile = currentBaseURL+"/"+year+"/export?L="+league_id+"&TYPE=weeklyResults&rand=" + Math.random() + "&W=" + i;
     var thisWeekArray = new Array();
     summaryArray['0000'][i] = 0;
     thisWeekArray = synchronousXMLRequest(currentFile, 'weeklyScores', 'weeklyResults',true);
     for(var j=0; j<numTeams; j++) {
      var fid = franchiseArray[j][0];
      summaryArray[fid][i] = thisWeekArray[fid];
      if(i<=weeksToCount) summaryArray[fid]['total']    += thisWeekArray[fid];
      summaryArray['0000'][i]       += thisWeekArray[fid];
      if(i<=weeksToCount) summaryArray['0000']['total'] += thisWeekArray[fid];
     } 
     summaryArray['0000'][i]       = summaryArray['0000'][i]/numTeams;
    } 
    if(weeksToCount>=completedWeek) var divisor = completedWeek; else var divisor = weeksToCount;
    summaryArray['0000']['total'] = summaryArray['0000']['total']/numTeams; 
    summaryArray['0000']['avg']   = summaryArray['0000']['total']/divisor; 
    createScoringSummaryTable(divID,summaryArray,weeksToCount,weeksTotal);
  }




// THE FOLLOWING FUNCTIONS ARE USED FOR MY BRIEF POWER TABLE APPS

  function createBriefPowerTable(arrayName, top, currentTable, field, className) {
   for ( var n = 0; n < top; n++ ) {
    var r=n+1
    var link = baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + arrayName[n][1] + "&O=01";
    if(n % 2 == 0)
     currentTable += " <tr class='oddtablerow'><td class='rank' align='right'>"  + r + "</td><td class='fname' style='text-align: left;'>&nbsp;<a href='" + link + "'>" + arrayName[n][2] + "</a></td><td class='" + className + "' align='center'>" + arrayName[n][field] + "</td></tr>\n";
    else
     currentTable += " <tr class='eventablerow'><td class='rank' align='right'>" + r + "</td><td class='fname' style='text-align: left;'>&nbsp;<a href='" + link + "'>" + arrayName[n][2] + "</a></td><td class='" + className + "' align='center'>" + arrayName[n][field] + "</td></tr>\n";
   } 
   currentTable += "</table>\n";
   return currentTable;
  }

  function doBriefPowerTables(standings_request) {
   var powerRankTable = "";
   var victoryPointTable = "";
   var allPlayTable = "";

   powerRankTable += "<table border='0' cellspacing='1' align='center' class='homepagemodule report' id='brief_powerrank'>\n";
   powerRankTable += " <tr class='header_power'><th class='rank'>#</th><th class='fname'>Franchise</th><th class='pwscore'>Power Rank</th></tr>\n";

   victoryPointTable += "<table border='0' cellspacing='1' align='center' class='homepagemodule report' id='brief_victorypoint'>\n";
   victoryPointTable += " <tr class='header_vp'><th class='rank'>#</th><th class='fname'>Franchise</th><th class='vpscore'>Victory Pts</th></tr>\n";

   allPlayTable += "<table border='0' cellspacing='1' align='center' class='homepagemodule report' id='brief_allplay'>\n";
   allPlayTable += " <tr class='header_ap'><th class='rank'>#</th><th class='fname'>Franchise</th><th class='apscore'>All-Play Wins</th></tr>\n";

   standingsArray = habmanBubbleSort(standingsArray,numTeams,16,0); powerRankTable    = createBriefPowerTable(standingsArray,5,powerRankTable,16,'pwscore');
   standingsArray = habmanBubbleSort(standingsArray,numTeams,17,0); victoryPointTable = createBriefPowerTable(standingsArray,5,victoryPointTable,17,'vpscore');
   standingsArray = habmanBubbleSort(standingsArray,numTeams,18,0); allPlayTable      = createBriefPowerTable(standingsArray,5,allPlayTable,18,'apscore');

   window.document.getElementById("xml_powerrank").innerHTML    = powerRankTable;
   window.document.getElementById("xml_victorypoint").innerHTML = victoryPointTable;
   window.document.getElementById("xml_allplay").innerHTML      = allPlayTable;
  }










// THE FOLLOWING FUNCTIONS ARE USED FOR MY HEAD TO HEAD APPS

  function doHeadToHeadArray() {   
   if(headToHeadArraySet==false||(showScores!=didShowScores)) { // Run this only one time unless we have to redo table due to showScores
    didShowScores = showScores;
    headToHeadArray = new Array();            // Need to set up Head to Head Array here after determining Number of teams in league
    sosArray        = new Array();
    sovArray        = new Array();
    for ( var f = 0; f <= numTeams; f++ ) {   // Adding one extra to accomodate League Average if necessary
     headToHeadArray[f] = new Array();        // This for-next loop creates all the multi-dimensional arrays required
     sosArray[f] = new Array();
     sovArray[f] = new Array();
     for ( var t = 0; t <= numTeams; t++ ) {      
      headToHeadArray[f][t] = ["*",0,0,"",0,0,0,0,0,""]; // [WLT text, +1 for W; -1 for L; 0 for tie, Games Played Head to Head, title text, wins, losses, ties, points scored, tooltip text]
      sosArray[f] = [0,0,0,0,0,0];                       // [Opp. Overall W, Opp. Overall L, Opp. Overall T, Opp. Overall PF, SOS record, SOS %]
      sovArray[f] = [0,0,0,0,0,0];                       // [Opp. Overall W, Opp. Overall L, Opp. Overall T, Opp. Overall PF, SOV record, SOV %]
     }
    }
    synchronousXMLRequest(weeklyResultsFile, 'createHeadToHeadArray', 'weeklyResults',false) 
    headToHeadArraySet=true;
   }
  }

  function createHeadToHeadArray (weeklyResults_request) {   // Also will create sosArray (Strength of Schedule) and sovArray (Strength of Victory)
   // First we must get the current week from the Weekly Results XML File
   var results = weeklyResults_request.getElementsByTagName( "weeklyResults" );
   try {
    var currentWeek = results[0].getAttribute( "week" );
   } catch(er) {
    hthAttemptXML++;
    if(hthAttemptXML < 2) { //Try one extra time to get head-to-head data as it sometimes fails in Firefox
     synchronousXMLRequest(weeklyResultsFile, 'createHeadToHeadArray', 'weeklyResults',false);
    }
    return false;
   }
   if(currentWeek > lastRegularSeasonWeek) currentWeek = lastRegularSeasonWeek;
   // Now loop through all the weeks to get head to head results
   for ( var w = 1; w <= currentWeek; w++ ) {
    activeWeek = w;
    var currentFile = weeklyResultsFile + w;
    synchronousXMLRequest(currentFile, 'fillHeadToHeadArray', 'weeklyResults',false) 
   }
   for ( var n = 0; n < numTeams; n++ ) {
    if((sosArray[n][0] + sosArray[n][1] + sosArray[n][2])!=0) 
     sosArray[n][5] = parseInt((sosArray[n][0] + (sosArray[n][2]*0.5))*1000 / (sosArray[n][0] + sosArray[n][1] + sosArray[n][2]))/1000;  
     sosArray[n][4] = sosArray[n][0] + '-' + sosArray[n][1] + '-' + sosArray[n][2];
     standingsArray[n][42] = sosArray[n][4];
     standingsArray[n][43] = sosArray[n][5];
    if((sovArray[n][0] + sovArray[n][1] + sovArray[n][2])!=0) 
     sovArray[n][5] = parseInt((sovArray[n][0] + (sovArray[n][2]*0.5))*1000 / (sovArray[n][0] + sovArray[n][1] + sovArray[n][2]))/1000;  
     sovArray[n][4] = sovArray[n][0] + '-' + sovArray[n][1] + '-' + sovArray[n][2];
     standingsArray[n][44] = sovArray[n][4];
     standingsArray[n][45] = sovArray[n][5];
   }
  }

  function fillHeadToHeadArray (xmldoc) {
   var skipMatchup = false;
   var results     = xmldoc.getElementsByTagName( "franchise" );
   var matchup     = xmldoc.getElementsByTagName( "matchup" );
   var numMatchups = matchup.length;
   for ( var m = 0; m < numMatchups; m++ ) {
    var awayIndex = m * 2; 
    var homeIndex = m * 2 + 1; 
    var awayIDStr = results[awayIndex].getAttribute( "id" );
    var homeIDStr = results[homeIndex].getAttribute( "id" );
    var awayID = parseInt(awayIDStr,10)-1;
    var homeID = parseInt(homeIDStr,10)-1;
    if(awayIDStr=="AVG") { awayID=numTeams; leagueAverage=true; }
    if(homeIDStr=="AVG") { homeID=numTeams; leagueAverage=true; }
    if(leagueAverage&&!leagueAverageCreated) { 
     franchiseArray[numTeams] = new Array();
     franchiseArray[numTeams] = [parseInt(numTeams,10)+1,"Average",0];
     standingsArray[numTeams] = new Array();
     standingsArray[numTeams] = [0,0,0,0,0,0,"n/a"];
     leagueAverageCreated     = true;
    }
    if(awayIDStr=="BYE"||homeIDStr=="BYE") skipMatchup = true;
    if(!skipMatchup) {
     var awayScore = parseFloat(results[awayIndex].getAttribute( "score" ));
     var homeScore = parseFloat(results[homeIndex].getAttribute( "score" ));
     if(awayScore>homeScore)  { 
      if(showScores) var awayResult='<font color="green">' + awayScore + '</font>'; else var awayResult='<font color="green">W</font>'; 
      if(showScores) var homeResult='<font color="red">'   + homeScore + '</font>'; else var homeResult='<font color="red">L</font>'; 
      var awayCount = 1; 
      var homeCount = -1;
      var awayTitle = 'Week #' + activeWeek + ': ' + franchiseArray[awayID][1] + ' ' + awayScore + ' defeated ' + franchiseArray[homeID][1] + ' ' + homeScore;
      var homeTitle = 'Week #' + activeWeek + ': ' + franchiseArray[homeID][1] + ' ' + homeScore + ' lost to '  + franchiseArray[awayID][1] + ' ' + awayScore;
      var awayWin  = 1;
      var homeWin  = 0;
      var awayLoss = 0;
      var homeLoss = 1;
      var awayTie  = 0;
      var homeTie  = 0;
      sovArray[awayID][0] += standingsArray[homeID][3];
      sovArray[awayID][1] += standingsArray[homeID][4];
      sovArray[awayID][2] += standingsArray[homeID][5];
      sovArray[awayID][3] += standingsArray[homeID][8];
     }
     if(awayScore<homeScore)  { 
      if(showScores) var awayResult='<font color="red">'   + awayScore + '</font>'; else var awayResult='<font color="red">L</font>'; 
      if(showScores) var homeResult='<font color="green">' + homeScore + '</font>'; else var homeResult='<font color="green">W</font>'; 
      var awayCount = -1; 
      var homeCount = 1;
      var awayTitle = 'Week #' + activeWeek + ': ' + franchiseArray[awayID][1] + ' ' + awayScore + ' lost to '  + franchiseArray[homeID][1] + ' ' + homeScore;
      var homeTitle = 'Week #' + activeWeek + ': ' + franchiseArray[homeID][1] + ' ' + homeScore + ' defeated ' + franchiseArray[awayID][1] + ' ' + awayScore;
      var awayWin  = 0;
      var homeWin  = 1;
      var awayLoss = 1;
      var homeLoss = 0;
      var awayTie  = 0;
      var homeTie  = 0;
      sovArray[homeID][0] += standingsArray[awayID][3];
      sovArray[homeID][1] += standingsArray[awayID][4];
      sovArray[homeID][2] += standingsArray[awayID][5];
      sovArray[homeID][3] += standingsArray[awayID][8];
     }
     if(awayScore==homeScore) {
      if(showScores) var awayResult=awayScore; else var awayResult='T'; 
      if(showScores) var homeResult=homeScore; else var homeResult='T'; 
      var awayCount = 0;  
      var homeCount = 0;
      var awayTitle = 'Week #' + activeWeek + ': ' + franchiseArray[awayID][1] + ' ' + awayScore + ' tied ' + franchiseArray[homeID][1] + ' ' + homeScore;
      var homeTitle = 'Week #' + activeWeek + ': ' + franchiseArray[homeID][1] + ' ' + homeScore + ' tied ' + franchiseArray[awayID][1] + ' ' + awayScore;
      var awayWin  = 0;
      var homeWin  = 0;
      var awayLoss = 0;
      var homeLoss = 0;
      var awayTie  = 1;
      var homeTie  = 1;
     }
     sosArray[awayID][0] += standingsArray[homeID][3];
     sosArray[homeID][0] += standingsArray[awayID][3];
     sosArray[awayID][1] += standingsArray[homeID][4];
     sosArray[homeID][1] += standingsArray[awayID][4];
     sosArray[awayID][2] += standingsArray[homeID][5];
     sosArray[homeID][2] += standingsArray[awayID][5];
     sosArray[awayID][3] += standingsArray[homeID][8];
     sosArray[homeID][3] += standingsArray[awayID][8];
     if(headToHeadArray[homeID][awayID][0]=="*") {
      headToHeadArray[homeID][awayID][0] = homeResult;
      headToHeadArray[homeID][awayID][1] = homeCount;
      headToHeadArray[homeID][awayID][2] = 1;
      headToHeadArray[homeID][awayID][3] = homeTitle;
      headToHeadArray[homeID][awayID][4] = homeWin;
      headToHeadArray[homeID][awayID][5] = homeLoss;
      headToHeadArray[homeID][awayID][6] = homeTie;
      headToHeadArray[homeID][awayID][7] = homeScore;
      headToHeadArray[homeID][awayID][8] = homeTitle;
      headToHeadArray[awayID][homeID][0] = awayResult; 
      headToHeadArray[awayID][homeID][1] = awayCount; 
      headToHeadArray[awayID][homeID][2] = 1; 
      headToHeadArray[awayID][homeID][3] = awayTitle;
      headToHeadArray[awayID][homeID][4] = awayWin;
      headToHeadArray[awayID][homeID][5] = awayLoss;
      headToHeadArray[awayID][homeID][6] = awayTie;
      headToHeadArray[awayID][homeID][7] = awayScore;
      headToHeadArray[awayID][homeID][8] = awayTitle;
     } else { 
      headToHeadArray[homeID][awayID][0] += ','  + homeResult;
      headToHeadArray[homeID][awayID][1] += homeCount;
      headToHeadArray[homeID][awayID][2] += 1;
      headToHeadArray[homeID][awayID][3] += '\n' + homeTitle;
      headToHeadArray[homeID][awayID][4] += homeWin;
      headToHeadArray[homeID][awayID][5] += homeLoss;
      headToHeadArray[homeID][awayID][6] += homeTie;
      headToHeadArray[homeID][awayID][7] += homeScore;
      headToHeadArray[homeID][awayID][8] += '<br />' + homeTitle;
      headToHeadArray[awayID][homeID][0] += ','  + awayResult;
      headToHeadArray[awayID][homeID][1] += awayCount;
      headToHeadArray[awayID][homeID][2] += 1;
      headToHeadArray[awayID][homeID][3] += '\n' + awayTitle;
      headToHeadArray[awayID][homeID][4] += awayWin;
      headToHeadArray[awayID][homeID][5] += awayLoss;
      headToHeadArray[awayID][homeID][6] += awayTie;
      headToHeadArray[awayID][homeID][7] += awayScore;
      headToHeadArray[awayID][homeID][8] += '<br />' + awayTitle;
     }
    } //END IF !SkipMatchup
    skipMatchup = false;
   }
  }

  function doHeadToHeadTable(divID,which) {
   if(which == undefined) { var which; var mode = "all"; } else var mode = which;
   var oddRow       = "";
   var evenRow      = "";
   var columnHilite = "";
   var thisArray    = standingsArray;
   thisArray = habmanBubbleSort(thisArray,numTeams,7,0); 
   if(!disableHilite) {
    oddRow        = " onmouseover=\"this.className='hilitetablerow'\" onmouseout=\"this.className='oddtablerow'\"";
    evenRow       = " onmouseover=\"this.className='hilitetablerow'\" onmouseout=\"this.className='eventablerow'\"";
    columnHilite  = " onmouseover='setColColor(event,this,\"tan\")' onmouseout='setColColor(event,this,\"\")'";
   }
   if(leagueAverage) var teams=parseInt(numTeams,10)+1; else var teams=numTeams;
   var tempXML = "";
   var loops = 1;
   var title = "";
   if(mode=="byDivision")   loops = numDivisions;
   if(mode=="byConference") loops = numConferences;
   for (var i = 0; i < loops; i++) {
    if(mode=="byDivision")   title = "<br />" + divisionArray[i][1];;
    if(mode=="byConference") title = "<br />" + conferenceArray[i][1];
    tempXML += "<table border='0' cellspacing='1' align='center' class='homepagemodule report' id='headtoheadresults'" + columnHilite + ">\n<caption><span>Head-To-Head Results" + title + "</span></caption>\n<tbody>\n";
    tempXML += " <tr class='eventablerow'>\n  <td style='border-bottom: 1px solid black; border-right: 1px solid black;'>&nbsp;</td>\n";
    for ( var m = 0; m < teams; m++ ) {  
     var doIt=false;
     if(mode=="all") doIt = true; 
     if(mode.indexOf(franchiseArray[parseInt(thisArray[m][0]-1)][0])!=-1) var doIt = true;
     if(mode=="byDivision"&&franchiseArray[parseInt(thisArray[m][0]-1)][2]==i) var doIt=true;
     if(mode=="byConference"&&parseInt(divisionArray[parseInt(franchiseArray[parseInt(thisArray[m][0]-1)][2],10)][2],10)==i) var doIt=true;
     if(doIt) {
      var temp                        = "  <td align='center' style='border-bottom: 1px solid black;' title='" + franchiseArray[parseInt(thisArray[m][0]-1)][1] + "'>" + (parseInt(thisArray[m][0]-1)+1) + "</td>\n"; 
      if(truncName>0)            temp = "  <td align='center' style='border-bottom: 1px solid black;' title='" + franchiseArray[parseInt(thisArray[m][0]-1)][1] + "'>" + franchiseArray[parseInt(thisArray[m][0]-1)][1].substr(0,truncName) + "</td>\n";
      if(teamNickNames.length>0) temp = "  <td align='center' style='border-bottom: 1px solid black;' title='" + franchiseArray[parseInt(thisArray[m][0]-1)][1] + "'>" + teamNickNames[parseInt(franchiseArray[parseInt(thisArray[m][0]-1)][0],10)-1] + "</td>\n"; 
      if(iconURL!="")            temp = "  <td align='center' style='border-bottom: 1px solid black;'><img src='" + iconURL + parseInt(thisArray[m][0]-1) + ".gif' alt='" + franchiseArray[parseInt(thisArray[m][0]-1)][1] + "' /></td>\n"; 
      tempXML += temp;
     }
    }
    tempXML += "  <td align='center' style='border-bottom: 1px solid black; border-left: 1px solid black;'>Overall</td>\n </tr>\n";
    for ( var m = 0; m < teams; m++ ) {
     var doIt=false;
     if(mode=="all") doIt = true; 
     if(mode.indexOf(franchiseArray[parseInt(thisArray[m][0]-1)][0])!=-1) var doIt = true;
     if(mode=="byDivision"&&franchiseArray[parseInt(thisArray[m][0]-1)][2]==i) var doIt=true;
     if(mode=="byConference"&&parseInt(divisionArray[parseInt(franchiseArray[parseInt(thisArray[m][0]-1)][2],10)][2],10)==i) var doIt=true;
     if(doIt) {
      if(m % 2 == 0) {
       if(iconURL=="")
        tempXML += " <tr class='oddtablerow'"  + oddRow +  ">\n  <td align='center' style='border-right: 1px solid black;'>"  +  franchiseArray[parseInt(thisArray[m][0]-1)][1] + "</td>\n";
       else
        tempXML += " <tr class='oddtablerow'"  + oddRow +  ">\n  <td align='center' style='border-right: 1px solid black;'><img src='"  +  iconURL + parseInt(thisArray[m][0]-1) + ".gif' alt='" + franchiseArray[parseInt(thisArray[m][0]-1)][1] + "' /></td>\n";
      } else {
       if(iconURL=="")
        tempXML += " <tr class='eventablerow'" + evenRow + ">\n  <td align='center' style='border-right: 1px solid black;'>" + franchiseArray[parseInt(thisArray[m][0]-1)][1] + "</td>\n";
       else
        tempXML += " <tr class='eventablerow'" + evenRow + ">\n  <td align='center' style='border-right: 1px solid black;'><img src='" + iconURL + parseInt(thisArray[m][0]-1) + ".gif' alt='" + franchiseArray[parseInt(thisArray[m][0]-1)][1] + "' /></td>\n";
      }
      for ( var n = 0; n < teams; n++ ) {
       var doIt=false;
       if(mode=="all") doIt = true; 
       if(mode.indexOf(franchiseArray[parseInt(thisArray[n][0]-1)][0])!=-1) var doIt = true;
       if(mode=="byDivision"&&franchiseArray[parseInt(thisArray[n][0]-1)][2]==i) var doIt=true;
       if(mode=="byConference"&&parseInt(divisionArray[parseInt(franchiseArray[parseInt(thisArray[n][0]-1)][2],10)][2],10)==i) var doIt=true;
       if(doIt) {
        if(m==n) { 
         tempXML += "  <td align='center'>¤</td>\n" 
        } else {
           if(headToHeadArray[parseInt(thisArray[m][0],10)-1][parseInt(thisArray[n][0],10)-1][0] != "*") {
            if(useToolTip2)
             tempXML += "  <td align='center' onmouseover=\"app3_fixedtooltip('" + headToHeadArray[parseInt(thisArray[m][0],10)-1][parseInt(thisArray[n][0],10)-1][8] + "',this,event,'325px');\" onmouseout=\"app3_delayhidetip();\"><b>" + headToHeadArray[parseInt(thisArray[m][0],10)-1][parseInt(thisArray[n][0],10)-1][0] + "</b></td>\n"     
            else
             tempXML += "  <td align='center' title='" + headToHeadArray[parseInt(thisArray[m][0],10)-1][parseInt(thisArray[n][0],10)-1][3] + "'><b>" + headToHeadArray[parseInt(thisArray[m][0],10)-1][parseInt(thisArray[n][0],10)-1][0] + "</b></td>\n"     
           } else {
            tempXML += "  <td align='center'>-</td>\n" 
           } 
        }
       } // END DO IT
      }
      tempXML += "  <td align='center' style='border-left: 1px solid black;'>" + standingsArray[m][6] + "</td>\n </tr>\n";
     }
    }
    tempXML += "</tbody>\n</table>\n";
   } // FOR DIVISION OR CONFERENCE LOOPS
   if(enableCodeWriter) {
    tempXML = "<script language=\"JavaScript\" type=\"text/javascript\" src=\"http://nitrografixx.com/habman_js/habman_apps_ver3.js\"></script>\n\n" + tempXML;
    document.write('<br /><br /><br />Copy and paste the following HTML code to a home page message to create a head to head results table<br />')
    document.write('<textarea cols="130" rows="25" style="font-size: 12px;">' + tempXML + '</textarea>');
   } else {
    document.getElementById(divID).innerHTML = tempXML;
   }
  }









// THE FOLLOWING FUNCTIONS ARE USED FOR MY PLAYOFF APPS

  function sortHeadToHeadSweep(arrayName, length) { //if there is a three-way or more this test for head to head sweep and swept
   var sweep=false;
   var swept=false;
   var teamFound=-1;
   stepsText += " Sweep~";
   headToHeadSweep = false;
   headToHeadSwept = false;
   for (var i=0; i<length; i++) {
    sweep=true;
    swept=true;
    for (var j=0; j<length; j++) {
     if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][2] > 0) {
      if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][1]==0) {
       sweep=false; swept=false;
      } else {    
       if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][2]!=Math.abs(headToHeadArray[arrayName[i][0]][arrayName[j][0]][1])) { sweep=false; swept=false; }
       if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][2]==headToHeadArray[arrayName[i][0]][arrayName[j][0]][1]) swept=false;
       if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][2]==-1*headToHeadArray[arrayName[i][0]][arrayName[j][0]][1]) sweep=false;
      }
     } else {
      if(i!=j) { sweep=false; swept=false; }
     }
    } 
    if(sweep||swept) { teamFound=i; i=length; }
   }
   if(reverseTheOrder) {
    var temp=sweep;
    sweep=swept;
    swept=temp;
   }
   if(sweep) { 
    headToHeadSweep=true;
    teamsCurrentlyTied=1;
    arrayName = moveRow(arrayName,teamFound,0);
    headToHeadBrokeTie=true;
   }
   if(swept) { 
    headToHeadSwept=true;
    teamsCurrentlyTied-=1;
    arrayName = moveRow(arrayName,teamFound,teamsCurrentlyTied);
    if(teamsCurrentlyTied==1) headToHeadBrokeTie=true;
   }
   return arrayName;
  }

  function sortHeadToHeadWinPctStartOverRule (arrayName, length){
   var gamesPlayed;
   var wins;
   var losses;
   var ties;
   var allPlayed        = true;
   var onePlayedMinimum = true;
   var goodToGo         = true;
   for (var i=0; i<arrayName.length; i++) {
    if(!reverseTheOrder) {
     arrayName[i][8] = -1.000;  //Assign negative winning % to head to head for sorting purposes
    } else {
     arrayName[i][8] = 2.000;   //Assign 200 winning % to head to head for sorting purposes
    }
   }
   stepsText += " Winning Percentage~";
   for (var i=0; i<length; i++) {
    gamesPlayed=0; wins=0; losses=0; ties=0;
    for (var j=0; j<length; j++) {
     if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][2] > 0) { //GAMES PLAYED CHECK
      gamesPlayed += headToHeadArray[arrayName[i][0]][arrayName[j][0]][2];
      wins        += headToHeadArray[arrayName[i][0]][arrayName[j][0]][4];
      losses      += headToHeadArray[arrayName[i][0]][arrayName[j][0]][5];
      ties        += headToHeadArray[arrayName[i][0]][arrayName[j][0]][6];
     } else {
      if(i!=j) allPlayed = false;
     }
    } 
    arrayName[i][8] = parseInt((wins + 0.5*ties)*1000/gamesPlayed)/1000;
    if(arrayName[i][8].toString()=="NaN") {
     arrayName[i][8] = -0.0001;
     onePlayedMinimum = false;
    }
   }
   if(useWinPctRule==2&&!onePlayedMinimum) { 
    goodToGo=false;
    stepsText +=" . . . . not applicable since all the teams did not play at least one game~";
   }
   if(useWinPctRule==3&&!allPlayed) {
    goodToGo=false;
    stepsText +=" . . . . not applicable since the teams did not play at least one game against each other~";
   }
   if(!reverseTheOrder) 
    arrayName = habmanBubbleSort(arrayName,length,8,0); 
   else
    arrayName = habmanBubbleSort(arrayName,length,8,1);
   var newText = "    Current grouping (";
   for (var x = 0; x < length; x++) {
    newText += franchiseArray[arrayName[x][0]][1] + " " + decimalFormat(arrayName[x][8],3) + ", ";
   }
   newText = newText.substr(0,newText.length-2);
   newText += ")~";
   currentWinPctGrouping = newText;
   if(goodToGo) {
    if(arrayName[0][8]!=arrayName[1][8]) { // If one winner then set up return for sortTheseTeams
     headToHeadBrokeTie=true;
    } else {                               // else reset teamsCurrentlyTied eliminating bottom teams
     var teamCount = 1;
     for (var t=0; t<(arrayName.length-1); t++) {
      if(arrayName[t][8]==arrayName[t+1][8]) 
       teamCount++; 
      else 
       t=arrayName.length-1; 
     }
     if(teamsCurrentlyTied>teamCount) teamsCurrentlyTied = teamCount;
    }
   }
   stepsText += currentWinPctGrouping;
   return arrayName;
  }

  function sortHeadToHeadWinPctMFLRule (arrayName, length, previousTieBreak){
   var gamesPlayed;
   var wins;
   var losses;
   var ties;
   stepsText += " Winning Percentage~";
   if(headToHeadWinPctTeams<1) {
    headToHeadWinPctTeams=length;
    for (var i=0; i<arrayName.length; i++) {
     if(!reverseTheOrder) {
      arrayName[i][8] = -1.000;  //Assign negative winning % to head to head for sorting purposes
     } else {
      arrayName[i][8] = 2.000;   //Assign 200 winning % to head to head for sorting purposes
     }
    }
    for (var i=0; i<length; i++) {
     gamesPlayed=0; wins=0; losses=0; ties=0;
     for (var j=0; j<length; j++) {
      if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][2] > 0) { //GAMES PLAYED CHECK
       gamesPlayed += headToHeadArray[arrayName[i][0]][arrayName[j][0]][2];
       wins        += headToHeadArray[arrayName[i][0]][arrayName[j][0]][4];
       losses      += headToHeadArray[arrayName[i][0]][arrayName[j][0]][5];
       ties        += headToHeadArray[arrayName[i][0]][arrayName[j][0]][6];
      }
     } 
     arrayName[i][8] = parseInt((wins + 0.5*ties)*1000/gamesPlayed)/1000;
     if(arrayName[i][8].toString()=="NaN") { 
      arrayName[i][8] = -0.0001;
     }
    }
    if(!reverseTheOrder) 
     arrayName = habmanBubbleSort(arrayName,length,8,0); 
    else
     arrayName = habmanBubbleSort(arrayName,length,8,1);
    if(arrayName[0][8]!=arrayName[1][8]) { // If one winner then set up return for sortTheseTeams
     headToHeadBrokeTie=true;
    }
    var newText = "    Current grouping (";
    for (var x = 0; x < length; x++) {
     newText += franchiseArray[arrayName[x][0]][1] + " " + decimalFormat(arrayName[x][8],3) + ", ";
    }
    newText = newText.substr(0,newText.length-2);
    newText += ")~";
    currentWinPctGrouping = newText;
   }
   stepsText += currentWinPctGrouping;
   return arrayName;
  }

  function sortHthPointsScoredStartOverRule (arrayName, length){
   var pointsScored;
   for (var i=0; i<arrayName.length; i++) {
    if(!reverseTheOrder) {
     arrayName[i][18] = -10000;  //Assign -10000 for sorting purposes
    } else {
     arrayName[i][18] = 10000;   //Assign +10000 for sorting purposes
    }
   }
   stepsText += " Points Scored~";
   for (var i=0; i<length; i++) {
    pointsScored=0;
    for (var j=0; j<length; j++) {
     if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][2] > 0) { //GAMES PLAYED CHECK
      pointsScored += headToHeadArray[arrayName[i][0]][arrayName[j][0]][7];
     }
    } 
    arrayName[i][18] = pointsScored;
    if(arrayName[i][18].toString()=="NaN") arrayName[i][18] = 0;
   }
   if(!reverseTheOrder) 
    arrayName = habmanBubbleSort(arrayName,length,18,0); 
   else
    arrayName = habmanBubbleSort(arrayName,length,18,1);
   var newText = "    Current grouping (";
   for (var x = 0; x < length; x++) {
    newText += franchiseArray[arrayName[x][0]][1] + " " + decimalFormat(arrayName[x][18],scoringDecimals) + ", ";
   }
   newText = newText.substr(0,newText.length-2);
   newText += ")~";
   currentPointsScoredGrouping = newText;
   if(arrayName[0][18]!=arrayName[1][18]) { // If one winner then set up return for sortTheseTeams
    hthPointsScoredBrokeTie=true;
   } else {                               // else reset teamsCurrentlyTied eliminating bottom teams
    var teamCount = 1;
    for (var t=0; t<(arrayName.length-1); t++) {
     if(arrayName[t][18]==arrayName[t+1][18]) 
      teamCount++; 
     else 
      t=arrayName.length-1; 
    }
    if(teamsCurrentlyTied>teamCount) teamsCurrentlyTied = teamCount;
   }
   stepsText += currentPointsScoredGrouping;
   return arrayName;
  }

  function sortHthPointsScoredMFLRule (arrayName, length, previousTieBreak){
   var pointsScored;
   stepsText += " Points Scored~";
   if(hthPointsScoredTeams<1) {
    hthPointsScoredTeams=length;
    for (var i=0; i<arrayName.length; i++) {
     if(!reverseTheOrder) {
      arrayName[i][18] = -10000;  //Assign -10000 for sorting purposes
     } else {
      arrayName[i][18] = 10000;   //Assign +10000 for sorting purposes
     }
    }
    for (var i=0; i<length; i++) {
     pointsScored = 0;
     for (var j=0; j<length; j++) {
      if(headToHeadArray[arrayName[i][0]][arrayName[j][0]][2] > 0) { //GAMES PLAYED CHECK
       pointsScored += headToHeadArray[arrayName[i][0]][arrayName[j][0]][7];
      }
     } 
     arrayName[i][18] = pointsScored;
     if(arrayName[i][18].toString()=="NaN") arrayName[i][18] = 0;
    }
    if(!reverseTheOrder) 
     arrayName = habmanBubbleSort(arrayName,length,18,0); 
    else
     arrayName = habmanBubbleSort(arrayName,length,18,1);
    if(arrayName[0][18]!=arrayName[1][18]) { // If one winner then set up return for sortTheseTeams
     hthPointsScoredBrokeTie=true;
    }
    var newText = "    Current grouping (";
    for (var x = 0; x < length; x++) {
     newText += franchiseArray[arrayName[x][0]][1] + " " + decimalFormat(arrayName[x][18],scoringDecimals) + ", ";
    }
    newText = newText.substr(0,newText.length-2);
    newText += ")~";
    currentPointsScoredGrouping = newText;
   }
   stepsText += currentPointsScoredGrouping;
   return arrayName;
  }

  function sortHeadToHeadWinPct(arrayName, length, previousTieBreak) { //if there is a three-way or more this test for head to head win percent amongst the three teams
   if(useStartOverRule)
    arrayName = sortHeadToHeadWinPctStartOverRule (arrayName, length)
   else 
    arrayName = sortHeadToHeadWinPctMFLRule (arrayName, length, previousTieBreak)
   return arrayName;
  }

  function sortHthPointsScored(arrayName, length, previousTieBreak) { //if there is a three-way or more this test for head to head win percent amongst the three teams
   if(useStartOverRule)
    arrayName = sortHthPointsScoredStartOverRule (arrayName, length)
   else 
    arrayName = sortHthPointsScoredMFLRule (arrayName, length, previousTieBreak)
   return arrayName;
  }

  function sortHeadToHead(arrayName, length, previousTieBreak, secondaryRank) { // SORT HEAD TO HEAD
   var threeWayTie    = false;
   var rankTier       = 2;
   var sweepRan       = false;
   headToHeadBrokeTie = false;
   if(secondaryRank) rankTier=4;
   var goodToGo       = false; 
//   for (var i=0; i<(length-2); i++) {
//    if((arrayName[i][previousTieBreak]==arrayName[i+1][previousTieBreak])&&(arrayName[i][previousTieBreak]==arrayName[i+2][previousTieBreak])&&(playoffArray[arrayName[i][0]][rankTier]==0)) {// We need to find if there is a three way tie
//     threeWayTie = true;
//    }
//   }
   if(useSweepRule&&!doingDivision&&teamsCurrentlyTied>2) {
    arrayName = sortHeadToHeadSweep(arrayName,length);
    sweepRan=true;
   }
   if(!sweepRan) {
    switch (useWinPctRule) {
     case 0 : { if(teamsCurrentlyTied>2) {
                 stepsText += " . . . . not applicable since more than two teams are tied~";
                } else {
                 goodToGo = true;
                }
                break; 
              }
     case 1 : { goodToGo = true; break; }
     case 2 : { goodToGo = true; break; }
     case 3 : { goodToGo = true; break; }
    }
    if(goodToGo) arrayName = sortHeadToHeadWinPct(arrayName,length,previousTieBreak);
   }
//   if(!threeWayTie&&!useWinPctRule) {
//    for (var i=0; i<(length-1); i++) {
//     if(secondaryRank) rankTier=4;
//     if((arrayName[i][previousTieBreak]==arrayName[i+1][previousTieBreak])&&(playoffArray[arrayName[i][0]][rankTier]==0)) { // We need to find which teams are tied and if they aren't already seeded (even though they shouldn't be).
//      if(headToHeadArray[arrayName[i][0]][arrayName[i+1][0]][1] != 0) 
//       headToHeadBrokeTie = true;
//      if(!reverseTheOrder) {
//       if(headToHeadArray[arrayName[i][0]][arrayName[i+1][0]][1] < 0) {  // Current team lost to next team
//        var dummy = arrayName[i];  
//        arrayName[i] = arrayName[i+1]; 
//        arrayName[i+1] = dummy; 
//       }
//      } else {
//       if(headToHeadArray[arrayName[i][0]][arrayName[i+1][0]][1] > 0) {  // Current team lost to next team
//        var dummy = arrayName[i];  
//        arrayName[i] = arrayName[i+1]; 
//        arrayName[i+1] = dummy; 
//       }
//      }
//     }
//    }
//   }
   return arrayName;
  }





  function sortCommonGame(arrayName, numTiedTeams, previousTieBreak) { // SORT COMMON GAMES
   commonGameBrokeTie = false;
   //First need to find common games
   var commonGameCheckArray = new Array();
   var commonGameArray = new Array();
   var commonGameCount = 0;
   var gamesPlayed;
   var wins;
   var losses;
   var ties;
   for (var i=0; i<numTeams; i++) {                 // Calculate whether played opponent or not for each franchise
    commonGameCheckArray[i] = 0;
    for (var j=0; j<numTiedTeams; j++) {
     if(headToHeadArray[arrayName[j][0]][i][2] > 0) commonGameCheckArray[i]++;
    }
   }
   for (var i=0; i<numTeams; i++) {                 // If each team played a similar opponent then add that team to the common game array
    if(commonGameCheckArray[i]==numTiedTeams) { 
     commonGameArray[commonGameCount] = i;
     commonGameCount++;
    }
   }   
   if(commonGameArray.length >= commonGameMinGP){
    for (var i=0; i<numTiedTeams; i++) {
     gamesPlayed=0; wins=0; losses=0; ties=0;
     for (var j=0; j<commonGameArray.length; j++) {
      gamesPlayed += headToHeadArray[arrayName[i][0]][commonGameArray[j]][2];
      wins        += headToHeadArray[arrayName[i][0]][commonGameArray[j]][4];
      losses      += headToHeadArray[arrayName[i][0]][commonGameArray[j]][5];
      ties        += headToHeadArray[arrayName[i][0]][commonGameArray[j]][6];
     }
     arrayName[i][17] = parseInt((wins + 0.5*ties)*1000/gamesPlayed)/1000;
     if(arrayName[i][17].toString()=="NaN") arrayName[i][17] = 0;
    }
    if(!reverseTheOrder) 
     arrayName = habmanBubbleSort(arrayName,numTiedTeams,17,0); 
    else
     arrayName = habmanBubbleSort(arrayName,numTiedTeams,17,1);
    var newText = "    Common game opponents (";
    for (var x = 0; x < commonGameArray.length; x++) {
     newText += franchiseArray[commonGameArray[x]][1] + ", ";
    }
    newText = newText.substr(0,newText.length-2);
    newText += ")~";
    newText += "    Win % in common games (";
    for (var x = 0; x < numTiedTeams; x++) {
     newText += franchiseArray[arrayName[x][0]][1] + " " + decimalFormat(arrayName[x][17],3) + ", ";
    }
    newText = newText.substr(0,newText.length-2);
    newText += ")~";
    currentCommonGameGrouping = newText;
    if(arrayName[0][17]!=arrayName[1][17]) { // If one winner then set up return for sortTheseTeams
     commonGameBrokeTie=true;
    } else {                                 // else reset teamsCurrentlyTied eliminating bottom teams
     var teamCount = 1;
     for (var t=0; t<(arrayName.length-1); t++) {
      if(arrayName[t][17]==arrayName[t+1][17]) 
       teamCount++; 
      else 
       t=arrayName.length-1; 
     }
     if(teamsCurrentlyTied>teamCount) teamsCurrentlyTied = teamCount;
    }
    stepsText += currentCommonGameGrouping;
   } else {
    var newText = "    Minimum games not met.  Common games include (";
    if(commonGameArray.length>0) 
     for (var x = 0; x < commonGameArray.length; x++) {
      newText += franchiseArray[commonGameArray[x]][1] + ", ";
     }
    else
     newText += "none  ";
    newText = newText.substr(0,newText.length-2);
    newText += ")~";
    stepsText += newText;
   }
   return arrayName;
  }

  function eliminateBottomTeams(theseTeams,tieBreakerArray,thisTieBreak) {
   var teamCount = 1;
   for (var t=0; t<(theseTeams.length-1); t++) {
    if(theseTeams[t][tieBreakerArray[thisTieBreak]]==theseTeams[t+1][tieBreakerArray[thisTieBreak]]) 
     teamCount++; 
    else {
     t=theseTeams.length-1; 
    } 
   }
   return teamCount;
  } 

  function divisionCheck(theseTeams,tiedTeams) {
   var goodToGo = true;
   for (var t=0; t<tiedTeams-1; t++) 
    if(franchiseArray[theseTeams[t][0]][2]!=franchiseArray[theseTeams[t+1][0]][2]) goodToGo=false;
   if(!goodToGo&&bypassSameDivisionRule) {
     goodToGo = true;
     stepsText += " . . . . using division winning % even though teams are not from the same division~";
    }
   return goodToGo; 
  }

  function rankThisTeam(sortArray,tieBreakerArray,currentTieBreaker,alreadyRanked,assignSeed) {
   if(assignSeed) {
    var extraText="";
    if(currentTieBreaker>0) extraText += " broke the tie~";
    if(!alreadyRanked) {
     playoffArray[sortArray[0][0]][2] = 1;                 //This marks the playoff array showing that the current team has been seeded.
     playoffArray[sortArray[0][0]][3] = tieBreakerArray[currentTieBreaker]; //This marks the playoff array showing which tiebreaker was used for the Division.
     playoffArray[sortArray[0][0]][6] = extraText;
     if(sortArray.length==1) {
      playoffArray[sortArray[0][0]][8] += stepsTitle + "1. By Default~";
     } else {
      playoffArray[sortArray[0][0]][8] += stepsText + extraText;
     }
    } else {
     playoffArray[sortArray[0][0]][4] = 1; 
     playoffArray[sortArray[0][0]][5] = tieBreakerArray[currentTieBreaker]; 
     playoffArray[sortArray[0][0]][7] = extraText;
     if(sortArray.length==1) {
      playoffArray[sortArray[0][0]][8] += stepsTitle + "1. By Default~";
     } else {
      playoffArray[sortArray[0][0]][8] += stepsText + extraText; 
     }
    }
   }
   return sortArray[0];
  }

  function updateSortArray (sortArray) {
    var tempArray = new Array();
    for (var n = 1; n < sortArray.length; n++) {
     tempArray[n-1] = sortArray[n];
    }
    sortArray = tempArray;
    return sortArray;
  }

  function sortTheseTeams(theseTeams,teamsToSort,tieBreakerArray,alreadyRanked,assignSeed) { //This function will sort the assigned "theseTeams" array and set the requested number of teams to the playoffs; If alreadyRanked then just sort the array
   var currentTieBreaker = 0;
   var sortOrder         = 0;
   var sortArray         = new Array();
   var updateArray       = new Array();
   var tempArray         = new Array();
   var retestHeadToHead      = false;
   var retestCommonGame      = false;
   var retestHthPointsScored = false;
   var headToHeadUsed        = false;
   var commonGameUsed        = false;
   var hthPointsScoredUsed   = false;
   var extraText             = "";
   var headToHeadTieBreaker;
   var commonGameTieBreaker;
   var hthPointsScoredTieBreaker;
   var goodToGo;
   for (var t = 0; t < theseTeams.length; t++) { 
    sortArray[t]=theseTeams[t];
   }
   for (var t = 0; t < teamsToSort; t++) { 
    stepsText               = stepsTitle;
    stepsCount              = 0;
    teamsCurrentlyTied      = sortArray.length;
    retestHeadToHead        = false;
    retestCommonGame        = false;
    retestHthPointsScored   = false;
    headToHeadUsed          = false;
    commonGameUsed          = false;
    hthPointsScoredUsed     = false;
    headToHeadBrokeTie      = false;
    commonGameBrokeTie      = false;
    hthPointsScoredBrokeTie = false;
    headToHeadSweep         = false;
    headToHeadWinPctTeams  -= 1;
    hthPointsScoredTeams   -= 1;
    for (var s = 0; s < tieBreakerArray.length; s++) {
     currentTieBreaker = s;
     stepsCount++; 
     stepsText += stepsCount + ". " +  tieBreakerTitles[tieBreakerArray[s]] + "~";
//     if(tieBreakerArray[s]==12) sortOrder=1; else sortOrder=0; //Set reverse order for designated tiebreakers
     if(reverseTheOrder) sortOrder=1;
     if(sortArray.length!=1) { // If sortArray = 1 then we are on the last team and use the 0 tie breaker which is By Default
       
      if(useStartOverRule) {

       goodToGo = true;       
       if(tieBreakerArray[s]==2&&!doingDivision) {
        goodToGo = divisionCheck(sortArray,teamsCurrentlyTied);
        if(!goodToGo) stepsText += " . . . . tied teams are not from the same division so going to next tiebreaker~";
       }

       if(tieBreakerArray[s]==8) { 
        headToHeadUsed = true; 
        headToHeadTieBreaker = s;
        sortArray = sortHeadToHead(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1],alreadyRanked);
       } 
       if(tieBreakerArray[s]==17) { 
        commonGameUsed = true; 
        commonGameTieBreaker = s;
        sortArray = sortCommonGame(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1]);
       }
       if(tieBreakerArray[s]==18) { 
        hthPointsScoredUsed = true; 
        hthPointsScoredTieBreaker = s;
        sortArray = sortHthPointsScored(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1]);
       }
       if(goodToGo&&tieBreakerArray[s]!=8&&tieBreakerArray[s]!=17&&tieBreakerArray[s]!=18) {
        sortArray = habmanBubbleSort(sortArray,teamsCurrentlyTied,tieBreakerArray[s],sortOrder);  
       }
       if(tieBreakerArray[s]==8&&headToHeadBrokeTie)       s=tieBreakerArray.length; 
       if(tieBreakerArray[s]==17&&commonGameBrokeTie)      s=tieBreakerArray.length;
       if(tieBreakerArray[s]==18&&hthPointsScoredBrokeTie) s=tieBreakerArray.length;
       if(goodToGo&&tieBreakerArray[s]!=8&&tieBreakerArray[s]!=17&&tieBreakerArray[s]!=18&&sortArray[0][tieBreakerArray[s]]!=sortArray[1][tieBreakerArray[s]]) s=tieBreakerArray.length; // Escapes sorting routine because team is found    
       if(goodToGo&&tieBreakerArray[s]!=8&&tieBreakerArray[s]!=17&&tieBreakerArray[s]!=18&&s!=tieBreakerArray.length) {
        var temp = teamsCurrentlyTied;
        teamsCurrentlyTied = eliminateBottomTeams(sortArray,tieBreakerArray,s); 
        if(teamsCurrentlyTied<temp){
         if(headToHeadUsed) retestHeadToHead = true;           //If we have tested for head to head and it failed we must go back and re-test as the sortArray shrinks
         if(commonGameUsed) retestCommonGame = true;           //If we have tested for common games and it failed we must go back and re-test as the sortArray shrinks
         if(hthPointsScoredUsed) retestHthPointsScored = true; //If we have tested for common games and it failed we must go back and re-test as the sortArray shrinks
        }
        if(teamsCurrentlyTied>temp) teamsCurrentlyTied = temp;               //Avoid adding more teams to the sort process while walking through the sortArray
       }
       
      } else { // Use Default MFL Rule which is !useStartOverRule
      
       goodToGo = true;       
       if(tieBreakerArray[s]==2&&!doingDivision) {
        goodToGo = divisionCheck(sortArray,teamsCurrentlyTied);
        if(!goodToGo) stepsText += " . . . . tied teams are not from the same division so going to next tiebreaker~";
       }

       if(tieBreakerArray[s]==8) { // Set up Head to head array 
        sortArray = sortHeadToHead(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1],alreadyRanked);
       }
       if(tieBreakerArray[s]==17) { // Set up common game array
        sortArray = sortCommonGame(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1]);
       }
       if(tieBreakerArray[s]==18) { // Set up Head to head point scored array
        sortArray = sortHthPointsScored(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1]);
       }
       sortArray = habmanBubbleSort(sortArray,teamsCurrentlyTied,tieBreakerArray[s],sortOrder); 
       if(goodToGo&&sortArray[0][tieBreakerArray[s]]!=sortArray[1][tieBreakerArray[s]]) s=tieBreakerArray.length; // Escapes sorting routine because team is found    
       if(goodToGo&&s!=tieBreakerArray.length) {
        var temp = teamsCurrentlyTied;
        teamsCurrentlyTied = eliminateBottomTeams(sortArray,tieBreakerArray,s); 
        if(teamsCurrentlyTied>temp) teamsCurrentlyTied = temp;               //Avoid adding more teams to the sort process while walking through the sortArray
       }
      }

      if(s!=tieBreakerArray.length&&teamsCurrentlyTied>0) stepsText = addTeamsStillTied(stepsText,sortArray,teamsCurrentlyTied);
      
      if(headToHeadSwept&&!headToHeadBrokeTie)  { retestHeadToHead=true; headToHeadSwept=false; }
      
      if(retestHeadToHead&&useStartOverRule&&s!=tieBreakerArray.length) {
       stepsText += " . . . . re-testing head to head~";
       sortArray = sortHeadToHead(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1],alreadyRanked);
       if(headToHeadBrokeTie) { currentTieBreaker=headToHeadTieBreaker; s=tieBreakerArray.length; }
       retestHeadToHead=false;
      }
      if(retestCommonGame&&useStartOverRule&&s!=tieBreakerArray.length) {
       stepsText += " . . . . re-testing common games~";
       sortArray = sortCommonGame(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1]);
       if(commonGameBrokeTie) { currentTieBreaker=commonGameTieBreaker; s=tieBreakerArray.length; }
       retestCommonGame=false;
      }
      if(retestHthPointsScored&&useStartOverRule&&s!=tieBreakerArray.length) {
       stepsText += " . . . . re-testing head to head points scored~";
       sortArray = sortHthPointsScored(sortArray,teamsCurrentlyTied,tieBreakerArray[s-1]);
       if(hthPointsScoredBrokeTie) { currentTieBreaker=hthPointsScoredTieBreaker; s=tieBreakerArray.length; }
       retestHthPointsScored=false;
      }
      if((headToHeadBrokeTie||commonGameBrokeTie||hthPointsScoredBrokeTie)&&!useStartOverRule) { s=tieBreakerArray.length; }
     } 
    }
    updateArray[t]  = rankThisTeam(sortArray,tieBreakerArray,currentTieBreaker,alreadyRanked,assignSeed);
    sortArray       = updateSortArray(sortArray);
   }
   return updateArray;
  }

  function setDivisionWinners(thisConference,assignSeed,teamsToSort,theseDivTieBreakers) {
   var divisionWinner = new Array();
   var teamCount;
   var divisionCount;
   var currentTieBreaker;
   doingDivision = true;
   standingsArray = habmanBubbleSort(standingsArray,numTeams,0,1);  // Re-sort Standings Array to get it back to original stats (probably needs to be looked at)
   divisionCount=0;
   for (var d = 0; d < numDivisions; d++ ) {
    var currentDivision = new Array();
    teamCount = 0;
    for (var f = 0; f < numTeams; f++) {
     if(playoffArray[f][1] == d && playoffArray[f][2] == 0 && playoffArray[f][4] == 0) {
      if(numConferences>0) {
       if(parseInt(divisionArray[parseInt(franchiseArray[f][2],10)][2],10)==thisConference) {
        currentDivision[teamCount] = [f,standingsArray[f][7],standingsArray[f][14],standingsArray[f][15],standingsArray[f][8],standingsArray[f][17],standingsArray[f][16],standingsArray[f][22], 0, Math.random(), standingsArray[f][27], standingsArray[f][28], standingsArray[f][9], standingsArray[f][33], standingsArray[f][34], standingsArray[f][39], standingsArray[f][40], 0, 0, standingsArray[f][43], standingsArray[f][45]]; // [id,pct., div_pct., div pf, pf, vp, power, pa_pct., head-to-head, random, non_div_pct., non_div_pf, reverse_pa, conf_pct, conf_pf, non_conf_pct, non_conf_pf, common_games, hth pf, sos_win_pct, sov_win_pct];
        teamCount++;
       }
      } else {
       currentDivision[teamCount] = [f,standingsArray[f][7],standingsArray[f][14],standingsArray[f][15],standingsArray[f][8],standingsArray[f][17],standingsArray[f][16],standingsArray[f][22], 0, Math.random(), standingsArray[f][27], standingsArray[f][28], standingsArray[f][9], standingsArray[f][33], standingsArray[f][34], standingsArray[f][39], standingsArray[f][40], 0, 0, standingsArray[f][43], standingsArray[f][45]]; // [id,pct., div_pct., div pf, pf, vp, power, pa_pct., head-to-head, random, non_div_pct., non_div_pf, reverse_pa, conf_pct, conf_pf, non_conf_pct, non_conf_pf, common_games, hth pf, sos_win_pct, sov_win_pct];
       teamCount++;
      }
     }
    }
    //After Division Array is setup we need to rank them to get Division winner at the [0] spot using the Division Tie-Breaker Array
    stepsTitle="~Division Tiebreaker: ~";
    stepsCount=0;
    if(currentDivision.length > 0){
     currentDivisionLeader = sortTheseTeams(currentDivision,teamsToSort,theseDivTieBreakers,false,assignSeed);
     for (var x = 0; x < teamsToSort; x++ ) {
      divisionWinner[divisionCount] = currentDivisionLeader[x];
      divisionCount++;
     }
    }
   }
   //After the division winners are found this will sort the division winners using the Wild Card Tie-Breaker Array
   doingDivision = false;
   if(assignSeed) {
    stepsTitle="~Wild-Card Tiebreaker used to sort Division Winners: ~";
    stepsCount=0;
    divisionWinner = sortTheseTeams(divisionWinner,divisionWinner.length,wildCardTieBreaker,true,assignSeed);
    if(numDivisionWinners!=-1) {                 //This routine is run to reduce the number of division winners if necessary
     var tempArray = new Array();
     for (var f = 0; f < divisionWinner.length; f++) {
      if(f<numDivisionWinners) {
       tempArray[f] = divisionWinner[f];         //Includes division winner.
      } else {
      playoffArray[divisionWinner[f][0]][2] = 0;  //Removes extra division winners.
      playoffArray[divisionWinner[f][0]][3] = 0;  //Removes extra division winner tiebreaker explanation.
      playoffArray[divisionWinner[f][0]][6] = ""; //Removes extra division winners extra text.
      playoffArray[divisionWinner[f][0]][8] = ""; //Removes extra division winners tiebreaker alert explanation.
      }
     }
     divisionWinner = tempArray;
    }
   } 
   return divisionWinner;
  }

  function setWildCardWinners(thisConference,assignSeed,teamsToRank) {
   var wildCardArray = new Array();
   var teamCount;
   standingsArray = habmanBubbleSort(standingsArray,numTeams,0,1);  // Re-sort Standings Array to get it back to original stats (probably needs to be looked at)
   stepsTitle="~Wild-Card Tiebreaker: ~";
   if(reverseTheOrder) stepsTitle+= " - seeding has been run in reverse order (i.e. worst to best)~";
   stepsCount=0;
   if(useDivisionBestRule) {
    wildCardArray = setDivisionWinners(thisConference,false,teamsToRank,divisionTieBreaker);
    headToHeadWinPctTeams = 0;
    hthPointsScoredTeams  = 0;
    var newText = addTeamsStillTied("",wildCardArray,wildCardArray.length);
    newText = newText.replace(/    Still tied/,"");  
    stepsTitle = "~Wild-Card Tiebreaker: ~ . . . applying Division Best rule we get these teams " + newText;
   } else {
    teamCount=0;
    for (var f = 0; f < numTeams; f++) {
     if(playoffArray[f][2] == 0) {
      if(numConferences>0) {
       if(parseInt(divisionArray[parseInt(franchiseArray[f][2],10)][2],10)==thisConference) {
        wildCardArray[teamCount] = [f,standingsArray[f][7],standingsArray[f][14],standingsArray[f][15],standingsArray[f][8],standingsArray[f][17],standingsArray[f][16],standingsArray[f][22], 0, Math.random(), standingsArray[f][27], standingsArray[f][28], standingsArray[f][9], standingsArray[f][33], standingsArray[f][34], standingsArray[f][39], standingsArray[f][40], 0, 0, standingsArray[f][43], standingsArray[f][45]]; // [id,pct., div_pct., div pf, pf, vp, power, pa_pct., head-to-head, random, non_div_pct., non_div_pf, reverse_pa, conf_pct, conf_pf, non_conf_pct, non_conf_pf, common_games, hth pf, sos_win_pct, sov_win_pct];
        teamCount++;
       } 
      } else {
       wildCardArray[teamCount] = [f,standingsArray[f][7],standingsArray[f][14],standingsArray[f][15],standingsArray[f][8],standingsArray[f][17],standingsArray[f][16],standingsArray[f][22], 0, Math.random(), standingsArray[f][27], standingsArray[f][28], standingsArray[f][9], standingsArray[f][33], standingsArray[f][34], standingsArray[f][39], standingsArray[f][40], 0, 0, standingsArray[f][43], standingsArray[f][45]]; // [id,pct., div_pct., div pf, pf, vp, power, pa_pct., head-to-head, random, non_div_pct., non_div_pf, reverse_pa, conf_pct, conf_pf, non_conf_pct, non_conf_pf, common_games, hth pf, sos_win_pct, sov_win_pct];
       teamCount++;
      }
     }
    }
   }
   //After finding all the other teams i.e. non-division winners this will sort them to determine the Wild Card Teams using the Wild Card Tie Breaker Array in reverse order
   wildCardArray = sortTheseTeams(wildCardArray,teamsToRank,wildCardTieBreaker,false,assignSeed);
   return wildCardArray;
  }

  function setSpecialSeed(thisArray,thisConference) {
   var nonPlayoffArray = new Array();
   var teamCount;
   standingsArray = habmanBubbleSort(standingsArray,numTeams,0,1);  // Re-sort Standings Array to get it back to original stats (probably needs to be looked at)
   stepsTitle="~Special Seed Assignment: ~";
   teamCount=0;
   for (var f = 0; f < numTeams; f++) {
    if(playoffArray[f][2] == 0) {
     if(numConferences>0) {
      if(parseInt(divisionArray[parseInt(franchiseArray[f][2],10)][2],10)==thisConference) {
       nonPlayoffArray[teamCount] = [f,standingsArray[f][7],standingsArray[f][14],standingsArray[f][15],standingsArray[f][8],standingsArray[f][17],standingsArray[f][16],standingsArray[f][22], 0, Math.random(), standingsArray[f][27], standingsArray[f][28], standingsArray[f][9], standingsArray[f][33], standingsArray[f][34], standingsArray[f][39], standingsArray[f][40], 0, 0, standingsArray[f][43], standingsArray[f][45]]; // [id,pct., div_pct., div pf, pf, vp, power, pa_pct., head-to-head, random, non_div_pct., non_div_pf, reverse_pa, conf_pct, conf_pf, non_conf_pct, non_conf_pf, common_games, hth pf, sos_win_pct, sov_win_pct];
       teamCount++;
      }
     } else {
      nonPlayoffArray[teamCount] = [f,standingsArray[f][7],standingsArray[f][14],standingsArray[f][15],standingsArray[f][8],standingsArray[f][17],standingsArray[f][16],standingsArray[f][22], 0, Math.random(), standingsArray[f][27], standingsArray[f][28], standingsArray[f][9], standingsArray[f][33], standingsArray[f][34], standingsArray[f][39], standingsArray[f][40], 0, 0, standingsArray[f][43], standingsArray[f][45]]; // [id,pct., div_pct., div pf, pf, vp, power, pa_pct., head-to-head, random, non_div_pct., non_div_pf, reverse_pa, conf_pct, conf_pf, non_conf_pct, non_conf_pf, common_games, hth pf, sos_win_pct, sov_win_pct];
      teamCount++;
     }
    }
   }
   //After finding all the other teams i.e. non-playoff teams this will add the special seeds to the bottom of that array
   nonPlayoffArray = sortTheseTeams(nonPlayoffArray,1,specialSeed,false,true);
   thisArray[thisArray.length] = nonPlayoffArray[0]; 
   return thisArray;
  }

  function setNonPlayoffTeams(thisConference) {
   var nonPlayoffArray = new Array();
   var teamCount;
   standingsArray = habmanBubbleSort(standingsArray,numTeams,0,1);  // Re-sort Standings Array to get it back to original stats (probably needs to be looked at)
   stepsTitle="~Wild-Card Tiebreaker: ~";
   teamCount=0;
   for (var f = 0; f < numTeams; f++) {
    if(playoffArray[f][2] == 0) {
     if(numConferences>0) {
      if(parseInt(divisionArray[parseInt(franchiseArray[f][2],10)][2],10)==thisConference) {
       nonPlayoffArray[teamCount] = [f,standingsArray[f][7],standingsArray[f][14],standingsArray[f][15],standingsArray[f][8],standingsArray[f][17],standingsArray[f][16],standingsArray[f][22], 0, Math.random(), standingsArray[f][27], standingsArray[f][28], standingsArray[f][9], standingsArray[f][33], standingsArray[f][34], standingsArray[f][39], standingsArray[f][40], 0, 0, standingsArray[f][43], standingsArray[f][45]]; // [id,pct., div_pct., div pf, pf, vp, power, pa_pct., head-to-head, random, non_div_pct., non_div_pf, reverse_pa, conf_pct, conf_pf, non_conf_pct, non_conf_pf, common_games, hth pf, sos_win_pct, sov_win_pct];
       teamCount++;
      }
     } else {
      nonPlayoffArray[teamCount] = [f,standingsArray[f][7],standingsArray[f][14],standingsArray[f][15],standingsArray[f][8],standingsArray[f][17],standingsArray[f][16],standingsArray[f][22], 0, Math.random(), standingsArray[f][27], standingsArray[f][28], standingsArray[f][9], standingsArray[f][33], standingsArray[f][34], standingsArray[f][39], standingsArray[f][40], 0, 0, standingsArray[f][43], standingsArray[f][45]]; // [id,pct., div_pct., div pf, pf, vp, power, pa_pct., head-to-head, random, non_div_pct., non_div_pf, reverse_pa, conf_pct, conf_pf, non_conf_pct, non_conf_pf, common_games, hth pf, sos_win_pct, sov_win_pct];
      teamCount++;
     }
    }
   }
   //After finding all the other teams i.e. non-playoff teams this will sort them to determine their order using the Wild Card Tie Breaker Array in reverse order
   //but first we need to check if there is a set of out of playoff tiebreakers for the non-playoff teams
   if(outOfPlayoffsTiebreaker.length>0) { 
    wildCardTieBreaker = outOfPlayoffsTiebreaker;
    if(outOfPlayoffsReverseSort) reverseTheOrder = true;
   }
   nonPlayoffArray = sortTheseTeams(nonPlayoffArray,nonPlayoffArray.length,wildCardTieBreaker,false,true);
   return nonPlayoffArray;
  }

  function createTable(seedArray,thisConference,thisID,thisCaption,hideTable) {
   if(seedArray.length>0&&hideTable==false) {
    var tableID = thisID + thisConference + "-" + habmanModCount;
    var thisTable = " <tr>\n  <td>\n";
    thisTable += "   <table border='0' cellspacing='1' width='100%' align='center' class='homepagemodule report' id='" + tableID + "'>\n   <caption title='Table ID: " + tableID + "'><span>" + thisCaption + "</span></caption>\n"
    if(!genericTable||showSteps)
     thisTable += "     <tr>\n      <th class='playoffrank' style='width: 5%; text-align: center;'>Seed</th>\n      <th style='width: 50%; text-align: center;'>Franchise</th>\n";
    else
     thisTable += "     <tr>\n      <th style='width: 50%; text-align: center;'>Franchise</th>";
    for (var i=0; i<displayColumns.length; i++) {
     thisTable += "      <th style='text-align: center;'>" + standingsTitles[displayColumns[i]] + "</th>\n";
    }
    thisTable += "     </tr>\n";
    for (var d = 0; d < seedArray.length; d++) {
     var r=d+seedCount;
     var link = baseURLDynamic + "/" + year + "/options?L=" + league_id + "&F=" + franchiseArray[seedArray[d][0]][0] + "&O=01";
     if(useDivisionIcon)
      var divIcon = "<img src='http://nitrografixx.com/habman_js/divblank.gif' style='background-color: #" + iconColors[parseInt(parseInt(franchiseArray[seedArray[d][0]][2],10),10)] + ";' alt='" + divisionArray[parseInt(franchiseArray[seedArray[d][0]][2],10)][1] + "' />";
     else
      var divIcon = "";
     if(!genericTable||showSteps) {
      if(d % 2 == 0)
       if(useToolTip1||!useToolTip1)
        thisTable += "     <tr class='oddtablerow'>\n      <td class='playoffrank' align='center'>"  + r + "</td>\n      <td class='fname' style='text-align: left;'>&nbsp;<img onclick=\"javascript:doAlert(" + r + ",'" + franchiseArray[seedArray[d][0]][1] + "','" + playoffArray[seedArray[d][0]][8] + "');\" src='http://nitrografixx.com/habman_js/exp_plus.gif' border='0' style='cursor: pointer;' alt='show steps taken to seed this team' />&nbsp;" + divIcon + "&nbsp;<a href='" + link + "'>" + franchiseArray[seedArray[d][0]][1] + "</a></td>\n";
       else
         thisTable += "     <tr class='oddtablerow'>\n      <td class='playoffrank' align='center'>"  + r + "</td>\n      <td class='fname' style='text-align: left;'>&nbsp;<a href=\"javascript:doAlert(" + r + ",'" + franchiseArray[seedArray[d][0]][1] + "','" + playoffArray[seedArray[d][0]][8] + "');\"><img src='http://nitrografixx.com/habman_js/exp_plus.gif' border='0' alt='show steps taken to seed this team' /></a>&nbsp;" + divIcon + "&nbsp;<a href='" + link + "'>" + franchiseArray[seedArray[d][0]][1] + "</a></td>\n";
      else
       if(useToolTip1||!useToolTip1)
        thisTable += "     <tr class='eventablerow'>\n      <td class='playoffrank' align='center'>" + r + "</td>\n      <td class='fname' style='text-align: left;'>&nbsp;<img onclick=\"javascript:doAlert(" + r + ",'" + franchiseArray[seedArray[d][0]][1] + "','" + playoffArray[seedArray[d][0]][8] + "');\" src='http://nitrografixx.com/habman_js/exp_plus.gif' border='0' style='cursor: pointer;' alt='show steps taken to seed this team' />&nbsp;" + divIcon + "&nbsp;<a href='" + link + "'>" + franchiseArray[seedArray[d][0]][1] + "</a></td>\n";
       else
        thisTable += "     <tr class='eventablerow'>\n      <td class='playoffrank' align='center'>" + r + "</td>\n      <td class='fname' style='text-align: left;'>&nbsp;<a href=\"javascript:doAlert(" + r + ",'" + franchiseArray[seedArray[d][0]][1] + "','" + playoffArray[seedArray[d][0]][8] + "');\"><img src='http://nitrografixx.com/habman_js/exp_plus.gif' border='0' alt='show steps taken to seed this team' /></a>&nbsp;" + divIcon + "&nbsp;<a href='" + link + "'>" + franchiseArray[seedArray[d][0]][1] + "</a></td>\n";
     } else {
      if(d % 2 == 0)
       thisTable += "     <tr class='oddtablerow'>\n      <td class='fname' style='text-align: left;'>&nbsp;"  + divIcon + "&nbsp;<a href='" + link + "'>" + franchiseArray[seedArray[d][0]][1] + "</a></td>\n";
      else
       thisTable += "     <tr class='eventablerow'>\n      <td class='fname' style='text-align: left;'>&nbsp;" + divIcon + "&nbsp;<a href='" + link + "'>" + franchiseArray[seedArray[d][0]][1] + "</a></td>\n";
     }
     for (var i=0; i<displayColumns.length; i++) {
      thisTable += "      <td align='center'>" + decimalCheck(standingsArray[seedArray[d][0]][displayColumns[i]],displayColumns[i]) + "</td>\n";
     }
     thisTable += "     </tr>\n";
    } 
    thisTable += "    </table>\n";
    thisTable += "  </td>\n </tr>\n";
    seedCount=r+1;
   } else {
    var thisTable="";
   }
   return thisTable;
  }

  function formatPlayoffTitles() {
   titleHeader              = titleHeader.replace(/'/g,"´");
   titleHeader              = titleHeader.replace(/"/g,"”");
   titleDivisionWinner      = titleDivisionWinner.replace(/'/g,"´");
   titleDivisionWinner      = titleDivisionWinner.replace(/"/g,"”");
   titleDivisionWinnerTwo   = titleDivisionWinnerTwo.replace(/'/g,"´");
   titleDivisionWinnerTwo   = titleDivisionWinnerTwo.replace(/"/g,"”");
   titleWildCardWinner      = titleWildCardWinner.replace(/'/g,"´");
   titleWildCardWinner      = titleWildCardWinner.replace(/"/g,"”");
   titleNonPlayoffTeam      = titleNonPlayoffTeam.replace(/'/g,"´");
   titleNonPlayoffTeam      = titleNonPlayoffTeam.replace(/"/g,"”");
   titlePlayoffTeam         = titlePlayoffTeam.replace(/'/g,"´");
   titlePlayoffTeam         = titlePlayoffTeam.replace(/"/g,"”");
  }

  function doPlayoffTable(divID,tableType,teamsToRank) {
   formatPlayoffTitles();
   if(tableType == undefined) setupNormal(); else setupOther(tableType,teamsToRank);
   for (var f = 0; f < numTeams; f++ ) {
    playoffArray[f] = [franchiseArray[f][0],parseInt(franchiseArray[f][2],10),0,0,0,0,"","",""]; //Assign Team ID, Division ID, Seeded(0,1), Which division/WildCard tiebreaker, Secondary Seed(0,1) Which wild-card tiebreaker, append text to primary, append text to secondary, alert Text
   }
   if(conferenceLikeDivision) { // This will treat division like a conference
    for (var d = 0; d < numDivisions; d++ ) {
     divisionArray[d][2]   = new Array();
     divisionArray[d][2]   = d;  
     conferenceArray[d]    = new Array();
     conferenceArray[d][0] = d;
     conferenceArray[d][1] = new Array();
     conferenceArray[d][1] = divisionArray[d][1];
    }
    numConferences=numDivisions;
   }
   if(numConferences==0) var loops=1; else var loops=numConferences;
   if(!conferenceLikeDivision) var divisionWinners = new Array();
   var divisionWinnersTwo = new Array();
   var wildCardWinners    = new Array();
   var nonPlayoffTeams    = new Array();
   for (var c = 0; c < loops; c++ ) {
    if(!conferenceLikeDivision) divisionWinners[c] = setDivisionWinners(c,true,numDivisionTeams,divisionTieBreaker);
    if(!conferenceLikeDivision&&divisionTieBreakerTwo.length>1) divisionWinnersTwo[c] = setDivisionWinners(c,true,numDivisionTeamsTwo,divisionTieBreakerTwo);
    if(useDivisionBestRule) {
     var tempArray = new Array();
     wildCardWinners[c] = new Array();
     for (var x = 0; x < numWildCardTeams; x++ ) {
      tempArray = setWildCardWinners(c,true,1);
      wildCardWinners[c][x] = tempArray[0];
     }
    } else {
     wildCardWinners[c] = setWildCardWinners(c,true,numWildCardTeams);
    }
    if(specialSeed.length>0) wildCardWinners[c] = setSpecialSeed(wildCardWinners[c],c);
    if(useDivisionBestRule) {
     var tempArray = new Array();
     var remainingTeams = 0;
     for (var x = 0; x < playoffArray.length; x++ ) {
      if(playoffArray[x][2]==0) {
       if(numConferences==0) remainingTeams++;
        else if(divisionArray[parseInt(franchiseArray[parseInt(playoffArray[x][0],10)-1][2],10)][2]==c) remainingTeams++;
      }
     }
     nonPlayoffTeams[c] = new Array();
     for (var x = 0; x < remainingTeams; x++ ) {
      tempArray = setWildCardWinners(c,true,1);
      nonPlayoffTeams[c][x] = tempArray[0];
     }
    } else {
     nonPlayoffTeams[c] = setNonPlayoffTeams(c);
    }
   }
   var tempOutput = "";
   if(!hideTitleHeader) tempOutput += titleHeader + '\n';
   for (var c = 0; c < loops; c++ ) {
    var tableID = "outerplayoff_table" + c + "-" + habmanModCount;
    tempOutput += "<table border='0' align='center' style='" + outerPlayoffStyle +"' class='homepagemodule report' id='" + tableID + "'>\n";
    seedCount = 1;
    if(numConferences>0) tempOutput += "<caption title='Table ID: " + tableID + "'><span>" + conferenceArray[c][1] + "</span></caption>\n";
    if(numDivisions > 0 && conferenceLikeDivision==false) {
     tempOutput += createTable(divisionWinners[c],c,'divisionwinner_table',titleDivisionWinner,hideDivision);
     if(divisionTieBreakerTwo.length>1) 
      tempOutput += createTable(divisionWinnersTwo[c],c,'divisionwinnertwo_table',titleDivisionWinnerTwo,hideDivisionTwo);
     tempOutput += createTable(wildCardWinners[c],c,'wildcardwinner_table',titleWildCardWinner,hideWildCard);
    } else {
     tempOutput += createTable(wildCardWinners[c],c,'playoffwinner_table',titlePlayoffTeam,hidePlayoff);  
    }
    tempOutput += createTable(nonPlayoffTeams[c],c,'nonplayoffteam_table',titleNonPlayoffTeam,hideNonPlayoff) + "</table>\n"; 
   }
   if(enableCodeWriter) {
    tempOutput = "<script language=\"JavaScript\" type=\"text/javascript\" src=\"http://nitrografixx.com/habman_js/habman_apps_ver3.js\"></script>\n\n" + tempOutput;
    document.write('<br /><br /><br />Copy and paste the following HTML code to a home page message to create the requested table<br />')
    document.write('<textarea cols="130" rows="25" style="font-size: 12px;">' + tempOutput + '</textarea>');
   } else {
    document.getElementById(divID).innerHTML = tempOutput;
   }
  }