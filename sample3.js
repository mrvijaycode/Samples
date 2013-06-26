
//***************************************************************
//* Project Name     : CPPD
//* Application name : Load Items
//* Dependencies     :
//* Limitations      :
//* Created Date     : 6 June 2013
//* Author           : Vijay Bhaskar CH
//****************************************************************

var strUrl = "http://teamspace.pg.com/sites/cppdpolicy";

var rootSite = window.location.protocol + "//" + window.location.hostname;

var splists = new SPAPI_Lists(strUrl);
var spUserInformation = new SPAPI_UserGroup(strUrl);
var strLibName = '';
var sQuery = "<Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query>";
var strTitle = "No Title";
var queryFolder = '<QueryOptions/>';
var nodocs = "No documents are available for this Topic..";
var IsHomeContent = "";
var strCategory = "";
var sCont = '';
var STRCPPDHOME = "CPPDHome";

//To load left navigation menu
function getLeftNavIndex(STRLISTNAME) {
	//LeftNavIndex

	if (STRLISTNAME.indexOf("&") > -1) {
		STRLISTNAME = STRLISTNAME.replace(/&/g, "&amp;");
	}

	if (document.getElementById("divfrmWord")) {
		document.getElementById("divfrmWord").style.display = 'none';
	}

	if (document.getElementById("divfrmBack")) {
		document.getElementById("divfrmBack").style.display = 'none';
	}

	if (document.getElementById("homeRef").value == "") {
		//document.getElementById("homeRef").value = window.location.search.split("?cat=")[1];
		document.getElementById("homeRef").value = window.location.search.split("?cat=")[1].split('&')[0];
	}
	strCategory = document.getElementById("homeRef").value;
	strCategory = unescape(strCategory);

	var strLeftNavIndex = "";
	strLeftNavIndex += "<table   border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"180\" valign=\"top\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/images1/left_nav_heading.jpg\" width=\"245\" height=\"37\" /></td></tr></table>";
	//strLeftNavIndex += "<Table  class=\"leftnav_bg\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" ><tr><td>";
	var sQuery = "<Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query>";
	strLeftNavIndex += "<div id='leftlinks'>";

	strLeftNavIndex += "<table width=\"100\" class=\"leftnav_bg\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" >";

	//..........Added on 11th june 2013 by chinna

	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : STRLISTNAME, // List Name
		CAMLQuery : sQuery,
		completefunc : function (xData, Status) {

			$(xData.responseXML).SPFilterNode("z:row").each(function () {

				var strItemID = $(this).attr('ows_ID');
				var strTitle = $(this).attr('ows_Title');
				var strCurrentItemURL = strUrl + "/Lists/LeftNavIndex/DispForm.aspx?ID=" + strItemID + "&Source=" + window.location.href;
				strLeftNavIndex += "<tr>";
				strLeftNavIndex += "<td>";
				strLeftNavIndex += "<a href=\"http://teamspace.pg.com/sites/cppdpolicy/WPPages/Contents.aspx?cat=" + escape(strCategory) + "&lib=" + escape(strTitle) + "\" style='text-Decoration:None'>";
				strLeftNavIndex += "<div>" + ValidateLength(strTitle) + "</div></a>";

				strLeftNavIndex += "</td>";
				strLeftNavIndex += "</tr>";

				strLeftNavIndex += "<tr>";
				strLeftNavIndex += "<td valign=\"top\" style=\"padding:0 0 0 6px; height: 4px;\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/images1/left_nav_div.png\" width=\"220\" height=\"4\"/></td>";
				strLeftNavIndex += "</tr>";

			});
		}
	});

	//..........Added on 11th june 2013 by chinna   //end

	//add menu ending image
	strLeftNavIndex += "<div valign=\"top\" class=\"leftnav_btmbg\">&nbsp;</div>";

	strLeftNavIndex += "</table></div>";

	if (document.getElementById("divLeftNavIndex")) {
		document.getElementById("divLeftNavIndex").innerHTML = strLeftNavIndex;
	}
}

function loadPresentations() {
	getContents('Presentations');
}

//to back to landing page
function loadHomeRef() {

	//alert('home');
	sQuery = "<Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query>";
	loadHome();
}

function GetTitleContactDetails(SCtry) {

	//Added on 11_6_13 by Chinna

	var sQry = "<Query><OrderBy><FieldRef Name='ID' /></OrderBy><Where><Eq><FieldRef Name='Home_x0020_Link' /><Value Type='Lookup'>" + SCtry + "</Value></Eq></Where></Query>"
		$().SPServices({
			operation : "GetListItems", //Method name
			async : false,
			listName : 'HomeLinksTitle', // List Name
			CAMLQuery : sQry,
			completefunc : function (oWs, Status) {
				var rowlength = $(oWs.responseXML).SPFilterNode("z:row").length;
				var rows = $(oWs.responseXML).SPFilterNode("z:row");

				$(oWs.responseXML).SPFilterNode("z:row").each(function () {

					if (rowlength > 0) {
						//debugger;
						if ($(this).attr('ows_Title'))
							var sPhone = $(this).attr('ows_Title');
						if (sPhone == "" || sPhone == null)
							sPhone = '';
						if ($(this).attr('ows_User_x0020_Name'));
						var sUserName = $(this).attr('ows_User_x0020_Name');
						if (sUserName == "" || sUserName == null)
							sUserName = '';
						else
							sUserName = sUserName.split(';#')[1];
						if ($(this).attr('ows_Work_x0020_email'))
							var sEmail = $(this).attr('ows_Work_x0020_email');
						if (sEmail == "" || sEmail == null)
							sEmail = '';
						else
							sEmail = sEmail.split(';#')[1];

						if ($(this).attr('ows_Description'))
							var sDescription = $(this).attr('ows_Description');
						if (sDescription == "" || sDescription == null)
							sDescription = '';

						SCtry = unescape(SCtry);
						if (SCtry == 'Canada G2M Standard Index') {
							sCont = '<p><b><font size="2" color="#C95100">' + sDescription + ' ' + sUserName + ' at <a href="mailto:' + sEmail + '">' + sEmail + '</a> or at ' +
								'' + sPhone + '.&nbsp; </font></b></p>' +
								'<p><b><font size="2" color="#C95100">Thanks..</font></b></p>';
						} else {
							sCont = '<p><b><font size="2" color="#C95100">' + sDescription + '</font></b></p>';
						}

					}

				});

			}
		});
}

function getReqType() {

	if (window.location.search.split("?cat=")[1].split('&lib=')[1] == "00") {
		//alert('First');
		loadHome();
	} else if (window.location.search.split("?cat=")[1].split('&lib=')[1] != "00") {
		//alert('Inner');
		callLib();
	} else {
		//alert('No ref');
		loadHome();
	}
}

function callLib() {
	//debugger
	var strLibrary = window.location.search.split("?cat=")[1].split('&lib=')[1];
	strLibrary = unescape(strLibrary);
	loaddoc(strLibrary);
}

//To load home page contents
function loadHome() {

	document.getElementById("divMainLink").style.display = "none";
	//strLibName = STRCPPDHOME;
	strLibName = 'CPPDCategory';
	nodocs = "No documents are available for this Section..";
	IsHomeContent = "Y";

	if (document.getElementById("homeRef").value == "") {
		document.getElementById("homeRef").value = window.location.search.split("?cat=")[1].split('&')[0];
	}
	strCategory = document.getElementById("homeRef").value;
	//queryFolder = "<QueryOptions><Folder>CPPDHome/" + unescape(strCategory) + "</Folder></QueryOptions>";
	queryFolder = "<QueryOptions/>";

	strCategory = unescape(strCategory);
	var strCategoryT = strCategory.replace(/%20/g, " ");

	switch (strCategoryT) {
	case 'onboarding':
		strTitle = "Onboarding";
		break;

	case 'FPM':
		strTitle = "FPM";
		break;

	case 'CPPD R Chart':
		strTitle = "CP&PD \"R\" Chart";
		break;

	case '11-12 Trade Funds':
		strTitle = '11/12 Trade Funds';
		break;

	case '12-13 Trade Funds':
		strTitle = "12/13 Trade Funds";
		break;

	case '13-14 Trade Funds':
		strTitle = "13/14 Trade Funds";
		break;

	case '14-15 Trade Funds':
		strTitle = "14/15 Trade Funds";
		break;

	case '15-16 Trade Funds':
		strTitle = "15/16 Trade Funds";
		break;

	case 'Integrated Prod Transition(iPTI)':
		strTitle = 'Integrated Prod Transition(iPTI)';
		break;

	case 'IPTL':
		strTitle = "Integrated Prod Transition (iPTl)";
		break;

	case 'USPR':
		strTitle = 'US & PR Standard Index';
		GetTitleContactDetails(strCategory);
		nodocs = sCont;
		break;

	case 'Contracts':
		strTitle = 'Contracts';
		break;

	case 'CDA':
		strTitle = 'CDA';
		break;

	case 'Policy and Legal Training':
		strTitle = 'Policy and Legal Training';
		break;

	case 'Logistics':
		strTitle = 'Logistics';
		break;
	case 'Canada G2M Standard Index':
		strTitle = 'Canada G2M Standard Index';
		GetTitleContactDetails(strCategory);
		nodocs = sCont;
		break;
	default:
		strTitle = "No Title";
	}
	document.getElementById("divMainLink").innerHTML = strTitle;
	//debugger
	getContents(strLibName);
}

//To load selected menu documents
function loaddoc(MapId) {
	//alert("MapId"+MapId);

	if (MapId.indexOf("&") > -1) {
		MapId = MapId.replace(/&/g, "&amp;");
	}
	//strLibName = document.getElementById('divref').innerText;
	strLibName = $('#divref').text();
	document.getElementById("divMainLink").style.display = "block";
	switch (strLibName) {
	case 'CPPDCategory':

		var Topic = $("#homeRef").val();
		//alert(Topic);
		var country = "US";
		//alert("Before: "+country);
		Topic = unescape(Topic);
		if (Topic == "Canada G2M Standard Index") {
			country = "CANADA";
			//alert("After: "+country);
		}
		sQuery = "<Query>" +
			"<Where>" +
			"<And>" +
			"<Contains>" +
			"<FieldRef Name='Standard' />" +
			"<Value Type='LookupMulti'>" + unescape(MapId) + "</Value>" +
			"</Contains>" +
			"<Contains>" +
			"<FieldRef Name='Country' />" +
			"<Value Type='MultiChoice'>" + country + "</Value>" +
			"</Contains>" +
			"</And>" +
			"</Where>" +
			"<OrderBy>" +
			"<FieldRef Name='Order0' />" +
			"</OrderBy>" +
			"</Query>";
		//alert(sQuery);
		nodocs = "No documents are available for this Topic..";
		IsHomeContent = 'N';
		break;
	case 'GUIDELINESPRINCIPLES':
		sQuery = "<Query><Where><Eq><FieldRef Name='Section' /><Value Type='Lookup'>" + unescape(MapId) + "</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query>";
		nodocs = "No documents are available for this Topic..";
		break;
	default:
		strLibName = '';
	}
	queryFolder = '<QueryOptions/>';
	strTitle = unescape(MapId);
	getContents(strLibName)
}

function GetHomeCategory(strFolder) {
	//debugger
	strLibrary = 'CPPDCategory';
	var strContents = "";
	var strCategoryT = strFolder.replace(/%20/g, " ");

	sQuery = '<Query><Where><Contains><FieldRef Name="Home" /><Value Type="LookupMulti">' + strCategoryT + '</Value></Contains></Where><OrderBy><FieldRef Name="Order0" Ascending="True" /></OrderBy></Query>';

	var strViewFields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='FileRef' /></ViewFields>";

	//Added on 11_6_13 by chinna

	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : strLibrary, // List Name
		CAMLQuery : sQuery,
		CAMLViewFields : strViewFields,
		completefunc : function (oWs, Status) {
			$(oWs.responseXML).SPFilterNode("z:row").each(function () {
				flag = true;
				var strFileName = $(this).attr('ows_Title');
				var strResult = $(this).attr('ows_FileRef');
				strResult = strResult.split("#", strUrl.length)[1];
				var strDocUrl = rootSite + "/" + strResult;
				strContents += "<tr>";
				strContents += "<td class=\"body_bluelinks\">";
				strContents += "<div style=\"padding-left:10px\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/Images1/org_arw.png\">"
				strContents += "<a title='" + strFileName + "' style=\"padding-left:5px\" href=\"JavaScript:Opendoc('" + strDocUrl + "')\">" + strFileName + "</a>";
				strContents += "</div></td>";
				strContents += "</tr>";
			});
		}
	});
	return strContents;
}

var flag = false;
//To load content on the dashboard

//new
function getContents(strLibrary) {
	debugger
	if (document.getElementById("divContents")) {
		document.getElementById("divContents").style.display = '';
	}
	if (document.getElementById("frmWord")) {
		document.getElementById("frmWord").src = '';
	}

	if (document.getElementById("divfrmWord")) {
		document.getElementById("divfrmWord").style.display = 'none';
	}

	if (document.getElementById("divfrmBack")) {
		document.getElementById("divfrmBack").style.display = 'none';
	}

	var strContents = "";
	var strViewFields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Group' /><FieldRef Name='FileRef' /></ViewFields>";

	strContents += "<table id=\"tblContents\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	strContents += "<tr><td colspan=\"2\">";

	strContents += "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
	strContents += "<tr>"
	strContents += "<td valign=\"top\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/images1/gray_heading_lft.jpg\" width=\"8\" height=\"37\" /></td>"
	strContents += "<td valign=\"top\" class=\"body_heading\">" + strTitle + "</td>"
	strContents += "<td valign=\"top\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/images1/gray_heading_rt.jpg\" width=\"8\" height=\"37\" /></td>"
	strContents += "</tr>"
	strContents += "</table>"

	strContents += "</td></tr>"
	strContents += "</Table>";
	$('#divContents').append(strContents);

	var Links = new Array();
	var groups = new Array();
	var xmlcode = new Array();
	var LinksCount = 0;
	var groupsCount = 0;

	if (IsHomeContent == 'Y') {
		strContents += GetHomeCategory(strCategory);
	}

	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : strLibrary, // List Name
		CAMLQueryOptions : queryFolder,
		CAMLViewFields : strViewFields,
		CAMLQuery : sQuery,
		//CAMLRowLimit: 1,
		completefunc : function (xData, Status) {

			//alert(xData.responseText);

			var docs = $(xData.responseXML).SPFilterNode("z:row").length;

			if (docs > 0) {

				$(xData.responseXML).SPFilterNode("z:row").each(function () {

					var strFileName = $(this).attr('ows_Title');
					var strResult = $(this).attr('ows_FileRef');

					strResult = strResult.split("#", strUrl.length)[1];
					var strDocUrl = rootSite + "/" + strResult;

					if ($(this).attr('ows_Group') == null) {

						if ($.inArray('STANDARDS', groups) < 0) {

							var trstnd = "<table id='STANDARDS'><tr>";
							trstnd += "<td valign=\"top\" style=\"padding: 10px 10px 5px 20px;\">";
							trstnd += "STANDARDS";
							trstnd += "</td>";
							trstnd += "</tr></table>";

							$('#divContents').append(trstnd);
							groups[groupsCount] = "STANDARDS";
							groupsCount++;
						}

						var stFile = "<a title = '" + strFileName + "' style = \"padding - left:5px\" href=\"JavaScript:Opendoc('" + strDocUrl + "')\">" + strFileName + "</a>";

						var lin = "<tr>";
						lin += "<td class=\"body_bluelinks\">";
						lin += "<div style=\"padding-left:10px\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/Images1/org_arw.png\">";
						lin += stFile;
						lin += "</div></td>";
						lin += "</tr>";

						$('#STANDARDS').append(lin);

					} else {

						var grpName = $(this).attr('ows_Group');

						if ($.inArray(grpName, groups) < 0) {

							var grpSid = grpName.replace(/\//g, "");
							
							var grpIDArr = new Array();
							grpIDArr = grpSid.split(' ');

							var grpNameId = "";
							$.each(grpIDArr, function (i) {
								grpNameId += grpIDArr[i];
							});
							
							grpNameId=grpNameId.replace(/[()]/g,'');

							var grphdr = "<table id=" + grpNameId + "><tr>";
							grphdr += "<td valign=\"top\" style=\"padding: 20px 20px 5px 20px;\">";
							grphdr += grpName;
							grphdr += "</td>";
							grphdr += "</tr></table>";

							$('#divContents').append(grphdr);

							groups[groupsCount] = grpName;
							groupsCount++;
						}

						var stFile = "<a title = '" + strFileName + "' style = \"padding - left:5px\" href=\"JavaScript:Opendoc('" + strDocUrl + "')\">" + strFileName + "</a>";

						var lin = "<tr>";
						lin += "<td class=\"body_bluelinks\">";
						lin += "<div style=\"padding-left:10px\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/Images1/org_arw.png\">";
						lin += stFile;
						lin += "</div></td>";
						lin += "</tr>";

						var grpSid = grpName.replace(/\//g, "");
						var grpIDArr = new Array();
						grpIDArr = grpSid.split(' ');

						var grpNameId = "";
						$.each(grpIDArr, function (i) {
							grpNameId += grpIDArr[i];
						});
						
						grpNameId=grpNameId.replace(/[()]/g,'');

						$('#' + grpNameId).append(lin);
					}
				});

			} else if (!flag) {
				var nofiles = "<Tr>";
				nofiles += "<td valign=\"top\" class=\"body_bluelinks\" style=\"padding-left:20px\">";
				nofiles += nodocs;
				nofiles += "</Td>";
				nofiles += "</Tr>";
				$('#tblContents').append(nofiles);
			}
		}
	});
}
//changed

//to get distinct values in an Arrary
var unique = function (origArr) {
	var newArr = [],
	origLen = origArr.length,
	found,
	x,
	y;
	for (x = 0; x < origLen; x++) {
		found = undefined;
		for (y = 0; y < newArr.length; y++) {
			if (origArr[x] === newArr[y]) {
				found = true;
				break;
			}
		}
		if (!found)
			newArr.push(origArr[x]);
	}
	return newArr;
};

//to convert string to XML
function StringtoXML(text) {
	if (window.ActiveXObject) {
		var doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.async = 'false';
		doc.loadXML(text);
	} else {
		var parser = new DOMParser();
		var doc = parser.parseFromString(text, 'text/xml');
	}
	return doc;
}

//To open document in Iframe
function Opendoc(strDoc) {
	//debugger
	document.getElementById("divContents").style.display = 'none';
	document.getElementById("frmWord").width = '100%';
	document.getElementById("frmWord").src = strDoc;
	document.getElementById("divfrmWord").style.display = '';
	document.getElementById("divfrmBack").style.display = '';
}

function ShowContes() {
	document.getElementById("divContents").style.display = '';
	document.getElementById("frmWord").src = '';
	document.getElementById("divfrmWord").style.display = 'none';
	document.getElementById("divfrmBack").style.display = 'none';
}

//To validate length of the Category item.
function ValidateLength(val) {
	var textcount = val.length;
	if (textcount > 30) {
		var newval = val.substring(0, 30);
		newval = newval + "..";
		//alert(newval);
		return newval;
	} else {
		return val;
	}
}

// the below code is converted into the jquery
function getRecentCppdHomeDoc() {
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		//webURL : webUrl, //pass webUrl dynamically
		listName : "CPPDCategory", // List Name
		//CAMLQueryOptions : '',
		//CAMLViewFields: "<ViewFields><FieldRef Name='Title' /></ViewFields>",
		CAMLQuery : '<Query><Where><Contains><FieldRef Name="Home" /><Value Type="LookupMulti">CPPD R Chart</Value></Contains></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query>',
		CAMLRowLimit : 1,
		completefunc : function (xData, Status) {

			//alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("z:row").each(function () {

				var strFileName = $(this).attr('ows_Title');
				var strResult = $(this).attr('ows_FileRef');
				strResult = strResult.split("#", strUrl.length)[1];
				var strDocUrl = "http://teamspace.pg.com" + "/" + strResult;
				//document.getElementById("RchartLink").setAttribute('href', strDocUrl);
				$("#RchartLink").attr('href', strDocUrl);
			});
		}
	});
}

function getRecentContactDoc() {
	sQuery = '<Query><Where><Contains><FieldRef Name="Home" /><Value Type="LookupMulti">CPPD Contacts</Value></Contains></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query>';
	//var oWs = splists.getListItems('CPPDCategory', "", sQuery, "", '1', "", "");

	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,

		listName : "CPPDCategory", // List Name

		CAMLQuery : sQuery,
		CAMLRowLimit : 1,
		completefunc : function (xData, Status) {

			//alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("z:row").each(function () {

				//var keyMeasure = $(this).attr("ows_Key_x0020_Measure");

				var strFileName = $(this).attr('ows_Title');
				var strResult = $(this).attr('ows_FileRef');
				strResult = strResult.split("#", strUrl.length)[1];
				var strDocUrl = "http://teamspace.pg.com" + "/" + strResult;
				$("#CPPDContactslink").attr('href', strDocUrl);
			});
		}
	});
}

function escapeURL(URL) {
	//debugger
	var url = escape(URL);
	window.location = "http://teamspace.pg.com/sites/cppdpolicy/WPPages/Contents.aspx?cat=" + url + "&lib=00";
}
