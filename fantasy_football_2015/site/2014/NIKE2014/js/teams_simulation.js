// JavaScript Document

$(document).ready(function(){
	//console.log(baseURLDynamic+" ||| "+year+" ||| "+league_id);
	
	// Get XML of DIVISIONS 
	/*alert(baseURLStatic);
	for(var b in window) { 
	  if(window.hasOwnProperty(b)) console.log(b); 
	}baseURLDynamic*/
	
	
	
	var Current_C_URL = $(location).attr('host');
	if(Current_C_URL.indexOf("http://")==-1) {
		Current_C_URL = "http://"+Current_C_URL;
	}
	AjaxData = {
		TYPE : 'league',
		L : league_id,
		JSON : '1'
	};
	
	/*Object.prototype.getConstructorName = function () {
		var str = (this.prototype ? this.prototype.constructor : this.constructor).toString();
		var cname = str.match(/function\s(\w*)/)[1];
		var aliases = ["", "anonymous", "Anonymous"];
		return aliases.indexOf(cname) > -1 ? "Function" : cname;
	}*/

	
	//alert(CurrentURL);
	$.ajax({
		//url : baseURLStatic+'/'+year+'/export?TYPE=league&L='+league_id+'&JSON=1',
		url : Current_C_URL+'/'+year+'/export',
		data : AjaxData,
		type: "GET",
		dataType: "json",
		//jsonp: 'jsonp',
		success : function(data){
			var TotalNoOfDivisions = 0;
			var TotalNoOfFranchises = 0;
			// Parse the returned JSON and fill up the appropriate DIVS 
			$.each(data, function(index, element) {
				if(index=="league")
				{
					//console.log(element);
					// Iterate through LEAGUES
					$.each(element, function(league_index, league_json) {
						//console.log(league_json);
						if(league_index=="divisions")
						{
							//console.log(league_json);
							$.each(league_json,function(divisions_index,divisions_json){
								//console.log(divisions_index);
								if(divisions_index=="count")
								{
									TotalNoOfDivisions = divisions_json;
								}
								if(divisions_index=="division")
								{
									$.each(divisions_json,function(singledivision_index,singledivision_json){								   
										try
										{
											var D_idd = "";
											var D_fname = "";
											var F_fconfrence = "";
											$.each(singledivision_json,function(d_i,d_elmt){
												
												if(d_i=="id")
												{
													D_idd = d_elmt;
												}
												if(d_i=="name")
												{
													D_fname = d_elmt;
												}
												if(d_i=="conference")
												{
													F_fconfrence = d_elmt;
												}
												
												//console.log(d_elmt);
											});
										//console.log(D_fname);
											
											$("#teamsdivisions ul li.division"+D_idd+" span").html(D_fname);
											
											
											/*var CurrentJsonArray = JSON.stringify(singledivision_json);
											var NameAndIdArray = CurrentJsonArray.split(",");
											var DivisionName = NameAndIdArray[0].split(":")[1];
											DivisionName = DivisionName.replace(/(^")|("$)/g, "");
											var DivisionId = NameAndIdArray[1].split(":")[1];
											DivisionId = DivisionId.replace(/(^")|("}$)/g, "");
											
											$("#teamsdivisions ul li.division"+DivisionId+" span").html(DivisionName);*/

										}catch(exc){}
										
									});
									
								}
							});
						}
						
						// Now, Populate all franchises name and their icon under their respective DIVISION 
						if(league_index=="franchises")
						{
							$.each(league_json, function(franchise_index, franchise_json) {
								
								
								if(franchise_index=="count")
								{
									TotalNoOfFranchises = franchise_json;
								}
								if(franchise_index=="franchise")
								{
									var Single_li_Created = false;
									$.each(franchise_json,function(singlefranchise_index,singlefranchise_json){								   
										try
										{
											var F_fran_Icon = "";
											var F_fran_division = "00";
											var F_fran_name = "";
											var F_fran_id = "000";
											var IsDivisionDetected = false;
											var CurrentJsonArray = JSON.stringify(singlefranchise_json);
											CurrentJsonArray = CurrentJsonArray.replace(/(^{")|(")|(}$)|("}$)/g, "");
											var FranchiseArray = CurrentJsonArray.split(",");
											
											$.each(FranchiseArray,function(i,elmnt){
												//console.log(elmnt);
												temp_F_a = elmnt.split(":");
												if(temp_F_a[0]=="icon")
												{
													if(temp_F_a[1]=="http" && temp_F_a.length>2)
													{
														F_fran_Icon = "http:"+temp_F_a[2];
													}
												}
												if(temp_F_a[0]=="division")
												{
													F_fran_division = temp_F_a[1];
													IsDivisionDetected = true;
												}
												if(temp_F_a[0]=="name")
												{
													F_fran_name = temp_F_a[1];
												}
												if(temp_F_a[0]=="id")
												{
													F_fran_id = temp_F_a[1];
												}
											});
											
											//console.log(F_fran_Icon+" ||| "+F_fran_division+" ||| "+F_fran_name+" ||| "+F_fran_id);
											var ImageForFran = "";
										
											http://%HOST%/%YEAR%/options?L=%LEAGUEID%&F=0001&O=01
											
											var f_LinkToFranchise = baseURLDynamic+'/'+year+"/options?L="+league_id+"&F="+F_fran_id+"&O=01";
											
											if(!IsDivisionDetected)
											{
												if(!Single_li_Created)
												{
													$("#teamsdivisions ul li.division00 ul").wrap("<li class='single'></li>");
													Single_li_Created = true;
												}
											
												if(F_fran_Icon!="")
												{
													ImageForFran = "<a href='"+f_LinkToFranchise+"' >";
													ImageForFran = ImageForFran+"<img src='"+F_fran_Icon+"' alt='"+F_fran_name+"' />";
													ImageForFran = ImageForFran + "</a>";
													
													$("#teamsdivisions ul li.division"+F_fran_division+" li.single"+" ul li.franchise"+F_fran_id).append(ImageForFran);
												}
												f_linktofranname = "<a href='"+f_LinkToFranchise+"' >";
												f_linktofranname = f_linktofranname + F_fran_name+"</a>";
												$("#teamsdivisions ul li.division"+F_fran_division+" li.single"+" ul li.franchise"+F_fran_id).append(f_linktofranname);
											}
											else
											{
												if(F_fran_Icon!="")
												{
													ImageForFran = "<a href='"+f_LinkToFranchise+"' >";
													ImageForFran = ImageForFran+"<img src='"+F_fran_Icon+"' alt='"+F_fran_name+"' />";
													ImageForFran = ImageForFran + "</a>";
													$("#teamsdivisions ul li.division"+F_fran_division+" ul li.franchise"+F_fran_id).append(ImageForFran);
												}
												f_linktofranname = "<a href='"+f_LinkToFranchise+"' >";
												f_linktofranname = f_linktofranname + F_fran_name+"</a>";
												$("#teamsdivisions ul li.division"+F_fran_division+" ul li.franchise"+F_fran_id).append(f_linktofranname);
											}
											
											/*var DivisionName = NameAndIdArray[0].split(":")[1];
											DivisionName = DivisionName.replace(/(^")|("$)/g, "");
											var DivisionId = NameAndIdArray[1].split(":")[1];
											DivisionId = DivisionId.replace(/(^")|("}$)/g, "");*/

										}catch(exc){}
										
									});
									
								}
								
							});
					
						}
						
						
						
					});
				}
			});
                $("#teamsdivisions li:empty").remove(); // REMOVE UNUSED FRANCHISE ID 
                $("#teamsdivisions li span:empty").parent().remove(); // REMOVE UNUSED FRANCHISE ID
		},
		error : function(a,b,c){
			alert('Error Occured : '+b+" ||| "+c);
		}		
		
	});
	/*var abc = function(d){
		alert('yes');	
	}*/
	/*var URL = baseURLDynamic+'/'+year+'/export?TYPE=league&L='+league_id+'&JSON=1&callback=abc';
	$.getJSON(URL, function(data){
        	//console.log(data);
       		return true;
	});*/



});
