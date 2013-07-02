//***************************************************************
//* Project Name     : CPPD
//* Application name : Administration
//* Dependencies     :
//* Limitations      :
//* Created Date     : 06 June 2013
//* Author           : Vijay Bhaskar CH
//****************************************************************

var strUrl = "http://teamspace.pg.com/sites/cppdpolicy";
var splists = new SPAPI_Lists(strUrl);
var spUserInformation = new SPAPI_UserGroup(strUrl);
var strLibName = '';
var CATEGORIESLIST = 'Categories';
var sQuery = "<Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query>";
var strTitle = "No Title";
var queryFolder = '';

function loadPre() {
	//document.getElementById('headersec').innerText = 'Presentations';
	$('#headersec').html('Presentations');
	loadIndexItems('Presentations', '#tdIframe', '');
}

function loadRestrcitedPage() {
	document.getElementById('headersec').innerText = 'CP&PD  Private Page (RESTRICTED ACCESS)';
	//document.getElementById('divRestrict').style.backgroundColor= '#9f9f9f';
	document.getElementById('divRestrict').setAttribute("class", 'selected')
	var div = '<div id="DivloadRestrcitedPage" style="width:805px;height: 600px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		'<iframe style="width:850px;height: 600px;margin-right: 0px;border: 0 solid;bgcolor: #F1F1F1;"  id="loadRestrcitedIframe" src="http://teamspace.pg.com/sites/cppdpolicy/WPPages/Administration/RestrcitedPage.aspx"   frameborder="0"></iframe>' +
		'</div>';
	//document.getElementById("tdIframe").innerHTML = div;
	$("#tdIframe").html(div);
}

function loadGuidelines() {
	document.getElementById('headersec').innerHTML = 'Guidelines & Principles Standard Topics <br><font size="1">(Left Navigation Menu for the Guidelines & Principles)</font>';
	var div = '<div id="divGoBack" style="display:none;padding-bottom:10px" align="right"><a href="javascript:GoBackHomeUpload()">Go back</a></div>' +
		'<div id="DivIframe" style="width: 805px;height: 400px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		'<iframe id="FrameSet"' +
		'style="width: 1000px; height: 1000px; margin-left: -155px;margin-top: -150px; margin-right: 0px; border: 0 solid; bgcolor: #F1F1F1; overflow-x: hidden"' +
		'src="http://teamspace.pg.com/sites/cppdpolicy/Lists/GuidelinesPrinciples/AllItems.aspx"   frameborder="0"></iframe>' +
		'</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

// Added on 25/6/13 by Chinna -- Browser Compatibility -- Start

function loadIndexItems(STRLISTNAME, strHTMLid, strFolder) {
	var strObj = "";
	var sQuery = "<Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query>";
	var strViewFields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='FileRef' /></ViewFields>";
	queryFolder = "<QueryOptions><Folder>" + strFolder + "</Folder></QueryOptions>";

	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : STRLISTNAME,
		CAMLViewFields : strViewFields,
		CAMLQuery : sQuery,
		CAMLQueryOptions : queryFolder,
		completefunc : function (xData, Status) {
			strObj += "<table width=\"100\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"margin-left:15px\">";
			if (xData.status == 200) {
				var rows = $(xData.responseXML).SPFilterNode("z:row").length;
				if (rows > 0) {
					$(xData.responseXML).SPFilterNode("z:row").each(function () {

						var strItemID = $(this).attr('ows_ID');
						var strFileName = $(this).attr('ows_Title');
						var strResult = $(this).attr('ows_FileRef');
						strResult = strResult.split("#", strUrl.length)[1];

						//Added code to overcome the special Character problem. - Start
						var getLastName = strResult.lastIndexOf('/');
						var getLastword = strResult.substring(getLastName + 1, strResult.length);
						var getStartWord = strResult.substring(0, getLastName + 1);
						strResult = getStartWord + escape(getLastword);
						// - End

						var strDocUrl = "http://teamspace.pg.com" + "/" + strResult
							strObj += "<tr>";
						strObj += "<td valign=\"top\" class=\"body_bluelinks\">"
						strObj += "<div style=\"padding-left: 10px; width: 700px;\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/Images1/org_arw.png\">"
						strObj += "<a title='" + strFileName + "' style=\"padding-left: 5px;\" href='" + strDocUrl + "'>" + strFileName + "</a>";
						strObj += "</div></td>";
						strObj += "</tr>";

					});

				}

			}

		}

	});

	strObj += "</table>";
	$(strHTMLid).html(strObj);
}

// Added on 25/6/13 by Chinna -- Browser Compatibility  -- Ended


/*function loadIndexItems(STRLISTNAME, strHTMLid, strFolder) {
var strObj = "";
debugger;
var sQuery = "<Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query>";
//var strViewFields = "<ViewFields><FieldRef Name='BaseName' /><FieldRef Name='FileRef' /></ViewFields>";
var strViewFields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='FileRef' /></ViewFields>";
queryFolder = "<QueryOptions><Folder>" + strFolder + "</Folder></QueryOptions>";
var oWs = splists.getListItems(STRLISTNAME, "", sQuery, strViewFields, "", queryFolder, "");

strObj += "<table width=\"100\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"margin-left:15px\">";

if (oWs.status == 200) {
var rows = oWs.responseXML.getElementsByTagName('z:row');
if (rows.length > 0) {

for (var i = 0; i < rows.length; i++) {

var strItemID = rows[i].getAttribute('ows_ID');
//var strFileName = rows[i].getAttribute('ows_BaseName');
var strFileName = rows[i].getAttribute('ows_Title');
var strResult = rows[i].getAttribute('ows_FileRef');
strResult = strResult.split("#", strUrl.length)[1];

var strTitle = rows[i].getAttribute('ows_LinkFilename');

//Added code to overcome the special Character problem. - Start
var getLastName = strResult.lastIndexOf('/');
var getLastword = strResult.substring(getLastName + 1, strResult.length);
var getStartWord = strResult.substring(0, getLastName + 1);
strResult = getStartWord + escape(getLastword);
// - End

var strDocUrl = "http://teamspace.pg.com" + "/" + strResult
strObj += "<tr>";
//strObj += "<td style=\"width:2px;padding:0 5px 5px 5px\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/Images1/org_arw.png\"></td>";
strObj += "<td valign=\"top\" class=\"body_bluelinks\">"
strObj += "<div style=\"padding-left: 10px; width: 700px;\"><img src=\"http://teamspace.pg.com/sites/cppdpolicy/Images1/org_arw.png\">"
//strObj += "<a href='" + strDocUrl + "'><div style='width:600px'>" + strFileName + "</div></a>";
//strObj += "<a style=\"padding-left: 5px;\" href='" + strDocUrl + "'>" + strFileName + "</a>";
strObj += "<a title='" + strFileName + "' style=\"padding-left: 5px;\" href='" + strDocUrl + "'>" + strFileName + "</a>";
strObj += "</div></td>";
strObj += "</tr>";
}
}
}
strObj += "</table>";
$(strHTMLid).html(strObj);
}*/

function loadPrinciples() {
	window.location = "http://teamspace.pg.com/sites/cppdpolicy/WPPages/Administration/Principles.aspx";
}

function loadGraveyard() {
	document.getElementById('headersec').innerText = 'CP&PD Graveyard Policy Documents';
	var div = '<div id="DivIframe" style="width: 805px;height: 700px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		//'<iframe style="height:100%;width:100%" id="GraveFrame" src="http://teamspace.pg.com/sites/cppdpolicy/WPPages/Administration/GraveYard.aspx"   frameborder="0"></iframe>' +
		'<iframe style="height:100%;width:100%" id="GraveFrame"' +
		'style="width: 1000px; height: 1000px; margin-left: -155px;margin-top: -150px; margin-right: 0px; border: 0 solid; bgcolor: #F1F1F1; overflow-x: hidden"' +
		'src="http://teamspace.pg.com/sites/cppdpolicy/WPPages/Administration/GraveYard.aspx"   frameborder="0"></iframe>' +
		'</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

function UploadDocumenttoCategory() {
	document.getElementById('headersec').innerHTML = 'Home & Standard Documents <br><font size="1">(Upload either Home documents or Standard topic documents in to the same library) </font>';
	var div = '<div id="DivIframe" style="width: 805px;height: 700px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		'<iframe onload="HideMultiple()" id="FrameSet" style="width: 1000px; height: 1000px; margin-left: -155px;margin-top: -150px; margin-right: 0px; border: 0 solid; bgcolor: #F1F1F1; overflow-x: hidden" src="http://teamspace.pg.com/sites/cppdpolicy/CPPDCategory/Forms/AdminView.aspx"   frameborder="0"></iframe>' +
		'</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

function UploadDocumenttoHome() {
	document.getElementById('headersec').innerText = 'Home Page Links';
	var div = '<div id="divGoBack" style="display:none;padding-bottom:10px" align="right">' +
		'<table width="100%"><tr>' +
		'<td width="50%" id="tdFolderHeading"></td>' +
		'<td><a href="javascript:GoBackHomeUpload()">Go back</a></td></tr></table>' +
		'</div>' +
		'<div id="DivIframe">' +
		'<iframe onload="DynamicOnLoad()" id="FrameSet" src="http://teamspace.pg.com/sites/cppdpolicy/CPPDHome/Forms/AdminView.aspx" frameborder="0"></iframe>' +
		'</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

function GoBackRestrcited() {
	document.getElementById("FrameSet").src = "http://teamspace.pg.com/sites/cppdpolicy/Restricted/Forms/AllItems.aspx";
	document.getElementById("divGoBack").style.display = "none";
	//document.getElementById('headersec').innerText ='Home Page Links';
	document.getElementById('headersec').style.display = "block";
}

function GoBackHomeUpload() {
	document.getElementById("FrameSet").src = "http://teamspace.pg.com/sites/cppdpolicy/CPPDHome/Forms/AdminView.aspx";
	document.getElementById("divGoBack").style.display = "none";
	//document.getElementById('headersec').innerText ='Home Page Links';
	document.getElementById('headersec').style.display = "block";
}

function DynamicOnLoad() {
	var Iframe = document.getElementById("FrameSet").contentWindow.document;
	var iframeForm = Iframe.getElementsByTagName("form");

	var iframeAddNewDoc = Iframe.getElementById("idAddNewDoc");

	if (iframeAddNewDoc != null) {
		iframeAddNewDoc.parentElement.parentElement.style.display = "none";
	}
	if (iframeForm[0].action.indexOf("_layouts/Upload.aspx") != -1) {
		var iframeMultipleUpload = Iframe.getElementById("ctl00_PlaceHolderMain_ctl01_ctl02_UploadMultipleLink");
		iframeMultipleUpload.parentElement.parentElement.style.display = "none";
	} else if (iframeForm[0].action.indexOf("EditForm.aspx") != -1) {
		//alert('Edit');
		//var iframeContent = Iframe.getElementById("ctl00_m_g_c6ad66af_570a_4760_9176_0afd3a308bd4_ctl00_ctl02_ctl00_ctl00_ctl00_ContentTypeChoice");
		//iframeContent.parentElement.parentElement.style.display = "none";
		document.getElementById('tdFolderHeading').style.display = 'none';
		//var iframeWPerror = Iframe.getElementById("ctl00_m_g_c6ad66af_570a_4760_9176_0afd3a308bd4_ctl00_ctl02_ctl00_ctl03_ctl00_WebPartMaintenancePageLink");
		//iframeWPerror.parentElement.parentElement.style.display = "none";
	} else if (iframeForm[0].action.indexOf("RootFolder") != -1) {
		document.getElementById("divGoBack").style.display = "block";
		// Added by vinay to get Folder Title on Feb 16' 2012.
		var FolderTitle = iframeForm[0].action.split("&FolderCTID");
		var FolderHeading = FolderTitle[0].replace(/%2f/g, "/").replace(/%2d/g, "-").replace(/%20/g, " ");
		var FolderHeaderTitle = FolderHeading.substring(FolderHeading.lastIndexOf("/") + 1);
		document.getElementById('headersec').style.display = "none";
		document.getElementById('tdFolderHeading').innerHTML = FolderHeaderTitle;
		if (iframeAddNewDoc != null) {
			iframeAddNewDoc.parentElement.parentElement.style.display = "block";
		}
	} else {
		var IframeTable = Iframe.getElementsByTagName("table");
		//alert(IframeTable.length);
		var Flag = 0;
		for (t = 0; t < IframeTable.length; t++) {
			if (IframeTable[t].CType == "Folder") {

				IframeTable[t].onmouseover = "";
			}
		}
	}
}

function NextLeagalOrientation() {
	document.getElementById('headersec').innerHTML = 'Next Legal Orientation<br><font size="1">(Legal Orientation schedule will be displayed at Restricted Area page, it will show only recent 5 schedules )</font>';
	var div = '<div id="divGoBack" style="display:none" align="right"><a href="javascript:GoBackHomeUpload()">Go back</a></div>' +
		'<div id="DivIframe" style="width: 805px;height: 400px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		//'<iframe  id="FrameSet" src="http://teamspace.pg.com/sites/cppdpolicy/Lists/Orientations/AllItems.aspx"   frameborder="0"></iframe>' +
		'<iframe  id="FrameSet"' +
		'style="width: 1000px; height: 1000px; margin-left: -155px;margin-top: -150px; margin-right: 0px; border: 0 solid; bgcolor: #F1F1F1; overflow-x: hidden"' +
		'src="http://teamspace.pg.com/sites/cppdpolicy/Lists/Orientations/AllItems.aspx"   frameborder="0"></iframe>' +
		'</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

function UploadRestrictedArea() {
	document.getElementById('headersec').innerHTML = 'Restricted Area Documents <font size="1">(These documents will be displayed in Restricted Area)</font>';
	var div = '<div id="divGoBack" style="display:none;padding-bottom:10px" align="right">' +
		'<table width="100%"><tr>' +
		'<td width="50%" id="tdFolderHeading"></td>' +
		'<td><a href="javascript:GoBackRestrcited()">Go back</a></td></tr></table>' +
		'</div>' +
		'<div id="DivIframe" style="width: 805px;height: 400px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		//'<iframe onload="RestrictedLoad()" id="FrameSet" src="http://teamspace.pg.com/sites/cppdpolicy/Restricted/Forms/AllItems.aspx"   frameborder="0"></iframe>' +
		'<iframe onload="RestrictedLoad()" id="FrameSet"' +
		'style="width: 1000px; height: 1000px; margin-left: -155px;margin-top: -150px; margin-right: 0px; border: 0 solid; bgcolor: #F1F1F1; overflow-x: hidden"' +
		'src="http://teamspace.pg.com/sites/cppdpolicy/Restricted/Forms/AllItems.aspx"   frameborder="0"></iframe>' +
		'</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

function RestrictedLoad() {
	//debugger
	var Iframe = document.getElementById("FrameSet").contentWindow.document;
	var iframeForm = Iframe.getElementsByTagName("form");
	var iframeAddNewDoc = Iframe.getElementById("idAddNewDoc");
	var iframeMenu = Iframe.getElementById("zz28_ListActionsMenu_t");
	var iframeSettings = Iframe.getElementById("zz33_ListSettingsMenu");
	var iframeViews = Iframe.getElementById("ctl00_m_g_82d33107_dee9_46c2_8a7d_2b8a59dc89b3_ctl00_ctl00_toolBarTbl_RightRptControls_ctl01_ctl00_onetViewSelector");
	var iframeUpload = Iframe.getElementById("zz19_UploadMenu");

	if (iframeAddNewDoc != null) {
		iframeAddNewDoc.parentElement.parentElement.style.display = "none";
	}

	if (iframeMenu != null) {
		iframeMenu.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
	}

	if (iframeForm[0].action.indexOf("_layouts/Upload.aspx") != -1) {
		var iframeMultipleUpload = Iframe.getElementById("ctl00_PlaceHolderMain_ctl01_ctl02_UploadMultipleLink");
		iframeMultipleUpload.parentElement.parentElement.style.display = "none";
	} else if (iframeForm[0].action.indexOf("EditForm.aspx") != -1) {
		//alert('Edit');
		var iframeContent = Iframe.getElementById("ctl00_m_g_c6ad66af_570a_4760_9176_0afd3a308bd4_ctl00_ctl02_ctl00_ctl00_ctl00_ContentTypeChoice");
		iframeContent.parentElement.parentElement.style.display = "none";
		document.getElementById('tdFolderHeading').style.display = 'none';
		if (Iframe.getElementById("ctl00_m_g_c6ad66af_570a_4760_9176_0afd3a308bd4_ctl00_ctl02_ctl00_ctl03_ctl00_WebPartMaintenancePageLink")) {
			var iframeWPerror = Iframe.getElementById("ctl00_m_g_c6ad66af_570a_4760_9176_0afd3a308bd4_ctl00_ctl02_ctl00_ctl03_ctl00_WebPartMaintenancePageLink");
			iframeWPerror.parentElement.parentElement.style.display = "none";
		}

	} else if (iframeForm[0].action.indexOf("NewLink.aspx") != -1) {
		document.getElementById('tdFolderHeading').style.display = 'none';
	} else if (iframeForm[0].action.indexOf("RootFolder") != -1) {
		document.getElementById("divGoBack").style.display = "block";
		// Added by vinay to get Folder Title on Feb 16' 2012.
		var FolderTitle = iframeForm[0].action.split("&FolderCTID");

		var FolderHeading = FolderTitle[0].replace(/%2f/g, "/").replace(/%2d/g, "-").replace(/%20/g, " ");
		var FolderHeaderTitle = FolderHeading.substring(FolderHeading.lastIndexOf("/") + 1);
		//alert(FolderHeaderTitle);
		document.getElementById('headersec').style.display = "none";
		document.getElementById('tdFolderHeading').innerHTML = FolderHeaderTitle;

		if (iframeAddNewDoc != null) {
			iframeAddNewDoc.parentElement.parentElement.style.display = "block";
		}

		if (iframeMenu != null) {
			iframeMenu.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "block";
			iframeMenu.parentElement.parentElement.style.display = "none";
		}

		if (iframeSettings != null) {
			iframeSettings.parentElement.parentElement.style.display = "none";
		}

		if (iframeViews != null) {
			iframeViews.parentElement.parentElement.style.display = "none";
		}

		if (iframeUpload != null) {
			iframeUpload.parentElement.parentElement.style.display = "none";
		}
	} else {
		var IframeTable = Iframe.getElementsByTagName("table");
		//alert(IframeTable.length);
		var Flag = 0;
		for (t = 0; t < IframeTable.length; t++) {
			if (IframeTable[t].CType == "Folder") {

				IframeTable[t].onmouseover = "";
			}
		}
	}
}

function UploadGuidelinePrinciple() {
	document.getElementById('headersec').innerText = 'Guidelines & Principles';
	var div = '<div id="divGoBack" style="display:none" align="right"><a href="javascript:GoBackHomeUpload()">Go back</a></div>' +
		'<div id="DivIframe" style="width: 805px;height: 400px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		//'<iframe onload="HideMultiple()" id="FrameSet" src="http://teamspace.pg.com/sites/cppdpolicy/GUIDELINESPRINCIPLES/Forms/GuidelinePrincipleAllItems.aspx"   frameborder="0"></iframe>' +
		'<iframe onload="HideMultiple()" id="FrameSet"' +
		'style="width: 1000px; height: 1000px; margin-left: -155px;margin-top: -150px; margin-right: 0px; border: 0 solid; bgcolor: #F1F1F1; overflow-x: hidden"' +
		'src="http://teamspace.pg.com/sites/cppdpolicy/GUIDELINESPRINCIPLES/Forms/GuidelinePrincipleAllItems.aspx"' +
		'frameborder="0"></iframe>' + '</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

function HideMultiple() {
	var Iframe = document.getElementById("FrameSet").contentWindow.document;
	var iframeForm = Iframe.getElementsByTagName("form");
	if (iframeForm[0].action.indexOf("_layouts/Upload.aspx") != -1) {
		var iframeMultipleUpload = Iframe.getElementById("ctl00_PlaceHolderMain_ctl01_ctl02_UploadMultipleLink");
		iframeMultipleUpload.parentElement.parentElement.style.display = "none";
	}
}

function UploadGuidelinePresentation() {
	document.getElementById('headersec').innerText = 'Presentations';
	var div = '<div id="divGoBack" style="display:none" align="right"><a href="javascript:GoBackHomeUpload()">Go back</a></div>' +
		'<div id="DivIframe" style="width: 805px;height: 400px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		//'<iframe onload="HideMultiple()" id="FrameSet" src="http://teamspace.pg.com/sites/cppdpolicy/Presentations/Forms/PresentationAllItems.aspx"   frameborder="0"></iframe>' +
		'<iframe onload="HideMultiple()" id="FrameSet"' +
		'style="width: 1000px; height: 1000px; margin-left: -155px;margin-top: -150px; margin-right: 0px; border: 0 solid; bgcolor: #F1F1F1; overflow-x: hidden"' +
		'src="http://teamspace.pg.com/sites/cppdpolicy/Presentations/Forms/PresentationAllItems.aspx"   frameborder="0"></iframe>' +
		'frameborder="0"></iframe>' +
		'</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

function CreateHomeLinksTitle() {
	window.location.href = "http://teamspace.pg.com/sites/cppdpolicy/Lists/HomeLinksTitle";
}


function ValidateCategory() {
	var Iframe = document.getElementById("FrameSet").contentWindow.document;
	var iframeForm = Iframe.getElementsByTagName("form");

	if (iframeForm[0].action.indexOf("Categories/EditForm.aspx") != -1) {
		Iframe.getElementById("ctl00_m_g_f428ff03_ffc1_40b5_9267_f5efb418ddb0_ctl00_toolBarTbltop").style.display = "none";
		var AttachFile = Iframe.getElementById("ctl00_m_g_f428ff03_ffc1_40b5_9267_f5efb418ddb0_ctl00_ctl01_ctl00_toolBarTbl_RptControls_diidIOAttach_LinkText");
		AttachFile.parentElement.parentElement.style.display = "none";
	}
}

function openCategories() {
	document.getElementById('headersec').innerHTML = 'Standard Topics <br><font size="1">(Left Navigation menu for the Standard Topic Index)</font>';
	var div = '<div id="DivIframe" style="width: 805px;height: 500px;overflow: hidden;margin: auto;bgcolor: #F1F1F1;">' +
		//		'<iframe scrolling="no" onload="ValidateCategory()" id="FrameSet" src="http://teamspace.pg.com/sites/cppdpolicy/Lists/Categories/Indexed.aspx"   frameborder="0"></iframe>' +
		'<iframe scrolling="no" onload="ValidateCategory()" id="FrameSet"' +
		'style="width: 1000px; height: 1000px; margin-left: -155px;margin-top: -150px; margin-right: 0px; border: 0 solid; bgcolor: #F1F1F1; overflow-x: hidden"' +
		'src="http://teamspace.pg.com/sites/cppdpolicy/Lists/Categories/Indexed.aspx"   frameborder="0"></iframe>' +
		'</div>';
	document.getElementById("tdIframe").innerHTML = div;
}

function AddCategory() {
	var Title = document.getElementById("g_e14fa607_cc87_4b4b_86d8_cdef95175949_ff1_1_ctl00_ctl00_TextField").value;
	sQuery = "<Query><Where><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" + Title + "</Value></Eq></Where></Query>";
	var oWs = splists.getListItems(CATEGORIESLIST, "", sQuery, '', "", '', "");

	if (oWs.status == 200) {
		//alert(oWs.responseText)
		var rows = oWs.responseXML.getElementsByTagName('z:row');

		if (rows.length > 0) {
			alert('Yes, It is Existed..');
		} else {
			alert('Not Existed..');
		}

	} else {
		alert('Not')
	}
}

var IsAdmin = false;
var IsSuperAdmin = false;

var curUser = $().SPServices.SPGetCurrentUser();

function getUserName() {
	//debugger
	$().SPServices({
		operation : "GetGroupCollectionFromUser",
		userLoginName : curUser,
		async : false,
		completefunc : function (xData, Status) {

			//alert(xData.responseText);
			if ($(xData.responseXML).find("Group[ID='16']").length == 1) {
				IsAdmin = true;
			}

			if ($(xData.responseXML).find("Group[ID='35']").length == 1) {
				IsSuperAdmin = true;
			}
		}
	});

	if (IsAdmin || IsSuperAdmin) {
		//document.getElementById('adminLink').href = 'http://teamspace.pg.com/sites/cppdpolicy/WPPages/admin.aspx';
		$('#adminLink').attr('href', 'http://teamspace.pg.com/sites/cppdpolicy/WPPages/RestrcitedPage.aspx');
	} else {
		$('#adminLink').attr('href', '#');
	}
	if (!IsSuperAdmin) {
		if (document.getElementById('divSuperAdmin'))
			$('#divSuperAdmin').hide();
	}
}

// Added on 25/6/13 by Chinna -- Browser Compatibility  -- Start


function loadOrientation(strHTMLid) {
	var oreTable = "";
	var sQuery = '<Query><OrderBy><FieldRef Name="Date" Ascending="False" /></OrderBy></Query>';
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "Orientations",
		CAMLQuery : sQuery,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			oreTable = '<table class="Orientation" cellPadding="1" cellSpacing="0" border="1">' +
				'<tr>' +
				'<th>Date</th>' +
				'<th>Time</th>' +
				'<th>Location</th>' +
				'<th>Facilitator</th>' +
				'</tr>';

			if (xData.status == 200) {
				var rows = $(xData.responseXML).SPFilterNode("z:row").length;
				if (rows > 0) {
					$(xData.responseXML).SPFilterNode("z:row").each(function () {
						var date = $(this).attr('ows_Date');
						var location = $(this).attr('ows_Location');
						var facilitator = $(this).attr('ows_Facilitator');

						var strdate = GetDate(date);
						var Time = GetTime(date);

						oreTable += '<tr>';
						oreTable += '<td>' + strdate + '</td>';
						oreTable += '<td>' + Time + '</td>';
						oreTable += '<td>' + location + '</td>';
						oreTable += '<td>' + facilitator + '</td>';
						oreTable += '</tr>';
					});
				}
			}
		}
	});

	oreTable += '</table>';
	$(strHTMLid).html(oreTable);
}

// Added on 25/6/13 by Chinna -- Browser Compatibility  -- End

/*function loadOrientation(strHTMLid) {
var sQuery = '<Query><OrderBy><FieldRef Name="Date" Ascending="False" /></OrderBy></Query>';

var oWs = splists.getListItems('Orientations', "", sQuery, "", '5', '', "");
var oreTable = '<table class="Orientation" cellPadding="1" cellSpacing="0" border="1">' +
'<tr>' +
'<th>Date</th>' +
'<th>Time</th>' +
'<th>Location</th>' +
'<th>Facilitator</th>' +
'</tr>';

if (oWs.status == 200) {
//alert(oWs.responseText);
var rows = oWs.responseXML.getElementsByTagName('z:row');
if (rows.length > 0) {
//for (var i = 0; i < rows.length; i++) {
for (var i = rows.length - 1; i >= 0; i--) {
var date = rows[i].getAttribute('ows_Date');
var location = rows[i].getAttribute('ows_Location');
var facilitator = rows[i].getAttribute('ows_Facilitator');

var strdate = GetDate(date);
var Time = GetTime(date);

oreTable += '<tr>';
oreTable += '<td>' + strdate + '</td>';
oreTable += '<td>' + Time + '</td>';
oreTable += '<td>' + location + '</td>';
oreTable += '<td>' + facilitator + '</td>';
oreTable += '</tr>';
}
}
}
oreTable += '</table>';
$(strHTMLid).html(oreTable);
}*/

function GetDate(strDate) {
	strDate = strDate.replace(/-/g, "/");
	var d = new Date(strDate);
	d = d.toLocaleDateString();
	return d;
}

function GetTime(strDate) {
	strDate = strDate.replace(/-/g, "/");
	var t = new Date(strDate);
	t = t.toLocaleTimeString();
	return t;
}




$(document).ready(function () {
	var strTitle = "";
	var strUrl = $(location).attr('href');
	strUrl = strUrl.split("http://teamspace.pg.com/sites/cppdpolicy/")[1];

	var arrLists = strUrl.split("/");
	if (arrLists[0] == "Lists") {
		strUrl = arrLists[1];
	} else {
		strUrl = arrLists[0];
	}

	if (strUrl != "WPPages") {
		switch (strUrl) {
		case "Categories":
			strTitle = "Standard Topics<br><span style='font-size:11px'>(Left Navigation menu for the Standard Topic Index)</span>";
			$('#divSuperAdmin table table tr:nth-child(2) div').addClass('selected');
			break;

		case "CPPDCategory":
			strTitle = "Home & Standard Documents<br><span style='font-size:11px'>(Upload either Home documents or Standard topic documents in to the same library)</span>";
			$('#divSuperAdmin table table tr:nth-child(4) div').addClass('selected');
			break;

		case "Restricted":
			strTitle = "Restricted Area Documents <span style='font-size:11px'>(These documents will be displayed in Restricted Area)</span>";
			$('#divSuperAdmin table table tr:nth-child(6) div').addClass('selected');
			break;

		case "Orientations":
			strTitle = "Next Legal Orientation<br> <span style='font-size:11px'>(Legal Orientation schedule will be displayed at Restricted Area page, it will show only recent 5 schedules )</span>";
			$('#divSuperAdmin table table tr:nth-child(8) div').addClass('selected');
			break;

		case "GUIDELINESPRINCIPLES":
			strTitle = "Guidelines & Principles";
			$('#divSuperAdmin table table tr:nth-child(12) div').addClass('selected');
			break;

		case "GuidelinesPrinciples":
			strTitle = "Guidelines & Principles Standard Topics <br> <span style='font-size:11px'>(Left Navigation Menu for the Guidelines & Principles)</span>";
			$('#divSuperAdmin table table tr:nth-child(10) div').addClass('selected');
			break;

		case "Presentations":
			strTitle = "Presentations";
			$('#divSuperAdmin table table tr:nth-child(14) div').addClass('selected');
			break;

		case "HomeLinksTitle":
			strTitle = "Home Links";
			$('#divSuperAdmin table table tr:nth-child(16) div').addClass('selected');
			break;

		default:
			strTitle = "Admin";
			break;
		}
		$('#headersec').html(strTitle);
	}
});
