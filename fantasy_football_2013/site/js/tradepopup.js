document.write('<div id="habTradePopupBox" style="position:absolute; width: 300px; left: -200; top: -400px; border: ' + popupTradeBorder + '; background-color: ' + popupTradeBGColor + '; padding: 4px; z-index: 99999; visibility:hidden;filter:progid:DXImageTransform.Microsoft.RandomDissolve(duration=1) progid:DXImageTransform.Microsoft.Shadow(color=gray,direction=135); -moz-opacity:0;"></div>');

if(popupTradeMessageToMe==undefined) var popupTradeMessageToMe="";


//== STICKY NOTE SCRIPT FROM DYNAMIC DRIVE  =============================================
/***********************************************
* Sticky Note script- Dynamic Drive DHTML code library (www.dynamicdrive.com)
* Visit DynamicDrive.com for hundreds of DHTML scripts
* This notice must stay intact for legal use
* Go to http://www.dynamicdrive.com/ for full source code
***********************************************/

var tradeDisplayMode="always"

var tradeFadeEnabled="yes"       //("yes" to enable fade in effect, "no" to disable)
var tradeAutoHideBox=["no", 5]  //Automatically hide box after x seconds? [yes/no, if_yes_hide_after_seconds]
var tradeShowOnScroll="yes"      //Should box remain visible even when user scrolls page? ("yes"/"no)
var tradeFadeLengthIE=1          //fade in duration for IE, in seconds
var tradeFadeDegreeMoz=0.05      //fade in degree for NS6+ (number between 0 and 1. Recommended max: 0.2)

////////No need to edit beyond here///////////

if (parseInt(tradeDisplayMode)!=NaN)
var tradeRandomNum=Math.floor(Math.random()*tradeDisplayMode)

function displayTradePopupBox(){
  var ie=document.all && !window.opera
  var dom=document.getElementById
  iebody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body
  objref=(dom)? document.getElementById("habTradePopupBox") : document.all.habTradePopupBox
  var scroll_top=(ie)? iebody.scrollTop : window.pageYOffset
  var docwidth=(ie)? iebody.clientWidth : window.innerWidth
  docheight=(ie)? iebody.clientHeight: window.innerHeight
  var objwidth=objref.offsetWidth
  objheight=objref.offsetHeight

  try {
   switch(popupTradePositioning) {
     case 0: { objref.style.left=docwidth/2-objwidth/2+"px"; objref.style.top=scroll_top+docheight/2-objheight/2+"px"; break; } 
     case 1: { objref.style.left="1px"; objref.style.top="1px"; break; }
     case 2: { objref.style.left="1px"; objref.style.top=scroll_top+docheight/2-objheight/2+"px"; break; }
     case 3: { objref.style.left="1px"; objref.style.top=scroll_top+docheight-objheight+"px"; break; }
     case 4: { objref.style.left=docwidth/2-objwidth/2+"px"; objref.style.top="1px"; break; } 
     case 5: { objref.style.left=docwidth/2-objwidth/2+"px"; objref.style.top=scroll_top+docheight-objheight+"px"; break; } 
     case 6: { objref.style.left=docwidth-objwidth+"px"; objref.style.top="1px"; break; } 
     case 7: { objref.style.left=docwidth-objwidth+"px"; objref.style.top=scroll_top+docheight/2-objheight/2+"px"; break; } 
     case 8: { objref.style.left=docwidth-objwidth+"px"; objref.style.top=scroll_top+docheight-objheight+"px"; break; } 
     default: { objref.style.left=docwidth/2-objwidth/2+"px"; objref.style.top=scroll_top+docheight/2-objheight/2+"px"; } 
   }
  } catch(er) {
   objref.style.left=docwidth/2-objwidth/2+"px"
   objref.style.top=scroll_top+docheight/2-objheight/2+"px"
  }

  if (tradeShowOnScroll=="yes") tradeShowOnScrollVar=setInterval("tradeStaticFadeBox()", 50)

  if (tradeFadeEnabled=="yes" && objref.filters) {
   objref.filters[0].duration=tradeFadeLengthIE
   objref.filters[0].Apply()
   objref.filters[0].Play()
  }
  objref.style.visibility="visible"
  if (objref.style.MozOpacity){
   if (tradeFadeEnabled=="yes")
    mozfadevar=setInterval("tradeFadeFxMoz()", 90)
   else {
    objref.style.MozOpacity=1
    controlledTradeHideBox()
   }
  } else
     controlledTradeHideBox()
}

function tradeFadeFxMoz(){
  if (parseFloat(objref.style.MozOpacity)<1)
   objref.style.MozOpacity=parseFloat(objref.style.MozOpacity)+tradeFadeDegreeMoz
  else {
   clearInterval(mozfadevar)
   controlledTradeHideBox()
  }
}

function tradeStaticFadeBox(){
  var ie=document.all && !window.opera
  var scroll_top=(ie)? iebody.scrollTop : window.pageYOffset
  try {
   switch(popupTradePositioning) {
     case 1: { objref.style.top=scroll_top; break;}
     case 4: { objref.style.top=scroll_top; break;}
     case 6: { objref.style.top=scroll_top; break;}
     case 3: { objref.style.top=scroll_top+docheight-objheight+"px"; break; }
     case 5: { objref.style.top=scroll_top+docheight-objheight+"px"; break; }
     case 8: { objref.style.top=scroll_top+docheight-objheight+"px"; break; }
     default: { objref.style.top=scroll_top+docheight/2-objheight/2+"px"; }
   }
  } catch(er) {
   objref.style.top=scroll_top+docheight/2-objheight/2+"px"
  }
}

function hideTradeFadeBox(){
  objref.style.visibility="hidden"
  if (typeof tradeShowOnScrollVar!="undefined")
  clearInterval(tradeShowOnScrollVar)
}

function controlledTradeHideBox(){
  if (tradeAutoHideBox[0]=="yes"){
   var delayvar=(tradeFadeEnabled=="yes" && objref.filters)? (tradeAutoHideBox[1]+objref.filters[0].duration)*1000 : tradeAutoHideBox[1]*1000
   setTimeout("hideTradeFadeBox()", delayvar)
  }
}

function initTradeFunction(){
  setTimeout("displayTradePopupBox()", 100)
}
//== END DYNAMIC DRIVE SCRIPT=====================


function getHabTradeCookie(Name) {
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


function getHabTradePopupCookie(Name) {
   var cookieExists = getHabTradeCookie(Name);
   if(cookieExists=="") return false; else return true;
}

function setHabTradePopupCookie(which) {
  switch (which) {
   case 'from': { var cookieName = 'habTradePopup_FromMe_' + league_id + franchise_id;
                  break; }
   case 'to':   { var cookieName = 'habTradePopup_ToMe_'   + league_id + franchise_id;
                  break; }
   case 'commishapproval': { var cookieName = 'habTradePopup_CommishApproval_'   + league_id + franchise_id;
                  break; }
   case 'commishreview': { var cookieName = 'habTradePopup_CommishReview_'   + league_id + franchise_id;
                  break; }
  }

  var today = new Date();
  var expire = new Date();

  switch (popupTradeFrequency) {
   case 0: { document.cookie=cookieName+"=;";                      // clear cookie
                   break; }
   case 1: { document.cookie=cookieName+"=session;";               // expire on window close
                   break; }
   case 2: { expire.setTime(today.getTime() + 1000*60*60*24);      // expire in one day
                   document.cookie=cookieName+"=24;expires="+expire.toGMTString();
                   break; }
   case 3: { expire.setTime(today.getTime() + 1000*60*60*24*7);    // expire in one week
                   document.cookie=cookieName+"=week;expires="+expire.toGMTString();
                   break; }
  }
}



try {
 var tempHTML = "";
 if(popupTradeFrequency==0) {  //Show each visit so clear all cookies
   setHabTradePopupCookie('from');
   setHabTradePopupCookie('to');
   setHabTradePopupCookie('commishapproval');
   setHabTradePopupCookie('commishreview');
 }

 if(popupTradeProposalsFromMe&&leagueAttributes['PendingTradesFromMe']>0&&!getHabTradePopupCookie('habTradePopup_FromMe_' + league_id + franchise_id)) {
   tempHTML += '<li>' + leagueAttributes['PendingTradesFromMe'] + ' trades proposed by me to others&nbsp;&nbsp;';
   tempHTML += '</li>';
   setHabTradePopupCookie('from');
   var tradeOption = '05';
 }
 if(popupTradeProposalsToMe&&leagueAttributes['PendingTradesToMe']>0&&!getHabTradePopupCookie('habTradePopup_ToMe_' + league_id + franchise_id)) {
   if(popupTradeMessageToMe=="") {
    tempHTML += '<li>' + leagueAttributes['PendingTradesToMe'] + ' trades proposed by others to me&nbsp;&nbsp;';
    tempHTML += '</li>';
   } else {
    tempHTML += popupTradeMessageToMe;
   }
   setHabTradePopupCookie('to');
   var tradeOption = '05';
 }
 if(popupTradeAwaitingCommissionerApproval&&leagueAttributes['PendingTradesAwaitingCommishApproval']>0&&!getHabTradePopupCookie('habTradePopup_CommishApproval_' + league_id + franchise_id)) {
   tempHTML += '<li>' + leagueAttributes['PendingTradesAwaitingCommishApproval'] + ' trades awaiting commissioner approval&nbsp;&nbsp;';
   tempHTML += '</li>';
   setHabTradePopupCookie('commishapproval');
   var tradeOption = '05';
 }
 if(popupTradeAwaitingCommissionerApproval&&leagueAttributes['PendingTradesForCommish']>0&&!getHabTradePopupCookie('habTradePopup_CommishReview_' + league_id + franchise_id)) {
   tempHTML += '<li>' + leagueAttributes['PendingTradesForCommish'] + ' trades awaiting your review&nbsp;&nbsp;';
   tempHTML += '</li>';
   setHabTradePopupCookie('commishreview');
   var tradeOption = '34';
 }
 if(tempHTML!="") {
    var tableHTML = '<br /><table align="center" cellspacing="1" class="homepagemodule trades_are_pending report" id="trades"><caption><span>Pending Trades</span></caption><tbody><tr><th>Currently Outstanding Trades</th></tr>';
    tableHTML += '<tr class="oddtablerow"><td><br /><ul>' + tempHTML + '</ul><br /><br /></td></tr>';
    tableHTML += '<tr class="eventablerow"><td style="text-align: center;"><br />[<a href="' + baseURLDynamic + '/' + year + '/options?L=' + league_id + '&O=' + tradeOption + '">View trades now</a>] [<a href="#1" onClick="hideTradeFadeBox(); return false">Close</a>]<br /><br /></td></tr>';
    tableHTML += '</table>';
    document.getElementById('habTradePopupBox').innerHTML = tableHTML;
    displayTradePopupBox();
 }

} catch(er) {
 //Do Nothing
}

