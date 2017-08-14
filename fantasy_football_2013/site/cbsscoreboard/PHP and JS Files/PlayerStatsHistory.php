<?php
$playerID = $_GET['playerid'];
$baseURL  = $_GET['baseurl'];
$leagueid = $_GET['leagueid'];
$year     = $_GET['year'];

if(!isset($_GET['width'])) $width = 550; else $width = $_GET['width'];

if(!isset($_GET['loaded'])) {

	$which = "PlayerStatsHistory";
	
	?>
	<html>
	<head>
	<title>RE-DIRECT</title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
	<meta HTTP-EQUIV="REFRESH" content="0; url=http://nitrografixx.com/habman_js/<?php print "PlayerLoading.php?playerid=".$playerID."&baseurl=".$baseURL."&leagueid=".$leagueid."&year=".$year."&width=".$width."&which=".$which; ?> ">
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
	<title>MFL Player News</title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
	<link rel="stylesheet" id="skin_stylesheet" href="http://www4.myfantasyleague.com/skins/mfl2010blue/mfl2010blue.css" type="text/css"  />

	<style type='text/css'>
	body {background-color:#FFFFFF;}
	#habPopupWindow {background-image:none;}
	</style>
	</head>
	<body id="habPopupWindow">

	<?php

	$embedfile = "http://football8.myfantasyleague.com/".$year."/player?P=".$playerID;
	$str = file_get_contents($embedfile);

	$nostats = strpos($str,"<span>Player Stats</span>");

	if($nostats==0) {
		$str = "<h3>No Stat History for this Player</h3>";
	} else {
		$startdata = strpos($str,"<span>Player Stats</span>") - 62;
		$str = substr($str,$startdata,strlen($str));
	
		$enddata = strpos($str,"</table>") + 8;
		$str = substr($str,0,$enddata);

		//Remove caption
		$startcaption   = strpos($str,"<caption");
		$endcaption     = strpos($str,"</caption>")+10;

		$beforecaption  = substr($str,0,$startcaption);
		$aftercaption   = substr($str,$endcaption,strlen($str));

		$str = $beforecaption.$aftercaption;

		//Replace all occurrences of %LEAGUEID% with leagueid
		$str = ereg_replace('%LEAGUEID%', $leagueid, $str);
 
		//Replace all player? with link back to MFL
		$str = ereg_replace('player\?', 'PlayerBio.php?leagueid='.$leagueid.'&baseurl='.$baseURL.'&year='.$year.'&playerid='.$playerID.'&width='.$width.'&', $str);

		//Replace class="report" with class="report" style="width: 95%"
		$str = ereg_replace('class="report"', 'class="report" style="width: 95%"', $str);
	}

	print "<table border='0' align='center'><tr class='oddtablerow'><td style='text-align: center;'><a href='PlayerNews.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>News</a> | <a href='PlayerBio.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>Biography</a> | <a href='PlayerStats.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>Stats ".$year."</a> | Stat History</td></tr></table><br />"; 
	print "$str";

	?>

	</body>
	</html>
<?php
}
?>