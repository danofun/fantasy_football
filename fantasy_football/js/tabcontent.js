{\rtf1\ansi\ansicpg1252\cocoartf949\cocoasubrtf460
{\fonttbl\f0\fmodern\fcharset0 Courier;\f1\fmodern\fcharset0 Courier-Bold;}
{\colortbl;\red255\green255\blue255;\red54\green66\blue113;\red249\green251\blue254;\red252\green0\blue8;
\red255\green255\blue12;}
\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl380\ql\qnatural

\f0\fs24 \cf2 \cb3 //** 
\f1\b \cf4 \cb5 Tab
\f0\b0 \cf2 \cb3  Content script- \'a9 Dynamic Drive DHTML code library (http://www.dynamicdrive.com)\
//** Last updated: June 29th, 06\
\
var enabletabpersistence=1 //enable 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  persistence via session only cookies, so selected 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  is remembered?\
\
////NO NEED TO EDIT BELOW////////////////////////\
var tabcontentIDs=new Object()\
\
function expandcontent(linkobj)\{\
var ulid=linkobj.parentNode.parentNode.id //id of UL element\
var ullist=document.getElementById(ulid).getElementsByTagName("li") //get list of LIs corresponding to the 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  contents\
for (var i=0; i<ullist.length; i++)\{\
ullist[i].className=""\'a0\'a0//deselect all tabs\
if (typeof tabcontentIDs[ulid][i]!="undefined") //if 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  content within this array index exists (exception: More tabs than there are 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  contents)\
document.getElementById(tabcontentIDs[ulid][i]).style.display="none" //hide all 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  contents\
\}\
linkobj.parentNode.className="selected"\'a0\'a0//highlight currently clicked on 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3 \
document.getElementById(linkobj.getAttribute("rel")).style.display="block" //expand corresponding 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  content\
saveselectedtabcontentid(ulid, linkobj.getAttribute("rel"))\
\}\
\
function savetabcontentids(ulid, relattribute)\{// save ids of 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  content divs\
if (typeof tabcontentIDs[ulid]=="undefined") //if this array doesn't exist yet\
tabcontentIDs[ulid]=new Array()\
tabcontentIDs[ulid][tabcontentIDs[ulid].length]=relattribute\
\}\
\
function saveselectedtabcontentid(ulid, selectedtabid)\{ //set id of clicked on 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  as selected 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  id & enter into cookie\
if (enabletabpersistence==1) //if persistence feature turned on\
setCookie(ulid, selectedtabid)\
\}\
\
function getullistlinkbyId(ulid, tabcontentid)\{ //returns a 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  link based on the ID of the associated 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  content\
var ullist=document.getElementById(ulid).getElementsByTagName("li")\
for (var i=0; i<ullist.length; i++)\{\
if (ullist[i].getElementsByTagName("a")[0].getAttribute("rel")==tabcontentid)\{\
return ullist[i].getElementsByTagName("a")[0]\
break\
\}\
\}\
\}\
\
function initializetabcontent()\{\
for (var i=0; i<arguments.length; i++)\{ //loop through passed UL ids\
if (enabletabpersistence==0 && getCookie(arguments[i])!="") //clean up cookie if persist=off\
setCookie(arguments[i], "")\
var clickedontab=getCookie(arguments[i]) //retrieve ID of last clicked on 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  from cookie, if any\
var ulobj=document.getElementById(arguments[i])\
var ulist=ulobj.getElementsByTagName("li") //array containing the LI elements within UL\
for (var x=0; x<ulist.length; x++)\{ //loop through each LI element\
var ulistlink=ulist[x].getElementsByTagName("a")[0]\
if (ulistlink.getAttribute("rel"))\{\
savetabcontentids(arguments[i], ulistlink.getAttribute("rel")) //save id of each 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  content as loop runs\
ulistlink.onclick=function()\{\
expandcontent(this)\
return false\
\}\
if (ulist[x].className=="selected" && clickedontab=="") //if a 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  is set to be selected by default\
expandcontent(ulistlink) //auto load currenly selected 
\f1\b \cf4 \cb5 tab
\f0\b0 \cf2 \cb3  content\
\}}