//***************************************************************
//* Project Name     : GBU-HR
//* Application name : Reports
//* Dependencies     :
// File Name : Treeview.js
//* Limitations      :
//* Created Date     : 28 May 2013
//* Author           : Vijay Bhaskar CH
//****************************************************************

var webUrl = "https://hrteamspace.pg.com/sites/gbuhr";
var itmid = window.location.search.split("?itmid=")[1];

$(document).ready(function () {

	var liHtml = "";
	var keysArr = new Array();
	var rootSite = window.location.protocol + "//" + window.location.hostname;
	//alert(rootSite);
	//alert('working...');
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : "Reports", // List Name
		CAMLQueryOptions : "<QueryOptions> <ViewAttributes Scope='RecursiveAll' /></QueryOptions>",
		CAMLViewFields : '<ViewFields><FieldRef Name="ContentType" /><FieldRef Name="FileRef" /><FieldRef Name="BaseName" /></ViewFields>',
		CAMLQuery : '<Query><OrderBy><FieldRef Name="ID" /></OrderBy></Query>',
		//CAMLRowLimit: 1,
		completefunc : function (xData, Status) {

			//alert(xData.responseText);
			//debugger
			$(xData.responseXML).SPFilterNode("z:row").each(function () {

				var title = $(this).attr("ows_BaseName");
				var objType = $(this).attr("ows_ContentType");

				var orgnPath = $(this).attr("ows_FileRef")
					orgnPath = rootSite + "/" + orgnPath.split(';#')[1]; ;

				//alert(orgnPath);

				var objPath = $(this).attr("ows_FileRef");
				objPath = objPath.split(';#sites/gbuhr/HHC/Reports/')[1];
				//debugger
				var isSub = false;
				if (objPath.indexOf('/') > -1) {
					isSub = true;

					var objPathArr = new Array();
					objPathArr = objPath.split('/');
					var subLink = "";

					var titleID = "";
					$.each(objPathArr, function (i) {
						titleID += "_" + objPathArr[i];
					});
					
					titleID=titleID.replace(/ /gi,"");
					titleID=titleID.replace(/[()]/g,'');


					if (objType == "Folder") {
						subLink = "<li><span class='folder'>" + title + '</span><ul id="' + titleID + '"/></li>';
					} else {
						subLink = "<li><span class='file tree'><a class='tree' href='" + orgnPath + "'>" + title + "</a></span></li>";
					}

					var Tfolder = "";
					$.each(objPathArr, function (i) {
						var objlen = objPathArr.length;
						//alert(objPathArr[i]);
						if (i != objlen - 1) {
							Tfolder += "_" + objPathArr[i];
						}
					});
					
					Tfolder=Tfolder.replace(/ /gi,"");
					Tfolder=Tfolder.replace(/[()]/g,'');

					//var Tfolder = objPathArr[objPathArr.length - 2];
					$("#" + Tfolder).append(subLink);

				} else {
					if (objType == "Folder") {
						liHtml = "<li><span class='folder'>" + title + '</span><ul id="_' + title + '"/></li>';
					} else {
						liHtml = "<li><span class='file' style='text-decoration:none'><a class='tree' href='" + orgnPath + "'>" + title + "</a></span></li>";
					}
					$("#browser").append(liHtml);
				}
			});
		}
	});
	//$("#browser").html(liHtml);
	$("#browser").treeview({
		collapsed : true
	});

	getscroll();
});

function getscroll() {
	//debugger
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : "reports", // List Name
		webURL : webUrl,
		//CAMLQueryOptions : '<QueryOptions><ViewAttributes Scope="RecursiveAll"/></QueryOptions>',
		CAMLQuery : '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">' + itmid + '</Value></Eq></Where></Query>',
		completefunc : scrollmsg
	});
}

function scrollmsg(xData, Status) {
	//alert(xData.responseText);
	var scroll = "";
	$(xData.responseXML).SPFilterNode("z:row").each(function () {
		scroll = $(this).attr("ows_scroll");
	});
	scroll = "<marquee><span class='mar'>" + scroll + "</span></marquee>";
	$("#repScroll").html(scroll);
}
