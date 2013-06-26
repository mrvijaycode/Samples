//***************************************************************
//* Project Name     : GBU-HR
//* Application name : Profiles
//* Dependencies     : TeamProfiles List
//* Limitations      :
//* Created Date     : 23 May 2013
//* Author           : Vijay Bhaskar C
//****************************************************************


$(document).ready(function () {
	loadProfiles();
});

function loadProfiles() {

	var strHTML = "";

	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : "Team Profiles", // List Name
		CAMLQueryOptions : "<QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
		completefunc : function (xData, Status) {

			//alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("z:row").each(function () {

				//if ($(this).attr("ows_LinkTitle") != null)
				if ($(this).attr("ows_user_x0020_name") != null)
					var strUser = $(this).attr("ows_user_x0020_name");
				else
					var strUser = "";

				if ($(this).attr("ows_Role0") != null)
					var strRole = $(this).attr("ows_Role0");
				else
					var strRole = "";

				if ($(this).attr("ows_Spoc0") != null)
					var strSpoc = $(this).attr("ows_Spoc0");
				else
					var strSpoc = "";

				if ($(this).attr("ows_Process_x0020_Owner") != null)
					var strProcessOwner = $(this).attr("ows_Process_x0020_Owner");
				else
					var strProcessOwner = "";

				var attachment = $(this).attr("ows_Attachments");
				var img = '<img src="https://hrteamspace.pg.com/sites/gbuhr/Site Pages/Images/no_image_thumb.gif" style="max-height:130px;max-width:130px;overflow:auto" />';
				if (attachment != 0) {
					attachment = attachment.split(";#")[1];
					img = '<img src=' + attachment + ' style="max-height:130px;max-width:130px;-moz-box-shadow: 3px 3px 4px #000;-webkit-box-shadow: 3px 3px 4px #000;box-shadow: 3px 3px 4px #000;" />';
				}

				strHTML += '<table width="224.48px" border="0" cellspacing="0" cellpadding="0" style="float:left;margin-right:3px;">' +
				'<tr>' +
				'<td class="profile_block"><table width="100%" border="0" cellspacing="0" cellpadding="5">' +
				'<tr>' +
				'<td width="104" height="135" align="center">' + img + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td align="left" class="name">' + strUser.split(';#')[1] + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td align="left" class="designation">' + strRole.split(';#')[1] + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td align="left" class="dept"><div style=height:40px;overflow:auto>' + adjustSpoc(strSpoc) + '</div></td>' +
				'</tr>' +
				'<tr>' +
				
				'<td height="250" align="left" valign="top" class="roles"><div style="height:250px;overflow:auto"><ul>' + adjustProcessOwners(strProcessOwner) +

				'</ul></div></td>' +
				'</tr>' +
				'</table></td>' +
				'</tr>' +
				'<tr>' +
				'<td><img src="images/shadow.jpg" width="217" height="14" /></td>' +
				'</tr>' +
				'</table>';
			});
		}
	});
	$("#divProfile").html(strHTML);
}

function adjustMultiLookup(txt) {
	var txtArr = txt.split(";#");

	var dispStr = "";
	$.each(txtArr, function (i) {
		if (i % 2 != 0) {
			dispStr += txtArr[i] + ";";
		}
	});
	//alert(dispStr.substring(0,(dispStr.length-1)));
	dispStr = dispStr.substring(0, (dispStr.length - 1));
	return dispStr;
}

function adjustSpoc(txt) {
	var spoc = adjustMultiLookup(txt);
	if (spoc.indexOf(";") > -1) {
		var arrSpoc = spoc.split(";");
		var strVal = "";
		$.each(arrSpoc, function (i) {
			strVal += arrSpoc[i] + "</br>";
		});
		return strVal;
	} else
		return spoc;
}

function adjustProcessOwners(txt) {
	var proOweners = adjustMultiLookup(txt);

	if (proOweners.indexOf(";") > -1) {
		var arrOwners = proOweners.split(";");
		var strVal = "";
		$.each(arrOwners, function (i) {
			strVal += "<li style='z-index:0'>" + arrOwners[i] + "</li>";
		});
		return strVal;
	} else {
		var strSingle = "<li>" + proOweners +"</li>";
		return strSingle;
	}
}
