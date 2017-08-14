//** Tab Content script- © Dynamic Drive DHTML code library (http://www.dynamicdrive.com)
//** Last updated: June 29th, 06
//** Edited to add my own variables

var habEnableTabPersistence=0 //enable tab persistence via session only cookies, so selected tab is remembered?

////NO NEED TO EDIT BELOW////////////////////////
var habTabContentIDs=new Object()

function habExpandContent(linkobj){
  var ulid=linkobj.parentNode.parentNode.id //id of UL element
  var ullist=document.getElementById(ulid).getElementsByTagName("li") //get list of LIs corresponding to the tab contents
  for (var i=0; i<ullist.length; i++){
   ullist[i].className=""  //deselect all tabs
   if (typeof habTabContentIDs[ulid][i]!="undefined") //if tab content within this array index exists (exception: More tabs than there are tab contents)
    document.getElementById(habTabContentIDs[ulid][i]).style.display="none" //hide all tab contents
  }
  linkobj.parentNode.className="selected"  //highlight currently clicked on tab
  document.getElementById(linkobj.getAttribute("rel")).style.display="block" //expand corresponding tab content
  habSaveSelectedTabcontentID(ulid, linkobj.getAttribute("rel"))
}

function saveHabTabContentIDs(ulid, relattribute){// save ids of tab content divs
  if (typeof habTabContentIDs[ulid]=="undefined") //if this array doesn't exist yet
  habTabContentIDs[ulid]=new Array()
  habTabContentIDs[ulid][habTabContentIDs[ulid].length]=relattribute
}

function habSaveSelectedTabcontentID(ulid, selectedtabid){ //set id of clicked on tab as selected tab id & enter into cookie
  if (habEnableTabPersistence==1) //if persistence feature turned on
   habTabSetCookie(ulid, selectedtabid)
}

function habGetULListLinkById(ulid, tabcontentid){ //returns a tab link based on the ID of the associated tab content
  var ullist=document.getElementById(ulid).getElementsByTagName("li")
  for (var i=0; i<ullist.length; i++){
   if (ullist[i].getElementsByTagName("a")[0].getAttribute("rel")==tabcontentid){
    return ullist[i].getElementsByTagName("a")[0]
    break
   }
  }
}

function habInitializeTabContent(){
  for (var i=0; i<arguments.length; i++){ //loop through passed UL ids
   if (habEnableTabPersistence==0 && habTabGetCookie(arguments[i])!="") //clean up cookie if persist=off
    habTabSetCookie(arguments[i], "")
   var clickedontab=habTabGetCookie(arguments[i]) //retrieve ID of last clicked on tab from cookie, if any
   var ulobj=document.getElementById(arguments[i])
   var ulist=ulobj.getElementsByTagName("li") //array containing the LI elements within UL
   for (var x=0; x<ulist.length; x++){ //loop through each LI element
    var ulistlink=ulist[x].getElementsByTagName("a")[0]
    if (ulistlink.getAttribute("rel")){
     saveHabTabContentIDs(arguments[i], ulistlink.getAttribute("rel")) //save id of each tab content as loop runs
     ulistlink.onclick=function(){
      habExpandContent(this)
      return false
     }
     if (ulist[x].className=="selected" && clickedontab=="") //if a tab is set to be selected by default
      habExpandContent(ulistlink) //auto load currenly selected tab content
    }
   } //end inner for loop
   if (clickedontab!=""){ //if a tab has been previously clicked on per the cookie value
    var culistlink=habGetULListLinkById(arguments[i], clickedontab)
    if (typeof culistlink!="undefined") //if match found between tabcontent id and rel attribute value
     habExpandContent(culistlink) //auto load currenly selected tab content
    else //else if no match found between tabcontent id and rel attribute value (cookie mis-association)
     habExpandContent(ulist[0].getElementsByTagName("a")[0]) //just auto load first tab instead
   }
  } //end outer for loop
}


function habTabGetCookie(Name){ 
  var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
  if (document.cookie.match(re)) //if cookie found
   return document.cookie.match(re)[0].split("=")[1] //return its value
   return ""
}

function habTabSetCookie(name, value){
  document.cookie = name+"="+value //cookie value is domain wide (path=/)
}