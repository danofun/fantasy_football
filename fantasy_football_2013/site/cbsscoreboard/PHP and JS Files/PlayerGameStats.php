<?php
$playerID = $_GET['playerid'];
$baseURL  = $_GET['baseurl'];
$leagueid = $_GET['leagueid'];
$year     = $_GET['year'];
$fid      = $_GET['fid'];
$weekID   = $_GET['week'];

if(!isset($_GET['width'])) $width = 550; else $width = $_GET['width'];

if(!isset($_GET['loaded'])) {

	$which = "PlayerGameStats";

	?>
	<html>
	<head>
	<title>RE-DIRECT</title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
	<meta HTTP-EQUIV="REFRESH" content="0; url=http://nitrografixx.com/habman_js/<?php print "PlayerLoading.php?playerid=".$playerID."&baseurl=".$baseURL."&leagueid=".$leagueid."&year=".$year."&fid=".$fid."&week=".$weekID."&width=".$width."&which=".$which; ?> ">
	</head>
	<body>
	</body>
	</html>

	<?php

} else {


	?>

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-transitional.dtd">
	<html>
	<head>
	<title>MFL Player Game Stats</title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
	<link rel="stylesheet" id="skin_stylesheet" href="http://www4.myfantasyleague.com/skins/mfl2010blue/mfl2010blue.css" type="text/css"  />
	
	<style type='text/css'>
	table { width: 95%; }
	#habPopupWindow {background-image:none;}
	caption{
		text-align:center;
		padding:5px 5px 5px 5px;
		font-size:12px;
		font-weight:bold;
		text-transform: uppercase;
		background-color: #444444;
		background-image: none;
		color:#FFFFFF;
		width:auto;
	}
	</style>
	</head>
	<body id="habPopupWindow">
	<?php

	//need to change to the football server if on www server
	$baseURLFootball = ereg_replace('www', 'football', $baseURL);
	
	$embedfile = $baseURLFootball."/".$year."/detailed?L=".$leagueid."&P=".$playerID."&W=".$weekID."&YEAR=".$year;
	$str = file_get_contents($embedfile);

	//P=playerid work backwards to the first occurrence of <tr
	//$playerPos = strpos($str, "&amp;P=".$playerid."\"");
	//$startPos = strrpos(substr($str,0,$playerPos), "<tr ");
	$startPos = strpos($str,"<th>Event</th></tr>")+19;
	
	$str = substr($str,$startPos,strlen($str));
	
	$endPos = strpos($str,"Subtotal</b></td></tr>")+22;
	$str = substr($str,0,$endPos);

	$newstr = "<table align='center'><caption>Up-to-Date Stats for Week ".$weekID."</caption><tbody><tr><th>Player</th><th>Pts</th><th>&nbsp;Event&nbsp;</th></tr>".$str."</tbody></table>";

	print $newstr;
	
	?>

	</body>
	</html>

<?php
}
?>