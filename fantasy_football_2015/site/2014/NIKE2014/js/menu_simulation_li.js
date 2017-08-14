//THIS SCRIPT WILL SIMULATE THE CURRENT MILONIC MENU
// array _mi is created by the milonic menu and we will use that to create our simulated
// menu based on criteria that is know to us

function DynamicMainMenuCreation(menuID,menuName) 
{
	var MainMenuSource = "";
	var LinksForMenu = "";
	MainMenuSource += "	<ul>\n";
	
	for(var x1=0; x1<_mi.length; x1++) 
	{	
		if(_mi[x1][0]==menuID) 
		{
			if(_mi[x1][2]==undefined) 
			{
				if(_mi[x1][1].indexOf("form")>0) 
				{
					LinksForMenu += "<li><a class=\"search\"><span>"+_mi[x1][1]+"</span></a>\n";
				}
				else 
				{
					LinksForMenu += "<li><a href=\"#\">"+_mi[x1][1]+"</a></li>\n";
				}
			} 
			else 
			{
				// Get current menu name to work on
				var CurrentMenuName = _mi[x1][1];
				// Make all characters to lower case
				CurrentMenuName = CurrentMenuName.toLowerCase();
				menuName = menuName.toLowerCase();
				// Removing unnecessary charecters
				CurrentMenuName = CurrentMenuName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
				menuName = menuName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
				
				LinksForMenu += "<li><a href=\""+_mi[x1][2]+"\">"+_mi[x1][1]+"</a>\n";
				
				//console.log(menuName);
				
				//$("ul#menu li."+menuName+" ul li."+CurrentMenuName+" a").attr("href",_mi[x1][2]);
				//LinksForMenu += "			<li><a href=\""+_mi[x1][2]+"\">"+_mi[x1][1]+"</a></li>\n";
			}
		}
	} 
	
	// custom links to add at top/bottom
	var TempMenuSource=LinksForMenu;
	try 
	{
		if(UserDefinedLinksOfCss[menuName].length>0) 
		{
			for(var x1=0; x1<UserDefinedLinksOfCss[menuName].length; x1++) 
			{
				if(UserDefinedLinksOfCss[menuName][x1][2]==0)
					TempMenuSource ="			<li><a href=\""+UserDefinedLinksOfCss[menuName][x1][0]+"\">"+UserDefinedLinksOfCss[menuName][x1][1]+"</a></li>\n" + TempMenuSource;
				else
					TempMenuSource+="			<li><a href=\""+UserDefinedLinksOfCss[menuName][x1][0]+"\">"+UserDefinedLinksOfCss[menuName][x1][1]+"</a></li>\n";
			}
		}
	} catch(er) 
	{
		TempMenuSource=LinksForMenu;
	}
	
	MainMenuSource+=TempMenuSource;
	MainMenuSource+="	</ul>\n";
	//return MainMenuSource;
	$("li."+menuName).append(MainMenuSource);
	return "";
	
}


function MainMenuFLYSourceCreation(menuID,menuName,SuperMenu) {

	var temp_superMenu = SuperMenu;

	var cleanMenuName = menuName.toLowerCase();
	cleanMenuName = cleanMenuName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');

	if(SuperMenu != "")
	{
		SuperMenu = SuperMenu + "-";
	}

	var MainMenuSource="";
	var LinksForMenu="";
	var isFormPresent = 0;
	MainMenuSource+="			<ul>\n";
	for(var x1=0; x1<_mi.length; x1++) 
	{
		if(_mi[x1][0]==menuID) 
		{
			if(_mi[x1][2]==undefined) 
			{
				if(_mi[x1][1].indexOf("form")>0) 
				{
					LinksForMenu+="<li><a class=\"search\"><span>"+_mi[x1][1]+"</span></a>\n";
					isFormPresent = 1;
					
				}
				else
				{
					LinksForMenu+= "<li><a href=\"#\">"+_mi[x1][1]+"</a></li>\n";
				}
			} 
			else 
			{
				LinksForMenu+= "<li><a href=\""+_mi[x1][2]+"\">"+_mi[x1][1]+"</a></li>\n";
			}
		}
	}
	// custom links to add at top/bottom
	var TempMenuSource=LinksForMenu;
	try {
		if(UserDefinedLinksOfCss[menuName].length>0) {
			for(var x1=0; x1<UserDefinedLinksOfCss[menuName].length; x1++) {
				if(UserDefinedLinksOfCss[menuName][x1][2]==0)
					TempMenuSource ="			<li><a href=\""+UserDefinedLinksOfCss[menuName][x1][0]+"\">"+UserDefinedLinksOfCss[menuName][x1][1]+"</a></li>\n" + TempMenuSource;
				else
					TempMenuSource+="			<li><a href=\""+UserDefinedLinksOfCss[menuName][x1][0]+"\">"+UserDefinedLinksOfCss[menuName][x1][1]+"</a></li>\n";
			}
		}
	} catch(er) {
		TempMenuSource=LinksForMenu;
	}
	MainMenuSource+=TempMenuSource;
	MainMenuSource+="</ul>\n";
	if(isFormPresent == 0)
	{
		$("li."+SuperMenu+cleanMenuName).append(MainMenuSource);
	}
	else
	{
		$("li."+temp_superMenu).append(MainMenuSource);
	}
	
	//return MainMenuSource;
}

function SubMenuSourceCreation(subMenuItem) {
	var SuperMenuOfCurMenu = "";
	if(subMenuItem == "Franchise")
	{
		SuperMenuOfCurMenu = "reports";
	}
	else if(subMenuItem == "My Links")
	{
		SuperMenuOfCurMenu = "links";
	}

	var IsFormHere = 0;
	var xSubCount=0;
	var xSubMenu=-1;
	var RootOfSubMenu = new Array();
	var MainMenuSource="";
	while (xSubMenu==-1&&xSubCount<_mi.length) {
		if(_mi[xSubCount][1]==subMenuItem) xSubMenu = _mi[xSubCount][0];
		xSubCount++;
	}
		
	if(xSubMenu!=-1) {
		for(var x1=0; x1<_mi.length; x1++) 
		{
			if(_mi[x1][0]==xSubMenu) RootOfSubMenu[RootOfSubMenu.length] = new Array(_mi[x1][1],_mi[x1][2]);
		}
		MainMenuSource+="	<ul>\n";
		
		for(var x1=0; x1<RootOfSubMenu.length; x1++) 
		{
		
			if(RootOfSubMenu[x1][1]==undefined) 
			{
				if(RootOfSubMenu[x1][0].indexOf("form")>0)
				{
					MainMenuSource+="<li><a><span>"+RootOfSubMenu[x1][0]+"</span></a>\n";
					$("li.playersearch").html(RootOfSubMenu[x1][0]);
					//$("li."+SuperMenuOfCurMenu+" ul").first().append("<li><a><span>"+RootOfSubMenu[x1][0]+"</span></a>\n");
					//console.log(xSubMenu);
				}
				else
				{
					MainMenuSource+="			<li><a href=\"#\"><span>"+RootOfSubMenu[x1][0]+"</span></a>\n";
				}
			} 
			else 
			{
				MainMenuSource+="			<li><a href=\""+RootOfSubMenu[x1][1]+"\"><span>"+RootOfSubMenu[x1][0]+"</span></a>\n";
			}
			
			switch(RootOfSubMenu[x1][0]) {
				case "Franchise":
					var subSearchItem = "Rosters";
					break;
				case "Player":
					var subSearchItem = "My Top Performers";
					break;
				case "Standings":
					var subSearchItem = "Power Rank";
					break;
				case "Rules":
					var subSearchItem = "League Bylaws";
					break;
				case "Wireless":
					var subSearchItem = "Login/Logout";
					break;
				case "League":
					var subSearchItem = "Live Scoring Summary";
					break;
				case "Records":
					var subSearchItem = "Franchise Records";
					break;
				case "NFL":
					var subSearchItem = "Injury Report";
					break;
				case "My Links":
					var subSearchItem = "Edit My Links";
					break;
				case "League Links":
					var subSearchItem = "Edit League Links";
					break;
				case "Fantasy Links":
					var subSearchItem = "ADP";
					break;
				case "NFL Links":
					var subSearchItem = "NFL.com";
					break;
				default:
					var subSearchItem = "not found";
			}
			if(subSearchItem!="not found")
			{
				var xxSubCount = 0;
				var xxSubMenu = -1;
				while (xxSubMenu==-1&&xxSubCount<_mi.length) 
				{
					if(_mi[xxSubCount][1]==subSearchItem) xxSubMenu = _mi[xxSubCount][0];
					{
						xxSubCount++;
					}
				}
				if(xxSubMenu!=-1) 
				{
					MainMenuSource+= MainMenuFLYSourceCreation(xxSubMenu,RootOfSubMenu[x1][0],SuperMenuOfCurMenu);
				}
			}
		}
		MainMenuSource+="	</ul>\n";
	}
	

	return MainMenuSource;
}
	
// BEGIN CREATION OF DYNAMIC MENU	
var pureCssRootMenu = new Array();
for(var x=0; x<_mi.length; x++) {
	if(_mi[x][0]==0) pureCssRootMenu[pureCssRootMenu.length] = new Array(_mi[x][1],_mi[x][2]); //ROOT MENU NAME, ROOT MENU LINK
}
	
var Temp_HTMLToDisplay="";
Temp_HTMLToDisplay+="<div id=\"holder\">\n";
Temp_HTMLToDisplay+="<ul id=\"menu\">\n";

for (var x=0; x<pureCssRootMenu.length; x++) 
{	
	//LOOP THROUGH THE ROOT MENU
	Temp_HTMLToDisplay+="<li><a class=\"sub\" tabindex=\"1\" href=\""+pureCssRootMenu[x][1]+"\"><span>"+pureCssRootMenu[x][0]+"</span></a>\n";	
	Temp_HTMLToDisplay+="<img src=\"http://nitrografixx.com/a/menu1/click-concertina2/up-minus.gif\" alt=\"\" />";
	
	// based on the ROOT MENU NAME trigger a search on the menu or sub-menu required
	switch(pureCssRootMenu[x][0]) {
		case "My Leagues":
			var hasSubMenu = false;
			var searchItem = "Find A League";
			break;
		case "Reports":
			var hasSubMenu = true;
			var searchItem = "Franchise";
			break;
		case "For Owners":
			var hasSubMenu = false;
			var searchItem = "Change Password";
			break;
		case "For Commissioners":
			var hasSubMenu = false;
			var searchItem = "Setup";
			break;
		case "Communications":
			var hasSubMenu = false;
			var searchItem = "Email to Commissioner";
			break;
		case "This Page":
			var hasSubMenu = false;
			var searchItem = "Mail This Page";
			break;
		case "Links":
			var hasSubMenu = true;
			var searchItem = "My Links";
			break;
		case "Help":
			var hasSubMenu = false;
			var searchItem = "Help Center";
			break;
		default:
			var hasSubMenu = false;
			var searchItem = "not found";
	}
	if(searchItem!="not found") {
		if(hasSubMenu) 
		{
			Temp_HTMLToDisplay+= SubMenuSourceCreation(searchItem);
		} 
		else 
		{ // add links but first we need to find the proper menu
			var xCount = 0;
			var xMenu = -1;
			while (xMenu==-1&&xCount<_mi.length) {
				if(_mi[xCount][1]==searchItem) xMenu = _mi[xCount][0];
				xCount++;
			}
			if(xMenu!=-1) Temp_HTMLToDisplay+= DynamicMainMenuCreation(xMenu,pureCssRootMenu[x][0]);
		}
	}
}

//ADD OWNER/COMMISSIONER LOGIN
// WE MAY NOT NEED LOGIN/LOGOUT LINKS FOR NOW
var HTMLForLoginLogoutLink = "";
/*if(franchise_id==undefined || (franchise_id!=undefined && franchise_id!="0000"))*/
if(franchise_id==undefined || (franchise_id!=undefined && franchise_id!="0000"))
{
	$("li.forcommissioners").hide();
	$("li.hidecommish").remove();
	$("div.hidecommish").remove();
}
if(franchise_id==undefined)
{
	var franchise_id;
	//Temp_HTMLToDisplay += "	<li><a href=\""+baseURLDynamic+"/"+year+"/login?L="+league_id+"\">Log In</a>\n";
	HTMLForLoginLogoutLink += "<a href=\""+baseURLDynamic+"/"+year+"/login?L="+league_id+"\">Log In</a>\n";
	$("li.forcommissioners").hide();
	$("li.hidecommish").remove();
	$("div.hidecommish").remove();
} 

else if(franchise_id=="" || franchise_id==undefined) 
{
	//Temp_HTMLToDisplay += "	<li><a href=\""+baseURLDynamic+"/"+year+"/login?L="+league_id+"\">Log In</a>\n";
	HTMLForLoginLogoutLink += "<a href=\""+baseURLDynamic+"/"+year+"/login?L="+league_id+"\">Log In</a>\n";
} 
else 
{
	//Temp_HTMLToDisplay += "	<li><a href=\""+baseURLDynamic+"/"+year+"/logout?L="+league_id+"\">Log Out</a>\n";
	HTMLForLoginLogoutLink += "<a href=\""+baseURLDynamic+"/"+year+"/logout?L="+league_id+"\">Log Out</a>\n";
}


// Add login or Logout link
$("li.loginorlogout").append(HTMLForLoginLogoutLink);
$("span.loginorlogout").append(HTMLForLoginLogoutLink);

Temp_HTMLToDisplay+="</ul>\n";
Temp_HTMLToDisplay+="</div>\n";

//document.write(Temp_HTMLToDisplay);