<?php

$playerID = $_GET['playerid'];
$baseURL  = $_GET['baseurl'];
$leagueid = $_GET['leagueid'];
$year     = $_GET['year'];
if(!isset($_GET['width'])) $width = 550; else $width = $_GET['width'];
if(!isset($_GET['which'])) $which = "PlayerNews"; else $which = $_GET['which'];
if(!isset($_GET['week'])) $week = 1; else $week = $_GET['week'];
if(!isset($_GET['fid'])) $fid = "0001"; else $fid = $_GET['fid'];

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>RE-DIRECT</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"  />
<meta HTTP-EQUIV="REFRESH" content="0; url=http://nitrografixx.com/habman_js/<?php print $which.".php?playerid=".$playerID."&baseurl=".$baseURL."&leagueid=".$leagueid."&year=".$year."&width=".$width."&week=".$week."&fid=".$fid."&which=".$which."&loaded=1"; ?> ">
</head>
<style type='text/css'>
body{background:none;}
</style>


<body>
<br />
<center>
<img src="http://nitrografixx.com/habman_js/loading2.gif" alt="loading. . . " />
<br />
<br />
please wait while page loads . . . 
</center>
</body>
</html>