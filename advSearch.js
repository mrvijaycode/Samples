var strUrl = "http://teamspace.pg.com/sites/idm";
var splists = new SPAPI_Lists(strUrl);
//var spusers = new SPAPI_UserGroup(strUrl);
//var userInfor = new SPAPI_UserProfile(strUrl);


var TOOLS = 'tools';
var TEAMDOCS = "TeamSharedDocuments";
var TEAMANN = 'TeamAnnouncements';
var BREAKING_NEWS = 'BreakingNews';
var HOTTOPICS = 'HotTopics';
var HELPLINKS = 'HELPLINKS';
var CINEMA = 'Cinema';
var TRAININGCAL = 'TrainingCalendar';

//ALL TEAMS
var TCAPABILITY = "Capability Shared Documents";
var TCOROPORATEIDM = "Corporate IDM Shared Documents";
var TDLT = "DLT Shared Documents";
var TDMI="DMI Shared Documents";
var TGBP= "GBP IDM Shared Documents";
var TMDOEX= "MDO Extended Shared Documents";
var TMDOIDL= "MDO IDL Shared Documents"
var TRAMP= "RAMP Shared Documents"
var TSLC= "SLC Shared Documents";
var TMPS= "MPS SOT Shared Documents";

//This method is called in design page
function listChage(sList) {
	loadInputs(sList);
}

// This method will catch the selected list name and pass the proper method
function loadInputs(sList) {
	
	$("#btnSearch").removeAttr("disabled");
	
	switch (sList) {
	case "FAQs":
		
		$('#btnSearch').unbind('click');
		$('#divInputs table[id=tblbrknews]').hide();
		$('#tblFaqs').show(function () {
			textFocus();
		});
		$('#btnSearch').click(function () {
			
			if (IsEnteredData())
				SearchInputs('FAQ');
			
		});
		$('#btnSearch').attr('value', 'Search FAQs');
		$('#tblddl').hide();
		$('#trTeams').hide();
		$('#ddlCat').change(function () {
			var strCat = jQuery('#ddlCat').find("option:selected").text();
			loadSubCat(strCat);
		});
		break;
		
	case "Breaking News":
		$('#btnSearch').unbind('click');
		$('#divInputs table[id=tblFaqs]').hide();
		
		$('#tblbrknews').show(function () {
			textFocus();
		});
		$('#btnSearch').click(function () {
			if (IsEnteredData()) {
				document.getElementById('divOutputs').innerHTML = BreakingNewsSearch('');
				setAlternateColor();
			}
		});
		$('#btnSearch').attr('value', 'Search Breaking News');
		$('#tblddl').hide();
		$('#trTeams').hide();
		break;
		
	case "Hot Topics":
		$('#btnSearch').unbind('click');
		$('#tblbrknews').show(function () {
			textFocus();
		});
		$('#divInputs table[id=tblFaqs]').hide();
		$('#btnSearch').click(function () {
			if (IsEnteredData()) {
				document.getElementById('divOutputs').innerHTML = searchHotTopics('');
				setAlternateColor();
			}
		});
		$('#btnSearch').attr('value', 'Search Hot Topics');
		$('#tblddl').hide();
		$('#trTeams').hide();
		break;
		
	case "Tools":
		$('#btnSearch').unbind('click');
		$('#divInputs table[id=tblFaqs]').hide();
		$('#tblbrknews').show(function () {
			textFocus();
		});
		$('#btnSearch').click(function () {
			if (IsEnteredData()) {
				document.getElementById('divOutputs').innerHTML = searchIDMdocs('');
				setAlternateColor();
			}
			
		});
		$('#tblddl').show();
		$('#btnSearch').attr('value', 'Search Tools');
		$('#trTeams').hide();
		break;
		
	case "Cinema":
		$('#btnSearch').unbind('click');
		$('#divInputs table[id=tblFaqs]').hide();
		$('#tblbrknews').show(function () {
			textFocus();
		});
		$('#btnSearch').click(function () {
			if (IsEnteredData()) {
				document.getElementById('divOutputs').innerHTML = searchCinema('');
				$('html, body, .content').animate({
					scrollTop : $(document).height()
				}, 800);
			}
		});
		$('#tblddl').show();
		$('#btnSearch').attr('value', 'Search Cinema')
		$('#trTeams').hide();
		break;
		
	case "Team Shared Documents":
		$('#trTeams').show();
		$('#ddlTeams').unbind();
		$('#ddlTeams').val('');
		$('#tblddl').hide();
		$('#btnSearch').attr('value', 'Search Documents')
		
		$('#divInputs table[id=tblFaqs]').hide();
		textFocus();
		$('#tblbrknews').hide();
		
		$('#btnSearch').unbind('click');
		
		$('#ddlTeams').change(function () {
			$('#tblddl').show();
			$('#tblbrknews').show(function () {});
		});
		
		$('#btnSearch').click(function () {
			if (IsEnteredData())
				searchTeamdocs();
		});
		break;
		
	case "Team Announcements":
		$('#trTeams').show();
		$('#ddlTeams').unbind();
		$('#ddlTeams').val('');
		$('#divInputs table[id=tblFaqs]').hide();
		$('#tblddl').hide();
		$('#btnSearch').attr('value', 'Search Announcements')
		$('#tblbrknews').hide();
		textFocus();
		$('#ddlTeams').unbind('change');
		
		$('#btnSearch').unbind('click');
		$('#ddlTeams').change(function () {
			$('#tblbrknews').show(function () {});
		});
		
		$('#btnSearch').click(function () {
			if (IsEnteredData())
				searchTeamAnounce();
		});
		break;
	case "All":
		$('#btnSearch').unbind('click');
		$('#divInputs table[id=tblFaqs]').hide();
		$('#tblbrknews').show(function () {
			textFocus();
		});
		$('#btnSearch').click(function () {
			if (IsEnteredData())
				searchAll();
		});
		$('#tblddl').show();
		$('#btnSearch').attr('value', 'Search All')
		$('#trTeams').hide();
		break;
		
	case "Helpful Links":
		
		$('#btnSearch').unbind('click');
		$('#divInputs table[id=tblFaqs]').hide();
		$('#tblbrknews').show(function () {
			textFocus();
		});
		$('#btnSearch').click(function () {
			if (IsEnteredData()) {
				document.getElementById('divOutputs').innerHTML = fillhelplinks('');
				setAlternateColor();
			}
		});
		$('#tblddl').hide();
		$('#btnSearch').attr('value', 'Search Helpful Links')
		$('#trTeams').hide();
		break;
		
	case "Training Calendar":
		$('#btnSearch').unbind('click');
		$('#divInputs table[id=tblFaqs]').hide();
		$('#tblbrknews').show(function () {
			textFocus();
		});
		$('#btnSearch').click(function () {
			if (IsEnteredData()) {
				document.getElementById('divOutputs').innerHTML = SearchEvents('');
				setAlternateColor();
			}
		});
		$('#tblddl').hide();
		$('#btnSearch').attr('value', 'Search Training Calendar')
		$('#trTeams').hide();
		break;
		
	default:
		$("#btnSearch").attr("disabled", "disabled");
		$('#btnSearch').attr('value', 'Search');
	}
}

//FAQ Search
function SearchInputs(s) {
	var strListName = '';
	var strViewName = '';
	var strQuery = '';
	var strViewFields = '';
	var strRowLimit = '';
	var strQueryOptions = '';
	var strWebID = '';
	var sCat = $("select[id='ddlCat'] option:selected").text();
	var sbCat = $("select[id='ddlSubCat'] option:selected").text();
	if (sCat.indexOf("&") > -1) {
		sCat = sCat.replace(/&/g, "&amp;");
	}
	
	var strque = $('#txtQue').val();
	if (sCat == "-Select-") {
		if (sbCat == "-Select-") {
			if (strque != "") {
				strQuery = '<Query><Where><Contains><FieldRef Name="Question" /><Value Type="Note">' + strque + '</Value></Contains></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query>';
			} else {
				alert('Please select a valid Category');
			}
		}
	} else {
		strQuery = '<Query><OrderBy><FieldRef Name="Modified" /></OrderBy><Where><Eq><FieldRef Name="Category" /><Value Type="Text">' + sCat + '</Value></Eq></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query>';
		if (sbCat == "-Select-") {
			if (sCat != '-Select-' && strque != '') {
				strQuery = '<Query><Where><And><Contains><FieldRef Name="Category" /><Value Type="Text">' + sCat + '</Value></Contains><Contains><FieldRef Name="Question" /><Value Type="Note">' + strque + '</Value></Contains></And></Where><OrderBy><FieldRef Name="Title" /></OrderBy></Query>'
			}
			
		} else {
			strQuery = '<Query><OrderBy><FieldRef Name="Modified" /></OrderBy><Where><And><Eq><FieldRef Name="Category" /><Value Type="Text">' + sCat + '</Value></Eq><Eq><FieldRef Name="SubCategory" /><Value Type="Text">' + sbCat + '</Value></Eq></And></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query>';
			if (strque == "") {}
			else {
				strQuery = '<Query><OrderBy><FieldRef Name="Modified" /></OrderBy><Where><And><And><Eq><FieldRef Name="Category" /><Value Type="Text">' + sCat + '</Value></Eq><Eq><FieldRef Name="SubCategory" /><Value Type="Text">' + sbCat + '</Value></Eq></And><Contains><FieldRef Name="Question" /><Value Type="Note">' + strque + '</Value></Contains></And></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query>';
			}
		}
	}
	strListName = 'FAQs';
	loadSearch(strListName, strViewName, strQuery, strViewFields, strRowLimit, strQueryOptions, strWebID);
}

//Continution of the Inputsearch()
function loadSearch(strListName, strViewName, strQuery, strViewFields, strRowLimit, strQueryOptions, webID) {
	
	var strHTML = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
	strHTML += "<Tr>";
	strHTML += "<Td Colspan='6' class='searchTitle'>";
	strHTML += "FAQs";
	strHTML += "</Td>";
	strHTML += "</Tr>";
	strHTML += "<tr style=\"background-color:#57FEFF\"><td class='searchHead'>Category</td><td class='searchHead'>Sub Category</td><td class='searchHead'>Question</td>";
	try {
		if (strQuery != '') {
			var oWs = splists.getListItems(strListName, strViewName, strQuery, strViewFields, strRowLimit, strQueryOptions, webID);
			if (oWs.status == 200) {
				var rows = oWs.responseXML.getElementsByTagName('z:row');
				if (rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						
						var QUE = rows[i].getAttribute('ows_Question');
						var CAT = rows[i].getAttribute('ows_Category');
						var SUBCAT = rows[i].getAttribute('ows_SubCategory');
						var Qid = rows[i].getAttribute('ows_ID');
						strHTML += "<tr><td>";
						strHTML += CAT;
						strHTML += "</td>";
						strHTML += "<td>";
						strHTML += SUBCAT;
						strHTML += "</td>";
						strHTML += "<td>";
						strHTML += '<a href="JavaScript:window.showModalDialog(\'http://teamspace.pg.com/sites/idm/RedesignedWebPages/Pages/VFAQAns.aspx?id=' + Qid + '\',\'\',\'dialogWidth:700px; dialogHeight:400px; center:yes\');">' + QUE + '</a>';
						strHTML += "</td></tr>";
					}
				} else {
					strHTML += "<tr><td colspan=3>No data found.</td></tr>";
				}
			}
			strHTML += "</table>";
		} else {
			strHTML += "<tr><td colspan=3>No data found.</td></tr>";
		}
	} catch (er) {
		alert(er);
	}
	document.getElementById('divOutputs').innerHTML = strHTML;
	setAlternateColor();
}

//Breaking News Search
function BreakingNewsSearch(ic) {
	
	var strBreakingNews = '';
	
	strBreakingNews += "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
	strBreakingNews += "<Tr>";
	strBreakingNews += "<Td Colspan='6' class='searchTitle'>";
	strBreakingNews += "Breaking News";
	strBreakingNews += "</Td>";
	strBreakingNews += "</Tr>";
	
	strBreakingNews += "<Tr>";
	strBreakingNews += "<Td class='searchHead'>";
	strBreakingNews += "<Strong>";
	strBreakingNews += "Title";
	strBreakingNews += "</Strong>";
	strBreakingNews += "</Td>";
	strBreakingNews += "<Td class='searchHead'>";
	strBreakingNews += "<Strong>";
	strBreakingNews += "Description";
	strBreakingNews += "</Strong>";
	strBreakingNews += "</Td>";
	strBreakingNews += "<Td class='searchHead'>";
	strBreakingNews += "<Strong>";
	strBreakingNews += "Image";
	strBreakingNews += "</Strong>";
	strBreakingNews += "</Td>";
	strBreakingNews += "<Td class='searchHead' width=100>";
	strBreakingNews += "<Strong>";
	strBreakingNews += "Created By";
	strBreakingNews += "</Strong>";
	strBreakingNews += "</Td>";
	strBreakingNews += "</Tr>";
	
	var sQuery = queryof(BREAKING_NEWS);
	
	var strViewFields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Body' /><FieldRef Name='ID' /><FieldRef Name='Author' /><FieldRef Name='Image' /><FieldRef Name='Readmore' /></ViewFields>";
	if (sQuery != '') {
		var oWs = splists.getListItems("Breaking News", "", sQuery, strViewFields, ic, "", "");
		
		if (oWs.status == 200) {
			var rows = oWs.responseXML.getElementsByTagName('z:row');
			
			if (rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					strBreakingNews += "<Tr>";
					strBreakingNews += "<Td valign='Top'>";
					
					strBreakingNews += '<a href="JavaScript:window.showModalDialog(\'vBrkNews.aspx?ID=' + rows[i].getAttribute('ows_ID') + '\',\'\',\'dialogWidth:700px; dialogHeight:400px; center:yes\');">' + rows[i].getAttribute('ows_Title') + '</a>';
					
					strBreakingNews += "</Td>";
					strBreakingNews += "<Td valign='Top'>";
					strBreakingNews += ValidateLength(rows[i].getAttribute('ows_Body'), '1000');
					strBreakingNews += "</Td>";
					strBreakingNews += "<Td valign='Top'>";
					
					if (rows[i].getAttribute('ows_Image') != null)
						strBreakingNews += "<Image width=100p height=100 src='" + rows[i].getAttribute('ows_Image').split(",")[0] + "' title='" + rows[i].getAttribute('ows_Image').split(",")[1] + "'>";
					else
						strBreakingNews += "<Image width=100p height=100 src='http://teamspace.pg.com/sites/idm/CinemaImages/PG/novideo.jpeg' title=''>";
					
					strBreakingNews += "</Td>";
					strBreakingNews += "<Td valign='Top'>";
					strBreakingNews += rows[i].getAttribute('ows_Author').split("#")[1];
					strBreakingNews += "</Td>";
					strBreakingNews += "</Tr>";
					
				}
			} else {
				strBreakingNews += "<tr><td colspan=4>No data found.</td></tr>";
			}
		}
	} else {
		strBreakingNews += "<tr><td colspan=4>No data found.</td></tr>";
	}
	strBreakingNews += "</Table>";
	return strBreakingNews;
}

//HotTopics Search
function searchHotTopics(ic) {
	
	var strHotTopics = '';
	
	strHotTopics += "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
	
	strHotTopics += "<Tr>";
	strHotTopics += "<Td Colspan='6' class='searchTitle'>";
	strHotTopics += "Hot Topics";
	strHotTopics += "</Td>";
	strHotTopics += "</Tr>";
	strHotTopics += "<Tr>";
	strHotTopics += "<Td class='searchHead'>";
	strHotTopics += "<Strong>";
	strHotTopics += "Title";
	strHotTopics += "</Strong>";
	strHotTopics += "</Td>";
	strHotTopics += "<Td class='searchHead'>";
	strHotTopics += "<Strong>";
	strHotTopics += "Image";
	strHotTopics += "</Strong>";
	strHotTopics += "</Td>";
	strHotTopics += "<Td class='searchHead'>";
	strHotTopics += "<Strong>";
	strHotTopics += "Description";
	strHotTopics += "</Strong>";
	strHotTopics += "</Td>";
	strHotTopics += "<Td class='searchHead' width=100>";
	strHotTopics += "<Strong>";
	strHotTopics += "Created By";
	strHotTopics += "</Strong>";
	strHotTopics += "</Td>";
	strHotTopics += "</Tr>";
	var sQuery = queryof(HOTTOPICS);
	
	if (sQuery != '') {
		
		var strViewFields = '<ViewFields><FieldRef Name="Title" /><FieldRef Name="Image" /><FieldRef Name="Author" /><FieldRef Name="Modified" /><FieldRef Name="ID" /><FieldRef Name="Body" /><FieldRef Name="Expires" /></ViewFields>';
		
		var oWs = splists.getListItems("HOT Topics", "", sQuery, strViewFields, ic, "", "");
		
		if (oWs.status == 200) {
			var rows = oWs.responseXML.getElementsByTagName('z:row');
			
			if (rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					strHotTopics += "<Tr>";
					strHotTopics += "<Td valign='Top'>";
					
					//strHotTopics += rows[i].getAttribute('ows_Title');
					
					strHotTopics += '<a href="JavaScript:window.showModalDialog(\'ViewHotTopics.aspx?ID=' + rows[i].getAttribute('ows_ID') + '\',\'\',\'dialogWidth:700px; dialogHeight:400px; center:yes\');">' + rows[i].getAttribute('ows_Title') + '</a>';
					
					strHotTopics += "</Td>";
					
					strHotTopics += "<Td valign='Top'>";
					
					if (rows[i].getAttribute('ows_Image') != null)
						strHotTopics += "<Image width=100p height=100 src='" + rows[i].getAttribute('ows_Image').split(",")[0] + "' title='" + rows[i].getAttribute('ows_Image').split(",")[1] + "'>";
					else
						strHotTopics += "<Image width=100p height=100 src='http://teamspace.pg.com/sites/idm/CinemaImages/PG/novideo.jpeg' title=''>";
					
					strHotTopics += "</Td>";
					
					strHotTopics += "<Td valign='Top'>";
					strHotTopics += ValidateLength(rows[i].getAttribute('ows_Body'));
					strHotTopics += "</Td>";
					
					strHotTopics += "<Td valign='Top'>";
					strHotTopics += rows[i].getAttribute('ows_Author').split("#")[1];
					strHotTopics += "</Td>";
					strHotTopics += "</Tr>";
				}
			} else {
				strHotTopics += "<tr><td colspan=4>No data found.</td></tr>";
			}
		}
	} else {
		strHotTopics += "<tr><td colspan=4>No data found.</td></tr>";
	}
	strHotTopics += "</Table>";
	return strHotTopics;
}

// Validate the string length
function ValidateLength(val, len) {
	
	var textcount = val.length;
	if (textcount > len) {
		var newval = val.substring(0, len);
		newval = newval + "..";
		return newval;
	} else {
		return val;
	}
}

//Set Alternate colors
function setAlternateColor() {
	$("#divOutputs table tr:even").css("background-color", "#ECE5B6");
	$("#divOutputs table tr:odd").css("background-color", "#FFF8C6");
	$('html, body, .content').animate({
		scrollTop : $(document).height()
	}, 800);
	//$('html, body, .content').animate({scrollTop: 400 }, 800);
}

//Fill Dropdowns
function fillSelects() {
	var BusinessItems = getOptions('Business');
	var IDMPro = getOptions('IDM Processes');
	var strGeography = getOptions('Geography');
	var strTeams = getOptions('IDM Teams List');
	
	addOption(document.getElementById('ddlBusiness'), BusinessItems);
	addOption(document.getElementById('ddlIDM'), IDMPro);
	addOption(document.getElementById('ddlGeo'), strGeography);
	addOption(document.getElementById('ddlTeams'), strTeams);
	addOption(document.getElementById('ddlCat'), IDMPro);
}

//get Select options for the lookup fields
function getOptions(listName) {
	//debugger
	var viewflds = "<ViewFields>" +
		"<FieldRef Name='Title' />" +
		"</ViewFields>";
	
	var sQuery = "<Query>" +
		"<OrderBy>" +
		"<FieldRef Name='Title' />" +
		"</OrderBy>" +
		"</Query>";
	
	var oWs = splists.getListItems(listName, "", sQuery, viewflds, "", '', "");
	
	if (oWs.status == 200) {
		var rows = oWs.responseXML.getElementsByTagName('z:row');
		var BusinessItems = new Array();
		if (rows.length > 0) {
			for (var i = 0; i < rows.length; i++) {
				var item = rows[i].getAttribute('ows_Title');
				BusinessItems[i] = item;
			}
		}
		return BusinessItems;
	}
}

//add options to the select controls
function addOption(selectbox, text) {
	var items = text;
	for (i = 0; i < items.length; i++) {
		var optn = document.createElement("OPTION");
		optn.text = items[i];
		optn.value = items[i];
		selectbox.options.add(optn);
	}
	
}

// reset method
function resetInputs() {
	$('input[type="text"]').val('');
	$('#ctl00_PlaceHolderMain_peBreakingNewsAuthor_upLevelDiv').text('');
	$('select:not([id=selLists])').val('');
	
	var ddls = document.getElementsByTagName("Select");
	
	for (var i = 0; i < ddls.length; i++) {
		ddls[i].selectedIndex = 0;
	}
	$('#btnSearch').attr('value', 'Search');
	$("#btnSearch").attr("disabled", "disabled");
}

// focus controls style change
function textFocus() {
	//to change the focused textbox colors
	$('input[type="text"]').focus(function () {
		$(this).addClass("focus");
	});
	$('input[type="text"]').blur(function () {
		$(this).removeClass("focus");
	});
	
	$('input[type="text"]').val('');
	$('#ctl00_PlaceHolderMain_peBreakingNewsAuthor_upLevelDiv').text('');
	var ddls = document.getElementsByTagName("Select");
	
	for (var i = 0; i < ddls.length; i++) {
		if (ddls[i].id != 'selLists')
			ddls[i].selectedIndex = 0;
	}
}

//Search Tools
function searchIDMdocs(ic) {
	try {
		
		var strListName = 'IDM Documents';
		var strViewName = '';
		
		var strViewFields = '<ViewFields><FieldRef Name="BaseName" /><FieldRef Name="EncodedAbsUrl" /><FieldRef Name="ID" /><FieldRef Name="DocIcon" /><FieldRef Name="Modified" /><FieldRef Name="Author" /><FieldRef Name="Business" /><FieldRef Name="IDMProcesses" /><FieldRef Name="Geography" /></ViewFields>';
		var strRowLimit = ic;
		var strQueryOptions = "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>";
		var strWebID = '';
		
		var strQuery = queryof(TOOLS);
		
		var strIDMDocuments = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
		
		var oWs = splists.getListItems(strListName, strViewName, strQuery, strViewFields, strRowLimit, strQueryOptions, strWebID);
		
		if (oWs.status == 200) {
			var rows = oWs.responseXML.getElementsByTagName('z:row');
			
			strIDMDocuments += "<Tr>";
			strIDMDocuments += "<Td Colspan='6' class='searchTitle'>";
			strIDMDocuments += "Tools";
			strIDMDocuments += "</Td>";
			strIDMDocuments += "</Tr>";
			
			strIDMDocuments += "<Tr>";
			strIDMDocuments += "<Td class='searchHead'>";
			strIDMDocuments += "<Strong>";
			strIDMDocuments += "Type";
			strIDMDocuments += "</Strong>";
			strIDMDocuments += "</Td>";
			
			strIDMDocuments += "<Td class='searchHead'>";
			strIDMDocuments += "<Strong>";
			strIDMDocuments += "Name";
			strIDMDocuments += "</Strong>";
			strIDMDocuments += "</Td>";
			
			strIDMDocuments += "<Td class='searchHead'>";
			strIDMDocuments += "<Strong>";
			strIDMDocuments += "Geography";
			strIDMDocuments += "</Strong>";
			strIDMDocuments += "</Td>";
			
			strIDMDocuments += "<Td class='searchHead'>";
			strIDMDocuments += "<Strong>";
			strIDMDocuments += "Business"
			strIDMDocuments += "</Strong>";
			strIDMDocuments += "</Td>";
			
			strIDMDocuments += "<Td class='searchHead'>";
			strIDMDocuments += "<Strong>";
			strIDMDocuments += "IDM Processes";
			strIDMDocuments += "</Strong>";
			strIDMDocuments += "</Td>";
			
			strIDMDocuments += "<Td class='searchHead'>";
			strIDMDocuments += "<Strong>";
			strIDMDocuments += "Created By";
			strIDMDocuments += "</Strong>";
			strIDMDocuments += "</Td>";
			if (rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					
					var strDocTitle = rows[i].getAttribute('ows_BaseName');
					if (strDocTitle.length > 1000) {
						strDocTitle = strDocTitle.substring(0, 1000);
						strDocTitle = strDocTitle + "...";
					}
					var strDocUrl = rows[i].getAttribute('ows_EncodedAbsUrl');
					var strDocType = rows[i].getAttribute('ows_DocIcon');
					var strCreatedBy = rows[i].getAttribute('ows_Author').split("#")[1];
					
					var strDocType = rows[i].getAttribute('ows_DocIcon');
					var strImage = "";
					if (strDocType == "txt") {
						strImage = "http://teamspace.pg.com/_layouts/images/ictxt.gif";
					} else if (strDocType == "jpg") {
						strImage = "http://teamspace.pg.com/_layouts/images/icjpg.gif";
					} else if (strDocType == "docx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdocx.gif";
					} else if (strDocType == "doc") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdoc.gif";
					} else if (strDocType == "xlsx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxlsx.gif";
					} else if (strDocType == "xls") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxls.gif";
					} else if (strDocType == "pdf") {
						strImage = "http://teamspace.pg.com/_layouts/images/pdficon_small.gif";
					} else if (strDocType == "png") {
						strImage = "http://teamspace.pg.com/_layouts/images/icpng.gif";
					} else if (strDocType == "gif") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgif.gif";
					} else if (strDocType == "ppt") {
						strImage = "http://teamspace.pg.com/_layouts/images/icppt.gif";
					} else if (strDocType == "pptx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icpptx.gif";
					} else if (strDocType == "msg") {
						strImage = "http://teamspace.pg.com/_layouts/images/icmsg.gif";
					} else if (strDocType == "htm") {
						strImage = "http://teamspace.pg.com/_layouts/images/ichtmdoc.gif";
					} else if (strDocType == "zip") {
						strImage = "http://teamspace.pg.com/_layouts/images/iczip.gif";
					} else if (strDocType == "xlsm") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxlsx.gif";
					}
					if (strDocType == "mpp") {
						strImage = "http://teamspace.pg.com/_layouts/images/icmpp.gif";
					} else if (strDocType == "atp") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgen.gif";
					} else if (strDocType == "mp3") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgen.gif";
					} else if (strDocType == "wmv") {
						strImage = "http://teamspace.pg.com/_layouts/images/icwmv.gif";
					} else if (strDocType == "docm") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdocx.gif";
					} else if (strDocType == "accdb") {
						strImage = "http://teamspace.pg.com/_layouts/images/icaccdb.gif";
					} else if (strDocType == "rtf") {
						strImage = "http://teamspace.pg.com/_layouts/images/icrtf.gif";
					}
					
					strIDMDocuments += "<Tr>";
					strIDMDocuments += "<Td width=10>";
					if (strImage == "")
						strImage = "http://www.utlsupport.net/images/fileicons/icon_file_unknown.gif";
					else
						strIDMDocuments += "<Img src='" + strImage + "' border='0' />";
					strIDMDocuments += "</Td>";
					
					strIDMDocuments += "<Td>";
					strIDMDocuments += "<a href='" + strDocUrl + "' target='_blank' style='text-Decoration:none;'>" + strDocTitle + "</a>";
					strIDMDocuments += "</Td>";
					
					strIDMDocuments += "<Td>";
					if (rows[i].getAttribute('ows_Geography') != null)
						strIDMDocuments += rows[i].getAttribute('ows_Geography').split("#")[1];
					else
						strIDMDocuments += "---";
					strIDMDocuments += "</Td>";
					
					strIDMDocuments += "<Td>";
					if (rows[i].getAttribute('ows_Business') != null)
						strIDMDocuments += rows[i].getAttribute('ows_Business').split("#")[1];
					else
						strIDMDocuments += "---";
					strIDMDocuments += "</Td>";
					
					strIDMDocuments += "<Td>";
					if (rows[i].getAttribute('ows_IDMProcesses'))
						strIDMDocuments += rows[i].getAttribute('ows_IDMProcesses').split("#")[1];
					else
						strIDMDocuments += "---";
					strIDMDocuments += "</Td>";
					
					strIDMDocuments += "<Td>";
					strIDMDocuments += strCreatedBy;
					strIDMDocuments += "</Td>";
					
					strIDMDocuments += "</Tr>";
				}
			} else {
				strIDMDocuments += "<tr><td colspan=6>No data found.</td></tr>";
			}
		}
		strIDMDocuments += "</table>";
		
		return strIDMDocuments;
	} catch (er) {
		alert(er);
	}
}

// Search Cinema
function searchCinema(ic) {
	try {
		var strListName = 'CinemaVideos';
		var strViewName = '';
		
		var strViewFields = '<ViewFields><FieldRef Name="BaseName" /><FieldRef Name="EncodedAbsUrl" /><FieldRef Name="ID" /><FieldRef Name="DocIcon" /><FieldRef Name="Modified" /><FieldRef Name="Author" /><FieldRef Name="Business" /><FieldRef Name="IDMProcesses" /><FieldRef Name="Geography" /></ViewFields>';
		var strRowLimit = ic;
		var strQueryOptions = '';
		var strWebID = '';
		
		var strQuery = queryof(CINEMA);
		
		var strVideos = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
		
		var oWs = splists.getListItems(strListName, strViewName, strQuery, strViewFields, strRowLimit, strQueryOptions, strWebID);
		
		if (oWs.status == 200) {
			var rows = oWs.responseXML.getElementsByTagName('z:row');
			
			strVideos += "<Tr>";
			strVideos += "<Td Colspan='6' class='searchTitle'>";
			strVideos += "Cinema";
			strVideos += "</Td>";
			strVideos += "</Tr>";
			
			strVideos += "<Tr>";
			strVideos += "<Td Colspan='6' style='font-weight:bold;font-size:13px;text-align:center;' class='searchHead' >";
			strVideos += "Videos";
			strVideos += "</Td>";
			strVideos += "</Tr>";
			strVideos += '<tr><td style="padding:15px">';
			if (rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					
					var URL = rows[i].getAttribute('ows_Video_x0020_URL');
					var LinkTitle = rows[i].getAttribute('ows_Title');
					var modified_date = rows[i].getAttribute('ows_Modified');
					
					if (URL != null)
						var VideoURL = URL.split(",")[0] + "&options=iframe&width=177&height=183";
					else
						var VideoURL = 'http://teamspace.pg.com/sites/idm/RedesignedWebPages/Images/novideo.jpeg';
					
					strVideos += '<div style="float:left;">';
					strVideos += '<div>';
					strVideos += '<table><tr><td valign="top" style="font-size:13px; font-weight:bold; color:#4a4a4a;">';
					strVideos += ValidateLength(LinkTitle, '25');
					strVideos += '</td><tr><td valign="top" style="color:#0099ff; font-weight:bold; padding-bottom:5px; font-size:10px;">' + GetDate(modified_date) + '';
					strVideos += '</td></tr></table></div>';
					
					strVideos += '<iframe src="' + VideoURL + '" frameborder="0" height="190" width="181"noresize="noresize" ></iframe>';
					strVideos += "</div>";
				}
			} else {
				strVideos += "<tr><td colspan=3>No data found.</td></tr>";
			}
		}
		strVideos += '</td></tr>';
		strVideos += "</table>";
		return strVideos;
		//document.getElementById('divOutputs').innerHTML = strVideos;
	} catch (er) {
		alert(er);
	}
}

//convert date to local date
function GetDate(strDate) {
	strDate = strDate.replace(/-/g, "/");
	var d = new Date(strDate);
	d = d.toLocaleDateString();
	return d;
}

//Search team shared docs
function searchTeamdocs() {
	try {
		//debugger
				
		var team = $("select[id='ddlTeams'] option:selected").text();
		var strListName = "";
		switch(team)
		{
		case "Capability":
			strListName = TCAPABILITY;
		break;
		
		case "DLT":
			strListName = TDLT;
		break;
				
		case "MDO IDL":
			strListName = TMDOIDL;
		break;
		
		case "MDO Extended":
			strListName = TMDOEX;
		break;
		
		case "DMI":
			strListName = TDMI;
		break;
				
		case "RAMP":
			strListName = TRAMP;
		break;
		
		case "MPS/SOT":
			strListName = TMPS;
		break;
		
		case "GBP-IDM":
			strListName = TGBP;
		break;
		
		case "Corporate IDM":
			strListName = TCOROPORATEIDM;
		break;
		
		case "SLC":
			strListName = TSLC;
		break;
		
		default:
		alert('Please select team');
		}	
		alert(team);
		debugger;
		//var strListName = 'Team Shared Documents';

		var strViewName = '';
		
		var strViewFields = '<ViewFields><FieldRef Name="BaseName" /><FieldRef Name="EncodedAbsUrl" /><FieldRef Name="ID" /><FieldRef Name="DocIcon" /><FieldRef Name="Modified" /><FieldRef Name="Author" /><FieldRef Name="Business" /><FieldRef Name="IDMProcesses" /><FieldRef Name="Geography" /></ViewFields>';
		var strRowLimit = '';
		var strQueryOptions = "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>";
		var strWebID = '';
		//debugger
		var strQuery = queryof(TEAMDOCS);
		var strTeamdocs = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
		var oWs = splists.getListItems(strListName, strViewName, strQuery, strViewFields, strRowLimit, strQueryOptions, strWebID);
		
		if (oWs.status == 200) {
			var rows = oWs.responseXML.getElementsByTagName('z:row');
			
			strTeamdocs += "<Tr>";
			strTeamdocs += "<Td Colspan='6' class='searchTitle'>";
			strTeamdocs += "Team Shared Documents";
			strTeamdocs += "</Td>";
			strTeamdocs += "</Tr>";
			
			strTeamdocs += "<Tr>";
			strTeamdocs += "<Td class='searchHead'>";
			strTeamdocs += "<Strong>";
			strTeamdocs += "Type";
			strTeamdocs += "</Strong>";
			strTeamdocs += "</Td>";
			
			strTeamdocs += "<Td class='searchHead'>";
			strTeamdocs += "<Strong>";
			strTeamdocs += "Name";
			strTeamdocs += "</Strong>";
			strTeamdocs += "</Td>";
			
			strTeamdocs += "<Td class='searchHead'>";
			strTeamdocs += "<Strong>";
			strTeamdocs += "Geography";
			strTeamdocs += "</Strong>";
			strTeamdocs += "</Td>";
			
			strTeamdocs += "<Td class='searchHead'>";
			strTeamdocs += "<Strong>";
			strTeamdocs += "Business"
			strTeamdocs += "</Strong>";
			strTeamdocs += "</Td>";
			
			strTeamdocs += "<Td class='searchHead'>";
			strTeamdocs += "<Strong>";
			strTeamdocs += "IDM Processes";
			strTeamdocs += "</Strong>";
			strTeamdocs += "</Td>";
			
			strTeamdocs += "<Td class='searchHead'>";
			strTeamdocs += "<Strong>";
			strTeamdocs += "Created By";
			strTeamdocs += "</Strong>";
			strTeamdocs += "</Td>";
			strTeamdocs += "</Tr>";
			
			if (rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					
					var strDocTitle = rows[i].getAttribute('ows_BaseName');
					if (strDocTitle.length > 1000) {
						strDocTitle = strDocTitle.substring(0, 1000);
						strDocTitle = strDocTitle + "...";
					}
					var strDocUrl = rows[i].getAttribute('ows_EncodedAbsUrl');
					var strDocType = rows[i].getAttribute('ows_DocIcon');
					var strCreatedBy = rows[i].getAttribute('ows_Author').split("#")[1];
					
					var strDocType = rows[i].getAttribute('ows_DocIcon');
					var strImage = "";
					if (strDocType == "txt") {
						strImage = "http://teamspace.pg.com/_layouts/images/ictxt.gif";
					} else if (strDocType == "jpg") {
						strImage = "http://teamspace.pg.com/_layouts/images/icjpg.gif";
					} else if (strDocType == "docx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdocx.gif";
					} else if (strDocType == "doc") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdoc.gif";
					} else if (strDocType == "xlsx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxlsx.gif";
					} else if (strDocType == "xls") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxls.gif";
					} else if (strDocType == "pdf") {
						strImage = "http://teamspace.pg.com/_layouts/images/pdficon_small.gif";
					} else if (strDocType == "png") {
						strImage = "http://teamspace.pg.com/_layouts/images/icpng.gif";
					} else if (strDocType == "gif") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgif.gif";
					} else if (strDocType == "ppt") {
						strImage = "http://teamspace.pg.com/_layouts/images/icppt.gif";
					} else if (strDocType == "pptx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icpptx.gif";
					} else if (strDocType == "msg") {
						strImage = "http://teamspace.pg.com/_layouts/images/icmsg.gif";
					} else if (strDocType == "htm") {
						strImage = "http://teamspace.pg.com/_layouts/images/ichtmdoc.gif";
					} else if (strDocType == "zip") {
						strImage = "http://teamspace.pg.com/_layouts/images/iczip.gif";
					} else if (strDocType == "xlsm") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxlsx.gif";
					}
					if (strDocType == "mpp") {
						strImage = "http://teamspace.pg.com/_layouts/images/icmpp.gif";
					} else if (strDocType == "atp") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgen.gif";
					} else if (strDocType == "mp3") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgen.gif";
					} else if (strDocType == "wmv") {
						strImage = "http://teamspace.pg.com/_layouts/images/icwmv.gif";
					} else if (strDocType == "docm") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdocx.gif";
					} else if (strDocType == "accdb") {
						strImage = "http://teamspace.pg.com/_layouts/images/icaccdb.gif";
					} else if (strDocType == "rtf") {
						strImage = "http://teamspace.pg.com/_layouts/images/icrtf.gif";
					}
					
					strTeamdocs += "<Tr>";
					strTeamdocs += "<Td width=10>";
					if (strImage == "")
						strImage = "http://www.utlsupport.net/images/fileicons/icon_file_unknown.gif";
					else
						strTeamdocs += "<Img src='" + strImage + "' border='0' />";
					strTeamdocs += "</Td>";
					
					strTeamdocs += "<Td>";
					strTeamdocs += "<a href='" + strDocUrl + "' target='_blank' style='text-Decoration:none;'>" + strDocTitle + "</a>";
					strTeamdocs += "</Td>";
					
					strTeamdocs += "<Td>";
					if (rows[i].getAttribute('ows_Geography') != null)
						strTeamdocs += rows[i].getAttribute('ows_Geography').split("#")[1];
					else
						strTeamdocs += "---";
					strTeamdocs += "</Td>";
					
					strTeamdocs += "<Td>";
					if (rows[i].getAttribute('ows_Business') != null)
						strTeamdocs += rows[i].getAttribute('ows_Business').split("#")[1];
					else
						strTeamdocs += "---";
					strTeamdocs += "</Td>";
					
					strTeamdocs += "<Td>";
					if (rows[i].getAttribute('ows_IDMProcesses'))
						strTeamdocs += rows[i].getAttribute('ows_IDMProcesses').split("#")[1];
					else
						strTeamdocs += "---";
					strTeamdocs += "</Td>";
					
					strTeamdocs += "<Td>";
					strTeamdocs += strCreatedBy;
					strTeamdocs += "</Td>";
					
					strTeamdocs += "</Tr>";
				}
			} else {
				strTeamdocs += "<tr><td colspan=6>No data found.</td></tr>";
			}
		}
		strTeamdocs += "</table>";
		document.getElementById('divOutputs').innerHTML = strTeamdocs;
		setAlternateColor();
	} catch (er) {
		alert(er);
	}
}

// Search Announcements
function searchTeamAnounce() {
	
	try {
		
		var strListName = 'Team Announcements';
		var strViewName = '';
		var strViewFields = '';
		var strRowLimit = '';
		var strQueryOptions = '';
		var strWebID = '';
		
		var strAnn = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
		
		strAnn += "<Tr>";
		strAnn += "<Td Colspan='6' class='searchTitle'>";
		strAnn += "Team Announcements";
		strAnn += "</Td>";
		strAnn += "</Tr>";
		
		strAnn += "<Tr>";
		strAnn += "<Td class='searchHead'>";
		strAnn += "<Strong>";
		strAnn += "Title";
		strAnn += "</Strong>";
		strAnn += "</Td>";
		strAnn += "</Tr>";
		
		var strQuery = queryof(TEAMANN);
		
		if (strQuery != '') {
			var oWs = splists.getListItems(strListName, "", strQuery, "", "", "", "");
			if (oWs.status == 200) {
				var rows = oWs.responseXML.getElementsByTagName('z:row');
				if (rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						
						var strTitle = rows[i].getAttribute('ows_Title');
						var strId = rows[i].getAttribute('ows_ID');
						
						strAnn += "<Tr>";
						strAnn += "<Td>";
						strAnn += '<a href="JavaScript:window.showModalDialog(\'ViewAnnounce.aspx?ID=' + strId + '\',\'\',\'dialogWidth:700px; dialogHeight:400px; center:yes\');">' + strTitle + '</a>';
						strAnn += "</Td>";
						strAnn += "</Tr>";
					}
				} else {
					strAnn += "<tr><td colspan=3>No data found.</td></tr>";
				}
			}
		} else {
			strAnn += "<tr><td colspan=3>No data found.</td></tr>";
		}
		strAnn += "</table>";
		document.getElementById('divOutputs').innerHTML = strAnn;
		setAlternateColor();
	} catch (er) {
		alert(er);
	}
}

// Search All
function searchAll() {
	var strLen = $('#selLists option').length;
	//alert(strLen);
	
	$('#divOutputs').contents().remove();
	
	$('#selLists').find('option').each(function () {
		//alert($(this).text());
		var app = $(this).text();
		if (app != 'All' && app != '-Select-') {
			buildAll(app);
		}
	});
}

//Built All results
function buildAll(op) {
	var strHTML = "<div class='searchTitle'><table align='center'><tr><td></td></tr></table></div>";
	
	if ($('#divOutputs').contents().length > 0) {
		$('#divOutputs').append(strHTML);
	}
	switch (op) {
	case "Tools":
		//debugger
		$('#divOutputs').append(searchIDMdocs('5')).fadeIn(); ;
		setAlternateColor();
		break;
	case "Breaking News":
		$('#divOutputs').append(BreakingNewsSearch('5')).fadeIn(); ;
		setAlternateColor();
		break;
		
	case "FAQs":
		faqs();
		setAlternateColor();
		break;
		
	case "Hot Topics":
		$('#divOutputs').append(searchHotTopics('5')).fadeIn(); ;
		setAlternateColor();
		break;
		
	case "Cinema":
		$('#divOutputs').append(searchCinema('5')).fadeIn(); ;
		setAlternateColor();
		break;
		
	case "Team Shared Documents":
		teamsDocs();
		setAlternateColor();
		break;
		
	case "Team Announcements":
		//debugger
		teamAnnounce();
		setAlternateColor();
		break;
		
	case "Helpful Links":
		$('#divOutputs').append(fillhelplinks('5')).fadeIn(); ;
		setAlternateColor();
		break;
	
	case "Training Calendar":
		$('#divOutputs').append(SearchEvents('5')).fadeIn(); ;
		setAlternateColor();
		break;
		
	default:
		alert('No');
	}
}

//FAQs site
function faqs() {
	
	var strListName = 'FAQs';
	var strViewName = '';
	
	var strRowLimit = '5';
	var strQueryOptions = '';
	var strWebID = '';
	
	var dFrom = $('#ctl00_PlaceHolderMain_dtBreakingNewsFrom_dtBreakingNewsFromDate').val();
	var dTo = $('#ctl00_PlaceHolderMain_dtBreakingNewsTo_dtBreakingNewsToDate').val();
	
	if (dFrom != '')
		var qFrom = dFrom.split("/")[2] + "-" + dFrom.split("/")[0] + "-" + dFrom.split("/")[1] + "T00:14:28Z";
	else
		var qFrom = '';
	
	if (dTo != '')
		var qTo = dTo.split("/")[2] + "-" + dTo.split("/")[0] + "-" + dTo.split("/")[1] + "T00:14:38Z";
	else
		var qTo = '';
	
	var strtitle = $('#txtBreakingNewsTitleDesc').val();
	var strAuthor = $('#ctl00_PlaceHolderMain_peBreakingNewsAuthor_upLevelDiv').text();
	var team = $("select[id='ddlTeams'] option:selected").text();
	
	var strQuery = "<Query>" +
		"<Where>" +
		"<Or>" +
		"<And>" +
		"<Geq>" +
		"<FieldRef Name='Modified' />" +
		"<Value Type='DateTime'>" + qFrom + "</Value>" +
		"</Geq>" +
		"<Leq>" +
		"<FieldRef Name='Modified' />" +
		"<Value Type='DateTime'>" + qTo + "</Value>" +
		"</Leq>" +
		"</And>" +
		"<Or>" +
		"<Contains>" +
		"<FieldRef Name='Question' />" +
		"<Value Type='Note'>" + strtitle + "</Value>" +
		"</Contains>" +
		"<Contains>" +
		"<FieldRef Name='Author' />" +
		"<Value Type='User'>" + strAuthor + "</Value>" +
		"</Contains>" +
		"</Or>" +
		"</Or>" +
		"</Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy>" +
		"</Query>";
	
	var strHTML = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
	try {
		
		var oWs = splists.getListItems(strListName, "", strQuery, "", strRowLimit, "", "");
		//debugger
		if (oWs.status == 200) {
			var rows = oWs.responseXML.getElementsByTagName('z:row');
			
			strHTML += "<Tr>";
			strHTML += "<Td Colspan='6' class='searchTitle'>";
			strHTML += "FAQs";
			strHTML += "</Td>";
			strHTML += "</Tr>";
			strHTML += "<tr style=\"background-color:#57FEFF\"><td class='searchHead'>Category</td><td class='searchHead'>Sub Category</td><td class='searchHead'>Question</td>";
			if (rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					
					var QUE = rows[i].getAttribute('ows_Question');
					var CAT = rows[i].getAttribute('ows_Category');
					var SUBCAT = rows[i].getAttribute('ows_SubCategory');
					var Qid = rows[i].getAttribute('ows_ID');
					strHTML += "<tr><td>";
					strHTML += CAT;
					strHTML += "</td>";
					strHTML += "<td>";
					strHTML += SUBCAT;
					strHTML += "</td>";
					strHTML += "<td>";
					strHTML += '<a href="JavaScript:window.showModalDialog(\'http://teamspace.pg.com/sites/idm/RedesignedWebPages/Pages/VFAQAns.aspx?id=' + Qid + '\',\'\',\'dialogWidth:700px; dialogHeight:400px; center:yes\');">' + QUE + '</a>';
					strHTML += "</td></tr>";
				}
			} else {
				strHTML += "<tr><td colspan=3>No data found.</td></tr>";
			}
		}
		strHTML += "</table>";
		$('#divOutputs').append(strHTML);
	} catch (er) {
		alert(er);
	}
	
}

//Search All Team docs
var strAlldocs = '';
var itemsCount = '0';

function teamsDocs() {
	
	strAlldocs = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
	
	strAlldocs += "<Tr>";
	strAlldocs += "<Td Colspan='6' class='searchTitle'>";
	strAlldocs += "Team Shared Documents";
	strAlldocs += "</Td>";
	strAlldocs += "</Tr>";
	
	strAlldocs += "<Tr>";
	strAlldocs += "<Td class='searchHead'>";
	strAlldocs += "<Strong>";
	strAlldocs += "Type";
	strAlldocs += "</Strong>";
	strAlldocs += "</Td>";
	
	strAlldocs += "<Td class='searchHead'>";
	strAlldocs += "<Strong>";
	strAlldocs += "Name";
	strAlldocs += "</Strong>";
	strAlldocs += "</Td>";
	
	strAlldocs += "<Td class='searchHead'>";
	strAlldocs += "<Strong>";
	strAlldocs += "Geography";
	strAlldocs += "</Strong>";
	strAlldocs += "</Td>";
	
	strAlldocs += "<Td class='searchHead'>";
	strAlldocs += "<Strong>";
	strAlldocs += "Business"
	strAlldocs += "</Strong>";
	strAlldocs += "</Td>";
	
	strAlldocs += "<Td class='searchHead'>";
	strAlldocs += "<Strong>";
	strAlldocs += "IDM Processes";
	strAlldocs += "</Strong>";
	strAlldocs += "</Td>";
	
	strAlldocs += "<Td class='searchHead'>";
	strAlldocs += "<Strong>";
	strAlldocs += "Created By";
	strAlldocs += "</Strong>";
	strAlldocs += "</Td>";
	strAlldocs += "</Tr>";
	debugger
	var teams = new Array(TCAPABILITY, TCOROPORATEIDM, TDLT, TDMI, TGBP, TMDOEX, TMDOIDL, TRAMP, TSLC, TMPS);
	
	var c = 5;
	//var rowcount=strAlldocs.match(/<tr>/g).length;
	if (itemsCount < c) {
		for (i = 0; i < teams.length; i++) {
			getSharedDoc(teams[i]);
			alert(itemsCount);
			alert(teams[i]);
		}
	}
	if(itemsCount!=0)
	{
	strAlldocs += "<tr><td colspan=6>No data found.</td></tr>";	
	}
	strAlldocs += "</table>";
	$('#divOutputs').append(strAlldocs);
}

function getSharedDoc(listName) {
	
	var strListName = listName;
	var strViewName = '';
	
	var strViewFields = '<ViewFields><FieldRef Name="BaseName" /><FieldRef Name="EncodedAbsUrl" /><FieldRef Name="ID" /><FieldRef Name="DocIcon" /><FieldRef Name="Modified" /><FieldRef Name="Author" /><FieldRef Name="Business" /><FieldRef Name="IDMProcesses" /><FieldRef Name="Geography" /></ViewFields>';
	var strRowLimit = '5';
	var strQueryOptions = "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>";
	var strWebID = '';
	
	var strQuery = queryof(TEAMDOCS);
	var oWs = splists.getListItems(strListName, strViewName, strQuery, strViewFields, strRowLimit, strQueryOptions, strWebID);
	
	if (oWs.status == 200) {
		var rows = oWs.responseXML.getElementsByTagName('z:row');
		
		if (rows.length > 0) {
			for (var i = 0; i < rows.length; i++) {
				if (itemsCount < 5) {
					var strDocTitle = rows[i].getAttribute('ows_BaseName');
					if (strDocTitle.length > 21) {
						strDocTitle = strDocTitle.substring(0, 21);
						strDocTitle = strDocTitle + "...";
					}
					var strDocUrl = rows[i].getAttribute('ows_EncodedAbsUrl');
					var strDocType = rows[i].getAttribute('ows_DocIcon');
					var strCreatedBy = rows[i].getAttribute('ows_Author').split("#")[1];
					if (rows[i].getAttribute('ows_Teams'))
						var strTeam = rows[i].getAttribute('ows_Teams').split("#")[1];
					
					var strDocType = rows[i].getAttribute('ows_DocIcon');
					var strImage = "";
					if (strDocType == "txt") {
						strImage = "http://teamspace.pg.com/_layouts/images/ictxt.gif";
					} else if (strDocType == "jpg") {
						strImage = "http://teamspace.pg.com/_layouts/images/icjpg.gif";
					} else if (strDocType == "docx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdocx.gif";
					} else if (strDocType == "doc") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdoc.gif";
					} else if (strDocType == "xlsx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxlsx.gif";
					} else if (strDocType == "xls") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxls.gif";
					} else if (strDocType == "pdf") {
						strImage = "http://teamspace.pg.com/_layouts/images/pdficon_small.gif";
					} else if (strDocType == "png") {
						strImage = "http://teamspace.pg.com/_layouts/images/icpng.gif";
					} else if (strDocType == "gif") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgif.gif";
					} else if (strDocType == "ppt") {
						strImage = "http://teamspace.pg.com/_layouts/images/icppt.gif";
					} else if (strDocType == "pptx") {
						strImage = "http://teamspace.pg.com/_layouts/images/icpptx.gif";
					} else if (strDocType == "msg") {
						strImage = "http://teamspace.pg.com/_layouts/images/icmsg.gif";
					} else if (strDocType == "htm") {
						strImage = "http://teamspace.pg.com/_layouts/images/ichtmdoc.gif";
					} else if (strDocType == "zip") {
						strImage = "http://teamspace.pg.com/_layouts/images/iczip.gif";
					} else if (strDocType == "xlsm") {
						strImage = "http://teamspace.pg.com/_layouts/images/icxlsx.gif";
					}
					if (strDocType == "mpp") {
						strImage = "http://teamspace.pg.com/_layouts/images/icmpp.gif";
					} else if (strDocType == "atp") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgen.gif";
					} else if (strDocType == "mp3") {
						strImage = "http://teamspace.pg.com/_layouts/images/icgen.gif";
					} else if (strDocType == "wmv") {
						strImage = "http://teamspace.pg.com/_layouts/images/icwmv.gif";
					} else if (strDocType == "docm") {
						strImage = "http://teamspace.pg.com/_layouts/images/icdocx.gif";
					} else if (strDocType == "accdb") {
						strImage = "http://teamspace.pg.com/_layouts/images/icaccdb.gif";
					} else if (strDocType == "rtf") {
						strImage = "http://teamspace.pg.com/_layouts/images/icrtf.gif";
					}
					
					//if (IsTeam(strTeam)) {
					strAlldocs += "<Tr>";
					strAlldocs += "<Td width=10>";
					if (strImage == "")
						strImage = "http://www.utlsupport.net/images/fileicons/icon_file_unknown.gif";
					else
						strAlldocs += "<Img src='" + strImage + "' border='0' />";
					strAlldocs += "</Td>";
					
					strAlldocs += "<Td>";
					strAlldocs += "<a href='" + strDocUrl + "' target='_blank' style='text-Decoration:none;'>" + strDocTitle + "</a>";
					strAlldocs += "</Td>";
					
					strAlldocs += "<Td>";
					if (rows[i].getAttribute('ows_Geography') != null)
						strAlldocs += rows[i].getAttribute('ows_Geography').split("#")[1];
					else
						strAlldocs += "---";
					strAlldocs += "</Td>";
					
					strAlldocs += "<Td>";
					if (rows[i].getAttribute('ows_Business') != null)
						strAlldocs += rows[i].getAttribute('ows_Business').split("#")[1];
					else
						strAlldocs += "---";
					strAlldocs += "</Td>";
					
					strAlldocs += "<Td>";
					if (rows[i].getAttribute('ows_IDMProcesses'))
						strAlldocs += rows[i].getAttribute('ows_IDMProcesses').split("#")[1];
					else
						strAlldocs += "---";
					strAlldocs += "</Td>";
					
					strAlldocs += "<Td>";
					strAlldocs += strCreatedBy;
					strAlldocs += "</Td>";
					
					strAlldocs += "</Tr>";
					//}
					itemsCount = parseInt(itemsCount) + 1;
				}
				
			}
		}
	}
}




// Search All Team Announce
function teamAnnounce() {
	try {
		
		var strListName = 'Team Announcements';
		var strViewName = '';
		
		var strViewFields = '';
		var strRowLimit = '';
		var strQueryOptions = '';
		var strWebID = '';
		
		var strAnn = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
		strAnn += "<Tr>";
		strAnn += "<Td Colspan='6' class='searchTitle'>";
		strAnn += "Team Announcements";
		strAnn += "</Td>";
		strAnn += "</Tr>";
		
		strAnn += "<Tr>";
		strAnn += "<Td class='searchHead'>";
		strAnn += "<Strong>";
		strAnn += "Title";
		strAnn += "</Strong>";
		strAnn += "</Td>";
		strAnn += "</Tr>";
		
		var strQuery = queryof(TEAMANN);
		if (strQuery != '') {
			var oWs = splists.getListItems(strListName, "", strQuery, "", "5", "", "");
			
			if (oWs.status == 200) {
				var rows = oWs.responseXML.getElementsByTagName('z:row');
				
				if (rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						
						var strTitle = rows[i].getAttribute('ows_Title');
						var strTeam = rows[i].getAttribute('ows_Teams').split("#")[1];
						var strId = rows[i].getAttribute('ows_ID');
						
						if (IsTeam(strTeam)) {
							strAnn += "<Tr>";
							strAnn += "<Td>";
							strAnn += '<a href="JavaScript:window.showModalDialog(\'ViewAnnounce.aspx?ID=' + strId + '\',\'\',\'dialogWidth:700px; dialogHeight:400px; center:yes\');">' + strTitle + '</a>';
							strAnn += "</Td>";
							strAnn += "</Tr>";
						}
					}
				} else {
					strAnn += "<tr><td colspan=3>No data found.</td></tr>";
				}
			}
		} else {
			strAnn += "<tr><td colspan=3>No data found.</td></tr>";
		}
		strAnn += "</table>";
		$('#divOutputs').append(strAnn);
	} catch (er) {
		alert(er);
	}
}

//in Advanced search, Team Shared Documents display only team documents
function IsTeam(team) {
	var texts = [];
	var sel = document.getElementById('ddlTeams');
	for (var i = 0, n = sel.options.length; i < n; i++) {
		if (sel.options[i].text)
			texts.push(sel.options[i].text);
	}
	//alert(texts.join(","));
	
	if ($.inArray(team, texts) > -1) {
		//alert('Yes');
		return true;
	} else {
		//	alert('No');
		return false;
	}
}

//load sub categories in FAQ search
function loadSubCat(strCat) {
	
	var strListName = 'FAQ Second level';
	
	if (strCat.indexOf("&") > -1) {
		strCat = strCat.replace(/&/g, "&amp;");
	}
	
	var sQuery = '<Query><Where><Contains><FieldRef Name="Category" /><Value Type="Lookup">' + strCat + '</Value></Contains></Where><OrderBy><FieldRef Name="Title" /></OrderBy></Query>';
	
	var oWs = splists.getListItems(strListName, "", sQuery, "", "", "", "");
	var SubCats = new Array();
	if (oWs.status == 200) {
		var rows = oWs.responseXML.getElementsByTagName('z:row');
		
		if (rows.length > 0) {
			for (var i = 0; i < rows.length; i++) {
				var SCat = rows[i].getAttribute('ows_LinkTitle');
				SubCats[i] = SCat;
			}
		}
	}
	$('#ddlSubCat').find('option').remove().end().append('<option value="">-Select-</option>').val('');
	addOption(document.getElementById('ddlSubCat'), SubCats);
}

//load HELPFUL LINKS
function fillhelplinks(ic) {
	try {
		
		var strListName = 'Helpful Links';
		var strViewName = '';
		
		var strHTML = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
		
		strHTML += "<Tr>";
		strHTML += "<Td Colspan='6' class='searchTitle'>";
		strHTML += "Helpful Links";
		strHTML += "</Td>";
		strHTML += "</Tr>";
		
		strHTML += "<Tr>";
		strHTML += "<Td class='searchHead'>";
		strHTML += "<Strong>";
		strHTML += "Link Title";
		strHTML += "</Strong>";
		strHTML += "</Td>";
		
		strHTML += "<Td class='searchHead'>";
		strHTML += "<Strong>";
		strHTML += "Image";
		strHTML += "</Strong>";
		strHTML += "</Td>";
		strHTML += "</Tr>";
		
		var strQuery = queryof(HELPLINKS);
		
		if (strQuery != '') {
			var strViewFields = '';
			var strRowLimit = ic;
			var strQueryOptions = '';
			var strWebID = '';
			
			var oWs = splists.getListItems(strListName, "", strQuery, strViewFields, strRowLimit, "", "");
			
			if (oWs.status == 200) {
				var rows = oWs.responseXML.getElementsByTagName('z:row');
				if (rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						
						var sTitle = rows[i].getAttribute('ows_Title');
						var URL = rows[i].getAttribute('ows_URL');
						var ImgUrl = rows[i].getAttribute('ows_Image');
						
						URL = URL.split(',')[0];
						ImgUrl = ImgUrl.split(',')[0];
						
						strHTML += "<tr><td>";
						strHTML += "<a target='_blank' href='" + URL + "'>" + sTitle + "</a></td>";
						strHTML += "<td><img border=0 width=240 height=71 src='" + ImgUrl + "'/></td>";
						strHTML += "</td></tr>";
					}
				} else {
					strHTML += "<tr><td colspan=3>No data found.</td></tr>";
				}
			}
		} else {
			strHTML += "<tr><td colspan=3>No data found.</td></tr>";
		}
		strHTML += "</table>";
		return strHTML;
	} catch (er) {
		alert(er);
	}
}

// Breadcrums
function getBreadCrumbs() {
	var strBreadCrumb = "";
	strBreadCrumb += "<Table>";
	strBreadCrumb += "<Tr><Td colspan='3'></Td></Tr>";
	strBreadCrumb += "<Tr>";
	
	strBreadCrumb += "<Td Valign='Top'   >";
	strBreadCrumb += "<a href='http://teamspace.pg.com/sites/IDM/RedesignedWebPages/Pages/NewIDMHome.aspx' style='font-size:12px;font-Weight:Bold;'>Home</a>";
	strBreadCrumb += "</Td>";
	
	strBreadCrumb += "<Td style='font-size:12px;font-Weight:Bold;' Valign='Top'>";
	strBreadCrumb += ">";
	
	strBreadCrumb += "<Td Valign='Top'   >";
	strBreadCrumb += "Advanced Search";
	strBreadCrumb += "</Td>";
	
	strBreadCrumb += "</Tr>";
	strBreadCrumb += "</Table>";
	document.getElementById('tdBreadCrum').innerHTML = strBreadCrumb;
}
_spBodyOnLoadFunctionNames.push('getBreadCrumbs');

// Check Svanced Search Input Keys are entered or not
function IsEnteredData() {
	var Isfilled = false;
	
	var dFrom = $('#ctl00_PlaceHolderMain_dtBreakingNewsFrom_dtBreakingNewsFromDate').val();
	var dTo = $('#ctl00_PlaceHolderMain_dtBreakingNewsTo_dtBreakingNewsToDate').val();
	
	if (dFrom != '')
		var qFrom = dFrom.split("/")[2] + "-" + dFrom.split("/")[0] + "-" + dFrom.split("/")[1] + "T00:14:28Z";
	else
		var qFrom = '';
	
	if (dTo != '')
		var qTo = dTo.split("/")[2] + "-" + dTo.split("/")[0] + "-" + dTo.split("/")[1] + "T00:14:38Z";
	else
		var qTo = '';
	
	var geo = $("select[id='ddlGeo'] option:selected").text();
	var IDM = $("select[id='ddlIDM'] option:selected").text();
	var Busin = $("select[id='ddlBusiness'] option:selected").text();
	
	var strtitle = $('#txtBreakingNewsTitleDesc').val();
	var strAuthor = $('#ctl00_PlaceHolderMain_peBreakingNewsAuthor_upLevelDiv').text();
	
	var ddlCat = $("select[id='ddlCat'] option:selected").text();
	var ddlSCat = $("select[id='ddlSubCat'] option:selected").text();
	var txtQue = $('#txtQue').val();
	
	var strList = $("select[id='selLists'] option:selected").text();
	var strTeam = $("select[id='ddlTeams'] option:selected").text();
	
	if (geo != '-Select-' || IDM != '-Select-' || Busin != '-Select-' || strtitle != '' || strAuthor != '' || dFrom != '' || dTo != '' || txtQue != '' || ddlCat != '-Select-' || ddlSCat != '-Select-') {
		Isfilled = true;
	} else {
		Isfilled = false;
		//alert('Please enter search keywords.');
	}
	
	if (strList != '-Select' && strTeam != '-Select-') {
		Isfilled = true;
	}
	
	if (Isfilled == false) {
		alert('Please enter search keywords.');
	}
	
	if (dFrom != '' && dTo != '') {
		var res = dates.compare(dFrom, dTo);
		if (res == -1 || res == 0)
			Isfilled = true;
		else {
			Isfilled = false;
			alert('Select the correct date as Start Date should be less than End Date.');
		}
	}
	
	return Isfilled;
}

//get today
function today() {
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	var today = mm + '/' + dd + '/' + yyyy;
	//document.write(today);
	return [mm, dd, yyyy];
}

//to compare the dates
var dates = {
	convert : function (d) {
		// Converts the date in d to a date-object. The input can be:
		//   a date object: returned without modification
		//  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
		//   a number     : Interpreted as number of milliseconds
		//                  since 1 Jan 1970 (a timestamp)
		//   a string     : Any format supported by the javascript engine, like
		//                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
		//  an object     : Interpreted as an object with year, month and date
		//                  attributes.  **NOTE** month is 0-11.
		return (
			d.constructor === Date ? d :
			d.constructor === Array ? new Date(d[0], d[1], d[2]) :
			d.constructor === Number ? new Date(d) :
			d.constructor === String ? new Date(d) :
			typeof d === "object" ? new Date(d.year, d.month, d.date) :
			NaN);
	},
	compare : function (a, b) {
		// Compare two dates (could be of any type supported by the convert
		// function above) and returns:
		//  -1 : if a < b
		//   0 : if a = b
		//   1 : if a > b
		// NaN : if a or b is an illegal date
		// NOTE: The code inside isFinite does an assignment (=).
		return (
			isFinite(a = this.convert(a).valueOf()) &&
			isFinite(b = this.convert(b).valueOf()) ?
			(a > b) - (a < b) :
			NaN);
	},
	inRange : function (d, start, end) {
		// Checks if date in d is between dates in start and end.
		// Returns a boolean or NaN:
		//    true  : if d is between start and end (inclusive)
		//    false : if d is before start or after end
		//    NaN   : if one or more of the dates is illegal.
		// NOTE: The code inside isFinite does an assignment (=).
		return (
			isFinite(d = this.convert(d).valueOf()) &&
			isFinite(start = this.convert(start).valueOf()) &&
			isFinite(end = this.convert(end).valueOf()) ?
			start <= d && d <= end :
			NaN);
	}
}

//function to create a Query dynamically
function queryof(sec) {
	//debugger
	var dFrom = $('#ctl00_PlaceHolderMain_dtBreakingNewsFrom_dtBreakingNewsFromDate').val();
	var dTo = $('#ctl00_PlaceHolderMain_dtBreakingNewsTo_dtBreakingNewsToDate').val();
	
	if (dFrom != '')
		var qFrom = dFrom.split("/")[2] + "-" + dFrom.split("/")[0] + "-" + dFrom.split("/")[1] + "T00:14:28Z";
	else
		var qFrom = '';
	
	if (dTo != '')
		var qTo = dTo.split("/")[2] + "-" + dTo.split("/")[0] + "-" + dTo.split("/")[1] + "T00:14:38Z";
	else
		var qTo = '';
	
	var geo = '-Select-';
	var IDM = '-Select-';
	var Busin = '-Select-';
	var team = '-Select-';
	
	if (sec != BREAKING_NEWS && sec != HOTTOPICS && sec != HELPLINKS && sec != TEAMANN) {
		geo = $("select[id='ddlGeo'] option:selected").text();
		IDM = $("select[id='ddlIDM'] option:selected").text();
		Busin = $("select[id='ddlBusiness'] option:selected").text();
	}
	
	/* TEAM LIBRARIES ARE CHANGED.
	if (sec == TEAMDOCS || sec == TEAMANN)
		team = $("select[id='ddlTeams'] option:selected").text();
	*/
	
	if (sec == TEAMANN)
		team = $("select[id='ddlTeams'] option:selected").text();
	
	
	var strtitle = $('#txtBreakingNewsTitleDesc').val();
	var strAuthor = $('#ctl00_PlaceHolderMain_peBreakingNewsAuthor_upLevelDiv').text();
	
	if (strtitle.indexOf("&") > -1) {
		strtitle = strtitle.replace(/&/g, "&amp;");
	}
	
	if (IDM.indexOf("&") > -1) {
		IDM = IDM.replace(/&/g, "&amp;");
	}
	
	if (Busin.indexOf("&") > -1) {
		Busin = Busin.replace(/&/g, "&amp;");
	}
	
	var ANDs = '';
	var items = 0;
	
	var T_qFrom = '';
	var T_qTo = '';
	var T_geo = '';
	var T_IDM = '';
	var T_Busin = '';
	var T_strtitle = '';
	var T_strAuthor = '';
	var T_team = '';
	
	var QTitle = 'Title';
	
	if (sec == TOOLS || sec == TEAMDOCS) {
		QTitle = 'FileLeafRef';
	}
	
	var QidmProcess = 'IDMProcesses';
	if (sec == CINEMA) {
		QidmProcess = 'IDM_x0020_Process';
	}
	
	if (sec == BREAKING_NEWS) {}
	
	if (qFrom != '') {
		if (sec != TRAININGCAL) {
			items += 1;
			T_qFrom = "<Geq>" +
				"<FieldRef Name='Modified' />" +
				"<Value Type='DateTime'>" + qFrom + "</Value>" +
				"</Geq>";
		} else {
			items += 1;
			T_qFrom = "<Geq>" +
				"<FieldRef Name='EventDate' />" +
				"<Value Type='DateTime'>" + qFrom + "</Value>" +
				"</Geq>";
		}
	}
	
	if (qTo != '') {
		if (sec != TRAININGCAL) {
			items += 1;
			T_qTo = "<Leq>" +
				"<FieldRef Name='Modified' />" +
				"<Value Type='DateTime'>" + qTo + "</Value>" +
				"</Leq>";
		} else {
			items += 1;
			T_qTo = "<Leq>" +
				"<FieldRef Name='EventDate' />" +
				"<Value Type='DateTime'>" + qTo + "</Value>" +
				"</Leq>";
		}
		if (items > 1) {
			T_qTo += '</And>';
		}
	}
	
	if (strtitle != '') {
		items += 1;
		T_strtitle = "<Contains>" +
			"<FieldRef Name='" + QTitle + "' />" +
			"<Value Type='Text'>" + strtitle + "</Value>" +
			"</Contains>";
		if (items > 1) {
			T_strtitle += '</And>';
		}
	}
	
	if (strAuthor != '') {
		items += 1;
		T_strAuthor = "<Contains>" +
			"<FieldRef Name='Author' />" +
			"<Value Type='User'>" + strAuthor + "</Value>" +
			"</Contains>";
		if (items > 1) {
			T_strAuthor += '</And>';
		}
	}
	
	if (geo != '-Select-') {
		items += 1;
		T_geo = "<Contains>" +
			"<FieldRef Name='Geography' />" +
			"<Value Type='Lookup'>" + geo + "</Value>" +
			"</Contains>";
		if (items > 1) {
			T_geo += '</And>';
		}
	}
	
	if (IDM != '-Select-') {
		items += 1;
		T_IDM = "<Contains>" +
			"<FieldRef Name='" + QidmProcess + "' />" +
			"<Value Type='Lookup'>" + IDM + "</Value>" +
			"</Contains>";
		if (items > 1) {
			T_IDM += '</And>';
		}
	}
	
	if (Busin != '-Select-') {
		items += 1;
		T_Busin = "<Contains>" +
			"<FieldRef Name='Business' />" +
			"<Value Type='Lookup'>" + Busin + "</Value>" +
			"</Contains>";
		if (items > 1) {
			T_Busin += '</And>';
		}
	}
	
	if (team != '-Select-') {
		items += 1;
		T_team = "<Contains>" +
			"<FieldRef Name='Teams' />" +
			"<Value Type='Lookup'>" + team + "</Value>" +
			"</Contains>";
		if (items > 1) {
			T_team += '</And>';
		}
	}
	
	var Fquery = '';
	var builtQuery = '';
	
	for (var i = 1; i < items; i++) {
		ANDs += "<And>";
	}
	
	if (T_qFrom + T_qTo + T_strtitle + T_strAuthor + T_geo + T_IDM + T_Busin + T_team != '') {
		
		var dateto = today();
		
		switch (sec) {
		case TOOLS:
			builtQuery = T_qFrom + T_qTo + T_strtitle + T_strAuthor + T_geo + T_IDM + T_Busin;
			Fquery = "<Query><Where>" + ANDs + builtQuery + "</Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query>";
			break;
			
		case TEAMDOCS:
			builtQuery = T_qFrom + T_qTo + T_strtitle + T_strAuthor + T_geo + T_IDM + T_Busin + T_team;
			Fquery = "<Query><Where>" + ANDs + builtQuery + "</Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query>";
			break;
			
		case TEAMANN:
			builtQuery = T_qFrom + T_qTo + T_strtitle + T_strAuthor + T_team;
			Fquery = "<Query><Where>" + ANDs + builtQuery + "</Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query>";
			break;
			
		case BREAKING_NEWS:
			builtQuery = T_qFrom + T_qTo + T_strtitle + T_strAuthor;
			Fquery = "<Query><Where><And>" + ANDs + builtQuery + "<Geq><FieldRef Name='Expires' /><Value Type='DateTime'>" + dateto[2] + "-" + dateto[0] + "-" + dateto[1] + "T00:00:00Z</Value></Geq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query>";
			break;
			
		case HOTTOPICS:
			builtQuery = T_qFrom + T_qTo + T_strtitle + T_strAuthor;
			Fquery = "<Query><Where><And>" + ANDs + builtQuery + "<Geq><FieldRef Name='Expires' /><Value Type='DateTime'>" + dateto[2] + "-" + dateto[0] + "-" + dateto[1] + "T00:00:00Z</Value></Geq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query>";
			break;
			
		case HELPLINKS:
			builtQuery = T_qFrom + T_qTo + T_strtitle + T_strAuthor;
			Fquery = "<Query><Where><And>" + ANDs + builtQuery + "<Geq><FieldRef Name='Expires' /><Value Type='DateTime'>" + dateto[2] + "-" + dateto[0] + "-" + dateto[1] + "T00:00:00Z</Value></Geq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query>";
			break;
			
		case CINEMA:
			builtQuery = T_qFrom + T_qTo + T_strtitle + T_strAuthor + T_geo + T_IDM + T_Busin;
			Fquery = "<Query><Where><And>" + ANDs + builtQuery + "<Geq><FieldRef Name='Expiry_x0020_Date' /><Value Type='DateTime'>" + dateto[2] + "-" + dateto[0] + "-" + dateto[1] + "T00:00:00Z</Value></Geq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query>";
			break;
		case TRAININGCAL:
			builtQuery = T_qFrom + T_qTo + T_strtitle + T_strAuthor;
			Fquery = "<Query><Where>" + ANDs + builtQuery + "</Where><OrderBy><FieldRef Name='EventDate' Ascending='False' /></OrderBy></Query>";
			break;
		default:
			alert('Empty');
		}
	}
	return Fquery;
}

//Search IDM Training Events
function SearchEvents(ic) {
	try {
		
		var strListName = 'IDM Training Calendar';
		var strViewName = '';
		
		var strHTML = "<Table style=\"padding:10px;width=100%\" cellpadding='0' cellspacing='0' align='Center'>";
		
		strHTML += "<Tr>";
		strHTML += "<Td Colspan='6' class='searchTitle'>";
		strHTML += "Training Calendar";
		strHTML += "</Td>";
		strHTML += "</Tr>";
		
		strHTML += "<Tr>";
		strHTML += "<Td class='searchHead'>";
		strHTML += "<Strong>";
		strHTML += "Title";
		strHTML += "</Strong>";
		strHTML += "</Td>";
		
		strHTML += "<Td class='searchHead'>";
		strHTML += "<Strong>";
		strHTML += "Location";
		strHTML += "</Strong>";
		strHTML += "</Td>";
		strHTML += "</Tr>";
		
		var strQuery = queryof(TRAININGCAL);
		
		if (strQuery != '') {
			var strViewFields = '';
			var strRowLimit = ic;
			var strQueryOptions = '';
			var strWebID = '';
			
			var oWs = splists.getListItems(strListName, "", strQuery, strViewFields, strRowLimit, "", "");
			
			if (oWs.status == 200) {
				var rows = oWs.responseXML.getElementsByTagName('z:row');
				if (rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						
						var sTitle = rows[i].getAttribute('ows_Title');
						
						if(rows[i].getAttribute('ows_Location'))
						{
						var Loc = rows[i].getAttribute('ows_Location');
						}
						else
						{
						var Loc = '--';		
						}
						
						var Qid = rows[i].getAttribute('ows_ID');
																
						strHTML += "<tr><td>";
						//strHTML += sTitle +"</td>";

						strHTML += '<a href="JavaScript:window.showModalDialog(\'http://teamspace.pg.com/sites/idm/RedesignedWebPages/Pages/IDMTraining.aspx?ID=' + Qid + '\',\'\',\'dialogWidth:700px; dialogHeight:400px; center:yes\');">' + sTitle + '</a>';
						strHTML += "</td>";
						strHTML += "<td>"+Loc+"</td>";
						strHTML += "</tr>";
					}
				} else {
					strHTML += "<tr><td colspan=3>No data found.</td></tr>";
				}
			}
		} else {
			strHTML += "<tr><td colspan=3>No data found.</td></tr>";
		}
		strHTML += "</table>";
		return strHTML;
	} catch (er) {
		alert(er);
	}
}
