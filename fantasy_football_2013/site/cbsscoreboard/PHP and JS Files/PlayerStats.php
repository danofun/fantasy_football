<?php
$playerID = $_GET['playerid'];
$baseURL  = $_GET['baseurl'];
$leagueid = $_GET['leagueid'];
$year     = $_GET['year'];

if(!isset($_GET['width'])) $width = 550; else $width = $_GET['width'];

if(!isset($_GET['loaded'])) {

	$which = "PlayerStats";

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
	<title>MFL Player Stats</title>
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

	$nobio = strpos($str,"Player Biography");
	$nostats = strpos($str,"player_stats_table");
	if($nostats==0) {
		$str = "<h3>No Statistics for this Player</h3>";
	} else {
		if($nobio==0) {
			$startdata = strpos($str,'</div>') + 6;
		} else {
			$startdata = strpos($str,'width="67%">') + 12;
		}
		$str = substr($str,$startdata,strlen($str));

		$enddata   = strpos($str,'<td class="reportfooter') - 24;
		$str       = substr($str,0,$enddata)."</table>";
 
 		//Remove form
		$startform   = strpos($str,"<form");
		$endform     = strpos($str,"</form>")+7;

		$beforeform  = substr($str,0,$startform);
		$afterform   = substr($str,$endform,strlen($str));

		$str = $beforeform.$afterform;

		//Remove span
		$startspan   = strpos($str,"<span");
		$endspan     = strpos($str,"</span>")+7;

		$beforespan  = substr($str,0,$startspan);
		$afterspan   = substr($str,$endspan,strlen($str));

		$str = $beforespan.$afterspan;

		//Remove caption
		$startcaption   = strpos($str,"<caption");
		$endcaption     = strpos($str,"</caption>")+10;

		$beforecaption  = substr($str,0,$startcaption);
		$aftercaption   = substr($str,$endcaption,strlen($str));

		$str = $beforecaption.$aftercaption;

		//Replace class="report" with class="report" style="width: 95%"
		$str = ereg_replace('class="report"', 'class="report" style="width: 95%"', $str);
		
		//Replace table row for the form element removed previously
		$str = ereg_replace('<tr><th colspan="11"></th></tr>', '', $str);
		
		//Replace stray ">" 
		$str = ereg_replace('</tr><</table>', '</tr></table>', $str);		
	}

	print "<table border='0' align='center'><tr class='oddtablerow'><td style='text-align: center;'><a href='PlayerNews.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>News</a> | <a href='PlayerBio.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>Biography</a> | Stats ".$year." | <a href='PlayerStatsHistory.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>Stat History</a></td></tr></table><br />"; 
	print "$str";

	?>

	</body>
	</html>

<?php
}
?>