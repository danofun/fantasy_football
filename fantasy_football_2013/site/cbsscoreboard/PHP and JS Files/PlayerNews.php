<?php
$playerID = $_GET['playerid'];
$baseURL  = $_GET['baseurl'];
$leagueid = $_GET['leagueid'];
$year     = $_GET['year'];

if(!isset($_GET['width'])) $width = 550; else $width = $_GET['width'];

if(!isset($_GET['loaded'])) {

	$which = "PlayerNews";
	
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

	$embedfile = "http://football8.myfantasyleague.com/".$year."/news_articles?PLAYERS=".$playerID;
	$str = file_get_contents($embedfile);

	$nonews    = strpos($str,"No News Articles Met Search Criteria");
	if($nonews>0) {
		$str = "<h3>No recent news for this Player</h3>";
	} else {
		$startdata = strpos($str,"</form>") + 7;
		$str = substr($str,$startdata,strlen($str));

		$enddata = strpos($str,"</table>") + 8;
		$str = substr($str,0,$enddata);

		//Remove the ads from <div to </div>
		$startad = strpos($str,"<div");
		$endad = strpos($str,"</div>")+6;

		$beforead = substr($str,0,$startad);
		$afterad = substr($str,$endad,strlen($str));

		$str = $beforead.$afterad;

		//Remove the ad from within the fourth TD of table;  also remove last TH
		$startadTD = strpos($str,"<td rowspan");
		$endadTD = strpos($str,"</td></tr>")+5;

		$beforeadTD = substr($str,0,$startadTD);
		$afteradTD = substr($str,$endadTD,strlen($str));

		$str = $beforeadTD.$afteradTD;
		
		$startadTH = strpos($str,"<th>&nbsp;</th>");
		$endadTH = strpos($str,"<th>&nbsp;</th>")+15;

		$beforeadTH = substr($str,0,$startadTH);
		$afteradTH = substr($str,$endadTH,strlen($str));

		$str = $beforeadTH.$afteradTH;
		
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

		//Replace all occurrences of %LEAGUEID% with leagueid
		$str = ereg_replace('%LEAGUEID%', $leagueid, $str);
 
		//Replace all player? with link back to MFL
		$str = ereg_replace('player\?', 'PlayerBio.php?leagueid='.$leagueid.'&baseurl='.$baseURL.'&year='.$year.'&playerid='.$playerID.'&width='.$width.'&', $str);

		//Replace links to news articles
		$str = ereg_replace('view_news_article\?L=', 'http://football.myfantasyleague.com/'.$year.'/view_news_article?L='.$leagueid, $str);
		$str = ereg_replace('>More</a>', ' target="_blank">More</a>', $str);

		//Replace class="report" with class="report" style="width: 95%"
		$str = ereg_replace('class="report"', 'class="report" style="width: 95%"', $str);
	}

	print "<table border='0' align='center'><tr class='oddtablerow'><td style='text-align: center;'>News | <a href='PlayerBio.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>Biography</a> | <a href='PlayerStats.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>Stats ".$year."</a> | <a href='PlayerStatsHistory.php?leagueid=".$leagueid."&baseurl=".$baseURL."&year=".$year."&playerid=".$playerID."&width=".$width."' target='_self'>Stat History</a></td></tr></table><br />"; 
	print "$str";

	?>

	</body>
	</html>
<?php
}
?>