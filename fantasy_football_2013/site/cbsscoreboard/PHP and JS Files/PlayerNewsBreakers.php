<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>MFL Player News Breaker JS Creator</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
</head>
<body>
<?php

$page = 0;
$datafound = 1;
$playerFound = array();

while ($datafound==1&&$page<2500) {
	$embedfile = "http://football.myfantasyleague.com/2012/news_articles?L=&DAYS=7&SOURCE=*&START_WITH=".$page;
	$str = file_get_contents($embedfile);
	$str = str_replace("&P=","&amp;P=",$str);
	$datafound = 0;

	while ( (strpos($str,"&amp;P=") > 0) && ( (strpos($str,"minutes</td>")>0) || (strpos($str,"hours</td>")>0)  || (strpos($str,"day</td>")>0) ) ) { 
		$datafound = 1;
		$startdata = strpos($str,"&amp;P=") + 7;
		$playerid  = intval(substr($str,$startdata,5));
  
		$str       = substr($str,$startdata,strlen($str));

		$playerFound[$playerid] = "new_".$playerid;
	}
	while ( (strpos($str,"&amp;P=") > 0) && ( (strpos($str,">2 days</td>")>0) || (strpos($str,">3 days</td>")>0)  || (strpos($str,">4 days</td>")>0)  || (strpos($str,">5 days</td>")>0)  || (strpos($str,">6 days</td>")>0)  || (strpos($str,">7 days</td>")>0) ) ) { 
		$datafound = 1;
		$startdata = strpos($str,"&amp;P=") + 7;
		$playerid  = intval(substr($str,$startdata,5));
		$str       = substr($str,$startdata,strlen($str));

		if(!isset($playerFound[$playerid])) $playerFound[$playerid] = "old_".$playerid;
	}
	$page = $page + 100;
}





//WRITE THE NEWS BREAKERS TO THE JS FILE

$textfile = fopen("habNewsBreakers.js","w");
if(!$textfile) {
	echo 'Error, the file could not be opened or there was an error creating it.';
	exit;
}

$text = "habNewsBreakers = new Array();";
print"$text<br />\n";
fwrite($textfile, "$text\n");

foreach($playerFound as $thisID) {
	$id   = substr($thisID,4,5);
	$item = substr($thisID,0,3);
	$text = "habNewsBreakers['".$id."'] = '".$item."';";
	print"$text<br />\n";
	fwrite($textfile, "$text\n");
}
fclose($textfile);

print "<br /><br />Write Successful!\n";
?>

</body>
</html>